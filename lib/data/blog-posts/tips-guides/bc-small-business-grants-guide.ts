// lib/data/blog-posts/tips-guides/bc-small-business-grants-guide.ts
import type { BlogPost } from '../../blogPosts';

const post: BlogPost = {
  id: 10,
  slug: "bc-small-business-grants-guide",
  shortAnswerQuestion: "What government grants and regional funding programs are available in British Columbia for 2026?",
  title: "BC Small Business Grants 2026 | $1.3B+ British Columbia SME Funding",
  excerpt: "Learn how to qualify and apply for BC Small Business Grants in 2026. Access active regional PacifiCan capital, training grants, and women's funding support.",
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
    metaTitle: "BC Small Business Grants 2026: Complete SME Guide",
    metaDescription: "Learn how to qualify and apply for BC Small Business Grants in 2026. Access active regional PacifiCan capital, training grants, and women's funding support.",
    intent: "grant",
    seoVersion: 2,
    seoUpdatedAt: "2026-07-10T14:10:00.000Z"
  }
};

export default post;
