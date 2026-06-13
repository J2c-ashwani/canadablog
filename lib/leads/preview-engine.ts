export interface PreviewLeadData {
  email?: string;
  name?: string;
  industry?: string;
  country?: string;
  region?: string;
  companySize?: string;
  companyName?: string;
  businessStage?: string;
  businessDescription?: string;
  fundingAmount?: string;
  readinessScore?: number;
}

export type PreviewConfidenceLevel = 0 | 1 | 2 | 3;

export interface PreviewOpportunity {
  index: number;
  programName: string;
  estimatedBenefit?: string;
  likelihood?: string;
  reason: string;
  requiredActions: string[];
}

/**
 * Classifies a lead into a preview confidence level:
 * - Level 0: Junk/Test lead
 * - Level 1: Unknown lead (general inquiry, missing basic data)
 * - Level 2: Partially qualified lead (industry or description known)
 * - Level 3: Highly qualified lead (industry, country, description, size known)
 */
export function getPreviewConfidenceLevel(lead: PreviewLeadData): PreviewConfidenceLevel {
  const email = (lead.email || '').trim().toLowerCase();
  const name = (lead.name || '').trim().toLowerCase();
  const desc = (lead.businessDescription || '').trim().toLowerCase();
  const industry = (lead.industry || '').trim().toLowerCase();
  const country = (lead.country || '').trim().toLowerCase();

  // 1. Level 0 - Junk / Test / Low-quality lead
  const testKeywords = ['test', 'asdf', 'hello', '123', 'junk', 'dummy', 'qwer'];
  const isTestKeyword = testKeywords.some(kw => 
    email.includes(kw) || 
    name.includes(kw) || 
    desc.includes(kw)
  );
  if (isTestKeyword || (desc !== '' && desc.length <= 3)) {
    return 0;
  }

  // Helper to check if a value is valid/non-empty
  const isValidVal = (val: string) => {
    const v = val.toLowerCase();
    return v && v !== 'other' && v !== 'n/a' && v !== 'none' && v !== 'not sure';
  };

  const hasIndustry = isValidVal(industry);
  const hasDescription = isValidVal(desc) && desc.length > 5;
  const hasCountry = isValidVal(country) || country === 'canada' || country === 'usa' || country === 'us';

  // 2. Level 3 - Highly Qualified
  // Known: industry, country, businessDescription, and (companySize or revenue/fundingAmount)
  const size = (lead.companySize || '').trim();
  const funding = (lead.fundingAmount || '').trim();
  const hasSizeOrFunding = isValidVal(size) || isValidVal(funding);
  
  if (hasIndustry && hasCountry && hasDescription && hasSizeOrFunding) {
    return 3;
  }

  // 3. Level 2 - Partially Qualified
  // Known: industry OR businessDescription (Country is optional)
  if (hasIndustry || hasDescription) {
    return 2;
  }

  // 4. Level 1 - Unknown Lead (fallback)
  return 1;
}

/**
 * Returns dynamic opportunity matches for the report preview based on the lead profile and confidence level.
 */
