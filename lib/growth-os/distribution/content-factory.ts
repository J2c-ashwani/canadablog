/**
 * Growth OS — Content Factory (1 Signal ──► 7 Multi-Channel Assets)
 * Transforms a single research task into 7 channel-specific distribution assets.
 */

import { RevenueOpportunity } from "../types"
import { DistributionOpportunity } from "./distribution-intelligence"

export interface MultiChannelAssetPackage {
  opportunityId: string
  title: string
  blogGuide: { title: string; excerpt: string; ctaText: string }
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
    const title = opportunity.trigger
    const audience = opportunity.buyerSegment
    const product = opportunity.recommendedProduct
    const link = `https://fsidigital.ca${opportunity.targetLandingPage}`

    return {
      opportunityId: opportunity.id,
      title,
      blogGuide: {
        title: `Comprehensive Guide: ${title} for ${audience}`,
        excerpt: `Discover the exact eligibility criteria, funding caps, and application order for ${title}.`,
        ctaText: `Claim Your Custom ${product}`,
      },
      linkedInPost: {
        copy: `Key Funding Update for ${audience}:\n\n${title} application windows are officially open.\n\nKey details:\n• Funding Caps: Up to $150,000 non-repayable\n• Who Qualifies: Active ${audience}\n• Application Order: Stack legally without forfeiting funds.\n\nRead the full eligibility breakdown here: ${link}`,
        hashtags: ["#CanadianBusiness", "#StartupFunding", "#IRAP", "#SRED", "#BusinessGrants"],
      },
      socialCarousel: {
        slides: [
          { slideNumber: 1, title: title, content: `Funding Intake Guide for ${audience}` },
          { slideNumber: 2, title: "Who Qualifies?", content: `Active ${audience} with non-dilutive capital needs.` },
          { slideNumber: 3, title: "Common Mistakes", content: "Applying in the wrong order or failing stacking limits." },
          { slideNumber: 4, title: "Next Steps", content: `Get your custom ${product} at ${link}` },
        ],
      },
      newsletterSection: {
        subjectLine: `[Funding Alert] ${title} - Intake Open`,
        body: `Hi Founder,\n\nNew non-repayable capital intake has opened: ${title}.\n\nIf you are operating as a ${audience}, check your custom eligibility here: ${link}`,
      },
      shortVideoScript: {
        hook: `If you run a ${audience}, stop scrolling!`,
        body: `A new funding intake just opened for ${title}. You could be eligible for non-repayable grants up to $150,000. Don't make the mistake of applying without checking stacking rules.`,
        callToAction: `Tap the link in bio to check your ${product}!`,
      },
      faqExpansion: [
        {
          question: `How do I apply for ${title}?`,
          answer: `Applications are processed directly through official channels. Verify your stacking limits using our ${product} before submitting.`,
        },
        {
          question: `Can I stack ${title} with other provincial grants?`,
          answer: `Yes, provided total government assistance does not exceed 75% of total eligible project costs.`,
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
