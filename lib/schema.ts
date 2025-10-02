import { BlogPost } from './data/blogPosts';

export function generateBlogPostSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": {
      "@type": "ImageObject",
      "url": `https://grantfinder.pro/images/blog/${post.image}`,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://grantfinder.pro"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Grant Finder Pro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://grantfinder.pro/images/logo.png",
        "width": 200,
        "height": 50
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://grantfinder.pro/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.seo.keywords.join(", "),
    "wordCount": post.content.length,
    "timeRequired": post.readTime
  };
}

export function generateBreadcrumbSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://grantfinder.pro"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://grantfinder.pro/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://grantfinder.pro/blog/${post.slug}`
      }
    ]
  };
}

export function generateBlogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Grant Finder Pro Blog",
    "description": "Latest grant opportunities, funding alerts, and application guides for USA and Canada",
    "url": "https://grantfinder.pro/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Grant Finder Pro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://grantfinder.pro/images/logo.png"
      }
    },
    "inLanguage": "en-US"
  };
}
