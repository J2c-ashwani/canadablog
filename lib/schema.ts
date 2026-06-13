import { BlogPost } from './data/blogPosts';
import type { OfficialSource } from './editorial/priorityResearch';

const SITE_URL = 'https://www.fsidigital.ca';

function toAbsoluteUrl(url: string | undefined, fallback: string) {
  const value = url || fallback;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
}

interface EditorialSchemaDetails {
  dateModified: string;
  reviewedBy: string;
  reviewerRole: string;
  sources: OfficialSource[];
}

export function generateBlogPostSchema(post: BlogPost, editorial?: EditorialSchemaDetails) {
  // Strip HTML for accurate word count
  const plainText = post.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = plainText.split(' ').filter(w => w.length > 0).length;
  const imageUrl = toAbsoluteUrl(post.seo?.ogImage || post.image, '/og-image.png');

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.shortAnswer || post.excerpt,
    "image": {
      "@type": "ImageObject",
      "url": imageUrl,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://www.fsidigital.ca"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FSI Digital",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.fsidigital.ca/logo.png",
        "width": 200,
        "height": 50
      }
    },
    "datePublished": post.date,
    "dateModified": editorial?.dateModified || post.seo?.seoUpdatedAt || post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.fsidigital.ca/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.seo?.keywords?.join(", ") || "",
    "wordCount": wordCount || undefined,
    "timeRequired": post.readTime
  };

  if (editorial) {
    schema.reviewedBy = {
      "@type": "Person",
      "name": editorial.reviewedBy,
      "jobTitle": editorial.reviewerRole,
      "url": "https://www.fsidigital.ca/about"
    };
    schema.citation = editorial.sources.map(source => source.url);
  }

  // Speakable schema: helps Google Assistant / AI Overviews quote our short answer
  if (post.shortAnswer) {
    schema.speakable = {
      "@type": "SpeakableSpecification",
      "cssSelector": [".short-answer-box", "h1"]
    };
  }

  return schema;
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
        "item": "https://www.fsidigital.ca"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.fsidigital.ca/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://www.fsidigital.ca/blog/${post.slug}`
      }
    ]
  };
}

export function generateBlogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "FSI Digital Blog",
    "description": "Latest grant opportunities, funding alerts, and application guides for USA and Canada",
    "url": "https://www.fsidigital.ca/blog",
    "publisher": {
      "@type": "Organization",
      "name": "FSI Digital",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.fsidigital.ca/logo.png"
      }
    },
    "inLanguage": "en-US"
  };
}

export function generateFAQSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}
