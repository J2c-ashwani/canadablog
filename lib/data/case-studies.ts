// lib/data/case-studies.ts

export interface CaseStudyDetails {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  label: string; // E.g., "Example Funding Scenario"
  industry: string;
  region: string;
  country: 'Canada' | 'USA';
  totalFundingMatch: string;
  programsStacked: string[];
  challenge: string;
  strategy: string;
  solution: string;
  timeline: string;
  disclaimer: string;
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
}

export const caseStudiesDatabase: CaseStudyDetails[] = [
  {
    id: 'ontario-manufacturer-120k',
    slug: 'ontario-manufacturer-120k',
    title: 'How an Ontario Manufacturer Identified $120,000 in Funding Opportunities',
    subtitle: 'Stacking Equipment Modernization Grants and Workplace Retraining Subsidies',
    label: 'Example Funding Scenario',
    industry: 'Manufacturing',
    region: 'Ontario',
    country: 'Canada',
    totalFundingMatch: '$120,000',
    programsStacked: ['CME SMART Program', 'Ontario Skills Development Fund (SDF)'],
    challenge: 'A regional packaging manufacturer in Ontario needed to transition to a high-speed automated sorting line to capture a new automotive tier-1 supply contract, but faced severe working capital constraints for initial equipment purchase and staff retraining.',
    strategy: 'Instead of seeking 100% debt financing, the company mapped out a dual-stack funding strategy separating physical capital upgrades from employee upskilling.',
    solution: 'The company applied for the CME SMART Program to subsidize the automated line equipment purchase at a 40% reimbursement ($100k cap). Simultaneously, they isolated the vendor training invoice and ran it through the Ontario Skills Development Fund to cover 100% of the training costs ($20k) for retraining 8 floor welders to operate the automated cell.',
    timeline: '4 Months from application to equipment installation.',
    disclaimer: 'This is an illustrative funding analysis modeling standard program eligibility, stacking logic, and typical refund thresholds for Ontario manufacturers.',
    metrics: [
      { label: 'Funding Secured', value: '$120,000', description: 'Reimbursements logged' },
      { label: 'Hiring Impact', value: '3 New Roles', description: 'Advanced operator hires' },
      { label: 'Throughput', value: '+35%', description: 'Production speed increase' }
    ]
  },
  {
    id: 'vancouver-saas-75k',
    slug: 'vancouver-saas-75k',
    title: 'How a Vancouver SaaS Startup Secured $75,000 in Digital Wage Subsidies',
    subtitle: 'Leveraging Mitacs Accelerate and Wage Subsidy Programs to Build AI Engines',
    label: 'Example Funding Scenario',
    industry: 'Technology',
    region: 'British Columbia',
    country: 'Canada',
    totalFundingMatch: '$75,000',
    programsStacked: ['Mitacs Accelerate', 'IRAP Youth Employment Program'],
    challenge: 'An early-stage software startup in Vancouver developing a machine learning scheduling engine needed to recruit two advanced data scientists but lacked the cash flow to compete with enterprise technology salaries.',
    strategy: 'Leverage academic partnerships and federal youth employment subsidies to co-fund technical salaries with non-dilutive capital.',
    solution: 'The company co-applied for a Mitacs Accelerate internship cluster with a University of British Columbia computer science lab, securing a PhD intern for 12 months with Mitacs providing a 50% matching contribution ($30,000 total). Concurrently, they hired a recent MSc graduate and secured a $45,000 wage subsidy under the IRAP Youth Employment Program.',
    timeline: '3 Months to complete academic agreement and process hiring subsidies.',
    disclaimer: 'This is an illustrative funding analysis modeling typical academic collaborations and federal youth wage subsidy rules in British Columbia.',
    metrics: [
      { label: 'Funding Secured', value: '$75,000', description: 'Non-dilutive salary support' },
      { label: 'Scientific Output', value: '1 AI Prototype', description: 'Core algorithm validated' },
      { label: 'Retained Staff', value: '100% Retention', description: 'Interns transitioned to FT' }
    ]
  },
  {
    id: 'calgary-agritech-180k',
    slug: 'calgary-agritech-180k',
    title: 'How an Alberta Agri-Tech Farm Stacked CAP and Clean-Tech Incentives for $180,000',
    subtitle: 'Decarbonizing Crop Drying Systems and Installing Solar Precision Systems',
    label: 'Example Funding Scenario',
    industry: 'Agriculture',
    region: 'Alberta',
    country: 'Canada',
    totalFundingMatch: '$180,000',
    programsStacked: ['Sustainable CAP cost-shared program', 'Agricultural Clean Technology (ACT) Program'],
    challenge: 'A grain producer in southern Alberta faced rising operating costs due to natural gas drying requirements and wanted to install solar-powered precision monitoring sensors and high-efficiency dryers.',
    strategy: 'Map a farm modernization plan to federal carbon-reduction incentives and provincial agricultural cost-shares.',
    solution: 'The farm submitted an engineering audit under the Agricultural Clean Technology (ACT) Program to cover 50% of a high-efficiency crop dryer installation ($130,000 refund). Concurrently, they ran their precision field sensor grid through the provincial Sustainable CAP stream to cover 40% of installation costs ($50,000 refund).',
    timeline: '6 Months to complete energy audits, order equipment, and claim matching funds.',
    disclaimer: 'This is an illustrative funding analysis modeling typical carbon reduction metrics and Sustainable CAP cost-shared eligibility rules for Alberta farms.',
    metrics: [
      { label: 'Funding Secured', value: '$180,000', description: 'Total cost-shared refunds' },
      { label: 'Energy Savings', value: '25% Reduction', description: 'Propane cost offset' },
      { label: 'CO2 Equivalent', value: '-33.6 Tonnes', description: 'Annual greenhouse gas offset' }
    ]
  },
  {
    id: 'texas-robotics-250k',
    slug: 'texas-robotics-250k',
    title: 'How a Dallas Robotics Firm Used SBIR & Texas Enterprise Fund to Secure $250,000',
    subtitle: 'Funding Industrial Automation R&D and State Business Expansion',
    label: 'Example Funding Scenario',
    industry: 'Technology',
    region: 'Texas',
    country: 'USA',
    totalFundingMatch: '$250,000',
    programsStacked: ['NSF SBIR Phase I', 'Texas Enterprise Fund (TEF)'],
    challenge: 'A robotics startup comparing relocation sites wanted to expand its advanced prototyping laboratory and hire 5 high-salary hardware technicians, but faced high upfront leasing and R&D risk.',
    strategy: 'Stack federal non-dilutive R&D capital with state-level site relocation incentives.',
    solution: 'The company submitted a Project Pitch and secured a $250,000 NSF SBIR Phase I grant to fund the technical prototyping salaries. By utilizing this approval to negotiate site relocation, they secured state-level Texas Enterprise Fund deal-closing support based on their multi-year high-wage hiring plan.',
    timeline: '9 Months from initial NSF Project Pitch to Dallas facility opening.',
    disclaimer: 'This is an illustrative funding analysis modeling standard U.S. federal SBIR Phase I guidelines and Texas state relocation incentive terms.',
    metrics: [
      { label: 'Funding Match', value: '$250,000', description: 'Phase I + relocation support' },
      { label: 'State Support', value: 'Tax Offset', description: 'Local franchise tax credit' },
      { label: 'New Hires', description: 'Advanced robotics technicians', value: '5 FTEs' }
    ]
  }
];

export function getAllCaseStudies(): CaseStudyDetails[] {
  return caseStudiesDatabase;
}

export function getCaseStudyBySlug(slug: string): CaseStudyDetails | undefined {
  return caseStudiesDatabase.find((c) => c.slug === slug);
}
