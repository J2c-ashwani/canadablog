/**
 * Growth OS — Campaign & Hook Memory Subsystem
 * Stores winning hooks, high-converting subject lines, and campaign CTR history.
 */

export interface CampaignMemoryItem {
  id: string
  campaignName: string
  subjectLine: string
  buyerSegment: string
  openRatePercent: number
  clickRatePercent: number
  conversionRatePercent: number
  revenueGeneratedUSD: number
  recordedTimestamp: string
}

export class CampaignMemory {
  private static memory: CampaignMemoryItem[] = []

  public static logCampaignPerformance(item: Omit<CampaignMemoryItem, "id" | "recordedTimestamp">): CampaignMemoryItem {
    const record: CampaignMemoryItem = {
      id: `mem_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      ...item,
      recordedTimestamp: new Date().toISOString(),
    }
    this.memory.push(record)
    return record
  }

  public static getWinningHooksForSegment(buyerSegment: string): CampaignMemoryItem[] {
    return this.memory
      .filter((m) => m.buyerSegment.toLowerCase().includes(buyerSegment.toLowerCase()) || buyerSegment.toLowerCase().includes(m.buyerSegment.toLowerCase()))
      .sort((a, b) => b.conversionRatePercent - a.conversionRatePercent)
  }

  public static getTopPerformingCampaigns(limit = 5): CampaignMemoryItem[] {
    return [...this.memory].sort((a, b) => b.revenueGeneratedUSD - a.revenueGeneratedUSD).slice(0, limit)
  }
}
