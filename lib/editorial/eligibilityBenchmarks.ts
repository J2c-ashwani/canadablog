export interface ProgramBenchmark {
  programName: string;
  avgRevenue: string;
  avgEmployees: string;
  avgFunding: string;
  stage: string;
  qualifiers: string[];
  struggles: string[];
  screenerFocus: string;
  complianceNote: string;
}

export const PROGRAM_BENCHMARKS: Record<string, ProgramBenchmark> = {
  'tech-startup': {
    programName: 'Technology & R&D Funding (IRAP/SR&ED)',
    avgRevenue: '$100k – $15M',
    avgEmployees: '3 – 50 FTEs',
    avgFunding: '$50,000 – $750,000',
    stage: 'Growth & R&D Development',
    qualifiers: [
      'Active internal software, hardware, or biotech engineering team',
      'Solving novel technical uncertainties (not simple API integrations)',
      'Clear commercialization & market growth roadmap'
    ],
    struggles: [
      'Pure service/consulting business models',
      'Contract R&D performed for other clients',
      'No proprietary intellectual property'
    ],
    screenerFocus: 'tech-startup',
    complianceNote: 'Applications are evaluated against detailed technical and commercial criteria. Many applicants discover eligibility issues only after beginning the application process.'
  },
  'manufacturing': {
    programName: 'Industrial & Advanced Manufacturing Grants',
    avgRevenue: '$500k – $30M',
    avgEmployees: '10 – 150+ workers',
    avgFunding: '$100,000 – $2.5M',
    stage: 'Scale-Up & Production',
    qualifiers: [
      'Capital expenditure for plant modernization or automation',
      'Domestic scaling of physically manufactured goods',
      'Creating local jobs or training specialized operators'
    ],
    struggles: [
      'Pure import/export or distribution operations',
      'No physical production facility owned/leased',
      'Lack of matching co-investment capital'
    ],
    screenerFocus: 'general',
    complianceNote: 'Industrial programs prioritize domestic labor creation and automation metrics. Submitting a clear equipment-stack plan is critical to success.'
  },
  'agriculture': {
    programName: 'Agri-Food & Sustainable Agriculture Funding',
    avgRevenue: '$250k – $10M',
    avgEmployees: '2 – 30+ farm operators',
    avgFunding: '$30,000 – $350,000',
    stage: 'Production & Modernization',
    qualifiers: [
      'Incorporated farm, processor, or agtech developer',
      'Projects implementing clean energy or carbon reduction tech',
      'Increasing domestic food production capacity'
    ],
    struggles: [
      'Hobby farms or primary non-incorporated operators',
      'Projects without environmental efficiency metrics',
      'Insufficient documentation on farm revenue history'
    ],
    screenerFocus: 'agriculture',
    complianceNote: 'Agricultural grants frequently require comprehensive financial audits and concrete environmental efficiency projections before approval.'
  },
  'healthcare': {
    programName: 'Health, Life Sciences, & MedTech Grants',
    avgRevenue: '$150k – $12M',
    avgEmployees: '2 – 40+ researchers',
    avgFunding: '$150,000 – $1.8M',
    stage: 'Clinical Trials & R&D',
    qualifiers: [
      'Medical device, digital health, or drug discovery projects',
      'Academic partnerships or patent-pending technologies',
      'Investigator-initiated clinical trial plans'
    ],
    struggles: [
      'Generic wellness apps or fitness coaching platforms',
      'No regulatory compliance pathway (FDA/Health Canada)',
      'Lack of clinical validation advisory board'
    ],
    screenerFocus: 'general',
    complianceNote: 'Life science funding (NIH/CIHR) requires strong clinical proof-of-concept and a clear regulatory pathway to survive panel reviews.'
  },
  'cleantech': {
    programName: 'Clean Technology & Decarbonization Grants',
    avgRevenue: '$300k – $25M',
    avgEmployees: '5 – 80+ engineers',
    avgFunding: '$100,000 – $3.0M',
    stage: 'Commercialization & Pilot Testing',
    qualifiers: [
      'Measurable greenhouse gas (GHG) reduction indicators',
      'Prototype validated in laboratory environment (TRL 4+)',
      'Demonstrated municipal or industrial partner interest'
    ],
    struggles: [
      'Early-stage concept without lab validation data',
      'No quantifiable environmental impact calculations',
      'Inability to provide 50% cash co-matching requirements'
    ],
    screenerFocus: 'tech-startup',
    complianceNote: 'Clean-tech projects must demonstrate a high Technology Readiness Level (TRL) to satisfy rigorous public vetting processes.'
  },
  'women-entrepreneur': {
    programName: 'Women Entrepreneurship Strategy (WES) Funding',
    avgRevenue: '$50k – $5M',
    avgEmployees: '1 – 20+ workers',
    avgFunding: '$10,000 – $250,000',
    stage: 'Early Stage to Scaling',
    qualifiers: [
      'Minimum 51% owned and led by women entrepreneurs',
      'Clear export development or regional scaling strategy',
      'Viable business model with active customer traction'
    ],
    struggles: [
      'Multi-level marketing (MLM) or franchisee businesses',
      'Male-majority shareholders holding control blocks',
      'No defined plan for capital deployment or job creation'
    ],
    screenerFocus: 'women',
    complianceNote: 'Diversity initiatives evaluate operational growth metrics and export readiness to ensure funds are deployed into high-impact enterprises.'
  },
  'general': {
    programName: 'General Business Scaling Grants & Loans',
    avgRevenue: '$150k – $5M',
    avgEmployees: '2 – 30+ FTEs',
    avgFunding: '$20,000 – $250,000',
    stage: 'Establishment & Growth',
    qualifiers: [
      'Minimum 2 years of active incorporation & tax filings',
      'Active local employment and payroll registrations',
      'Clear business expansion or capital purchase plan'
    ],
    struggles: [
      'Solopreneurs or newly registered hobby businesses',
      'Unincorporated entities (sole proprietorships)',
      'Weak credit score or unresolved business debt'
    ],
    screenerFocus: 'general',
    complianceNote: 'Standard scaling programs check local payroll history and general corporate credit stability to qualify candidates for public funding.'
  }
};

