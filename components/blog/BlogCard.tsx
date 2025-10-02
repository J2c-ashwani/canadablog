import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import { BlogPost, blogCategories } from '@/lib/data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const category = blogCategories.find(cat => cat.id === post.category);
  
  return (
    <article className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img
            src={`/images/blog/${post.image}`}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge className={category?.color || 'bg-gray-100 text-gray-800'}>
              {category?.name || 'General'}
            </Badge>
            {post.featured && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                Featured
              </span>
            )}
          </div>
          
          <h2 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
            {post.title}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
            {post.excerpt}
          </p>
          
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
        </div>
      </Link>
    </article>
  );
}
