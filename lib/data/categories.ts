export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon?: string
  color: string
  parentCategory?: string
  subcategories?: string[]
  eligibleFor: ('USA' | 'Canada' | 'Both')[]
  popularityScore: number
}

export interface GrantCategory extends Category {
  typicalFundingRange: {
    min: number
    max: number
  }
  averageApprovalRate?: number
  averageProcessingTime?: string
}

export interface BlogCategory extends Category {
  postCount?: number
}

// ========================================
// GRANT CATEGORIES
// ========================================

export const grantCategories: GrantCategory[] = [
  // Business Stage Categories
  {
    id: 'startup-funding',
    name: 'Startup Funding',
    slug: 'startup-funding',
    description: 'Grants and funding for new businesses in their first 3 years of operation',
    icon: '🚀',
    color: 'blue',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 95,
    typicalFundingRange: {
      min: 5000,
      max: 500000
    },
    averageApprovalRate: 15,
    averageProcessingTime: '60-90 days'
  },
  {
    id: 'small-business-grants',
    name: 'Small Business Grants',
    slug: 'small-business-grants',
    description: 'General funding programs for established small businesses',
    icon: '🏪',
    color: 'green',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 98,
    typicalFundingRange: {
      min: 10000,
      max: 2000000
    },
    averageApprovalRate: 20,
    averageProcessingTime: '45-60 days'
  },
  {
    id: 'scale-up-growth',
    name: 'Scale-Up & Growth Funding',
    slug: 'scale-up-growth',
    description: 'Large-scale funding for businesses ready to expand rapidly',
    icon: '📈',
    color: 'purple',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 75,
    typicalFundingRange: {
      min: 100000,
      max: 10000000
    },
    averageApprovalRate: 10,
    averageProcessingTime: '90-180 days'
  },

  // Industry-Specific Categories
  {
    id: 'technology-innovation',
    name: 'Technology & Innovation',
    slug: 'technology-innovation',
    description: 'Grants for tech companies, software, AI, and digital innovation',
    icon: '💻',
    color: 'indigo',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 92,
    typicalFundingRange: {
      min: 25000,
      max: 5000000
    },
    averageApprovalRate: 18,
    averageProcessingTime: '60-120 days'
  },
  {
    id: 'clean-technology',
    name: 'Clean Technology & Energy',
    slug: 'clean-technology',
    description: 'Funding for clean energy, sustainability, and environmental innovation',
    icon: '🌱',
    color: 'green',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 88,
    typicalFundingRange: {
      min: 50000,
      max: 10000000
    },
    averageApprovalRate: 15,
    averageProcessingTime: '90-150 days'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Industry',
    slug: 'manufacturing',
    description: 'Grants for manufacturing modernization, automation, and production',
    icon: '🏭',
    color: 'gray',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 78,
    typicalFundingRange: {
      min: 50000,
      max: 5000000
    },
    averageApprovalRate: 22,
    averageProcessingTime: '60-90 days'
  },
  {
    id: 'agriculture-agritech',
    name: 'Agriculture & Agri-Tech',
    slug: 'agriculture-agritech',
    description: 'Funding for farming, agribusiness, and agricultural innovation',
    icon: '🌾',
    color: 'yellow',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 72,
    typicalFundingRange: {
      min: 25000,
      max: 3000000
    },
    averageApprovalRate: 25,
    averageProcessingTime: '45-75 days'
  },
  {
    id: 'healthcare-biotech',
    name: 'Healthcare & Biotech',
    slug: 'healthcare-biotech',
    description: 'Life sciences, medical devices, pharmaceuticals, and health tech',
    icon: '🏥',
    color: 'red',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 85,
    typicalFundingRange: {
      min: 100000,
      max: 15000000
    },
    averageApprovalRate: 12,
    averageProcessingTime: '120-180 days'
  },
  {
    id: 'aerospace-defence',
    name: 'Aerospace & Defence',
    slug: 'aerospace-defence',
    description: 'Specialized funding for aerospace, defence, and advanced manufacturing',
    icon: '✈️',
    color: 'blue',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 65,
    typicalFundingRange: {
      min: 250000,
      max: 20000000
    },
    averageApprovalRate: 8,
    averageProcessingTime: '180-365 days'
  },

  // Demographic-Specific Categories
  {
    id: 'women-entrepreneurs',
    name: 'Women Entrepreneurs',
    slug: 'women-entrepreneurs',
    description: 'Grants and funding specifically for women-owned businesses',
    icon: '👩‍💼',
    color: 'pink',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 90,
    typicalFundingRange: {
      min: 5000,
      max: 500000
    },
    averageApprovalRate: 24,
    averageProcessingTime: '30-60 days'
  },
  {
    id: 'minority-businesses',
    name: 'Minority-Owned Businesses',
    slug: 'minority-businesses',
    description: 'Programs supporting minority and underrepresented entrepreneurs',
    icon: '🤝',
    color: 'orange',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 82,
    typicalFundingRange: {
      min: 10000,
      max: 400000
    },
    averageApprovalRate: 20,
    averageProcessingTime: '45-75 days'
  },
  {
    id: 'indigenous-businesses',
    name: 'Indigenous Businesses',
    slug: 'indigenous-businesses',
    description: 'Funding for Indigenous entrepreneurs and communities in Canada',
    icon: '🪶',
    color: 'brown',
    eligibleFor: ['Canada'],
    popularityScore: 68,
    typicalFundingRange: {
      min: 5000,
      max: 300000
    },
    averageApprovalRate: 28,
    averageProcessingTime: '30-60 days'
  },
  {
    id: 'veteran-businesses',
    name: 'Veteran-Owned Businesses',
    slug: 'veteran-businesses',
    description: 'Programs supporting military veterans transitioning to entrepreneurship',
    icon: '🎖️',
    color: 'red',
    eligibleFor: ['USA'],
    popularityScore: 75,
    typicalFundingRange: {
      min: 10000,
      max: 500000
    },
    averageApprovalRate: 22,
    averageProcessingTime: '30-45 days'
  },
  {
    id: 'youth-entrepreneurs',
    name: 'Youth Entrepreneurs',
    slug: 'youth-entrepreneurs',
    description: 'Funding for young entrepreneurs under 35-40 years old',
    icon: '👨‍🎓',
    color: 'blue',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 70,
    typicalFundingRange: {
      min: 5000,
      max: 100000
    },
    averageApprovalRate: 30,
    averageProcessingTime: '30-45 days'
  },

  // Purpose-Specific Categories
  {
    id: 'research-development',
    name: 'Research & Development',
    slug: 'research-development',
    description: 'R&D grants including SBIR, STTR, and innovation funding',
    icon: '🔬',
    color: 'purple',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 87,
    typicalFundingRange: {
      min: 50000,
      max: 5000000
    },
    averageApprovalRate: 16,
    averageProcessingTime: '90-120 days'
  },
  {
    id: 'export-trade',
    name: 'Export & Trade',
    slug: 'export-trade',
    description: 'Funding for businesses expanding into international markets',
    icon: '🌍',
    color: 'blue',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 73,
    typicalFundingRange: {
      min: 15000,
      max: 1000000
    },
    averageApprovalRate: 25,
    averageProcessingTime: '45-60 days'
  },
  {
    id: 'hiring-training',
    name: 'Hiring & Workforce Training',
    slug: 'hiring-training',
    description: 'Grants for employee recruitment, training, and workforce development',
    icon: '👥',
    color: 'green',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 80,
    typicalFundingRange: {
      min: 5000,
      max: 250000
    },
    averageApprovalRate: 35,
    averageProcessingTime: '30-45 days'
  },
  {
    id: 'digital-transformation',
    name: 'Digital Transformation',
    slug: 'digital-transformation',
    description: 'Technology adoption, digitization, and business modernization',
    icon: '🔄',
    color: 'indigo',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 84,
    typicalFundingRange: {
      min: 10000,
      max: 500000
    },
    averageApprovalRate: 28,
    averageProcessingTime: '30-60 days'
  },

  // Geographic Categories
  {
    id: 'federal-grants',
    name: 'Federal Grants',
    slug: 'federal-grants',
    description: 'National-level government funding programs',
    icon: '🏛️',
    color: 'blue',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 96,
    typicalFundingRange: {
      min: 25000,
      max: 10000000
    },
    averageApprovalRate: 15,
    averageProcessingTime: '90-180 days'
  },
  {
    id: 'state-provincial-grants',
    name: 'State/Provincial Grants',
    slug: 'state-provincial-grants',
    description: 'Regional government funding at state or provincial level',
    icon: '📍',
    color: 'green',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 89,
    typicalFundingRange: {
      min: 10000,
      max: 5000000
    },
    averageApprovalRate: 22,
    averageProcessingTime: '45-90 days'
  },
  {
    id: 'rural-regional',
    name: 'Rural & Regional Development',
    slug: 'rural-regional',
    description: 'Funding for businesses in rural and underserved communities',
    icon: '🏞️',
    color: 'green',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 71,
    typicalFundingRange: {
      min: 10000,
      max: 1000000
    },
    averageApprovalRate: 30,
    averageProcessingTime: '30-60 days'
  }
]

