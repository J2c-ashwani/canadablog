/**
 * Growth OS — Revenue Attribution Engine
 * Tracks purchase events, channel attribution, and product sales metrics.
 */

export interface PurchaseEvent {
  transactionId: string
  brandId: string
  productName: string
  amountUSD: number
  channelSource: "SEO" | "DatabaseEmail" | "LinkedIn" | "Partner" | "Community"
  landingPagePath: string
  customerEmail: string
  timestamp: string
}

export interface AttributionSummary {
  totalRevenueUSD: number
  totalTransactions: number
  revenueByChannel: Record<string, number>
  revenueByProduct: Record<string, number>
  topConvertingChannel: string
}

export class RevenueAttributionEngine {
  private static purchases: PurchaseEvent[] = []

  public static logPurchase(purchase: Omit<PurchaseEvent, "timestamp">): PurchaseEvent {
    const record: PurchaseEvent = {
      ...purchase,
      timestamp: new Date().toISOString(),
    }
    this.purchases.push(record)
    console.log(`[RevenueAttributionEngine] Purchase logged: $${record.amountUSD} for '${record.productName}' via ${record.channelSource}`)
    return record
  }

  public static getAttributionSummary(brandId?: string): AttributionSummary {
    const filtered = brandId ? this.purchases.filter((p) => p.brandId === brandId) : this.purchases

    let totalRevenueUSD = 0
    const revenueByChannel: Record<string, number> = { SEO: 0, DatabaseEmail: 0, LinkedIn: 0, Partner: 0, Community: 0 }
    const revenueByProduct: Record<string, number> = {}

    for (const p of filtered) {
      totalRevenueUSD += p.amountUSD
      revenueByChannel[p.channelSource] = (revenueByChannel[p.channelSource] || 0) + p.amountUSD
      revenueByProduct[p.productName] = (revenueByProduct[p.productName] || 0) + p.amountUSD
    }

    const topConvertingChannel = Object.entries(revenueByChannel).sort((a, b) => b[1] - a[1])[0]?.[0] || "None"

    return {
      totalRevenueUSD,
      totalTransactions: filtered.length,
      revenueByChannel,
      revenueByProduct,
      topConvertingChannel,
    }
  }
}
