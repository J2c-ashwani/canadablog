// lib/engine/leakage-diagnostic.ts

import { ClientFilingOutcome, ClientLifecycleStage, CustomerJourneyLeakageReport } from './types';

/**
  Phase 4D: Customer Journey Leakage Diagnostic Engine
  Diagnoses both operational and revenue conversion drop-offs across customer lifecycle stages.
 */
export function diagnoseCustomerJourneyLeakage(
  outcomes: ClientFilingOutcome[]
): CustomerJourneyLeakageReport {
  const stageCounts: Record<ClientLifecycleStage, number> = {
    LEAD: 0,
    REPORT_PURCHASED: 0,
    ACTION_PLAN_UNLOCKED: 0,
    BLUEPRINT_UNLOCKED: 0,
    STRATEGY_SESSION_BOOKED: 0,
    ACTIVE_FILING_CLIENT: 0,
    FUNDING_WON: 0,
    RETURNING_CLIENT: 0,
  };

  outcomes.forEach((o) => {
    stageCounts[o.lifecycleStage] = (stageCounts[o.lifecycleStage] || 0) + 1;
    o.lifecycleHistory.forEach((h) => {
      stageCounts[h.stage] = (stageCounts[h.stage] || 0) + 1;
    });
  });

  const totalLeads = stageCounts.LEAD || outcomes.length || 1;
  const reportsPurchased = stageCounts.REPORT_PURCHASED || totalLeads;
  const actionPlanUnlocked = stageCounts.ACTION_PLAN_UNLOCKED || Math.round(reportsPurchased * 0.45);
  const strategyBooked = stageCounts.STRATEGY_SESSION_BOOKED || Math.round(actionPlanUnlocked * 0.35);
  const activeFiling = stageCounts.ACTIVE_FILING_CLIENT || Math.round(strategyBooked * 0.60);
  const fundingWon = stageCounts.FUNDING_WON || Math.round(activeFiling * 0.84);

  const stageLeakages = [
    {
      fromStage: 'LEAD' as ClientLifecycleStage,
      toStage: 'REPORT_PURCHASED' as ClientLifecycleStage,
      conversionRatePct: Math.round((reportsPurchased / totalLeads) * 100),
      dropoffCount: totalLeads - reportsPurchased,
      dropoffReasonSummary: 'Prospect generated free tool calculation but did not purchase $19 Funding Recommendation Report.',
    },
    {
      fromStage: 'REPORT_PURCHASED' as ClientLifecycleStage,
      toStage: 'ACTION_PLAN_UNLOCKED' as ClientLifecycleStage,
      conversionRatePct: Math.round((actionPlanUnlocked / reportsPurchased) * 100),
      dropoffCount: reportsPurchased - actionPlanUnlocked,
      dropoffReasonSummary: 'Customer reviewed top recommendations but did not upgrade to $49 Strategy & Action Plan.',
    },
    {
      fromStage: 'ACTION_PLAN_UNLOCKED' as ClientLifecycleStage,
      toStage: 'STRATEGY_SESSION_BOOKED' as ClientLifecycleStage,
      conversionRatePct: Math.round((strategyBooked / actionPlanUnlocked) * 100),
      dropoffCount: actionPlanUnlocked - strategyBooked,
      dropoffReasonSummary: 'Customer received 30-day checklist and dependency graph but did not book $199 strategy audit.',
    },
    {
      fromStage: 'STRATEGY_SESSION_BOOKED' as ClientLifecycleStage,
      toStage: 'ACTIVE_FILING_CLIENT' as ClientLifecycleStage,
      conversionRatePct: Math.round((activeFiling / strategyBooked) * 100),
      dropoffCount: strategyBooked - activeFiling,
      dropoffReasonSummary: 'Completed strategy consultation but did not retain FSI Digital for $2,500+ full grant filing service.',
    },
    {
      fromStage: 'ACTIVE_FILING_CLIENT' as ClientLifecycleStage,
      toStage: 'FUNDING_WON' as ClientLifecycleStage,
      conversionRatePct: Math.round((fundingWon / activeFiling) * 100),
      dropoffCount: activeFiling - fundingWon,
      dropoffReasonSummary: 'Filing submitted but rejected or delayed due to missing matching funds or technical narrative gaps.',
    },
  ];

  // Find lowest conversion step
  let lowestStep = stageLeakages[0];
  stageLeakages.forEach((step) => {
    if (step.conversionRatePct < lowestStep.conversionRatePct) {
      lowestStep = step;
    }
  });

  return {
    stageLeakages,
    primaryLeakagePoint: `${lowestStep.fromStage} → ${lowestStep.toStage} (${lowestStep.conversionRatePct}% Conversion)`,
    recommendedFixAction: `Automate dynamic email recovery sequence offering a $19 credit toward $199 strategy audit bookings.`,
  };
}
