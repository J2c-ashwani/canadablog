import { getAllPurchases } from '@/lib/products/purchase-store'
import { collectGrowthOSEvidence, isProviderVerifiedPurchase } from '@/lib/growth-os/evidence-metrics'
import { CEOScoreboard } from '../ceo-scoreboard'
import { CEOMemory } from '../ceo-memory'

export interface RevenueLedgerSummary {
  verifiedRevenueUSD: number
  verifiedRevenueCAD: number
  verifiedMTDRevenueUSD: number
  verifiedMTDRevenueCAD: number
  verified30DayRevenueUSD: number
  verified30DayRevenueCAD: number
  verifiedMRRUSD: number
  activeMemberships: number
  unverifiedCandidateUSD: number
  excludedTestDataUSD: number
  captureCount: number
  averageOrderValueUSD: number
  historicalCapturedOrders: Array<{ customer: string; product: string; amountUSD: number; verified: boolean; capturedAt: string; deliveryStatus: string }>
  evidenceState: 'VERIFIED' | 'PARTIAL' | 'UNKNOWN'
  sourceErrors: string[]
}

function amountOf(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function isTestPurchase(email: string, name: string) {
  const normalized = `${email} ${name}`.toLowerCase()
  return normalized.includes('@example.com')
    || normalized.includes('@test.com')
    || normalized.includes('test purchase')
    || normalized.includes('audit test')
    || normalized.includes('@fsidigital.ca')
}

export class RevenueTools {
  public static async getRevenueLedger(): Promise<RevenueLedgerSummary> {
    const [evidence, purchases] = await Promise.all([collectGrowthOSEvidence(), getAllPurchases()])
    const realPurchases = purchases.filter((purchase) => !isTestPurchase(purchase.email, purchase.name))
    const verified = realPurchases.filter(isProviderVerifiedPurchase)
    const unverified = realPurchases.filter((purchase) => !isProviderVerifiedPurchase(purchase))
    const excluded = purchases.filter((purchase) => isTestPurchase(purchase.email, purchase.name))
    const verifiedProductRevenueUSD = verified
      .filter((purchase) => String(purchase.currency || 'USD').toUpperCase() === 'USD')
      .reduce((sum, purchase) => sum + amountOf(purchase.amount), 0)

    return {
      verifiedRevenueUSD: evidence.revenue.allTimeVerifiedUSD,
      verifiedRevenueCAD: evidence.revenue.allTimeVerifiedCAD,
      verifiedMTDRevenueUSD: evidence.revenue.mtdVerifiedUSD,
      verifiedMTDRevenueCAD: evidence.revenue.mtdVerifiedCAD,
      verified30DayRevenueUSD: evidence.revenue.rolling30dVerifiedUSD,
      verified30DayRevenueCAD: evidence.revenue.rolling30dVerifiedCAD,
      verifiedMRRUSD: evidence.revenue.verifiedMRRUSD,
      activeMemberships: evidence.revenue.activeMemberships,
      unverifiedCandidateUSD: Number(unverified.reduce((sum, purchase) => sum + amountOf(purchase.amount), 0).toFixed(2)),
      excludedTestDataUSD: Number(excluded.reduce((sum, purchase) => sum + amountOf(purchase.amount), 0).toFixed(2)),
      captureCount: new Set(verified.map((purchase) => purchase.paypalCaptureId).filter(Boolean)).size,
      averageOrderValueUSD: verified.length > 0 ? Number((verifiedProductRevenueUSD / verified.length).toFixed(2)) : 0,
      historicalCapturedOrders: verified.map((purchase) => ({
        customer: purchase.email ? `Customer ${purchase.email.slice(0, 2)}***` : 'Customer',
        product: purchase.productId,
        amountUSD: amountOf(purchase.amount),
        verified: true,
        capturedAt: purchase.createdAt,
        deliveryStatus: purchase.deliveryStatus || 'pending',
      })),
      evidenceState: evidence.evidenceState,
      sourceErrors: evidence.sourceErrors,
    }
  }

  public static async getRevenuePathToTarget(params?: { targetUSD?: number; daysRemaining?: number }) {
    const memory = await CEOMemory.getGoalState()
    const ledger = await this.getRevenueLedger()
    // This utility has no sprint-baseline context; the CEO loop uses its
    // frozen launch baseline directly. Here the rolling 30-day value is the
    // least misleading standalone fallback.
    return CEOScoreboard.calculatePathToTarget(
      ledger.verified30DayRevenueUSD,
      params?.targetUSD || memory.monthly_revenue_target_usd,
      params?.daysRemaining
    )
  }

  public static async getRevenueLeakageReport() {
    const evidence = await collectGrowthOSEvidence()
    const consentedUnprogressed = Math.max(
      0,
      evidence.funnel.totalLeads - evidence.outreach.b2bProviderAccepted - evidence.revenue.verifiedPurchaseRecords
    )
    return CEOScoreboard.calculateLeakageReport(
      evidence.funnel.checkoutStarts30d,
      evidence.funnel.providerVerifiedPurchases30d,
      consentedUnprogressed,
      evidence.fulfillment.pending + evidence.fulfillment.failed
    )
  }
}
