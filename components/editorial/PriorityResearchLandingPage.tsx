import Link from 'next/link';
import { ArrowDown, CalendarCheck2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import AdSlot from '@/components/blog/AdSlot';
import ShortAnswerBox from '@/components/blog/ShortAnswerBox';
import EEATBadge from '@/components/blog/EEATBadge';
import { ResearchBriefPanel } from '@/components/editorial/ResearchBriefPanel';
import { EditorialResearchContent } from '@/components/editorial/EditorialResearchContent';
import { IntentStrategyCTA } from '@/components/editorial/IntentStrategyCTA';
import type { PriorityResearchProfile } from '@/lib/editorial/priorityResearch';
import { generateFAQSchema } from '@/lib/schema';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import EligibleCheck from '@/components/blog/EligibleCheck';
import RelatedFundingPaths from '@/components/blog/RelatedFundingPaths';
import TRLDiagnostic from '@/components/blog/TRLDiagnostic';
import StackingDiagnostic from '@/components/blog/StackingDiagnostic';
import ChecklistDiagnostic from '@/components/blog/ChecklistDiagnostic';

interface PriorityResearchLandingPageProps {
  profile: PriorityResearchProfile;
  eyebrow: string;
  title: string;
}

export function PriorityResearchLandingPage({ profile, eyebrow, title }: PriorityResearchLandingPageProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: profile.seoDescription,
    author: { '@type': 'Person', name: profile.reviewedBy, url: 'https://www.fsidigital.ca/about' },
    reviewedBy: { '@type': 'Person', name: profile.reviewedBy, jobTitle: profile.reviewerRole, url: 'https://www.fsidigital.ca/about' },
    publisher: { '@type': 'Organization', name: 'FSI Digital', url: 'https://www.fsidigital.ca' },
    dateModified: profile.lastVerified,
    mainEntityOfPage: `https://www.fsidigital.ca${profile.route}`,
    citation: profile.officialSources.map(source => source.url),
  };

  const faqSchema = profile.faq ? generateFAQSchema(profile.faq) : null;

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <Header />
      <main>
        <section className="border-b border-slate-200 bg-slate-950 py-14 text-white sm:py-20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="mb-4 text-sm font-bold uppercase text-emerald-300">{eyebrow}</p>
              <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-200">{profile.seoDescription}</p>
              <a href="#research-brief" className="mt-8 inline-flex items-center gap-2 rounded-md bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-300">
                Review the research brief
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <ShortAnswerBox question={profile.shortAnswerQuestion} content={profile.shortAnswer} />
          <EEATBadge authorName={profile.reviewedBy} authorImage="/author-ashwani.jpg" date={profile.lastVerified} reviewerRole={profile.reviewerRole} />

          {/* Contextual Micro-Quiz based on state route */}
          {(() => {
            const isNewYork = profile.route === '/usa/new-york';
            const isCalifornia = profile.route === '/usa/california';
            if (isNewYork || isCalifornia) {
              const quizTitle = isNewYork 
                ? 'Check your business eligibility for NY State & NYC grants & tax credits.'
                : 'Check your business eligibility for CA State & local incentives.';
              const quizDesc = isNewYork
                ? 'Answering these 2 baseline questions will show if you meet the initial criteria for New York state and local incentives.'
                : 'Answering these questions will check your baseline compatibility with California tax credits and upskilling funds.';
              const quizQuestions = isNewYork ? [
                { id: 'ny1', text: 'Are you registered to do business in New York State?' },
                { id: 'ny2', text: 'Do you have a physical office or payroll presence in NY?' }
              ] : [
                { id: 'ca1', text: 'Are you registered to do business in California?' },
                { id: 'ca2', text: 'Do you plan to create physical jobs or hire in California?' }
              ];
              
              return (
                <EligibleCheck 
                  title={quizTitle} 
                  description={quizDesc} 
                  questions={quizQuestions} 
                />
              );
            }
            return null;
          })()}

          <div id="research-brief">
            <ResearchBriefPanel profile={profile} />
          </div>

          <div className="my-10">
            <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_RECTANGLE!} adFormat="horizontal" style={{ minHeight: 120, width: '100%' }} />
          </div>

          <article className="mx-auto max-w-5xl">
            <EditorialResearchContent route={profile.route} />
            {profile.interactiveTool === 'trl' && <TRLDiagnostic />}
            {profile.interactiveTool === 'stacking' && <StackingDiagnostic />}
            {profile.interactiveTool === 'checklist' && <ChecklistDiagnostic />}
            <IntentStrategyCTA cta={profile.cta} />

            {profile.relatedPath && (
              <RelatedFundingPaths
                currentPathTitle={profile.relatedPath.currentPathTitle}
                nextStepTitle={profile.relatedPath.nextStepTitle}
                nextStepLink={profile.relatedPath.nextStepLink}
                nextStepDescription={profile.relatedPath.nextStepDescription}
                stepType={profile.relatedPath.stepType}
              />
            )}

            {/* Contextual Regional Municipal Intelligence (Controlled Cohort) */}
            {profile.route === '/usa/california' && (
              <div className="my-10 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 via-white to-slate-50 p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-emerald-100 pb-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-600 text-white shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Regional Intelligence
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-2">
                      Featured California Municipal & Sector Directives
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    2026 Active Envelopes
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Link
                    href="/grants/ca/san-francisco/women-entrepreneurs"
                    className="bg-white rounded-xl border border-slate-200/90 p-5 hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-700 mb-2">
                        <span>San Francisco</span>
                        <span className="bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200/60">Women Founders</span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 leading-snug mb-2">
                        San Francisco Women-Owned Business Grants
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        SF OEWD Women’s Entrepreneurship Fund, CalOSBA technical assistance, and California IBank credit enhancement guarantees.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-700">
                      <span>View Roadmap & Programs</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  <Link
                    href="/grants/ca/san-francisco/minority-owned"
                    className="bg-white rounded-xl border border-slate-200/90 p-5 hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-700 mb-2">
                        <span>San Francisco</span>
                        <span className="bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200/60">Minority & BIPOC</span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 leading-snug mb-2">
                        San Francisco Minority & BIPOC Founders Grants
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        SF African American Arts & Cultural District grants, commercial corridor tenant improvements, and SBA 8(a) certifications.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-700">
                      <span>View Roadmap & Programs</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {profile.route === '/usa/new-york' && (
              <div className="my-10 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 via-white to-slate-50 p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-emerald-100 pb-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-600 text-white shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Regional Intelligence
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-2">
                      Featured New York Municipal & Sector Directives
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    2026 Active Envelopes
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Link
                    href="/grants/ny/new-york-city/education"
                    className="bg-white rounded-xl border border-slate-200/90 p-5 hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-700 mb-2">
                        <span>New York City</span>
                        <span className="bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200/60">Education & EdTech</span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 leading-snug mb-2">
                        NYC Education & EdTech Business Grants
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        START-UP NY 10-year tax exemptions, NYS Digital Game Development tax credits, and NYC SBS Futureworks technology grants.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-700">
                      <span>View Roadmap & Programs</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {/* Visual FAQ Accordion here */}
            {profile.faq && (
              <div className="my-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                  {profile.faq.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-emerald-700 transition-colors">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            <div className="mt-8 flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              <CalendarCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
              <p>Program terms, budgets, and intake windows can change. Confirm the current rules at the cited official source before making a financial or application decision.</p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
