// lib/mca/partner-routing.config.ts
// MCA Partner Routing — Configuration Layer
//
// To add a new partner: add an entry to this array.
// To disable a partner: set active: false.
// No application logic changes required.

import { PartnerRoutingRule } from './types';

export const partnerRoutingRules: PartnerRoutingRule[] = [
  {
    partnerId: 'partner-primary',
    name: 'Primary Funding Partner',
    active: true,
    priority: 1,
    filters: {
      industries: null,        // accepts all industries
      provinces: null,         // accepts all Canadian provinces
      minBand: 'D',            // accepts all priority bands — partner decides
      minMonthlyRevenue: 5000, // minimum $5K/month
    },
    deliveryMethod: 'email',
    contactEmail: process.env.MCA_PARTNER_PRIMARY_EMAIL,
  },
  // Future partners can be added here:
  // {
  //   partnerId: 'partner-b',
  //   name: 'Partner B (Trucking Specialist)',
  //   active: false,
  //   priority: 2,
  //   filters: {
  //     industries: ['trucking', 'transportation'],
  //     provinces: ['AB', 'SK', 'MB', 'BC'],
  //     minBand: 'C',
  //     minMonthlyRevenue: 15000,
  //   },
  //   deliveryMethod: 'webhook',
  //   webhookUrl: process.env.MCA_PARTNER_B_WEBHOOK_URL,
  // },
];

/**
 * Returns all active partner rules that match the given application.
 */
export function getMatchingPartners(
  industry: string,
  province: string,
  band: string,
  monthlyRevenue: number
): PartnerRoutingRule[] {
  return partnerRoutingRules.filter((rule) => {
    if (!rule.active) return false;

    const industryMatch =
      rule.filters.industries === null ||
      rule.filters.industries.includes(industry.toLowerCase());

    const provinceMatch =
      rule.filters.provinces === null ||
      rule.filters.provinces.includes(province.toUpperCase());

    const bandOrder = ['A', 'B', 'C', 'D'];
    const bandMatch =
      bandOrder.indexOf(band) <= bandOrder.indexOf(rule.filters.minBand);

    const revenueMatch = monthlyRevenue >= rule.filters.minMonthlyRevenue;

    return industryMatch && provinceMatch && bandMatch && revenueMatch;
  });
}
