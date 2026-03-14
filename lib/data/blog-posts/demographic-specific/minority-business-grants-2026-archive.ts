// lib/data/blog-posts/demographic-specific/minority-business-grants-2026-archive.ts
import type { BlogPost } from '../../blogPosts';
import minorityBusiness2025 from '../../blog-posts/demographic-specific/minority-business-grants-2025';

const post: BlogPost = {
    id: 3008,
    slug: "minority-business-grants-2026-archive",
    shortAnswerQuestion: "What grants are available for minority-owned businesses in 2026?",

    title: "Minority Business Enterprise Grants 2025: $1.9B Funding Guide",

    excerpt: "Minority-owned businesses are driving economic growth with $1.9 trillion in revenue. Access $1.9 billion in targeted grants, SBA 8(a) contracts, and NMSDC opportunities.",
    category: "Demographic-Specific",
    categoryColor: "bg-purple-100 text-purple-800",
    author: "Ashwani K.",
    date: "2025-02-16",
    readTime: "13 min read",
    image: "/images/blog/minority-business-theme.png",
    featured: false,
    type: "grant-news",

    relatedLinks: [
      { title: "Dual Diversity Priority", href: "/blog/women-entrepreneurship-fund-canada", description: "Complete guide to Women Entrepreneurship Fund (WEF) non-repayable grants for women-owned businesses. Get funding for exp..." },
      { title: "WES Ecosystem Approach", href: "/blog/women-entrepreneurship-strategy-canada-government-grants", description: "Complete guide to Canada..." },
      { title: "Get Certified", href: "/blog/women-business-grants-2026", description: "🇺🇸 A curated list of grants for women entrepreneurs in 2026. Featuring the Amber Grant, Cartier Women..." }
    ],
    content: minorityBusiness2025,
    seo: {
      keywords: ["Minority Grants", "MBE Certification", "SBA 8(a)", "NMSDC", "Supplier Diversity"]
    }, shortAnswer: "Yes — Minority-owned businesses are driving economic growth with $1.9 trillion in revenue. Access $1.9 billion in targeted grants, SBA 8(a) contracts, and NMSDC opportunities. Funding available: up to $1.9B (with related programs offering $1.9).",
    metrics: [
      { label: 'Targeted', value: '$1.9B', description: 'Grant Funding', color: 'text-purple-600', iconName: 'Users' },
      { label: 'Contracts', value: '$3.8B', description: 'SBA 8(a)', color: 'text-blue-600', iconName: 'Briefcase' },
      { label: 'Success', value: '86%', description: 'Certified MBEs', color: 'text-green-600', iconName: 'CheckCircle' },
      { label: 'Gap', value: '8.2%', description: 'VC Share', color: 'text-red-600', iconName: 'AlertTriangle' }
    ],
    expertTip: {
      title: "Certification is Key",
      type: 'tip',
      content: "Getting certified as an <strong>MBE (Minority Business Enterprise)</strong> through NMSDC or SBA 8(a) unlocks access to 90% of restricted funding pools."
    },
    faq: [
      {
        question: "What qualifies as a Minority Business Enterprise (MBE)?",
        answer: "A business must be at least <strong>51% owned, operated, and controlled</strong> by individuals who belong to one of several minority groups, including Black American, Hispanic American, Native American, or Asian Pacific American."
      },
      {
        question: "What is the NMSDC?",
        answer: "The <strong>National Minority Supplier Development Council (NMSDC)</strong> is a powerful private organization that certifies MBEs and connects them with major corporate Supplier Diversity procurement programs."
      },
      {
        question: "Does the SBA offer specific grants for minority founders?",
        answer: "While the SBA does not offer direct general grants, the <strong>SBA 8(a) Business Development Program</strong> provides massive set-aside contract opportunities and technical assistance exclusively for disadvantaged businesses."
      }
    ],
    eligibleCheck: true,
    inlineCTA: {
      title: "Need expert help applying for grants?",
      description: "Our funding specialists can help you navigate government programs and maximize your funding potential.",
      buttonText: "Get Funding Assistance",
      buttonLink: "/contact"
    },
    jumpLinks: [
      { title: "Overview", id: "overview" },
      { title: "Eligibility Requirements", id: "eligibility" },
      { title: "How to Apply", id: "how-to-apply" }
    ],
      comparisonTable: {
              "title": "Minority Business Enterprise Grants : .9B Funding Guide Funding Options Overview",
              "programs": [
                  {
                      "program": "Core Minority Business Enterprise Grants : .9B Funding Guide Grant",
                      "amount": "$1",
                      "equity": "Non-dilutive",
                      "bestFor": "Eligible Applicants",
                      "timeline": "Standard Review"
                  },
                  {
                      "program": "Related Provincial Match",
                      "amount": "Up to 50%",
                      "equity": "0%",
                      "bestFor": "Expansion Projects",
                      "timeline": "45 Days"
                  },
                  {
                      "program": "Federal Support Program",
                      "amount": "Varies",
                      "equity": "Non-dilutive",
                      "bestFor": "Scaling Businesses",
                      "timeline": "90 Days"
                  }
              ]
          }
};

export default post;
