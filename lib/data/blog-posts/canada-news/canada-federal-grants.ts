// lib/data/blog-posts/canada-news/canada-federal-grants.ts
import type { BlogPost } from '../../blogPosts';

const post: BlogPost = {
    id: 27,
    slug: "canada-federal-grants",
    shortAnswerQuestion: "How can my business apply for Canada Federal Grants 2025-2026 in 2026?",

    title: "Canada Federal Grants 2025-2026: Complete Funding Guide",

    excerpt: "Complete guide to government grants.",
    category: "Canada News",
    categoryColor: "bg-red-100 text-red-800",
    author: "Ashwani K.",
    date: "2025-12-01",
    readTime: "10 min read",
    image: "/images/blog/canada-grants-theme.png",
    featured: false,
    type: "grant-news",

    relatedLinks: [
      { title: "Audit First", href: "/blog/clean-technology-2026", description: "Environment and Climate Change Canada has launched the most comprehensive clean technology funding program in history, i..." },
      { title: "University Partnership", href: "/blog/nwbc-programs-guide", description: "Complete guide to NWBC programs and initiatives. Learn how the National Women..." },
      { title: "Certification is Required", href: "/blog/hardware-iot-startup-grants", description: "Complete 2026-2027 guide to hardware and IoT startup grants. NSF SBIR Phase I $305K, Phase II $1.25M, DOD electronics pr..." }
    ],
    content: "",
    seo: {
      keywords: ["Canada", "Federal", "Grants"],
    }, shortAnswer: "To apply for Canada Federal Grants 2025-2026, start by reviewing the eligibility criteria and preparing a project proposal. Complete guide to government grants.",
    jumpLinks: [
      { title: 'Programs', id: 'programs' },
      { title: 'Eligibility', id: 'eligibility' },
      { title: 'How to Apply', id: 'how-to-apply' },
      { title: 'FAQ', id: 'faq' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Get matched with the right alternative or direct funding for Canada Federal Grants — our specialists navigate the complex federal and provincial channels for you.",
    },
    metrics: [
      { label: 'Total', value: '$10B+', description: 'Annual Funding', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Programs', value: '4,000+', description: 'Active Grants', color: 'text-blue-600', iconName: 'List' },
      { label: 'Types', value: 'Diverse', description: 'Grant/Loan/Tax', color: 'text-purple-600', iconName: 'Layers' },
      { label: 'Scope', value: 'National', description: 'All Provinces', color: 'text-orange-600', iconName: 'Map' }
    ],
    expertTip: {
      title: "Stack Funding Programs",
      type: 'tip',
      content: "Federal grants can often be <strong>stacked with provincial funding</strong>. Always check if you can apply for both a federal wage subsidy and a provincial training grant for the same employee."
    },
      comparisonTable: {
              "title": "Canada Federal Grants Funding Options Overview",
              "programs": [
                  {
                      "program": "Core Canada Federal Grants Grant",
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
          },
      faq: [
              {
                  "question": "What is the application deadline for Canada Federal Grants in 2025-2026?",
                  "answer": "Deadlines typically vary by specific program tier. However, for 2025-2026, many initiatives operate on a rolling intake basis until funds are depleted. Check the official portal for specific cutoffs."
              },
              {
                  "question": "How much funding can I get through Canada Federal Grants?",
                  "answer": "Funding amounts range depending on business size and scope. Typically, grants cover a percentage of eligible project costs."
              },
              {
                  "question": "Do I have to give up equity for this program?",
                  "answer": "No. Government grants and subsidies are non-dilutive, meaning you retain 100% ownership of your company."
              }
          ]
};

export default post;
