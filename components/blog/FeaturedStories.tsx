import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { getFeaturedPosts, blogCategories } from '@/lib/data/blogPosts';


export default function FeaturedStories({ type }: { type?: 'grant-news' | 'expert-insight' }) {
  let featuredPosts = getFeaturedPosts();

  if (type) {
    featuredPosts = featuredPosts.filter(post => post.type === type).slice(0, 1);
  }


  if (featuredPosts.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Stories</h2>
        <div className="h-px bg-gradient-to-r from-blue-500 to-green-500 flex-1 ml-6"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {featuredPosts.map((post, index) => {
          const category = blogCategories.find(cat => cat.id === post.category);

          return (
            <article key={post.id} className={`
              ${index === 0 ? 'md:col-span-2' : ''}
              bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group
            `}>
              <Link href={`/blog/${post.slug}`}>
                <div className={`
                  ${index === 0 ? 'aspect-video md:aspect-[21/9]' : 'aspect-video'}
                  bg-gray-100 overflow-hidden relative
                `}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={category?.color || 'bg-gray-100 text-gray-800'}>
                      {category?.name || 'General'}
                    </Badge>
                  </div>
                  {post.category === 'funding-alerts' && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      🚨 URGENT
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h2 className={`
                    font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors mb-3
                    ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}
                  `}>
                    {post.title}
                  </h2>

                  <p className={`
                    text-gray-600 dark:text-gray-400 mb-4 line-clamp-3
                    ${index === 0 ? 'text-base' : 'text-sm'}
                  `}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>

                    <Button variant="ghost" size="sm" className="group-hover:text-blue-600">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
