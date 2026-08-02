import { 
  AuthorityOpportunity, 
  QualifiedOpportunity, 
  AuthorityScore, 
  AuthorityTier, 
  OpportunityAction 
} from "./types";

export class OpportunityQualifier {
  /**
   * Scores discovered opportunities using the triple-score model.
   * Calculates Authority Score, Commercial Score, and Estimated ROI.
   *
   * @param opp The discovered opportunity to score
   * @returns The calculated AuthorityScore
   */
  static scoreOpportunity(opp: AuthorityOpportunity): AuthorityScore {
    const title = opp.metadata?.siteTitle?.toLowerCase() || "";
    const snippet = opp.metadata?.siteDescription?.toLowerCase() || "";
    const combinedText = `${title} ${snippet}`;
    
    // ==========================================
    // Authority Breakdown (Max 100)
    // ==========================================
    let topicalRelevance = 0; // Max 25
    if (combinedText.includes("grant") || combinedText.includes("funding")) topicalRelevance += 15;
    if (combinedText.includes("startup") || combinedText.includes("innovation")) topicalRelevance += 10;

    let domainQuality = 0; // Max 20
    if (opp.website.endsWith(".ca") || opp.website.endsWith(".org") || opp.website.endsWith(".edu")) {
      domainQuality = 20;
    } else if (opp.website.endsWith(".com")) {
      domainQuality = 15;
    } else {
      domainQuality = 10;
    }

    const indexingStatus = 15; // Max 15, default 15 if reachable
    const estimatedTraffic = 15; // Max 15, estimated from position
    const outboundLinkQuality = 10; // Max 10, default for clean domains

    let categoryAcceptance = 5; // Max 15
    if (["startup_directory", "incubator", "accelerator"].includes(opp.category as string)) {
      categoryAcceptance = 15;
    } else {
      categoryAcceptance = 10;
    }

    // ==========================================
    // Commercial Breakdown (Max 100)
    // ==========================================
    let audienceOverlap = 0; // Max 35
    if (combinedText.includes("canada") || combinedText.includes("business") || combinedText.includes("founder")) {
      audienceOverlap = 35;
    } else {
      audienceOverlap = 15;
    }

    let fundingTopicCoverage = 0; // Max 25
    if (
      combinedText.includes("irap") || 
      combinedText.includes("sr&ed") || 
      combinedText.includes("capital") || 
      combinedText.includes("loan") || 
      combinedText.includes("grant")
    ) {
      fundingTopicCoverage = 25;
    } else {
      fundingTopicCoverage = 10;
    }

    let commercialTrafficIntent = 0; // Max 25
    if (combinedText.includes("apply") || combinedText.includes("program") || combinedText.includes("funding")) {
      commercialTrafficIntent = 25;
    } else {
      commercialTrafficIntent = 10;
    }

    const referralPotential = 15; // Max 15

    // ==========================================
    // Composite Calculation
    // ==========================================
    const authorityScore = Math.min(100, Math.round(
      topicalRelevance +
      domainQuality +
      indexingStatus +
      estimatedTraffic +
      outboundLinkQuality +
      categoryAcceptance
    ));

    const commercialScore = Math.min(100, Math.round(
      audienceOverlap +
      fundingTopicCoverage +
      commercialTrafficIntent +
      referralPotential
    ));

    const estimatedROI = Math.round((authorityScore * 0.4) + (commercialScore * 0.6));

    // Determine Tier & Action
    let tier: AuthorityTier = "D";
    let action: OpportunityAction = "skip";

    if (estimatedROI >= 75) {
      tier = "A";
      action = "auto_outreach";
    } else if (estimatedROI >= 55) {
      tier = "B";
      action = "auto_outreach";
    } else if (estimatedROI >= 35) {
      tier = "C";
      action = "batch_review";
    } else {
      tier = "D";
      action = "skip";
    }

    return {
      authorityScore,
      commercialScore,
      estimatedROI,
      tier,
      recommendedAction: action,
      breakdown: {
        topicalRelevance,
        domainQuality,
        indexingStatus,
        estimatedTraffic,
        outboundLinkQuality,
        categoryAcceptance,
        audienceOverlap,
        fundingTopicCoverage,
        commercialTrafficIntent,
        referralPotential
      }
    };
  }

  /**
   * Combines the opportunity with its calculated AuthorityScore.
   *
   * @param opp The discovered opportunity
   * @returns The opportunity enriched with scoring data
   */
  static qualifyOpportunity(opp: AuthorityOpportunity): QualifiedOpportunity {
    const score = this.scoreOpportunity(opp);
    return {
      ...opp,
      score
    };
  }

  /**
   * Scores a batch of opportunities and sorts them by estimated ROI in descending order.
   *
   * @param opps Array of opportunities to qualify
   * @returns Array of qualified opportunities sorted by ROI
   */
  static qualifyBatch(opps: AuthorityOpportunity[]): QualifiedOpportunity[] {
    const qualified = opps.map(opp => this.qualifyOpportunity(opp));
    return qualified.sort((a, b) => b.score.estimatedROI - a.score.estimatedROI);
  }
}
