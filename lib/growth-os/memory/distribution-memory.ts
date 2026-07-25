/**
 * Growth OS — Distribution Memory Subsystem
 * Tracks full attribution chain: Audience -> IntentTag -> OfferedProduct -> Conversions.
 */

export interface DistributionMemoryItem {
  id: string
  title: string
  channelName: "Blog" | "LinkedIn" | "Newsletter" | "PartnerBlock" | "SocialCarousel" | "VideoScript"
  audience: string
  intentTag: string
  offeredProduct: string
  reachImpressions: number
  clicksGenerated: number
  leadsGenerated: number
  conversionsCount: number
  recordedTimestamp: string
}

export class DistributionMemory {
  private static memory: DistributionMemoryItem[] = []

  public static logDistributionPerformance(item: Omit<DistributionMemoryItem, "id" | "recordedTimestamp">): DistributionMemoryItem {
    const record: DistributionMemoryItem = {
      id: `distmem_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      ...item,
      recordedTimestamp: new Date().toISOString(),
    }
    this.memory.push(record)
    return record
  }

  public static getTopChannelsForAudience(audience: string): DistributionMemoryItem[] {
    return this.memory
      .filter((m) => m.audience.toLowerCase().includes(audience.toLowerCase()))
      .sort((a, b) => b.conversionsCount - a.conversionsCount)
  }

  public static getChannelPerformanceSummary(): Record<string, { reach: number; clicks: number; leads: number; conversions: number }> {
    const summary: Record<string, { reach: number; clicks: number; leads: number; conversions: number }> = {}

    for (const item of this.memory) {
      if (!summary[item.channelName]) {
        summary[item.channelName] = { reach: 0, clicks: 0, leads: 0, conversions: 0 }
      }
      summary[item.channelName].reach += item.reachImpressions
      summary[item.channelName].clicks += item.clicksGenerated
      summary[item.channelName].leads += item.leadsGenerated
      summary[item.channelName].conversions += item.conversionsCount
    }

    return summary
  }
}
