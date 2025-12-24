import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { getCategoryWithCounts } from '@/lib/data/blogPosts';
import { BookOpen, TrendingUp } from 'lucide-react';

interface CategorySidebarProps {
  type?: 'grant-news' | 'expert-insight';
}

export default function CategorySidebar({ type }: CategorySidebarProps) {
  const categoriesWithCounts = getCategoryWithCounts(type);
  const totalPosts = categoriesWithCounts.reduce((sum, cat) => sum + cat.count, 0);

  const basePath = type === 'expert-insight' ? '/expert-insights' : '/blog';

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
        <h3 className="font-semibold text-gray-900 dark:text-white">Categories</h3>
      </div>

      <div className="space-y-3 mb-6">
        <Link
          href={basePath}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
        >
          <span className="text-gray-700 dark:text-gray-300">All Posts</span>
          <Badge variant="secondary">{totalPosts}</Badge>
        </Link>

        {categoriesWithCounts.map((category) => (
          <Link
            key={category.id}
            href={`${basePath}?category=${category.slug}`}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors group"
          >
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${category.color.includes('blue') ? 'bg-blue-500' :
                category.color.includes('red') ? 'bg-red-500' :
                  category.color.includes('yellow') ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600">
                {category.name}
              </span>
            </div>
            <Badge variant="secondary">{category.count}</Badge>
          </Link>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-neutral-700 pt-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>Updated daily</span>
        </div>
      </div>
    </div>
  );
}
