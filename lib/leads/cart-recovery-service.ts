import { getLeadsFromSheet, updateLeadInSheet } from "@/lib/google-sheets"
import {
  sendCartRecoveryEmail1,
  sendCartRecoveryEmail2,
  sendCartRecoveryEmail3,
} from "@/lib/emails/cart-recovery"

export interface CartRecoveryRunSummary {
  processedCount: number
  recoveredCandidates: string[]
  errors: string[]
  timestamp: string
}

export class CartRecoveryService {
  public static async processCartRecoveryBatch(
    maxEmailsPerRun = 5,
    force = false
  ): Promise<CartRecoveryRunSummary> {
    const now = Date.now()
    const leads = await getLeadsFromSheet(50)
    
    const summary: CartRecoveryRunSummary = {
      processedCount: 0,
      recoveredCandidates: [],
      errors: [],
      timestamp: new Date().toISOString()
    }

    if (!leads || leads.length === 0) {
      return summary
    }

    for (const sub of leads) {
      if (summary.processedCount >= maxEmailsPerRun) break
      if (!sub.email || !sub.email.includes("@")) continue

      let activity: any = {}
      try {
        if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
          activity = JSON.parse(sub.leadActivity)
        }
      } catch (e) {
        // ignore JSON parse error
      }

      const isPurchased = !!sub.reportPurchased

      if (!isPurchased) {
        const checkoutStartMs = activity.checkoutStartedAt
          ? new Date(activity.checkoutStartedAt).getTime()
          : (sub.timestamp ? new Date(sub.timestamp).getTime() : now - (60 * 60 * 1000))

        const elapsedMs = now - (Number.isNaN(checkoutStartMs) ? now - 60000 : checkoutStartMs)
        let emailSent = false
        let stageName = ""

        if ((elapsedMs >= 45 * 60 * 1000 || force) && !activity.cartRecoveryEmail1SentAt) {
          console.log(`🛒 [CartRecoveryService] Dispatching Cart Recovery #1 to: ${sub.email}`)
          const res = await sendCartRecoveryEmail1({
            to: sub.email,
            name: sub.name,
            loginToken: sub.loginToken || "",
            companyName: sub.companyName,
            priceShown: activity.priceShown || "$19"
          })
          if (res.success) {
            activity.cartRecoveryEmail1SentAt = new Date().toISOString()
            emailSent = true
            stageName = "Email #1 (45m)"
            summary.processedCount++
          } else {
            summary.errors.push(`Failed sending email 1 to ${sub.email}: ${res.error}`)
          }
        } else if ((elapsedMs >= 24 * 60 * 60 * 1000 || force) && activity.cartRecoveryEmail1SentAt && !activity.cartRecoveryEmail2SentAt) {
          console.log(`🛒 [CartRecoveryService] Dispatching Cart Recovery #2 to: ${sub.email}`)
          const res = await sendCartRecoveryEmail2({
            to: sub.email,
            name: sub.name,
            loginToken: sub.loginToken || "",
            companyName: sub.companyName,
            priceShown: activity.priceShown || "$19"
          })
          if (res.success) {
            activity.cartRecoveryEmail2SentAt = new Date().toISOString()
            emailSent = true
            stageName = "Email #2 (24h)"
            summary.processedCount++
          } else {
            summary.errors.push(`Failed sending email 2 to ${sub.email}: ${res.error}`)
          }
        } else if ((elapsedMs >= 72 * 60 * 60 * 1000 || force) && activity.cartRecoveryEmail2SentAt && !activity.cartRecoveryEmail3SentAt) {
          console.log(`🛒 [CartRecoveryService] Dispatching Cart Recovery #3 to: ${sub.email}`)
          const res = await sendCartRecoveryEmail3({
            to: sub.email,
            name: sub.name,
            loginToken: sub.loginToken || "",
            companyName: sub.companyName,
            priceShown: activity.priceShown || "$19"
          })
          if (res.success) {
            activity.cartRecoveryEmail3SentAt = new Date().toISOString()
            emailSent = true
            stageName = "Email #3 (72h)"
            summary.processedCount++
          } else {
            summary.errors.push(`Failed sending email 3 to ${sub.email}: ${res.error}`)
          }
        }

        if (emailSent) {
          summary.recoveredCandidates.push(`${sub.email} (${stageName})`)
          try {
            await updateLeadInSheet(sub.email, {
              leadActivity: JSON.stringify(activity)
            })
          } catch (err) {
            console.error(`[CartRecoveryService] Error updating lead activity in sheet for ${sub.email}:`, err)
          }
        }
      }
    }

    return summary
  }
}
