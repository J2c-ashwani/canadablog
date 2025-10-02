// lib/data/guides.ts
export type Guide = {
  slug: string;
  title: string;
  description: string;
  region?: "USA" | "Canada" | "Both";
  categories?: string[];
};

export const guides: Guide[] = [
  {
    slug: "apply-federal-grants",
    title: "How to Apply for Federal Grants",
    description: "Complete guide to applying for federal and state grants in the USA",
    region: "USA",
    categories: ["Federal Grants", "Small Business"]
  },
  {
    slug: "apply-sba-loans", 
    title: "SBA Loans Application Guide",
    description: "Step-by-step SBA loan application process",
    region: "USA",
    categories: ["Small Business"]
  },
  {
    slug: "apply-csbfp-loans",
    title: "CSBFP Loans Guide", 
    description: "Canada Small Business Financing Program guide",
    region: "Canada",
    categories: ["Small Business"]
  }
];
EOF
