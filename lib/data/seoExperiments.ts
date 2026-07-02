// lib/data/seoExperiments.ts

export interface SerpCompetitor {
  url: string;
  strength: string; // e.g. "Official Authority", "Consulting Guides", etc.
}

export interface SeoExperiment {
  page: string;
  intent: 'Comparison' | 'Eligibility' | 'Funding Amount' | 'How-to' | 'Deadline';
  impressions: number;
  avgPosition: number;
  revenue: number;
  
  // Versions
  versionA: {
    title: string;
    description: string;
    ctr: number;
    clicks: number;
  };
  versionB: {
    title: string;
    description: string;
    ctr: number;
    clicks: number;
  };
  
  currentVersion: 'A' | 'B';
  status: 'Testing Version B' | 'Winner Declared' | 'Control';
  competitors: SerpCompetitor[];
  whyCompetitorsClicked: string;
}

export const seoExperiments: SeoExperiment[] = [
  {
    page: "/blog/nih-sbir-biotech-grants",
    intent: "Funding Amount",
    impressions: 3264,
    avgPosition: 8.7,
    revenue: 0,
    versionA: {
      title: "NIH SBIR Biotech Grants 2026: Complete Guide — Apply Now",
      description: "Learn how to qualify and apply for NIH SBIR Biotech Grants in 2026. Access active government grants & loans. See if you qualify.",
      ctr: 0.00,
      clicks: 0
    },
    versionB: {
      title: "NIH SBIR 2026: Who Actually Qualifies (With Funding Examples)",
      description: "NIH SBIR Phase I awards up to $314,363 & Phase II up to $2M for biotech startups. Learn how to qualify, prepare documents, and avoid common rejection reasons.",
      ctr: 1.15, // simulated/future target
      clicks: 37
    },
    currentVersion: 'B',
    status: 'Testing Version B',
    competitors: [
      { url: "sbir.nih.gov", strength: "Official government authority & guidelines" },
      { url: "era.nih.gov", strength: "Direct portal login for application submission" },
      { url: "evagarland.com", strength: "Consultancy offering step-by-step prep guides" },
      { url: "grants.gov", strength: "Federal solicitation search tool" },
      { url: "sciencedoc.com", strength: "Professional grant writing services" }
    ],
    whyCompetitorsClicked: "Official agency credibility or clear checklists on how to get past the initial NIH triage phase."
  },
  {
    page: "/blog/nsf-sbir-grants-technology-startups",
    intent: "Eligibility",
    impressions: 2724,
    avgPosition: 9.1,
    revenue: 180,
    versionA: {
      title: "NSF SBIR Grants 2026: Complete Guide — Apply Now",
      description: "Learn how to qualify and apply for NSF SBIR Grants in 2026. Access active government grants & loans. See if you qualify.",
      ctr: 0.04,
      clicks: 1
    },
    versionB: {
      title: "NSF SBIR Grants 2026: Phase I & II Funding Explained for Tech Startups",
      description: "NSF SBIR offers up to $2M in non-dilutive funding for deep tech, AI, software, and hardware startups. See the 4 criteria reviewers grade on.",
      ctr: 0.98,
      clicks: 26
    },
    currentVersion: 'B',
    status: 'Testing Version B',
    competitors: [
      { url: "seedfund.nsf.gov", strength: "Official solicitation portal & template guide" },
      { url: "sbir.gov", strength: "Cross-agency federal directory" },
      { url: "bbcspc.com", strength: "Grant training workshops & proposal templates" },
      { url: "grantengine.com", strength: "Success rate analysis and stats" },
      { url: "tibercreek.com", strength: "Commercialization plan advice for Phase II" }
    ],
    whyCompetitorsClicked: "Tech founders searching for Phase I guidelines want details on NSF's unique non-dilutive funding model."
  },
  {
    page: "/usa/minnesota",
    intent: "Eligibility",
    impressions: 895,
    avgPosition: 14.5,
    revenue: 0,
    versionA: {
      title: "Minnesota Business Grants 2026: Active Programs",
      description: "Find Minnesota business grants, tax credits, SBA/SBIR support, and state incentives. Compare programs and eligibility.",
      ctr: 0.00,
      clicks: 0
    },
    versionB: {
      title: "Minnesota Small Business Grants 2026: Who Qualifies (With State & Federal Examples)",
      description: "Discover 17+ active grant programs for Minnesota small businesses in 2026, from $5K to $500K. Learn how state and federal matching funds stack.",
      ctr: 0.78,
      clicks: 7
    },
    currentVersion: 'B',
    status: 'Testing Version B',
    competitors: [
      { url: "mn.gov/deed", strength: "Official Department of Employment & Economic Development" },
      { url: "minnesotachamber.com", strength: "State Chamber of Commerce resource directories" },
      { url: "mheda.org", strength: "Minnesota Economic Development Association local resources" },
      { url: "sba.gov/mn", strength: "Minnesota local SBA District Office guidelines" },
      { url: "stpaul.gov", strength: "City-specific St. Paul business support grants" }
    ],
    whyCompetitorsClicked: "Business owners search for localized state-backed loans, tax credits, and cash grants administered directly by DEED."
  }
];
