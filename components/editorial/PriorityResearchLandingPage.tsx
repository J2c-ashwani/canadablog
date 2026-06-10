import { ArrowDown, CalendarCheck2 } from 'lucide-react';
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

          <div id="research-brief">
            <ResearchBriefPanel profile={profile} />
          </div>

          <div className="my-10">
            <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_RECTANGLE!} adFormat="horizontal" style={{ minHeight: 120, width: '100%' }} />
          </div>

          <article className="mx-auto max-w-5xl">
            <EditorialResearchContent route={profile.route} />
            <IntentStrategyCTA cta={profile.cta} />

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
