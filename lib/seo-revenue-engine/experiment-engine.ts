import { SEORevenueExperiment, SEORevenueOpportunity } from './types'

/**
 * FSI SEO Revenue Experiment Engine (War Mode v1.0)
 * 
 * Enforces rigorous commercial tracking for all deployed page optimizations:
 * - Every deployed change receives a unique ID (e.g. SEO-2026-08-14-001)
 * - Records baseline metrics, projected revenue, and applied changes
 * - Evaluates conversion velocity after 14–28 days:
 *   CTR ↑ Clicks ↑ Revenue ↑ ──► SCALE
 *   CTR ↑ Clicks ↑ Revenue = 0 ──► CONVERSION / OFFER ISSUE
 *   CTR unchanged ──► TITLE / SERP ISSUE
 *   Position drops ──► CONTENT / INTENT ISSUE
 */

export class SEOExperimentEngine {
  private static experiments: SEORevenueExperiment[] = []

  public static createExperimentFromOpportunity(
    opp: SEORevenueOpportunity,
    appliedTitle: string,
    appliedMeta: string,
    appliedH1: string
  ): SEORevenueExperiment {
    const today = new Date().toISOString().split('T')[0]
    const expId = `SEO-${today}-${String(this.experiments.length + 1).padStart(3, '0')}`

    const experiment: SEORevenueExperiment = {
      experimentId: expId,
      urlPath: opp.urlPath,
      targetKeyword: opp.targetKeyword,
      targetOfferTier: opp.recommendedOfferTier,
      status: 'PROPOSED',
      deployedAt: new Date().toISOString(),
      measurementWindowDays: 21,
      baselineMetrics: {
        impressions: opp.impressions,
        clicks: opp.clicks,
        ctr: opp.currentCTR,
        position: opp.currentPosition,
        leadsCaptured: 0,
        checkoutsStarted: 0,
        revenueCollectedUSD: 0
      },
      projectedMetrics: {
        targetCTR: opp.targetCTR,
        targetClicks: Math.round(opp.impressions * (opp.targetCTR / 100)),
        targetRevenueUSD: opp.projectedMonthlyExpectedRevenueUSD
      },
      appliedChanges: {
        title: appliedTitle,
        metaDescription: appliedMeta,
        h1: appliedH1,
        injectedCTAs: [
          opp.contentAttackPlan?.commercialCTABlocks.heroCTA || 'Free Eligibility Screener',
          opp.contentAttackPlan?.commercialCTABlocks.midPageCTA || '$49 Funding Action Plan',
          opp.contentAttackPlan?.commercialCTABlocks.bottomStrategyCTA || '$199 Strategy Session'
        ],
        internalLinksAdded: opp.internalLinkPlan?.map(l => `${l.recommendedAnchorText} ──► ${l.destinationUrlPath}`) || []
      }
    }

    this.experiments.push(experiment)
    return experiment
  }

  public static getActiveExperiments(): SEORevenueExperiment[] {
    return this.experiments
  }
}
