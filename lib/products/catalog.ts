export type ProductId = 'funding-match-report';

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
};

export function getProduct(productId: string): Product | null {
  return PRODUCTS[productId as ProductId] || null;
}
