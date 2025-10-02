// lib/data/grants.ts
export type Grant = {
  id: string;
  name: string;
  region: "USA" | "Canada" | string; // e.g., "USA", "Canada", "USA:California"
  stateOrProvince?: string; // e.g., "California", "Ontario"
  category: string; // e.g., "Federal Grants", "Small Business", "Women Entrepreneurs"
  description?: string;
  amountMin?: number | null;
  amountMax?: number | null;
  deadline?: string | null; // ISO or null
  link?: string;
};

export const grants: Grant[] = [
  {
    id: "sbir",
    name: "SBIR Phase I",
    region: "USA",
    category: "Research & Innovation",
    description: "Small Business Innovation Research grant for early-stage R&D.",
    amountMin: 50000,
    amountMax: 150000,
    deadline: "2025-11-15",
    link: "https://www.sbir.gov",
  },
  {
    id: "sba-growth",
    name: "SBA Growth Accelerator Fund",
    region: "USA",
    category: "Small Business",
    description: "Support for accelerators and small businesses.",
    amountMin: 10000,
    amountMax: 50000,
    deadline: null,
    link: "https://www.sba.gov",
  },
  {
    id: "canada-ideaboost",
    name: "Canada Idea to Innovation",
    region: "Canada",
    category: "Startup Grants",
    description: "Funding support for Canadian early-stage startups.",
    amountMin: 20000,
    amountMax: 100000,
    deadline: "2025-12-01",
    link: "https://www.canada.ca",
  },
  {
    id: "california-smallbiz",
    name: "California Small Business Grant",
    region: "USA",
    stateOrProvince: "California",
    category: "Small Business",
    description: "State-level grant for California small businesses impacted by natural disaster.",
    amountMin: 5000,
    amountMax: 25000,
    deadline: "2025-10-30",
    link: "https://business.ca.gov",
  },
];
