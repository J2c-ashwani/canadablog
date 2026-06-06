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
};

export function getPriorityResearchProfile(route: string) {
  return profiles[route];
}

export function getPriorityResearchProfiles() {
  return Object.values(profiles);
}
