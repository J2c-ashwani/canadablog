// lib/data/blog-posts/usa-news/quebec-innovation-grants.ts
import type { BlogPost } from '../../blogPosts';

const post: BlogPost = {
    id: 73,
    slug: "quebec-innovation-grants",
    shortAnswerQuestion: "What innovation and technology grants are available in 2026?",

    title: "Quebec Innovation Grants & Tax Credits 2026 | 30% CRIC R&D Tax Credit | $2.5B+ Funding",

    excerpt: "Complete guide to Quebec innovation grants and tax credits. Access $2.5B+ through 30% Quebec R&D Tax Credit (CRIC), Investissement Qu\u00e9bec, PRIMA Quebec, and aerospace, gaming, biotech programs.",
    category: "USA News",
    categoryColor: "bg-blue-100 text-blue-800",
    author: "Ashwani K.",
    date: "2025-12-01",
    readTime: "10 min read",
    image: "/images/blog/canada-grants-theme.png",
    featured: false,
    type: "grant-news",

    relatedLinks: [
      { title: "Layered WES Funding", href: "/blog/women-export-trade-grants-canada", description: "Complete 2026-2027 guide to export grants for women entrepreneurs. CanExport SME funding up to $75K, EDC financing, Trad..." },
      { title: "LMI Benefit", href: "/blog/nsf-stem-research-2026", description: "The NSF seeds the future with $200 million in STEM research grants. The SBIR/STTR program funds high-risk, high-impact t..." },
      { title: "SAM.gov is the Gatekeeper", href: "/blog/canexport-grants-2026", description: "Canada..." }
    ],
    content: "",
    seo: {
      keywords: ["Quebec", "Innovation", "Grants", "&", "Tax"],
    }, shortAnswer: "Yes — Complete guide to Quebec innovation grants and tax credits. Access $2.5B+ through 30% Quebec R&D Tax Credit (CRIC), Investissement Québec, PRIMA Quebec, and aerospace, gaming, biotech programs. Funding available: up to $2.5B+.",
    metrics: [
      { label: 'Fund', value: '$2.5B', description: 'Provincial Pool', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'R&D Credit', value: '30%', description: 'CRIC Rate', color: 'text-blue-600', iconName: 'TrendingUp' },
      { label: 'Agency', value: 'IQ', description: 'Investissement QC', color: 'text-purple-600', iconName: 'Building' },
      { label: 'Scope', value: 'Tech', description: 'Innovation Focus', color: 'text-orange-600', iconName: 'Cpu' }
    ],
    expertTip: {
      title: "Combine Federal & Provincial",
      type: 'success',
      content: "Quebec companies can <strong>stack federal SR&ED</strong> (15-35%) with Quebec's CRIC (30%), achieving total R&D tax credits of 45-65%—the highest in North America."
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
              "title": "Quebec Innovation Grants & Tax Credits  | 30% CRIC R&D Tax Credit | .5B+ Funding Funding Options Overview",
              "programs": [
                  {
                      "program": "Core Quebec Innovation Grants & Tax Credits  | 30% CRIC R&D Tax Credit | .5B+ Funding Grant",
                      "amount": "$2",
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
                  "question": "What is the application deadline for Quebec Innovation Grants & Tax Credits  | 30% CRIC R&D Tax Credit | .5B+ Funding in 2026?",
                  "answer": "Deadlines typically vary by specific program tier. However, for 2026, many initiatives operate on a rolling intake basis until funds are depleted. Check the official portal for specific cutoffs."
              },
              {
                  "question": "How much funding can I get through Quebec Innovation Grants & Tax Credits  | 30% CRIC R&D Tax Credit | .5B+ Funding?",
                  "answer": "Funding amounts range depending on business size and scope. Top awards can reach $2."
              },
              {
                  "question": "Do I have to give up equity for this program?",
                  "answer": "No. Government grants and subsidies are non-dilutive, meaning you retain 100% ownership of your company."
              }
          ]
};

export default post;
