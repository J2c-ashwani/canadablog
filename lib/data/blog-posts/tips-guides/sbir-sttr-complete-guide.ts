// lib/data/blog-posts/tips-guides/sbir-sttr-complete-guide.ts
import type { BlogPost } from '../../blogPosts';

const post: BlogPost = {
    id: 84,
    slug: "sbir-sttr-complete-guide",
    shortAnswerQuestion: "How can my business apply for SBIR & STTR Grants Complete Guide 2026 in 2026?",

    title: "SBIR & STTR Grants Complete Guide 2026 | Small Business Innovation Research",

    excerpt: "Complete guide to SBIR and STTR grants. Learn eligibility requirements, application process, funding phases, and tips to win up to $1.7M in federal R&D funding.",
    category: "Tips & Guides",
    categoryColor: "bg-purple-100 text-purple-800",
    author: "Ashwani K.",
    date: "2025-12-01",
    readTime: "10 min read",
    image: "/images/blog/tech-innovation-theme.png",
    featured: false,
    type: "grant-news",

    relatedLinks: [
      { title: "Know Your RDA", href: "/guides/sbir-research-grants-guide", description: "Complete guide to applying for Small Business Innovation Research (SBIR) Phase I & II grants...." },
      { title: "Secure Market Validation", href: "/blog/manitoba-business-grants-2026", description: "Manitoba..." },
      { title: "Dual-Use Strategy", href: "/blog/doe-sbir-clean-energy-grants", description: "Complete 2026-2027 guide to DOE SBIR/STTR grants for clean energy startups. Phase I up to $200K, Phase II up to $1.85M f..." }
    ],
    content: "",
    seo: {
      keywords: ["SBIR", "&", "STTR", "Grants", "Complete"],
    }, shortAnswer: "To apply for SBIR & STTR Grants Complete Guide 2026, start by reviewing the eligibility criteria and preparing a project proposal. Complete guide to SBIR and STTR grants. Learn eligibility requirements, application process, funding phases, and tips to win up to $1.7M in federal R&D funding. Funding available: up to $1.7M.",
    metrics: [
      { label: 'SBIR', value: '$1.7M', description: 'Max award', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'STTR', value: '$1.7M', description: 'University req', color: 'text-blue-600', iconName: 'School' },
      { label: 'Rate', value: '20%', description: 'Approval rate', color: 'text-purple-600', iconName: 'TrendingUp' },
      { label: 'Type', value: 'Grant', description: 'Non-repayable', color: 'text-orange-600', iconName: 'Gift' }
    ],
    expertTip: {
      title: "STTR Requires Partnership",
      type: 'warning',
      content: "STTR (Small Business Technology Transfer) <strong>requires a formal university partnership</strong>. SBIR does not. Choose the right program for your situation."
    },

    faq: [
      {
        question: "What is the primary difference between SBIR and STTR?",
        answer: "Both fund innovative R&D. The key difference is that <strong>STTR requires formal collaboration</strong> with a non-profit research institution (like a university), whereas SBIR does not."
      },
      {
        question: "How much of the work must the small business do in an STTR?",
        answer: "In an STTR, the small business must perform at least <strong>40%</strong> of the R&D, and the partnered research institution must perform at least <strong>30%</strong>."
      },
      {
        question: "Are SBIR/STTR win rates low?",
        answer: "They are highly competitive. Phase I win rates generally hover between <strong>15% and 25%</strong>. However, if you win Phase I, the success rate for securing Phase II funding often jumps to 40% or 50%."
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
              "title": "SBIR & STTR Grants Complete Guide  | Small Business Innovation Research Funding Options Overview",
              "programs": [
                  {
                      "program": "Core SBIR & STTR Grants Complete Guide  | Small Business Innovation Research Grant",
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
