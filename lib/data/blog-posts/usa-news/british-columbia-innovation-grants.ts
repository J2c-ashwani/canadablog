// lib/data/blog-posts/usa-news/british-columbia-innovation-grants.ts
import type { BlogPost } from '../../blogPosts';

const post: BlogPost = {
    id: 16,
    slug: "british-columbia-innovation-grants",
    shortAnswerQuestion: "What innovation and technology grants are available in 2026?",

    title: "British Columbia Innovation Grants & Tax Credits 2026 | 10% BCITC | $1.8B+ CleanTech Funding",

    excerpt: "Complete guide to BC innovation grants and tax credits. Access $1.8B+ through 10% BC Innovation Tax Credit (BCITC), Innovate BC, New Ventures BC, and cleantech, film, ocean technology programs.",
    category: "USA News",
    categoryColor: "bg-blue-100 text-blue-800",
    author: "Ashwani K.",
    date: "2025-12-01",
    readTime: "10 min read",
    image: "/images/blog/canada-grants-theme.png",
    featured: false,
    type: "grant-news",

    relatedLinks: [
      { title: "STTR Requires Partnership", href: "/blog/scotiabank-women-initiative", description: "Complete guide to Scotiabank Women Initiative with capital funding access, mentorship programs, business education, and ..." },
      { title: "Get a Clinical Partner", href: "/blog/manufacturing-grants-2026", description: "🇨🇦 Modernize your factory with Canadian government grants. Learn about SIF, regional equipment loans, and the Canada J..." },
      { title: "SBA Doesn", href: "/blog/sba-microloans-complete-guide", description: "Complete guide to SBA microloans. Learn eligibility, application process, and how to secure up to $50K in small business..." }
    ],
    content: "",
    seo: {
      keywords: ["British", "Columbia", "Innovation", "Grants", "&"],
    }, shortAnswer: "Yes — Complete guide to BC innovation grants and tax credits. Access $1.8B+ through 10% BC Innovation Tax Credit (BCITC), Innovate BC, New Ventures BC, and cleantech, film, ocean technology programs. Funding available: up to $1.8B+.",
    jumpLinks: [
      { title: 'Programs', id: 'programs' },
      { title: 'Eligibility', id: 'eligibility' },
      { title: 'How to Apply', id: 'how-to-apply' },
      { title: 'FAQ', id: 'faq' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Get matched with the right alternative or direct funding for British Columbia Innovation Grants — our specialists navigate the complex federal and provincial channels for you.",
    },
    metrics: [
      { label: 'BCITC', value: '10%', description: 'Innovation tax credit', color: 'text-green-600', iconName: 'PieChart' },
      { label: 'CleanTech', value: '$1.8B+', description: 'Total funding pool', color: 'text-blue-600', iconName: 'Leaf' },
      { label: 'New Ventures', value: '$100K', description: 'Competition prize', color: 'text-purple-600', iconName: 'Award' },
      { label: 'Ocean Tech', value: '$50M+', description: 'Blue economy', color: 'text-orange-600', iconName: 'Anchor' }
    ],
    expertTip: {
      title: "Stack BCITC with SR&ED",
      type: 'tip',
      content: "The BC Innovation Tax Credit <strong>stacks on top of federal SR&ED</strong>. Together you can recover up to 55% of eligible R&D expenses. Always apply for both."
    },
      comparisonTable: {
              "title": "British Columbia Innovation Grants & Tax Credits  | 10% BCITC | .8B+ CleanTech Funding Funding Options Overview",
              "programs": [
                  {
                      "program": "Core British Columbia Innovation Grants & Tax Credits  | 10% BCITC | .8B+ CleanTech Funding Grant",
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
                  "question": "What is the application deadline for British Columbia Innovation Grants & Tax Credits  | 10% BCITC | .8B+ CleanTech Funding in 2026?",
                  "answer": "Deadlines typically vary by specific program tier. However, for 2026, many initiatives operate on a rolling intake basis until funds are depleted. Check the official portal for specific cutoffs."
              },
              {
                  "question": "How much funding can I get through British Columbia Innovation Grants & Tax Credits  | 10% BCITC | .8B+ CleanTech Funding?",
                  "answer": "Funding amounts range depending on business size and scope. Top awards can reach $1."
              },
              {
                  "question": "Do I have to give up equity for this program?",
                  "answer": "No. Government grants and subsidies are non-dilutive, meaning you retain 100% ownership of your company."
              }
          ]
};

export default post;
