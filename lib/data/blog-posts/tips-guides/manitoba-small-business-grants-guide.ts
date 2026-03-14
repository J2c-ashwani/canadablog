// lib/data/blog-posts/tips-guides/manitoba-small-business-grants-guide.ts
import type { BlogPost } from '../../blogPosts';

const post: BlogPost = {
    id: 58,
    slug: "manitoba-small-business-grants-guide",
    shortAnswerQuestion: "What small business grants are available in 2026?",

    title: "Manitoba Small Business Grants 2026 | $380M+ Business Development Programs",

    excerpt: "Complete guide to Manitoba small business grants. Access Manitoba Business Development, Innovation Growth Program, Small Business Venture Capital, and Rural Development Corporation funding.",
    category: "Tips & Guides",
    categoryColor: "bg-purple-100 text-purple-800",
    author: "Ashwani K.",
    date: "2025-12-01",
    readTime: "10 min read",
    image: "/images/blog/canada-grants-theme.png",
    featured: false,
    type: "grant-news",

    relatedLinks: [
      { title: "Programs", href: "/blog/canada-hiring-training-grants-guide", description: "Complete guide to Canadian hiring and training grants. Access all 28+ workforce development programs including job creat..." },
      { title: "Answer the ", href: "/guides/apply-irap-grants", description: "Complete guide to applying for Industrial Research Assistance Program funding in Canada...." },
      { title: "Indigenous Set-Asides Have Priority", href: "/guides/canada-aerospace-defence-funding-guide", description: "Access specialized funding for aerospace and defence industry projects...." }
    ],
    content: "",
    seo: {
      keywords: ["Manitoba", "Small", "Business", "Grants", "2026"],
    }, shortAnswer: "Yes — Complete guide to Manitoba small business grants. Access Manitoba Business Development, Innovation Growth Program, Small Business Venture Capital, and Rural Development Corporation funding. Funding available: up to $380M+.",
    metrics: [
      { label: 'Pool', value: '$380M', description: 'Total Funds', color: 'text-green-600', iconName: 'Database' },
      { label: 'Focus', value: 'SME', description: 'Target', color: 'text-blue-600', iconName: 'Briefcase' },
      { label: 'Region', value: 'MB', description: 'Province', color: 'text-purple-600', iconName: 'Map' },
      { label: 'Type', value: 'Mixed', description: 'Grant/Loan', color: 'text-orange-600', iconName: 'Layers' }
    ],
    expertTip: {
      title: "Northern Bonus",
      type: 'tip',
      content: "Projects located in <strong>Northern Manitoba</strong> often garner extra scoring points and higher funding ratios. Highlight your rural or northern impact clearly."
    },
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
              "title": "Manitoba Small Business Grants  | + Business Development Programs Funding Options Overview",
              "programs": [
                  {
                      "program": "Core Manitoba Small Business Grants  | + Business Development Programs Grant",
                      "amount": "$380M",
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
          },
      faq: [
              {
                  "question": "What is the application deadline for Manitoba Small Business Grants  | + Business Development Programs in 2026?",
                  "answer": "Deadlines typically vary by specific program tier. However, for 2026, many initiatives operate on a rolling intake basis until funds are depleted. Check the official portal for specific cutoffs."
              },
              {
                  "question": "How much funding can I get through Manitoba Small Business Grants  | + Business Development Programs?",
                  "answer": "Funding amounts range depending on business size and scope. Top awards can reach $380M."
              },
              {
                  "question": "Do I have to give up equity for this program?",
                  "answer": "No. Government grants and subsidies are non-dilutive, meaning you retain 100% ownership of your company."
              }
          ]
};

export default post;