// ========================================
// BLOG CATEGORIES
// ========================================

export const blogCategories: BlogCategory[] = [
  {
    id: 'usa-news',
    name: 'USA Grant News',
    slug: 'usa-news',
    description: 'Latest updates on US government grants and funding programs',
    icon: '🇺🇸',
    color: 'blue',
    eligibleFor: ['USA'],
    popularityScore: 92,
    postCount: 0
  },
  {
    id: 'canada-news',
    name: 'Canada Grant News',
    slug: 'canada-news',
    description: 'Canadian government grants and funding announcements',
    icon: '🇨🇦',
    color: 'red',
    eligibleFor: ['Canada'],
    popularityScore: 90,
    postCount: 0
  },
  {
    id: 'funding-alerts',
    name: 'Funding Alerts',
    slug: 'funding-alerts',
    description: 'Time-sensitive grant opportunities and deadlines',
    icon: '⏰',
    color: 'red',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 95,
    postCount: 0
  },
  {
    id: 'tips-guides',
    name: 'Tips & Guides',
    slug: 'tips-guides',
    description: 'Expert advice on grant applications and business funding',
    icon: '💡',
    color: 'yellow',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 88,
    postCount: 0
  },
  {
    id: 'industry-specific',
    name: 'Industry-Specific Guides',
    slug: 'industry-specific',
    description: 'Sector-focused funding information and opportunities',
    icon: '🏭',
    color: 'purple',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 85,
    postCount: 0
  },
  {
    id: 'demographic-specific',
    name: 'Demographic-Specific Programs',
    slug: 'demographic-specific',
    description: 'Funding for women, minorities, veterans, and other groups',
    icon: '👥',
    color: 'pink',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 87,
    postCount: 0
  },
  {
    id: 'state-specific',
    name: 'State-Specific Programs',
    slug: 'state-specific',
    description: 'State and provincial funding opportunities',
    icon: '📍',
    color: 'green',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 82,
    postCount: 0
  },
  {
    id: 'seasonal',
    name: 'Seasonal Opportunities',
    slug: 'seasonal',
    description: 'Quarterly deadlines and seasonal funding programs',
    icon: '📅',
    color: 'orange',
    eligibleFor: ['USA', 'Canada'],
    popularityScore: 78,
    postCount: 0
  }
]

