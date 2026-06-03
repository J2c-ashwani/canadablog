export type PartnerPackageId = 'shared-pilot' | 'exclusive-pilot' | 'booked-call-pilot';

export type PartnerPackage = {
  id: PartnerPackageId;
  name: string;
  priceUsd: number;
  leadCount: string;
  leadType: string;
  description: string;
  delivery: string;
  features: string[];
  popular?: boolean;
};

export const PARTNER_PACKAGES: PartnerPackage[] = [
  {
    id: 'shared-pilot',
    name: 'Shared Lead Pilot',
    priceUsd: 299,
    leadCount: '10 leads',
    leadType: 'Shared qualified leads',
    description: 'A starter pilot for funding advisors who want to test FSI Digital lead quality before a monthly plan.',
    delivery: 'Manual delivery after partner approval and lead availability confirmation.',
    features: [
      'Redacted sample review before private lead delivery',
      'Tier, score, industry, market, and funding goal included',
      'Best for consultants testing multiple funding categories',
    ],
  },
  {
    id: 'exclusive-pilot',
    name: 'Exclusive Lead Pilot',
    priceUsd: 750,
    leadCount: '10 leads',
    leadType: 'Exclusive priority leads',
    description: 'A higher-intent pilot for partners who want first access to stronger leads in one segment or region.',
    delivery: 'Manual delivery after fit review; duplicate delivery to other partners is avoided for the package window.',
    popular: true,
    features: [
      'Higher-score leads prioritized first',
      'Category or regional focus where inventory allows',
      'Better fit for lenders, SR&ED consultants, grant consultants, and funding brokers',
    ],
  },
  {
    id: 'booked-call-pilot',
    name: 'Booked Call Pilot',
    priceUsd: 1500,
    leadCount: '5 calls',
    leadType: 'Warm booked funding calls',
    description: 'For premium partners who want warmer handoffs instead of raw lead delivery.',
    delivery: 'Manual scheduling and handoff after lead consent and partner approval.',
    features: [
      'Warm introduction instead of simple contact export',
      'Lead fit verified before handoff where possible',
      'Best for premium advisors with a clear intake and closing process',
    ],
  },
];

export function getPartnerPackage(packageId?: string | null) {
  return PARTNER_PACKAGES.find((partnerPackage) => partnerPackage.id === packageId) || null;
}
