// lib/data/blog-posts/demographic-specific/quebec-women-business-grants.ts
import type { BlogPost } from '../../blogPosts';

const post: BlogPost = {
    id: 75,
    slug: "quebec-women-business-grants",
    shortAnswerQuestion: "What grants are available for women-owned businesses in 2026?",

    title: "Quebec Women Business Grants 2026 | $720M Francophone Entrepreneur Support Programs",

    excerpt: "Complete guide to Quebec women entrepreneurship support with R\u00e9seau des Femmes d",
    category: "Demographic-Specific",
    categoryColor: "bg-pink-100 text-pink-800",
    author: "Ashwani K.",
    date: "2025-12-01",
    readTime: "10 min read",
    image: "/images/blog/canada-grants-theme.png",
    featured: false,
    type: "grant-news",

    relatedLinks: [
      { title: "SDTC Environmental Impact", href: "/guides/federal-grants-application-tips", description: "Expert tips and strategies for writing winning federal grant applications...." },
      { title: "Resource Conversion", href: "/blog/private-women-grants-guide", description: "Complete guide to private foundation grants for women entrepreneurs. Discover 50+ foundations offering grants up to $250..." },
      { title: "Community First", href: "/blog/nsf-stem-research-2026", description: "🇺🇸 The National Science Foundation offers non-dilutive funding for high-tech startups. Guide to the new ..." }
    ],
    content: "",
    seo: {
      keywords: ["Quebec", "Women", "Business", "Grants", "2026"],
    }, shortAnswer: "Yes — Complete guide to Quebec women entrepreneurship support with Réseau des Femmes d Funding available: up to $720M.",
    metrics: [
      { label: 'Fund', value: '$720M', description: 'Women Focus', color: 'text-pink-600', iconName: 'DollarSign' },
      { label: 'Network', value: 'RFDA', description: 'Réseau Femmes', color: 'text-purple-600', iconName: 'Users' },
      { label: 'Max Grant', value: '$50K', description: 'Per Business', color: 'text-blue-600', iconName: 'TrendingUp' },
      { label: 'Success', value: '89%', description: 'Approval Rate', color: 'text-green-600', iconName: 'CheckCircle' }
    ],
    expertTip: {
      title: "Réseau Connection",
      type: 'success',
      content: "Joining <strong>Réseau des Femmes d'Affaires</strong> provides mentorship, networking, and significantly improves grant success rates for Quebec women entrepreneurs."
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
              "title": "Quebec Women Business Grants  |  Francophone Entrepreneur Support Programs Funding Options Overview",
              "programs": [
                  {
                      "program": "Core Quebec Women Business Grants  |  Francophone Entrepreneur Support Programs Grant",
                      "amount": "$720M",
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
                  "question": "What is the application deadline for Quebec Women Business Grants  |  Francophone Entrepreneur Support Programs in 2026?",
                  "answer": "Deadlines typically vary by specific program tier. However, for 2026, many initiatives operate on a rolling intake basis until funds are depleted. Check the official portal for specific cutoffs."
              },
              {
                  "question": "How much funding can I get through Quebec Women Business Grants  |  Francophone Entrepreneur Support Programs?",
                  "answer": "Funding amounts range depending on business size and scope. Top awards can reach $720M."
              },
              {
                  "question": "Do I have to give up equity for this program?",
                  "answer": "No. Government grants and subsidies are non-dilutive, meaning you retain 100% ownership of your company."
              }
          ]
};

export default post;
