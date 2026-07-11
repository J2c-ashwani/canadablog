export type ProgramStatus =
  | 'Open or rolling'
  | 'Multiple active programs'
  | 'Opportunity-specific'
  | 'Research required before applying';

export interface OfficialSource {
  name: string;
  url: string;
  description: string;
}

export interface PriorityResearchProfile {
  route: string;
  seoTitle: string;
  seoDescription: string;
  expectedIntent: 'high' | 'medium' | 'low';
  reviewedBy: string;
  reviewerRole: string;
  lastVerified: string;
  programStatus: ProgramStatus;
  statusSummary: string;
  decisionSummary: string;
  shortAnswerQuestion: string;
  shortAnswer: string;
  verificationNotes: string[];
  officialSources: OfficialSource[];
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    buttonText: string;
    href: string;
    supportingPoints: string[];
  };
  faq?: { question: string; answer: string }[];
}

const REVIEWED_BY = 'Ashwani K.';
const REVIEWER_ROLE = 'FSI Digital Funding Research';
const LAST_VERIFIED = '2026-06-06';

const profiles: Record<string, PriorityResearchProfile> = {
  '/usa/new-york': {
    route: '/usa/new-york',
    seoTitle: 'New York Business Grants & Incentives: Get 10 Years Tax-Free',
    seoDescription: 'Research New York business grants, startup funding, and tax credits in 2026. Learn how to qualify for up to $250K matching funds and 10-year tax exemptions.',
    expectedIntent: 'medium',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: '2026-07-11',
    programStatus: 'Multiple active programs',
    statusSummary: 'New York operates a portfolio of financing, innovation, export, and technical-assistance programs. Availability and intake rules differ by program.',
    decisionSummary: 'Start with the project you need to fund, then match it to the correct state, federal, or local route. Do not assume every incentive is a cash grant.',
    shortAnswerQuestion: 'Which New York business funding programs should a company evaluate first?',
    shortAnswer: 'New York businesses should begin with Empire State Development’s Small Business Hub, then evaluate financing, innovation, export, and technical-assistance programs based on the project, company stage, location, and eligible costs. Many options are loans, equity investments, tax incentives, or advisory support rather than unrestricted grants.',
    verificationNotes: [
      'Empire State Development is the controlling source for state program availability and eligibility.',
      'The right route depends on whether the project involves expansion, innovation, exporting, working capital, or technical assistance.',
      'Applicants should confirm the current intake status before committing project costs.',
    ],
    officialSources: [
      {
        name: 'Empire State Development Small Business Hub',
        url: 'https://www.esd.ny.gov/doing-business-ny/small-business-hub',
        description: 'Official directory of New York small-business programs and support.',
      },
      {
        name: 'Empire State Development Innovation & Technology',
        url: 'https://esd.ny.gov/innovation-technology',
        description: 'Official overview of New York innovation and technology initiatives.',
      },
      {
        name: 'Global NY STEP',
        url: 'https://esd.ny.gov/global-ny-state-trade-expansion-program-step',
        description: 'Official information for New York export-assistance opportunities.',
      },
    ],
    cta: {
      eyebrow: 'New York funding strategy',
      title: 'Find and Stack New York Business Grants',
      description: 'Find out which state-backed grants, loans, and tax credits your business qualifies for in under 60 seconds.',
      buttonText: 'Start Free Eligibility Assessment',
      href: '/portfolio?focus=new-york',
      supportingPoints: ['Project-to-program fit', 'Eligible-cost review', 'Priority application sequence'],
    },
    faq: [
      {
        question: "What is Empire State Development (ESD)?",
        answer: "Empire State Development is New York's chief economic development agency, administering state-backed business funding, loans, and tax credits."
      },
      {
        question: "Who qualifies for New York business grants?",
        answer: "Qualifications vary, but typically require a registered New York business entity, local physical presence, and alignment with target industries like tech, manufacturing, or agriculture."
      },
      {
        question: "What is the Global NY STEP program?",
        answer: "The State Trade Expansion Program (STEP) helps New York small businesses enter or expand in international markets with export grants of up to $10,000."
      }
    ]
  },
  '/usa/california': {
    route: '/usa/california',
    seoTitle: 'California Government Grants & Funding for Businesses (2026)',
    seoDescription: 'Access active California state and federal grants, SBA loans, and tax credits. Use our free tool to check your business eligibility in 60 seconds.',
    expectedIntent: 'medium',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: LAST_VERIFIED,
    programStatus: 'Multiple active programs',
    statusSummary: 'California support spans incentives, tax credits, technical assistance, capital access, and targeted grant programs. Intake schedules vary.',
    decisionSummary: 'California companies should match the project to the correct incentive or assistance channel and verify the current application window before planning around an award.',
    shortAnswerQuestion: 'How should a California business search for grants and incentives?',
    shortAnswer: 'Start with GO-Biz and the California Office of the Small Business Advocate, then narrow the search by project type: expansion, job creation, innovation, technical assistance, or capital access. California support is delivered through several structures, so verify whether an opportunity is a grant, tax credit, financing program, or advisory service.',
    verificationNotes: [
      'GO-Biz and CalOSBA are the primary state sources for business resources and incentives.',
      'Many California programs are competitive, targeted, or delivered through partner organizations.',
      'Program budgets, deadlines, and eligible activities should be checked at the official source.',
    ],
    officialSources: [
      {
        name: 'California Small Business, Innovation & Entrepreneurship',
        url: 'https://business.ca.gov/resources/small-business-innovation-and-entrepreneurship/',
        description: 'Official CalOSBA resources for small businesses and innovative startups.',
      },
      {
        name: 'California Business Incentives',
        url: 'https://business.ca.gov/advantages/incentives/',
        description: 'Official GO-Biz overview of California business incentives.',
      },
      {
        name: 'California Competes Tax Credit',
        url: 'https://business.ca.gov/california-competes-tax-credit/',
        description: 'Official information for the California Competes incentive.',
      },
    ],
    cta: {
      eyebrow: 'Check Your Eligibility in 60 Seconds',
      title: 'Businesses similar to yours may qualify for funding',
      description: 'Evaluate active California state and federal government grants, tax credits, and capital programs matching your business profile.',
      buttonText: 'Start Free Assessment',
      href: '/portfolio?focus=california',
      supportingPoints: ['Grants & Tax Credits', 'Hiring & Wage Incentives', 'Capital Programs'],
    },
    faq: [
      {
        question: "What is California Go-Biz?",
        answer: "The Governor's Office of Business and Economic Development (GO-Biz) is California's leader for job growth, tax incentives, and business resources."
      },
      {
        question: "How much funding can a California business get?",
        answer: "Funding ranges from $2,000 for training grants under TechCred to $5,000,000+ for high-impact tax credits like the California Competes Tax Credit."
      },
      {
        question: "Are California business grants non-repayable?",
        answer: "Yes, state-backed grants are typically non-repayable, while state-backed loans must be repaid according to program terms."
      }
    ]
  },
  '/blog/quebec-small-business-grants-guide': {
    route: '/blog/quebec-small-business-grants-guide',
    seoTitle: 'Quebec Small Business Grants Guide (2026 Intakes & News)',
    seoDescription: 'Looking for small business grants in Quebec? Discover active provincial programs, eligibility criteria, and step-by-step application tips to secure funding.',
    expectedIntent: 'medium',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: LAST_VERIFIED,
    programStatus: 'Multiple active programs',
    statusSummary: 'Quebec businesses can evaluate federal regional-development programs, provincial tax measures, and financing routes. Eligibility and intake status are program-specific.',
    decisionSummary: 'The strongest Quebec funding plan often combines the right financing or contribution program with applicable tax measures instead of relying on a single grant.',
    shortAnswerQuestion: 'Which funding routes should a Quebec small business evaluate first?',
    shortAnswer: 'Quebec businesses should compare Canada Economic Development programs, relevant provincial tax credits, and financing from provincial or regional partners based on the project’s location, eligible costs, innovation level, and expected economic impact. Confirm whether assistance is repayable and whether approval is required before spending.',
    verificationNotes: [
      'Canada Economic Development for Quebec Regions lists current federal regional programs and intake status.',
      'Quebec tax credits have detailed activity, entity, and documentation rules.',
      'Some financial assistance is repayable; the official program terms control.',
    ],
    officialSources: [
      {
        name: 'Canada Economic Development for Quebec Regions',
        url: 'https://www.canada.ca/ced',
        description: 'Official directory of CED financing and services for Quebec.',
      },
      {
        name: 'Quebec Economic Development Program',
        url: 'https://www.canada.ca/en/economic-development-quebec-regions/financing-services/qedp.html',
        description: 'Official QEDP status, objectives, and eligibility direction.',
      },
      {
        name: 'Gouvernement du Québec Business Taxation',
        url: 'https://www.quebec.ca/en/businesses-and-self-employed-workers/manage-finances/business-taxation',
        description: 'Official directory of Quebec business tax measures and credits.',
      },
    ],
    cta: {
      eyebrow: 'Check Your Eligibility in 60 Seconds',
      title: 'Businesses similar to yours may qualify for funding',
      description: 'Evaluate active Quebec and federal government grants, tax credits, and regional financing matching your business profile.',
      buttonText: 'Start Free Assessment',
      href: '/portfolio?focus=quebec',
      supportingPoints: ['Grants & Tax Credits', 'Hiring & Wage Incentives', 'Export & Regional Funding'],
    },
    faq: [
      {
        question: "What is the main government funding agency in Quebec?",
        answer: "Canada Economic Development for Quebec Regions (CED) administers federal funding, while Investissement Québec manages provincial loans and incentives."
      },
      {
        question: "Are Quebec business tax credits stackable?",
        answer: "Yes, Quebec businesses can stack provincial tax measures (like scientific research credits) with federal programs like SR&ED."
      },
      {
        question: "Do Quebec business grants require match funding?",
        answer: "Most Quebec grants cover 50% to 75% of eligible project costs, meaning the business must fund the remaining portion."
      }
    ]
  },
  '/blog/nih-sbir-biotech-grants': {
    route: '/blog/nih-sbir-biotech-grants',
    seoTitle: 'NIH SBIR/STTR for Biotech: Eligibility & Application Guide',
    seoDescription: 'Assess NIH SBIR/STTR fit for biotech, medical-device, and digital-health R&D. Includes eligibility, due-date guidance, and official NIH SEED sources.',
    expectedIntent: 'high',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: LAST_VERIFIED,
    programStatus: 'Opportunity-specific',
    statusSummary: 'NIH advertises SBIR/STTR support through notices of funding opportunities. Standard due dates exist, but the active notice and participating institute control.',
    decisionSummary: 'A credible NIH application starts with company eligibility, institute fit, a defensible research plan, and a commercialization path—not an assumed award amount.',
    shortAnswerQuestion: 'How should a biotech or digital-health company approach NIH SBIR/STTR funding?',
    shortAnswer: 'NIH SBIR/STTR is designed for eligible U.S. small businesses developing health-related innovations through research and development. Begin by confirming company eligibility, matching the project to a participating NIH institute and active notice, and planning for the registrations, scientific review criteria, budget rules, and commercialization evidence required by that opportunity.',
    verificationNotes: [
      'NIH states that SBIR/STTR applications are accepted three times a year, with opportunity-specific exceptions.',
      'Most small-business applications use parent announcements, while targeted notices may have different requirements.',
      'The active NIH notice and participating institute are the controlling sources for dates, budget, and scope.',
    ],
    officialSources: [
      {
        name: 'NIH SBIR/STTR Funding Opportunities',
        url: 'https://seed.nih.gov/small-business-funding/find-funding/sbir-sttr-funding-opportunities',
        description: 'Official NIH notices, due-date guidance, and opportunity information.',
      },
      {
        name: 'NIH SBIR/STTR Eligibility Criteria',
        url: 'https://seed.nih.gov/small-business-funding/getting-started/eligibility-criteria',
        description: 'Official NIH small-business eligibility guidance.',
      },
      {
        name: 'Understanding NIH SBIR and STTR',
        url: 'https://seed.nih.gov/small-business-funding/how-we-can-help-you/understanding-sbir-sttr',
        description: 'Official explanation of the NIH programs and phases.',
      },
    ],
    cta: {
      eyebrow: 'Check Your Eligibility in 60 Seconds',
      title: 'Businesses similar to yours may qualify for funding',
      description: 'Evaluate active NIH SBIR/STTR notices, matching institutes, and R&D eligibility requirements matching your business profile.',
      buttonText: 'Start Free Assessment',
      href: '/portfolio?focus=nih-sbir',
      supportingPoints: ['Grants & STTR Partnerships', 'R&D Tax Credits', 'Hiring Incentives'],
    },
    faq: [
      {
        question: "What is NIH SBIR?",
        answer: "The NIH Small Business Innovation Research (SBIR) program is a highly competitive, federal grant program that encourages domestic small businesses to engage in health-related Research and Development (R&D) with the potential for commercialization."
      },
      {
        question: "Who qualifies for NIH SBIR?",
        answer: "To qualify, the applicant must be a for-profit U.S. small business (fewer than 500 employees), with work performed entirely in the United States, and the primary investigator must be primarily employed by the small business at the time of award."
      },
      {
        question: "How much funding can NIH SBIR provide?",
        answer: "Typically, NIH SBIR Phase I awards range up to $300,000 for feasibility studies (6-12 months), while Phase II awards for full R&D and prototyping can reach up to $2,000,000+ (2 years), depending on the specific NIH institute and topic waiver eligibility."
      },
      {
        question: "What is the NIH SBIR deadline?",
        answer: "NIH SBIR/STTR applications are accepted under standard parent announcements three times per year: January 5, April 5, and September 5. Targeted notices may have separate specific deadlines."
      }
    ]
  },
  '/blog/nsf-sbir-grants-technology-startups': {
    route: '/blog/nsf-sbir-grants-technology-startups',
    seoTitle: 'NSF SBIR/STTR for Startups: Project Pitch & Eligibility',
    seoDescription: 'Assess NSF SBIR/STTR fit, Project Pitch readiness, technical-risk evidence, and commercialization potential using official NSF Seed Fund sources.',
    expectedIntent: 'high',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: LAST_VERIFIED,
    programStatus: 'Research required before applying',
    statusSummary: 'NSF requires founders to assess project fit and submit a Project Pitch before an invited full proposal. Technical innovation and market potential are central.',
    decisionSummary: 'NSF is a fit for high-risk, defensible R&D with meaningful commercial potential—not routine product development or incremental engineering.',
    shortAnswerQuestion: 'What makes a startup a credible fit for NSF SBIR/STTR?',
    shortAnswer: 'A strong NSF SBIR/STTR candidate is an eligible U.S. small business pursuing risky, unproven R&D around a differentiated technology with significant market potential. The team should first test project fit, then submit a concise Project Pitch; only invited companies proceed to a full proposal.',
    verificationNotes: [
      'NSF evaluates technological innovation, high-risk R&D, impact, competitive advantage, market potential, and team capability.',
      'The Project Pitch is the required screening step before a full proposal invitation.',
      'NSF states that straightforward engineering and incremental product development are not a fit.',
    ],
    officialSources: [
      {
        name: 'NSF Seed Fund: The Basics',
        url: 'https://seedfund.nsf.gov/apply/the-basics/',
        description: 'Official NSF project-fit criteria and application pathway.',
      },
      {
        name: 'NSF Project Pitch',
        url: 'https://seedfund.nsf.gov/apply/project-pitch/',
        description: 'Official instructions for the required Project Pitch.',
      },
      {
        name: 'NSF Solicitation Information',
        url: 'https://seedfund.nsf.gov/resources/solicitation/',
        description: 'Official proposal and solicitation information.',
      },
    ],
    cta: {
      eyebrow: 'Check Your Eligibility in 60 Seconds',
      title: 'Businesses similar to yours may qualify for funding',
      description: 'Evaluate NSF SBIR/STTR project-pitch readiness and R&D eligibility requirements matching your business profile.',
      buttonText: 'Start Free Assessment',
      href: '/portfolio?focus=nsf-sbir',
      supportingPoints: ['Grants & Project Pitch Fit', 'Hiring Incentives', 'Export Funding'],
    },
    faq: [
      {
        question: "What is NSF SBIR?",
        answer: "The National Science Foundation (NSF) Small Business Innovation Research program, also known as America's Seed Fund, provides non-dilutive funding to startups and small businesses to develop high-risk, high-impact scientific and technological innovations."
      },
      {
        question: "Can startups apply?",
        answer: "Yes, the program is specifically designed for startups. However, all applicants must first submit a 3-page Project Pitch. Only if the NSF invites your pitch can you submit a full Phase I proposal."
      },
      {
        question: "What are the funding limits?",
        answer: "NSF SBIR Phase I awards provide up to $275,000 for 6-12 months of early-stage R&D. Invited Phase I awardees are eligible to apply for Phase II funding of up to $1,000,000 for prototype development, with potential matching grants up to an additional $500,000."
      }
    ]
  },
  '/usa/technology-startup-grants': {
    route: '/usa/technology-startup-grants',
    seoTitle: 'U.S. Technology Startup Funding: SBIR/STTR Agency Guide',
    seoDescription: 'Compare U.S. SBIR/STTR routes for technology startups and learn how agency fit, technical risk, eligibility, and active solicitations shape the funding path.',
    expectedIntent: 'high',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: LAST_VERIFIED,
    programStatus: 'Opportunity-specific',
    statusSummary: 'America’s Seed Fund is coordinated by the SBA and delivered by participating federal agencies. Each agency controls its own topics, solicitations, and awards.',
    decisionSummary: 'Choose the agency whose mission and active solicitation fit the technology. Do not select a program based only on the largest advertised award.',
    shortAnswerQuestion: 'Which federal funding route fits a U.S. technology startup?',
    shortAnswer: 'U.S. technology startups should compare SBIR/STTR agencies by mission fit, active solicitation, technical-risk profile, eligibility, and commercialization path. America’s Seed Fund is coordinated by the SBA, but each participating agency manages its own program and selects qualified proposals.',
    verificationNotes: [
      'The SBA coordinates America’s Seed Fund across participating federal agencies.',
      'Each agency administers its own SBIR/STTR program and solicitation process.',
      'Award limits and active opportunities must be confirmed at the agency or SBIR.gov source.',
    ],
    officialSources: [
      {
        name: 'SBIR.gov Program Overview',
        url: 'https://www.sbir.gov/about',
        description: 'Official overview of America’s Seed Fund and participating agencies.',
      },
      {
        name: 'SBIR.gov Topics and Solicitations',
        url: 'https://www.sbir.gov/topics',
        description: 'Official search for active agency topics and solicitations.',
      },
      {
        name: 'NSF Seed Fund: The Basics',
        url: 'https://seedfund.nsf.gov/apply/the-basics/',
        description: 'Official example of agency-specific fit and review criteria.',
      },
    ],
    cta: {
      eyebrow: 'Check Your Eligibility in 60 Seconds',
      title: 'Businesses similar to yours may qualify for funding',
      description: 'Evaluate active federal SBIR/STTR agency topics and tech startup incentives matching your profile.',
      buttonText: 'Start Free Assessment',
      href: '/portfolio?focus=tech-startup',
      supportingPoints: ['Grants & Tax Credits', 'Hiring Incentives', 'Export Funding'],
    },
    faq: [
      {
        question: "Which federal agencies participate in SBIR?",
        answer: "There are 11 participating federal agencies, including the Department of Defense (DoD), Department of Health and Human Services (NIH), National Science Foundation (NSF), Department of Energy (DOE), and NASA."
      },
      {
        question: "What is the difference between SBIR and STTR?",
        answer: "SBIR requires the primary investigator to be primarily employed by the small business and permits outsourcing up to 33% in Phase I. STTR requires the small business to formally partner with a non-profit research institution, which must perform at least 30% of the work, and employment rules are more flexible."
      },
      {
        question: "Do startups need to be incorporated to apply?",
        answer: "While you don't need to be incorporated to submit a Project Pitch (for NSF), you must be a registered, for-profit U.S. small business entity at the time of the full proposal submission and award."
      }
    ]
  },
  '/usa/ohio': {
    route: '/usa/ohio',
    seoTitle: 'Ohio Business Grants & Incentives: 2026 Research Guide',
    seoDescription: 'Research Ohio small-business incentives, state tax credits, Job Creation Tax Credit, and JobsOhio programs using official state sources.',
    expectedIntent: 'medium',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: LAST_VERIFIED,
    programStatus: 'Multiple active programs',
    statusSummary: 'Ohio funding options include state-backed JobsOhio grants, TechCred workforce incentives, and regional capital access programs. Deadlines and rules vary.',
    decisionSummary: 'Identify whether you meet physical job creation criteria in Ohio or need workforce-only support like TechCred before selecting a program.',
    shortAnswerQuestion: 'What are the most accessible business funding programs in Ohio?',
    shortAnswer: 'Ohio businesses should look first at TechCred for upskilling reimbursements (up to $2,000 per employee) and the JobsOhio Inclusion Grant (up to $50,000) for eligible businesses in distressed areas or underrepresented ownership. Growth-stage companies creating jobs should evaluate the JobsOhio Growth Fund or Job Creation Tax Credit.',
    verificationNotes: [
      'JobsOhio is a private economic development corporation, not a state agency, enabling faster negotiations.',
      'State tax incentives, like the Job Creation Tax Credit, are refundable and require approval before hiring.',
      'Workforce training reimbursements under TechCred open in bimonthly application windows.',
    ],
    officialSources: [
      {
        name: 'JobsOhio Programs and Services',
        url: 'https://www.jobsohio.com/programs-services',
        description: 'Official directory of JobsOhio business grants and loans.',
      },
      {
        name: 'Ohio Department of Development State Incentives',
        url: 'https://development.ohio.gov/business/state-incentives',
        description: 'Official listing of state tax credits, grants, and support.',
      },
      {
        name: 'Ohio TechCred Portal',
        url: 'https://techcred.ohio.gov',
        description: 'Official portal for workforce credentialing grants.',
      },
    ],
    cta: {
      eyebrow: 'Ohio business expansion',
      title: "Navigate Ohio's private economic development programs",
      description: 'Let our funding specialists review your project plan to target the right JobsOhio or state incentive package.',
      buttonText: 'Request an Eligibility & Expansion Review',
      href: '/contact?service=ohio-funding-review',
      supportingPoints: ['JobsOhio qualification criteria', 'TechCred credential alignment', 'Local tax abatement options'],
    },
  },
  '/blog/nasa-sbir-space-tech-grants': {
    route: '/blog/nasa-sbir-space-tech-grants',
    seoTitle: 'NASA SBIR/STTR Grants: 2026 Space & Aerospace R&D Guide',
    seoDescription: 'Complete guide to NASA SBIR/STTR grants for satellites, aeronautics, robotics, and deep-tech innovation. Phase I up to $225K, Phase II up to $1.275M.',
    expectedIntent: 'high',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: LAST_VERIFIED,
    programStatus: 'Opportunity-specific',
    statusSummary: 'NASA releases annual SBIR/STTR solicitations with very specific subtopics. Proposals must address a specific NASA technology need.',
    decisionSummary: 'Do not submit a generic space tech idea. Ensure your R&D maps directly to one of the active NASA subtopics in the current solicitation.',
    shortAnswerQuestion: 'What are the funding limits and rules for NASA SBIR/STTR grants?',
    shortAnswer: 'For 2026, NASA has increased Phase I SBIR/STTR awards to up to $225,000 for feasibility studies (6 to 13 months) and Phase II awards to up to $1,275,000 for prototype development (24 months). Funding is 100% non-dilutive, and the small business retains intellectual property rights.',
    verificationNotes: [
      'Phase I award caps were increased by 50% for 2026 from the historical $150K limit.',
      'Proposal subtopic alignment is the single most critical factor in NASA\'s technical review.',
      'Collaborations with research institutions under STTR require the small business to perform at least 40% of the work.',
    ],
    officialSources: [
      {
        name: 'NASA SBIR/STTR Program Website',
        url: 'https://sbir.nasa.gov/',
        description: 'Official homepage for NASA small business innovation programs.',
      },
      {
        name: 'SBIR.gov NASA Agency Profile',
        url: 'https://www.sbir.gov/agency/nasa',
        description: 'Official federal directory of NASA solicitation topics and awards.',
      },
      {
        name: 'SAM.gov Federal Contracting Search',
        url: 'https://sam.gov',
        description: 'Official system for federal registrations required for SBIR awards.',
      },
    ],
    cta: {
      eyebrow: 'NASA R&D funding alignment',
      title: 'Evaluate your space technology against active NASA subtopics',
      description: 'A technical evaluation will pressure-test your research case and identify alignment with active NASA needs.',
      buttonText: 'Request a Technical Funding Review',
      href: '/contact?service=nasa-sbir-technical-review',
      supportingPoints: ['NASA subtopic fit review', 'R&D risk and milestone mapping', 'Required registration readiness'],
    },
  },
  '/blog/dod-sbir-defense-tech-grants': {
    route: '/blog/dod-sbir-defense-tech-grants',
    seoTitle: 'DoD SBIR/STTR Defense Tech Grants: 2026 Acquisition Guide',
    seoDescription: 'Learn how to access Department of Defense SBIR/STTR funding for defense and dual-use startups. Phase I up to $323K, Phase II up to $2.15M.',
    expectedIntent: 'high',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: LAST_VERIFIED,
    programStatus: 'Opportunity-specific',
    statusSummary: 'The DoD releases multiple SBIR/STTR instructions annually across Army, Navy, Air Force, DARPA, and other components. Budgets and caps are component-specific.',
    decisionSummary: 'Evaluate DoD solicitations based on whether your technology has a clear dual-use (commercial and military) application and a target component sponsor.',
    shortAnswerQuestion: 'How much funding does the DoD SBIR program provide and who qualifies?',
    shortAnswer: 'The DoD SBIR program provides non-dilutive funding, with 2026 statutory caps set up to $323,090 for Phase I (feasibility) and up to $2,153,927 for Phase II (prototype development). Individual component opportunities may have lower or higher limits. Startups must be U.S.-owned, for-profit, and have under 500 employees.',
    verificationNotes: [
      'DoD is the largest SBIR agency, awarding over $1.8 billion annually to small businesses.',
      'Proposals are submitted through the Defense SBIR/STTR Innovation Portal (DSIP).',
      'Success requires matching your technology to specific component needs and seeking commercial dual-use partners.',
    ],
    officialSources: [
      {
        name: 'Defense SBIR/STTR Innovation Portal (DSIP)',
        url: 'https://www.dodsbirsttr.mil/',
        description: 'Official gateway for DoD solicitations, instructions, and proposals.',
      },
      {
        name: 'SBIR.gov DoD Agency Profile',
        url: 'https://www.sbir.gov/agency/department-of-defense',
        description: 'Official federal directory of DoD SBIR/STTR topics and programs.',
      },
    ],
    cta: {
      eyebrow: 'Defense innovation strategy',
      title: 'Navigate DoD component BAAs and dual-use requirements',
      description: 'We assess your technology\'s military and commercial fit to identify target solicitations and structure your proposal.',
      buttonText: 'Request a Technical Funding Review',
      href: '/contact?service=dod-sbir-technical-review',
      supportingPoints: ['DoD component topic matching', 'Dual-use commercialization roadmap', 'DSIP registration check'],
    },
  },
  '/blog/canada-startup-funding-grants-guide': {
    route: '/blog/canada-startup-funding-grants-guide',
    seoTitle: 'Canada Startup Funding: 2026 Grants & Venture Financing Guide',
    seoDescription: 'Compare Canadian government startup grants, BDC financing, Futurpreneur loans, and tax credits. Reviewed against official government portals.',
    expectedIntent: 'medium',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: LAST_VERIFIED,
    programStatus: 'Multiple active programs',
    statusSummary: 'Canada startup support includes federal non-repayable grants, risk-sharing business loans, provincial incentives, and the new Canadian Tech Growth Fund. Eligibility is project-specific.',
    decisionSummary: 'Design a funding stack combining non-repayable hiring grants, BDC or Futurpreneur loans, and SR&ED tax credits rather than relying on a single grant.',
    shortAnswerQuestion: 'What are the primary government funding options for Canadian startups?',
    shortAnswer: 'Canadian startups can access the Canada Small Business Financing Program (CSBFP) for loans up to $1.15 million (with $150K lines of credit for working capital), Futurpreneur loans up to $75,000 for young founders, and specialized R&D grants like NRC IRAP. Startups should also evaluate the Scientific Research & Experimental Development (SR&ED) tax credit.',
    verificationNotes: [
      'The CSBFP was updated to support intangible assets and software development costs up to $150,000.',
      'Futurpreneur provides combined loans and mentor support for founders aged 18 to 39.',
      'Innovation Canada\'s Funding Finder is the official directory to filter opportunities by industry and stage.',
    ],
    officialSources: [
      {
        name: 'Innovation Canada Funding Finder',
        url: 'https://ised-isde.canada.ca/site/innovation-canada/en',
        description: 'Official search engine for federal and provincial business programs.',
      },
      {
        name: 'Canada Small Business Financing Program',
        url: 'https://ised-isde.canada.ca/site/canada-small-business-financing-program/en',
        description: 'Official guide to government-backed business loans.',
      },
      {
        name: 'Futurpreneur Canada',
        url: 'https://www.futurpreneur.ca/',
        description: 'Official portal for youth startup financing and mentoring.',
      },
    ],
    cta: {
      eyebrow: 'Canadian startup capital',
      title: 'Build a non-dilutive funding stack for your Canadian startup',
      description: 'Our specialists help you evaluate hiring grants, innovation support, and CSBFP routes for your business.',
      buttonText: 'Request a Startup Funding Review',
      href: '/contact?service=canada-startup-review',
      supportingPoints: ['Hiring and training grant match', 'CSBFP and Futurpreneur readiness', 'SR&ED tax credit integration'],
    },
  },
  '/blog/canada-irap-grants-2026': {
    route: '/blog/canada-irap-grants-2026',
    seoTitle: 'Canada IRAP Grants 2026: Industrial Research Assistance Guide',
    seoDescription: 'Evaluate NRC IRAP funding for Canadian technology R&D. Learn about eligibility, ITA engagement, salary subsidies, and funding limits.',
    expectedIntent: 'high',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: LAST_VERIFIED,
    programStatus: 'Research required before applying',
    statusSummary: 'NRC IRAP provides non-repayable financial support and technical advice for product development. Funding is accessed through direct engagement with an Industrial Technology Advisor.',
    decisionSummary: 'IRAP is not an open grant application portal. You must build a relationship with an ITA and pitch a high-risk technical project to secure funding.',
    shortAnswerQuestion: 'How does a company apply for NRC IRAP funding in Canada?',
    shortAnswer: 'Incorporated, for-profit Canadian SMEs with fewer than 500 employees can apply. Start by calling the NRC at 1-877-994-4727 to discuss your project. If it aligns, you will be assigned an Industrial Technology Advisor (ITA) who will guide you through proposal submission. Funding typically covers 60-80% of technical salaries.',
    verificationNotes: [
      'IRAP is relationship-based and does not accept unsolicited online applications.',
      'Funding is paid out on a reimbursement basis against verified monthly technical payroll logs.',
      'Project sizes typically range from $50,000 to $500,000, but major initiatives can secure up to $10 million.',
    ],
    officialSources: [
      {
        name: 'NRC Industrial Research Assistance Program',
        url: 'https://nrc.canada.ca/en/support-technology-innovation/industrial-research-assistance-program',
        description: 'Official homepage detailing IRAP support, contacts, and eligibility.',
      },
      {
        name: 'Innovation Canada Business Benefits Finder',
        url: 'https://ised-isde.canada.ca/site/innovation-canada/en',
        description: 'Official listing of federal R&D resources.',
      },
    ],
    cta: {
      eyebrow: 'Canada R&D capital',
      title: 'Assess your IRAP project fit and ITA pitch strategy',
      description: 'Ensure your technical proposal aligns with ITA requirements and is structured for maximum salary reimbursement.',
      buttonText: 'Request an IRAP & R&D Readiness Review',
      href: '/contact?service=canada-irap-review',
      supportingPoints: ['Technical R&D project scoping', 'ITA pitch readiness checklist', 'Salary subsidy optimization'],
    },
  },
  '/blog/sba-microloans-complete-guide': {
    route: '/blog/sba-microloans-complete-guide',
    seoTitle: 'SBA Microloan Program: 2026 Complete Lending Guide',
    seoDescription: 'Learn about the SBA Microloan program for working capital and equipment. Understand limits, average loan sizes, interest rates, and intermediary lenders.',
    expectedIntent: 'high',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: LAST_VERIFIED,
    programStatus: 'Multiple active programs',
    statusSummary: 'The SBA Microloan program offers working capital and expansion financing through local community-based nonprofit lenders. Rules and terms are lender-specific.',
    decisionSummary: 'Identify a local SBA-approved intermediary lender and prepare a detailed business plan with a use-of-funds schedule before applying.',
    shortAnswerQuestion: 'What are the rules and caps for the SBA Microloan program?',
    shortAnswer: 'The SBA Microloan program provides loans up to $50,000 for small businesses and startup founders. The average loan size is around $13,000 to $16,000. Funds can be used for working capital, inventory, fixtures, and equipment, but cannot pay off existing debt or purchase real estate.',
    verificationNotes: [
      'The maximum loan amount is statutorily capped at $50,000.',
      'Loans are issued and underwritten by local nonprofit intermediaries, not the SBA directly.',
      'Interest rates typically range between 6% and 13%, depending on the intermediary lender.',
    ],
    officialSources: [
      {
        name: 'SBA Microloan Program Guidelines',
        url: 'https://www.sba.gov/funding-programs/loans/microloans',
        description: 'Official SBA program overview, terms, and requirements.',
      },
      {
        name: 'SBA Local Assistance Partner Search',
        url: 'https://www.sba.gov/local-assistance',
        description: 'Official directory to find SBA-approved local intermediary lenders.',
      },
    ],
    cta: {
      eyebrow: 'US working capital',
      title: 'Organize your business plan and financials for SBA lending',
      description: 'We help you build a lender-ready loan package and identify the local intermediary lenders best suited for your business.',
      buttonText: 'Request a Microloan & Capital Review',
      href: '/contact?service=sba-microloan-review',
      supportingPoints: ['Business plan and projection prep', 'Intermediary lender shortlist', 'SBA compliance validation'],
    },
  },

  // --- 10 NEW PROFILES ---
  '/blog/colorado-tech-programs': {
    route: '/blog/colorado-tech-programs',
    seoTitle: 'Colorado Tech Startup Grants 2026: Get Up to $250K',
    seoDescription: 'Colorado\'s Advanced Industries program gives startups up to $250K in early-stage capital. Plus the 35% Investment Tax Credit and SBIR state matching.',
    expectedIntent: 'high',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: '2026-06-11',
    programStatus: 'Multiple active programs',
    statusSummary: 'Colorado\'s Advanced Industries Accelerator program offers proof-of-concept, early-stage capital, and retention grants alongside state matching.',
    decisionSummary: 'Apply for early-stage capital up to $250K or proof-of-concept grants up to $150K. Align your tech with the state\'s seven designated advanced industries.',
    shortAnswerQuestion: 'How can tech startups secure Colorado state grants?',
    shortAnswer: 'Eligible startups in advanced industries like aerospace, bioscience, and energy can secure up to $250,000 via the Advanced Industries Accelerator. Companies should also stack the 35% Investment Tax Credit for rural zones and SBIR matching.',
    verificationNotes: [
      'Advanced Industries program requires a 2:1 matching fund contribution for early-stage capital.',
      'Seven designated sectors include aerospace, bioscience, electronics, energy, engineering, IT, and manufacturing.',
      'Next cycle deadline matches standard semi-annual intakes (typically March and September).',
    ],
    officialSources: [
      {
        name: 'Colorado Office of Economic Development (OEDIT)',
        url: 'https://oedit.colorado.gov/advanced-industries-accelerator-programs',
        description: 'Official state portal for Advanced Industries Accelerator grants.',
      },
    ],
    cta: {
      eyebrow: 'Colorado tech grants',
      title: 'Check your eligibility for Colorado startup grants',
      description: 'See if your technology project qualifies for Colorado state matching, early-stage grants, and tax credits.',
      buttonText: 'Start Free Assessment',
      href: '/portfolio?focus=tech-startup',
      supportingPoints: ['Advanced Industries fit check', 'Matching fund review', 'SBIR state matching eligibility'],
    },
  },
  '/blog/usda-sbir-agtech-grants': {
    route: '/blog/usda-sbir-agtech-grants',
    seoTitle: 'USDA SBIR AgTech Grants 2026: Get Up to $575K',
    seoDescription: 'Discover how AgTech startups can access up to $575K in non-dilutive R&D funding from the USDA SBIR/STTR program.',
    expectedIntent: 'high',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: '2026-06-11',
    programStatus: 'Opportunity-specific',
    statusSummary: 'USDA NIFA opens the SBIR/STTR phase I solicitation annually (typically mid-summer), followed by phase II invitations for successful awardees.',
    decisionSummary: 'Agtech, food safety, and forestry innovators should align their R&D with USDA topic areas and prepare their Phase I proposals for the annual fall deadline.',
    shortAnswerQuestion: 'What is the funding limit and focus for USDA SBIR grants?',
    shortAnswer: 'The USDA SBIR/STTR program provides up to $125,000 for Phase I feasibility studies and up to $450,000 (totaling up to $575,000) for Phase II commercialization. Funding is restricted to novel R&D in agricultural tech, precision farming, food safety, and rural development.',
    verificationNotes: [
      'Phase I grants are up to $125,000 with a 8-month duration; Phase II up to $450,000 over 24 months.',
      'Unlike other SBIR programs, USDA strongly encourages agricultural and rural community benefits.',
      'Applications must be submitted via Grants.gov and require SAM.gov registration.',
    ],
    officialSources: [
      {
        name: 'USDA NIFA SBIR Program',
        url: 'https://nifa.usda.gov/grants/programs/small-business-innovation-research-program',
        description: 'Official portal for USDA AgTech and food sciences R&D funding.',
      },
    ],
    cta: {
      eyebrow: 'USDA AgTech funding',
      title: 'Evaluate your AgTech project for USDA SBIR fit',
      description: 'Check if your agricultural technology, food science, or forestry innovation qualifies for non-dilutive federal SBIR grants.',
      buttonText: 'Start Free Assessment',
      href: '/portfolio?focus=tech-startup',
      supportingPoints: ['USDA topic alignment', 'SAM.gov registry support', 'Phase I proposal review'],
    },
  },
  '/usa/kentucky': {
    route: '/usa/kentucky',
    seoTitle: 'Kentucky Business Grants & Funding: 2026 Guide',
    seoDescription: 'Find business grants, tax credits, and state funding programs in Kentucky. Access low-interest SBA loans and upskilling funds.',
    expectedIntent: 'medium',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: '2026-06-11',
    programStatus: 'Multiple active programs',
    statusSummary: 'Kentucky offers discretionary business incentives, SBIR matching grants, small business tax credits, and workforce training incentives.',
    decisionSummary: 'Stack Kentucky state incentives (like the SBIR match or upskilling funds) with federal capital to maximize business extension.',
    shortAnswerQuestion: 'What funding programs exist for Kentucky startups?',
    shortAnswer: 'Kentucky business options include state-backed SBIR matching grants (up to $100K for Phase I, $150K for Phase II), the Kentucky Small Business Tax Credit (up to $25K), and workforce development training incentives.',
    verificationNotes: [
      'Kentucky Cabinet for Economic Development oversees the state\'s discretionary incentive packages.',
      'Kentucky offers one of the most generous state SBIR matching programs in the country.',
      'State tax credits require job creation and capital investment verification.',
    ],
    officialSources: [
      {
        name: 'Kentucky Cabinet for Economic Development',
        url: 'https://ced.ky.gov/',
        description: 'Official state portal for business incentives and tax credits.',
      },
    ],
    cta: {
      eyebrow: 'Kentucky funding guide',
      title: 'Assess your Kentucky business grant eligibility',
      description: 'Find Kentucky state grants, SBIR matches, tax credits, and financing programs matching your business profile.',
      buttonText: 'Start Free Assessment',
      href: '/portfolio?focus=kentucky',
      supportingPoints: ['Kentucky SBIR match qualification', 'State tax credit check', 'Upskilling grant eligibility'],
    },
  },
  '/blog/women-entrepreneurship-strategy-canada': {
    route: '/blog/women-entrepreneurship-strategy-canada',
    seoTitle: 'Women Entrepreneurship Grants Canada (2026 Guide)',
    seoDescription: 'Access women entrepreneur grants and low-interest startup loans up to $50K under Canada\'s Women Entrepreneurship Strategy.',
    expectedIntent: 'high',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: '2026-06-11',
    programStatus: 'Multiple active programs',
    statusSummary: 'Canada\'s WES provides support through national ecosystems, a dedicated microloan fund, and BDC venture capital initiatives.',
    decisionSummary: 'Ensure your business is majority female-owned (51%+) to access WES microloans up to $50K, ecosystem grants, or specialized BDC equity capital.',
    shortAnswerQuestion: 'How do Canadian women business owners access WES funding?',
    shortAnswer: 'Canadian female entrepreneurs can access the WES Loan Fund for microloans up to $50,000 via regional delivery partners (like WEOC). High-growth tech firms can apply directly to BDC\'s Women in Technology Fund for venture financing.',
    verificationNotes: [
      'WES programs require 51%+ ownership and control by one or more women.',
      'WES Loan Fund microloans are low-interest and do not require corporate collateral.',
      'Ecosystem funds are typically awarded to support organizations rather than direct business grants.',
    ],
    officialSources: [
      {
        name: 'Innovation, Science and Economic Development Canada (ISED)',
        url: 'https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/en',
        description: 'Official federal portal for the WES program.',
      },
    ],
    cta: {
      eyebrow: 'WES Canada funding',
      title: 'Check your women entrepreneur grant eligibility',
      description: 'Discover active federal and provincial women entrepreneurship grants, loans, and mentorship matching your profile.',
      buttonText: 'Start Free Assessment',
      href: '/portfolio?focus=women-entrepreneur',
      supportingPoints: ['WES ownership check', 'Microloan partner matching', 'Hiring & expansion grant stack'],
    },
  },
  '/blog/atlantic-small-business-grants-guide': {
    route: '/blog/atlantic-small-business-grants-guide',
    seoTitle: 'Atlantic Canada Business Grants: 2026 Funding Guide',
    seoDescription: 'Explore business grants, hiring subsidies, and regional expansion funding available in Nova Scotia, New Brunswick, PEI, and NL.',
    expectedIntent: 'medium',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: '2026-06-11',
    programStatus: 'Multiple active programs',
    statusSummary: 'Atlantic Canada regional funding is coordinated primarily by the Atlantic Canada Opportunities Agency (ACOA) alongside provincial partners.',
    decisionSummary: 'Target ACOA interest-free repayable contributions for business scaling and provincial hiring grants to build local capacity.',
    shortAnswerQuestion: 'What is the main source of business grants in Atlantic Canada?',
    shortAnswer: 'The primary driver is the Atlantic Canada Opportunities Agency (ACOA), which offers interest-free repayable and non-repayable contributions for business expansion, innovation, and export. Provincial bodies like Nova Scotia Business Inc. and Opportunities NB offer localized tax credits and hiring incentives.',
    verificationNotes: [
      'ACOA funding is typically repayable for commercial projects but interest-free.',
      'Provincial hiring subsidies can cover up to 50% of employee salaries.',
      'Special funding pools exist for rural development and tourism modernization.',
    ],
    officialSources: [
      {
        name: 'Atlantic Canada Opportunities Agency (ACOA)',
        url: 'https://www.canada.ca/en/atlantic-canada-opportunities.html',
        description: 'Official directory for Atlantic regional economic development programs.',
      },
    ],
    cta: {
      eyebrow: 'Atlantic Canada funding',
      title: 'See which Atlantic Canada grants your business fits',
      description: 'Evaluate ACOA regional contributions, hiring subsidies, and provincial export grants matching your business.',
      buttonText: 'Start Free Assessment',
      href: '/portfolio?focus=atlantic',
      supportingPoints: ['ACOA program fit check', 'Provincial wage subsidy stack', 'Repayable vs non-repayable review'],
    },
  },
  '/guides/irap-innovation-application-guide': {
    route: '/guides/irap-innovation-application-guide',
    seoTitle: 'IRAP Funding Guide 2026: Get Up to $500K R&D Funding',
    seoDescription: 'Learn how to qualify for up to $500,000 in NRC IRAP salary subsidies and connect with an Industrial Technology Advisor.',
    expectedIntent: 'high',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: '2026-06-11',
    programStatus: 'Research required before applying',
    statusSummary: 'NRC IRAP operates through direct engagement with an Industrial Technology Advisor (ITA) who reviews eligibility and project plans.',
    decisionSummary: 'Prepare a technical brief detailing your innovation, technical uncertainty, and key salary costs before calling the NRC to request an ITA.',
    shortAnswerQuestion: 'How do Canadian tech startups apply for IRAP grants?',
    shortAnswer: 'Incorporated Canadian businesses with fewer than 500 employees must call the NRC at 1-877-994-4727 to be assigned an Industrial Technology Advisor (ITA). If the ITA finds your project Scoped and Eligible, they will invite you to submit a proposal to cover 60-80% of technical salaries.',
    verificationNotes: [
      'IRAP does not accept open online applications; ITA referral is mandatory.',
      'SMEs must have sufficient matching capital to pay the remaining wage share and overhead.',
      'Eligible costs are paid on a monthly reimbursement basis against verified timesheets.',
    ],
    officialSources: [
      {
        name: 'NRC Industrial Research Assistance Program',
        url: 'https://nrc.canada.ca/en/support-technology-innovation/industrial-research-assistance-program',
        description: 'Official government portal for IRAP advisors and projects.',
      },
    ],
    cta: {
      eyebrow: 'IRAP application guide',
      title: 'Assess your IRAP project fit and ITA pitch strategy',
      description: 'Structure your technical research plan and prepare your project brief for ITA review to maximize your salary subsidy approvals.',
      buttonText: 'Start Free Assessment',
      href: '/portfolio?focus=irap',
      supportingPoints: ['ITA pitch deck checklist', 'Eligible salary cost review', 'SR&ED tax credit compatibility'],
    },
  },
  '/guides/apply-strategic-innovation-fund': {
    route: '/guides/apply-strategic-innovation-fund',
    seoTitle: 'Strategic Innovation Fund Guide: Apply for $10M+',
    seoDescription: 'Detailed guide on applying for the Strategic Innovation Fund (SIF). Learn the step-by-step process to secure $10M+ for large R&D projects.',
    expectedIntent: 'high',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: '2026-06-11',
    programStatus: 'Opportunity-specific',
    statusSummary: 'SIF accepts applications under five different streams, with Streams 1-3 operating on a rolling basis, and Stream 4-5 on competitive calls.',
    decisionSummary: 'Evaluate SIF only if your project has a minimum budget of $20M (seeking $10M+). Secure substantial private matching capital and prepare a detailed statement of interest.',
    shortAnswerQuestion: 'Who is eligible for SIF funding in Canada?',
    shortAnswer: 'The Strategic Innovation Fund (SIF) is built for large-scale industrial projects with a minimum cost of $20 million. It supports high-impact R&D, industrial scaling, and business attraction in key sectors like manufacturing, aerospace, and clean tech.',
    verificationNotes: [
      'Requires a minimum project cost of $20 million, seeking at least $10 million in funding.',
      'Funding is provided as a mix of interest-free repayable and non-repayable contributions.',
      'Two-stage application process: Statement of Interest (SOI) followed by a full proposal invitation.',
    ],
    officialSources: [
      {
        name: 'Innovation, Science and Economic Development Canada (ISED) SIF',
        url: 'https://ised-isde.canada.ca/site/strategic-innovation-fund/en',
        description: 'Official portal for the Strategic Innovation Fund.',
      },
    ],
    cta: {
      eyebrow: 'Strategic Innovation Fund',
      title: 'Evaluate your SIF project readiness',
      description: 'Check if your large-scale innovation or scaling project satisfies SIF Stream 1-3 requirements and matching guidelines.',
      buttonText: 'Start Free Assessment',
      href: '/portfolio?focus=tech-startup',
      supportingPoints: ['SIF stream alignment check', 'Project cost eligibility review', 'Statement of Interest prep'],
    },
  },
  '/blog/doe-sbir-clean-energy-grants': {
    route: '/blog/doe-sbir-clean-energy-grants',
    seoTitle: 'DOE SBIR Clean Energy Grants 2026: Get Up to $1.85M',
    seoDescription: 'Secure up to $1.85M in clean tech R&D grants from the Department of Energy. Learn the topics, deadlines, and project pitch rules.',
    expectedIntent: 'high',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: '2026-06-11',
    programStatus: 'Opportunity-specific',
    statusSummary: 'DOE releases SBIR/STTR topics on a fixed annual cycle (typically July/August), with standard application deadlines in October and February.',
    decisionSummary: 'Founders developing solar, wind, battery, grid, or carbon capture solutions must match their project to a specific DOE subtopic and submit a Letter of Intent.',
    shortAnswerQuestion: 'How much funding does the DOE SBIR program provide?',
    shortAnswer: 'The DOE SBIR/STTR program provides Phase I grants of up to $200,000 for feasibility studies (6-12 months) and Phase II grants of up to $1,650,000 (totaling up to $1.85M) for prototype development. Funding is non-dilutive and reserved for novel clean energy tech.',
    verificationNotes: [
      'Letter of Intent (LOI) is a mandatory precursor to full proposal submission.',
      'DOE uses a strict topic-matching mechanism; unsolicited topics are not reviewed.',
      'TABA funding (up to $6,500 Phase I, $50,000 Phase II) is available for business development.',
    ],
    officialSources: [
      {
        name: 'Department of Energy SBIR/STTR Programs',
        url: 'https://science.osti.gov/sbir',
        description: 'Official portal for DOE clean energy R&D funding.',
      },
    ],
    cta: {
      eyebrow: 'DOE Clean Energy grants',
      title: 'Check your DOE SBIR topic fit',
      description: 'Check if your renewable energy, storage, or grid modernization technology aligns with active DOE SBIR/STTR solicitation topics.',
      buttonText: 'Start Free Assessment',
      href: '/portfolio?focus=tech-startup',
      supportingPoints: ['DOE subtopic match', 'Letter of Intent check', 'Phase I proposal readiness'],
    },
  },
  '/blog/healthcare-grants-2026': {
    route: '/blog/healthcare-grants-2026',
    seoTitle: 'Healthcare Grants Canada 2026: Funding for Health Startups',
    seoDescription: 'Discover grants, tax credits, and innovation funding programs for healthcare, biotech, medtech, and digital health companies.',
    expectedIntent: 'high',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: '2026-06-11',
    programStatus: 'Multiple active programs',
    statusSummary: 'Canadian healthcare and biotech startups can leverage federal grants (IRAP, CIHR), provincial programs, and R&D tax credits.',
    decisionSummary: 'Determine whether your project is clinical R&D, digital health software, or medical device commercialization to target the right grants.',
    shortAnswerQuestion: 'What government grants support health tech in Canada?',
    shortAnswer: 'Healthcare startups in Canada can access NRC IRAP salary subsidies (up to $500K) for technical R&D, CIHR grants for clinical research, and the Scientific Research & Experimental Development (SR&ED) tax credit to recover up to 54% of eligible expenses.',
    verificationNotes: [
      'Biotech and medical devices typically qualify for highest SR&ED recovery rates.',
      'CIHR grants focus on academic collaborations; IRAP supports commercial SMEs.',
      'Clinical trials must meet Health Canada regulatory approvals alongside funding conditions.',
    ],
    officialSources: [
      {
        name: 'Canadian Institutes of Health Research (CIHR)',
        url: 'https://cihr-irsc.gc.ca/',
        description: 'Official government portal for Canadian health research grants.',
      },
    ],
    cta: {
      eyebrow: 'Healthcare & biotech grants',
      title: 'Check your healthcare startup grant eligibility',
      description: 'Find active medical, health tech, and biotech grants, tax credits, and salary subsidies matching your project.',
      buttonText: 'Start Free Assessment',
      href: '/portfolio?focus=healthcare',
      supportingPoints: ['SR&ED biotech recovery check', 'IRAP salary subsidy match', 'Clinical R&D funding stack'],
    },
  },
  '/blog/quebec-business-grants-2026': {
    route: '/blog/quebec-business-grants-2026',
    seoTitle: 'Quebec Business Grants 2026: Funding Programs & Tax Credits',
    seoDescription: 'Explore Quebec grants, ESSOR funding, Investissement Québec programs, and R&D tax credits for growing businesses.',
    expectedIntent: 'high',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: '2026-06-11',
    programStatus: 'Multiple active programs',
    statusSummary: 'Quebec provides extensive economic support through the ESSOR program, Investissement Québec loans, and sector-specific tax credits.',
    decisionSummary: 'Target the ESSOR program for innovation or expansion capital and combine it with Investissement Québec financing packages.',
    shortAnswerQuestion: 'What are the primary business grants available in Quebec?',
    shortAnswer: 'The main avenues are the ESSOR program (supporting innovation, productivity, and international growth), Investissement Québec (providing loans and equity), and R&D tax credits (which can recover a significant portion of local payroll).',
    verificationNotes: [
      'ESSOR program covers up to 50% of eligible project costs for technology adoption or business expansion.',
      'Investissement Québec requires a complete financial model showing local job retention.',
      'Quebec business tax credits (like scientific research or e-business credits) stack with federal incentives.',
    ],
    officialSources: [
      {
        name: 'Ministère de l\'Économie, de l\'Innovation et de l\'Énergie du Québec',
        url: 'https://www.quebec.ca/entreprises-et-travailleurs-independants/obtenir-financement/essor',
        description: 'Official portal for ESSOR and provincial innovation grants.',
      },
    ],
    cta: {
      eyebrow: 'Quebec business grants',
      title: 'Check your Quebec business grant eligibility',
      description: 'Discover active ESSOR funding, Investissement Québec loans, and regional development grants matching your business.',
      buttonText: 'Start Free Assessment',
      href: '/portfolio?focus=quebec',
      supportingPoints: ['ESSOR eligibility check', 'Provincial tax credit stack', 'Regional funding match'],
    },
  },
  '/blog/ontario-small-business-grants-guide': {
  "route": "/blog/ontario-small-business-grants-guide",
  "seoTitle": "Ontario Small Business Grants & Funding (2026 Intakes)",
  "seoDescription": "Discover active Ontario small business grants, tax credits, and wage subsidies. Research TechCred, regional growth funds, and Starter Company Plus.",
  "expectedIntent": "high",
  "reviewedBy": "Funding Analyst",
  "reviewerRole": "Analyst Reviewed | Funding Intelligence Team",
  "lastVerified": "2026-06-28",
  "programStatus": "Multiple active programs",
  "statusSummary": "Rolling Intake & Active Provincial Subsidies",
  "decisionSummary": "Ontario offers a robust stack of provincial incentives. Avoid chasing sunset COVID-era programs; focus on TechCred for upskilling, SDF for labor training, and OITC/ORDTC for R&D.",
  "shortAnswerQuestion": "Why Companies Choose Guided Funding Planning for Ontario?",
  "shortAnswer": "A DIY approach is free, but many applications are rejected due to misaligned project scopes or applying to sunset programs. Guided planning helps align your project with active budgets, prepare financial files, and stack provincial and federal programs without double-dipping.",
  "verificationNotes": [
    "Exclusion Check: Unincorporated sole proprietorships and businesses outside Ontario are ineligible.",
    "Lifecycle Timeline: TechCred approval takes 4-6 weeks; capital expansion projects (EODF/SWODF) require 12-16 weeks.",
    "Typical preparation: Collect docs (2-5 days), Application prep (1-3 weeks), Decision timeline (8-16 weeks)."
  ],
  "officialSources": [
    {
      "name": "Ontario Ministry of Economic Development",
      "url": "https://www.ontario.ca/page/ministry-economic-development-job-creation-trade",
      "description": "Official portal for provincial business incentives. This guide is independently prepared by FSI Digital and is not affiliated with any government agency."
    }
  ],
  "cta": {
    "eyebrow": "Ontario Funding Strategy",
    "title": "Build Your Ontario Non-Dilutive Funding Stack",
    "description": "Model your provincial grant eligibility and stackable tax credits in seconds.",
    "buttonText": "Evaluate Ontario Eligibility",
    "href": "/calculator",
    "supportingPoints": [
      "TechCred upskilling match",
      "Regional grant criteria",
      "Filing lifecycle projection"
    ]
  },
  "faq": [
    {
      "question": "Who should NOT apply for Ontario provincial funding?",
      "answer": "Unincorporated sole proprietorships, lifestyle businesses with no payroll or R&D spending, and companies based outside of Ontario do not qualify for the majority of these programs."
    },
    {
      "question": "Can Ontario grants be stacked with federal R&D credits?",
      "answer": "Yes. You can stack provincial hiring grants with federal programs like SR&ED or IRAP, provided you account for the cost-sharing rules correctly."
    }
  ]
},
  '/blog/irap-industrial-research-assistance-program': {
  "route": "/blog/irap-industrial-research-assistance-program",
  "seoTitle": "NRC IRAP Funding Guide 2026: Get Up to $500K Tech Grants",
  "seoDescription": "Learn how to qualify for NRC IRAP salary subsidies. Discover eligibility, ITA relationship steps, and how to stack with SR&ED.",
  "expectedIntent": "high",
  "reviewedBy": "Funding Analyst",
  "reviewerRole": "Analyst Reviewed | Funding Intelligence Team",
  "lastVerified": "2026-06-28",
  "programStatus": "Open or rolling",
  "statusSummary": "Active ITA Intake & Rolling Proposal Submissions",
  "decisionSummary": "IRAP is a relationship-based R&D grant administered by the National Research Council. You must pitch a high-risk technical project directly to an assigned ITA to receive proposal invites.",
  "shortAnswerQuestion": "Why Companies Choose Guided Funding Planning for IRAP?",
  "shortAnswer": "Because IRAP is relationship-driven, a poor first impression with your ITA can end your application. Guided planning structures your project brief to clearly highlight technical risk and commercial scalability.",
  "verificationNotes": [
    "Exclusion: Companies with no technical payroll, no technological risk, or over 500 employees should not apply.",
    "Lifecycle Timeline: ITA matching takes 2-4 weeks; full proposal review and approval takes 4-8 weeks.",
    "Typical preparation: Collect docs (2-5 days), Application prep (1-3 weeks), Decision timeline (4-8 weeks)."
  ],
  "officialSources": [
    {
      "name": "NRC Industrial Research Assistance Program",
      "url": "https://nrc.canada.ca/en/support-technology-innovation/industrial-research-assistance-program",
      "description": "Official government portal for IRAP advisors and projects. This guide is independently prepared by FSI Digital and is not affiliated with any government agency."
    }
  ],
  "cta": {
    "eyebrow": "IRAP Pitch Strategy",
    "title": "Assess Your IRAP Project Readiness",
    "description": "Structure your technical research plan and prepare your project brief for ITA review.",
    "buttonText": "Evaluate IRAP Eligibility",
    "href": "/calculator",
    "supportingPoints": [
      "ITA pitch deck checklist",
      "Eligible salary cost review",
      "SR&ED compatibility"
    ]
  },
  "faq": [
    {
      "question": "Who should NOT apply for IRAP?",
      "answer": "SMEs conducting routine software engineering (e.g., standard web development), companies without Canadian-incorporated entities, or those lacking capital to match the co-funding requirements."
    }
  ]
},
  '/blog/sred-tax-credits-2026': {
  "route": "/blog/sred-tax-credits-2026",
  "seoTitle": "SR&ED Tax Credits Canada 2026: Maximize Your R&D Refund",
  "seoDescription": "Maximize your SR&ED tax credit recovery. Learn eligibility criteria, refundable tax rates up to 35% for CCPCs, and filing deadlines.",
  "expectedIntent": "high",
  "reviewedBy": "Funding Analyst",
  "reviewerRole": "Analyst Reviewed | Funding Intelligence Team",
  "lastVerified": "2026-06-28",
  "programStatus": "Open or rolling",
  "statusSummary": "Active Filing Intake & Retrospective Claims",
  "decisionSummary": "SR&ED is Canada's largest R&D tax incentive, returning up to 35% refundable credits on qualifying salaries, materials, and contracts.",
  "shortAnswerQuestion": "Why Companies Choose Guided Funding Planning for SR&ED?",
  "shortAnswer": "Filing for SR&ED involves rigorous technical descriptions and cost audits. Inadequate documentation or incorrect claim structures can trigger CRA audits. Guided planning ensures compliance and maximizes claim size.",
  "verificationNotes": [
    "Exclusion: Unincorporated sole proprietorships or companies with no technological uncertainty cannot claim.",
    "Lifecycle Timeline: Claims filed with tax returns take 8-12 weeks; retrospective claims take 12-24 weeks.",
    "Typical preparation: Collect logs (2-5 days), Application prep (1-3 weeks), Decision timeline (8-12 weeks)."
  ],
  "officialSources": [
    {
      "name": "CRA SR&ED Tax Incentive Program",
      "url": "https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program.html",
      "description": "Official guidelines for SR&ED claims. This guide is independently prepared by FSI Digital and is not affiliated with any government agency."
    }
  ],
  "cta": {
    "eyebrow": "SR&ED Strategy",
    "title": "Calculate Your Expected R&D Refund",
    "description": "Find out how much of your technical salaries, contractor fees, and materials you can recover retrospectively.",
    "buttonText": "Run SR&ED Refund Calculator",
    "href": "/calculator",
    "supportingPoints": [
      "Salaries & contract rates",
      "CCPC status check",
      "Filing deadline warnings"
    ]
  },
  "faq": [
    {
      "question": "Who should NOT apply for SR&ED?",
      "answer": "Companies that do not conduct scientific research or experimental development (e.g. routine engineering), and businesses that lack contemporaneous documentation of technical trials."
    }
  ]
},
  '/blog/csbfp-canada-small-business-financing-program-government-grants': {
  "route": "/blog/csbfp-canada-small-business-financing-program-government-grants",
  "seoTitle": "CSBFP Canada Small Business Financing Program 2026: Loans Guide",
  "seoDescription": "Complete guide to CSBFP loans. Get up to $1.15M in government-backed financing for equipment, leaseholds, and working capital.",
  "expectedIntent": "high",
  "reviewedBy": "Funding Analyst",
  "reviewerRole": "Analyst Reviewed | Funding Intelligence Team",
  "lastVerified": "2026-06-28",
  "programStatus": "Open or rolling",
  "statusSummary": "Active Bank Intake & Government Guarantees",
  "decisionSummary": "The CSBFP provides government-backed bank loans up to $1.15M ($150K for working capital). Banks administer the loans under federal guarantee.",
  "shortAnswerQuestion": "Why Companies Choose Guided Funding Planning for CSBFP?",
  "shortAnswer": "While banks issue CSBFP loans, they evaluate applicants strictly on commercial viability and government compliance. Guided planning builds a lender-ready business case to guarantee approval.",
  "verificationNotes": [
    "Exclusion: Farming businesses and non-commercial entities do not qualify under CSBFP guidelines.",
    "Lifecycle Timeline: Bank underwriting and registration takes 4-8 weeks.",
    "Typical preparation: Collect docs (2-5 days), Application prep (1-3 weeks), Decision timeline (4-8 weeks)."
  ],
  "officialSources": [
    {
      "name": "ISED Canada Small Business Financing Program",
      "url": "https://ised-isde.canada.ca/site/canada-small-business-financing-program/en",
      "description": "Official program overview. This guide is independently prepared by FSI Digital and is not affiliated with any government agency."
    }
  ],
  "cta": {
    "eyebrow": "CSBFP Loan Strategy",
    "title": "Check Your CSBFP Capital Eligibility",
    "description": "Find out if you qualify for government-backed financing to fund equipment, leaseholds, or software.",
    "buttonText": "Start Free Assessment",
    "href": "/calculator",
    "supportingPoints": [
      "Asset type eligibility check",
      "Maximum loan limits",
      "Interest rate primer"
    ]
  },
  "faq": [
    {
      "question": "Who should NOT apply for CSBFP?",
      "answer": "Agricultural businesses (which have separate USDA/FCC routes), non-profit organizations, and companies seeking to refinance existing commercial debt."
    }
  ]
},
  '/blog/women-entrepreneurship-loan-fund-canada': {
  "route": "/blog/women-entrepreneurship-loan-fund-canada",
  "seoTitle": "Women Entrepreneurship Loan Fund (WELF) Canada 2026: Get Up to $50K",
  "seoDescription": "Apply for the WELF microloan program. Learn about the 51% majority women-ownership rule, low-interest microfinancing, and stacking with startup grants.",
  "expectedIntent": "high",
  "reviewedBy": "Funding Analyst",
  "reviewerRole": "Analyst Reviewed | Funding Intelligence Team",
  "lastVerified": "2026-06-28",
  "programStatus": "Open or rolling",
  "statusSummary": "Active Microloan Intake & Partner Networks",
  "decisionSummary": "WELF microloans provide up to $50,000 in low-interest financing with no personal collateral requirements for Canadian startups and SMEs majority-owned (51%+) by women.",
  "shortAnswerQuestion": "Why Companies Choose Guided Funding Planning for WELF?",
  "shortAnswer": "Intermediary delivery organizations handle WELF loan intakes. Guided planning helps align your business plan and cash flow projections with the intermediaries evaluation criteria to ensure quick approval.",
  "verificationNotes": [
    "Exclusion: Businesses not majority-owned (51%+) and actively managed by women do not qualify.",
    "Lifecycle Timeline: Intermediary screening and disbursement takes 4-8 weeks.",
    "Typical preparation: Collect docs (2-5 days), Application prep (1-3 weeks), Decision timeline (4-8 weeks)."
  ],
  "officialSources": [
    {
      "name": "ISED Women Entrepreneurship Strategy",
      "url": "https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/en",
      "description": "Official WES guidelines. This guide is independently prepared by FSI Digital and is not affiliated with any government agency."
    }
  ],
  "cta": {
    "eyebrow": "WELF microloan",
    "title": "Find Stackable Women Business Grants",
    "description": "See if your women-owned business qualifies for microloans, mentoring, and stackable non-repayable grants.",
    "buttonText": "Check Eligibility Now",
    "href": "/calculator",
    "supportingPoints": [
      "WES ownership verification",
      "Microloan partner match",
      "Upskilling grant compatibility"
    ]
  },
  "faq": [
    {
      "question": "Who should NOT apply for WELF?",
      "answer": "Companies that lack a registered Canadian corporation, businesses with under 51% female ownership, or organizations unable to provide basic business plans."
    }
  ]
},
  '/blog/canada-agriculture-agrifood-grants-guide': {
  "route": "/blog/canada-agriculture-agrifood-grants-guide",
  "seoTitle": "Canada Agriculture & Agri-Food Grants 2026: $2.3B+ Guide",
  "seoDescription": "Apply for AAFC programs and AgriInnovate cost-shares. Build sustainable crop systems, access clean tech funding, and claim carbon offsets.",
  "expectedIntent": "medium",
  "reviewedBy": "Funding Analyst",
  "reviewerRole": "Analyst Reviewed | Funding Intelligence Team",
  "lastVerified": "2026-06-28",
  "programStatus": "Multiple active programs",
  "statusSummary": "Open AgriInnovate & Sustainable CAP Intakes",
  "decisionSummary": "Canadian agricultural operations can access federal AgriInnovate grants, cost-share programs under the Sustainable CAP, and agricultural clean technology funds.",
  "shortAnswerQuestion": "Why Companies Choose Guided Funding Planning for Agriculture?",
  "shortAnswer": "Agricultural grants have strict sustainability rules and environmental baseline requirements. Guided planning structures your project proposals to meet these compliance thresholds.",
  "verificationNotes": [
    "Exclusion: Hobby farms, non-registered operations, and projects with no sustainable transition are ineligible.",
    "Lifecycle Timeline: AgriInnovate expressions of interest take 6-10 weeks; CAP grants take 4-8 weeks.",
    "Typical preparation: Collect logs (2-5 days), Application prep (1-3 weeks), Decision timeline (8-16 weeks)."
  ],
  "officialSources": [
    {
      "name": "Agriculture and Agri-Food Canada (AAFC) Programs",
      "url": "https://agriculture.canada.ca/en/programs",
      "description": "Official directory of AAFC grants and cost-shares. This guide is independently prepared by FSI Digital and is not affiliated with any government agency."
    }
  ],
  "cta": {
    "eyebrow": "Agri Innovation Strategy",
    "title": "Analyze Your Agri-Funding Eligibility",
    "description": "See if your farming operation qualifies for AgriInnovate, CAP cost-shares, or clean tech funding.",
    "buttonText": "Evaluate Agriculture Grants",
    "href": "/calculator",
    "supportingPoints": [
      "AgriInnovate project sizing",
      "Sustainable CAP cost shares",
      "Clean tech adoption grants"
    ]
  },
  "faq": [
    {
      "question": "Who should NOT apply for agricultural grants?",
      "answer": "Unregistered hobby farms, projects that increase environmental emissions, and operations without matching capital."
    }
  ]
},
  '/blog/canada-regional-economic-development-grants-guide': {
  "route": "/blog/canada-regional-economic-development-grants-guide",
  "seoTitle": "Canada Regional Development Grants 2026: $2.8B Community Funding",
  "seoDescription": "Complete guide to RDA funding streams (FedDev, PacifiCan, PrairiesCan, ACOA). Find interest-free interest repayable contributions.",
  "expectedIntent": "medium",
  "reviewedBy": "Funding Analyst",
  "reviewerRole": "Analyst Reviewed | Funding Intelligence Team",
  "lastVerified": "2026-06-28",
  "programStatus": "Multiple active programs",
  "statusSummary": "Rolling RDA Business Scale-up Intakes",
  "decisionSummary": "Regional Development Agencies (RDAs) provide interest-free repayable contributions for business scale-up, automation, and clean tech adoption.",
  "shortAnswerQuestion": "Why Companies Choose Guided Funding Planning for RDAs?",
  "shortAnswer": "RDA applications require massive project dossiers, detailed financial models, and regional job creation evidence. Guided planning compiles these materials to guarantee interest-free capital approval.",
  "verificationNotes": [
    "Exclusion: Pre-revenue startups or businesses with no regional job creation plan are ineligible.",
    "Lifecycle Timeline: RDA full proposal review and funding decisions take 12-20 weeks.",
    "Typical preparation: Collect metrics (2-5 days), Application prep (2-3 weeks), Decision timeline (12-20 weeks)."
  ],
  "officialSources": [
    {
      "name": "Regional Development Agencies of Canada",
      "url": "https://www.canada.ca/en/secretariat-regional-development-agencies.html",
      "description": "Official directory. This guide is independently prepared by FSI Digital and is not affiliated with any government agency."
    }
  ],
  "cta": {
    "eyebrow": "RDA Scaling Strategy",
    "title": "Check Your Regional Scale-up Eligibility",
    "description": "See if your community expansion, automation, or clean tech project qualifies for interest-free loans.",
    "buttonText": "Evaluate Regional Grants",
    "href": "/calculator",
    "supportingPoints": [
      "FedDev/CED/PacifiCan alignment",
      "Interest-free repayable terms",
      "Job creation threshold match"
    ]
  },
  "faq": [
    {
      "question": "Who should NOT apply for RDA funding?",
      "answer": "Pre-revenue startups (under 3 years operating), retail businesses with no regional expansion, and businesses without audited financial histories."
    }
  ]
},
  '/blog/saskatchewan-small-business-grants-guide': {
  "route": "/blog/saskatchewan-small-business-grants-guide",
  "seoTitle": "Saskatchewan Small Business Grants 2026: $425M+ Growth Funding",
  "seoDescription": "Access Saskatchewan small business grants, tax incentives, and capital programs. Learn about ProductTech, wage subsidies, and regional support.",
  "expectedIntent": "medium",
  "reviewedBy": "Funding Analyst",
  "reviewerRole": "Analyst Reviewed | Funding Intelligence Team",
  "lastVerified": "2026-06-28",
  "programStatus": "Multiple active programs",
  "statusSummary": "Active Saskatchewan Tech & Growth Incentives",
  "decisionSummary": "Saskatchewan offers targeted support through the Saskatchewan Technology Startup Incentive (STSI), local upskilling grants, and capital cost-shares.",
  "shortAnswerQuestion": "Why Companies Choose Guided Funding Planning for Saskatchewan?",
  "shortAnswer": "Navigating provincial tax incentives (like STSI) requires strict investor accreditation and project scoping. Guided planning manages the application cycle for tax offsets and employee training subsidies.",
  "verificationNotes": [
    "Exclusion: Unincorporated businesses or those located outside Saskatchewan do not qualify.",
    "Lifecycle Timeline: STSI certifications take 2-4 weeks; Job Grants take 3-6 weeks.",
    "Typical preparation: Collect docs (2-5 days), Application prep (1-2 weeks), Decision timeline (4-8 weeks)."
  ],
  "officialSources": [
    {
      "name": "Saskatchewan Ministry of Trade and Export Development",
      "url": "https://www.saskatchewan.ca/government/government-structure/ministries/trade-and-export-development",
      "description": "Official portal. This guide is independently prepared by FSI Digital and is not affiliated with any government agency."
    }
  ],
  "cta": {
    "eyebrow": "Saskatchewan Funding Strategy",
    "title": "Analyze Saskatchewan Startup Incentives",
    "description": "See if your tech startup qualifies for the 45% angel tax credit or employee wage subsidies.",
    "buttonText": "Evaluate Saskatchewan Grants",
    "href": "/calculator",
    "supportingPoints": [
      "STSI angel tax credit alignment",
      "Canada-Saskatchewan Job Grant match",
      "Capital cost share programs"
    ]
  },
  "faq": [
    {
      "question": "Who should NOT apply for Saskatchewan business grants?",
      "answer": "Sole proprietors with no employees, organizations based in other provinces, and companies conducting routine operations with no growth projections."
    }
  ]
},
  '/blog/irap-industrial-research-assistance-program-government-grants': {
  "route": "/blog/irap-industrial-research-assistance-program-government-grants",
  "seoTitle": "IRAP Industrial Research Assistance Program Canada 2026 Guide",
  "seoDescription": "Learn how to qualify for NRC IRAP funding. Access salary subsidies, build ITA relationships, and stack with provincial R&D tax credits.",
  "expectedIntent": "high",
  "reviewedBy": "Funding Analyst",
  "reviewerRole": "Analyst Reviewed | Funding Intelligence Team",
  "lastVerified": "2026-06-28",
  "programStatus": "Open or rolling",
  "statusSummary": "Active ITA Intake & Rolling Proposal Submissions",
  "decisionSummary": "IRAP is Canada's premier technology development grant, reimbursing up to 80% of technical salaries for high-risk research projects.",
  "shortAnswerQuestion": "Why Companies Choose Guided Funding Planning for IRAP?",
  "shortAnswer": "Because IRAP is relationship-driven, a poor first impression with your ITA can end your application. Guided planning structures your project brief to clearly highlight technical risk and commercial scalability.",
  "verificationNotes": [
    "Exclusion: Companies with no technical payroll, no technological risk, or over 500 employees should not apply.",
    "Lifecycle Timeline: ITA matching takes 2-4 weeks; full proposal review and approval takes 4-8 weeks.",
    "Typical preparation: Collect docs (2-5 days), Application prep (1-3 weeks), Decision timeline (4-8 weeks)."
  ],
  "officialSources": [
    {
      "name": "NRC Industrial Research Assistance Program",
      "url": "https://nrc.canada.ca/en/support-technology-innovation/industrial-research-assistance-program",
      "description": "Official government portal for IRAP advisors and projects. This guide is independently prepared by FSI Digital and is not affiliated with any government agency."
    }
  ],
  "cta": {
    "eyebrow": "IRAP Pitch Strategy",
    "title": "Assess Your IRAP Project Readiness",
    "description": "Structure your technical research plan and prepare your project brief for ITA review.",
    "buttonText": "Evaluate IRAP Eligibility",
    "href": "/calculator",
    "supportingPoints": [
      "ITA pitch deck checklist",
      "Eligible salary cost review",
      "SR&ED compatibility"
    ]
  },
  "faq": [
    {
      "question": "Who should NOT apply for IRAP?",
      "answer": "SMEs conducting routine software engineering (e.g., standard web development), companies without Canadian-incorporated entities, or those lacking capital to match the co-funding requirements."
    }
  ]
},
  '/usa/minnesota': {
    route: '/usa/minnesota',
    seoTitle: 'Minnesota Small Business Grants 2026: Stacking State & Federal Funding',
    seoDescription: 'Discover 17+ active grant programs for Minnesota small businesses in 2026, from $5K to $500K. Learn how state and federal matching funds stack.',
    expectedIntent: 'medium',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: LAST_VERIFIED,
    programStatus: 'Multiple active programs',
    statusSummary: 'Minnesota DEED manages a portfolio of state-backed grants, seed matching funds, and local development loans. These can often be stacked with federal SBIR/SBA programs.',
    decisionSummary: 'Minnesota companies should check DEED active windows and match programs based on stacking rules rather than applying for individual opportunities in isolation.',
    shortAnswerQuestion: 'How can a Minnesota business stack state and federal funding?',
    shortAnswer: 'Minnesota businesses can stack state DEED grants (like the Minnesota Launch Grant) with federal matching programs (such as SBIR/STTR). The key is maintaining clean books to prove distinct, non-overlapping eligible costs for each program to avoid anti-stacking rules.',
    verificationNotes: [
      'Minnesota Launch Grants match up to $35,000 for startup funding.',
      'SBA-backed local loans require physical presence within Minnesota.',
      'Always check the active application windows at MN DEED official portal.'
    ],
    officialSources: [
      {
        name: 'Minnesota Department of Employment and Economic Development (DEED)',
        url: 'https://mn.gov/deed/business/financing-business/',
        description: 'Official directory of Minnesota business financing and state grant resources.'
      },
      {
        name: 'Launch Minnesota',
        url: 'https://mn.gov/deed/business/financing-business/launch-mn/',
        description: 'State organization providing pre-seed matching grants up to $35,000 for technology startups.'
      }
    ],
    cta: {
      eyebrow: 'Minnesota Stacking Strategy',
      title: 'Analyze Minnesota Stacking Options',
      description: 'Check how state DEED incentives and federal SBIR matching funds align for your business in 60 seconds.',
      buttonText: 'Check Stacking Match',
      href: '/calculator',
      supportingPoints: ['State & Federal cost splits', 'Minnesota DEED compliance', 'Stacking limits checklist']
    },
    faq: [
      {
        question: "What is Launch Minnesota?",
        answer: "Launch Minnesota is a state initiative offering pre-seed business development grants of up to $35,000 to qualified Minnesota-based technology startups."
      },
      {
        question: "Can I stack federal SBIR with Minnesota state grants?",
        answer: "Yes. Launch Minnesota provides matching grants of up to $100,000 for Minnesota companies that have recently won federal SBIR or STTR Phase I awards."
      }
    ]
  },
};

export function getPriorityResearchProfile(route: string) {
  return profiles[route];
}

export function getPriorityResearchProfiles() {
  return Object.values(profiles);
}
