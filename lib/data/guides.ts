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
  // Added for AdSense/Page logic compliance
  categories?: string[]
  region?: string
  // Added for Quality Enrichment (Phase 5)
  metrics?: {
    label: string
    value: string
    description: string
    color: string
    iconName?: string // We will use string mapping in the component to avoid massive icon imports here if needed, or just standard icon mapping
  }[]
  expertTip?: {
    title: string
    content: string
    type: 'tip' | 'warning' | 'success'
  }
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
    lastUpdated: '2025-10-14',
    metrics: [
      { label: 'Time', value: '30-90 Days', description: 'Approval timeline', color: 'text-blue-600', iconName: 'Clock' },
      { label: 'Credit', value: '640+', description: 'Min. Score (Preferred)', color: 'text-green-600', iconName: 'TrendingUp' },
      { label: 'Down Pmt', value: '10-20%', description: 'Equity injection', color: 'text-purple-600', iconName: 'PieChart' },
      { label: 'Guarantee', value: '75-85%', description: 'SBA backing', color: 'text-orange-600', iconName: 'Shield' }
    ],
    expertTip: {
      title: "The 'Credit Elsewhere' Test",
      type: 'warning',
      content: "The SBA will ONLY fund you if you <strong>cannot</strong> get a loan elsewhere on reasonable terms. You must prove you were rejected or couldn't get a standard bank loan first."
    }
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
    lastUpdated: '2025-10-01',
    metrics: [
      { label: 'Platform', value: 'Grants.gov', description: 'Sole official source', color: 'text-blue-600', iconName: 'Globe' },
      { label: 'ID Required', value: 'UEI', description: 'Unique Entity ID (SAM)', color: 'text-green-600', iconName: 'Shield' },
      { label: 'Cost', value: 'Free', description: 'Never pay to apply', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Database', value: 'CFDA', description: 'Catalog of Federal Assist.', color: 'text-purple-600', iconName: 'BookOpen' }
    ],
    expertTip: {
      title: "Beware of 'Free Money' Scams",
      type: 'warning',
      content: "The US Government does not give 'free money' for personal debt or starting a business without strings attached. Real federal grants are for specific projects (Health, Science, Education). If someone asks for a fee to apply, it is a scam."
    }
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
    lastUpdated: '2025-09-28',
    metrics: [
      { label: '7(a) Max', value: '$5M', description: 'General purpose', color: 'text-blue-600', iconName: 'DollarSign' },
      { label: '504 Max', value: '$5.5M', description: 'Real estate/equipment', color: 'text-green-600', iconName: 'Building' },
      { label: 'Microloan', value: '$50K', description: 'Small startups', color: 'text-purple-600', iconName: 'Zap' },
      { label: 'Guarantee', value: '75-90%', description: 'SBA backing', color: 'text-orange-600', iconName: 'Shield' }
    ],
    expertTip: {
      title: "Pick the Right SBA Program",
      type: 'tip',
      content: "Most people apply for 7(a) when they should use 504. If you need <strong>real estate or long-term equipment</strong> (10+ years), the 504 program offers better rates and longer terms."
    }
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
    lastUpdated: '2025-09-25',
    metrics: [
      { label: 'Phase I', value: '$150k - $250k', description: 'Feasibility Study', color: 'text-blue-600', iconName: 'Zap' },
      { label: 'Phase II', value: '$1M - $1.5M', description: 'Prototype Dev', color: 'text-green-600', iconName: 'Rocket' },
      { label: 'Equity', value: '0%', description: 'Non-dilutive funding', color: 'text-purple-600', iconName: 'PieChart' },
      { label: 'Competition', value: 'High', description: '<15% Success Rate', color: 'text-orange-600', iconName: 'Target' }
    ],
    expertTip: {
      title: "Talk to the Program Manager",
      type: 'tip',
      content: "Before writing the 50-page proposal, <strong>email the Program Manager</strong> with a 1-page summary. If they say it's not a fit, you just saved 100 hours of work."
    }
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
    lastUpdated: '2025-09-20',
    metrics: [
      { label: 'Phase I', value: '$150-250K', description: 'Feasibility', color: 'text-blue-600', iconName: 'Zap' },
      { label: 'Phase II', value: '$1-1.5M', description: 'Development', color: 'text-green-600', iconName: 'Rocket' },
      { label: 'STTR', value: 'Requires', description: 'Research partner', color: 'text-purple-600', iconName: 'Users' },
      { label: 'Rate', value: '<15%', description: 'Success rate', color: 'text-red-600', iconName: 'Target' }
    ],
    expertTip: {
      title: "STTR Needs a Research Partner",
      type: 'warning',
      content: "SBIR is for solo companies. <strong>STTR requires a partnership</strong> with a university or research institution. Don't apply to STTR unless you already have that MOU signed."
    }
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
    lastUpdated: '2025-10-05',
    metrics: [
      { label: 'Grants.gov', value: '1000+', description: 'Active opportunities', color: 'text-blue-600', iconName: 'Search' },
      { label: 'Avg Award', value: '$50-500K', description: 'Typical range', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Success', value: '10-30%', description: 'Approval rate', color: 'text-orange-600', iconName: 'TrendingUp' },
      { label: 'Time', value: '3-12 mo', description: 'Application to award', color: 'text-purple-600', iconName: 'Clock' }
    ],
    expertTip: {
      title: "Federal Grants Are Project-Based",
      type: 'warning',
      content: "The federal government does NOT give grants for 'starting a business' or 'paying off debt.' Federal grants fund <strong>specific projects</strong> (R&D, community programs, education). Check eligibility carefully."
    }
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
    lastUpdated: '2025-09-18',
    metrics: [
      { label: 'MBDA', value: 'Free', description: 'Business centers', color: 'text-green-600', iconName: 'Building' },
      { label: '8(a)', value: '9 Years', description: 'Program duration', color: 'text-blue-600', iconName: 'Clock' },
      { label: 'Set-Aside', value: '5%', description: 'Federal contracting goal', color: 'text-purple-600', iconName: 'Target' },
      { label: 'Certification', value: 'Required', description: 'MBE/DBE status', color: 'text-orange-600', iconName: 'Award' }
    ],
    expertTip: {
      title: "8(a) Program is a Game-Changer",
      type: 'success',
      content: "The SBA 8(a) Business Development Program provides <strong>9 years of sole-source federal contracts</strong> and mentorship. It's competitive to get in, but worth the effort for minority entrepreneurs."
    }
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
    lastUpdated: '2025-09-15',
    metrics: [
      { label: 'Prize', value: '$50K-200K', description: 'Cash prizes', color: 'text-green-600', iconName: 'Award' },
      { label: 'Focus', value: 'STEM/R&D', description: 'Underserved groups', color: 'text-blue-600', iconName: 'Users' },
      { label: 'Equity', value: '0%', description: 'It\'s a prize', color: 'text-purple-600', iconName: 'PieChart' },
      { label: 'Tracks', value: '2 Stages', description: 'Stage 1 & 2', color: 'text-orange-600', iconName: 'Rocket' }
    ],
    expertTip: {
      title: "Verify Eligibility First",
      type: 'warning',
      content: "This is for <strong>organizations supporting startups</strong>, not startups themselves. Accelerators, incubators, and non-profits are the applicants."
    }
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
    lastUpdated: '2025-10-08',
    metrics: [
      { label: 'Rejection', value: 'Generic', description: 'Most common reason', color: 'text-red-600', iconName: 'AlertTriangle' },
      { label: 'Format', value: 'Strict', description: 'Follow font/margin rules', color: 'text-blue-600', iconName: 'CheckCircle' },
      { label: 'Budget', value: 'Real', description: 'Justify every dollar', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Review', value: 'Peers', description: 'Scored by experts', color: 'text-purple-600', iconName: 'Users' }
    ],
    expertTip: {
      title: "Answer the 'So What?'",
      type: 'tip',
      content: "Don't just describe <em>what</em> you will do. Explain <em>why it matters</em>. If your project succeeds, who benefits? How does the taxpayer get a return on investment?"
    }
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
    lastUpdated: '2025-09-12',
    metrics: [
      { label: 'Funding', value: '$100M+', description: 'Clean energy pool', color: 'text-green-600', iconName: 'Leaf' },
      { label: 'Focus', value: 'CleanTech', description: 'Renewable energy', color: 'text-blue-600', iconName: 'Zap' },
      { label: 'Type', value: 'R&D', description: 'Research projects', color: 'text-purple-600', iconName: 'Lightbulb' },
      { label: 'Timeline', value: 'Rolling', description: 'Various deadlines', color: 'text-orange-600', iconName: 'Clock' }
    ],
    expertTip: {
      title: "DOE Favors National Labs Partnerships",
      type: 'tip',
      content: "DOE grants have <strong>higher success rates</strong> when you partner with a National Laboratory (like Argonne, NREL, or Sandia). They provide technical expertise and credibility."
    }
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
    lastUpdated: '2025-09-08',
    metrics: [
      { label: 'State', value: 'California', description: 'CA only', color: 'text-blue-600', iconName: 'MapPin' },
      { label: 'Max', value: '$2.5M', description: 'Guarantee amount', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Fee', value: 'Low', description: 'State subsidy', color: 'text-purple-600', iconName: 'Award' },
      { label: 'Type', value: 'Guarantee', description: 'Backs lender', color: 'text-orange-600', iconName: 'Shield' }
    ],
    expertTip: {
      title: "CA Guarantee vs SBA",
      type: 'tip',
      content: "California's program has <strong>looser credit requirements</strong> than SBA 7(a) but lower maximum amounts. Try CA first if you have credit challenges."
    }
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
    lastUpdated: '2025-09-20',
    metrics: [
      { label: 'Min Project', value: '$10 Million', description: 'Target project size', color: 'text-blue-600', iconName: 'Target' },
      { label: 'Funding Type', value: 'Contribution', description: 'Repayable & Non-repay', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Duration', value: 'Multi-year', description: 'Long-term partnership', color: 'text-purple-600', iconName: 'Clock' },
      { label: 'Sectors', value: 'All Industrial', description: 'Technology focus', color: 'text-orange-600', iconName: 'Factory' }
    ],
    expertTip: {
      title: "SIF is for 'Market Movers'",
      type: 'warning',
      content: "The Strategic Innovation Fund (SIF) is not for early-stage startups. It is designed for massive projects that create hundreds of jobs. If you are requesting less than $10M, look at <strong>IRAP</strong> or <strong>Regional Agencies</strong> instead."
    }
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
    lastUpdated: '2025-10-05',
    metrics: [
      { label: 'Salary Coverage', value: 'Up to 80%', description: 'For technical staff', color: 'text-green-600', iconName: 'Users' },
      { label: 'Project Cap', value: '$150k - $500k', description: 'Typical first project', color: 'text-blue-600', iconName: 'PieChart' },
      { label: 'Speed', value: 'Fast', description: 'Monthly approvals', color: 'text-yellow-600', iconName: 'Zap' },
      { label: 'Equity', value: '0%', description: 'Non-dilutive grant', color: 'text-purple-600', iconName: 'Shield' }
    ],
    expertTip: {
      title: "The 'ITA' Factor",
      type: 'tip',
      content: "You cannot apply for IRAP through a portal. You must be 'invited' by an Industrial Technology Advisor (ITA). Your first step is not filling a form, but calling IRAP (1-877-994-4727) to request a consultation."
    }
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
    lastUpdated: '2025-09-30',
    metrics: [
      { label: 'NRC', value: 'IRAP', description: 'Federal program', color: 'text-blue-600', iconName: 'Flag' },
      { label: 'Coverage', value: 'Up to 80%', description: 'Salary support', color: 'text-green-600', iconName: 'Users' },
      { label: 'Type', value: 'Grant', description: 'Non-repayable', color: 'text-purple-600', iconName: 'DollarSign' },
      { label: 'Speed', value: 'Fast', description: 'Monthly intake', color: 'text-orange-600', iconName: 'Zap' }
    ],
    expertTip: {
      title: "Call First, Apply Later",
      type: 'tip',
      content: "IRAP doesn't have an online application. You must <strong>call 1-877-994-4727</strong> to request an Industrial Technology Advisor (ITA) consultation. They decide if you're eligible BEFORE you prepare anything."
    }
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
    lastUpdated: '2025-09-25',
    metrics: [
      { label: 'Contribution', value: '80%', description: 'Salaries covered', color: 'text-green-600', iconName: 'Users' },
      { label: 'Contractors', value: '50%', description: 'Costs covered', color: 'text-blue-600', iconName: 'FileText' },
      { label: 'Project', value: '$50K-500K', description: 'Typical range', color: 'text-purple-600', iconName: 'DollarSign' },
      { label: 'Advisory', value: 'Free', description: 'ITA support', color: 'text-orange-600', iconName: 'Lightbulb' }
    ],
    expertTip: {
      title: "The ITA Relationship is Key",
      type: 'tip',
      content: "You cannot apply online blindly. <strong>You must engage an Industrial Technology Advisor (ITA)</strong> first. They invite you to apply. Cold applications don't exist."
    }
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
    lastUpdated: '2025-10-01',
    metrics: [
      { label: 'Tax Credit', value: '35%', description: 'For CCPCs', color: 'text-green-600', iconName: 'PieChart' },
      { label: 'Refundable', value: 'Yes', description: 'Cash back for small biz', color: 'text-blue-600', iconName: 'DollarSign' },
      { label: 'Deadline', value: '18 Months', description: 'After fiscal year end', color: 'text-red-600', iconName: 'Clock' },
      { label: 'Success Rate', value: 'Audit Risk', description: 'Requires technical docs', color: 'text-orange-600', iconName: 'AlertTriangle' }
    ],
    expertTip: {
      title: "Technological Uncertainty is Key",
      type: 'warning',
      content: "SR&ED is not for 'standard engineering' or 'bug fixing'. To qualify, you must prove you faced a technological uncertainty that standard practice could not resolve. Document your failures—they are your proof!"
    }
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
    lastUpdated: '2025-10-10',
    metrics: [
      { label: 'Total', value: '$6B', description: 'WES Ecosystem', color: 'text-pink-600', iconName: 'DollarSign' },
      { label: 'Programs', value: '15+', description: 'Federal initiatives', color: 'text-blue-600', iconName: 'Award' },
      { label: 'Focus', value: 'Women', description: 'Female entrepreneurs', color: 'text-pink-600', iconName: 'Users' },
      { label: 'Type', value: 'Multiple', description: 'Grants/loans/support', color: 'text-purple-600', iconName: 'Zap' }
    ],
    expertTip: {
      title: "WES is an Ecosystem, Not a Program",
      type: 'success',
      content: "Women Entrepreneurship Strategy isn't one application. It's <strong>15+ coordinated programs</strong> (grants, loans, mentorship). Stack multiple WES programs for maximum benefit."
    }
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
    lastUpdated: '2025-09-28',
    metrics: [
      { label: 'Total', value: '$6B', description: 'WES Investment', color: 'text-pink-600', iconName: 'DollarSign' },
      { label: 'Access', value: 'Multi', description: 'Various pathways', color: 'text-blue-600', iconName: 'Award' },
      { label: 'Gender', value: 'Women', description: 'Female owned 51%+', color: 'text-pink-600', iconName: 'Users' },
      { label: 'Support', value: 'Holistic', description: 'Full ecosystem', color: 'text-green-600', iconName: 'Heart' }
    ],
    expertTip: {
      title: "Alternative WES Entry Points",
      type: 'tip',
      content: "Can't access WES grants directly? Use <strong>WES ecosystem partners</strong> like Women's Enterprise Organizations for mentorship, then leverage that relationship for funding introductions."
    }
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
    lastUpdated: '2025-09-18',
    metrics: [
      { label: 'Loan', value: '$50K', description: 'Max amount', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Admin', value: 'Partners', description: 'Distributed by WEOs', color: 'text-blue-600', iconName: 'Handshake' },
      { label: 'Terms', value: 'Flexible', description: 'Low interest', color: 'text-purple-600', iconName: 'Smile' },
      { label: 'Focus', value: 'Startups', description: 'Women-owned/led', color: 'text-orange-600', iconName: 'Users' }
    ],
    expertTip: {
      title: "Apply via Partners",
      type: 'tip',
      content: "You don't apply to the government directly. Apply through <strong>Women's Enterprise Organizations (WEOs)</strong> like WEOC or Coralus. Each has different criteria."
    }
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
    lastUpdated: '2025-09-14',
    metrics: [
      { label: 'Loan', value: '$60k', description: 'Futurpreneur + BDC', color: 'text-blue-600', iconName: 'DollarSign' },
      { label: 'Age', value: '18 - 39', description: 'Eligibility Range', color: 'text-green-600', iconName: 'User' },
      { label: 'Mentor', value: 'Included', description: '2 Years Support', color: 'text-purple-600', iconName: 'Users' },
      { label: 'Credit', value: 'Flexible', description: 'No credit history ok', color: 'text-orange-600', iconName: 'ThumbsUp' }
    ],
    expertTip: {
      title: "The Mentor is the Key",
      type: 'success',
      content: "Futurpreneur isn't just money; it's a mentorship program. Showing that you are <strong>coachable</strong> during the interview is just as important as your business plan."
    }
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
    lastUpdated: '2025-09-10',
    metrics: [
      { label: 'BDC', value: 'Loans', description: 'Federal bank', color: 'text-blue-600', iconName: 'Building' },
      { label: 'Women', value: 'Priority', description: 'Female entrepreneurs', color: 'text-pink-600', iconName: 'Users' },
      { label: 'Type', value: 'Financing', description: 'Loans + advisory', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Support', value: 'Holistic', description: 'Capital + mentorship', color: 'text-purple-600', iconName: 'Award' }
    ],
    expertTip: {
      title: "BDC Women Loan Advantages",
      type: 'success',
      content: "BDC's Women Entrepreneurship Program offers <strong>flexible terms and mentorship</strong> not available in traditional banking, plus can be stacked with government grants."
    }
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
    lastUpdated: '2025-09-10',
    metrics: [
      { label: 'Grant', value: '$15,000', description: 'CDAP Boost', color: 'text-blue-600', iconName: 'Zap' },
      { label: 'Wage', value: '$7,300', description: 'Digital Youth', color: 'text-green-600', iconName: 'Users' },
      { label: 'Scale AI', value: '50%', description: 'Project reimbursement', color: 'text-purple-600', iconName: 'PieChart' },
      { label: 'Loan', value: '$100k', description: '0% Interest (BDC)', color: 'text-orange-600', iconName: 'DollarSign' }
    ],
    expertTip: {
      title: "Stack CDAP with Wage Subsidies",
      type: 'tip',
      content: "Smart founders stack grants. Use the <strong>CDAP</strong> grant to pay for a digital strategy, then use a <strong>Digital Youth Internship</strong> grant to hire a student to implement it."
    }
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
    lastUpdated: '2025-09-05',
    metrics: [
      { label: 'EDC', value: 'Crown Corp', description: 'Federal export bank', color: 'text-blue-600', iconName: 'Flag' },
      { label: 'Focus', value: 'Trade', description: 'International sales', color: 'text-green-600', iconName: 'Globe' },
      { label: 'Women', value: 'Priority', description: 'Female exporters', color: 'text-pink-600', iconName: 'Users' },
      { label: 'Service', value: 'Insurance', description: 'Risk protection', color: 'text-purple-600', iconName: 'Shield' }
    ],
    expertTip: {
      title: "EDC + CanExport Stack",
      type: 'success',
      content: "Women exporters can combine <strong>CanExport grants (up to $75K) with EDC financing</strong> for comprehensive international expansion support."
    }
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
    lastUpdated: '2025-08-30',
    metrics: [
      { label: 'Value', value: '$20K-1M+', description: 'Varies by grant', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Duration', value: '1-5 Years', description: 'Multi-year funding', color: 'text-blue-600', iconName: 'Clock' },
      { label: 'Focus', value: 'NSE', description: 'Natural Sciences/Eng', color: 'text-purple-600', iconName: 'Zap' },
      { label: 'Partners', value: 'Industry', description: 'Alliance grants', color: 'text-orange-600', iconName: 'Handshake' }
    ],
    expertTip: {
      title: "Industry Partnerships Boost Success",
      type: 'tip',
      content: "Alliance grants require a <strong>private sector partner</strong>. Bringing cash/in-kind contributions from industry significantly increases your approval odds."
    }
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
    lastUpdated: '2025-09-01',
    metrics: [
      { label: 'Agencies', value: '6 RDAs', description: 'Regional coverage', color: 'text-blue-600', iconName: 'MapPin' },
      { label: 'Funding', value: 'Varies', description: 'By region/program', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Focus', value: 'Regional', description: 'Economic development', color: 'text-purple-600', iconName: 'TrendingUp' },
      { label: 'Type', value: 'Mixed', description: 'Grants & loans', color: 'text-orange-600', iconName: 'Award' }
    ],
    expertTip: {
      title: "Know Your RDA",
      type: 'tip',
      content: "Each region has its own RDA: <strong>WD (West), PrairiesCan, FedDev Ontario, FedDev Southern Ontario, CED Quebec, ACOA (Atlantic)</strong>. Apply to YOUR regional agency, not all six."
    }
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
    lastUpdated: '2025-08-28',
    metrics: [
      { label: 'IAND', value: 'Priority', description: 'Indigenous programs', color: 'text-red-600', iconName: 'Users' },
      { label: 'Rural', value: 'USDA/NRC', description: 'Federal support', color: 'text-green-600', iconName: 'Leaf' },
      { label: 'Community', value: 'Focus', description: 'Economic development', color: 'text-blue-600', iconName: 'Home' },
      { label: 'Support', value: 'Enhanced', description: 'Advisory services', color: 'text-purple-600', iconName: 'Award' }
    ],
    expertTip: {
      title: "Indigenous Set-Asides Have Priority",
      type: 'success',
      content: "Many federal programs have <strong>dedicated Indigenous set-asides</strong> with less competition. IAND programs also provide culturally relevant business support unavailable elsewhere."
    }
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
    lastUpdated: '2025-09-12',
    metrics: [
      { label: 'Grant', value: '$2,500', description: 'Digital Main St.', color: 'text-blue-600', iconName: 'Globe' },
      { label: 'Training', value: '100% Free', description: 'Skills Development', color: 'text-green-600', iconName: 'BookOpen' },
      { label: 'Region', value: 'Ontario Wide', description: 'All Municipalities', color: 'text-purple-600', iconName: 'MapPin' },
      { label: 'Type', value: 'Voucher', description: 'Service payment', color: 'text-orange-600', iconName: 'Zap' }
    ],
    expertTip: {
      title: "Focus on 'SWODF' and 'EODF'",
      type: 'tip',
      content: "Outside of Toronto? The <strong>Southwestern (SWODF)</strong> and <strong>Eastern (EODF)</strong> Ontario Development Funds are the real heavy hitters for manufacturing and expansion projects over $500k."
    }
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
    lastUpdated: '2025-09-08',
    metrics: [
      { label: 'Loan', value: '$50k+', description: 'Impulsion PME', color: 'text-blue-600', iconName: 'DollarSign' },
      { label: 'Credit', value: '30%', description: 'CDAE Tax Credit', color: 'text-green-600', iconName: 'PieChart' },
      { label: 'Focus', value: 'Tech & AI', description: 'Montreal Hub', color: 'text-purple-600', iconName: 'Cpu' },
      { label: 'Language', value: 'French', description: 'Required for docs', color: 'text-red-600', iconName: 'FileText' }
    ],
    expertTip: {
      title: "Investissement Québec is King",
      type: 'success',
      content: "In Quebec, <strong>Investissement Québec (IQ)</strong> is the central hub. Unlike other provinces with fragmented agencies, IQ handles loans, equity, and grants under one roof. Start there."
    }
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
    lastUpdated: '2025-09-05',
    metrics: [
      { label: 'Grant', value: '$10,000', description: 'Launch Online', color: 'text-blue-600', iconName: 'Globe' },
      { label: 'Tax Credit', value: '30%', description: 'Venture Capital', color: 'text-green-600', iconName: 'TrendingUp' },
      { label: 'Sector', value: 'Clean BC', description: 'Green Energy Focus', color: 'text-green-600', iconName: 'Leaf' },
      { label: 'Region', value: 'BC Wide', description: 'Including Rural', color: 'text-purple-600', iconName: 'MapPin' }
    ],
    expertTip: {
      title: "Target 'Innovate BC'",
      type: 'tip',
      content: "If you are a tech company, <strong>Innovate BC</strong> is your primary target. Their 'Hiring Grant' is one of the easiest ways to get $10,000 funded for a student or co-op hire."
    }
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
    lastUpdated: '2025-09-02',
    metrics: [
      { label: 'Voucher', value: '$15k - $100k', description: 'Alberta Innovates', color: 'text-blue-600', iconName: 'Zap' },
      { label: 'Clean Tech', value: '$5M+', description: 'ERA Funding', color: 'text-green-600', iconName: 'Leaf' },
      { label: 'Match', value: '25% - 75%', description: 'Investment required', color: 'text-purple-600', iconName: 'PieChart' },
      { label: 'Sector', value: 'Diversified', description: 'Tech, Ag, Energy', color: 'text-orange-600', iconName: 'Target' }
    ],
    expertTip: {
      title: "Alberta Innovates is your First Stop",
      type: 'success',
      content: "For most Alberta tech startups, the <strong>Alberta Innovates Voucher Program</strong> is the entry point. It pays service providers directly to help you build or market your product."
    }
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
    lastUpdated: '2025-08-25',
    metrics: [
      { label: 'Funding', value: '$5 Million', description: 'Max per project', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Type', value: 'Repayable', description: '0% Interest Loan', color: 'text-blue-600', iconName: 'RefreshCw' },
      { label: 'Focus', value: 'Innovation', description: 'New tech adoption', color: 'text-purple-600', iconName: 'Zap' },
      { label: 'Status', value: 'Open', description: 'Continuous Intake', color: 'text-green-600', iconName: 'CheckCircle' }
    ],
    expertTip: {
      title: "It's Not Just for Farmers",
      type: 'tip',
      content: "AgriInnovate is often misunderstood. It is for <strong>commercializing new agricultural technology</strong>. If you are a tech company building sensors for farms, YOU are eligible, not just the farmer."
    }
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
    lastUpdated: '2025-09-15',
    metrics: [
      { label: 'SDTC', value: '$10M', description: 'Max per project', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Focus', value: 'CleanTech', description: 'Environmental tech', color: 'text-green-600', iconName: 'Leaf' },
      { label: 'Stage', value: 'Scale-Up', description: 'Post-prototype', color: 'text-blue-600', iconName: 'TrendingUp' },
      { label: 'Type', value: 'Non-Repay', description: 'Grant funding', color: 'text-purple-600', iconName: 'Award' }
    ],
    expertTip: {
      title: "SDTC Environmental Impact",
      type: 'warning',
      content: "SDTC requires <strong>quantifiable environmental benefits</strong> (GHG reduction, water savings, etc.). Vague sustainability claims won't meet the criteria."
    }
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
    lastUpdated: '2025-09-05',
    metrics: [
      { label: 'Focus', value: 'BioTech', description: 'Life sciences', color: 'text-purple-600', iconName: 'Zap' },
      { label: 'Funding', value: '$1M+', description: 'R&D projects', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Stage', value: 'Clinical', description: 'Trials supported', color: 'text-blue-600', iconName: 'TrendingUp' },
      { label: 'Type', value: 'Mixed', description: 'Grants + loans', color: 'text-orange-600', iconName: 'Award' }
    ],
    expertTip: {
      title: "Regulatory Pathway Critical",
      type: 'warning',
      content: "Life sciences funding requires <strong>clear regulatory pathway</strong> (FDA/Health Canada). Demonstrate you understand approval process before applying."
    }
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
    lastUpdated: '2025-08-30',
    metrics: [
      { label: 'Sector', value: 'Aerospace', description: 'Defence focus', color: 'text-blue-600', iconName: 'Rocket' },
      { label: 'Max', value: '$10M+', description: 'Large projects', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Security', value: 'Clearance', description: 'May be required', color: 'text-red-600', iconName: 'Shield' },
      { label: 'Contracts', value: 'DND', description: 'Defence procurement', color: 'text-purple-600', iconName: 'Flag' }
    ],
    expertTip: {
      title: "Defence Contracts = Long Sales Cycle",
      type: 'tip',
      content: "Aerospace/defence funding often requires <strong>2-3 years from application to contract</strong>. Have runway capital while pursuing these opportunities."
    }
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
    lastUpdated: '2025-08-28',
    metrics: [
      { label: 'Sector', value: 'Mfg', description: 'Manufacturing', color: 'text-blue-600', iconName: 'Factory' },
      { label: 'Focus', value: 'Auto/Tech', description: 'Industry 4.0', color: 'text-purple-600', iconName: 'Zap' },
      { label: 'Max', value: '$5M', description: 'Equipment/expansion', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Type', value: 'Multiple', description: 'Fed + provincial', color: 'text-orange-600', iconName: 'Award' }
    ],
    expertTip: {
      title: "Provincial Manufacturing Grants",
      type: 'tip',
      content: "Manufacturing grants vary widely by province. <strong>Ontario (SWODF/EODF) and Quebec (IQ) offer largest amounts</strong> for equipment and expansion."
    }
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
    lastUpdated: '2025-08-25',
    metrics: [
      { label: 'Focus', value: 'Agri-Food', description: 'Farm + processing', color: 'text-green-600', iconName: 'Leaf' },
      { label: 'Range', value: '$10K-5M', description: 'Project scale', color: 'text-blue-600', iconName: 'DollarSign' },
      { label: 'Type', value: 'Multiple', description: 'Grants/loans/tax', color: 'text-purple-600', iconName: 'Award' },
      { label: 'Scope', value: 'National', description: 'All provinces', color: 'text-orange-600', iconName: 'MapPin' }
    ],
    expertTip: {
      title: "Ag Programs Are Fragmented",
      type: 'tip',
      content: "Agriculture funding comes from <strong>federal + provincial + regional agencies</strong>. Check all three levels simultaneously for maximum coverage."
    }
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
    lastUpdated: '2025-09-20',
    metrics: [
      { label: 'Max Loan', value: '$1M', description: 'Per borrower', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Equipment', value: '$350K', description: 'Max for assets', color: 'text-blue-600', iconName: 'Award' },
      { label: 'Leasehold', value: '$350K', description: 'Improvements', color: 'text-purple-600', iconName: 'Building' },
      { label: 'Guarantee', value: '85%', description: 'Government backed', color: 'text-orange-600', iconName: 'Shield' }
    ],
    expertTip: {
      title: "CSBFP Doesn't Replace Collateral",
      type: 'warning',
      content: "Banks still lend to YOU. The CSBFP guarantee protects <strong>the bank</strong>, not you. If you default, you still owe. But it makes getting approved easier for startups without assets."
    }
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
    lastUpdated: '2025-09-18',
    metrics: [
      { label: 'Max', value: '$1M', description: 'Total financing', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Fee', value: '2%', description: 'Registration fee', color: 'text-blue-600', iconName: 'DollarSign' },
      { label: 'Term', value: '10-15 yr', description: 'Amortization', color: 'text-purple-600', iconName: 'Clock' },
      { label: 'Type', value: 'Secured', description: 'Asset-backed', color: 'text-orange-600', iconName: 'Shield' }
    ],
    expertTip: {
      title: "Shop Your Lender",
      type: 'tip',
      content: "<strong>All Canadian banks participate in CSBFP</strong>, but approval rates vary. If one bank rejects you, try another. The program is the same, but credit policies differ."
    }
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