// ========================================
// HELPER FUNCTIONS
// ========================================

export function getGrantCategoryBySlug(slug: string): GrantCategory | undefined {
  return grantCategories.find(cat => cat.slug === slug)
}

export function getBlogCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find(cat => cat.slug === slug)
}

export function getGrantCategoriesByCountry(country: 'USA' | 'Canada'): GrantCategory[] {
  return grantCategories.filter(cat => cat.eligibleFor.includes(country))
}

export function getTopGrantCategories(limit: number = 5): GrantCategory[] {
  return grantCategories
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, limit)
}

export function getTopBlogCategories(limit: number = 5): BlogCategory[] {
  return blogCategories
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, limit)
}

export function getAllGrantCategories(): GrantCategory[] {
  return grantCategories
}

export function getAllBlogCategories(): BlogCategory[] {
  return blogCategories
}

export function searchCategories(query: string): (GrantCategory | BlogCategory)[] {
  const lowercaseQuery = query.toLowerCase()
  const allCategories = [...grantCategories, ...blogCategories]
  
  return allCategories.filter(cat =>
    cat.name.toLowerCase().includes(lowercaseQuery) ||
    cat.description.toLowerCase().includes(lowercaseQuery) ||
    cat.slug.toLowerCase().includes(lowercaseQuery)
  )
}
