import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { BlogPost, getAllBlogPosts, blogCategories } from '@/lib/data/blogPosts';

interface RelatedPostsProps {
  currentPost: BlogPost;
  maxPosts?: number;
}

/**
 * Score a candidate post's relevance to the current post.
 * +3 for same category, +1 per shared SEO keyword (case-insensitive).
 */
function relevanceScore(current: BlogPost, candidate: BlogPost): number {
  let score = 0;

  // Category match
  if (candidate.category === current.category) score += 3;

  // Keyword overlap
  const currentKeywords = new Set(
    (current.seo?.keywords ?? []).map(k => k.toLowerCase())
  );
  for (const kw of candidate.seo?.keywords ?? []) {
    if (currentKeywords.has(kw.toLowerCase())) score += 1;
  }

  return score;
}

export default function RelatedPosts({ currentPost, maxPosts = 3 }: RelatedPostsProps) {
  const allPosts = getAllBlogPosts().filter(p => p.id !== currentPost.id);

  // Score and sort by relevance, then by date as tiebreaker
  const scored = allPosts
    .map(post => ({ post, score: relevanceScore(currentPost, post) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    });

  const relatedPosts = scored.slice(0, maxPosts);

  if (relatedPosts.length === 0) return null;

  return (
    <section id="related-grants" className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex items-center gap-4 mb-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Related Grants You May Like
            </h2>
          </div>
          <div className="h-px bg-gradient-to-r from-blue-500 to-green-500 flex-1"></div>
        </div>

        <div className={`grid gap-6 ${relatedPosts.length === 1 ? 'md:grid-cols-1' : relatedPosts.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {relatedPosts.map(({ post, score }) => {
            const category = blogCategories.find(cat => cat.id === post.category);
            const isSameCategory = post.category === currentPost.category;

            return (
              <article
                key={post.id}
                className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 dark:border-neutral-700"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-video bg-gray-100 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {isSameCategory && (
                      <span className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                        Same Topic
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={category?.color || 'bg-gray-100 text-gray-800'}>
                        {category?.name || 'General'}
                      </Badge>
                      {post.category === 'funding-alerts' && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold">
                          🚨 Alert
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2 text-base">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-neutral-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-500" />
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            Browse All Grant Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
