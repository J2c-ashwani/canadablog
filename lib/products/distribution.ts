export type DistributedOfferId = 'match-report' | 'toolkit' | 'action-plan' | 'bundle' | 'membership';

export interface DistributedOffer {
  id: DistributedOfferId;
  name: string;
  shortName: string;
  priceLabel: string;
  description: string;
  action: string;
}

export const DISTRIBUTED_OFFERS: Record<DistributedOfferId, DistributedOffer> = {
  'match-report': {
    id: 'match-report',
    name: 'Funding Match Report',
    shortName: 'Match Report',
    priceLabel: '$19 USD',
    description: 'See matched programs, estimated ranges, requirements, and priority order.',
    action: 'Get my matches',
  },
  toolkit: {
    id: 'toolkit',
    name: 'Funding Application Toolkit',
    shortName: 'Application Toolkit',
    priceLabel: '$29 USD',
    description: 'Use downloadable budgets, worksheets, checklists, and preparation templates.',
    action: 'Get the toolkit',
  },
  'action-plan': {
    id: 'action-plan',
    name: 'Funding Action Plan',
    shortName: 'Action Plan',
    priceLabel: '$49 USD',
    description: 'Turn funding research into a sequenced application and document plan.',
    action: 'Build my action plan',
  },
  bundle: {
    id: 'bundle',
    name: 'Complete Funding Blueprint',
    shortName: 'Complete Blueprint',
    priceLabel: '$79 USD',
    description: 'Combine matching, application planning, and multi-year funding-stack simulation.',
    action: 'Get the complete blueprint',
  },
  membership: {
    id: 'membership',
    name: 'Funding Watch',
    shortName: 'Funding Watch',
    priceLabel: '$29 USD/month',
    description: 'Receive an automated weekly funding radar based on your saved business profile.',
    action: 'Start Funding Watch',
  },
};

const MONITORING_INTENT = /(?:calendar|deadline|alert|watch|news|update|program-updates|funding-report)/;
const TOOL_INTENT = /(?:template|worksheet|toolkit|budget-template|cash-flow-template)/;
const BUNDLE_INTENT = /(?:stack|portfolio|multiple|strategy|blueprint|roadmap|funding-plan|capital-plan)/;
const ACTION_INTENT = /(?:application|apply|how-to|checklist|proposal|document|requirement|writing|submission)/;

/**
 * Selects one current, self-serve offer from first-party page intent. The
 * classifier is deliberately deterministic so Growth OS can compare revenue
 * by surface and offer without an opaque recommendation model.
 */
export function selectDistributedOffer(
  pathnameOrContext: string,
  fallback: DistributedOfferId = 'match-report'
): DistributedOffer {
  const context = pathnameOrContext.toLowerCase();
  if (MONITORING_INTENT.test(context)) return DISTRIBUTED_OFFERS.membership;
  if (TOOL_INTENT.test(context)) return DISTRIBUTED_OFFERS.toolkit;
  if (BUNDLE_INTENT.test(context)) return DISTRIBUTED_OFFERS.bundle;
  if (ACTION_INTENT.test(context)) return DISTRIBUTED_OFFERS['action-plan'];
  return DISTRIBUTED_OFFERS[fallback];
}

export function isPaidDistributionContentRoute(pathname: string) {
  return [
    '/blog',
    '/guides',
    '/programs',
    '/grants',
    '/canada',
    '/usa',
    '/calendar',
    '/program-updates',
    '/news',
    '/research',
    '/database',
    '/resources',
    '/expert-insights',
    '/case-studies',
    '/how-to-apply-usa',
  ].some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

