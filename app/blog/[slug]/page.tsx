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
import { getBlogPostBySlug, getAllBlogPosts, blogCategories } from '@/lib/data/blogPosts';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { generateBlogPostSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';
import { GrantSuccessTable } from "@/components/blog/GrantSuccessTable";
import { ExpertTipBox } from "@/components/blog/ExpertTipBox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Icon mapping for dynamic rendering from data
const iconMap: Record<string, any> = {
  DollarSign, Target, PieChart, TrendingUp, Users, Award, Shield, CheckCircle, Leaf, Zap, Mountain, Globe, RefreshCw, MapPin, Gift, CreditCard, Smile, Anchor, Handshake, ThumbsUp, Rocket, Cpu, FileText, Search, List, Layers, Map, BarChart, Unlock, FastForward,
  Calendar, Clock, Grid, Home, Percent, Flag, AlertCircle
};

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  // Site-Wide Enrichment Logic:
  // Dynamically INDEX posts only if they have been enriched with High Value content stats/tips.
  const isEnriched = !!(post.metrics || post.expertTip);

  return {
    ...generateSEOMetadata({ ...post, content: '' }),
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

  const content = post.content || '';
  const fullPost = post;

  // Split content for InlineCTA injection
  let beforeCTA = content;
  let afterCTA = "";
  if (post.inlineCTA) {
    const h2Matches = [...content.matchAll(/<h2/gi)];
    if (h2Matches.length >= 2) {
      const splitIndex = h2Matches[Math.min(2, h2Matches.length - 1)].index;
      if (splitIndex !== undefined) {
        beforeCTA = content.substring(0, splitIndex);
        afterCTA = content.substring(splitIndex);
      }
    }
  }

  const category = blogCategories.find((cat) => cat.id === post.category);
  const blogPostSchema = generateBlogPostSchema(fullPost);
  const breadcrumbSchema = generateBreadcrumbSchema(fullPost);
  const faqSchema = fullPost.faq ? generateFAQSchema(fullPost.faq) : null;

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
        <AdSlot adSlot="1234567890" adFormat="horizontal" className="mb-6" style={{ minHeight: '90px' }} />
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
              <div className="bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-2xl p-8 md:p-12 mb-8 text-center">
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full">
                    🔥 {category?.name ?? 'Grant'} Answer Engine
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                  {post.title}
                </h1>

                {post.shortAnswer && (
                  <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8 text-left max-w-3xl mx-auto">
                    <p className="text-white text-base md:text-lg leading-relaxed">
                      <span className="font-bold">The Short Answer: </span>
                      {post.shortAnswer}
                    </p>
                  </div>
                )}

                <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date={post.date} />
              </div>

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
                <LastVerifiedBadge date={post.date} />
              </div>

              {post.eligibleCheck && (
                <EligibleCheck />
              )}

              {post.jumpLinks && (
                <StickyTOC links={post.jumpLinks} />
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
              {post.metrics && (
                <div className="mb-10 not-prose">
                  <GrantSuccessTable
                    title="Quick Funding Facts"
                    metrics={post.metrics.map(m => {
                      const IconComponent = (m.iconName && iconMap[m.iconName]) ? iconMap[m.iconName] : Target;
                      return {
                        ...m,
                        icon: <IconComponent className="w-6 h-6" />
                      };
                    })}
                  />
                </div>
              )}

              {/* DYNAMIC ENRICHMENT: Expert Tip */}
              {post.expertTip && (
                <div className="mb-10 not-prose">
                  <ExpertTipBox
                    type={post.expertTip.type}
                    title={post.expertTip.title}
                  >
                    <div dangerouslySetInnerHTML={{ __html: post.expertTip.content }} />
                  </ExpertTipBox>
                </div>
              )}

              <div
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 hover:prose-a:text-blue-700"
                dangerouslySetInnerHTML={{ __html: beforeCTA }}
              />

              {post.inlineCTA && (
                <div className="not-prose my-8">
                  <InlineCTA {...post.inlineCTA} />
                </div>
              )}

              {afterCTA && (
                <div
                  className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 hover:prose-a:text-blue-700"
                  dangerouslySetInnerHTML={{ __html: afterCTA }}
                />
              )}

              {/* DYNAMIC ENRICHMENT: FAQ Schema UI */}
              {post.faq && (
                <div className="mt-12 mb-8 not-prose">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {post.faq.map((item, index) => (
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

              <div className="my-12">
                <AdSlot adSlot="2345678901" adFormat="rectangle" style={{ minHeight: 250 }} />
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
              <GrantGuideCTA />
              <CategorySidebar type={post.type} />
              <AdSlot adSlot="3456789012" adFormat="vertical" style={{ minHeight: 600 }} />
              <NewsletterBox />
            </aside>
          </div>
        </div >
      </main >

      <RelatedPosts currentPost={fullPost} />
      <Footer />
    </div >
  );
}
