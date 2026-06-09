// lib/data/news.ts

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishDate: string;
  category: 'Policy' | 'Intake Openings' | 'Allocations' | 'Tax Credits';
  content: string;
  relatedProgramId?: string;
}

export const newsDatabase: NewsArticle[] = [
  {
    id: 'ontario-skills-development-fund-round-5',
    slug: 'ontario-skills-development-fund-round-5',
    title: 'Ontario Skills Development Fund (SDF) Round 5 Applications Officially Open',
    summary: 'The Government of Ontario has opened the application window for Round 5 of the Skills Development Fund, allocating $150 million to address labor shortages and upskill workers.',
    publishDate: '2026-06-02',
    category: 'Intake Openings',
    relatedProgramId: 'ontario-hiring-grant',
    content: `
      <p>The Ontario Ministry of Labour, Immigration, Training and Skills Development has officially opened the application window for the Skills Development Fund (SDF) - Training Stream Round 5. The provincial government is injecting an additional $150 million into the program to support consortiums, training centers, and employers who retrain workforce segments for advanced industrial growth.</p>
      
      <h3>Key Changes in SDF Round 5</h3>
      <p>Unlike previous rounds, Round 5 places heightened priority on manufacturing automation, precision welding, and clean-tech construction credentials. Qualifying applicants can obtain cost-shared funding covering up to 100% of external instructor fees, course materials, and trainee wages during the instruction period.</p>
      
      <h3>Application Deadlines and Rules</h3>
      <p>Applications will be processed on a rolling basis. However, history shows that capital is fully committed within the first 45 days of opening. Employers are advised to submit training curriculum proposals, certified trainer credentials, and detailed salary allocations as early as possible to prevent queue exclusions.</p>
    `
  },
  {
    id: 'alberta-innovates-vouchers-cap-increase',
    slug: 'alberta-innovates-vouchers-cap-increase',
    title: 'Alberta Innovates Increases Voucher Program Limit to $100,000 for Tech Startups',
    summary: 'To accelerate product engineering and lab validation, Alberta Innovates has bumped the maximum value of technology development vouchers from $50,000 to $100,000.',
    publishDate: '2026-05-28',
    category: 'Allocations',
    relatedProgramId: 'alberta-innovation-grant',
    content: `
      <p>Alberta Innovates has announced a significant update to its popular Innovation Voucher Program. Starting this fiscal quarter, the maximum contribution limit per voucher has been increased from $50,000 to $100,000. The change is designed to accommodate the rising cost of advanced prototype printing, cybersecurity validation, and clinical research facilities.</p>
      
      <h3>Leveraging the Voucher Scheme</h3>
      <p>Vouchers are paid directly to qualified service providers rather than as a reimbursement to the startup. This structure is highly beneficial for early-stage SaaS, hardware, and agritech companies who struggle with cash flow. The matching ratio remains at 75%, meaning a business must contribute 25% of the project budget in cash.</p>
      
      <h3>Eligible Service Providers</h3>
      <p>Startups can apply the voucher toward services rendered by universities, research colleges, certified industrial engineers, and contracted labs. General website building, social media marketing, and routine accounting packages remain ineligible for funding support.</p>
    `
  },
  {
    id: 'canexport-smes-funding-exhausted',
    slug: 'canexport-smes-funding-exhausted',
    title: 'CanExport SMEs Suspends Intake for FY 2026-2027 Due to High Volume',
    summary: 'The Trade Commissioner Service (TCS) has temporarily paused new application intakes for the CanExport SMEs program after receiving record-breaking volume in the spring cycle.',
    publishDate: '2026-05-15',
    category: 'Policy',
    relatedProgramId: 'canexport',
    content: `
      <p>In an announcement posted on the official Trade Commissioner Service portal, the Government of Canada has suspended new intakes for the CanExport SMEs program for the remainder of the 2026-2027 fiscal year. The program, which offsets international marketing and trade show placement costs up to $50,000, reached its budget allocation within six weeks of its April opening.</p>
      
      <h3>Impact on Pending Applications</h3>
      <p>Applications submitted prior to the freeze date will continue to be reviewed and funded subject to budget availability. However, any drafts in progress that have not been officially locked and submitted will not be accepted until the intake reopens next year.</p>
      
      <h3>Alternative International Grants</h3>
      <p>With CanExport offline, businesses looking to expand into international markets should investigate provincial export tools, such as the Ontario Export Funds, or state-level STEP grants in the US, which remain funded and active on a regional basis.</p>
    `
  },
  {
    id: 'usda-reap-clean-energy-reallocation',
    slug: 'usda-reap-clean-energy-reallocation',
    title: 'USDA REAP Allocates Additional $145 Million for Rural Solar & Energy Upgrades',
    summary: 'The United States Department of Agriculture (USDA) is releasing new funds for rural business solar arrays and heating efficiency upgrades, keeping the grant matching cap at 50%.',
    publishDate: '2026-04-30',
    category: 'Allocations',
    relatedProgramId: 'usda-reap',
    content: `
      <p>The USDA is allocating an additional $145 million in funding for the Rural Energy for America Program (REAP). These funds, distributed through regional offices, will help agricultural producers and rural small businesses install solar panels, wind turbines, biomass digestors, and high-efficiency HVAC equipment.</p>
      
      <h3>50% Cost-Shared Matching Rules</h3>
      <p>Under the Inflation Reduction Act provisions, the REAP grant match remains at up to 50% of the total project cost. For projects requesting over $20,000, a professional energy audit is required to prove historical energy usage savings. Guaranteed loans can also be stacked to cover the remaining cash requirements.</p>
      
      <h3>Who Qualifies?</h3>
      <p>To qualify for the program, the business must either be a farm deriving 50% or more of its gross income from agriculture, or a rural small business located in a designated zip code with a population under 50,000. Virtual operations or entities with metropolitan HQs are excluded from the scheme.</p>
    `
  },
  {
    id: 'cra-sred-software-audit-clarification',
    slug: 'cra-sred-software-audit-clarification',
    title: 'CRA Issues Updated Guidelines on SR&ED Software Project Audits',
    summary: 'The Canada Revenue Agency has released an administrative bulletin clarifying the eligibility of software projects, warning CCPCs against claiming routine application development.',
    publishDate: '2026-04-12',
    category: 'Tax Credits',
    relatedProgramId: 'sred-tax-credit',
    content: `
      <p>The CRA has published a revised application bulletin detailing the criteria used by provincial tax assessors to review Scientific Research and Experimental Development (SR&ED) claims for software projects. The agency is warning companies that routine application development using standard libraries is subject to high audit rates.</p>
      
      <h3>Defining Technological Uncertainty</h3>
      <p>To qualify for the tax credit, software projects must seek to resolve a technological uncertainty that cannot be resolved through standard public knowledge or routine developer practices. Examples of qualifying work include custom compiler design, database latency scaling under unproven architectures, or deep neural network model modifications.</p>
      
      <h3>Contemporaneous Logs are Mandatory</h3>
      <p>The CRA bulletin highlights that retroactively reconstructing hours in an Excel sheet is the primary cause of claim rejection. Claims must be backed by contemporaneous developer logs, git commits, project planning notes, and architecture diagrams linked directly to the claimed R&D uncertainty.</p>
    `
  }
];

export function getAllNews(): NewsArticle[] {
  return newsDatabase;
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsDatabase.find((n) => n.slug === slug);
}
