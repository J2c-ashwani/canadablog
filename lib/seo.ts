import { BlogPost } from './data/blogPosts';

export function generateMetadata(post: BlogPost) {
  return {
    title: post.seo.metaTitle || `${post.title} | Grant Finder Pro`,
    description: post.seo.metaDescription || post.excerpt,
    keywords: post.seo.keywords.join(', '),
    openGraph: {
      title: post.seo.metaTitle || post.title,
      description: post.seo.metaDescription || post.excerpt,
      url: `https://grantfinder.pro/blog/${post.slug}`,
      siteName: 'Grant Finder Pro',
      images: [
        {
          url: post.seo.ogImage || `/images/blog/${post.image}`,
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
      canonical: `https://grantfinder.pro/blog/${post.slug}`,
    },
  };
}

export function generateBlogPageMetadata() {
  return {
    title: 'Grant News, Alerts & Guides | Grant Finder Pro Blog',
    description: 'Stay updated with the latest grant opportunities, funding alerts, and expert application guides for USA and Canada grants.',
    openGraph: {
      title: 'Grant News & Funding Alerts | Grant Finder Pro Blog',
      description: 'Latest grant opportunities, funding alerts, and application guides for USA and Canada.',
      url: 'https://grantfinder.pro/blog',
      siteName: 'Grant Finder Pro',
      images: [
        {
          url: '/images/blog/grant-finder-blog-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Grant Finder Pro Blog',
        },
      ],
      type: 'website',
    },
  };
}
