// lib/data/rdeConfigs.ts

export interface RDEQuestionOption {
  value: string;
  label: string;
}

export interface RDEQuestion {
  id: string;
  text: string;
  type: 'select' | 'yesno' | 'text';
  options?: RDEQuestionOption[];
  placeholder?: string;
}

export interface RDEEvaluationResult {
  matchedPrograms: string[];
  eligibilityEstimate: string;
  probability: 'High' | 'Medium' | 'Low';
  escalate: boolean;
  productName: string;
  productPrice: number;
  productPath: string;
}

export interface RDEConfig {
  id: string;
  title: string;
  description: string;
  questions: RDEQuestion[];
  evaluate: (answers: Record<string, string>) => RDEEvaluationResult;
}

// Standard questions shared across components
const PROVINCE_OPTIONS: RDEQuestionOption[] = [
  { value: 'on', label: 'Ontario' },
  { value: 'qc', label: 'Quebec' },
  { value: 'bc', label: 'British Columbia' },
  { value: 'ab', label: 'Alberta' },
  { value: 'sk', label: 'Saskatchewan' },
  { value: 'mb', label: 'Manitoba' },
  { value: 'atl', label: 'Atlantic Canada (NS/NB/PE/NL)' },
  { value: 'other', label: 'Other / Non-Canadian' }
];

const REVENUE_OPTIONS: RDEQuestionOption[] = [
  { value: 'under_100k', label: 'Under $100K' },
  { value: '100k_500k', label: '$100K - $500K' },
  { value: '500k_1m', label: '$500K - $1M' },
  { value: '1m_3m', label: '$1M - $3M' },
  { value: 'above_3m', label: 'Above $3M' }
];

const EMPLOYEE_OPTIONS: RDEQuestionOption[] = [
  { value: '1_4', label: '1 - 4 employees' },
  { value: '5_25', label: '5 - 25 employees' },
  { value: '26_99', label: '26 - 99 employees' },
  { value: '100_plus', label: '100+ employees' }
];

const GOAL_OPTIONS: RDEQuestionOption[] = [
  { value: 'rd', label: 'Research & Development' },
  { value: 'hiring', label: 'Hiring & Workforce Upskilling' },
  { value: 'export', label: 'Exporting to New Markets' },
  { value: 'digital', label: 'Software / Digital Transformation' }
];

// Helper to determine if lead qualifies for Enterprise Escalation
function checkEscalation(answers: Record<string, string>, estFundingNumeric: number): boolean {
  const isHighRevenue = answers.revenue === 'above_3m';
  const isHighEmployees = answers.employees === '26_99' || answers.employees === '100_plus';
  const isHighFunding = estFundingNumeric >= 500000;
  return isHighRevenue || isHighEmployees || isHighFunding;
}

