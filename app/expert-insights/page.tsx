import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import FeaturedStories from '@/components/blog/FeaturedStories';
import BlogCard from '@/components/blog/BlogCard';
import CategorySidebar from '@/components/blog/CategorySidebar';
import NewsletterBox from '@/components/blog/NewsletterBox';
import AdSlot from '@/components/blog/AdSlot';
import { getExpertInsightPosts } from '@/lib/data/blogPosts';
import { generateBlogSchema } from '@/lib/schema';

export async function generateMetadata({
    searchParams
}: {
    searchParams: Promise<{ category?: string; page?: string }>
}): Promise<Metadata> {
    const resolvedParams = await searchParams;
    const { category, page } = resolvedParams;
    const pageNum = parseInt(page || '1');

    // Base URL
    const baseUrl = 'https://www.fsidigital.ca/expert-insights';

    // Construct Title & Description
    let title = "Expert Insights & Government Grant Analysis | FSI Digital";
    let description = "Deep dive analysis, expert strategies, and comprehensive guides for securing government funding and business grants.";

    if (category) {
        const readableCategory = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        title = `${readableCategory} Grants Analysis & Insights | FSI Digital`;
        description = `Read expert insights and analysis on ${readableCategory} government grants and funding opportunities.`;
    }

    if (pageNum > 1) {
        title = `${title} - Page ${pageNum}`;
    }

    // Construct Canonical URL
    // If page=1, strip it. If category exists, keep it.
    let canonicalUrl = baseUrl;
    const params = new URLSearchParams();

    if (category) {
        params.set('category', category);
    }
    // We generally don't include page=1 in canonical
    if (pageNum > 1) {
        params.set('page', pageNum.toString());
    }

    const queryString = params.toString();
    if (queryString) {
        canonicalUrl = `${baseUrl}?${queryString}`;
    }

    return {
        title,
        description,
        keywords: "grant analysis, expert grant tips, business funding strategies, grant writing advice, government funding insights",
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: "FSI Digital",
            images: [
                {
                    url: "/images/blog/grant-finder-blog-og.png",
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            type: "website",
        },
        alternates: {
            canonical: canonicalUrl,
        },
        robots: {
            index: true,
            follow: true,
        }
    };
}

export default async function ExpertInsightsPage({
    searchParams
}: {
    searchParams: Promise<{ category?: string; page?: string }>
}) {
    const resolvedParams = await searchParams;
    const allPosts = getExpertInsightPosts();
    const selectedCategory = resolvedParams.category;
    const currentPage = parseInt(resolvedParams.page || '1');
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
                        Expert Insights
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Deep dives, strategic advice, and expert analysis on the government funding landscape.
                    </p>
                </div>

                {/* Featured Stories */}
                <FeaturedStories type="expert-insight" />

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
                                    No expert insights found in this category yet.
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
                                            href={`/expert-insights?${selectedCategory ? `category=${selectedCategory}&` : ''}page=${page}`}
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
                            <CategorySidebar type="expert-insight" />

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
