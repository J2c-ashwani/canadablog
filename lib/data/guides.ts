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
  content?: string // HTML content for the guide body
  // E-E-A-T "Short Answer" Strategy Fields (Phase 9)
  shortAnswer?: string;
  jumpLinks?: { title: string; id: string }[];
  eligibleCheck?: boolean;
  inlineCTA?: {
    title?: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
  };
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
      content: "The SBA will ONLY fund you if you <strong>cannot</strong> get a loan elsewhere on reasonable terms. You must prove you were rejected or couldn't get a standard bank loan first.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "The SBA application takes 30-90 days. You need a 640+ credit score, 10-20% down payment, and proof you can't get a conventional loan. Start at SBA.gov/lender-match to find an approved lender.",
    jumpLinks: [
      { title: 'Requirements', id: 'requirements' },
      { title: 'Documents', id: 'documents' },
      { title: 'Timeline', id: 'timeline' },
      { title: 'Mistakes', id: 'mistakes' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Need help with your SBA application? Our funding specialists guide you through every step.",
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
      content: "The US Government does not give 'free money' for personal debt or starting a business without strings attached. Real federal grants are for specific projects (Health, Science, Education). If someone asks for a fee to apply, it is a scam.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "How to Apply for USA Federal Grants — Complete step-by-step guide for navigating the US federal grant application process including Grants.gov registration an",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Need expert help with your grant application? Our funding specialists guide you through every step.",
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
      content: "Most people apply for 7(a) when they should use 504. If you need <strong>real estate or long-term equipment</strong> (10+ years), the 504 program offers better rates and longer terms.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "SBA 7(a) loans go up to $5M with terms to 25 years, 504 loans up to $5.5M for real estate/equipment, and Microloans up to $50K. Start at SBA.gov/lender-match — you apply through an approved lender, not directly through the SBA.",
    jumpLinks: [
      { title: 'Loans', id: 'loans' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'Application', id: 'application' }, { title: 'FAQ', id: 'faq' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Not sure which SBA program fits? Our funding specialists match you to the right opportunity.",
    }
  },
  {
    id: 'sbir-research-grants-guide',
    title: 'How to Apply for SBIR Research Grants',
    slug: 'sbir-research-grants-guide',
    description: 'Complete guide to applying for Small Business Innovation Research (SBIR) Phase I & II grants.',
    category: 'USA',
    lastUpdated: '2025-01-20',
    readTime: '15 min read',
    tags: ['SBIR', 'Research', 'Innovation', 'Technology'],
    difficulty: 'Advanced',
    featured: true,
    metrics: [
      { label: 'Funding', value: '$50K - $1.7M', description: 'Phase I & II Combined', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Success Rate', value: '15-50%', description: 'Per Phase', color: 'text-blue-600', iconName: 'TrendingUp' },
      { label: 'Timeline', value: '6-9 Months', description: 'Application to Award', color: 'text-orange-600', iconName: 'Clock' },
      { label: 'Equity', value: '0%', description: 'Non-dilutive', color: 'text-purple-600', iconName: 'PieChart' }
    ],
    expertTip: {
      title: "Don't Miss the SAM.gov Deadline",
      type: 'warning',
      content: "Register on SAM.gov at least 4 weeks before you plan to submit. It's free, but processing times can be slow, and it is the #1 reason startups miss the submission window.",
      shortAnswer: "Don't Miss the SAM.gov Deadline. Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    highlights: [
      'SBIR Phase I & II process',
      'Technical proposal writing',
      'Commercialization planning'
    ],
    shortAnswer: "How to Apply for SBIR Research Grants — Complete guide to applying for Small Business Innovation Research (SBIR) Phase I & II grants.",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Our SBIR specialists help tech startups secure non-dilutive R&D funding with proven proposal strategies.",
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
      content: "SBIR is for solo companies. <strong>STTR requires a partnership</strong> with a university or research institution. Don't apply to STTR unless you already have that MOU signed.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "How to Apply for SBIR/STTR Grants — Step-by-step application guide for Small Business Innovation Research and Technology Transfer programs.",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Our SBIR specialists help tech startups secure non-dilutive R&D funding with proven proposal strategies.",
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
      content: "The federal government does NOT give grants for 'starting a business' or 'paying off debt.' Federal grants fund <strong>specific projects</strong> (R&D, community programs, education). Check eligibility carefully.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "Search Grants.gov for 1000+ active federal grant opportunities ($50K-$500K typical). Federal grants fund specific projects, not general business expenses. Approval takes 3-12 months with a 10-30% success rate.",
    jumpLinks: [
      { title: 'Find Grants', id: 'find-grants' },
      { title: 'Eligibility', id: 'eligibility' },
      { title: 'Application', id: 'application' },
      { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Overwhelmed by Grants.gov? Our team pre-qualifies opportunities for your business type and handles the application process.",
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
      content: "The SBA 8(a) Business Development Program provides <strong>9 years of sole-source federal contracts</strong> and mentorship. It's competitive to get in, but worth the effort for minority entrepreneurs.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "The SBA 8(a) Business Development Program provides 9 years of contracting preferences, mentorship, and technical assistance. MBE certification also unlocks MBDA grants, HUBZone preferences, and state-level minority set-aside contracts worth billions annually.",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Need expert help with your grant application? Our funding specialists guide you through every step.",
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
      content: "This is for <strong>organizations supporting startups</strong>, not startups themselves. Accelerators, incubators, and non-profits are the applicants.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "The SBA Growth Accelerator Fund Competition awards $50,000 prizes to accelerators and incubators serving underrepresented entrepreneurs. Winners receive cash plus technical assistance — no equity taken, no matching funds required.",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Not sure which SBA program fits? Our funding specialists match you to the right opportunity.",
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
      content: "Don't just describe <em>what</em> you will do. Explain <em>why it matters</em>. If your project succeeds, who benefits? How does the taxpayer get a return on investment?",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "Federal Grant Application Tips & Best Practices — Expert tips and strategies for writing winning federal grant applications.",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Need expert help with your grant application? Our funding specialists guide you through every step.",
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
      content: "DOE grants have <strong>higher success rates</strong> when you partner with a National Laboratory (like Argonne, NREL, or Sandia). They provide technical expertise and credibility.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "The DOE distributes $30B+ annually for clean energy R&D. ARPA-E funds high-risk breakthrough projects ($500K-$10M), while the Loan Programs Office offers loan guarantees up to $40B for commercial-scale deployment of proven technologies.",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Our clean tech funding specialists help you access the right environmental and energy grant programs.",
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
      content: "California's program has <strong>looser credit requirements</strong> than SBA 7(a) but lower maximum amounts. Try CA first if you have credit challenges.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "The California Small Business Loan Guarantee Program (SBLGP) guarantees up to 80% of loans from $20K to $1.25M. This dramatically reduces lender risk, making it easier for startups and small businesses to get bank financing they'd otherwise be denied.",
    jumpLinks: [
      { title: 'Loans', id: 'loans' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'Application', id: 'application' }, { title: 'FAQ', id: 'faq' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Need expert help with your grant application? Our funding specialists guide you through every step.",
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
      content: "The Strategic Innovation Fund (SIF) is not for early-stage startups. It is designed for massive projects that create hundreds of jobs. If you are requesting less than $10M, look at <strong>IRAP</strong> or <strong>Regional Agencies</strong> instead.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "SIF provides repayable and non-repayable contributions for large-scale projects over $10M. It prioritizes AI, clean tech, and biomanufacturing. Applications require a 3-year business plan and proof of economic benefit — approval takes 6-12 months.",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Need expert help with your grant application? Our funding specialists guide you through every step.",
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
      content: "You cannot apply for IRAP through a portal. You must be 'invited' by an Industrial Technology Advisor (ITA). Your first step is not filling a form, but calling IRAP (1-877-994-4727) to request a consultation.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "IRAP covers up to 80% of technical staff salaries ($150K-$500K typical first project). You cannot apply online — call 1-877-994-4727 and request an ITA consultation. Monthly approval cycles make it one of Canada's fastest innovation grants.",
    jumpLinks: [
      { title: 'Eligibility', id: 'eligibility' },
      { title: 'Process', id: 'process' },
      { title: 'ITA Consult', id: 'ita-consultation' },
      { title: 'Advisory', id: 'advisory-services' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      title: "Get IRAP Ready",
      description: "We prepare your project documentation and connect you with the right ITA for your technology area.",
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
      content: "IRAP doesn't have an online application. You must <strong>call 1-877-994-4727</strong> to request an Industrial Technology Advisor (ITA) consultation. They decide if you're eligible BEFORE you prepare anything.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "IRAP provides non-repayable contributions covering up to 80% of eligible labour costs for R&D projects. You cannot apply online — contact an Industrial Technology Advisor at 1-877-994-4727 to start the process. Approval cycles run monthly.",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Need help with your IRAP application? Our specialists connect you with the right ITA and prepare your proposal.",
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
      content: "You cannot apply online blindly. <strong>You must engage an Industrial Technology Advisor (ITA)</strong> first. They invite you to apply. Cold applications don't exist.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "IRAP's Innovation Assistance Program funds technical projects from $50K to $10M. Your assigned ITA will help scope the project, define milestones, and build your application — their involvement significantly increases approval rates.",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Need help with your IRAP application? Our specialists connect you with the right ITA and prepare your proposal.",
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
      content: "SR&ED is not for 'standard engineering' or 'bug fixing'. To qualify, you must prove you faced a technological uncertainty that standard practice could not resolve. Document your failures—they are your proof!",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "SR&ED gives CCPCs a 35% refundable tax credit on eligible R&D. You must file within 18 months of your fiscal year end. The key requirement is proving 'technological uncertainty' — document your failures, they are your strongest evidence.",
    jumpLinks: [
      { title: 'Eligible Work', id: 'eligible-activities' },
      { title: 'Documentation', id: 'documentation' },
      { title: 'Claim Process', id: 'claim-process' },
      { title: 'Audit Risk', id: 'audit-preparation' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      title: "Protect Your SR&ED Claim",
      description: "Our certified SR&ED consultants prepare audit-proof documentation and maximize your claim value.",
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
      content: "Women Entrepreneurship Strategy isn't one application. It's <strong>15+ coordinated programs</strong> (grants, loans, mentorship). Stack multiple WES programs for maximum benefit.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "WES is a $6B ecosystem of 15+ programs — not a single application. Start with the Women Entrepreneurship Loan Fund (up to $100K), then stack mentorship, export support, and regional grants simultaneously.",
    jumpLinks: [
      { title: 'Overview', id: 'wes-overview' },
      { title: 'Programs', id: 'funding-programs' },
      { title: 'How to Apply', id: 'how-to-apply' },
      { title: 'Mentorship', id: 'mentorship' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Women-owned business in Canada? Let our WES specialists build your multi-program funding strategy.",
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
    lastUpdated: '2025-09-22',
    metrics: [
      { label: 'Funding', value: '$100K', description: 'Non-repayable Grant', color: 'text-green-600', iconName: 'DollarSign' },
      { label: 'Success Rate', value: '20-30%', description: 'Highly Competitive', color: 'text-blue-600', iconName: 'TrendingUp' },
      { label: 'Timeline', value: '4-6 Months', description: 'Review Period', color: 'text-orange-600', iconName: 'Clock' },
      { label: 'Equity', value: '0%', description: 'Non-dilutive', color: 'text-purple-600', iconName: 'PieChart' }
    ],
    expertTip: {
      title: "Focus on Economic Impact",
      type: 'tip',
      content: "The government prioritizes applications that demonstrate clear **job creation** and economic benefit. Don't just explain how the money helps *you*; explain how it helps the *economy*.",
    shortAnswer: " — key highlights include Funding: $100K and Success Rate: 20-30%. Our guide covers all eligible programs, application steps, and expert tips.",
    },
    content: `
      <h2>Overview of the Women Entrepreneurship Fund</h2>
      <p>The <strong>Women Entrepreneurship Fund (WEF)</strong> is a flagship initiative under Canada’s Women Entrepreneurship Strategy (WES), designed to help women-owned and women-led businesses grow and reach new markets. Unlike loans, this funding is a <strong>non-repayable contribution (grant)</strong>, making it highly competitive and sought after.</p>
      <p>The fund directly supports projects that help women entrepreneurs scale their businesses, expand into international markets, and adopt new technologies. It is administered by Innovation, Science and Economic Development Canada (ISED).</p>

      <h3>Funding Amount and Terms</h3>
      <ul>
        <li><strong>Maximum Grant:</strong> Up to $100,000 per project.</li>
        <li><strong>Cost Sharing:</strong> The grant typically covers up to 90% of eligible costs for non-profits and up to 50-75% for for-profit businesses (depending on the specific intake stream).</li>
        <li><strong>Project Duration:</strong> Projects usually must be completed within 12 months.</li>
      </ul>

      <h2>Eligibility Requirements</h2>
      <p>To qualify for the Women Entrepreneurship Fund, your business must meet the following strict criteria:</p>
      <ul>
        <li><strong>Ownership:</strong> The business must be <strong>majority owned (more than 50%)</strong> and controlled by women.</li>
        <li><strong>Leadership:</strong> The business must be led by women (e.g., CEO, President).</li>
        <li><strong>Status:</strong> Must be a for-profit company or a non-profit organization supporting women entrepreneurs.</li>
        <li><strong>Location:</strong> Must be incorporated and operating in Canada.</li>
        <li><strong>History:</strong> Startups are generally eligible, but established businesses with 2+ years of operation and revenue generation are often prioritized for growth funding.</li>
        <li><strong>Employees:</strong> Typically requires fewer than 500 employees (SME status).</li>
      </ul>

      <h3>Eligible Activities</h3>
      <p>Funding is provided for specific projects, not general operating costs. Eligible activities include:</p>
      <ul>
        <li><strong>Marketing & Strategy:</strong> Developing marketing plans, rebranding, or attending international trade shows.</li>
        <li><strong>Technology Adoption:</strong> upgrading software, implementing CRM systems, or digital transformation.</li>
        <li><strong>Productivity Improvements:</strong> Purchasing equipment or machinery to increase efficiency.</li>
        <li><strong>International Expansion:</strong> Activities related to entering new global markets.</li>
      </ul>

      <h2>Application Process</h2>
      <p>The application process for the WEF is rigorous. Here is a step-by-step guide to applying:</p>
      <ol>
        <li><strong>Check for Open Intakes:</strong> The WEF operates on a "Call for Proposals" basis. Funding is not always open. Monitor the <a href="https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/en/women-entrepreneurship-fund" target="_blank" rel="noopener noreferrer">ISED website</a> regularly.</li>
        <li><strong>Prepare Your Business Plan:</strong> You need a robust business plan that clearly outlines your growth strategy, financial projections, and how the funding will achieve specific outcomes (e.g., X% revenue growth, Y new jobs).</li>
        <li><strong>Secure Matching Funds:</strong> Proof of your portion of the project funding (e.g., bank statements, loan approval) is often required at the time of application.</li>
        <li><strong>Submit via ISED Portal:</strong> Applications are submitted digitally through the ISED online portal. Ensure all documents are uploaded correctly.</li>
      </ol>

      <h2>Evaluation Criteria</h2>
      <p>Applications are assessed based on:</p>
      <ul>
        <li><strong>Innovation:</strong> Does the project introduce a new product, service, or process?</li>
        <li><strong>Market Potential:</strong> Is there a clear demand for the growth plan?</li>
        <li><strong>Team Capacity:</strong> Does the management team have the experience to execute the project?</li>
        <li><strong>Economic Benefit:</strong> Will the project create jobs in Canada?</li>
      </ul>

      <h2>Success Tips</h2>
      <p>Since the program is highly competitive, ensure your application stands out by quantifying your results. Instead of saying "we will grow sales," say "we project a <strong>$250,000 increase in export revenue</strong> within 18 months." Highlight your commitment to diversity and inclusion, as this aligns with the fund's core mission.</p>
    `
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
      content: "You don't apply to the government directly. Apply through <strong>Women's Enterprise Organizations (WEOs)</strong> like WEOC or Coralus. Each has different criteria.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "The Women Entrepreneurship Loan Fund provides loans up to $100K at below-market rates through participating organizations. Unlike traditional bank loans, it requires no collateral for amounts under $50K and includes free business advisory services.",
    jumpLinks: [
      { title: 'Loans', id: 'loans' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'Application', id: 'application' }, { title: 'FAQ', id: 'faq' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Women-owned business? Our funding specialists help you access the right grants, loans, and support programs.",
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
      content: "Futurpreneur isn't just money; it's a mentorship program. Showing that you are <strong>coachable</strong> during the interview is just as important as your business plan.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "Futurpreneur Canada offers $20K in startup loans plus $40K from BDC for entrepreneurs aged 18-39. It includes 2 years of free mentorship. You need a business plan — use their free Business Plan Writer tool at futurpreneur.ca to start.",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Need expert help with your grant application? Our funding specialists guide you through every step.",
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
      content: "BDC's Women Entrepreneurship Program offers <strong>flexible terms and mentorship</strong> not available in traditional banking, plus can be stacked with government grants.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "BDC offers women-only financing from $100K to $5M with flexible repayment terms and reduced rates. Beyond capital, their Growth Driver program provides free strategic advisory and their Women in Tech Venture Fund invests in women-led tech companies.",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Women-owned business? Our funding specialists help you access the right grants, loans, and support programs.",
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
      content: "Smart founders stack grants. Use the <strong>CDAP</strong> grant to pay for a digital strategy, then use a <strong>Digital Youth Internship</strong> grant to hire a student to implement it.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "CDAP provides a $15K grant for a digital adoption plan, unlocking a $100K interest-free BDC loan to implement it. Scale AI funds large supply-chain AI projects. Stack both programs to digitize operations at minimal cost.",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Need expert help with your grant application? Our funding specialists guide you through every step.",
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
      content: "Women exporters can combine <strong>CanExport grants (up to $75K) with EDC financing</strong> for comprehensive international expansion support.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "EDC's Women in Trade program offers export financing, insurance, and bonding specifically for women-led exporters. Their Export Guarantee Program covers up to 90% of export losses, reducing the financial risk of entering international markets.",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Women-owned business? Our funding specialists help you access the right grants, loans, and support programs.",
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
      content: "Alliance grants require a <strong>private sector partner</strong>. Bringing cash/in-kind contributions from industry significantly increases your approval odds.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "NSERC Discovery Grants fund 5-year research programs ($30K-$50K/year) in natural sciences and engineering. Engage Grants ($25K, 6-month) fund industry-academic partnerships. Alliance Grants co-fund larger collaborative R&D projects with private sector partners.",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Need expert help with your grant application? Our funding specialists guide you through every step.",
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
      content: "Each region has its own RDA: <strong>WD (West), PrairiesCan, FedDev Ontario, FedDev Southern Ontario, CED Quebec, ACOA (Atlantic)</strong>. Apply to YOUR regional agency, not all six.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "Canada's 7 Regional Development Agencies (FedDev Ontario, PacifiCan, PrairiesCan, CED Quebec, ACOA, FedNor, CanNor) each offer region-specific grants and zero-interest loans. Contact your local agency first — they have dedicated advisors who help shape applications.",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Need expert help with your grant application? Our funding specialists guide you through every step.",
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
      content: "Many federal programs have <strong>dedicated Indigenous set-asides</strong> with less competition. IAND programs also provide culturally relevant business support unavailable elsewhere.",
      shortAnswer: ". Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.",
    },
    shortAnswer: "The Aboriginal Business and Entrepreneurship Development (ABED) program provides non-repayable contributions up to $99,999. The Indigenous Growth Fund offers loans up to $250K. Rural businesses can additionally access CERP and regional agency funding for infrastructure and market access.",
    jumpLinks: [
      { title: 'Overview', id: 'overview' }, { title: 'Eligibility', id: 'eligibility' }, { title: 'How to Apply', id: 'how-to-apply' }, { title: 'Tips', id: 'tips' }
    ],
    eligibleCheck: true,
    inlineCTA: {
      description: "Need expert help with your grant application? Our funding specialists guide you through every step.",
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
      content: "Outside of Toronto? The <strong>Southwestern (SWODF)</strong> and <strong>Eastern (EODF)</strong> Ontario Development Funds are the real heavy hitters for manufacturing and expansion projects over $500k.",
    shortAnswer: " — key highlights include Grant: $2,500 and Training: 100% Free. Our guide covers all eligible programs, application steps, and expert tips.",
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
      content: "In Quebec, <strong>Investissement Québec (IQ)</strong> is the central hub. Unlike other provinces with fragmented agencies, IQ handles loans, equity, and grants under one roof. Start there.",
    shortAnswer: " — key highlights include Loan: $50k+ and Credit: 30%. Our guide covers all eligible programs, application steps, and expert tips.",
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
      content: "If you are a tech company, <strong>Innovate BC</strong> is your primary target. Their 'Hiring Grant' is one of the easiest ways to get $10,000 funded for a student or co-op hire.",
    shortAnswer: " — key highlights include Grant: $10,000 and Tax Credit: 30%. Our guide covers all eligible programs, application steps, and expert tips.",
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
      content: "For most Alberta tech startups, the <strong>Alberta Innovates Voucher Program</strong> is the entry point. It pays service providers directly to help you build or market your product.",
    shortAnswer: " — key highlights include Voucher: $15k - $100k and Clean Tech: $5M+. Our guide covers all eligible programs, application steps, and expert tips.",
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
      content: "AgriInnovate is often misunderstood. It is for <strong>commercializing new agricultural technology</strong>. If you are a tech company building sensors for farms, YOU are eligible, not just the farmer.",
    shortAnswer: " — key highlights include Funding: $5 Million and Type: Repayable. Our guide covers all eligible programs, application steps, and expert tips.",
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
      content: "SDTC requires <strong>quantifiable environmental benefits</strong> (GHG reduction, water savings, etc.). Vague sustainability claims won't meet the criteria.",
    shortAnswer: " — key highlights include SDTC: $10M and Focus: CleanTech. Our guide covers all eligible programs, application steps, and expert tips.",
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
      { label: 'Funding', value: '$2.4B', description: 'AI Strategy', color: 'text-blue-600', iconName: 'Cpu' },
      { label: 'Adoption', value: '$15K', description: 'CDAP Grant', color: 'text-green-600', iconName: 'Laptop' },
      { label: 'Scale', value: '$20M', description: 'Scale AI', color: 'text-purple-600', iconName: 'TrendingUp' },
      { label: 'Talent', value: '50%', description: 'Wage Sub', color: 'text-indigo-600', iconName: 'Users' }
    ],
    expertTip: {
      title: "Start with CDAP",
      type: 'tip',
      content: "For most SMEs, the <strong>Canada Digital Adoption Program (CDAP)</strong> is the best entry point. It provides immediate funds for planning and zero-interest loans for implementation.",
    shortAnswer: " — key highlights include Funding: $2.4B and Adoption: $15K. Our guide covers all eligible programs, application steps, and expert tips.",
    }
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
      content: "Life sciences funding requires <strong>clear regulatory pathway</strong> (FDA/Health Canada). Demonstrate you understand approval process before applying.",
    shortAnswer: " — key highlights include Focus: BioTech and Funding: $1M+. Our guide covers all eligible programs, application steps, and expert tips.",
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
      content: "Aerospace/defence funding often requires <strong>2-3 years from application to contract</strong>. Have runway capital while pursuing these opportunities.",
    shortAnswer: " — key highlights include Sector: Aerospace and Max: $10M+. Our guide covers all eligible programs, application steps, and expert tips.",
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
      content: "Manufacturing grants vary widely by province. <strong>Ontario (SWODF/EODF) and Quebec (IQ) offer largest amounts</strong> for equipment and expansion.",
    shortAnswer: " — key highlights include Sector: Mfg and Focus: Auto/Tech. Our guide covers all eligible programs, application steps, and expert tips.",
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
      content: "Agriculture funding comes from <strong>federal + provincial + regional agencies</strong>. Check all three levels simultaneously for maximum coverage.",
    shortAnswer: " — key highlights include Focus: Agri-Food and Range: $10K-5M. Our guide covers all eligible programs, application steps, and expert tips.",
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
      content: "Banks still lend to YOU. The CSBFP guarantee protects <strong>the bank</strong>, not you. If you default, you still owe. But it makes getting approved easier for startups without assets.",
    shortAnswer: " — key highlights include Max Loan: $1M and Equipment: $350K. Our guide covers all eligible programs, application steps, and expert tips.",
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
      content: "<strong>All Canadian banks participate in CSBFP</strong>, but approval rates vary. If one bank rejects you, try another. The program is the same, but credit policies differ.",
    shortAnswer: " — key highlights include Max: $1M and Fee: 2%. Our guide covers all eligible programs, application steps, and expert tips.",
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
