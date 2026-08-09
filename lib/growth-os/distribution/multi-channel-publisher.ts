/**
 * Growth OS — Multi-Channel Publisher Engine
 * Invokes live API ChannelAdapters across all 7 channels (Blog, Newsletter, LinkedIn, Carousel, Video, FAQ, Partner Block).
 */

import { MultiChannelAssetPackage } from "./content-factory"
import { DistributionOpportunity } from "./distribution-intelligence"
import { ChannelAdapters, ChannelPublishResult } from "../execution/adapters/channel-adapters"

export interface MultiChannelDispatchReceipt {
  opportunityId: string
  dispatchedChannelsCount: number
  queuedChannelsCount: number
  observedTotalReach: number
  observedTotalTraffic: number
  status: "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED" | "QUEUED_FOR_APPROVAL"
  channelResults: ChannelPublishResult[]
  channelStatusSummary: Record<string, string>
}

export class MultiChannelPublisher {
  public static async dispatchAssetPackage(
    distOpportunity: DistributionOpportunity,
    assetPackage: MultiChannelAssetPackage
  ): Promise<MultiChannelDispatchReceipt> {
    
    console.log(`[MultiChannelPublisher] Executing 7-Channel API Integrations for '${assetPackage.title}'...`)

    const slug = opportunitySlug(assetPackage.title)

    // Execute 7 Channel API Adapters
    const results: ChannelPublishResult[] = await Promise.all([
      ChannelAdapters.publishBlog(assetPackage.blogGuide.title, assetPackage.blogGuide.excerpt, slug),
      ChannelAdapters.sendNewsletter(assetPackage.newsletterSection.subjectLine, assetPackage.newsletterSection.body),
      ChannelAdapters.postLinkedIn(assetPackage.linkedInPost.copy, assetPackage.linkedInPost.hashtags),
      ChannelAdapters.queueCarousel(assetPackage.title, assetPackage.socialCarousel.slides.length),
      ChannelAdapters.queueVideoScript(assetPackage.shortVideoScript.hook),
      ChannelAdapters.publishFAQ(assetPackage.faqExpansion.length),
      ChannelAdapters.queuePartnerBlock(assetPackage.partnerBlock.title),
    ])

    let dispatchedCount = 0
    let generatedCount = 0
    let failedCount = 0
    const channelStatusSummary: Record<string, string> = {}

    for (const r of results) {
      channelStatusSummary[r.channelName] = r.status
      if (r.status === "LIVE_PUBLISHED" || r.status === "API_ACCEPTED") {
        dispatchedCount += 1
      } else if (r.status === "GENERATED") {
        generatedCount += 1
      } else {
        failedCount += 1
      }
    }

    // Alert founder if channels failed (only real failures, not generated assets)
    if (failedCount > 0) {
      const failedChannels = results
        .filter(r => r.status === "QUEUED_FOR_APPROVAL" || r.status === "MOCK_DEVELOPMENT")
        .map(r => `${r.channelName}: ${r.message}`)
      console.warn(`[MultiChannelPublisher] ⚠️ ${failedCount} channel(s) failed:`, failedChannels)
      
      const generatedChannels = results
        .filter(r => r.status === "GENERATED")
        .map(r => `${r.channelName}: ${r.message}`)
      
      const successChannels = results
        .filter(r => r.status === "LIVE_PUBLISHED" || r.status === "API_ACCEPTED")
        .map(r => `${r.channelName}: ✅ ${r.message}`)

      // Send founder alert email
      try {
        const { sendEmail } = await import("@/lib/emails/mailer")
        await sendEmail({
          to: "ashwani@fsidigital.ca",
          subject: `[Growth OS] ${dispatchedCount} published, ${generatedCount} assets created, ${failedCount} failed`,
          html: `<h2>Growth OS Publishing Report</h2>
            <p><strong>${dispatchedCount}</strong> of 7 channels published successfully (API confirmed).</p>
            ${successChannels.length > 0 ? `<h3>✅ Published</h3><ul>${successChannels.map(f => `<li>${f}</li>`).join("")}</ul>` : ""}
            ${generatedChannels.length > 0 ? `<h3>📄 Assets Generated (no live deployment)</h3><ul>${generatedChannels.map(f => `<li>${f}</li>`).join("")}</ul>` : ""}
            ${failedChannels.length > 0 ? `<h3>❌ Failed</h3><ul>${failedChannels.map(f => `<li>${f}</li>`).join("")}</ul>` : ""}
            <p>Check Vercel logs for details. Title: <strong>${assetPackage.title}</strong></p>`,
          text: `Growth OS: ${dispatchedCount}/7 published, ${generatedCount} assets, ${failedCount} failed. ${failedChannels.join("; ")}`,
          tagType: "growth-os-alert",
        })
      } catch (emailErr) {
        console.error("[MultiChannelPublisher] Failed to send founder alert:", emailErr)
      }
    }

    // Determine honest dispatch status
    let overallStatus: MultiChannelDispatchReceipt["status"]
    if (dispatchedCount === 0 && generatedCount === 0) {
      overallStatus = "FAILED"
    } else if (failedCount > 0) {
      overallStatus = "PARTIAL_SUCCESS"
    } else {
      overallStatus = "SUCCESS"
    }

    return {
      opportunityId: assetPackage.opportunityId,
      dispatchedChannelsCount: dispatchedCount,
      queuedChannelsCount: failedCount,
      observedTotalReach: 0,
      observedTotalTraffic: 0,
      status: overallStatus,
      channelResults: results,
      channelStatusSummary,
    }
  }
}

function opportunitySlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}
