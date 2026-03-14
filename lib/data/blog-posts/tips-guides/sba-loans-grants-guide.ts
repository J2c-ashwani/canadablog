// lib/data/blog-posts/tips-guides/sba-loans-grants-guide.ts
import type { BlogPost } from '../../blogPosts';

const post: BlogPost = {
    id: 81,
    slug: "sba-loans-grants-guide",
    shortAnswerQuestion: "How can my business apply for SBA Loans & Grants Complete Guide 2026 in 2026?",

    title: "SBA Loans & Grants Complete Guide 2026 | Small Business Administration Funding",

    excerpt: "Complete guide to SBA loans and grants. Learn about 7(a) loans, microloans, CDC/504 loans, and SBA grant programs. Get up to $5M in funding.",
    category: "Tips & Guides",
    categoryColor: "bg-purple-100 text-purple-800",
    author: "Ashwani K.",
    date: "2025-12-01",
    readTime: "10 min read",
    image: "/images/blog/strategy-planning-theme.png",
    featured: false,
    type: "grant-news",

    relatedLinks: [
      { title: "Programs", href: "/blog/canada-clean-technology-innovation-grants", description: "Complete guide to Canadian clean technology innovation grants. Access $1.2B+ funding through SDTC (up to $15M), Clean Te..." },
      { title: "Programs", href: "/blog/canada-clean-technology-environment-grants-guide", description: "Complete guide to Canada..." },
      { title: "Focus on TRL", href: "/blog/dod-sbir-defense-tech-grants", description: "Complete 2026-2027 guide to Department of Defense SBIR/STTR grants for defense tech startups. Phase I up to $256K, Phase..." }
    ],
    content: "",
    seo: {
      keywords: ["SBA", "Loans", "&", "Grants", "Complete"],
    }, shortAnswer: "To apply for SBA Loans & Grants Complete Guide 2026, start by reviewing the eligibility criteria and preparing a project proposal. Complete guide to SBA loans and grants. Learn about 7(a) loans, microloans, CDC/504 loans, and SBA grant programs. Get up to $5M in funding. Funding available: up to $5M.",
    metrics: [
      { label: '7(a)', value: '$5M', description: 'General loans', color: 'text-green-600', iconName: 'DollarSign' },
      { label: '504', value: '$5.5M', description: 'Real estate', color: 'text-blue-600', iconName: 'Building' },
      { label: 'Micro', value: '$50K', description: 'Small loans', color: 'text-purple-600', iconName: 'Coins' },
      { label: 'SBIR', value: '$1.7M', description: 'R&D grants', color: 'text-orange-600', iconName: 'Zap' }
    ],
    expertTip: {
      title: "SBA Doesn't Give Grants",
      type: 'warning',
      content: "Despite common belief, <strong>SBA offers loans, not grants</strong>. The only SBA 'grants' are SBIR/STTR R&D funding, which have strict technical requirements."
    },
    jumpLinks: [
      { title: '7(a) Loans', id: 'sba-7a' },
      { title: '504 Loans', id: 'sba-504' },
      { title: 'Microloans', id: 'microloans' },
      { title: 'SBIR/STTR', id: 'sbir-sttr' },
      { title: 'FAQ', id: 'faq' }
    ],

    faq: [
      {
        question: "What is the difference between an SBA loan and an SBA grant?",
        answer: "SBA loans (like the 7a or 504) must be repaid with interest. <strong>SBA grants</strong> (like the STEP program or SBIR/STTR) do not need to be repaid, but they are highly specific and competitive."
      },
      {
        question: "How long does it take to get SBA funding?",
        answer: "It depends on the program. SBA Express loans can be approved in 36 hours. A standard 7(a) or 504 loan typically takes <strong>45 to 90 days</strong> from application to funding."
      },
      {
        question: "Does the SBA lend money directly to me?",
        answer: "Usually, no. The SBA works through <strong>approved lending partners</strong> (banks and credit unions). The only exception is SBA Disaster Assistance loans, which are issued directly by the federal government."
      }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Not sure which SBA program fits your business? Our funding specialists match you with the right loan or grant program in minutes.",
    },
      comparisonTable: {
              "title": "SBA Loans & Grants Complete Guide  | Small Business Administration Funding Funding Options Overview",
              "programs": [
                  {
                      "program": "Core SBA Loans & Grants Complete Guide  | Small Business Administration Funding Grant",
                      "amount": "Varies",
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
