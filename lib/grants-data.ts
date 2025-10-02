export interface Grant {
  id: string
  name: string
  description: string
  country: "USA" | "Canada"
  region: string
  category: string
  fundingMin: number
  fundingMax: number
  eligibility: string[]
  deadline: string
  applicationLink: string
  agency: string
  status: "Active" | "Upcoming" | "Closed"
  tags: string[]
  requirements: string[]
  lastUpdated: string
}

export const grantsDatabase: Grant[] = [
  // USA Federal Grants
  {
    id: "usa-sbir-001",
    name: "Small Business Innovation Research (SBIR)",
    description:
      "Federal funding for small businesses to engage in research and development with commercialization potential.",
    country: "USA",
    region: "Federal",
    category: "Technology",
    fundingMin: 50000,
    fundingMax: 1700000,
    eligibility: ["Small businesses with <500 employees", "For-profit companies", "US-based operations"],
    deadline: "Rolling applications",
    applicationLink: "https://www.sbir.gov/",
    agency: "Small Business Administration",
    status: "Active",
    tags: ["R&D", "Innovation", "Technology", "Federal"],
    requirements: ["Business plan", "Technical proposal", "Budget justification", "Team qualifications"],
    lastUpdated: "2025-01-15",
  },
  {
    id: "usa-sba-002",
    name: "SBA Growth Accelerator Fund",
    description:
      "Funding to support small business accelerators and incubators that help entrepreneurs start and grow businesses.",
    country: "USA",
    region: "Federal",
    category: "Small Business",
    fundingMin: 10000,
    fundingMax: 500000,
    eligibility: ["Small businesses", "Accelerators", "Incubators", "Non-profit organizations"],
    deadline: "March 30, 2025",
    applicationLink: "https://www.sba.gov/funding-programs",
    agency: "Small Business Administration",
    status: "Active",
    tags: ["Accelerator", "Incubator", "Growth", "Federal"],
    requirements: ["Organization profile", "Program description", "Impact metrics", "Financial statements"],
    lastUpdated: "2025-01-15",
  },
  {
    id: "usa-doe-003",
    name: "Department of Energy Clean Energy Grants",
    description: "Funding for clean energy technology development and deployment projects.",
    country: "USA",
    region: "Federal",
    category: "Green Energy",
    fundingMin: 50000,
    fundingMax: 2000000,
    eligibility: ["Clean energy companies", "Research institutions", "Technology developers"],
    deadline: "April 15, 2025",
    applicationLink: "https://www.energy.gov/funding-opportunities",
    agency: "Department of Energy",
    status: "Active",
    tags: ["Clean Energy", "Technology", "Environment", "Federal"],
    requirements: ["Technical proposal", "Environmental impact assessment", "Budget plan", "Team credentials"],
    lastUpdated: "2025-01-15",
  },
  {
    id: "usa-women-004",
    name: "Women Business Centers Program",
    description: "Funding to support women entrepreneurs through business counseling and training.",
    country: "USA",
    region: "Federal",
    category: "Women Entrepreneurs",
    fundingMin: 25000,
    fundingMax: 300000,
    eligibility: ["Women-owned businesses", "Women entrepreneurs", "Non-profit organizations serving women"],
    deadline: "May 20, 2025",
    applicationLink: "https://www.sba.gov/offices/headquarters/owe/resources/1084991",
    agency: "Small Business Administration",
    status: "Active",
    tags: ["Women", "Entrepreneurship", "Training", "Federal"],
    requirements: ["Business registration", "Program proposal", "Community impact plan", "Budget breakdown"],
    lastUpdated: "2025-01-15",
  },
  {
    id: "usa-minority-005",
    name: "Minority Business Development Agency Grants",
    description: "Support for minority-owned businesses to access capital and expand operations.",
    country: "USA",
    region: "Federal",
    category: "Minority Business",
    fundingMin: 15000,
    fundingMax: 400000,
    eligibility: ["Minority-owned businesses", "Socially disadvantaged businesses", "51% minority ownership"],
    deadline: "June 10, 2025",
    applicationLink: "https://www.mbda.gov/grants-and-contracts",
    agency: "Minority Business Development Agency",
    status: "Active",
    tags: ["Minority", "Diversity", "Business Development", "Federal"],
    requirements: ["Ownership documentation", "Business plan", "Financial projections", "Market analysis"],
    lastUpdated: "2025-01-15",
  },

  // USA State Grants
  {
    id: "usa-ca-006",
    name: "California Small Business Loan Guarantee Program",
    description: "State-backed loan guarantees to help small businesses access capital.",
    country: "USA",
    region: "California",
    category: "Small Business",
    fundingMin: 50000,
    fundingMax: 2500000,
    eligibility: ["California-based businesses", "Small businesses", "Job creation commitment"],
    deadline: "Rolling applications",
    applicationLink: "https://www.ibank.ca.gov/small-business/loan-guarantee-program/",
    agency: "California Infrastructure and Economic Development Bank",
    status: "Active",
    tags: ["California", "Loan Guarantee", "Small Business", "State"],
    requirements: ["Business license", "Financial statements", "Loan application", "Job creation plan"],
    lastUpdated: "2025-01-15",
  },
  {
    id: "usa-tx-007",
    name: "Texas Enterprise Fund",
    description: "Economic development incentive for businesses creating jobs in Texas.",
    country: "USA",
    region: "Texas",
    category: "Business Development",
    fundingMin: 100000,
    fundingMax: 5000000,
    eligibility: ["Businesses relocating to Texas", "Expanding Texas businesses", "Job creation requirement"],
    deadline: "Quarterly reviews",
    applicationLink: "https://gov.texas.gov/business/page/texas-enterprise-fund",
    agency: "Texas Economic Development",
    status: "Active",
    tags: ["Texas", "Job Creation", "Economic Development", "State"],
    requirements: ["Business plan", "Job creation commitment", "Economic impact analysis", "Financial projections"],
    lastUpdated: "2025-01-15",
  },

  // Canada Federal Grants
  {
    id: "can-sif-008",
    name: "Strategic Innovation Fund",
    description: "Large-scale funding for transformative business projects that drive innovation and growth.",
    country: "Canada",
    region: "Federal",
    category: "Innovation",
    fundingMin: 10000000,
    fundingMax: 100000000,
    eligibility: ["All business sizes", "Significant economic impact", "Innovation focus"],
    deadline: "Rolling applications",
    applicationLink: "https://ised-isde.canada.ca/site/strategic-innovation-fund/",
    agency: "Innovation, Science and Economic Development Canada",
    status: "Active",
    tags: ["Innovation", "Large Scale", "Federal", "Transformation"],
    requirements: ["Detailed project proposal", "Economic impact assessment", "Innovation plan", "Financial capacity"],
    lastUpdated: "2025-01-15",
  },
  {
    id: "can-csbf-009",
    name: "Canada Small Business Financing Program",
    description: "Government-backed loans to help small businesses access financing.",
    country: "Canada",
    region: "Federal",
    category: "Small Business",
    fundingMin: 25000,
    fundingMax: 1000000,
    eligibility: ["Small businesses", "For-profit companies", "Operating in Canada"],
    deadline: "Ongoing",
    applicationLink: "https://ised-isde.canada.ca/site/canada-small-business-financing-program/",
    agency: "Innovation, Science and Economic Development Canada",
    status: "Active",
    tags: ["Small Business", "Financing", "Federal", "Loans"],
    requirements: ["Business registration", "Financial statements", "Business plan", "Collateral"],
    lastUpdated: "2025-01-15",
  },
  {
    id: "can-women-010",
    name: "Women Entrepreneurship Strategy",
    description: "Comprehensive support for women-owned businesses including funding and mentorship.",
    country: "Canada",
    region: "Federal",
    category: "Women Entrepreneurs",
    fundingMin: 10000,
    fundingMax: 500000,
    eligibility: ["Women-owned businesses", "Majority women ownership", "Canadian businesses"],
    deadline: "March 31, 2025",
    applicationLink: "https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/",
    agency: "Innovation, Science and Economic Development Canada",
    status: "Active",
    tags: ["Women", "Entrepreneurship", "Federal", "Support"],
    requirements: ["Ownership verification", "Business plan", "Growth strategy", "Impact measurement"],
    lastUpdated: "2025-01-15",
  },
  {
    id: "can-indigenous-011",
    name: "Indigenous Business Development Program",
    description: "Funding and support for Indigenous entrepreneurs and businesses.",
    country: "Canada",
    region: "Federal",
    category: "Indigenous Business",
    fundingMin: 5000,
    fundingMax: 300000,
    eligibility: ["Indigenous entrepreneurs", "Indigenous-owned businesses", "Community development projects"],
    deadline: "Rolling applications",
    applicationLink: "https://www.sac-isc.gc.ca/eng/1100100033057/1533641696528",
    agency: "Indigenous Services Canada",
    status: "Active",
    tags: ["Indigenous", "Community Development", "Federal", "Cultural"],
    requirements: ["Indigenous status verification", "Community support letter", "Business plan", "Cultural impact"],
    lastUpdated: "2025-01-15",
  },

  // Canada Provincial Grants
  {
    id: "can-on-012",
    name: "Ontario Small Business Support Grant",
    description: "Provincial support for small businesses affected by economic challenges.",
    country: "Canada",
    region: "Ontario",
    category: "Small Business",
    fundingMin: 10000,
    fundingMax: 75000,
    eligibility: ["Ontario businesses", "Small businesses", "Revenue impact demonstration"],
    deadline: "February 28, 2025",
    applicationLink: "https://www.ontario.ca/page/businesses-get-help-covid-19-costs",
    agency: "Ontario Ministry of Economic Development",
    status: "Active",
    tags: ["Ontario", "Small Business", "Provincial", "Support"],
    requirements: ["Business registration in Ontario", "Revenue documentation", "Impact statement", "Recovery plan"],
    lastUpdated: "2025-01-15",
  },
  {
    id: "can-qc-013",
    name: "Quebec Innovation Tax Credit",
    description: "Tax credits for businesses investing in research and development in Quebec.",
    country: "Canada",
    region: "Quebec",
    category: "Innovation",
    fundingMin: 20000,
    fundingMax: 1000000,
    eligibility: ["Quebec businesses", "R&D activities", "Qualified expenditures"],
    deadline: "Annual filing",
    applicationLink: "https://www.investquebec.com/quebec/en",
    agency: "Investissement Québec",
    status: "Active",
    tags: ["Quebec", "Innovation", "Tax Credit", "R&D"],
    requirements: [
      "Quebec business registration",
      "R&D project documentation",
      "Expenditure receipts",
      "Technical reports",
    ],
    lastUpdated: "2025-01-15",
  },
]

export function getGrantsByCountry(country: "USA" | "Canada"): Grant[] {
  return grantsDatabase.filter((grant) => grant.country === country)
}

export function getGrantsByCategory(category: string): Grant[] {
  return grantsDatabase.filter((grant) => grant.category === category)
}

export function getGrantsByRegion(region: string): Grant[] {
  return grantsDatabase.filter((grant) => grant.region === region)
}

export function searchGrants(query: string): Grant[] {
  const lowercaseQuery = query.toLowerCase()
  return grantsDatabase.filter(
    (grant) =>
      grant.name.toLowerCase().includes(lowercaseQuery) ||
      grant.description.toLowerCase().includes(lowercaseQuery) ||
      grant.category.toLowerCase().includes(lowercaseQuery) ||
      grant.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}

export function getGrantById(id: string): Grant | undefined {
  return grantsDatabase.find((grant) => grant.id === id)
}

export function formatFundingRange(min: number, max: number): string {
  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`
    } else {
      return `$${amount.toLocaleString()}`
    }
  }

  if (min === max) {
    return formatAmount(min)
  }
  return `${formatAmount(min)} - ${formatAmount(max)}`
}