export function getPreviewOpportunities(lead: PreviewLeadData, level: PreviewConfidenceLevel): PreviewOpportunity[] {
  if (level === 0 || level === 1) {
    return [];
  }

  const industry = (lead.industry || '').trim().toLowerCase();
  const desc = (lead.businessDescription || '').trim().toLowerCase();
  const size = (lead.companySize || '').trim();
  const country = (lead.country || '').trim().toLowerCase();

  // Helper to determine benefit ranges based on size
  const getBenefitRange = (primary: boolean) => {
    if (size.includes('10-49') || size.includes('10')) {
      return primary ? '$50,000 - $150,000' : '$25,000 - $75,000';
    }
    if (size.includes('50-99') || size.includes('50')) {
      return primary ? '$150,000 - $350,000' : '$75,000 - $150,000';
    }
    if (size.includes('100-499') || size.includes('100')) {
      return primary ? '$350,000 - $750,000' : '$150,000 - $300,000';
    }
    if (size.includes('500+')) {
      return primary ? '$750,000 - $1,500,000' : '$300,000 - $600,000';
    }
    // Default size is 1-9
    return primary ? '$25,000 - $75,000' : '$10,000 - $50,000';
  };

  // Determine sector mapping
  const isSoftware = industry.includes('software') || industry.includes('saas') || industry.includes('tech') || industry.includes('it') || industry.includes('developer');
  const isManufacturing = industry.includes('manufact') || industry.includes('product') || industry.includes('hardw');
  const isAgriculture = industry.includes('agri') || industry.includes('farm') || industry.includes('food');
  const isHospitality = industry.includes('hospital') || industry.includes('tour') || industry.includes('restaurant');
  const isRetail = industry.includes('retail') || industry.includes('e-com') || industry.includes('sales');
  const isHealthcare = industry.includes('health') || industry.includes('bio') || industry.includes('medic');

  // R&D keywords for software sector
  const rdKeywords = ['software development', 'platform development', 'r&d', 'product innovation', 'ai', 'machine learning', 'technical experimentation', 'experiment', 'prototype', 'algorithm', 'artificial intelligence', 'coding', 'development'];
  const hasRdKeywords = rdKeywords.some(kw => desc.includes(kw));

  const isCanada = country.includes('canada') || country.includes('ca');

  let opp1Name = '';
  let opp1Reason = '';
  let opp1Actions: string[] = [];

  let opp2Name = '';
  let opp2Reason = '';
  let opp2Actions: string[] = [];

  if (isSoftware) {
    if (level === 3 && hasRdKeywords) {
      opp1Name = isCanada ? 'SR&ED Tax Credit (R&D Incentive)' : 'R&D Tax Credit (IRC Section 41)';
      opp1Reason = 'You reported software development activities involving product enhancement and technical innovation.';
      opp1Actions = [
        'Compile technical project summary documentation',
        'Reconcile eligible payroll and subcontractor expenses',
        'Prepare and file R&D tax schedule with tax returns'
      ];
    } else {
      opp1Name = 'Innovation Funding Programs';
      opp1Reason = 'You indicated that your business operates in the software or technology sector.';
      opp1Actions = [
        'Audit project technical roadmaps and milestones',
        'Confirm alignment with federal and provincial innovation guidelines',
        'Prepare pre-intake eligibility criteria checklist'
      ];
    }

    opp2Name = 'Regional Technology Grant';
    opp2Reason = 'Your business profile indicates technology commercialization activities.';
    opp2Actions = [
      'Identify active technology commercialization funding rounds',
      'Verify regional applicant residency requirements',
      'Map budget items to eligible grant expense categories'
    ];
  } else if (isManufacturing) {
    opp1Name = 'Equipment Modernization Grants';
    opp1Reason = 'You indicated that your business operates in the manufacturing or production sector.';
    opp1Actions = [
      'Document planned capital equipment purchases',
      'Audit manufacturing throughput and energy efficiency gains',
      'Submit pre-authorization grant application before purchase'
    ];

    opp2Name = 'Productivity & Automation Subsidies';
    opp2Reason = 'Equipment upgrades and process automation often qualify for regional capital grants.';
    opp2Actions = [
      'Map automation software and hardware expenses',
      'Draft workflow optimization plan for review',
      'Verify local labor impact guidelines'
    ];
  } else if (isAgriculture) {
    opp1Name = 'Agri-Innovation Funding';
    opp1Reason = 'You indicated that your business operates in the agriculture or agri-food sector.';
    opp1Actions = [
      'Audit sustainable farming and tech adaptation plans',
      'Prepare project scope highlighting yield improvement metrics',
      'Verify agricultural entity registration and certification'
    ];

    opp2Name = 'Farm Modernization Programs';
    opp2Reason = 'Agricultural businesses often qualify for sustainability, technology integration, and efficiency grants.';
    opp2Actions = [
      'Detail irrigation, machinery, or greenhouse upgrades',
      'Draft environmental impact statement matching program goals',
      'Submit capital expenditure quotes for pre-qualification'
    ];
  } else if (isHospitality) {
    opp1Name = 'Tourism & Regional Growth Grants';
    opp1Reason = 'You indicated that your business operates in the hospitality or tourism sector.';
    opp1Actions = [
      'Document facility enhancement or local marketing projects',
      'Estimate local visitor traffic and economic impact metrics',
      'Verify hospitality licensing and business tenure'
    ];

    opp2Name = 'Workforce Training Programs';
    opp2Reason = 'Service sector businesses frequently qualify for hiring and workforce development incentives.';
    opp2Actions = [
      'Detail employee onboarding and skill development programs',
      'Map employee training hours to eligible training vouchers',
      'Prepare wage subsidy application forms for new hires'
    ];
  } else if (isRetail) {
    opp1Name = 'Hiring & Wage Incentives';
    opp1Reason = 'You indicated that your business operates in the retail or consumer sales sector.';
    opp1Actions = [
      'Identify upcoming staff hiring and student placements',
      'Prepare employee payroll projections matching grant caps',
      'Submit wage subsidy pre-screening forms before hiring'
    ];

    opp2Name = 'Digital Adoption Programs';
    opp2Reason = 'Retailers are eligible for support to adopt e-commerce and digital operations platforms.';
    opp2Actions = [
      'Verify e-commerce or ERP software upgrade specifications',
      'Map consultant fees to digital advisor grants',
      'Assemble hardware/software invoices for digital adoption rebates'
    ];
  } else if (isHealthcare) {
    opp1Name = 'Healthcare Innovation Programs';
    opp1Reason = 'You indicated that your business operates in the healthcare or medical sector.';
    opp1Actions = [
      'Document clinical trial phases or device innovation features',
      'Confirm research compliance credentials and licensing',
      'Submit pre-market research project briefs'
    ];

    opp2Name = 'Workforce Development Subsidies';
    opp2Reason = 'Clinical and healthcare support roles are highly targeted for workforce training grants.';
    opp2Actions = [
      'Detail upcoming healthcare staff upskilling courses',
      'Prepare training budget allocations for reimbursement',
      'Align employee certifications with regional training requirements'
    ];
  } else {
    // General / Service / Construction / Other
    opp1Name = 'Regional Growth Grants';
    opp1Reason = 'Your business may qualify for local economic development and expansion programs.';
    opp1Actions = [
      'Detail regional business footprint and expansion goals',
      'Calculate job creation numbers for local community impact',
      'Verify commercial lease and operation tenure'
    ];

    opp2Name = 'Hiring & Training Subsidies';
    opp2Reason = 'Most small businesses qualify for wage subsidies when hiring new employees or interns.';
    opp2Actions = [
      'Identify new hire positions planned for the next 6 months',
      'Cross-reference candidate profiles against youth/student hiring credits',
      'Submit intake paperwork to local employment service providers'
    ];
  }

  const opportunities: PreviewOpportunity[] = [];

  if (level === 2) {
    opportunities.push({
      index: 1,
      programName: opp1Name,
      reason: opp1Reason,
      requiredActions: ['Full eligibility review required']
    });
    opportunities.push({
      index: 2,
      programName: opp2Name === 'Regional Technology Grant' ? 'Technology Commercialization Programs' : opp2Name,
      reason: opp2Reason,
      requiredActions: ['Full eligibility review required']
    });
  } else if (level === 3) {
    opportunities.push({
      index: 1,
      programName: opp1Name,
      estimatedBenefit: getBenefitRange(true),
      likelihood: 'Potential Strong Match',
      reason: opp1Reason,
      requiredActions: opp1Actions
    });
    opportunities.push({
      index: 2,
      programName: opp2Name,
      estimatedBenefit: getBenefitRange(false),
      likelihood: 'Potential Match',
      reason: opp2Reason,
      requiredActions: opp2Actions
    });
  }

  return opportunities;
}