export function resolveBenchmarkBySlug(slug: string, category?: string): ProgramBenchmark {
  const normalized = slug.toLowerCase();
  
  if (normalized.includes('sred') || normalized.includes('irap') || normalized.includes('software') || normalized.includes('saas') || normalized.includes('tech') || normalized.includes('ai-machine')) {
    return PROGRAM_BENCHMARKS['tech-startup'];
  }
  if (normalized.includes('manufacturing') || normalized.includes('industrial') || normalized.includes('factory')) {
    return PROGRAM_BENCHMARKS['manufacturing'];
  }
  if (normalized.includes('agri') || normalized.includes('farm') || normalized.includes('food')) {
    return PROGRAM_BENCHMARKS['agriculture'];
  }
  if (normalized.includes('health') || normalized.includes('medical') || normalized.includes('biotech') || normalized.includes('medtech') || normalized.includes('nih-sbir')) {
    return PROGRAM_BENCHMARKS['healthcare'];
  }
  if (normalized.includes('clean') || normalized.includes('energy') || normalized.includes('carbon') || normalized.includes('doe-sbir')) {
    return PROGRAM_BENCHMARKS['cleantech'];
  }
  if (normalized.includes('women') || normalized.includes('female') || normalized.includes('diversity')) {
    return PROGRAM_BENCHMARKS['women-entrepreneur'];
  }

  const cat = (category || '').toLowerCase();
  if (cat.includes('tech') || cat.includes('software')) return PROGRAM_BENCHMARKS['tech-startup'];
  if (cat.includes('manufacturing')) return PROGRAM_BENCHMARKS['manufacturing'];
  
  return PROGRAM_BENCHMARKS['general'];
}
