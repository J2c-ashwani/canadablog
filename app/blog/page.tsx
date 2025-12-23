import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import FeaturedStories from '@/components/blog/FeaturedStories';
import BlogCard from '@/components/blog/BlogCard';
import CategorySidebar from '@/components/blog/CategorySidebar';
import NewsletterBox from '@/components/blog/NewsletterBox';
import AdSlot from '@/components/blog/AdSlot';
import { getAllBlogPosts } from '@/lib/data/blogPosts';
import { generateBlogPageMetadata } from '@/lib/seo';
import { generateBlogSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: "Grant News, Alerts & Guides | FSI Digital Blog",
  description: "Stay updated with the latest grant opportunities, funding alerts, and expert application guides for USA and Canada grants.",
  keywords: "grant funding blog, government grants news, funding opportunities, grant alerts, business funding tips, entrepreneur grants",
  openGraph: {
    title: "Grant News & Funding Alerts | FSI Digital Blog",
    description: "Latest grant opportunities, funding alerts, and application guides for USA and Canada.",
    url: "https://www.fsidigital.ca/blog",
    siteName: "FSI Digital",
    images: [
      {
        url: "/images/blog/grant-finder-blog-og.png",
        width: 1200,
        height: 630,
        alt: "FSI Digital Blog",
      },
    ],
    type: "website",
  },
};

export default function BlogPage({
  searchParams
}: {
  searchParams: { category?: string; page?: string }
}) {
  const allPosts = getAllBlogPosts();
  const selectedCategory = searchParams.category;
  const currentPage = parseInt(searchParams.page || '1');
  const postsPerPage = 9;

  // Filter posts by category if selected
  const filteredPosts = selectedCategory
    ? allPosts.filter(post => post.category === selectedCategory)
    : allPosts;

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const blogSchema = generateBlogSchema();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <Header />

      {/* Header Ad */}
      <div className="container mx-auto px-4 py-4">
        <AdSlot
          adSlot="1234567890"
          adFormat="horizontal"
          className="mb-6"
          style={{ minHeight: '90px' }}
        />
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Grant News & Funding Alerts
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stay updated with the latest grant opportunities, funding alerts, and expert application guides for USA and Canada grants.
          </p>
        </div>

        {/* Featured Stories */}
        <FeaturedStories />

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filter Header */}
            {selectedCategory && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedCategory.split('-').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')} Posts
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredPosts.length} articles found
                </p>
              </div>
            )}

            {/* Blog Grid */}
            {paginatedPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {paginatedPosts.map((post, index) => (
                  <div key={post.id}>
                    <BlogCard post={post} />

                    {/* In-content Ad after every 3rd post */}
                    {(index + 1) % 3 === 0 && (
                      <div className="mt-6">
                        <AdSlot
                          adSlot="2345678901"
                          adFormat="rectangle"
                          style={{ minHeight: '250px' }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No posts found in this category.
                </p>
              </div>
            )}

            {/* Simple Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <a
                      key={page}
                      href={`/blog?${selectedCategory ? `category=${selectedCategory}&` : ''}page=${page}`}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-neutral-800'
                        }`}
                    >
                      {page}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <CategorySidebar />

              {/* Sidebar Ad */}
              <AdSlot
                adSlot="3456789012"
                adFormat="vertical"
                style={{ minHeight: '600px' }}
              />

              <NewsletterBox />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
