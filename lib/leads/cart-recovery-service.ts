import { getLeadsFromSheet, updateLeadInSheet } from '@/lib/google-sheets'
import { getAllPurchases } from '@/lib/products/purchase-store'
import { isProviderVerifiedPurchase } from '@/lib/growth-os/evidence-metrics'
import {
  sendCartRecoveryEmail1,
  sendCartRecoveryEmail2,
  sendCartRecoveryEmail3,
} from '@/lib/emails/cart-recovery'

export interface CartRecoveryRunSummary {
  processedCount: number
  attemptedCount: number
  eligibleCheckoutCount: number
  skippedPurchasedCount: number
  recoveredCandidates: string[]
  receipts: Array<{ email: string; stage: string; provider: string; providerMessageId: string }>
  errors: string[]
  timestamp: string
}

function parseActivity(value?: string) {
  try {
    return JSON.parse(value && value !== 'N/A' ? value : '{}')
  } catch {
    return {}
  }
}

function hasPaymentEvidence(activity: Record<string, any>) {
  return Boolean(
    activity.paymentCompletedAt
    || activity.paymentCapturedAt
    || activity.providerCaptureVerifiedAt
    || activity.purchaseCompletedAt
  )
}

export class CartRecoveryService {
  public static async processCartRecoveryBatch(maxEmailsPerRun = 5, force = false): Promise<CartRecoveryRunSummary> {
    if (force && process.env.NODE_ENV === 'production') {
      throw new Error('Force cart recovery is disabled in production.')
    }
    const now = Date.now()
    const [leads, purchases] = await Promise.all([getLeadsFromSheet(1000), getAllPurchases()])
    const verifiedBuyerEmails = new Set(
      purchases.filter(isProviderVerifiedPurchase).map((purchase) => purchase.email.toLowerCase().trim())
    )
    const summary: CartRecoveryRunSummary = {
      processedCount: 0,
      attemptedCount: 0,
      eligibleCheckoutCount: 0,
      skippedPurchasedCount: 0,
      recoveredCandidates: [],
      receipts: [],
      errors: [],
      timestamp: new Date().toISOString(),
    }

    for (const lead of leads) {
      if (summary.attemptedCount >= maxEmailsPerRun) break
      const email = String(lead.email || '').toLowerCase().trim()
      if (!email.includes('@') || lead.isSubscribed !== true) continue
      const activity = parseActivity(lead.leadActivity)
      if (!activity.checkoutStartedAt) continue
      summary.eligibleCheckoutCount++

      if (verifiedBuyerEmails.has(email) || hasPaymentEvidence(activity)) {
        summary.skippedPurchasedCount++
        continue
      }

      const checkoutStartMs = new Date(activity.checkoutStartedAt).getTime()
      if (!Number.isFinite(checkoutStartMs) || checkoutStartMs > now) continue
      const elapsedMs = now - checkoutStartMs
      let stage = ''
      let result: Awaited<ReturnType<typeof sendCartRecoveryEmail1>> | null = null
      const emailInput = {
        to: email,
        name: lead.name,
        loginToken: lead.loginToken || '',
        companyName: lead.companyName,
        priceShown: String(activity.priceShown || '19').replace(/[^0-9.]/g, ''),
      }

      try {
        if ((elapsedMs >= 72 * 60 * 60 * 1000 || force) && activity.cartRecoveryEmail2ProviderMessageId && !activity.cartRecoveryEmail3ProviderMessageId) {
          stage = 'Email #3 (72h)'
          result = await sendCartRecoveryEmail3(emailInput)
        } else if ((elapsedMs >= 24 * 60 * 60 * 1000 || force) && activity.cartRecoveryEmail1ProviderMessageId && !activity.cartRecoveryEmail2ProviderMessageId) {
          stage = 'Email #2 (24h)'
          result = await sendCartRecoveryEmail2(emailInput)
        } else if ((elapsedMs >= 45 * 60 * 1000 || force) && !activity.cartRecoveryEmail1ProviderMessageId) {
          stage = 'Email #1 (45m)'
          result = await sendCartRecoveryEmail1(emailInput)
        }

        if (!result) continue
        summary.attemptedCount++
        if (!result.success || !result.providerMessageId) {
          summary.errors.push(`${email} ${stage}: ${result.error || 'provider message ID missing'}`)
          continue
        }

        const sentAt = new Date().toISOString()
        if (stage.startsWith('Email #1')) {
          activity.cartRecoveryEmail1AcceptedAt = sentAt
          activity.cartRecoveryEmail1ProviderMessageId = result.providerMessageId
        } else if (stage.startsWith('Email #2')) {
          activity.cartRecoveryEmail2AcceptedAt = sentAt
          activity.cartRecoveryEmail2ProviderMessageId = result.providerMessageId
        } else {
          activity.cartRecoveryEmail3AcceptedAt = sentAt
          activity.cartRecoveryEmail3ProviderMessageId = result.providerMessageId
        }
        activity.cartRecoveryLastProvider = result.provider || ''
        activity.cartRecoveryLastProviderMessageId = result.providerMessageId

        const updated = await updateLeadInSheet(email, { leadActivity: JSON.stringify(activity) })
        if (!updated.success) {
          summary.errors.push(`${email} ${stage}: provider accepted, but CRM receipt persistence failed`)
          continue
        }
        summary.processedCount++
        summary.recoveredCandidates.push(`${email} (${stage})`)
        summary.receipts.push({
          email,
          stage,
          provider: result.provider || '',
          providerMessageId: result.providerMessageId,
        })
      } catch (error: any) {
        summary.errors.push(`${email} ${stage || 'eligibility'}: ${error.message || String(error)}`)
      }
    }
    return summary
  }
}
