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
    title: 'How an Ontario Precision Manufacturer Identified $120,000 in Stacked Incentives',
    subtitle: 'Combining CME SMART Equipment Grants with Ontario Skills Development Fund for CNC Automation Upgrade',
    label: 'Funding Scenario',
    industry: 'Precision CNC Manufacturing',
    region: 'Ontario',
    country: 'Canada',
    totalFundingMatch: '$120,000',
    programsStacked: ['CME SMART Subsidized Automation Program', 'Ontario Skills Development Fund (SDF)', 'Canada Job Grant (CJG)'],
    challenge: 'A 22-employee precision machining shop in Mississauga, Ontario landed a tier-1 automotive contract but needed to install a 5-axis CNC machining centre ($280,000 capital outlay) and retrain 9 floor operators. With existing credit lines already drawn, they could not finance both the equipment and the training concurrently.',
    strategy: 'The funding strategy separated the capital equipment purchase from the workforce upskilling costs, routing each to the most appropriate federal and provincial program to maximize combined reimbursement without triggering anti-double-dipping rules.',
    solution: 'The CME SMART Program covered 40% of the CNC equipment cost up to $100,000. The Ontario Skills Development Fund covered 100% of vendor-delivered operator training ($14,000 for 9 staff). The Canada Job Grant covered an additional $6,000 in curriculum development costs. Total reimbursement: $120,000, reducing the effective net cash outlay to $160,000 on a $280,000 capital project.',
    timeline: '5 months from initial program mapping to first reimbursement cheque.',
    disclaimer: 'This is an illustrative funding analysis modeling standard CME SMART, SDF, and Canada Job Grant eligibility parameters for Ontario manufacturers. Actual outcomes depend on program availability, capital equipment verification, and compliance documentation.',
    metrics: [
      { label: 'Funding Identified', value: '$120,000', description: 'Combined grant reimbursements' },
      { label: 'Net Capital Cost', value: '43% Reduced', description: '$160K effective vs $280K gross' },
      { label: 'Retraining Covered', value: '9 Operators', description: '100% SDF-funded upskilling' }
    ]
  },
  {
    id: 'vancouver-saas-75k',
    slug: 'vancouver-saas-75k',
    title: 'How a Vancouver SaaS Startup Used Mitacs & IRAP to Fund $75,000 in Engineering Salaries',
    subtitle: 'Stacking Federal Wage Subsidies and Academic Co-Funding to Build a Machine Learning Scheduling Engine',
    label: 'Funding Scenario',
    industry: 'Enterprise SaaS / Machine Learning',
    region: 'British Columbia',
    country: 'Canada',
    totalFundingMatch: '$75,000',
    programsStacked: ['Mitacs Accelerate', 'NRC IRAP Youth Employment Program', 'CDAP Boost Your Business Technology'],
    challenge: 'A 9-person Vancouver SaaS startup building AI-powered workforce scheduling software needed to hire two intermediate machine learning engineers but was burning too fast to compete with enterprise salary offers. Standard bank financing required 2 years of revenue history they did not have.',
    strategy: 'The CEO structured a co-funded hiring strategy using academic internship matching and federal youth employment subsidies to offset the first 12 months of engineering salary — buying enough runway to complete their Series Seed milestone.',
    solution: 'Mitacs Accelerate paired the company with a UBC Computer Science PhD intern for 12 months, with Mitacs contributing $30,000 (50% of the stipend). The IRAP Youth Employment Program subsidized 50% of a second hire salary for 6 months ($30,000). CDAP added $15,000 in digital transformation support for cloud infrastructure tooling. Combined: $75,000 in non-dilutive salary and tech support, extending runway by 8 months.',
    timeline: '3 months from academic partnership setup to first payroll subsidy received.',
    disclaimer: 'This is an illustrative funding analysis modeling standard Mitacs Accelerate contribution rules, IRAP YEP salary subsidy parameters, and CDAP Boost eligibility for BC technology companies. Outcomes vary based on project scope and academic availability.',
    metrics: [
      { label: 'Salary Subsidized', value: '$75,000', description: 'Non-dilutive engineering support' },
      { label: 'Runway Extended', value: '+8 Months', description: 'Without additional equity dilution' },
      { label: 'ML Engineers Hired', value: '2 FTE', description: 'Co-funded senior and intern roles' }
    ]
  },
  {
    id: 'calgary-agritech-180k',
    slug: 'calgary-agritech-180k',
    title: 'How an Alberta Grain Farm Accessed $180,000 in Clean-Tech & Agri Innovation Funding',
    subtitle: 'Stacking ACT Program and Sustainable CAP Cost-Shares to Electrify Crop Drying Operations',
    label: 'Funding Scenario',
    industry: 'Grain Farming & Agricultural Technology',
    region: 'Alberta',
    country: 'Canada',
    totalFundingMatch: '$180,000',
    programsStacked: ['Agricultural Clean Technology (ACT) Program', 'Sustainable Canadian Agricultural Partnership (CAP)', 'Alberta Emission Offset Registry'],
    challenge: 'A family-owned 4,800-acre grain operation near Lethbridge, Alberta was spending over $90,000 annually on natural gas for conventional crop dryers. Rising input costs and federal carbon pricing were pressuring margins to unsustainable levels, requiring capital investment in electric high-efficiency dryers and precision monitoring sensors.',
    strategy: 'The farm mapped its planned capital investments across three non-competing government programs — federal clean technology adoption, provincial agri-innovation cost-shares, and an emissions offset credit — to recover the majority of the project cost through stacked non-dilutive capital.',
    solution: 'The ACT Program approved a 50% reimbursement on a high-efficiency electric dryer installation ($130,000 federal contribution). The Sustainable CAP stream covered 40% of the precision soil and moisture sensor grid installation ($50,000 provincial contribution). The operation also enrolled generated emission credits with the Alberta Emissions Offset Registry, projecting 33.6 tonnes CO2e annual reductions and approximately $1,100/year in credit revenue. Total upfront reimbursement: $180,000.',
    timeline: '6 months from energy audit submission to final provincial cost-share approval.',
    disclaimer: 'This is an illustrative funding analysis modeling standard ACT Program adoption stream eligibility, Alberta CAP cost-share parameters, and Alberta Emissions Offset Registry protocols for large grain operations.',
    metrics: [
      { label: 'Grants Identified', value: '$180,000', description: 'Combined federal & provincial' },
      { label: 'Annual Gas Savings', value: '$52,000', description: 'Natural gas cost elimination' },
      { label: 'CO2 Offset', value: '33.6 Tonnes', description: 'Annual greenhouse gas reduction' }
    ]
  },
  {
    id: 'quebec-tech-sred-150k',
    slug: 'quebec-tech-sred-150k',
    title: 'How a Montreal FinTech Startup Recovered $150,000 in SR&ED Tax Credits for Software R&D',
    subtitle: 'Leveraging Canada\'s Largest R&D Incentive Program to Fund Core Algorithm Development',
    label: 'Funding Scenario',
    industry: 'Financial Technology (FinTech)',
    region: 'Quebec',
    country: 'Canada',
    totalFundingMatch: '$150,000',
    programsStacked: ['SR&ED Federal Tax Credit (35% Refundable)', 'Quebec R&D Tax Credit (RD&I)', 'NRC IRAP Financial Assistance'],
    challenge: 'A 14-person Montreal FinTech startup spent $320,000 over 18 months developing a proprietary transaction fraud detection algorithm using reinforcement learning. The founders were unaware that the majority of their core engineering salaries qualified as SR&ED-eligible expenditures, and filed their first two fiscal years without claiming any scientific research credits.',
    strategy: 'A retroactive SR&ED filing strategy — permitted up to 18 months after fiscal year-end — was mapped out to recover federal and provincial R&D tax credits on already-incurred qualifying expenses, combined with a forward-looking IRAP contribution to fund the next development milestone.',
    solution: 'A retroactive T661 SR&ED filing identified $280,000 in qualifying salary and contractor expenditures. At the CCPC 35% refundable rate, this generated a $98,000 federal refund. The Quebec RD&I provincial credit added a further $28,000 refund. A forward-looking NRC IRAP contribution of $24,000 funded two months of additional algorithm validation. Combined recovery: $150,000 in cash refunds and co-funding.',
    timeline: '4 months from retroactive SR&ED documentation to CRA refund deposited.',
    disclaimer: 'This is an illustrative funding analysis modeling standard CRA SR&ED T661 eligibility criteria, Quebec RD&I credit parameters, and NRC IRAP wage subsidy guidelines for Montreal-based software startups.',
    metrics: [
      { label: 'Tax Credits Recovered', value: '$150,000', description: 'Federal + provincial R&D refunds' },
      { label: 'Qualifying Salaries', value: '$280,000', description: 'SR&ED-eligible expenditures filed' },
      { label: 'Effective R&D Cost', value: '47% Reduced', description: 'Net engineering cost after credits' }
    ]
  },
  {
    id: 'ottawa-women-entrepreneur-60k',
    slug: 'ottawa-women-entrepreneur-60k',
    title: 'How an Ottawa Women-Owned Consulting Firm Accessed $60,000 in WES & BDC Financing',
    subtitle: 'Stacking Women Entrepreneurship Strategy Funding with BDC Growth Financing to Scale Operations',
    label: 'Funding Scenario',
    industry: 'Management Consulting & Professional Services',
    region: 'Ontario',
    country: 'Canada',
    totalFundingMatch: '$62,000',
    programsStacked: ['Women Entrepreneurship Strategy (WES) Loans', 'BDC Women in Technology Financing', 'Canada Digital Adoption Program (CDAP)'],
    challenge: 'A women-owned 7-person management consulting firm in Ottawa, specializing in federal procurement advisory, had grown revenue 38% year-over-year but was repeatedly declined for traditional bank credit lines due to having no physical asset collateral. They needed $55,000 to hire a senior proposal writer and implement a CRM platform to compete for larger government contracts.',
    strategy: 'The firm qualified for multiple women-entrepreneur-specific funding streams — both loan-based and non-repayable — that are inaccessible through conventional bank channels. The strategy stacked a non-repayable CDAP digital adoption grant with subsidized WES financing to avoid full commercial interest rates on the entire capital need.',
    solution: 'A WES ecosystem loan through a regional CFDC provided $35,000 in below-market-rate financing for the senior hire salary bridge. BDC Women in Technology program provided $10,000 in advisory credits and $15,000 in CRM implementation financing. CDAP Grow Your Business Online added $2,400 as a non-repayable digital adoption grant. Total capital accessed: $62,400, with $17,400 being non-repayable and the balance at subsidized rates averaging 4.2%.',
    timeline: '7 weeks from initial WES application submission to first financing disbursement.',
    disclaimer: 'This is an illustrative funding analysis modeling standard WES CFDC loan parameters, BDC Women in Technology financing eligibility, and CDAP stream criteria for women-owned service businesses in Ontario.',
    metrics: [
      { label: 'Capital Accessed', value: '$62,000', description: 'Loans + non-repayable grants' },
      { label: 'Non-Repayable Portion', value: '$17,400', description: 'CDAP + BDC advisory credits' },
      { label: 'Average Rate', value: '4.2%', description: 'vs 8-12% commercial alternatives' }
    ]
  }
];

export function getAllCaseStudies(): CaseStudyDetails[] {
  return caseStudiesDatabase;
}

export function getCaseStudyBySlug(slug: string): CaseStudyDetails | undefined {
  return caseStudiesDatabase.find((c) => c.slug === slug);
}
