// lib/data/blogPosts.ts

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  content: string;
  seo: {
    keywords: string[];
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
}

const blogPosts: BlogPost[] = [
  // USA News (8 posts) - IDs 1-8
  {
    id: 1,
    slug: "biden-administration-announces-2-5b-small-business-grants-2024",
    title: "Biden Administration Announces $2.5B in New Small Business Grants for 2024",
    excerpt: "The latest federal funding initiative targets minority-owned businesses and green technology startups across all 50 states.",
    category: "USA News",
    categoryColor: "bg-blue-100 text-blue-800",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "/images/blog/usa-grants-theme.png",
    featured: true,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Small Business Grants", "Biden Administration", "Federal Funding"] }
  },
  {
    id: 2,
    slug: "sba-sbir-innovation-grants-2025-complete-guide",
    title: "SBA SBIR Innovation Grants 2025: $4.1B Complete Application Guide",
    excerpt: "Comprehensive guide to securing Small Business Innovation Research grants with enhanced 2025 funding and streamlined application process.",
    category: "USA News",
    categoryColor: "bg-blue-100 text-blue-800",
    author: "Michael Chen",
    date: "January 12, 2025",
    readTime: "12 min read",
    image: "/images/blog/usa-grants-theme.png",
    featured: true,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["SBIR Grants", "SBA", "Innovation Funding"] }
  },
  {
    id: 3,
    slug: "usda-rural-development-grants-2025",
    title: "USDA Rural Development Grants 2025: $47B Small Town America Revival",
    excerpt: "Complete guide to USDA rural business development, housing, and infrastructure grants transforming rural American communities.",
    category: "USA News",
    categoryColor: "bg-blue-100 text-blue-800",
    author: "Jennifer Martinez",
    date: "February 8, 2025",
    readTime: "10 min read",
    image: "/images/blog/community-diversity-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["USDA Grants", "Rural Development", "Business Grants"] }
  },
  {
    id: 4,
    slug: "doe-clean-technology-grants-2025",
    title: "DOE Clean Technology Grants 2025: $12B Green Energy Innovation Fund",
    excerpt: "Department of Energy's largest clean technology funding program targeting renewable energy, battery storage, and carbon capture solutions.",
    category: "USA News",
    categoryColor: "bg-blue-100 text-blue-800",
    author: "David Park",
    date: "March 22, 2025",
    readTime: "9 min read",
    image: "/images/blog/tech-innovation-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["DOE Grants", "Clean Technology", "Green Energy"] }
  },
  {
    id: 5,
    slug: "nsf-stem-research-grants-2025",
    title: "NSF STEM Research Grants 2025: $8.8B Science Foundation Revolution",
    excerpt: "National Science Foundation's expanded STEM education and research grants supporting breakthrough scientific discoveries and innovation.",
    category: "USA News",
    categoryColor: "bg-blue-100 text-blue-800",
    author: "Dr. Lisa Wang",
    date: "April 5, 2025",
    readTime: "11 min read",
    image: "/images/blog/healthcare-science-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["NSF Grants", "STEM Research", "Science Funding"] }
  },
  {
    id: 6,
    slug: "hud-community-development-grants-2025",
    title: "HUD Community Development Grants 2025: $13.2B Housing & Urban Revival",
    excerpt: "Housing and Urban Development's comprehensive community development block grants transforming urban and rural housing markets.",
    category: "USA News",
    categoryColor: "bg-blue-100 text-blue-800",
    author: "Robert Thompson",
    date: "May 18, 2025",
    readTime: "10 min read",
    image: "/images/blog/community-diversity-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["HUD Grants", "Community Development", "Housing Funding"] }
  },
  {
    id: 7,
    slug: "veterans-affairs-business-grants-2025",
    title: "Veterans Affairs Business Grants 2025: $2.3B Veteran Entrepreneur Support",
    excerpt: "VA's expanded business development programs supporting veteran-owned enterprises with unprecedented funding and streamlined access.",
    category: "USA News",
    categoryColor: "bg-blue-100 text-blue-800",
    author: "Colonel James Miller (Ret.)",
    date: "June 1, 2025",
    readTime: "9 min read",
    image: "/images/blog/community-diversity-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Veteran Grants", "VA Business Support", "Veteran Entrepreneurs"] }
  },
  {
    id: 8,
    slug: "epa-environmental-justice-grants-2025",
    title: "EPA's $100M Environmental Justice Revolution: Complete Grant Guide",
    excerpt: "Environmental Protection Agency's historic environmental justice funding targeting disadvantaged communities disproportionately affected by pollution.",
    category: "USA News",
    categoryColor: "bg-blue-100 text-blue-800",
    author: "Maria Rodriguez",
    date: "July 15, 2025",
    readTime: "13 min read",
    image: "/images/blog/healthcare-science-theme.png",
    featured: true,
    content: `Your existing EPA blog post content here...`,
    seo: { keywords: ["EPA Grants", "Environmental Justice", "Community Funding"] }
  },

  // Canada News (10 posts) - IDs 9-18  
  {
    id: 9,
    slug: "innovation-superclusters-initiative-2025",
    title: "Innovation Superclusters Initiative 2025: Canada's $2.3B Tech Revolution",
    excerpt: "Canada's flagship innovation program connecting industry, academia, and government to accelerate breakthrough technologies and create high-paying jobs.",
    category: "Canada News",
    categoryColor: "bg-red-100 text-red-800",
    author: "Dr. Sarah MacDonald",
    date: "January 20, 2025",
    readTime: "11 min read",
    image: "/images/blog/tech-innovation-theme.png",
    featured: true,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Canada Grants", "Superclusters", "Innovation"] }
  },
  {
    id: 10,
    slug: "canada-clean-technology-grants-2025",
    title: "Canada Clean Technology Grants 2025: $9.1B Green Innovation Fund",
    excerpt: "Comprehensive guide to Canada's clean technology funding programs accelerating the transition to a low-carbon economy.",
    category: "Canada News",
    categoryColor: "bg-red-100 text-red-800",
    author: "Alexandre Dubois",
    date: "February 14, 2025",
    readTime: "10 min read",
    image: "/images/blog/healthcare-science-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Canada Clean Tech", "Green Energy", "Grants"] }
  },
  {
    id: 11,
    slug: "canada-small-business-financing-2025",
    title: "Canada Small Business Financing 2025: $6.5B SME Support Revolution",
    excerpt: "Federal small business loans, grants, and investment programs helping Canadian entrepreneurs scale and compete globally.",
    category: "Canada News",
    categoryColor: "bg-red-100 text-red-800",
    author: "Jennifer Liu",
    date: "March 8, 2025",
    readTime: "9 min read",
    image: "/images/blog/canada-grants-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Canada Financing", "SME Grants", "Small Business Loans"] }
  },
  {
    id: 12,
    slug: "canada-agricultural-innovation-2025",
    title: "Canada Agricultural Innovation Program 2025: $4.7B Farm Technology Fund",
    excerpt: "Agricultural and Agri-Food Canada's innovation programs supporting sustainable farming, food security, and agricultural technology advancement.",
    category: "Canada News",
    categoryColor: "bg-red-100 text-red-800",
    author: "Dr. Tom Anderson",
    date: "April 12, 2025",
    readTime: "8 min read",
    image: "/images/blog/canada-grants-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Canada Agriculture", "Farm Grants", "Agri-Food"] }
  },
  {
    id: 13,
    slug: "indigenous-business-development-canada-2025",
    title: "Indigenous Business Development Canada 2025: $2.8B Reconciliation Economy",
    excerpt: "Federal programs supporting Indigenous entrepreneurs, economic development, and business partnerships across Canada.",
    category: "Canada News",
    categoryColor: "bg-red-100 text-red-800",
    author: "Mary Sinclair",
    date: "May 6, 2025",
    readTime: "10 min read",
    image: "/images/blog/community-diversity-theme.png",
    featured: true,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Indigenous Business", "Canada Grants", "Reconciliation"] }
  },
  {
    id: 14,
    slug: "canada-digital-transformation-grants-2025",
    title: "Canada Digital Transformation Grants 2025: $3.4B Technology Acceleration",
    excerpt: "Digital government initiatives helping Canadian businesses adopt emerging technologies, improve cybersecurity, and compete in the digital economy.",
    category: "Canada News",
    categoryColor: "bg-red-100 text-red-800",
    author: "Kevin Zhang",
    date: "June 20, 2025",
    readTime: "9 min read",
    image: "/images/blog/tech-innovation-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Digital Transformation", "Canada Tech Grants", "Cybersecurity"] }
  },
  {
    id: 15,
    slug: "canada-irap-grants-2025",
    title: "Canada IRAP Grants 2025: Industrial Research Assistance Program - $400M+ Innovation Engine",
    excerpt: "National Research Council's flagship SME innovation support system providing non-repayable funding and expert guidance to Canadian technology companies.",
    category: "Canada News",
    categoryColor: "bg-red-100 text-red-800",
    author: "Dr. Patricia Leblanc",
    date: "August 15, 2025",
    readTime: "12 min read",
    image: "/images/blog/tech-innovation-theme.png",
    featured: true,
    content: `Your existing IRAP blog post content here...`,
    seo: { keywords: ["IRAP Grants", "NRC", "Innovation"] }
  },
  {
    id: 16,
    slug: "sred-tax-credits-2025",
    title: "SR&ED Tax Credits 2025: Canada's $4B+ R&D Tax Revolution",
    excerpt: "Scientific Research and Experimental Development program enhancements offering increased expenditure limits and enhanced refundability for innovation.",
    category: "Canada News",
    categoryColor: "bg-red-100 text-red-800",
    author: "Margaret Foster",
    date: "September 2, 2025",
    readTime: "11 min read",
    image: "/images/blog/healthcare-science-theme.png",
    featured: false,
    content: `Your existing SR&ED blog post content here...`,
    seo: { keywords: ["SRED", "Tax Credits", "R&D"] }
  },
  {
    id: 17,
    slug: "canexport-grants-2025",
    title: "CanExport Grants 2025: International Market Expansion - $75M+ Export Engine",
    excerpt: "Canada's comprehensive export development programs helping SMEs, innovation partnerships, and communities expand into international markets.",
    category: "Canada News",
    categoryColor: "bg-red-100 text-red-800",
    author: "Andrew Mitchell",
    date: "September 18, 2025",
    readTime: "10 min read",
    image: "/images/blog/canada-grants-theme.png",
    featured: false,
    content: `Your existing CanExport blog post content here...`,
    seo: { keywords: ["CanExport", "Export Grants", "International Trade"] }
  },
  {
    id: 18,
    slug: "canada-regional-development-2025",
    title: "Canada Regional Development 2025: ACOA, WD, CED, FedNor - $1.2B+ Coast-to-Coast Engine",
    excerpt: "Regional development agencies supporting economic growth from Atlantic Canada's ocean economy to Western diversification and Northern Ontario innovation.",
    category: "Canada News",
    categoryColor: "bg-red-100 text-red-800",
    author: "Rebecca Turner",
    date: "September 25, 2025",
    readTime: "13 min read",
    image: "/images/blog/canada-grants-theme.png",
    featured: true,
    content: `Your existing Regional Development blog post content here...`,
    seo: { keywords: ["Regional Development", "ACOA", "FedNor"] }
  },

  // Tips & Guides (3 posts) - IDs 19-21
  {
    id: 19,
    slug: "complete-usa-grant-application-guide-2025",
    title: "Complete USA Grant Application Guide 2025: $127B Federal Funding Mastery",
    excerpt: "Step-by-step guide to navigating federal grant applications, from research to submission, with insider strategies from successful applicants.",
    category: "Tips & Guides",
    categoryColor: "bg-purple-100 text-purple-800",
    author: "Grant Writing Expert Team",
    date: "January 25, 2025",
    readTime: "15 min read",
    image: "/images/blog/strategy-planning-theme.png",
    featured: true,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Grant Application", "Guide", "USA Grants"] }
  },
  {
    id: 20,
    slug: "grant-writing-secrets-2025",
    title: "Grant Writing Secrets 2025: 89% Success Rate Formula Revealed",
    excerpt: "Professional grant writers share the proven strategies, templates, and insider knowledge that result in consistent funding success.",
    category: "Tips & Guides",
    categoryColor: "bg-purple-100 text-purple-800",
    author: "Dr. Amanda Collins",
    date: "February 28, 2025",
    readTime: "14 min read",
    image: "/images/blog/strategy-planning-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Grant Writing", "Secrets", "Success Rate"] }
  },
  {
    id: 21,
    slug: "common-grant-application-mistakes-2025",
    title: "Common Grant Application Mistakes 2025: Avoid These $2M+ Funding Killers",
    excerpt: "The most common grant application mistakes that cost businesses millions in funding, and how to avoid them with expert guidance.",
    category: "Tips & Guides",
    categoryColor: "bg-purple-100 text-purple-800",
    author: "Michael Grant Strategy",
    date: "March 30, 2025",
    readTime: "12 min read",
    image: "/images/blog/strategy-planning-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Mistakes", "Application Errors", "Funding"] }
  },

  // Funding Alerts (2 posts) - IDs 22-23
  {
    id: 22,
    slug: "q4-2025-grant-deadlines-funding-alerts",
    title: "Q4 2025 Grant Deadlines: $89B Critical Funding Alert",
    excerpt: "Time-sensitive Q4 grant opportunities with approaching deadlines - don't miss these major funding opportunities ending soon.",
    category: "Funding Alerts",
    categoryColor: "bg-yellow-100 text-yellow-800",
    author: "Funding Alert Team",
    date: "October 1, 2025",
    readTime: "7 min read",
    image: "/images/blog/funding-alerts-theme.png",
    featured: true,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Q4 Deadlines", "Funding Alert", "Grant Deadlines"] }
  },
  {
    id: 23,
    slug: "october-2025-last-chance-funding",
    title: "October 2025 Last Chance Funding: $34B Final Call Opportunities",
    excerpt: "Final opportunity alerts for major grant programs closing in October - secure funding before these programs end for the year.",
    category: "Funding Alerts",
    categoryColor: "bg-yellow-100 text-yellow-800",
    author: "Priority Alert System",
    date: "October 15, 2025",
    readTime: "6 min read",
    image: "/images/blog/funding-alerts-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["October Deadlines", "Last Chance", "Funding"] }
  },

  // State-Specific (7 posts) - IDs 24-30
  {
    id: 24,
    slug: "texas-business-grants-2025",
    title: "Texas Business Grants 2025: Lone Star State's $12B Economic Powerhouse",
    excerpt: "Comprehensive guide to Texas business development grants, tax incentives, and economic development programs driving the state's growth.",
    category: "State-Specific",
    categoryColor: "bg-green-100 text-green-800",
    author: "Austin Martinez",
    date: "March 15, 2025",
    readTime: "11 min read",
    image: "/images/blog/usa-grants-theme.png",
    featured: true,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Texas Grants", "Business Development", "State Funding"] }
  },
  {
    id: 25,
    slug: "california-small-business-grants-2025",
    title: "California Small Business Grants 2025: Golden State's $18B Innovation Economy",
    excerpt: "California's comprehensive small business grant programs, from Silicon Valley tech to Central Valley agriculture and beyond.",
    category: "State-Specific",
    categoryColor: "bg-green-100 text-green-800",
    author: "Maria Gonzalez",
    date: "April 8, 2025",
    readTime: "13 min read",
    image: "/images/blog/usa-grants-theme.png",
    featured: true,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["California Grants", "Innovation Economy", "Small Business"] }
  },
  {
    id: 26,
    slug: "new-york-business-grants-2025",
    title: "New York Business Grants 2025: Empire State's $15B Economic Development Engine",
    excerpt: "New York's business development programs from NYC fintech to upstate manufacturing, supporting entrepreneurs across the state.",
    category: "State-Specific",
    categoryColor: "bg-green-100 text-green-800",
    author: "David Kim",
    date: "May 12, 2025",
    readTime: "10 min read",
    image: "/images/blog/usa-grants-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["NY Grants", "Business Development", "Empire State"] }
  },
  {
    id: 27,
    slug: "florida-business-grants-2025",
    title: "Florida Business Grants 2025: Sunshine State's $9B Growth Catalyst",
    excerpt: "Florida's business incentive programs supporting aerospace, tourism, agriculture, and emerging technology sectors across the state.",
    category: "State-Specific",
    categoryColor: "bg-green-100 text-green-800",
    author: "Carlos Mendez",
    date: "June 5, 2025",
    readTime: "9 min read",
    image: "/images/blog/usa-grants-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Florida Grants", "Growth", "Business Incentives"] }
  },
  {
    id: 28,
    slug: "illinois-business-development-2025",
    title: "Illinois Business Development 2025: Prairie State's $8B Innovation Hub",
    excerpt: "Illinois economic development programs supporting Chicago's business ecosystem and downstate manufacturing renaissance.",
    category: "State-Specific",
    categoryColor: "bg-green-100 text-green-800",
    author: "Patricia Walsh",
    date: "July 20, 2025",
    readTime: "8 min read",
    image: "/images/blog/usa-grants-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Illinois Grants", "Innovation Hub", "Manufacturing"] }
  },
  {
    id: 29,
    slug: "michigan-manufacturing-renaissance-2025",
    title: "Michigan Manufacturing Renaissance 2025: Great Lakes State's $11B Industrial Revolution",
    excerpt: "Michigan's transformation from automotive dependence to diversified advanced manufacturing and technology leadership.",
    category: "State-Specific",
    categoryColor: "bg-green-100 text-green-800",
    author: "Robert Johnson",
    date: "August 10, 2025",
    readTime: "12 min read",
    image: "/images/blog/tech-innovation-theme.png",
    featured: true,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Michigan Grants", "Manufacturing", "Industrial Revolution"] }
  },
  {
    id: 30,
    slug: "pennsylvania-innovation-grants-2025",
    title: "Pennsylvania Innovation Grants 2025: Keystone State's $7B Technology Catalyst",
    excerpt: "Pennsylvania's innovation economy from Philadelphia biotech to Pittsburgh robotics, supporting entrepreneurs across diverse industries.",
    category: "State-Specific",
    categoryColor: "bg-green-100 text-green-800",
    author: "Elizabeth Murphy",
    date: "September 8, 2025",
    readTime: "10 min read",
    image: "/images/blog/tech-innovation-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Pennsylvania Grants", "Innovation", "Technology"] }
  },

  // Industry-Specific (3 posts) - IDs 31-33
  {
    id: 31,
    slug: "manufacturing-grants-2025",
    title: "Manufacturing Grants 2025: $67B Industrial Revolution Funding Guide",
    excerpt: "Comprehensive manufacturing grant opportunities from automation and AI to reshoring initiatives and workforce development.",
    category: "Industry-Specific",
    categoryColor: "bg-orange-100 text-orange-800",
    author: "Industrial Expert Panel",
    date: "April 25, 2025",
    readTime: "14 min read",
    image: "/images/blog/tech-innovation-theme.png",
    featured: true,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Manufacturing Grants", "Funding Guide", "Industrial"] }
  },
  {
    id: 32,
    slug: "healthcare-business-grants-2025",
    title: "Healthcare Business Grants 2025: $43B Medical Innovation Funding Revolution",
    excerpt: "Healthcare grants supporting medical devices, digital health, biotechnology, and healthcare service delivery innovation.",
    category: "Industry-Specific",
    categoryColor: "bg-orange-100 text-orange-800",
    author: "Dr. Healthcare Innovation Team",
    date: "May 30, 2025",
    readTime: "13 min read",
    image: "/images/blog/healthcare-science-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Healthcare Grants", "Medical Innovation", "Biotech"] }
  },
  {
    id: 33,
    slug: "technology-startup-grants-2025",
    title: "Technology Startup Grants 2025: $29B Silicon Valley to Main Street Revolution",
    excerpt: "Tech startup funding from SBIR research grants to venture capital partnerships, supporting innovation across all technology sectors.",
    category: "Industry-Specific",
    categoryColor: "bg-orange-100 text-orange-800",
    author: "Tech Startup Advisory",
    date: "June 15, 2025",
    readTime: "11 min read",
    image: "/images/blog/tech-innovation-theme.png",
    featured: true,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Tech Startup", "SBIR", "Venture Capital"] }
  },

  // Demographic-Specific (3 posts) - IDs 34-36
  {
    id: 34,
    slug: "women-owned-business-grants-2025",
    title: "Women-Owned Business Grants 2025: $2.1B Female Entrepreneur Revolution",
    excerpt: "Comprehensive women business grant opportunities from SBA programs to private foundation funding supporting female entrepreneurs.",
    category: "Demographic-Specific",
    categoryColor: "bg-pink-100 text-pink-800",
    author: "Women Business Network",
    date: "July 8, 2025",
    readTime: "12 min read",
    image: "/images/blog/community-diversity-theme.png",
    featured: true,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Women Business Grants", "Female Entrepreneur", "Funding"] }
  },
  {
    id: 35,
    slug: "minority-business-enterprise-grants-2025",
    title: "Minority Business Enterprise Grants 2025: $1.9B Diversity & Inclusion Revolution",
    excerpt: "Minority-owned business grants from federal 8(a) programs to corporate supplier diversity initiatives driving economic inclusion.",
    category: "Demographic-Specific",
    categoryColor: "bg-pink-100 text-pink-800",
    author: "Diversity Business Coalition",
    date: "August 5, 2025",
    readTime: "11 min read",
    image: "/images/blog/community-diversity-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Minority Grants", "Diversity", "Inclusion"] }
  },
  {
    id: 36,
    slug: "rural-business-development-grants-2025",
    title: "Rural Business Development Grants 2025: Small Town America's $1.2B Renaissance",
    excerpt: "Rural business grants supporting agriculture innovation, main street revitalization, and economic development in small communities.",
    category: "Demographic-Specific",
    categoryColor: "bg-pink-100 text-pink-800",
    author: "Rural Development Alliance",
    date: "September 12, 2025",
    readTime: "10 min read",
    image: "/images/blog/community-diversity-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Rural Development", "Small Town", "Community"] }
  },

  // Future-Looking (2 posts) - IDs 37-38
  {
    id: 37,
    slug: "2026-grant-preview-early-bird",
    title: "2026 Grant Preview: Early Bird Opportunities - $4.8B Future Funding Pipeline",
    excerpt: "Advanced preview of 2026 grant opportunities with early preparation strategies for next year's unprecedented funding programs.",
    category: "Future-Looking",
    categoryColor: "bg-indigo-100 text-indigo-800",
    author: "Future Funding Research",
    date: "September 20, 2025",
    readTime: "12 min read",
    image: "/images/blog/funding-alerts-theme.png",
    featured: true,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["2026 Grants", "Future Funding", "Early Bird"] }
  },
  {
    id: 38,
    slug: "q1-2026-grant-deadlines",
    title: "Q1 2026 Grant Deadlines: New Year Funding Rush - $2.3B Fresh Start Opportunities",
    excerpt: "First quarter 2026 grant opportunities taking advantage of new fiscal cycles and reduced competition for maximum funding success.",
    category: "Future-Looking",
    categoryColor: "bg-indigo-100 text-indigo-800",
    author: "Strategic Planning Team",
    date: "September 28, 2025",
    readTime: "10 min read",
    image: "/images/blog/funding-alerts-theme.png",
    featured: false,
    content: `Your existing blog post content here...`,
    seo: { keywords: ["Q1 2026", "Deadlines", "Funding Rush"] }
  }
];
// ADD THIS CATEGORIES ARRAY to your blogPosts.ts
export const blogCategories = [
  {
    id: "USA News",
    name: "USA News",
    color: "bg-blue-100 text-blue-800",
    description: "Federal funding programs and opportunities"
  },
  {
    id: "Canada News",
    name: "Canada News",
    color: "bg-red-100 text-red-800",
    description: "Canadian government funding and grants"
  },
  {
    id: "Tips & Guides",
    name: "Tips & Guides",
    color: "bg-purple-100 text-purple-800",
    description: "Expert guidance and application strategies"
  },
  {
    id: "Funding Alerts",
    name: "Funding Alerts",
    color: "bg-yellow-100 text-yellow-800",
    description: "Time-sensitive funding opportunities"
  },
  {
    id: "State-Specific",
    name: "State-Specific",
    color: "bg-green-100 text-green-800",
    description: "State-level grants and programs"
  },
  {
    id: "Industry-Specific",
    name: "Industry-Specific",
    color: "bg-orange-100 text-orange-800",
    description: "Industry-focused funding opportunities"
  },
  {
    id: "Demographic-Specific",
    name: "Demographic-Specific",
    color: "bg-pink-100 text-pink-800",
    description: "Targeted demographic funding programs"
  },
  {
    id: "Future-Looking",
    name: "Future-Looking",
    color: "bg-indigo-100 text-indigo-800",
    description: "Upcoming funding opportunities"
  }
];

// UTILITY FUNCTIONS
export function getAllBlogPosts() {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts() {
  return blogPosts.filter((post) => post.featured).slice(0, 6);
}

export function getFeaturedBlogPosts() {
  return blogPosts.filter((post) => post.featured).slice(0, 6);
}

export function getBlogPostsByCategory(category: string) {
  return blogPosts.filter((post) => post.category === category);
}

export function getAllCategories() {
  const categories = new Set(blogPosts.map((post) => post.category));
  return Array.from(categories);
}

export function getRecentBlogPosts(count: number = 5) {
  return getAllBlogPosts().slice(0, count);
}

export function getRecentPosts(count: number = 5) {
  return getAllBlogPosts().slice(0, count);
}

export function getCategoryWithCounts() {
  // Count posts per category
  const categoryCounts = blogPosts.reduce((counts, post) => {
    counts[post.category] = (counts[post.category] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  // Map categories with their counts
  return blogCategories.map(category => ({
    ...category,
    count: categoryCounts[category.id] || 0
  }));
}

export default blogPosts;
