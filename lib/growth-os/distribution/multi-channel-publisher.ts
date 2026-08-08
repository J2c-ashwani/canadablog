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
    let queuedCount = 0
    const channelStatusSummary: Record<string, string> = {}

    for (const r of results) {
      channelStatusSummary[r.channelName] = r.status
      if (r.status === "LIVE_PUBLISHED") {
        dispatchedCount += 1
      } else {
        queuedCount += 1
      }
    }

    // Alert founder if channels failed
    if (queuedCount > 0) {
      const failedChannels = results.filter(r => r.status !== "LIVE_PUBLISHED").map(r => `${r.channelName}: ${r.message}`)
      console.warn(`[MultiChannelPublisher] ⚠️ ${queuedCount} channel(s) failed or queued:`, failedChannels)
      
      // Send founder alert email
      try {
        const { sendEmail } = await import("@/lib/emails/mailer")
        await sendEmail({
          to: "ashwani@fsidigital.ca",
          subject: `[Growth OS Alert] ${queuedCount} of 7 channels failed to publish`,
          html: `<h2>Growth OS Publishing Alert</h2>
            <p><strong>${dispatchedCount}</strong> of 7 channels published successfully.</p>
            <p><strong>${queuedCount}</strong> channel(s) failed or were queued:</p>
            <ul>${failedChannels.map(f => `<li>${f}</li>`).join("")}</ul>
            <p>Check Vercel logs for details. Title: <strong>${assetPackage.title}</strong></p>`,
          text: `Growth OS Alert: ${dispatchedCount}/7 channels published. ${queuedCount} failed: ${failedChannels.join("; ")}`,
          tagType: "growth-os-alert",
        })
      } catch (emailErr) {
        console.error("[MultiChannelPublisher] Failed to send founder alert:", emailErr)
      }
    }

    // Determine honest dispatch status
    let overallStatus: MultiChannelDispatchReceipt["status"]
    if (dispatchedCount === 0) {
      overallStatus = "FAILED"
    } else if (queuedCount > 0) {
      overallStatus = "PARTIAL_SUCCESS"
    } else {
      overallStatus = "SUCCESS"
    }

    return {
      opportunityId: assetPackage.opportunityId,
      dispatchedChannelsCount: dispatchedCount,
      queuedChannelsCount: queuedCount,
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
