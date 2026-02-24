import { BlogPost } from './data/blogPosts';

export function generateMetadata(post: BlogPost) {
  // Determine OG category from post category
  const ogCategory = post.category?.toLowerCase().includes('women') ? 'women'
    : post.category?.toLowerCase().includes('usa') ? 'usa'
      : post.category?.toLowerCase().includes('technology') || post.category?.toLowerCase().includes('innovation') ? 'tech'
        : 'canada';

  const ogImageUrl = `/api/og?title=${encodeURIComponent(post.seo.metaTitle || post.title)}&subtitle=${encodeURIComponent(post.seo.metaDescription || post.excerpt)}&category=${ogCategory}`;

  return {
    title: post.seo.metaTitle || `${post.title} | FSI Digital`,
    description: post.seo.metaDescription || post.excerpt,
    keywords: post.seo.keywords.join(', '),
    openGraph: {
      title: post.seo.metaTitle || post.title,
      description: post.seo.metaDescription || post.excerpt,
      url: `https://www.fsidigital.ca/blog/${post.slug}`,
      siteName: 'FSI Digital',
      images: [
        {
          url: post.seo.ogImage || ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.metaTitle || post.title,
      description: post.seo.metaDescription || post.excerpt,
      images: [post.seo.ogImage || `/images/blog/${post.image}`],
    },
    alternates: {
      canonical: `https://www.fsidigital.ca/blog/${post.slug}`,
    },
  };
}

export function generateBlogPageMetadata() {
  return {
    title: 'Grant News, Alerts & Guides | FSI Digital Blog',
    description: 'Stay updated with the latest grant opportunities, funding alerts, and expert application guides for USA and Canada grants.',
    openGraph: {
      title: 'Grant News & Funding Alerts | FSI Digital Blog',
      description: 'Latest grant opportunities, funding alerts, and application guides for USA and Canada.',
      url: 'https://www.fsidigital.ca/blog',
      siteName: 'FSI Digital',
      images: [
        {
          url: '/images/blog/grant-finder-blog-og.png',
          width: 1200,
          height: 630,
          alt: 'FSI Digital Blog',
        },
      ],
      type: 'website',
    },
  };
}
