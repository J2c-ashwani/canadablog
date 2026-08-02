/**
 * Growth OS — Content Factory & Content Intelligence Pipeline
 * Orchestrates Master Research Package, EEAT Engine, Schema/Internal Linking, Content QA Audit,
 * and selectively repurposes approved master research into multi-channel distribution assets.
 */

import { RevenueOpportunity } from "../types"
import { DistributionOpportunity } from "./distribution-intelligence"
import { MasterResearchPackageBuilder, MasterResearchPackage } from "../content/master-research-package"
import { EEATEngine, EEATMetadata } from "../content/eeat-engine"
import { SchemaInternalLinkingEngine, SchemaPackage } from "../content/schema-internal-linking-engine"
import { ContentQAAuditor, QAAuditReport } from "../content/content-qa-auditor"

export interface MultiChannelAssetPackage {
  opportunityId: string
  title: string
  researchPackage: MasterResearchPackage
  eeat: EEATMetadata
  schema: SchemaPackage
  qaReport: QAAuditReport
  blogGuide: { title: string; excerpt: string; ctaText: string; wordCountTarget: number }
  linkedInPost: { copy: string; hashtags: string[] }
  socialCarousel: { slides: { slideNumber: number; title: string; content: string }[] }
  newsletterSection: { subjectLine: string; body: string }
  shortVideoScript: { hook: string; body: string; callToAction: string }
  faqExpansion: { question: string; answer: string }[]
  partnerBlock: { title: string; summary: string; referralCta: string }
}

export class ContentFactory {
  public static buildAssetPackage(
    opportunity: RevenueOpportunity,
    distOpportunity: DistributionOpportunity
  ): MultiChannelAssetPackage {
    // 1. Build Master Verified Research Package
    const researchPackage = MasterResearchPackageBuilder.buildPackage(opportunity)

    // 2. Apply EEAT Engine
    const eeat = EEATEngine.generateEEATPackage(researchPackage)

    // 3. Apply Schema & Internal Linking Engine
    const schema = SchemaInternalLinkingEngine.generateSchemaAndLinks(researchPackage)

    // 4. Perform Content QA Audit
    const simulatedWordCount = researchPackage.wordCountTarget.targetWords
    const qaReport = ContentQAAuditor.auditContentPackage(researchPackage, eeat, schema, simulatedWordCount)

    if (qaReport.overallStatus === "REJECTED") {
      console.warn(`[ContentFactory] Content QA Audit rejected opportunity '${opportunity.id}':`, qaReport.auditWarnings)
    }

    const title = opportunity.trigger
    const audience = opportunity.buyerSegment
    const product = opportunity.recommendedProduct
    const link = `https://fsidigital.ca${opportunity.targetLandingPage}`

    const isUS = opportunity.targetLandingPage.includes("/usa") || opportunity.trigger.toLowerCase().includes("sbir") || opportunity.trigger.toLowerCase().includes("usda") || opportunity.trigger.toLowerCase().includes("nih") || opportunity.trigger.toLowerCase().includes("nsf") || opportunity.trigger.toLowerCase().includes("sba");
    
    const northAmericanHashtags = isUS
      ? ["#SmallBusinessGrants", "#SBIR", "#STTR", "#SBA", "#USBusinessGrants", "#TechStartups", "#NonDilutiveCapital", "#FounderFunding"]
      : ["#CanadianBusiness", "#IRAP", "#SRED", "#CanExport", "#SmallBusinessGrants", "#GovernmentGrants", "#NorthAmericanBusiness", "#FounderFunding"];

    return {
      opportunityId: opportunity.id,
      title,
      researchPackage,
      eeat,
      schema,
      qaReport,
      blogGuide: {
        title: `North American Founder Guide: ${title} for ${audience}`,
        excerpt: `Discover the exact eligibility criteria, funding caps, and application order for ${title}. Reviewed by ${eeat.authorName} on ${eeat.lastReviewedDate}.`,
        ctaText: `Claim Your Custom ${product}`,
        wordCountTarget: researchPackage.wordCountTarget.targetWords,
      },
      linkedInPost: {
        copy: `🚨 North American Funding Update for ${audience}:\n\n${title} application windows are officially active.\n\nKey details:\n• Non-Dilutive Capital: Up to $150,000+ non-repayable\n• Who Qualifies: Active ${audience}\n• Application Strategy: Stack compliant programs without forfeiting eligibility.\n\nVerified by ${eeat.authorName} (${eeat.authorRole}).\nRead full North American breakdown: ${link}`,
        hashtags: northAmericanHashtags,
      },
      socialCarousel: {
        slides: [
          { slideNumber: 1, title: title, content: `North American Funding Intake Guide for ${audience}` },
          { slideNumber: 2, title: "Who Qualifies?", content: `Active ${audience} with non-dilutive capital needs.` },
          { slideNumber: 3, title: "Common Mistakes", content: "Applying in the wrong order or failing stacking limits." },
          { slideNumber: 4, title: "Next Steps", content: `Get your custom ${product} at ${link}` },
        ],
      },
      newsletterSection: {
        subjectLine: `[North American Funding Alert] ${title} - Intake Open`,
        body: `Hi Founder,\n\nNew non-repayable capital intake has opened: ${title}.\n\nIf you are operating as a ${audience}, check your custom eligibility here: ${link}`,
      },
      shortVideoScript: {
        hook: `If you run a ${audience} in North America, stop scrolling!`,
        body: `A new funding intake just opened for ${title}. You could be eligible for non-repayable grants up to $150,000. Don't make the mistake of applying without checking stacking rules.`,
        callToAction: `Tap the link in bio to check your ${product}!`,
      },
      faqExpansion: [
        {
          question: `How do North American businesses apply for ${title}?`,
          answer: `Applications are processed directly through official program channels. Verify your stacking limits using our ${product} before submitting.`,
        },
        {
          question: `Can I stack ${title} with other federal or state/provincial grants?`,
          answer: `Yes, provided total government assistance does not exceed compliance caps for eligible project costs.`,
        },
      ],
      partnerBlock: {
        title: `Partner Funding Alert: ${title}`,
        summary: `New capital intake announced for ${audience}. Share this verified breakdown with your clients.`,
        referralCta: `View Partner Breakdown & Referral Link`,
      },
    }
  }
}
