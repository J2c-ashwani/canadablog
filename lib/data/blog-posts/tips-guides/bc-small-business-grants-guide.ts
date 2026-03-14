// lib/data/blog-posts/tips-guides/bc-small-business-grants-guide.ts
import type { BlogPost } from '../../blogPosts';

const post: BlogPost = {
    id: 10,
    slug: "bc-small-business-grants-guide",
    shortAnswerQuestion: "What small business grants are available in 2026?",

    title: "BC Small Business Grants 2026 | $1.3B+ British Columbia SME Funding",

    excerpt: "Complete guide to BC small business grants. Access Small Business Recovery Grant, BC Small Business Venture Capital, CleanBC Industry Fund, and Indigenous business investment programs.",
    category: "Tips & Guides",
    categoryColor: "bg-purple-100 text-purple-800",
    author: "Ashwani K.",
    date: "2025-12-01",
    readTime: "10 min read",
    image: "/images/blog/canada-grants-theme.png",
    featured: false,
    type: "grant-news",

    relatedLinks: [
      { title: "Secure Market Validation", href: "/blog/manitoba-business-grants-2026", description: "Manitoba..." },
      { title: "Language Compliance (Bill 96)", href: "/blog/quebec-innovation-grants", description: "Complete guide to Quebec innovation grants and tax credits. Access $2.5B+ through 30% Quebec R&D Tax Credit (CRIC), Inve..." },
      { title: "Pacific Northwest Advantage", href: "/blog/wbdc-equity-match-grant-women", description: "Complete guide to WBDC Equity Match Grant with quarterly deadlines, $2,500-$10,000 funding for Connecticut women-owned b..." }
    ],
    content: "",
    seo: {
      keywords: ["BC", "Small", "Business", "Grants", "2026"],
    }, shortAnswer: "Yes — Complete guide to BC small business grants. Access Small Business Recovery Grant, BC Small Business Venture Capital, CleanBC Industry Fund, and Indigenous business investment programs. Funding available: up to $1.3B+.",
    jumpLinks: [
      { title: 'Programs', id: 'programs' },
      { title: 'Eligibility', id: 'eligibility' },
      { title: 'How to Apply', id: 'how-to-apply' },
      { title: 'FAQ', id: 'faq' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Get matched with the right alternative or direct funding for BC Small Business Grants 2026 — our specialists navigate the complex federal and provincial channels for you.",
    },
    metrics: [
      { label: 'Recovery', value: '$30K', description: 'Small Business Grant', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'VC Tax', value: '30%', description: 'SBVC Credit', color: 'text-blue-600', iconName: 'PieChart' },
      { label: 'CleanBC', value: '$50M+', description: 'Industry Fund', color: 'text-purple-600', iconName: 'Leaf' },
      { label: 'Indigenous', value: 'Priority', description: 'Enhanced support', color: 'text-orange-600', iconName: 'Users' }
    ],
    expertTip: {
      title: "Use SBVC Tax Credit Strategically",
      type: 'tip',
      content: "The BC Small Business Venture Capital Tax Credit gives investors <strong>30% credit</strong>. Use this to attract angel investors who get immediate tax benefits for backing your company."
    },
      comparisonTable: {
              "title": "BC Small Business Grants  | .3B+ British Columbia SME Funding Funding Options Overview",
              "programs": [
                  {
                      "program": "Core BC Small Business Grants  | .3B+ British Columbia SME Funding Grant",
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
          },
      faq: [
              {
                  "question": "What is the application deadline for BC Small Business Grants  | .3B+ British Columbia SME Funding in 2026?",
                  "answer": "Deadlines typically vary by specific program tier. However, for 2026, many initiatives operate on a rolling intake basis until funds are depleted. Check the official portal for specific cutoffs."
              },
              {
                  "question": "How much funding can I get through BC Small Business Grants  | .3B+ British Columbia SME Funding?",
                  "answer": "Funding amounts range depending on business size and scope. Top awards can reach $1."
              },
              {
                  "question": "Do I have to give up equity for this program?",
                  "answer": "No. Government grants and subsidies are non-dilutive, meaning you retain 100% ownership of your company."
              }
          ]
};

export default post;
