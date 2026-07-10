// lib/data/blog-posts/tips-guides/manitoba-small-business-grants-guide.ts
import type { BlogPost } from '../../blogPosts';

const post: BlogPost = {
  id: 74, // keeping the unique ID
  slug: "manitoba-small-business-grants-guide",
  shortAnswerQuestion: "What government grants and business scaling programs are available in Manitoba for 2026?",
  title: "Manitoba Small Business Grants 2026 | Complete Guide",
  excerpt: "Learn how to qualify and apply for Manitoba Small Business Grants in 2026. Access active PrairiesCan capital, training grants, and MIDMTC digital credits.",
  category: "Tips & Guides",
  categoryColor: "bg-purple-100 text-purple-800",
  author: "Ashwani K.",
  date: "2025-12-01",
  readTime: "10 min read",
  image: "/images/blog/canada-grants-theme.png",
  featured: false,
  type: "grant-news",
  relatedLinks: [
    { title: "Canada SME Grants", href: "/canada/small-business-grants", description: "Complete guide to Canadian small business grants and working capital rules." },
    { title: "IRAP Guide", href: "/blog/canada-irap-grants-2026", description: "Detailed roadmap to securing Industrial Research Assistance funding." },
    { title: "Ontario SME Grants", href: "/blog/ontario-small-business-grants-guide", description: "Regional program lists for Ontario-based startups." }
  ],
  content: "",
  seo: {
    metaTitle: "Manitoba Small Business Grants 2026: Complete SME Guide",
    metaDescription: "Learn how to qualify and apply for Manitoba Small Business Grants in 2026. Access active PrairiesCan capital, training grants, and MIDMTC digital credits.",
    intent: "grant",
    seoVersion: 2,
    seoUpdatedAt: "2026-07-10T14:40:00.000Z"
  }
};

export default post;
