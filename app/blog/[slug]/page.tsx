import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, DollarSign, Target, PieChart, TrendingUp, Users, Award, Shield, CheckCircle, Leaf, Zap, Mountain, Globe, RefreshCw, MapPin, Gift, CreditCard, Smile, Anchor, Handshake, ThumbsUp, Rocket, Cpu, FileText, Search, List, Layers, Map, BarChart, Unlock, FastForward, Grid, Home, Percent, Flag, AlertCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AdSlot from '@/components/blog/AdSlot';
import RelatedPosts from '@/components/blog/RelatedPosts';
import CategorySidebar from '@/components/blog/CategorySidebar';
import NewsletterBox from '@/components/blog/NewsletterBox';
import GrantGuideCTA from '@/components/blog/GrantGuideCTA';
import LastVerifiedBadge from '@/components/blog/LastVerifiedBadge';
import EEATBadge from '@/components/blog/EEATBadge';
import ShortAnswerBox from '@/components/blog/ShortAnswerBox';
import EligibleCheck from '@/components/blog/EligibleCheck';
import StickyTOC from '@/components/blog/StickyTOC';
import InlineCTA from '@/components/blog/InlineCTA';
import { FundingEstimator } from '@/components/seo/FundingEstimator';
import { getBlogPostBySlug, getAllBlogPosts, blogCategories, getBlogPostContent, getBlogPostRichData } from '@/lib/data/blogPosts';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { generateBlogPostSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';
import { GrantSuccessTable } from "@/components/blog/GrantSuccessTable";
import { GrantComparisonTable } from "@/components/blog/GrantComparisonTable";
import { RelatedPageLinks } from '@/components/RelatedPageLinks';
import { ExpertTipBox } from "@/components/blog/ExpertTipBox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { ResearchBriefPanel } from '@/components/editorial/ResearchBriefPanel';
import { IntentStrategyCTA } from '@/components/editorial/IntentStrategyCTA';
import { EditorialResearchContent } from '@/components/editorial/EditorialResearchContent';
import { getPriorityResearchProfile } from '@/lib/editorial/priorityResearch';
import { InlineGrantChecker } from '@/components/blog/InlineGrantChecker';

type RelatedFundingLink = {
  href: string;
  title: string;
  description: string;
};

type Market = 'canada' | 'usa' | 'neutral';

const CANADA_RELATED_SIGNALS = [
  'canada', 'canadian', 'ontario', 'quebec', 'alberta', 'british columbia',
  'bc ', 'manitoba', 'saskatchewan', 'atlantic', 'nova scotia', 'new brunswick',
  'irap', 'sr&ed', 'sred', 'cdap', 'bdc', 'nserc', 'canexport', 'provincial'
];

const USA_RELATED_SIGNALS = [
  'usa', 'united states', 'america', 'american', 'sba', 'sbir', 'sttr', 'nih',
  'nsf', 'usda', 'dod', 'doe', 'state grants', 'california', 'texas', 'new york',
  'florida', 'colorado', 'kentucky', 'minnesota', 'washington'
];

function classifyMarket(value: string): Market {
  const text = value.toLowerCase();
  const canadaHits = CANADA_RELATED_SIGNALS.filter(signal => text.includes(signal)).length;
  const usaHits = USA_RELATED_SIGNALS.filter(signal => text.includes(signal)).length;

  if (canadaHits > usaHits) return 'canada';
  if (usaHits > canadaHits) return 'usa';
  return 'neutral';
}

function mapIntentToIndustry(intent?: string): string {
  if (!intent) return 'technology';
  const i = intent.toLowerCase();
  if (i.includes('r_and_d') || i.includes('innovation') || i.includes('startup')) return 'technology';
  if (i.includes('manufacturing')) return 'manufacturing';
  if (i.includes('agriculture')) return 'agriculture';
  if (i.includes('healthcare') || i.includes('biotech')) return 'healthcare';
  if (i.includes('clean') || i.includes('energy')) return 'clean-energy';
  if (i.includes('retail') || i.includes('women')) return 'retail';
  return 'technology';
}

function isWeakRelatedTitle(title: string) {
  const normalized = title.trim().toLowerCase();
  return normalized.length < 6 || ['programs', 'target', 'don'].includes(normalized);
}

function sanitizeRelatedLinks(links: RelatedFundingLink[] | undefined, post: { title: string; excerpt: string; category: string; slug: string }) {
  if (!links?.length) return [];

  const pageMarket = classifyMarket(`${post.category} ${post.title} ${post.excerpt} ${post.slug}`);
  const seen = new Set<string>();

  return links
    .filter(link => link.href && link.title && link.description)
    .filter(link => !isWeakRelatedTitle(link.title))
    .filter(link => {
      if (seen.has(link.href)) return false;
      seen.add(link.href);
      return true;
    })
    .filter(link => {
      if (pageMarket === 'neutral') return true;
      const linkMarket = classifyMarket(`${link.href} ${link.title} ${link.description}`);
      return linkMarket === 'neutral' || linkMarket === pageMarket;
    })
    .slice(0, 4);
}

// Icon mapping for dynamic rendering from data
const iconMap: Record<string, any> = {
  DollarSign, Target, PieChart, TrendingUp, Users, Award, Shield, CheckCircle, Leaf, Zap, Mountain, Globe, RefreshCw, MapPin, Gift, CreditCard, Smile, Anchor, Handshake, ThumbsUp, Rocket, Cpu, FileText, Search, List, Layers, Map, BarChart, Unlock, FastForward,
  Calendar, Clock, Grid, Home, Percent, Flag, AlertCircle
};

import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  
  // Exclude slugs that already have a static folder (e.g., app/blog/ai-machine-learning-grants).
  // Next.js 15 fails data collection with 'slug in undefined' if a dynamic route yields a param
  // for a path that already physically exists.
  return posts
    .filter((post) => {
      try {
        const folderPath = path.join(process.cwd(), 'app', 'blog', post.slug);
        return !fs.existsSync(folderPath);
      } catch (e) {
        return true;
      }
    })
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const researchProfile = getPriorityResearchProfile(`/blog/${slug}`);
  const baseMetadata = generateSEOMetadata({ ...post, content: '' });

  return {
    ...baseMetadata,
    title: researchProfile?.seoTitle || baseMetadata.title,
    description: researchProfile?.seoDescription || baseMetadata.description,
    openGraph: researchProfile ? {
      ...baseMetadata.openGraph,
      title: researchProfile.seoTitle,
      description: researchProfile.seoDescription,
    } : baseMetadata.openGraph,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return notFound();
  }

  // Strip any inline <script type="application/ld+json"> blocks from legacy HTML content.
  // FAQ content remains visible on the page, but we avoid FAQ JSON-LD for grant/blog
  // content because it creates noisy Search Console validation without rich-result upside.
  const stripInlineSchemas = (html: string) =>
    html.replace(/<script\s+type\s*=\s*["']application\/ld\+json["']\s*>[\s\S]*?<\/script>/gi, '');

  const rawContent = await getBlogPostContent(slug) || '';
  const content = stripInlineSchemas(rawContent);
  const richData = await getBlogPostRichData(slug);
  const researchProfile = getPriorityResearchProfile(`/blog/${slug}`);
  // Also sanitize post.content so the RSC payload doesn't carry duplicate schemas
  const fullPost = {
    ...post,
    ...richData,
    ...(researchProfile ? {
      title: researchProfile.seoTitle,
      excerpt: researchProfile.seoDescription,
      shortAnswerQuestion: researchProfile.shortAnswerQuestion,
      shortAnswer: researchProfile.shortAnswer,
      faq: researchProfile.faq,
    } : {}),
    content: stripInlineSchemas(content),
  };

  // Split content for InlineCTA injection
  let beforeCTA = content;
  let afterCTA = "";
  if (fullPost.inlineCTA || researchProfile) {
    const h2Matches = [...content.matchAll(/<h2/gi)];
    if (h2Matches.length >= 2) {
      const splitIndex = h2Matches[Math.min(2, h2Matches.length - 1)].index;
      if (splitIndex !== undefined) {
        beforeCTA = content.substring(0, splitIndex);
        afterCTA = content.substring(splitIndex);
      }
    }
  }

  const displayUpdateDate = fullPost.seo?.seoUpdatedAt || researchProfile?.lastVerified || post.date;
  const category = blogCategories.find((cat) => cat.id === post.category);
  const blogPostSchema = generateBlogPostSchema(fullPost, researchProfile ? {
    dateModified: displayUpdateDate,
    reviewedBy: researchProfile.reviewedBy,
    reviewerRole: researchProfile.reviewerRole,
    sources: researchProfile.officialSources,
  } : undefined);
  const breadcrumbSchema = generateBreadcrumbSchema(fullPost);
  const faqSchema = fullPost.faq ? generateFAQSchema(fullPost.faq) : null;
  const relatedFundingLinks = sanitizeRelatedLinks(fullPost.relatedLinks, fullPost);

  const renderContentWithAds = (htmlString: string, pCountOffset: number) => {
    if (!htmlString) return { nodes: null, totalParagraphs: pCountOffset };
    
    // Split by </p> to count paragraphs
    const blocks = htmlString.split('</p>');
    const result = [];
    
    let currentChunk = "";
    let pCount = pCountOffset;
    
    blocks.forEach((block, idx) => {
      const isLast = idx === blocks.length - 1;
      const htmlPart = isLast ? block : block + '</p>';
      currentChunk += htmlPart;
      
      if (!isLast) pCount++;
      
  // Inject Ad after paragraph 2
      if (pCount === 2 && !isLast) {
        result.push(<div dangerouslySetInnerHTML={{ __html: currentChunk }} key={`chunk-${idx}`} suppressHydrationWarning />);
        result.push(<div className="my-10 not-prose flex justify-center w-full" key="ad-p2"><AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_BLOG_PARAGRAPH_2!} adFormat="horizontal" style={{ minHeight: '120px', width: '100%' }} /></div>);
        currentChunk = "";
      }
      
      // Inject Ad after paragraph 7 for longer content
      if (pCount === 7 && !isLast) {
        result.push(<div dangerouslySetInnerHTML={{ __html: currentChunk }} key={`chunk-${idx}`} suppressHydrationWarning />);
        result.push(<div className="my-10 not-prose flex justify-center w-full" key="ad-p7"><AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_BLOG_PARAGRAPH_7!} adFormat="rectangle" style={{ minHeight: '250px', width: '100%' }} /></div>);
        currentChunk = "";
      }
    });
    
    if (currentChunk) {
      result.push(<div dangerouslySetInnerHTML={{ __html: currentChunk }} key="chunk-final" suppressHydrationWarning />);
    }
    
    return { nodes: result, totalParagraphs: pCount };
  };

  const beforeContentData = renderContentWithAds(beforeCTA, 0);
  const afterContentData = renderContentWithAds(afterCTA, beforeContentData.totalParagraphs);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Header />
      <div className="container mx-auto px-4 py-4">
        <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_HEADER_AD!} adFormat="horizontal" className="mb-6" style={{ minHeight: '90px' }} />
      </div>

      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <article className="lg:col-span-3 bg-white dark:bg-neutral-950 rounded-2xl shadow-lg p-8">
              <div className="mb-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={post.type === 'expert-insight' ? '/expert-insights' : '/blog'}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {post.type === 'expert-insight' ? 'Back to Expert Insights' : 'Back to Grant News'}
                  </Link>
                </Button>
              </div>

              {/* Q&A ANSWER ENGINE HERO */}
              <div className={researchProfile
                ? 'rounded-lg bg-slate-950 p-8 text-left text-white md:p-12 mb-8'
                : 'bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 rounded-2xl p-8 md:p-12 mb-8 text-center'}>
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
                    {researchProfile ? 'FSI Digital Funding Research' : `${category?.name ?? 'Grant'} Answer Engine`}
                  </span>
                </div>

                {researchProfile ? (
                  <>
                  <h1 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl">
                    {researchProfile.seoTitle}
                  </h1>
                  <p className="max-w-3xl text-lg leading-8 text-slate-200">{researchProfile.seoDescription}</p>
                  </>
                ) : post.type !== 'grant-news' && (
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                    {post.title}
                  </h1>
                )}

                {fullPost.shortAnswer && !researchProfile && (
                  <div className="text-left w-full mx-auto max-w-4xl">
                    <ShortAnswerBox
                      question={fullPost.shortAnswerQuestion}
                      content={fullPost.shortAnswer}
                      isH1={post.type === 'grant-news'}
                    />
                  </div>
                )}

                <EEATBadge
                  authorName={researchProfile?.reviewedBy || 'Ashwani K.'}
                  authorImage="/author-ashwani.jpg"
                  date={displayUpdateDate}
                  reviewerRole={researchProfile?.reviewerRole}
                />
              </div>

              {researchProfile && (
                <ShortAnswerBox
                  question={researchProfile.shortAnswerQuestion}
                  content={researchProfile.shortAnswer}
                />
              )}

              {/* Metadata Bar (below hero) */}
              <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{post.readTime}</span>
                </div>
                <LastVerifiedBadge date={displayUpdateDate} />
              </div>

              {researchProfile ? (
                <ResearchBriefPanel profile={researchProfile} />
              ) : (
              <div id="ai-summary" className="bg-emerald-50 border border-emerald-100 rounded-lg p-6 mb-8 mt-2 shadow-sm">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-3 text-gray-900 border-b border-emerald-200 pb-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  AI Summary & Key Takeaways
                </h2>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span><strong>Overview:</strong> {post.seo?.metaDescription || `A comprehensive guide covering the latest updates, funding amounts, and application strategies for ${post.title}.`}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span><strong>Category Focus:</strong> This essential research brief targets {category?.name || 'government funding'} and explores funding impacts related to {post.seo?.keywords?.[0] || 'business growth'}.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span><strong>Actionable Intelligence:</strong> Readers will discover verified eligibility requirements, internal program mechanics, and timeline expectations within this concise {post.readTime} read.</span>
                  </li>
                </ul>
              </div>
              )}

              {fullPost.eligibleCheck && (
                <EligibleCheck />
              )}

              {fullPost.jumpLinks && !researchProfile && (
                <StickyTOC links={fullPost.jumpLinks} />
              )}

              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-12">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* DYNAMIC ENRICHMENT: Success Metrics Table */}
              {fullPost.metrics && !researchProfile && (
                <div className="mb-10 not-prose">
                  <GrantSuccessTable
                    title="Quick Funding Facts"
                    metrics={fullPost.metrics.map(m => {
                      const IconComponent = (m.iconName && iconMap[m.iconName]) ? iconMap[m.iconName] : Target;
                      return {
                        ...m,
                        icon: <IconComponent className="w-6 h-6" />
                      };
                    })}
                  />
                </div>
              )}

              {/* DYNAMIC ENRICHMENT: Comparison Table */}
              {fullPost.comparisonTable && !researchProfile && (
                <div className="mb-10 not-prose">
                  <GrantComparisonTable
                    title={fullPost.comparisonTable.title}
                    description={fullPost.comparisonTable.description}
                    programs={fullPost.comparisonTable.programs}
                  />
                </div>
              )}

              {/* DYNAMIC ENRICHMENT: Expert Tip */}
              {fullPost.expertTip && !researchProfile && (
                <div className="mb-10 not-prose">
                  <ExpertTipBox
                    type={fullPost.expertTip.type}
                    title={fullPost.expertTip.title}
                  >
                    <div dangerouslySetInnerHTML={{ __html: fullPost.expertTip.content }} />
                  </ExpertTipBox>
                </div>
              )}

              {researchProfile ? (
                <EditorialResearchContent route={researchProfile.route} />
              ) : (
                <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 hover:prose-a:text-blue-700">
                  {beforeContentData.nodes}
                </div>
              )}

              {(fullPost.inlineCTA || researchProfile || ['dod-sbir-defense-tech-grants', 'healthcare-grants-2026', 'new-york-business-grants-2026', '7-startup-accelerators-california-free-money'].includes(slug)) && (
                <div className="not-prose my-8">
                  {['dod-sbir-defense-tech-grants', 'healthcare-grants-2026', 'new-york-business-grants-2026', '7-startup-accelerators-california-free-money'].includes(slug) ? (
                    <InlineGrantChecker />
                  ) : researchProfile ? (
                    <IntentStrategyCTA cta={researchProfile.cta} />
                  ) : (
                    fullPost.inlineCTA && <InlineCTA {...fullPost.inlineCTA} />
                  )}
                </div>
              )}

              {afterCTA && !researchProfile && (
                <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 hover:prose-a:text-blue-700">
                  {afterContentData.nodes}
                </div>
              )}

              {/* DYNAMIC ENRICHMENT: FAQ UI */}
              {fullPost.faq && (
                <div className="mt-12 mb-8 not-prose">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {fullPost.faq.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-300">
                          <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {/* ENGAGEMENT DEPTH: Related Funding Resources */}
              {relatedFundingLinks.length > 0 && (
                <div className="mt-12 not-prose">
                  <RelatedPageLinks links={relatedFundingLinks} />
                </div>
              )}

              <div className="my-12">
                <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_RECTANGLE!} adFormat="rectangle" style={{ minHeight: 250 }} />
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-neutral-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-gray-600 dark:text-gray-400 font-medium mr-2">Tags:</span>
                    {(post.seo?.keywords ?? []).slice(0, 4).map((keyword, index) => (
                      <Badge key={index} variant="outline">
                        {keyword}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Share:</span>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Article
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-6 text-sm text-gray-500 dark:text-gray-400">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span>{post.readTime} • Published {new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </article>

            <aside className="sticky top-8 lg:col-span-1 space-y-6">
              <FundingEstimator 
                defaultRegion={classifyMarket(`${post.category} ${post.title} ${post.excerpt} ${post.slug}`) === 'usa' ? 'ca' : 'on'}
                defaultIndustry={mapIntentToIndustry(fullPost.seo?.intent)}
              />
              <CategorySidebar type={post.type} />
              <div className="hidden lg:block">
                <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_AD!} adFormat="vertical" style={{ minHeight: 600 }} />
              </div>
            </aside>
          </div>
        </div >
      </main >

      <MobileStickyCTA />
      <RelatedPosts currentPost={fullPost} />
      <Footer />
    </div >
  );
}
