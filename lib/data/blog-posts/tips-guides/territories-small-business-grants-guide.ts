// lib/data/blog-posts/tips-guides/territories-small-business-grants-guide.ts
import type { BlogPost } from '../../blogPosts';

const post: BlogPost = {
    id: 93,
    slug: "territories-small-business-grants-guide",
    shortAnswerQuestion: "What small business grants are available in 2026?",

    title: "Territories Small Business Grants 2026 | $125M+ NT, YT, Nunavut Combined Funding",

    excerpt: "Complete guide to Territories business grants. Access NWT Business Development, Yukon Small Business Support, Nunavut Economic Development, and Indigenous Business Programs.",
    category: "Tips & Guides",
    categoryColor: "bg-purple-100 text-purple-800",
    author: "Ashwani K.",
    date: "2025-12-01",
    readTime: "10 min read",
    image: "/images/blog/strategy-planning-theme.png",
    featured: false,
    type: "grant-news",

    relatedLinks: [
      { title: "Enterprise Zones", href: "/blog/commercialization-scale-up-funding-canada", description: "Complete guide to Canadian commercialization and scale-up funding. Access up to $100M through Strategic Innovation Fund,..." },
      { title: "Dual-Use Strategy", href: "/blog/doe-sbir-clean-energy-grants", description: "Complete 2026-2027 guide to DOE SBIR/STTR grants for clean energy startups. Phase I up to $200K, Phase II up to $1.85M f..." },
      { title: "Dual-Use Strategy", href: "/blog/demonstration-pilot-funding-canada", description: "Complete guide to Canadian demonstration and pilot project funding. Access up to $15M through SDTC Demonstration, Clean ..." }
    ],
    content: "",
    seo: {
      keywords: ["Territories", "Small", "Business", "Grants", "2026"],
    }, shortAnswer: "Yes — Complete guide to Territories business grants. Access NWT Business Development, Yukon Small Business Support, Nunavut Economic Development, and Indigenous Business Programs. Funding available: up to $125M+.",
    metrics: [
      { label: 'Total', value: '$125M+', description: 'Combined Fund', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Focus', value: 'North', description: 'NT/YT/NU', color: 'text-blue-600', iconName: 'MapPin' },
      { label: 'Priority', value: 'Indigenous', description: 'Special Support', color: 'text-purple-600', iconName: 'Users' },
      { label: 'Rate', value: '85%+', description: 'Success Rate', color: 'text-orange-600', iconName: 'CheckCircle' }
    ],
    expertTip: {
      title: "Lower Competition Edge",
      type: 'success',
      content: "Territorial programs have <strong>85%+ approval rates</strong> due to lower application volumes and government priority on Northern economic development."
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
              "title": "Territories Small Business Grants  | + NT, YT, Nunavut Combined Funding Funding Options Overview",
              "programs": [
                  {
                      "program": "Core Territories Small Business Grants  | + NT, YT, Nunavut Combined Funding Grant",
                      "amount": "$125M",
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
                  "question": "What is the application deadline for Territories Small Business Grants  | + NT, YT, Nunavut Combined Funding in 2026?",
                  "answer": "Deadlines typically vary by specific program tier. However, for 2026, many initiatives operate on a rolling intake basis until funds are depleted. Check the official portal for specific cutoffs."
              },
              {
                  "question": "How much funding can I get through Territories Small Business Grants  | + NT, YT, Nunavut Combined Funding?",
                  "answer": "Funding amounts range depending on business size and scope. Top awards can reach $125M."
              },
              {
                  "question": "Do I have to give up equity for this program?",
                  "answer": "No. Government grants and subsidies are non-dilutive, meaning you retain 100% ownership of your company."
              }
          ]
};

export default post;
