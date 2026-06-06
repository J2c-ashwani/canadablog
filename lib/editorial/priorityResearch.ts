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
}

const REVIEWED_BY = 'Ashwani K.';
const REVIEWER_ROLE = 'FSI Digital Funding Research';
const LAST_VERIFIED = '2026-06-06';

const profiles: Record<string, PriorityResearchProfile> = {
  '/usa/new-york': {
    route: '/usa/new-york',
    seoTitle: 'New York Business Grants & Incentives: 2026 Research Guide',
    seoDescription: 'Research New York small-business financing, innovation support, export assistance, and incentive programs using official Empire State Development sources.',
    reviewedBy: REVIEWED_BY,
    reviewerRole: REVIEWER_ROLE,
    lastVerified: LAST_VERIFIED,
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
      title: 'Map the right incentive stack before you apply',
      description: 'A focused review can separate realistic New York programs from financing routes that do not fit your project, timeline, or eligible costs.',
      buttonText: 'Request an Eligibility & Expansion Review',
      href: '/contact?service=new-york-funding-review',
      supportingPoints: ['Project-to-program fit', 'Eligible-cost review', 'Priority application sequence'],
    },
  },
  '/usa/california': {
    route: '/usa/california',
    seoTitle: 'California Business Grants & Incentives: 2026 Research Guide',
    seoDescription: 'Research California small-business support, tax incentives, technical assistance, and innovation funding using official GO-Biz and CalOSBA sources.',
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
      eyebrow: 'California funding strategy',
      title: 'Build a defensible California incentive shortlist',
      description: 'We help you organize the most relevant state and federal routes around the project you actually plan to execute.',
      buttonText: 'Request an Eligibility & Expansion Review',
      href: '/contact?service=california-funding-review',
      supportingPoints: ['Incentive-fit review', 'Official-source validation', 'Application sequencing'],
    },
  },
  '/blog/quebec-small-business-grants-guide': {
    route: '/blog/quebec-small-business-grants-guide',
    seoTitle: 'Quebec Small Business Funding: Grants, Loans & Tax Credits',
    seoDescription: 'Compare Quebec business funding routes, including CED programs, provincial tax credits, and financing. Reviewed against official government sources.',
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
      eyebrow: 'Quebec funding strategy',
      title: 'Build a funding stack around your next project',
      description: 'We assess the project, eligible costs, and timing before ranking the most credible Quebec and federal routes.',
      buttonText: 'Request a Quebec Funding Review',
      href: '/contact?service=quebec-funding-review',
      supportingPoints: ['Grant and financing fit', 'Tax-credit considerations', 'Repayable vs. non-repayable review'],
    },
  },
  '/blog/nih-sbir-biotech-grants': {
    route: '/blog/nih-sbir-biotech-grants',
    seoTitle: 'NIH SBIR/STTR for Biotech: Eligibility & Application Guide',
    seoDescription: 'Assess NIH SBIR/STTR fit for biotech, medical-device, and digital-health R&D. Includes eligibility, due-date guidance, and official NIH SEED sources.',
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
      eyebrow: 'NIH technical funding review',
      title: 'Validate institute fit before building the application',
      description: 'A technical funding review helps identify the right NIH route, evidence gaps, and readiness risks before your team commits to a full proposal.',
      buttonText: 'Request a Technical Funding Review',
      href: '/contact?service=nih-technical-funding-review',
      supportingPoints: ['Institute and notice fit', 'R&D readiness review', 'Commercialization evidence gaps'],
    },
  },
  '/blog/nsf-sbir-grants-technology-startups': {
    route: '/blog/nsf-sbir-grants-technology-startups',
    seoTitle: 'NSF SBIR/STTR for Startups: Project Pitch & Eligibility',
    seoDescription: 'Assess NSF SBIR/STTR fit, Project Pitch readiness, technical-risk evidence, and commercialization potential using official NSF Seed Fund sources.',
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
      eyebrow: 'NSF project-pitch review',
      title: 'Pressure-test the technical case before submitting',
      description: 'We assess whether the project story clearly demonstrates technical risk, differentiation, market pull, and a credible commercialization path.',
      buttonText: 'Request an NSF Readiness Review',
      href: '/contact?service=nsf-readiness-review',
      supportingPoints: ['Project Pitch fit', 'Technical-risk narrative', 'Market-pull evidence'],
    },
  },
  '/usa/technology-startup-grants': {
    route: '/usa/technology-startup-grants',
    seoTitle: 'U.S. Technology Startup Funding: SBIR/STTR Agency Guide',
    seoDescription: 'Compare U.S. SBIR/STTR routes for technology startups and learn how agency fit, technical risk, eligibility, and active solicitations shape the funding path.',
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
      eyebrow: 'Federal R&D funding strategy',
      title: 'Choose the right agency before writing the proposal',
      description: 'A technical funding review can narrow the field to the agencies and solicitations that genuinely match your technology and commercialization plan.',
      buttonText: 'Request a Technical Funding Review',
      href: '/contact?service=technology-funding-review',
      supportingPoints: ['Agency mission fit', 'Solicitation shortlist', 'Readiness and evidence gaps'],
    },
  },
  '/usa/ohio': {
    route: '/usa/ohio',
    seoTitle: 'Ohio Business Grants & Incentives: 2026 Research Guide',
    seoDescription: 'Research Ohio small-business incentives, state tax credits, Job Creation Tax Credit, and JobsOhio programs using official state sources.',
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
};

export function getPriorityResearchProfile(route: string) {
  return profiles[route];
}

export function getPriorityResearchProfiles() {
  return Object.values(profiles);
}
