// lib/data/blog-posts/canada-news/women-entrepreneurship-strategy-canada-government-grants.ts
import type { BlogPost } from '../../blogPosts';

const post: BlogPost = {
    id: 103,
    slug: "women-entrepreneurship-strategy-canada-government-grants",
    shortAnswerQuestion: "What grants are available for women-owned businesses in 2026?",

    title: "Women Entrepreneurship Strategy Canada 2026 | WES Federal Funding Guide | $6B Investment",

    excerpt: "Complete guide to Canada",
    category: "Canada News",
    categoryColor: "bg-red-100 text-red-800",
    author: "Ashwani K.",
    date: "2025-12-01",
    readTime: "10 min read",
    image: "/images/blog/canada-grants-theme.png",
    featured: false,
    type: "grant-news",

    relatedLinks: [
      { title: "Know Your RDA", href: "/guides/sbir-research-grants-guide", description: "Complete guide to applying for Small Business Innovation Research (SBIR) Phase I & II grants...." },
      { title: "ITA Relationship", href: "/blog/irap-industrial-research-assistance-program-government-grants", description: "Complete guide to IRAP government funding for Canadian R&D projects. Federal compliance, reporting requirements, and str..." },
      { title: "Réseau Connection", href: "/blog/rbc-women-entrepreneur-awards", description: "Comprehensive guide to RBC Canadian Women Entrepreneur Awards 2026. Learn eligibility, application process, 8 award cate..." }
    ],
    content: "",
    seo: {
      keywords: ["Women", "Entrepreneurship", "Strategy", "Canada", "2026"]
    }, shortAnswer: "Yes — Complete guide to Canada Funding available: up to $6B.",
    metrics: [
      { label: 'Total', value: '$6B', description: 'Investment', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Programs', value: '15+', description: 'WES Initiatives', color: 'text-blue-600', iconName: 'Award' },
      { label: 'Agency', value: 'ISED', description: 'Federal Lead', color: 'text-red-600', iconName: 'Building' },
      { label: 'Access', value: 'Multiple', description: 'Funding Paths', color: 'text-purple-600', iconName: 'Zap' }
    ],
    expertTip: {
      title: "Layered WES Funding",
      type: 'success',
      content: "Combine WES <strong>non-repayable grants</strong> with WES loan programs and WES ecosystem services for comprehensive support package worth $100K+ in total value."
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
              "title": "Women Entrepreneurship Strategy Canada  | WES Federal Funding Guide |  Investment Funding Options Overview",
              "programs": [
                  {
                      "program": "Core Women Entrepreneurship Strategy Canada  | WES Federal Funding Guide |  Investment Grant",
                      "amount": "$6B",
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
                  "question": "What is the application deadline for Women Entrepreneurship Strategy Canada  | WES Federal Funding Guide |  Investment in 2026?",
                  "answer": "Deadlines typically vary by specific program tier. However, for 2026, many initiatives operate on a rolling intake basis until funds are depleted. Check the official portal for specific cutoffs."
              },
              {
                  "question": "How much funding can I get through Women Entrepreneurship Strategy Canada  | WES Federal Funding Guide |  Investment?",
                  "answer": "Funding amounts range depending on business size and scope. Top awards can reach $6B."
              },
              {
                  "question": "Do I have to give up equity for this program?",
                  "answer": "No. Government grants and subsidies are non-dilutive, meaning you retain 100% ownership of your company."
              }
          ]
};

export default post;
