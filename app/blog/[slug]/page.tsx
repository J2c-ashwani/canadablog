import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AdSlot from '@/components/blog/AdSlot';
import RelatedPosts from '@/components/blog/RelatedPosts';
import CategorySidebar from '@/components/blog/CategorySidebar';
import NewsletterBox from '@/components/blog/NewsletterBox';
import { getBlogPostBySlug, blogCategories } from '@/lib/data/blogPosts';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { generateBlogPostSchema, generateBreadcrumbSchema } from '@/lib/schema';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return generateSEOMetadata({ ...post, content: '' }); // omit content for seo metadata
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return notFound();
  }

  const content = post.content || '';
  const fullPost = post;

  const category = blogCategories.find((cat) => cat.id === post.category);
  const blogPostSchema = generateBlogPostSchema(fullPost);
  const breadcrumbSchema = generateBreadcrumbSchema(fullPost);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <div className="container mx-auto px-4 py-4">
        <AdSlot adSlot="1234567890" adFormat="horizontal" className="mb-6" style={{ minHeight: '90px' }} />
      </div>

      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <article className="lg:col-span-3 bg-white dark:bg-neutral-950 rounded-2xl shadow-lg p-8">
              <div className="mb-8">
                <Button variant="ghost" asChild>
                  <Link href="/blog">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                  </Link>
                </Button>
              </div>

              <div className="mb-6">
                <Badge className={category?.color ?? 'bg-gray-100 text-gray-800'}>
                  {category?.name ?? 'General'}
                </Badge>
                {post.featured && (
                  <Badge className="ml-2 bg-yellow-100 text-yellow-800">Featured</Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                {post.title}
              </h1>

              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-gray-400">
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
              </div>

              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-12">
                <img
                  src={`/images/blog/${post.image}`}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              <div
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 hover:prose-a:text-blue-700"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              <div className="my-12">
                <AdSlot adSlot="2345678901" adFormat="rectangle" style={{ minHeight: 250 }} />
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-neutral-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-gray-600 dark:text-gray-400 font-medium mr-2">Tags:</span>
                    {post.seo.keywords.slice(0, 4).map((keyword, index) => (
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
              <CategorySidebar />
              <AdSlot adSlot="3456789012" adFormat="vertical" style={{ minHeight: 600 }} />
              <NewsletterBox />
            </aside>
          </div>
        </div>
      </main>

      <RelatedPosts currentPost={fullPost} />
      <Footer />
    </div>
  );
}
