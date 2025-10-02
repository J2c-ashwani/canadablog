import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost, getPostsByCategory, getAllBlogPosts, blogCategories } from '@/lib/data/blogPosts';

interface RelatedPostsProps {
  currentPost: BlogPost;
  maxPosts?: number;
}

export default function RelatedPosts({ currentPost, maxPosts = 3 }: RelatedPostsProps) {
  // Get posts from the same category, excluding current post
  let relatedPosts = getPostsByCategory(currentPost.category)
    .filter(post => post.id !== currentPost.id);
  
  // If not enough posts in same category, fill with other recent posts
  if (relatedPosts.length < maxPosts) {
    const allPosts = getAllBlogPosts()
      .filter(post => post.id !== currentPost.id && !relatedPosts.includes(post));
    relatedPosts = [...relatedPosts, ...allPosts].slice(0, maxPosts);
  }

  if (relatedPosts.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="flex items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mr-4">
            Related Articles
          </h2>
          <div className="h-px bg-gradient-to-r from-blue-500 to-green-500 flex-1"></div>
        </div>
        
        <div className={`grid gap-6 ${relatedPosts.length === 1 ? 'md:grid-cols-1' : relatedPosts.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {relatedPosts.slice(0, maxPosts).map((post) => {
            const category = blogCategories.find(cat => cat.id === post.category);
            
            return (
              <article
                key={post.id}
                className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={`/images/blog/${post.image}`}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-4">
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
                    
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
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
                      
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/blog">
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              View All Blog Posts
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
