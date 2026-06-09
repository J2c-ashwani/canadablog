// lib/data/programs.ts

export interface ProgramDetails {
  id: string;
  slug: string;
  name: string;
  agency: string;
  fundingAmount: string;
  fundingType: 'Grant' | 'Loan' | 'Tax Credit' | 'Rebate' | 'Hybrid' | 'Loan Support' | 'Equity';
  fundingDifficulty: 'Low' | 'Moderate' | 'Competitive';
  deadlineType: 'Rolling Intake' | 'Multiple Windows' | 'Closed';
  region: string; // "Federal" or State/Province name
  country: 'Canada' | 'USA';
  description: string;
  eligibility: string[];
  applicationProcess: string[];
  officialWebsite: string;
  insiderTips?: string[];
}

export const programsDatabase: ProgramDetails[] = [
  // --- CANADA FEDERAL ---
  {
    id: 'sred-tax-credit',
    slug: 'sred-tax-credit',
    name: 'Scientific Research and Experimental Development (SR&ED)',
    agency: 'Canada Revenue Agency (CRA)',
    fundingAmount: 'Up to 64% of R&D salaries refunded',
    fundingType: 'Tax Credit',
    fundingDifficulty: 'Moderate',
    deadlineType: 'Rolling Intake',
    region: 'Federal',
    country: 'Canada',
    description: 'Canada\'s largest tax incentive for businesses conducting scientific research or experimental development. Provides a fully refundable investment tax credit (ITC) for eligible R&D expenditures.',
    eligibility: [
      'Canadian-Controlled Private Corporations (CCPCs)',
      'Conducting work to resolve technological uncertainty',
      'Requires systematic investigation (hypothesize, test, analyze, document)'
    ],
    applicationProcess: [
      'Track engineering/R&D hours and material costs contemporaneously.',
      'Prepare the T2 Schedule 31 (Investment Tax Credit) and Schedule 60 (R&D project description).',
      'Submit schedules together with your annual corporate tax return filing.'
    ],
    officialWebsite: 'https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program.html',
    insiderTips: [
      'Do not wait until tax season to document. CRA auditors heavily look for contemporaneous logs, JIRA tickets, and test records.',
      'Routine software coding using standard React/Node libraries without architectural challenge is a frequent reject reason.'
    ]
  },
  {
    id: 'irap-grant',
    slug: 'irap-grant',
    name: 'Industrial Research Assistance Program (IRAP)',
    agency: 'National Research Council (NRC)',
    fundingAmount: '$50,000 to $500,000+ (covers 50-80% of wages)',
    fundingType: 'Grant',
    fundingDifficulty: 'Competitive',
    deadlineType: 'Rolling Intake',
    region: 'Federal',
    country: 'Canada',
    description: 'Provides non-repayable grants and advisory support to help Canadian small and medium-sized enterprises (SMEs) develop and commercialize innovative technologies.',
    eligibility: [
      'Incorporated in Canada with fewer than 500 employees',
      'Developing innovative, technology-driven products or processes',
      'Possess sufficient working capital to execute project and bridge reimbursement cycles'
    ],
    applicationProcess: [
      'Call the NRC-IRAP general intake line (1-877-994-4727) to request a consultation.',
      'Build a relationship with your assigned Industrial Technology Advisor (ITA) who serves as internal champion.',
      'Submit a detailed project proposal, budget breakdown, and hiring forecast upon ITA invitation.'
    ],
    officialWebsite: 'https://nrc.canada.ca/en/support-technology-innovation/industrial-research-assistance-program-nrc-irap',
    insiderTips: [
      'This is a relationship-based program. Success depends on presenting a clear commercialization roadmap to your ITA.',
      'Make sure you have at least 1 full-time T4 employee on staff (founders paid strictly in dividends are excluded).'
    ]
  },
  {
    id: 'canexport',
    slug: 'canexport',
    name: 'CanExport SMEs Program',
    agency: 'Trade Commissioner Service (TCS)',
    fundingAmount: 'Up to $50,000 (covers 50% of export costs)',
    fundingType: 'Grant',
    fundingDifficulty: 'Moderate',
    deadlineType: 'Multiple Windows',
    region: 'Federal',
    country: 'Canada',
    description: 'Offers cost-shared funding to help Canadian businesses expand into new international markets by covering travel, marketing, trade show, and translation costs.',
    eligibility: [
      'For-profit company with under 500 employees',
      'Declared annual revenue in Canada between $100,000 and $100 Million',
      'Targeting a market where the company has less than 10% of historic sales'
    ],
    applicationProcess: [
      'Create an account on the CanExport online portal.',
      'Submit a detailed international marketing plan, target market selection, and budget estimate.',
      'Obtain approval BEFORE signing vendor contracts or booking travel.'
    ],
    officialWebsite: 'https://www.tradecommissioner.gc.ca/funding-financement/canexport/index.aspx?lang=eng',
    insiderTips: [
      'Submit early in the fiscal year (April). CanExport allocation runs on a first-come queue and is frequently frozen by autumn.',
      'Expenses incurred before formal approval are strictly ineligible for matching.'
    ]
  },
  {
    id: 'cdap',
    slug: 'cdap',
    name: 'Canada Digital Adoption Program (CDAP)',
    agency: 'Innovation, Science and Economic Development Canada (ISED)',
    fundingAmount: '$15,000 advisory grant + $100,000 interest-free loan',
    fundingType: 'Hybrid',
    fundingDifficulty: 'Low',
    deadlineType: 'Rolling Intake',
    region: 'Federal',
    country: 'Canada',
    description: 'Helps small and medium-sized businesses digitize operations, adopt advanced CRM/ERP tools, upgrade cybersecurity, and scale ecommerce pipelines.',
    eligibility: [
      'For-profit Canadian business with 1 to 499 employees',
      'Gross annual revenue of at least $500,000 in one of the past 3 tax years',
      'Ready to work with a certified digital advisor to build an adoption roadmap'
    ],
    applicationProcess: [
      'Register on the ISED digital platform and complete a digital maturity assessment.',
      'Choose a certified digital advisor to build your official Digital Adoption Plan.',
      'Submit your plan to unlock the BDC interest-free loan and hiring wage subsidy.'
    ],
    officialWebsite: 'https://www.canada.ca/en/innovation-science-economic-development/programs/canada-digital-adoption-program.html',
    insiderTips: [
      'Even if you are a software startup, CDAP is highly useful for funding SOC2 compliance infrastructure or implementing advanced marketing/sales systems.'
    ]
  },
  {
    id: 'sif',
    slug: 'sif',
    name: 'Strategic Innovation Fund (SIF)',
    agency: 'Innovation, Science and Economic Development Canada (ISED)',
    fundingAmount: 'Minimum $10 Million (large industrial projects)',
    fundingType: 'Hybrid',
    fundingDifficulty: 'Competitive',
    deadlineType: 'Rolling Intake',
    region: 'Federal',
    country: 'Canada',
    description: 'Supports large-scale projects that drive innovation, encourage clean technology adoption, fortify industrial supply chains, and build advanced manufacturing facilities.',
    eligibility: [
      'Businesses of all sizes with massive project scopes',
      'Project values must be over $20 Million to match the minimum $10M request',
      'Clear, quantified commitment to creating high-skilled domestic jobs and economic growth'
    ],
    applicationProcess: [
      'Submit a Statement of Interest (SOI) explaining project scope and national impact.',
      'Undergo a technical and financial screening process by ISED analysts.',
      'If invited, submit a full project proposal and negotiate the contribution agreement.'
    ],
    officialWebsite: 'https://ised-isde.canada.ca/site/strategic-innovation-fund/en',
    insiderTips: [
      'This program is not for early-stage startups. Only pursue this if you are building heavy industrial facilities, bio-manufacturing centers, or auto/aerospace supply lines.'
    ]
  },
  {
    id: 'mitacs-accelerate',
    slug: 'mitacs-accelerate',
    name: 'Mitacs Accelerate Program',
    agency: 'Mitacs Canada',
    fundingAmount: '$7,500 to $15,000+ per internship cluster',
    fundingType: 'Grant',
    fundingDifficulty: 'Low',
    deadlineType: 'Rolling Intake',
    region: 'Federal',
    country: 'Canada',
    description: 'Pairs Canadian businesses with academic researchers (grad students and postdocs) to execute specialized R&D projects, offsetting the cost of hiring advanced researchers.',
    eligibility: [
      'Canadian incorporated businesses or select non-profits',
      'Collaborating with a Canadian university or research college',
      'Willing to provide matching cash contribution (usually 50% of intern stipend)'
    ],
    applicationProcess: [
      'Identify a research partner at a Canadian university (or work with a Mitacs representative to find one).',
      'Draft a project proposal outlining the technical challenge and intern responsibilities.',
      'Submit the proposal through the Mitacs portal; review cycles are fast and approve year-round.'
    ],
    officialWebsite: 'https://www.mitacs.ca/en/programs/accelerate',
    insiderTips: [
      'This is the most cost-effective way to add PhD or Masters level AI, biotech, or hardware developers to your team. Mitacs matches your $7,500 with another $7,500 to pay the researcher $15,000.'
    ]
  },
  {
    id: 'sustainable-cap',
    slug: 'sustainable-cap',
    name: 'Sustainable Canadian Agricultural Partnership',
    agency: 'Agriculture and Agri-Food Canada (AAFC)',
    fundingAmount: '$10,000 to $250,000+ cost-shared',
    fundingType: 'Grant',
    fundingDifficulty: 'Moderate',
    deadlineType: 'Multiple Windows',
    region: 'Federal',
    country: 'Canada',
    description: 'A 5-year, $3.5 billion investment by federal, provincial, and territorial governments to support sustainable growth, precision technology adoption, and climate resilience in farming.',
    eligibility: [
      'Farms, agricultural producers, food processors, and agri-tech businesses',
      'Possess a valid Environmental Farm Plan (EFP) or provincial equivalent',
      'Project must align with sustainability, productivity, or greenhouse gas reduction goals'
    ],
    applicationProcess: [
      'Complete your provincial Environmental Farm Plan.',
      'Check active provincial cost-shared programs (intake windows reset every April).',
      'Submit verified vendor quotes along with your project application.'
    ],
    officialWebsite: 'https://agriculture.canada.ca/en/about-our-department/key-departmental-initiatives/sustainable-canadian-agricultural-partnership',
    insiderTips: [
      'Do not say you are buying automated equipment strictly to reduce labor. Frame the narrative around reducing waste, energy use, or chemical footprint.'
    ]
  },
  
  // --- CANADA PROVINCIAL ---
  {
    id: 'ontario-hiring-grant',
    slug: 'ontario-hiring-grant',
    name: 'Ontario Skills Development Fund (SDF)',
    agency: 'Ontario Ministry of Labour, Training and Skills Development',
    fundingAmount: 'Up to $150,000+ (reimburses up to 100% of training costs)',
    fundingType: 'Grant',
    fundingDifficulty: 'Moderate',
    deadlineType: 'Multiple Windows',
    region: 'Ontario',
    country: 'Canada',
    description: 'Helps employers retrain existing employees or onboard new hires to operate advanced machinery, software, or digital systems in Ontario.',
    eligibility: [
      'Ontario-incorporated businesses with floor operations',
      'Training program must lead to high-demand skills or job retention',
      'Training must be delivered by certified external third-party providers'
    ],
    applicationProcess: [
      'Obtain detailed, arm\'s-length training quotes from certified providers.',
      'Apply online during open ministry intake windows.',
      'Submit payroll and invoice evidence upon training completion for refund.'
    ],
    officialWebsite: 'https://www.ontario.ca/page/skills-development-fund',
    insiderTips: [
      'When purchasing advanced machinery (like CNC or robotics), isolate the training and commissioning line-item on the invoice to run it through this grant.'
    ]
  },
  {
    id: 'alberta-innovation-grant',
    slug: 'alberta-innovation-grant',
    name: 'Alberta Innovates: Innovation Voucher',
    agency: 'Alberta Innovates',
    fundingAmount: 'Up to $100,000 (covers 75% of costs)',
    fundingType: 'Grant',
    fundingDifficulty: 'Moderate',
    deadlineType: 'Rolling Intake',
    region: 'Alberta',
    country: 'Canada',
    description: 'Helps small and medium tech businesses in Alberta access technical services, prototype development, market feasibility studies, and digital scaling assistance.',
    eligibility: [
      'Alberta-based business with under 50 employees and $1M in annual revenue',
      'Developing a novel technology or innovative product',
      'Willing to cover the 25% matching cash requirement'
    ],
    applicationProcess: [
      'Identify a qualified service provider (research center, product engineering firm).',
      'Apply online through the Alberta Innovates portal.',
      'Receive a voucher to pay the service provider directly upon project kickoff.'
    ],
    officialWebsite: 'https://albertainnovates.ca/programs/',
    insiderTips: [
      'This is a non-dilutive tool to pay for prototype industrial design or independent laboratory validation without sacrificing startup equity.'
    ]
  },
  {
    id: 'quebec-innovation-tax-credit',
    slug: 'quebec-innovation-tax-credit',
    name: 'Quebec R&D Tax Credit for CCPCs',
    agency: 'Revenu Québec',
    fundingAmount: 'Refunds up to 30% of R&D salaries',
    fundingType: 'Tax Credit',
    fundingDifficulty: 'Moderate',
    deadlineType: 'Rolling Intake',
    region: 'Quebec',
    country: 'Canada',
    description: 'Provincial tax incentive that matches federal SR&ED, providing refundable tax credits on wages paid to employees conducting scientific research or experimental development in Quebec.',
    eligibility: [
      'Incorporated in Quebec and operating a permanent establishment',
      'Conducting qualified R&D activities inside the province',
      'Claims must be filed alongside annual corporate income tax returns'
    ],
    applicationProcess: [
      'Isolate Quebec engineering/R&D salaries and contractor invoices.',
      'Fill out Revenu Québec Form RD-1029.7.',
      'File together with your annual provincial corporate tax return.'
    ],
    officialWebsite: 'https://www.revenuquebec.ca/en/businesses/income-tax/corporation-income-tax/credits/scientific-research-and-experimental-development/',
    insiderTips: [
      'Quebec\'s credit stacks directly with federal SR&ED, enabling CCPCs in Montreal to recover up to 64% of total R&D payroll.'
    ]
  },

  // --- USA FEDERAL ---
  {
    id: 'nih-sbir',
    slug: 'nih-sbir',
    name: 'NIH SBIR/STTR Biotech Grants',
    agency: 'National Institutes of Health (NIH)',
    fundingAmount: 'Phase I: $150K-$275K | Phase II: $1M-$1.8M',
    fundingType: 'Grant',
    fundingDifficulty: 'Competitive',
    deadlineType: 'Multiple Windows',
    region: 'Federal',
    country: 'USA',
    description: 'Known as America\'s Seed Fund for life sciences, these awards fund early-stage research and development with commercialization potential in biotech, medical devices, and digital health.',
    eligibility: [
      'U.S.-based for-profit business with under 500 employees',
      'Over 50% owned by U.S. citizens or permanent residents',
      'Project involves high technical risk and scientific innovation'
    ],
    applicationProcess: [
      'Register on SAM.gov, eRA Commons, and Grants.gov at least 6 weeks in advance.',
      'Submit a detailed scientific proposal, budget, and commercialization brief during standard deadlines (Jan 5, Apr 5, Sept 5).',
      'Undergo a peer-review panel scoring process; approval decisions take 6 to 9 months.'
    ],
    officialWebsite: 'https://seed.nih.gov/small-business-funding',
    insiderTips: [
      'Biotech startups should partner with a university or research hospital (required for STTR) to increase credibility and run validation clinical trials cheaply.'
    ]
  },
  {
    id: 'nsf-sbir',
    slug: 'nsf-sbir',
    name: 'NSF SBIR/STTR Startup Grants',
    agency: 'National Science Foundation (NSF)',
    fundingAmount: 'Phase I: Up to $275,000 | Phase II: Up to $1,000,000',
    fundingType: 'Grant',
    fundingDifficulty: 'Competitive',
    deadlineType: 'Rolling Intake',
    region: 'Federal',
    country: 'USA',
    description: 'Provides non-dilutive funding to early-stage startups developing highly innovative, high-risk technologies with deep commercial market potential.',
    eligibility: [
      'For-profit U.S. small business with under 500 employees',
      'Focusing on deep-tech, AI research, materials science, or advanced hardware',
      'The technology must face a fundamental scientific risk (unproven feasibility)'
    ],
    applicationProcess: [
      'Submit a required 3-page "Project Pitch" outlining technical risk and market opportunity.',
      'Wait for official invitation (usually takes 3-6 weeks).',
      'If invited, submit a full proposal on Grants.gov including research plan and letters of intent.'
    ],
    officialWebsite: 'https://seedfund.nsf.gov/',
    insiderTips: [
      'Routine software engineering, e.g. building a standard mobile app or dashboard using existing tools, is instantly rejected. NSF wants to fund unproven science.'
    ]
  },
  {
    id: 'usda-reap',
    slug: 'usda-reap',
    name: 'USDA Rural Energy for America Program (REAP)',
    agency: 'United States Department of Agriculture (USDA)',
    fundingAmount: 'Up to $1 Million (covers up to 50% of project costs)',
    fundingType: 'Grant',
    fundingDifficulty: 'Moderate',
    deadlineType: 'Multiple Windows',
    region: 'Federal',
    country: 'USA',
    description: 'Provides guaranteed loan financing and grant funding to agricultural producers and rural small businesses to install renewable energy systems or make energy efficiency improvements.',
    eligibility: [
      'Agricultural producers (deriving 50%+ of gross income from farming)',
      'Rural small businesses in areas with populations under 50,000',
      'Project involves solar, wind, biomass, geothermal, or high-efficiency upgrades'
    ],
    applicationProcess: [
      'Complete a professional energy audit showing baseline and projected energy savings.',
      'Submit application, vendor quotes, and financial records to your local USDA representative.',
      'Wait for regional reviews (intake cycles end March 31 and September 30).'
    ],
    officialWebsite: 'https://www.rd.usda.gov/programs-services/energy-programs/rural-energy-america-program-renewable-energy-systems-energy-efficiency-improvement-guaranteed-loans',
    insiderTips: [
      'This is the highest ROI grant in the U.S. agricultural sector, frequently funding solar installations on farm structures at a 50% cash refund.'
    ]
  },
  {
    id: 'sba-growth-accelerator',
    slug: 'sba-growth-accelerator',
    name: 'SBA Growth Accelerator Fund Competition',
    agency: 'Small Business Administration (SBA)',
    fundingAmount: '$50,000 to $200,000 prizes',
    fundingType: 'Grant',
    fundingDifficulty: 'Competitive',
    deadlineType: 'Multiple Windows',
    region: 'Federal',
    country: 'USA',
    description: 'An annual competition awarding cash prizes to support accelerators, incubators, and non-profits that aid STEM/R&D startups in underserved areas.',
    eligibility: [
      'Accelerators, startup hubs, makerspaces, or non-profit incubators',
      'Commitment to assisting early-stage, deep-tech, or diverse founders',
      'U.S.-based operations'
    ],
    applicationProcess: [
      'Submit a presentation deck and short video explaining your program\'s regional impact.',
      'Detail your metric tracking system for startup job creation and capital raised.',
      'Submit during the spring solicitation window on the SBA Portal.'
    ],
    officialWebsite: 'https://www.sba.gov/funding-programs/grants/growth-accelerator-fund-competition',
    insiderTips: [
      'Startups cannot apply directly for this prize. This is for organizations that run program accelerators helping startups.'
    ]
  },
  {
    id: 'doe-clean-energy',
    slug: 'doe-clean-energy',
    name: 'DOE Clean Energy Innovation Grants',
    agency: 'Department of Energy (DOE)',
    fundingAmount: '$200,000 to $2 Million+ (non-dilutive R&D)',
    fundingType: 'Grant',
    fundingDifficulty: 'Competitive',
    deadlineType: 'Multiple Windows',
    region: 'Federal',
    country: 'USA',
    description: 'Provides funding to develop, test, and validate clean energy technologies, carbon capture systems, grid storage solutions, and efficiency improvements.',
    eligibility: [
      'U.S. small businesses, national lab partners, or research centers',
      'Developing technologies matching DOE office solicitations',
      'Clear path to commercialization and carbon reduction'
    ],
    applicationProcess: [
      'Register on the DOE EERE Exchange platform.',
      'Prepare a detailed technical volume, commercialization roadmap, and budget justification.',
      'Submit during program-specific Funding Opportunity Announcements (FOAs).'
    ],
    officialWebsite: 'https://www.energy.gov/eere/funding/eere-funding-opportunities',
    insiderTips: [
      'Forming a collaborative partnership with a DOE National Laboratory (like NREL or Argonne) significantly improves review scores.'
    ]
  },

  // --- USA STATE LEVEL ---
  {
    id: 'california-competes-tax-credit',
    slug: 'california-competes-tax-credit',
    name: 'California Competes Tax Credit (CCTC)',
    agency: 'Governor\'s Office of Business and Economic Development (GO-Biz)',
    fundingAmount: '$50,000 to $5 Million+ (income tax credits)',
    fundingType: 'Tax Credit',
    fundingDifficulty: 'Competitive',
    deadlineType: 'Multiple Windows',
    region: 'California',
    country: 'USA',
    description: 'An income tax credit available to businesses that want to locate or grow in California, evaluated on job creation, salary levels, and capital investment.',
    eligibility: [
      'Businesses of any size planning expansion or hiring in California',
      'Commitment to net-new job creation and capital investments in the state',
      'Must apply during one of the three annual application periods'
    ],
    applicationProcess: [
      'Submit an online application detailing 5-year hiring and investment plans.',
      'Undergo phase-1 quantitative scoring based on salary-to-credit ratios.',
      'Undergo phase-2 evaluation by GO-Biz and sign the tax credit contract.'
    ],
    officialWebsite: 'https://business.ca.gov/california-competes-tax-credit/',
    insiderTips: [
      'This is not a cash grant. It is an income tax credit. Only apply if you have or expect a state corporate income tax liability.'
    ]
  },
  {
    id: 'texas-enterprise-fund',
    slug: 'texas-enterprise-fund',
    name: 'Texas Enterprise Fund (TEF)',
    agency: 'Texas Economic Development & Tourism',
    fundingAmount: '$100,000 to $1 Million+ (deal-closing cash grant)',
    fundingType: 'Grant',
    fundingDifficulty: 'Competitive',
    deadlineType: 'Rolling Intake',
    region: 'Texas',
    country: 'USA',
    description: 'Functions as a "deal-closing" incentive fund to attract expanding businesses to Texas over other competing out-of-state sites.',
    eligibility: [
      'Companies comparing Texas against an active out-of-state location',
      'Project creates a significant number of high-paying jobs in Texas',
      'Requires a formal resolution of support from local city/county government'
    ],
    applicationProcess: [
      'Contact the Governor\'s economic development office before choosing a site.',
      'Submit a formal application proving Texas is competing against another state.',
      'Negotiate terms and job metrics; undergo legislative approval.'
    ],
    officialWebsite: 'https://gov.texas.gov/business/page/texas-enterprise-fund',
    insiderTips: [
      'This is strictly a deal-closer. If you announce you are relocating to Texas BEFORE you apply, you are disqualified.'
    ]
  },
  {
    id: 'new-york-step',
    slug: 'new-york-step',
    name: 'Global NY State Trade Expansion Program (STEP)',
    agency: 'Empire State Development (ESD)',
    fundingAmount: 'Up to $10,000 (covers 70% of export costs)',
    fundingType: 'Grant',
    fundingDifficulty: 'Moderate',
    deadlineType: 'Rolling Intake',
    region: 'New York',
    country: 'USA',
    description: 'Helps New York small businesses enter or expand into international markets by offsetting costs for trade shows, translations, and global marketing campaigns.',
    eligibility: [
      'Incorporated in New York State and matches SBA small business size rules',
      'Product or service must have at least 51% U.S. content',
      'Operation has been active for at least one year with export potential'
    ],
    applicationProcess: [
      'Prepare quotes for eligible activities (e.g. registration invoices for global trade show).',
      'Submit an online application on the Empire State Development portal.',
      'Wait for approval before paying vendors; request reimbursement after the event.'
    ],
    officialWebsite: 'https://esd.ny.gov/global-ny-state-trade-expansion-program-step',
    insiderTips: [
      'This is a reimbursement grant. Keep detailed payment records, bank drafts, and proof of participation to successfully claim the cash.'
    ]
  },
  {
    id: 'ohio-tech-cred',
    slug: 'ohio-tech-cred',
    name: 'Ohio TechCred Program',
    agency: 'Ohio Development Services Agency',
    fundingAmount: 'Up to $30,000 (covers $2,000 per credential)',
    fundingType: 'Grant',
    fundingDifficulty: 'Low',
    deadlineType: 'Multiple Windows',
    region: 'Ohio',
    country: 'USA',
    description: 'Reimburses Ohio employers for the cost of training existing or new employees to earn industry-recognized technology credentials (e.g., AWS, PMP, Salesforce).',
    eligibility: [
      'Registered Ohio business with permanent physical operations',
      'Employees must earn an approved, technology-related credential',
      'Must apply during standard bimonthly application windows'
    ],
    applicationProcess: [
      'Identify employees and matching technology credentials from the approved list.',
      'Apply online before training begins.',
      'Upload proof of credential completion and invoices to request the $2,000 refund.'
    ],
    officialWebsite: 'https://techcred.ohio.gov/',
    insiderTips: [
      'This has one of the highest approval rates of any U.S. state program, running on bimonthly cycles. It is a great way to subsidize IT and project management certification.'
    ]
  },
  {
    id: 'illinois-edge',
    slug: 'illinois-edge',
    name: 'Illinois EDGE Tax Credit',
    agency: 'Illinois Department of Commerce & Economic Opportunity',
    fundingAmount: 'Corporate income tax credits based on payroll tax',
    fundingType: 'Tax Credit',
    fundingDifficulty: 'Moderate',
    deadlineType: 'Rolling Intake',
    region: 'Illinois',
    country: 'USA',
    description: 'Provides tax credits to expanding companies making investments and creating jobs in Illinois, calculated as a percentage of the state income tax withheld from new employees.',
    eligibility: [
      'Companies planning investment of at least $2.5 Million and creating 25 jobs',
      'Startups with under 100 employees must create at least 5 new jobs',
      'Project must demonstrate that without the credit, it would locate elsewhere'
    ],
    applicationProcess: [
      'Apply online before committing to an Illinois expansion site.',
      'DCEO analyzes the project\'s financial feasibility and economic impact.',
      'Execute the agreement and claim credits annually based on verified hires.'
    ],
    officialWebsite: 'https://dceo.illinois.gov/expandinillinois/incentives.html',
    insiderTips: [
      'Make sure you work closely with a DCEO coordinator. Startups with under 100 employees benefit from lowered job creation thresholds (only 5 new hires required).'
    ]
  }
];

export function getAllPrograms(): ProgramDetails[] {
  return programsDatabase;
}

export function getProgramBySlug(slug: string): ProgramDetails | undefined {
  return programsDatabase.find((p) => p.slug === slug);
}
