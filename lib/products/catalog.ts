export type ProductId = 'funding-match-report' | 'funding-roadmap' | 'funding-bundle' | 'funding-toolkit' | 'funding-approval-library' | 'strategy-audit';

export interface Product {
  id: ProductId;
  name: string;
  slug: string;
  priceUsd: number;
  tagline: string;
  description: string;
  features: string[];
  deliverables: string[];
}

export const PRODUCTS: Record<ProductId, Product> = {
  'funding-match-report': {
    id: 'funding-match-report',
    name: 'Funding Match Report',
    slug: 'funding-match-report',
    priceUsd: 19,
    tagline: 'See exactly which funding programs match your business',
    description:
      'Your personalized Funding Match Report identifies the specific government grants, tax credits, and loans your business may qualify for — with estimated funding ranges, application requirements, and recommended next steps.',
    features: [
      'Programs you may qualify for',
      'Estimated funding ranges',
      'Required documents & application steps',
      'Application difficulty rating',
      'Recommended next steps',
      'Funding readiness score',
      'Priority ranking',
    ],
    deliverables: [
      'Instant online report',
      'Email copy for your records',
      'Permanent access via secure link',
    ],
  },
  'funding-roadmap': {
    id: 'funding-roadmap',
    name: 'Funding Action Plan',
    slug: 'funding-roadmap',
    priceUsd: 49,
    tagline: 'Get your prioritized funding timeline and step-by-step action plan',
    description:
      'Your personalized Funding Action Plan ranks matching programs, schedules your application timeline across Months 1-4, details potential risk factors, and provides a clear next-actions checklist.',
    features: [
      'Priority program ranking',
      'Application sequence mapping',
      'Month 1-4 timeline schedule',
      'Program risk warning indicators',
      'Dynamic document checklist',
      'Immediate next-actions task list',
    ],
    deliverables: [
      'Instant online action plan',
      'Downloadable PDF action guide',
      'Permanent access via secure link',
    ],
  },
  'funding-bundle': {
    id: 'funding-bundle',
    name: 'Complete Funding Bundle',
    slug: 'funding-bundle',
    priceUsd: 79,
    tagline: 'Get both the Funding Match Report and the step-by-step Funding Action Plan',
    description:
      'The complete package: Identifies all matching funding programs with estimated amounts, then schedules them into a prioritized Month 1-4 action roadmap with custom document checklists and risk analysis.',
    features: [
      'Everything in the Funding Match Report',
      'Everything in the Funding Action Plan',
      'Combined interactive web dashboard',
      'Combined downloadable PDF report',
      'Highest value pricing',
    ],
    deliverables: [
      'Instant online match report & action plan',
      'Combined downloadable PDF guide',
      'Permanent access via secure link',
    ],
  },
  'funding-toolkit': {
    id: 'funding-toolkit',
    name: 'Funding Application Toolkit',
    slug: 'funding-toolkit',
    priceUsd: 29,
    tagline: 'Download our premium application templates and financial models',
    description:
      'A comprehensive set of 6 downloadable templates, tools, and calculators designed to save you over 40 hours of preparation when writing applications.',
    features: [
      'Grant Budget Template (Excel/Sheets)',
      'Cash Flow Forecast Model',
      'Hiring & Training Plan Template',
      'Project Proposal Outline',
      'Funding Readiness Checklist',
      'Grant Application Tracking Sheet',
    ],
    deliverables: [
      'Instant download links on-screen',
      'Backup templates package sent to email',
    ],
  },
  'funding-approval-library': {
    id: 'funding-approval-library',
    name: 'Funding Approval Library',
    slug: 'funding-approval-library',
    priceUsd: 9,
    tagline: 'See real winning grant applications, project descriptions and budgets',
    description:
      'Analyze real-world successful grant proposals, research projects, and hiring plan texts that won non-repayable government funding.',
    features: [
      'Successful R&D (SR&ED/IRAP) Project Outlines',
      'Winning Hiring Grant Descriptions',
      'Real Budgets Submitted & Approved',
      'Step-by-Step Framing Instructions',
    ],
    deliverables: [
      'Instant digital dashboard access',
      'Downloadable PDF guide with examples',
    ],
  },
  'strategy-audit': {
    id: 'strategy-audit',
    name: 'Funding Strategy Audit',
    slug: 'strategy-audit',
    priceUsd: 199,
    tagline: '1-on-1 Strategy Consultation & custom Eligibility Audit',
    description:
      'Get a custom pre-call eligibility review against 800+ programs, a downloadable report, and a 30-minute 1-on-1 strategy call with a senior advisor.',
    features: [
      'Pre-call custom eligibility review',
      'Top 3 high-probability matches',
      '30-minute 1-on-1 strategy call',
      'Application roadmap & stack timeline',
      '100% refund guarantee if not eligible',
    ],
    deliverables: [
      'Custom Funding Eligibility Report PDF',
      '1-on-1 Strategy Consultation call slot',
      'Calendly booking access link',
    ],
  },
};

export function getProduct(productId: string): Product | null {
  return PRODUCTS[productId as ProductId] || null;
}