export const RDE_CONFIGS: Record<string, RDEConfig> = {
  'sred-tax-credits-2026': {
    id: 'sred-tax-credits-2026',
    title: 'SR&ED Tax Credit Estimator',
    description: 'Calculate your estimated scientific research refund and identify potential program stacking options.',
    questions: [
      { id: 'province', text: 'Select your province of incorporation:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Select your annual revenue range:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Select your company employee count:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'payroll', text: 'Estimated annual R&D T4 payroll spend:', type: 'select', options: [
        { value: 'under_50k', label: 'Under $50,000' },
        { value: '50k_150k', label: '$50,000 - $150,000' },
        { value: '150k_500k', label: '$150,000 - $500,000' },
        { value: 'above_500k', label: 'Above $50,000' }
      ]},
      { id: 'uncertainty', text: 'Is your project attempting to resolve a technical uncertainty?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isEligible = answers.uncertainty === 'yes' && answers.payroll !== 'under_50k';
      const matchedPrograms = isEligible 
        ? ['SR&ED Refund (35% CCPC Enhanced Rate)', 'IRAP Salary Subsidy', 'Co-op Tax Credits']
        : ['Basic R&D Tax Credits (15%)', 'Regional R&D Assistance'];

      let estAmount = '$0';
      let estNumeric = 0;
      if (isEligible) {
        if (answers.payroll === '50k_150k') { estAmount = '$57,000 - $114,000'; estNumeric = 85500; }
        else if (answers.payroll === '150k_500k') { estAmount = '$171,000 - $342,000'; estNumeric = 256500; }
        else if (answers.payroll === 'above_500k') { estAmount = '$570,000+'; estNumeric = 600000; }
      }

      const probability = isEligible ? 'High' : 'Medium';
      const escalate = checkEscalation(answers, estNumeric);

      return {
        matchedPrograms,
        eligibilityEstimate: estAmount,
        probability,
        escalate,
        productName: 'SR&ED Claim Pre-Audit Report',
        productPrice: 19,
        productPath: '/products/sred-claim-report'
      };
    }
  },

  'canada-regional-development-2026': {
    id: 'canada-regional-development-2026',
    title: 'Regional Development Agency (RDA) Stacker',
    description: 'Find matching regional scale-up programs (FedDev, PacifiCan, PrairiesCan) based on your corporate location.',
    questions: [
      { id: 'province', text: 'Select your province of operations:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Select your annual revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Number of full-time employees:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'goal', text: 'Primary expansion goal:', type: 'select', options: GOAL_OPTIONS }
    ],
    evaluate: (answers) => {
      const prov = answers.province;
      let agency = 'Regional Development agency';
      let match = 'FedDev Ontario Scale-up';
      if (prov === 'bc') { agency = 'PacifiCan'; match = 'PacifiCan Business Scale-up'; }
      else if (prov === 'ab' || prov === 'sk' || prov === 'mb') { agency = 'PrairiesCan'; match = 'PrairiesCan Business Scale-up'; }
      else if (prov === 'qc') { agency = 'CED (Quebec)'; match = 'CED Regional Economic Growth'; }
      else if (prov === 'atl') { agency = 'ACOA (Atlantic)'; match = 'ACOA Business Development'; }

      const matchedPrograms = [match, 'BDC Scale-up financing', 'Jobs and Growth Fund'];
      const isHighRevenue = answers.revenue === '1m_3m' || answers.revenue === 'above_3m';
      const isHighEmployees = answers.employees !== '1_4';
      const probability = (isHighRevenue && isHighEmployees) ? 'High' : 'Medium';

      const estNumeric = isHighRevenue ? 250000 : 50000;
      const escalate = checkEscalation(answers, estNumeric);

      return {
        matchedPrograms,
        eligibilityEstimate: isHighRevenue ? '$100,000 - $500,000 (0% Interest Loan)' : '$25,000 - $100,000',
        probability,
        escalate,
        productName: 'Regional Development Strategy',
        productPrice: 19,
        productPath: '/products/regional-dev-strategy'
      };
    }
  },

  'q4-2026-deadlines': {
    id: 'q4-2026-deadlines',
    title: 'Q4 Deadline Match Finder',
    description: 'Assess upcoming fall/winter intake deadlines and map out your Q4 application pipeline.',
    questions: [
      { id: 'province', text: 'Province of operation:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Company revenue range:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Employees count:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'goal', text: 'What is your primary project type?', type: 'select', options: GOAL_OPTIONS }
    ],
    evaluate: (answers) => {
      const isTech = answers.goal === 'rd';
      const matchedPrograms = isTech 
        ? ['IRAP Fall Cycle', 'SR&ED Q4 Filing Window', 'Innovative Solutions Canada Intakes']
        : ['CanExport SME Q4 Intake', 'Provincial Training Grant Deadlines'];

      const probability = 'High';
      const estNumeric = answers.revenue === 'above_3m' ? 150000 : 25000;
      const escalate = checkEscalation(answers, estNumeric);

      return {
        matchedPrograms,
        eligibilityEstimate: answers.revenue === 'above_3m' ? '$75,000 - $250,000' : '$10,000 - $50,000',
        probability,
        escalate,
        productName: '2026 Application Calendar',
        productPrice: 19,
        productPath: '/products/application-calendar'
      };
    }
  },

  'canada-agriculture-agrifood-grants-guide': {
    id: 'canada-agriculture-agrifood-grants-guide',
    title: 'AgriInnovate Qualification Screener',
    description: 'Determine eligibility for sustainable CAP farm programs, clean technology, and commercial food scaling.',
    questions: [
      { id: 'province', text: 'Select your province:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Annual revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Number of employees:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'sustainable', text: 'Is your project related to sustainable farming or commercial clean tech?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isAgriEligible = answers.sustainable === 'yes';
      const matchedPrograms = isAgriEligible
        ? ['AgriInnovate Program (repayable funding)', 'Agricultural Clean Technology (ACT) Program', 'Sustainable CAP Cost-Share']
        : ['AgriAssurance Program', 'Regional Local Food Initiatives'];

      const probability = isAgriEligible ? 'High' : 'Medium';
      const estNumeric = answers.revenue === 'above_3m' ? 750000 : 75000;
      const escalate = checkEscalation(answers, estNumeric);

      return {
        matchedPrograms,
        eligibilityEstimate: isAgriEligible && answers.revenue === 'above_3m' ? '$150,000 - $1,500,000+' : '$20,000 - $75,000',
        probability,
        escalate,
        productName: 'Agriculture Funding Toolkit',
        productPrice: 49,
        productPath: '/products/agriculture-toolkit'
      };
    }
  },

  'canexport-grants-2026': {
    id: 'canexport-grants-2026',
    title: 'CanExport Criteria Validator',
    description: 'Verify your company eligibility for CanExport SME grants covering up to 50% of international expansion costs.',
    questions: [
      { id: 'province', text: 'Province of incorporation:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Annual corporate revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Employees count:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'has_revenue_100k', text: 'Do you have at least $100K in declared revenue in the last fiscal year?', type: 'yesno' },
      { id: 'export_target', text: 'Do you target a new international market where sales are under $20K or 10%?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const meetRevenue = answers.has_revenue_100k === 'yes';
      const meetTarget = answers.export_target === 'yes';
      const isEligible = meetRevenue && meetTarget;

      const matchedPrograms = isEligible
        ? ['CanExport SME (50% Cost-Share)', 'EDC Export Guarantee Program', 'TCS Trade Commissioner Support']
        : ['EDC Grow Funding', 'Provincial Trade Assistance Grants'];

      const probability = isEligible ? 'High' : meetRevenue ? 'Medium' : 'Low';
      const estNumeric = isEligible ? 50000 : 0;
      const escalate = checkEscalation(answers, estNumeric);

      return {
        matchedPrograms,
        eligibilityEstimate: isEligible ? '$10,000 - $50,000 (Cost-Share Refund)' : '$0',
        probability,
        escalate,
        productName: 'CanExport SME Application Kit',
        productPrice: 29,
        productPath: '/products/canexport-kit'
      };
    }
  },

  'clean-technology-2026': {
    id: 'clean-technology-2026',
    title: 'Clean Tech Stacking Diagnostic',
    description: 'Scan non-dilutive clean technology support parameters under federal net-zero programs.',
    questions: [
      { id: 'province', text: 'Province of operation:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Annual revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Employees count:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'net_zero', text: 'Does your project reduce greenhouse gas emissions or improve energy efficiency?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isEligible = answers.net_zero === 'yes';
      const matchedPrograms = isEligible
        ? ['Clean Growth Program', 'SDTC Tech Fund', 'ACT Agricultural Clean Tech']
        : ['Smart Renewables Program', 'Regional Energy Efficiency Rebates'];

      const probability = isEligible ? 'High' : 'Medium';
      const estNumeric = answers.revenue === 'above_3m' ? 800000 : 100000;
      const escalate = checkEscalation(answers, estNumeric);

      return {
        matchedPrograms,
        eligibilityEstimate: isEligible && answers.revenue === 'above_3m' ? '$250,000 - $2,000,000+' : '$25,000 - $150,000',
        probability,
        escalate,
        productName: 'Clean Tech Strategy Report',
        productPrice: 19,
        productPath: '/products/cleantech-report'
      };
    }
  },

  'digital-transformation-2026': {
    id: 'digital-transformation-2026',
    title: 'Digital Transformation Screener',
    description: 'Gauge eligibility for provincial digital adoption vouchers and interest-free technology loans.',
    questions: [
      { id: 'province', text: 'Province of operation:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Annual revenue range:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Company size:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'cloud_adoption', text: 'Are you adopting advanced software, AI, or cloud ERP systems to automate operations?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isEligible = answers.cloud_adoption === 'yes';
      const matchedPrograms = isEligible
        ? ['CDAP Online Stream', 'BDC Interest-Free Tech Loan (up to $100K)', 'Provincial Vouchers (e.g. IQ ESSOR Stream 1)']
        : ['Digital Main Street Growth Grant', 'BDC Advisory Subsidies'];

      const probability = isEligible ? 'High' : 'Medium';
      const estNumeric = answers.revenue === 'above_3m' ? 100000 : 15000;
      const escalate = checkEscalation(answers, estNumeric);

      return {
        matchedPrograms,
        eligibilityEstimate: isEligible ? '$2,400 + $100,000 Interest-Free Loan' : '$2,400',
        probability,
        escalate,
        productName: 'Digital Transformation Toolkit',
        productPrice: 49,
        productPath: '/products/digital-toolkit'
      };
    }
  },

  'innovation-superclusters-2026': {
    id: 'innovation-superclusters-2026',
    title: 'Supercluster Compatibility Checker',
    description: 'Verify if your collaborative industrial research matches advanced manufacturing, protein, or digital sectors.',
    questions: [
      { id: 'province', text: 'Province of operations:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Annual revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Number of employees:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'collaboration', text: 'Is your project a collaborative R&D initiative in advanced manufacturing, AI, digital tech, protein, or ocean sectors?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isEligible = answers.collaboration === 'yes';
      const matchedPrograms = isEligible
        ? ['NGen Supercluster Co-Investment', 'Digital Technology Supercluster Support', 'Protein Industries Canada Cohorts']
        : ['Strategic Innovation Fund Stream 5', 'NRC IRAP Innovation Projects'];

      const probability = isEligible ? 'High' : 'Medium';
      const estNumeric = answers.revenue === 'above_3m' ? 1500000 : 250000;
      const escalate = checkEscalation(answers, estNumeric);

      return {
        matchedPrograms,
        eligibilityEstimate: isEligible && answers.revenue === 'above_3m' ? '$500,000 - $3,000,000+' : '$50,000 - $250,000',
        probability,
        escalate,
        productName: 'Advanced Industry Funding Report',
        productPrice: 19,
        productPath: '/products/advanced-industry-report'
      };
    }
  },

  'cybersecurity-grants': {
    id: 'cybersecurity-grants',
    title: 'Cybersecurity Readiness Screener',
    description: 'Check criteria for compliance assessments (SOC 2, ISO 27001) and digital supply chain safety grants.',
    questions: [
      { id: 'province', text: 'Select your province:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Annual revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Employees count:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'compliance_needs', text: 'Are you looking to implement compliance (SOC 2, ISO 27001) or improve software safety controls?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isEligible = answers.compliance_needs === 'yes';
      const matchedPrograms = isEligible
        ? ['Cyber Security Readiness Grant', 'CDAP Boost Your Business Technology Vouchers', 'Provincial Cybersecurity Audits']
        : ['CyberSecure Canada Certification Support', 'Digital Main Street Technical Adoptions'];

      const probability = isEligible ? 'High' : 'Medium';
      const estNumeric = answers.revenue === 'above_3m' ? 75000 : 15000;
      const escalate = checkEscalation(answers, estNumeric);

      return {
        matchedPrograms,
        eligibilityEstimate: isEligible ? '$15,000 - $50,000' : '$2,400 - $10,000',
        probability,
        escalate,
        productName: 'Cybersecurity Readiness Guide',
        productPrice: 19,
        productPath: '/products/cybersecurity-guide'
      };
    }
  },

  'manufacturing-grants-2026': {
    id: 'manufacturing-grants-2026',
    title: 'Manufacturing Stacking Diagnostic',
    description: 'Estimate matching capital costs and equipment write-off assistance for scaling production facilities.',
    questions: [
      { id: 'province', text: 'Province of operation:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Annual revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Employees count:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'capital_spend', text: 'Do you plan to invest at least $100K in advanced equipment or capital assets in 2026?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isEligible = answers.capital_spend === 'yes';
      const matchedPrograms = isEligible
        ? ['Ontario Regional Development Program (RDP)', 'Investissement Québec ESSOR Stream 2', 'NGen Manufacturing Project Funding']
        : ['Capital Cost Allowance Immediate Write-off', 'FedDev Ontario Growth Loans'];

      const probability = isEligible ? 'High' : 'Medium';
      const estNumeric = answers.revenue === 'above_3m' ? 500000 : 50000;
      const escalate = checkEscalation(answers, estNumeric);

      return {
        matchedPrograms,
        eligibilityEstimate: isEligible && answers.revenue === 'above_3m' ? '$100,000 - $1,500,000+' : '$10,000 - $75,000',
        probability,
        escalate,
        productName: 'Manufacturing Funding Toolkit',
        productPrice: 49,
        productPath: '/products/manufacturing-toolkit'
      };
    }
  },

  'minority-business-grants-2026': {
    id: 'minority-business-grants-2026',
    title: 'Diverse Founder Diagnostic Screener',
    description: 'Verify eligibility for diversity, equity, and inclusion-focused non-dilutive economic startup pools.',
    questions: [
      { id: 'province', text: 'Select your province:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Annual revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Company size:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'diverse_founder', text: 'Is the business majority-owned and controlled (51%+) by underrepresented founders (women, minorities, Indigenous, youth)?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isEligible = answers.diverse_founder === 'yes';
      const matchedPrograms = isEligible
        ? ['Black Entrepreneurship Program', 'Indigenous Business Development Fund', 'Futurpreneur Youth Scaling Program']
        : ['Federal Startup Loans', 'Regional Innovation Hub Programs'];

      const probability = isEligible ? 'High' : 'Medium';
      const estNumeric = answers.revenue === 'above_3m' ? 100000 : 25000;
      const escalate = checkEscalation(answers, estNumeric);

      return {
        matchedPrograms,
        eligibilityEstimate: isEligible ? '$10,000 - $50,000 (Low-interest Loans & Grants)' : '$5,000 - $15,000',
        probability,
        escalate,
        productName: 'Diverse Founder Funding Package',
        productPrice: 49,
        productPath: '/products/diverse-founder-package'
      };
    }
  },

  'rural-business-development-2026': {
    id: 'rural-business-development-2026',
    title: 'Rural Expansion Stacking Wizard',
    description: 'Determine regional incentives and cost-share ratios for businesses operating outside major urban centers.',
    questions: [
      { id: 'province', text: 'Province of operation:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Annual revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Company size:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'rural_zone', text: 'Is your physical business location situated in a rural zone or community with population < 50,000?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isEligible = answers.rural_zone === 'yes';
      const matchedPrograms = isEligible
        ? ['Ontario Regional Development Program (Rural Stream)', 'Community Futures Development Funding', 'Northern Ontario Heritage Fund (NOHFC)']
        : ['Community Economic Development Grants', 'Regional RDA Funding Streams'];

      const probability = isEligible ? 'High' : 'Medium';
      const estNumeric = answers.revenue === 'above_3m' ? 250000 : 35000;
      const escalate = checkEscalation(answers, estNumeric);

      return {
        matchedPrograms,
        eligibilityEstimate: isEligible ? '$20,000 - $250,000 (Enhanced Cost-Share)' : '$10,000 - $50,000',
        probability,
        escalate,
        productName: 'Rural Growth Funding Guide',
        productPrice: 19,
        productPath: '/products/rural-growth-guide'
      };
    }
  },

  'women-business-grants-2026': {
    id: 'women-business-grants-2026',
    title: 'Women Funding Diagnostic Tool',
    description: 'Map eligibility for Canada Women Entrepreneurship Strategy (WES) loans and dedicated diverse startup resources.',
    questions: [
      { id: 'province', text: 'Select your province:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Annual revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Company size:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'women_owned', text: 'Is the business majority-owned and controlled (51%+) by one or more women?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isEligible = answers.women_owned === 'yes';
      const matchedPrograms = isEligible
        ? ['WES Loan Fund (up to $50K microloans)', 'BDC Women in Technology Venture Fund', 'Amber Grant for Women (Canada)']
        : ['Women Export Trade Subsidies', 'General Startup Finance Matching'];

      const probability = isEligible ? 'High' : 'Medium';
      const estNumeric = isEligible ? 50000 : 10000;
      const escalate = checkEscalation(answers, estNumeric);

      return {
        matchedPrograms,
        eligibilityEstimate: isEligible ? '$5,000 - $50,000 (Low-interest WES Loans)' : '$2,500 - $10,000',
        probability,
        escalate,
        productName: 'Women Entrepreneur Guide',
        productPrice: 19,
        productPath: '/products/women-guide'
      };
    }
  },

  'october-2026-last-chance': {
    id: 'october-2026-last-chance',
    title: 'October Deadline Match Finder',
    description: 'Identify fast-approaching autumn program cycles and secure autumn R&D application pipelines.',
    questions: [
      { id: 'province', text: 'Province of operation:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Annual revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Employees count:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'goal', text: 'What is your primary project goal?', type: 'select', options: GOAL_OPTIONS }
    ],
    evaluate: (answers) => {
      const isRnd = answers.goal === 'rd';
      const matchedPrograms = isRnd
        ? ['DOE SBIR Release Topics (Oct Deadlines)', 'NSF Phase I October Intake', 'SR&ED Tax Credit Submission Window']
        : ['CanExport SME October Intake', 'Provincial Skills Training Subsidies'];

      const probability = 'High';
      const estNumeric = answers.revenue === 'above_3m' ? 150000 : 25000;
      const escalate = checkEscalation(answers, estNumeric);

      return {
        matchedPrograms,
        eligibilityEstimate: answers.revenue === 'above_3m' ? '$75,000 - $300,000' : '$10,000 - $50,000',
        probability,
        escalate,
        productName: '2026 Application Calendar',
        productPrice: 19,
        productPath: '/products/application-calendar'
      };
    }
  },

  'apply-usa-grants-2026': {
    id: 'apply-usa-grants-2026',
    title: 'USA Federal Grants Screener',
    description: 'Screen eligibility criteria for federal SBIR/STTR agency topics and state tech matching programs.',
    questions: [
      { id: 'state', text: 'Select your state of incorporation:', type: 'select', options: [
        { value: 'ca', label: 'California' },
        { value: 'tx', label: 'Texas' },
        { value: 'ny', label: 'New York' },
        { value: 'co', label: 'Colorado' },
        { value: 'mn', label: 'Minnesota' },
        { value: 'other', label: 'Other US State' }
      ]},
      { id: 'revenue', text: 'Annual corporate revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Company size:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'sbir_rd', text: 'Are you looking for SBIR/STTR research funding or general business expansion grants?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isSbir = answers.sbir_rd === 'yes';
      const matchedPrograms = isSbir
        ? ['NSF SBIR Phase I', 'NIH Parent SBIR Announcement', 'State SBIR Matching Vouchers (up to $50K)']
        : ['SBA Microloan Program', 'State Development Corporation Credits'];

      const probability = isSbir ? 'High' : 'Medium';
      const estNumeric = isSbir ? 275000 : 50000;
      const escalate = checkEscalation(answers, estNumeric);

      return {
        matchedPrograms,
        eligibilityEstimate: isSbir ? '$150,000 - $275,000 (Non-dilutive R&D)' : '$10,000 - $50,000',
        probability,
        escalate,
        productName: 'USA Federal Application Guide',
        productPrice: 19,
        productPath: '/products/usa-grants-guide'
      };
    }
  },
  'nih-sbir-biotech-grants': {
    id: 'nih-sbir-biotech-grants',
    title: 'NIH SBIR Biotech Qualifier',
    description: 'Assess your biomedical research project against NIH Phase I and Phase II commercialization thresholds.',
    questions: [
      { id: 'province', text: 'Select your state/province of operation:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Select your annual revenue range:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Select your company employee count:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'clinical_trials', text: 'Does your research require human clinical trials or FDA clearance tracks?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isClinical = answers.clinical_trials === 'yes';
      const matchedPrograms = [
        'NIH SBIR Phase I Grant',
        isClinical ? 'NIH SBIR Fast-Track (Phase I + II)' : 'NIH STTR Phase I Announcement',
        'Biomedical Commercialization Tax Credit'
      ];
      const probability = 'High';
      const estNumeric = isClinical ? 500000 : 256000;
      const escalate = checkEscalation(answers, estNumeric);
      return {
        matchedPrograms,
        eligibilityEstimate: isClinical ? '$350,000 - $2,000,000+' : '$150,000 - $350,000',
        probability,
        escalate,
        productName: 'NIH Biotech Funding Report',
        productPrice: 19,
        productPath: '/products/funding-match-report'
      };
    }
  },
  'nsf-sbir-grants-technology-startups': {
    id: 'nsf-sbir-grants-technology-startups',
    title: 'NSF Deep-Tech Qualifier',
    description: 'Verify your deep-tech scientific research project against NSF commercialization and innovation standards.',
    questions: [
      { id: 'province', text: 'Select your state/province:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Annual corporate revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Company size:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'innovation', text: 'Is your project building a novel, high-risk technical innovation with no current market solution?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isInnov = answers.innovation === 'yes';
      const matchedPrograms = isInnov
        ? ['NSF SBIR Phase I', 'NSF STTR Phase I', 'Deep-Tech Tax Credit Stacking']
        : ['SBA Innovation Micro-Grant', 'State Technology Development Credit'];
      const probability = isInnov ? 'High' : 'Medium';
      const estNumeric = isInnov ? 275000 : 50000;
      const escalate = checkEscalation(answers, estNumeric);
      return {
        matchedPrograms,
        eligibilityEstimate: isInnov ? '$275,000 - $1,000,000' : '$10,000 - $50,000',
        probability,
        escalate,
        productName: 'Deep-Tech Funding Toolkit',
        productPrice: 49,
        productPath: '/products/toolkit'
      };
    }
  },
  'csbfp-canada-small-business-financing-program': {
    id: 'csbfp-canada-small-business-financing-program',
    title: 'CSBFP Financing Screener',
    description: 'Assess your corporate eligibility for government-backed CSBFP loan packages up to $1,000,000.',
    questions: [
      { id: 'province', text: 'Province of operation:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Annual corporate revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Employees count:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'assets', text: 'Are you financing commercial real estate, equipment, or leasehold improvements?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isAssets = answers.assets === 'yes';
      const matchedPrograms = [
        'CSBFP Real Estate Loan (Up to $1M)',
        isAssets ? 'CSBFP Equipment Financing (Up to $350K)' : 'CSBFP Working Capital Line (Up to $150K)',
        'BDC Small Business Loan'
      ];
      const probability = isAssets ? 'High' : 'Medium';
      const estNumeric = answers.revenue === 'above_3m' ? 350000 : 100000;
      const escalate = checkEscalation(answers, estNumeric);
      return {
        matchedPrograms,
        eligibilityEstimate: answers.revenue === 'above_3m' ? 'Up to $1,000,000' : 'Up to $350,000',
        probability,
        escalate,
        productName: 'Debt Financing Guide',
        productPrice: 19,
        productPath: '/products/funding-match-report'
      };
    }
  },
  'veteran-business-funding-canada-2026': {
    id: 'veteran-business-funding-canada-2026',
    title: 'Veteran Business Funding Diagnostic',
    description: 'Locate active grants, dedicated working loans, and advisory services for veteran-owned businesses.',
    questions: [
      { id: 'province', text: 'Province of operation:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Annual revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Company size:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'veteran_owned', text: 'Is your company majority-owned (51%+) by a Canadian Armed Forces veteran or reservist?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isVet = answers.veteran_owned === 'yes';
      const matchedPrograms = isVet
        ? ['Veteran Business Grant Pool', 'Veteran Startup Loan (Futurpreneur)', 'BDC Veteran Support Financing']
        : ['Canada Small Business Financing Program', 'Regional Development Scale-up Loan'];
      const probability = isVet ? 'High' : 'Medium';
      const estNumeric = isVet ? 75000 : 25000;
      const escalate = checkEscalation(answers, estNumeric);
      return {
        matchedPrograms,
        eligibilityEstimate: isVet ? '$15,000 - $75,000 (Non-dilutive + Loan)' : '$10,000 - $50,000',
        probability,
        escalate,
        productName: 'Veteran Entrepreneur Package',
        productPrice: 19,
        productPath: '/products/funding-match-report'
      };
    }
  },
  'healthcare-grants-2026': {
    id: 'healthcare-grants-2026',
    title: 'Healthcare & Life Sciences Screener',
    description: 'Evaluate your healthcare, medical device, or software startup for national and regional innovation grants.',
    questions: [
      { id: 'province', text: 'Select your state/province:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Select your annual revenue range:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Select your company employee count:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'fda_clearance', text: 'Does your medical product require FDA or Health Canada clearance tracks?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isFda = answers.fda_clearance === 'yes';
      const matchedPrograms = [
        'Healthcare Innovation Fund',
        isFda ? 'IRAP Med-Tech Advanced Stream' : 'Digital Health Scaling Subsidy',
        'Federal Health R&D Tax Credits'
      ];
      const probability = 'High';
      const estNumeric = isFda ? 450000 : 150000;
      const escalate = checkEscalation(answers, estNumeric);
      return {
        matchedPrograms,
        eligibilityEstimate: isFda ? '$150,000 - $450,000' : '$50,000 - $150,000',
        probability,
        escalate,
        productName: 'Healthcare Funding Guide',
        productPrice: 19,
        productPath: '/products/funding-match-report'
      };
    }
  },
  'alberta-small-business-grants-guide': {
    id: 'alberta-small-business-grants-guide',
    title: 'Alberta Small Business Grant Finder',
    description: 'Match your Alberta-incorporated business to active provincial grants, loans, and Alberta Innovates vouchers.',
    questions: [
      { id: 'province', text: 'Province of incorporation:', type: 'select', options: [
        { value: 'ab', label: 'Alberta' },
        { value: 'other', label: 'Other / Out of Province' }
      ]},
      { id: 'revenue', text: 'Annual corporate revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Company size:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'tech_adopt', text: 'Are you developing proprietary technology or adopting digital tools for operational scale?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isAb = answers.province === 'ab';
      const isTech = answers.tech_adopt === 'yes';
      const matchedPrograms = (isAb && isTech)
        ? ['Alberta Innovates Voucher', 'Alberta Jobs Now Training Grant', 'Alberta Export Expansion Support']
        : ['BDC Small Business Financing', 'Canada Jobs and Growth Fund'];
      const probability = isAb ? 'High' : 'Medium';
      const estNumeric = isTech ? 150000 : 50000;
      const escalate = checkEscalation(answers, estNumeric);
      return {
        matchedPrograms,
        eligibilityEstimate: (isAb && isTech) ? '$25,000 - $150,000' : '$10,000 - $50,000',
        probability,
        escalate,
        productName: 'Alberta Funding Toolkit',
        productPrice: 49,
        productPath: '/products/toolkit'
      };
    }
  },
  'women-entrepreneurship-grants-2026': {
    id: 'women-entrepreneurship-grants-2026',
    title: 'Women Entrepreneurship Program Matcher',
    description: 'Locate active non-dilutive programs from the Women Entrepreneurship Strategy (WES) ecosystem.',
    questions: [
      { id: 'province', text: 'Select your province:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Annual corporate revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Company size:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'women_owned', text: 'Is the business majority-owned and led (51%+) by women?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isWomen = answers.women_owned === 'yes';
      const matchedPrograms = isWomen
        ? ['WES Ecosystem Fund', 'WES Startup Loan', 'Regional Diversity Grant Match']
        : ['Canada Small Business Financing Program', 'Regional Scale-up Funding'];
      const probability = isWomen ? 'High' : 'Medium';
      const estNumeric = isWomen ? 50000 : 20000;
      const escalate = checkEscalation(answers, estNumeric);
      return {
        matchedPrograms,
        eligibilityEstimate: isWomen ? '$10,000 - $50,000' : '$10,000 - $25,000',
        probability,
        escalate,
        productName: 'Women Entrepreneur Guide',
        productPrice: 19,
        productPath: '/products/funding-match-report'
      };
    }
  },
  'canada-startup-funding-grants-guide': {
    id: 'canada-startup-funding-grants-guide',
    title: 'Canada Startup Funding Diagnostics',
    description: 'Analyze seed-stage opportunities including Futurpreneur, CSBFP loans, and local hiring subsidies.',
    questions: [
      { id: 'province', text: 'Select your province:', type: 'select', options: PROVINCE_OPTIONS },
      { id: 'revenue', text: 'Annual corporate revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Company size:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'young_founder', text: 'Are you a founder aged 18 to 39 seeking startup financing?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isYoung = answers.young_founder === 'yes';
      const matchedPrograms = [
        isYoung ? 'Futurpreneur Startup Financing' : 'CSBFP Startup Loan',
        'Youth Employment Hiring Subsidy',
        'BDC Small Business Financing'
      ];
      const probability = 'High';
      const estNumeric = isYoung ? 60000 : 40000;
      const escalate = checkEscalation(answers, estNumeric);
      return {
        matchedPrograms,
        eligibilityEstimate: isYoung ? '$20,000 - $60,000' : '$10,000 - $40,000',
        probability,
        escalate,
        productName: 'Canada Startup Toolkit',
        productPrice: 49,
        productPath: '/products/toolkit'
      };
    }
  },
  'bc-women-business-grants': {
    id: 'bc-women-business-grants',
    title: 'BC Women Entrepreneur Screener',
    description: 'Evaluate your BC-incorporated business for provincial matching grants and diversity scale-up loans.',
    questions: [
      { id: 'province', text: 'Province of incorporation:', type: 'select', options: [
        { value: 'bc', label: 'British Columbia' },
        { value: 'other', label: 'Other / Out of Province' }
      ]},
      { id: 'revenue', text: 'Annual corporate revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Company size:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'women_owned', text: 'Is your business majority-owned (51%+) by one or more women?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isBc = answers.province === 'bc';
      const isWomen = answers.women_owned === 'yes';
      const matchedPrograms = (isBc && isWomen)
        ? ['BC WES Grant Support', 'PacifiCan Women Scale-up Match', 'BC Employer Training Grant']
        : ['Canada Small Business Financing Program', 'Regional Development Agency Funding'];
      const probability = (isBc && isWomen) ? 'High' : 'Medium';
      const estNumeric = isWomen ? 100000 : 25000;
      const escalate = checkEscalation(answers, estNumeric);
      return {
        matchedPrograms,
        eligibilityEstimate: (isBc && isWomen) ? '$15,000 - $100,000' : '$10,000 - $25,000',
        probability,
        escalate,
        productName: 'Women Entrepreneur Guide',
        productPrice: 19,
        productPath: '/products/funding-match-report'
      };
    }
  },
  '7-startup-accelerators-california-free-money': {
    id: '7-startup-accelerators-california-free-money',
    title: 'California Accelerator Qualifier',
    description: 'Identify top California-based seed accelerators and state-sponsored micro-grant programs.',
    questions: [
      { id: 'state', text: 'State of operation:', type: 'select', options: [
        { value: 'ca', label: 'California' },
        { value: 'other', label: 'Other US State' }
      ]},
      { id: 'revenue', text: 'Annual corporate revenue:', type: 'select', options: REVENUE_OPTIONS },
      { id: 'employees', text: 'Company size:', type: 'select', options: EMPLOYEE_OPTIONS },
      { id: 'seed_stage', text: 'Are you pre-seed or seed stage seeking venture acceleration and micro-grants?', type: 'yesno' }
    ],
    evaluate: (answers) => {
      const isCa = answers.state === 'ca';
      const isSeed = answers.seed_stage === 'yes';
      const matchedPrograms = (isCa && isSeed)
        ? ['California CalSEED Grant', 'Silicon Valley Accelerator Funding', 'California Step Grant']
        : ['SBA Innovation Micro-Grant', 'State Technology Development Credit'];
      const probability = isCa ? 'High' : 'Medium';
      const estNumeric = isSeed ? 150000 : 50000;
      const escalate = checkEscalation(answers, estNumeric);
      return {
        matchedPrograms,
        eligibilityEstimate: (isCa && isSeed) ? '$50,000 - $150,000' : '$10,000 - $50,000',
        probability,
        escalate,
        productName: 'California Funding Toolkit',
        productPrice: 49,
        productPath: '/products/toolkit'
      };
    }
  }
};

