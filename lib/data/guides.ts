export interface Guide {
  id: string
  title: string
  slug: string
  description: string
  category: 'USA' | 'Canada' | 'General'
  tags: string[]
  readTime: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  featured: boolean
  highlights: string[]
  lastUpdated: string
}

export const guidesDatabase: Guide[] = [
  // USA Federal Guides
  {
    id: 'sba-application-process',
    title: 'SBA Grant Application Process: Complete Step-by-Step Guide',
    slug: 'sba-application-process',
    description: 'Master the SBA application process with our comprehensive guide. Learn requirements, document preparation, common mistakes, and insider tips for success.',
    category: 'USA',
    tags: ['SBA', 'Federal Grants', 'Small Business', 'Application Process'],
    readTime: '15 min',
    difficulty: 'Intermediate',
    featured: true,
    highlights: [
      'Step-by-step application walkthrough',
      'Required documents checklist',
      'Common mistakes to avoid',
      'Timeline and deadlines'
    ],
    lastUpdated: '2025-10-14'
  },
  {
    id: 'apply-federal-grants',
    title: 'How to Apply for USA Federal Grants',
    slug: 'apply-federal-grants',
    description: 'Complete step-by-step guide for navigating the US federal grant application process including Grants.gov registration and submission.',
    category: 'USA',
    tags: ['Federal Grants', 'USA', 'Government Funding'],
    readTime: '12 min',
    difficulty: 'Beginner',
    featured: true,
    highlights: [
      'Federal grant registration process',
      'Grants.gov navigation',
      'SAM.gov setup guide'
    ],
    lastUpdated: '2025-10-01'
  },
  {
    id: 'apply-sba-loans',
    title: 'SBA Loan Application Guide',
    slug: 'apply-sba-loans',
    description: 'Learn how to successfully apply for SBA loans including 7(a), 504, and microloan programs.',
    category: 'USA',
    tags: ['SBA', 'Loans', 'Small Business'],
    readTime: '14 min',
    difficulty: 'Intermediate',
    featured: true,
    highlights: [
      'SBA loan program comparison',
      'Eligibility requirements',
      'Document preparation guide'
    ],
    lastUpdated: '2025-09-28'
  },
  {
    id: 'sbir-research-grants-guide',
    title: 'SBIR Research Grants Application Guide',
    slug: 'sbir-research-grants-guide',
    description: 'Comprehensive guide to applying for Small Business Innovation Research grants for tech companies.',
    category: 'USA',
    tags: ['SBIR', 'Research', 'Innovation', 'Technology'],
    readTime: '18 min',
    difficulty: 'Advanced',
    featured: true,
    highlights: [
      'SBIR Phase I & II process',
      'Technical proposal writing',
      'Commercialization planning'
    ],
    lastUpdated: '2025-09-25'
  },
  {
    id: 'apply-sbir-grants',
    title: 'How to Apply for SBIR/STTR Grants',
    slug: 'apply-sbir-grants',
    description: 'Step-by-step application guide for Small Business Innovation Research and Technology Transfer programs.',
    category: 'USA',
    tags: ['SBIR', 'STTR', 'Research', 'Technology'],
    readTime: '16 min',
    difficulty: 'Advanced',
    featured: false,
    highlights: [
      'SBIR vs STTR differences',
      'Proposal requirements',
      'Budget preparation'
    ],
    lastUpdated: '2025-09-20'
  },
  {
    id: 'apply-small-business-grants',
    title: 'Small Business Grants Application Guide',
    slug: 'apply-small-business-grants',
    description: 'General guide for applying to federal small business grant programs and competitions.',
    category: 'USA',
    tags: ['Small Business', 'Grants', 'Federal'],
    readTime: '10 min',
    difficulty: 'Beginner',
    featured: false,
    highlights: [
      'Finding grant opportunities',
      'Basic eligibility criteria',
      'Application best practices'
    ],
    lastUpdated: '2025-10-05'
  },
  {
    id: 'apply-minority-grants',
    title: 'Minority Business Grants Application Guide',
    slug: 'apply-minority-grants',
    description: 'How to access grants and funding specifically for minority-owned businesses in the USA.',
    category: 'USA',
    tags: ['Minority Business', 'Diversity', 'Federal'],
    readTime: '12 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'Minority business certification',
      'MBDA programs',
      'Set-aside opportunities'
    ],
    lastUpdated: '2025-09-18'
  },
  {
    id: 'sba-growth-accelerator-fund-guide',
    title: 'SBA Growth Accelerator Fund Application Guide',
    slug: 'sba-growth-accelerator-fund-guide',
    description: 'Guide to applying for SBA funding supporting business accelerators and incubators.',
    category: 'USA',
    tags: ['SBA', 'Accelerator', 'Incubator'],
    readTime: '11 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'Accelerator eligibility',
      'Program requirements',
      'Impact measurement'
    ],
    lastUpdated: '2025-09-15'
  },
  {
    id: 'federal-grants-application-tips',
    title: 'Federal Grant Application Tips & Best Practices',
    slug: 'federal-grants-application-tips',
    description: 'Expert tips and strategies for writing winning federal grant applications.',
    category: 'USA',
    tags: ['Federal', 'Grant Writing', 'Tips'],
    readTime: '13 min',
    difficulty: 'Intermediate',
    featured: true,
    highlights: [
      'Writing persuasive proposals',
      'Budget justification strategies',
      'Review criteria understanding'
    ],
    lastUpdated: '2025-10-08'
  },
  {
    id: 'apply-doe-clean-energy-grants',
    title: 'Department of Energy Clean Energy Grants Guide',
    slug: 'apply-doe-clean-energy-grants',
    description: 'How to apply for DOE funding for clean energy and sustainability projects.',
    category: 'USA',
    tags: ['DOE', 'Clean Energy', 'Sustainability'],
    readTime: '14 min',
    difficulty: 'Advanced',
    featured: false,
    highlights: [
      'DOE funding programs',
      'Technical proposal requirements',
      'Energy impact metrics'
    ],
    lastUpdated: '2025-09-12'
  },
  {
    id: 'california-loan-guarantee-guide',
    title: 'California Small Business Loan Guarantee Program Guide',
    slug: 'california-loan-guarantee-guide',
    description: 'Complete guide to accessing California state loan guarantees for small businesses.',
    category: 'USA',
    tags: ['California', 'State Grants', 'Loan Guarantee'],
    readTime: '10 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'California program eligibility',
      'Application process',
      'Lender requirements'
    ],
    lastUpdated: '2025-09-08'
  },

  // Canada Federal Guides
  {
    id: 'apply-strategic-innovation-fund',
    title: 'Strategic Innovation Fund Application Guide',
    slug: 'apply-strategic-innovation-fund',
    description: 'How to apply for large-scale innovation funding through Canada\'s Strategic Innovation Fund.',
    category: 'Canada',
    tags: ['SIF', 'Innovation', 'Large Projects'],
    readTime: '20 min',
    difficulty: 'Advanced',
    featured: true,
    highlights: [
      'Multi-million dollar funding',
      'Project eligibility criteria',
      'Partnership requirements'
    ],
    lastUpdated: '2025-09-20'
  },
  {
    id: 'apply-irap-grants',
    title: 'How to Apply for IRAP Innovation Grants',
    slug: 'apply-irap-grants',
    description: 'Complete guide to applying for Industrial Research Assistance Program funding in Canada.',
    category: 'Canada',
    tags: ['IRAP', 'Innovation', 'Technology'],
    readTime: '14 min',
    difficulty: 'Intermediate',
    featured: true,
    highlights: [
      'IRAP eligibility requirements',
      'Application process timeline',
      'Advisory services access'
    ],
    lastUpdated: '2025-10-05'
  },
  {
    id: 'apply-irap-government-grants',
    title: 'IRAP Government Grants Application Process',
    slug: 'apply-irap-government-grants',
    description: 'Detailed walkthrough of applying for IRAP government funding for innovation projects.',
    category: 'Canada',
    tags: ['IRAP', 'Government Grants', 'Innovation'],
    readTime: '15 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'Program overview',
      'Funding amounts',
      'Success criteria'
    ],
    lastUpdated: '2025-09-30'
  },
  {
    id: 'irap-innovation-application-guide',
    title: 'IRAP Innovation Funding Application Guide',
    slug: 'irap-innovation-application-guide',
    description: 'Strategic guide for accessing IRAP innovation funding and technical advisory services.',
    category: 'Canada',
    tags: ['IRAP', 'Innovation', 'Technical Support'],
    readTime: '13 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'Innovation project criteria',
      'Technical advisory benefits',
      'Funding allocation process'
    ],
    lastUpdated: '2025-09-25'
  },
  {
    id: 'sred-application-guide',
    title: 'SR&ED Tax Credit Application Guide',
    slug: 'sred-application-guide',
    description: 'How to claim Scientific Research & Experimental Development tax credits in Canada.',
    category: 'Canada',
    tags: ['SR&ED', 'Tax Credit', 'R&D'],
    readTime: '16 min',
    difficulty: 'Advanced',
    featured: true,
    highlights: [
      'Eligible R&D activities',
      'Documentation requirements',
      'Claim calculation'
    ],
    lastUpdated: '2025-10-01'
  },
  {
    id: 'apply-women-entrepreneurship-strategy',
    title: 'Women Entrepreneurship Strategy Application Guide',
    slug: 'apply-women-entrepreneurship-strategy',
    description: 'Comprehensive guide to accessing WES funding and resources for women entrepreneurs in Canada.',
    category: 'Canada',
    tags: ['Women Entrepreneurs', 'WES', 'Funding'],
    readTime: '12 min',
    difficulty: 'Beginner',
    featured: true,
    highlights: [
      'WES ecosystem overview',
      'Funding programs breakdown',
      'Mentorship opportunities'
    ],
    lastUpdated: '2025-10-10'
  },
  {
    id: 'apply-women-entrepreneurship-strateg',
    title: 'Women Entrepreneurship Strategy Guide',
    slug: 'apply-women-entrepreneurship-strateg',
    description: 'Alternative guide for women entrepreneurs accessing federal support programs.',
    category: 'Canada',
    tags: ['Women', 'Entrepreneurship', 'Federal'],
    readTime: '11 min',
    difficulty: 'Beginner',
    featured: false,
    highlights: [
      'Program access',
      'Funding options',
      'Resource centers'
    ],
    lastUpdated: '2025-09-28'
  },
  {
    id: 'women-entrepreneurship-fund-guide',
    title: 'Women Entrepreneurship Fund Application Guide',
    slug: 'women-entrepreneurship-fund-guide',
    description: 'How to apply for direct funding through the Women Entrepreneurship Fund.',
    category: 'Canada',
    tags: ['Women', 'Funding', 'Business Growth'],
    readTime: '10 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'Fund eligibility',
      'Application requirements',
      'Funding amounts'
    ],
    lastUpdated: '2025-09-22'
  },
  {
    id: 'women-entrepreneurship-loan-fund-guide',
    title: 'Women Entrepreneurship Loan Fund Guide',
    slug: 'women-entrepreneurship-loan-fund-guide',
    description: 'Access low-interest loans through the Women Entrepreneurship Loan Fund program.',
    category: 'Canada',
    tags: ['Women', 'Loans', 'BDC'],
    readTime: '9 min',
    difficulty: 'Beginner',
    featured: false,
    highlights: [
      'Loan terms',
      'Application process',
      'BDC partnership'
    ],
    lastUpdated: '2025-09-18'
  },
  {
    id: 'apply-youth-entrepreneurship-funding',
    title: 'Youth Entrepreneurship Funding Application Guide',
    slug: 'apply-youth-entrepreneurship-funding',
    description: 'How young entrepreneurs can access government funding programs in Canada.',
    category: 'Canada',
    tags: ['Youth', 'Entrepreneurship', 'Young Founders'],
    readTime: '11 min',
    difficulty: 'Beginner',
    featured: false,
    highlights: [
      'Age eligibility',
      'Futurpreneur programs',
      'Mentorship support'
    ],
    lastUpdated: '2025-09-14'
  },
  {
    id: 'bdc-women-entrepreneurs-financing-guide',
    title: 'BDC Women Entrepreneurs Financing Guide',
    slug: 'bdc-women-entrepreneurs-financing-guide',
    description: 'Access Business Development Bank of Canada financing specifically for women-owned businesses.',
    category: 'Canada',
    tags: ['BDC', 'Women', 'Financing'],
    readTime: '10 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'BDC loan products',
      'Women-specific programs',
      'Advisory services'
    ],
    lastUpdated: '2025-09-10'
  },
  {
    id: 'edc-women-trade-export-financing-guide',
    title: 'EDC Women Trade & Export Financing Guide',
    slug: 'edc-women-trade-export-financing-guide',
    description: 'Export Development Canada financing and support for women exporters.',
    category: 'Canada',
    tags: ['EDC', 'Export', 'Women', 'Trade'],
    readTime: '12 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'Export financing options',
      'Trade insurance',
      'Market expansion support'
    ],
    lastUpdated: '2025-09-05'
  },
  {
    id: 'nserc-research-grants-guide',
    title: 'NSERC Research Grants Application Guide',
    slug: 'nserc-research-grants-guide',
    description: 'How to apply for Natural Sciences and Engineering Research Council grants.',
    category: 'Canada',
    tags: ['NSERC', 'Research', 'Academic', 'Science'],
    readTime: '17 min',
    difficulty: 'Advanced',
    featured: false,
    highlights: [
      'Research eligibility',
      'Grant types',
      'Proposal requirements'
    ],
    lastUpdated: '2025-08-30'
  },
  {
    id: 'apply-regional-development-agencies',
    title: 'Regional Development Agencies Funding Guide',
    slug: 'apply-regional-development-agencies',
    description: 'Access funding through Canada\'s six Regional Development Agencies.',
    category: 'Canada',
    tags: ['Regional', 'Economic Development', 'Federal'],
    readTime: '14 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'RDA overview',
      'Regional programs',
      'Application processes'
    ],
    lastUpdated: '2025-09-01'
  },
  {
    id: 'apply-indigenous-rural-business-funding',
    title: 'Indigenous & Rural Business Funding Guide',
    slug: 'apply-indigenous-rural-business-funding',
    description: 'Specialized funding programs for Indigenous and rural businesses in Canada.',
    category: 'Canada',
    tags: ['Indigenous', 'Rural', 'Community Development'],
    readTime: '13 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'Indigenous-specific programs',
      'Rural business support',
      'Community economic development'
    ],
    lastUpdated: '2025-08-28'
  },

  // Canada Provincial Guides
  {
    id: 'apply-ontario-business-grants',
    title: 'Ontario Business Grants Application Guide',
    slug: 'apply-ontario-business-grants',
    description: 'Complete guide to accessing provincial business grants and incentives in Ontario.',
    category: 'Canada',
    tags: ['Ontario', 'Provincial', 'Business Grants'],
    readTime: '12 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'Ontario programs overview',
      'Regional incentives',
      'Application timelines'
    ],
    lastUpdated: '2025-09-12'
  },
  {
    id: 'apply-quebec-business-grants',
    title: 'Quebec Business Grants Application Guide',
    slug: 'apply-quebec-business-grants',
    description: 'Navigate Quebec\'s unique business funding ecosystem and provincial programs.',
    category: 'Canada',
    tags: ['Quebec', 'Provincial', 'Business Grants'],
    readTime: '13 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'Quebec programs',
      'Investissement Québec',
      'Language requirements'
    ],
    lastUpdated: '2025-09-08'
  },
  {
    id: 'apply-british-columbia-grants',
    title: 'British Columbia Business Grants Guide',
    slug: 'apply-british-columbia-grants',
    description: 'Access provincial funding programs and incentives in British Columbia.',
    category: 'Canada',
    tags: ['British Columbia', 'BC', 'Provincial'],
    readTime: '11 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'BC programs',
      'Tech sector support',
      'Clean energy incentives'
    ],
    lastUpdated: '2025-09-05'
  },
  {
    id: 'apply-alberta-business-grants',
    title: 'Alberta Business Grants Application Guide',
    slug: 'apply-alberta-business-grants',
    description: 'Complete guide to Alberta provincial business funding and economic development programs.',
    category: 'Canada',
    tags: ['Alberta', 'Provincial', 'Economic Development'],
    readTime: '12 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'Alberta programs',
      'Innovation grants',
      'Regional support'
    ],
    lastUpdated: '2025-09-02'
  },
  {
    id: 'apply-agriculture-agri-food-canada',
    title: 'Agriculture & Agri-Food Canada Funding Guide',
    slug: 'apply-agriculture-agri-food-canada',
    description: 'How to access federal funding for agriculture, agribusiness, and food processing.',
    category: 'Canada',
    tags: ['Agriculture', 'Agri-Food', 'Federal'],
    readTime: '15 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'AgriInnovate program',
      'Farm business support',
      'Processing incentives'
    ],
    lastUpdated: '2025-08-25'
  },

  // Canada Sector-Specific Guides
  {
    id: 'canada-cleantech-funding-guide',
    title: 'Canada CleanTech Funding Application Guide',
    slug: 'canada-cleantech-funding-guide',
    description: 'Access clean technology funding programs across federal and provincial levels.',
    category: 'Canada',
    tags: ['CleanTech', 'Clean Energy', 'Environment'],
    readTime: '16 min',
    difficulty: 'Advanced',
    featured: false,
    highlights: [
      'CleanTech programs',
      'Environmental innovation',
      'Sustainability funding'
    ],
    lastUpdated: '2025-09-15'
  },
  {
    id: 'canada-digital-ai-funding-guide',
    title: 'Canada Digital & AI Funding Guide',
    slug: 'canada-digital-ai-funding-guide',
    description: 'Funding opportunities for digital transformation and AI development projects.',
    category: 'Canada',
    tags: ['Digital', 'AI', 'Technology'],
    readTime: '14 min',
    difficulty: 'Advanced',
    featured: false,
    highlights: [
      'AI research funding',
      'Digital adoption programs',
      'Tech commercialization'
    ],
    lastUpdated: '2025-09-10'
  },
  {
    id: 'canada-life-sciences-funding-guide',
    title: 'Canada Life Sciences Funding Guide',
    slug: 'canada-life-sciences-funding-guide',
    description: 'Comprehensive funding guide for biotech, medical devices, and life sciences companies.',
    category: 'Canada',
    tags: ['Life Sciences', 'Biotech', 'Healthcare'],
    readTime: '17 min',
    difficulty: 'Advanced',
    featured: false,
    highlights: [
      'Biotech funding programs',
      'Clinical trial support',
      'Commercialization funding'
    ],
    lastUpdated: '2025-09-05'
  },
  {
    id: 'canada-aerospace-defence-funding-guide',
    title: 'Canada Aerospace & Defence Funding Guide',
    slug: 'canada-aerospace-defence-funding-guide',
    description: 'Access specialized funding for aerospace and defence industry projects.',
    category: 'Canada',
    tags: ['Aerospace', 'Defence', 'Manufacturing'],
    readTime: '15 min',
    difficulty: 'Advanced',
    featured: false,
    highlights: [
      'Sector-specific programs',
      'Defence procurement',
      'Innovation support'
    ],
    lastUpdated: '2025-08-30'
  },
  {
    id: 'canada-manufacturing-funding-guide',
    title: 'Canada Manufacturing Funding Guide',
    slug: 'canada-manufacturing-funding-guide',
    description: 'Funding programs for manufacturing modernization, automation, and expansion.',
    category: 'Canada',
    tags: ['Manufacturing', 'Automation', 'Industry 4.0'],
    readTime: '14 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'Manufacturing programs',
      'Automation funding',
      'Export support'
    ],
    lastUpdated: '2025-08-28'
  },
  {
    id: 'canada-agri-food-funding-guide',
    title: 'Canada Agri-Food Funding Guide',
    slug: 'canada-agri-food-funding-guide',
    description: 'Complete funding guide for agriculture and food processing businesses.',
    category: 'Canada',
    tags: ['Agriculture', 'Food Processing', 'Agribusiness'],
    readTime: '13 min',
    difficulty: 'Intermediate',
    featured: false,
    highlights: [
      'Agri-food programs',
      'Farm innovation',
      'Processing modernization'
    ],
    lastUpdated: '2025-08-25'
  },

  // Specialized Loan Programs
  {
    id: 'apply-csbfp-loans',
    title: 'Canada Small Business Financing Program Guide',
    slug: 'apply-csbfp-loans',
    description: 'How to access government-backed small business loans through CSBFP.',
    category: 'Canada',
    tags: ['CSBFP', 'Small Business', 'Loans'],
    readTime: '11 min',
    difficulty: 'Beginner',
    featured: false,
    highlights: [
      'Loan eligibility',
      'Program terms',
      'Application process'
    ],
    lastUpdated: '2025-09-20'
  },
  {
    id: 'apply-csbfp-government-financing',
    title: 'CSBFP Government Financing Application',
    slug: 'apply-csbfp-government-financing',
    description: 'Step-by-step guide to applying for CSBFP government-backed financing.',
    category: 'Canada',
    tags: ['CSBFP', 'Government Financing', 'Small Business'],
    readTime: '10 min',
    difficulty: 'Beginner',
    featured: false,
    highlights: [
      'Financing options',
      'Lender selection',
      'Documentation required'
    ],
    lastUpdated: '2025-09-18'
  }
]

export function getGuideBySlug(slug: string): Guide | undefined {
  return guidesDatabase.find(guide => guide.slug === slug)
}

export function getGuidesByCategory(category: Guide['category']): Guide[] {
  return guidesDatabase.filter(guide => guide.category === category)
}

export function getFeaturedGuides(): Guide[] {
  return guidesDatabase.filter(guide => guide.featured)
}

export function getGuidesByTag(tag: string): Guide[] {
  return guidesDatabase.filter(guide => 
    guide.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  )
}

export function getAllGuides(): Guide[] {
  return guidesDatabase
}

export function getUSAGuides(): Guide[] {
  return guidesDatabase.filter(guide => guide.category === 'USA')
}

export function getCanadaGuides(): Guide[] {
  return guidesDatabase.filter(guide => guide.category === 'Canada')
}
