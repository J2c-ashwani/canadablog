import { QualifiedOpportunity, OutreachDraft, OutreachAngle } from "./types";
import { AssetScanner } from "./asset-scanner";

/**
 * Generates personalized outreach emails for qualified opportunities
 * using template-based generation grounded in own-site content.
 */
export class OutreachGenerator {
  /**
   * Generates a single outreach draft for a given qualified opportunity.
   *
   * @param {QualifiedOpportunity} opp - The opportunity to generate outreach for
   * @returns {OutreachDraft} The generated outreach draft
   */
  static generateOutreach(opp: QualifiedOpportunity): OutreachDraft {
    // 1. Select best FSI Digital asset
    const bestAssetObj = AssetScanner.getAssetForCategory(opp.category);
    const bestAsset = bestAssetObj ? bestAssetObj.url : "/canada/small-business-grants";

    // 2. Determine OutreachAngle
    let angle: OutreachAngle = "resource_suggestion";
    if (opp.category === "startup_directory" || opp.category === "resource_page") {
      angle = "resource_suggestion";
    } else if (opp.category === "incubator" || opp.category === "accelerator") {
      angle = "content_collaboration";
    } else if (opp.category === "industry_blog") {
      angle = "data_contribution";
    }

    // 3. Generate personalized subject and body
    const siteTitle = opp.metadata?.siteTitle || opp.website;
    const prospectName = opp.prospectName || siteTitle;
    
    const subject = `Small business funding resource for ${prospectName}`;
    const subjectVariants = [
      `Quick question regarding ${siteTitle} resources`,
      `Collaboration idea for ${prospectName} audience`
    ];

    const body = `Hi ${prospectName},

I was reviewing ${siteTitle} recently and noticed your excellent coverage of resources for founders and entrepreneurs.

Given your focus on supporting growing companies, I wanted to share a comprehensive resource we've developed on Canadian funding programs: ${bestAsset}. It covers the latest federal and provincial grants, including specific eligibility criteria that your audience might find highly relevant. We regularly update this data to ensure accuracy and have seen it help many founders navigate the complex landscape of non-dilutive capital.

Would your team be open to reviewing this resource to see if it's a good fit to share with your community? I'd be happy to provide any additional data or context you might need or even put together a custom summary for your readers.

Best regards,
Ashwani Kumar
Founder, FSI Digital

--
If you'd prefer not to receive these emails, please reply with "unsubscribe".`;

    // 4. Calculate analytics-only aiQualityScore (0-100)
    let aiQualityScore = 0;
    
    if (siteTitle && body.includes(siteTitle)) {
      aiQualityScore += 25;
    }
    
    if (body.includes("comprehensive resource") || body.includes("Canadian funding programs")) {
      aiQualityScore += 25;
    }
    
    const wordCount = body.trim().split(/\s+/).length;
    if (wordCount >= 120 && wordCount <= 250) {
      aiQualityScore += 25;
    }
    
    if (body.includes("Would your team be open")) {
      aiQualityScore += 25;
    }

    // 5. Return complete OutreachDraft object matching types.ts
    return {
      prospectId: opp.id,
      category: opp.category,
      angle,
      subject,
      subjectVariants,
      body,
      fsiAssetUsed: bestAsset,
      personalizationTokens: {
        websiteName: opp.website,
        specificReference: opp.metadata?.siteDescription || siteTitle,
        relevantResource: bestAsset
      },
      aiQualityScore,
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Generates outreach drafts for a batch of qualified opportunities.
   *
   * @param {QualifiedOpportunity[]} opps - Array of qualified opportunities
   * @returns {OutreachDraft[]} Array of generated outreach drafts
   */
  static generateBatch(opps: QualifiedOpportunity[]): OutreachDraft[] {
    return opps.map((opp) => this.generateOutreach(opp));
  }
}
