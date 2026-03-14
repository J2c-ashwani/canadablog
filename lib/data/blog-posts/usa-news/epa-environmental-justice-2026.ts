// lib/data/blog-posts/usa-news/epa-environmental-justice-2026.ts
import type { BlogPost } from '../../blogPosts';
import epaPost from './epa-environmental-justice-2025';

const post: BlogPost = {
    id: 2041,
    type: 'grant-news',
    slug: "epa-environmental-justice-2026",
    shortAnswerQuestion: "How can my business apply for EPA $100M Environmental Justice Grants in 2026?",

    title: "EPA $100M Environmental Justice Grants",

    excerpt: "🇺🇸 Funding for communities and non-profits fighting pollution and climate change in underserved areas. Application guide and success tips.",
    category: "USA News",
    categoryColor: "bg-teal-100 text-teal-800",
    author: "Ashwani K.",
    date: "2026-02-15",
    readTime: "10 min read",
    image: "/images/blog/clean-tech-grants-2026.png",
    featured: false,

    relatedLinks: [
      { title: "Scale Requirement", href: "/blog/territories-small-business-grants-guide", description: "Complete guide to Territories business grants. Access NWT Business Development, Yukon Small Business Support, Nunavut Ec..." },
      { title: "Programs", href: "/blog/canada-employment-workforce-training-grants-guide", description: "Complete guide to Canada..." },
      { title: "Apply via Partners", href: "/guides/nserc-research-grants-guide", description: "How to apply for Natural Sciences and Engineering Research Council grants...." }
    ],
    content: `
${epaPost}
    `,
    seo: {
      keywords: ["EPA grants", "environmental justice funding", "community change grants", "non-profit environmental grants", "climate justice funding"]
    }, shortAnswer: "To apply for EPA $100M Environmental Justice Grants, start by reviewing the eligibility criteria and preparing a project proposal. 🇺🇸 Funding for communities and non-profits fighting pollution and climate change in underserved areas. Application guide and success tips. Funding available: up to $100M.",
    metrics: [
      { label: 'Pool', value: '$100M', description: 'Total Funding', color: 'text-teal-600', iconName: 'Globe' },
      { label: 'Micro', value: '$100k', description: 'Small Grants', color: 'text-green-600', iconName: 'Users' },
      { label: 'Major', value: '$20M', description: 'Change Grants', color: 'text-blue-600', iconName: 'Map' }
    ],
    expertTip: {
      title: "Community First",
      type: 'warning',
      content: "The EPA rejects 76% of applications that lack 'meaningful community involvement'. You must prove that local residents are leading the project, not just beneficiaries of it."
    },
    faq: [
      {
        question: "Who is eligible?",
        answer: "Community-based non-profits, tribal governments, and local governments partnering with community groups."
      },
      {
        question: "What is 'EJScreen'?",
        answer: "It's the EPA's mapping tool. You MUST use it to show that your community is in a high-percentile area for pollution or poverty to qualify."
      },
      {
        question: "Can for-profits apply?",
        answer: "Generally no, unless specifically partnering on a Pollution Prevention (P2) grant to reduce industrial waste."
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
              "title": "EPA  Environmental Justice Grants Funding Options Overview",
              "programs": [
                  {
                      "program": "Core EPA  Environmental Justice Grants Grant",
                      "amount": "$100M",
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
