// lib/data/blog-posts/tips-guides/atlantic-small-business-grants-guide.ts
import type { BlogPost } from '../../blogPosts';

const post: BlogPost = {
  id: 75, // keeping the unique ID
  slug: "atlantic-small-business-grants-guide",
  shortAnswerQuestion: "What government grants and regional funding programs are available in Atlantic Canada for 2026?",
  title: "Atlantic Canada Small Business Grants 2026 | Complete Guide",
  excerpt: "Learn how to qualify and apply for Atlantic Canada Small Business Grants in 2026. Access active ACOA interest-free loans, vouchers, and provincial subsidies.",
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
    metaTitle: "Atlantic Canada Small Business Grants 2026: Complete SME Guide",
    metaDescription: "Learn how to qualify and apply for Atlantic Canada Small Business Grants in 2026. Access active ACOA interest-free loans, vouchers, and provincial subsidies.",
    intent: "grant",
    seoVersion: 2,
    seoUpdatedAt: "2026-07-10T14:40:00.000Z"
  }
};

export default post;
