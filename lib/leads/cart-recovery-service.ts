import { appendLeadToSheet, getLeadsFromSheet, updateLeadInSheet } from '@/lib/google-sheets'
import { getAllPurchases } from '@/lib/products/purchase-store'
import { isProviderVerifiedPurchase } from '@/lib/growth-os/evidence-metrics'
import { getAllProductPaymentIntents, type ProductPaymentIntent } from '@/lib/payments/product-payment-intents'
import {
  sendCartRecoveryEmail1,
  sendCartRecoveryEmail2,
  sendCartRecoveryEmail3,
} from '@/lib/emails/cart-recovery'
import { hasRecentCommercialProviderAcceptance } from '@/lib/leads/commercial-eligibility'
import { ensureScopedSubscriberTokens } from '@/lib/leads/SubscriberRepository'
import { buildEmailActionContext, getGrowthActionEvents } from '@/lib/growth-os/action-attribution'
import { validateCaslEligibility } from '@/lib/leads/casl-consent'
import { CommercialActionTracker, generateActionId } from '@/lib/ceo-agent/ledger/action-tracker'

export interface CartRecoveryRunSummary {
  processedCount: number
  attemptedCount: number
  eligibleCheckoutCount: number
  paymentIntentEvidenceCount: number
  skippedPurchasedCount: number
  recoveredCandidates: string[]
  receipts: Array<{ email: string; stage: string; provider: string; providerMessageId: string; actionId: string }>
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

function acceptedAt(value: unknown) {
  const parsed = new Date(String(value || '')).getTime()
  return Number.isFinite(parsed) ? parsed : 0
}

export class CartRecoveryService {
  public static async processCartRecoveryBatch(maxEmailsPerRun = 5, force = false): Promise<CartRecoveryRunSummary> {
    if (force && process.env.NODE_ENV === 'production') {
      throw new Error('Force cart recovery is disabled in production.')
    }
    const now = Date.now()
    const [leads, purchases, paymentIntents, actionEvents] = await Promise.all([
      getLeadsFromSheet(1000),
      getAllPurchases({ strict: true }),
      getAllProductPaymentIntents(),
      getGrowthActionEvents(),
    ])
    const recentAcceptanceCutoff = now - 48 * 60 * 60 * 1000
    const recentlyAcceptedRecipientIds = new Set(actionEvents
      .filter((event) => event.eventType === 'provider_accepted')
      .filter((event) => new Date(event.occurredAt).getTime() >= recentAcceptanceCutoff)
      .map((event) => event.recipientId)
      .filter(Boolean))
    // Build per-product purchased set to allow multi-tier upselling (e.g., $19 buyer can still receive $79 recovery)
    const buyerPurchasedProductsByEmail = new Map<string, Set<string>>()
    purchases.filter(isProviderVerifiedPurchase).forEach((purchase) => {
      const email = purchase.email.toLowerCase().trim()
      if (!email) return
      if (!buyerPurchasedProductsByEmail.has(email)) {
        buyerPurchasedProductsByEmail.set(email, new Set<string>())
      }
      if (purchase.productId) {
        buyerPurchasedProductsByEmail.get(email)!.add(purchase.productId.toLowerCase().trim())
      }
    })
    const recoverableProductIds = new Set([
      'funding-match-report',
      'funding-roadmap',
      'funding-bundle',
      'funding-toolkit',
      'funding-approval-library',
      'guide-companion-kit',
      'strategy-audit',
      'strategy-vip',
      'portfolio-assessment',
      'funding-membership',
      'consultation',
      'strategy-session',
      'report_19',
      'premium_strategy_79',
    ])
    const intentCutoff = now - 30 * 24 * 60 * 60 * 1000
    const latestOpenIntentByEmail = new Map<string, ProductPaymentIntent>()
    paymentIntents
      .filter((intent) => intent.status === 'created' && Boolean(intent.paypalOrderId))
      .filter((intent) => recoverableProductIds.has(intent.productId))
      .filter((intent) => {
        const createdAt = new Date(intent.createdAt).getTime()
        return Number.isFinite(createdAt) && createdAt >= intentCutoff && createdAt <= now
      })
      .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
      .forEach((intent) => {
        const email = intent.email.toLowerCase().trim()
        if (email && !latestOpenIntentByEmail.has(email)) latestOpenIntentByEmail.set(email, intent)
      })

    const summary: CartRecoveryRunSummary = {
      processedCount: 0,
      attemptedCount: 0,
      eligibleCheckoutCount: 0,
      paymentIntentEvidenceCount: 0,
      skippedPurchasedCount: 0,
      recoveredCandidates: [],
      receipts: [],
      errors: [],
      timestamp: new Date().toISOString(),
    }

    const seenEmails = new Set<string>()

    // Pass 1: Leads from CRM that have recorded checkout activity
    for (const lead of leads) {
      const email = String(lead.email || '').toLowerCase().trim()
      if (summary.attemptedCount >= maxEmailsPerRun) {
        CommercialActionTracker.recordBlockedAction('Revenue', 'BATCH_CAP_PACING', email, 'Daily batch cap pacing reached');
        break;
      }
      if (seenEmails.has(email)) continue
      seenEmails.add(email)

      // Strict CASL check: Verify transactional checkout recovery consent
      const caslCheck = validateCaslEligibility(lead, 'TRANSACTIONAL_RECOVERY')
      if (!caslCheck.isEligible) {
        CommercialActionTracker.recordBlockedAction('Revenue', 'CONSENT', email, caslCheck.reason || 'CASL transactional consent missing');
        continue;
      }

      if (hasRecentCommercialProviderAcceptance(lead) || recentlyAcceptedRecipientIds.has(buildEmailActionContext('cart-recovery-1', email).recipientId)) {
        CommercialActionTracker.recordBlockedAction('Revenue', 'COOLDOWN', email, '48h commercial cooldown active');
        continue;
      }

      const activity = parseActivity(lead.leadActivity)
      const openIntent = latestOpenIntentByEmail.get(email)
      const activityCheckoutMs = new Date(activity.checkoutStartedAt || '').getTime()
      const intentCheckoutMs = openIntent ? new Date(openIntent.createdAt).getTime() : 0
      const checkoutStartMs = Math.max(
        Number.isFinite(activityCheckoutMs) ? activityCheckoutMs : 0,
        Number.isFinite(intentCheckoutMs) ? intentCheckoutMs : 0,
      )
      if (!checkoutStartMs) continue
      summary.eligibleCheckoutCount++
      if (openIntent) summary.paymentIntentEvidenceCount++

      // Product-specific suppression check (allows multi-tier upselling across different products)
      const targetProductId = (openIntent?.productId || activity.checkoutProductId || '').toLowerCase().trim()
      const purchasedProducts = buyerPurchasedProductsByEmail.get(email)
      const hasPurchasedSpecificProduct = targetProductId
        ? (purchasedProducts?.has(targetProductId) ?? false)
        : (purchasedProducts !== undefined && purchasedProducts.size > 0)

      const hasActivityPaymentForProduct = Boolean(
        (activity.purchasedProductId && targetProductId && String(activity.purchasedProductId).toLowerCase().trim() === targetProductId) ||
        (hasPaymentEvidence(activity) && (!activity.checkoutProductId || String(activity.checkoutProductId).toLowerCase().trim() === targetProductId))
      )

      if (hasPurchasedSpecificProduct || hasActivityPaymentForProduct) {
        summary.skippedPurchasedCount++
        CommercialActionTracker.recordBlockedAction('Revenue', 'RISK_RULE', email, `Already purchased ${targetProductId}`);
        continue
      }

      if (!Number.isFinite(checkoutStartMs) || checkoutStartMs > now) continue
      const elapsedMs = now - checkoutStartMs
      if (elapsedMs > 30 * 24 * 60 * 60 * 1000) continue

      const checkoutEvidenceId = openIntent ? `intent:${openIntent.intentId}` : `activity:${activity.checkoutStartedAt}`
      const sameRecoverySequence = activity.cartRecoveryEvidenceId === checkoutEvidenceId
      const hasEmail1 = sameRecoverySequence && Boolean(activity.cartRecoveryEmail1ProviderMessageId)
      const hasEmail2 = sameRecoverySequence && Boolean(activity.cartRecoveryEmail2ProviderMessageId)
      const hasEmail3 = sameRecoverySequence && Boolean(activity.cartRecoveryEmail3ProviderMessageId)
      let stage = ''
      let result: Awaited<ReturnType<typeof sendCartRecoveryEmail1>> | null = null

      try {
        const credentials = await ensureScopedSubscriberTokens(email)
        if (!credentials) {
          summary.errors.push(`${email} eligibility: secure login/unsubscribe credentials could not be issued`)
          CommercialActionTracker.recordBlockedAction('Revenue', 'MISSING_DATA', email, 'Unsubscribe/subscriber token generation failed');
          continue
        }
        const emailInput = {
          to: email,
          name: lead.name,
          loginToken: credentials.loginToken,
          unsubscribeToken: credentials.unsubscribeToken,
          companyName: lead.companyName,
          priceShown: String(openIntent?.expectedAmount || activity.priceShown || '19').replace(/[^0-9.]/g, ''),
          productId: openIntent?.productId || activity.checkoutProductId || '',
        }

        if (hasEmail2 && (force || now - acceptedAt(activity.cartRecoveryEmail2AcceptedAt) >= 48 * 60 * 60 * 1000) && !hasEmail3) {
          stage = 'Email #3 (72h)'
        } else if (hasEmail1 && (force || now - acceptedAt(activity.cartRecoveryEmail1AcceptedAt) >= 24 * 60 * 60 * 1000) && !hasEmail2) {
          stage = 'Email #2 (24h)'
        } else if ((elapsedMs >= 45 * 60 * 1000 || force) && !hasEmail1) {
          stage = 'Email #1 (45m)'
        }

        if (!stage) {
          CommercialActionTracker.recordBlockedAction('Revenue', 'COOLDOWN', email, 'Sequence interval waiting window not met');
          continue
        }

        // Hard production idempotency lock
        const idempotencyKey = `RECOVERY:${email}:${stage}:${emailInput.productId}:${new Date().toISOString().slice(0, 10)}`;
        if (!CommercialActionTracker.acquireIdempotencyLock(idempotencyKey)) {
          CommercialActionTracker.recordBlockedAction('Revenue', 'DUPLICATE', email, `Idempotency lock active for ${stage}`);
          continue
        }

        if (stage.startsWith('Email #3')) {
          result = await sendCartRecoveryEmail3(emailInput)
        } else if (stage.startsWith('Email #2')) {
          result = await sendCartRecoveryEmail2(emailInput)
        } else {
          result = await sendCartRecoveryEmail1(emailInput)
        }

        if (!result) continue
        summary.attemptedCount++
        if (!result.success || !result.providerMessageId) {
          summary.errors.push(`${email} ${stage}: ${result.error || 'provider message ID missing'}`)
          continue
        }

        const sentAt = new Date().toISOString()
        const actionId = generateActionId('Revenue')

        if (!sameRecoverySequence) {
          delete activity.cartRecoveryEmail1AcceptedAt
          delete activity.cartRecoveryEmail1ProviderMessageId
          delete activity.cartRecoveryEmail2AcceptedAt
          delete activity.cartRecoveryEmail2ProviderMessageId
          delete activity.cartRecoveryEmail3AcceptedAt
          delete activity.cartRecoveryEmail3ProviderMessageId
        }
        activity.cartRecoveryEvidenceId = checkoutEvidenceId
        activity.checkoutStartedAt = new Date(checkoutStartMs).toISOString()
        activity.checkoutProductId = emailInput.productId
        activity.priceShown = emailInput.priceShown
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

        // Record Universal Commercial Action ID
        await CommercialActionTracker.recordAction({
          actionId,
          agent: 'Revenue',
          trigger: 'Abandoned checkout',
          leadId: email,
          leadEmail: email,
          leadName: emailInput.name || 'Founder',
          company: emailInput.companyName || 'Canadian Business',
          action: `Cart Recovery ${stage}`,
          product: emailInput.productId,
          channel: 'Email',
          consent: 'Transactional',
          status: 'DISPATCHED',
          result: 'DELIVERED',
          revenueUSD: Number(emailInput.priceShown) || 19,
          attribution: 'CART_RECOVERY',
          timestamp: sentAt,
          providerMessageId: result.providerMessageId,
        })

        const updated = await updateLeadInSheet(email, { leadActivity: JSON.stringify(activity) })
        if (!updated.success) {
          const appendRes = await appendLeadToSheet({
            timestamp: sentAt,
            email,
            name: emailInput.name || lead.name || 'Founder',
            source: `Checkout Abandonment (${emailInput.productId})`,
            leadActivity: JSON.stringify(activity),
            isSubscribed: true,
          })
          if (!appendRes.success) {
            summary.errors.push(`${email} ${stage}: provider accepted, but CRM receipt persistence failed`)
            continue
          }
        }
        summary.processedCount++
        summary.recoveredCandidates.push(`${email} (${stage}) [${actionId}]`)
        summary.receipts.push({
          email,
          stage,
          provider: result.provider || '',
          providerMessageId: result.providerMessageId,
          actionId,
        })
      } catch (error: any) {
        summary.errors.push(`${email} ${stage || 'eligibility'}: ${error.message || String(error)}`)
      }
    }

    // Pass 2: Process any open payment intents whose email does not yet exist in the Leads sheet
    for (const [intentEmail, intent] of latestOpenIntentByEmail.entries()) {
      if (summary.attemptedCount >= maxEmailsPerRun) break
      if (seenEmails.has(intentEmail)) continue
      seenEmails.add(intentEmail)

      // Strict CASL check
      const caslCheck = validateCaslEligibility({ email: intentEmail, name: intent.name }, 'TRANSACTIONAL_RECOVERY')
      if (!caslCheck.isEligible) continue

      // Product-specific suppression check (allows multi-tier upselling across different products)
      const targetProductId = (intent.productId || '').toLowerCase().trim()
      const purchasedProducts = buyerPurchasedProductsByEmail.get(intentEmail)
      const hasPurchasedSpecificProduct = targetProductId
        ? (purchasedProducts?.has(targetProductId) ?? false)
        : (purchasedProducts !== undefined && purchasedProducts.size > 0)

      if (hasPurchasedSpecificProduct) {
        summary.skippedPurchasedCount++
        continue
      }
      if (recentlyAcceptedRecipientIds.has(buildEmailActionContext('cart-recovery-1', intentEmail).recipientId)) continue

      const intentCheckoutMs = new Date(intent.createdAt).getTime()
      if (!Number.isFinite(intentCheckoutMs) || intentCheckoutMs > now) continue
      const elapsedMs = now - intentCheckoutMs
      if (elapsedMs > 30 * 24 * 60 * 60 * 1000) continue
      if (elapsedMs < 45 * 60 * 1000 && !force) continue

      summary.eligibleCheckoutCount++
      summary.paymentIntentEvidenceCount++

      const checkoutEvidenceId = `intent:${intent.intentId}`
      let stage = ''
      let result: Awaited<ReturnType<typeof sendCartRecoveryEmail1>> | null = null

      try {
        const credentials = await ensureScopedSubscriberTokens(intentEmail)
        if (!credentials) {
          summary.errors.push(`${intentEmail} eligibility: secure login/unsubscribe credentials could not be issued`)
          continue
        }
        const rawProfile = intent.profileData as unknown
        const profileData: Record<string, any> = typeof rawProfile === 'object' && rawProfile !== null
          ? (rawProfile as Record<string, any>)
          : typeof rawProfile === 'string'
            ? (() => { try { return JSON.parse(rawProfile) } catch { return {} } })()
            : {}

        const emailInput = {
          to: intentEmail,
          name: intent.name || 'Founder',
          loginToken: credentials.loginToken,
          unsubscribeToken: credentials.unsubscribeToken,
          companyName: profileData.company || '',
          priceShown: String(intent.expectedAmount || '19').replace(/[^0-9.]/g, ''),
          productId: intent.productId || 'funding-match-report',
        }

        stage = 'Email #1 (45m)'
        result = await sendCartRecoveryEmail1(emailInput)

        if (!result) continue
        summary.attemptedCount++
        if (!result.success || !result.providerMessageId) {
          summary.errors.push(`${intentEmail} ${stage}: ${result.error || 'provider message ID missing'}`)
          continue
        }

        const sentAt = new Date().toISOString()
        const actionId = generateActionId('Revenue')

        const activity: Record<string, any> = {
          cartRecoveryEvidenceId: checkoutEvidenceId,
          checkoutStartedAt: new Date(intentCheckoutMs).toISOString(),
          checkoutProductId: emailInput.productId,
          priceShown: emailInput.priceShown,
          cartRecoveryEmail1AcceptedAt: sentAt,
          cartRecoveryEmail1ProviderMessageId: result.providerMessageId,
          cartRecoveryLastProvider: result.provider || '',
          cartRecoveryLastProviderMessageId: result.providerMessageId,
        }

        // Record Universal Commercial Action ID
        await CommercialActionTracker.recordAction({
          actionId,
          agent: 'Revenue',
          trigger: 'Direct checkout abandoned',
          leadId: intentEmail,
          leadEmail: intentEmail,
          leadName: emailInput.name || 'Founder',
          company: emailInput.companyName || 'Canadian Business',
          action: `Cart Recovery ${stage}`,
          product: emailInput.productId,
          channel: 'Email',
          consent: 'Transactional',
          status: 'DISPATCHED',
          result: 'DELIVERED',
          revenueUSD: Number(emailInput.priceShown) || 19,
          attribution: 'CART_RECOVERY',
          timestamp: sentAt,
          providerMessageId: result.providerMessageId,
        })

        const updated = await updateLeadInSheet(intentEmail, { leadActivity: JSON.stringify(activity) })
        if (!updated.success) {
          const appendRes = await appendLeadToSheet({
            timestamp: sentAt,
            email: intentEmail,
            name: emailInput.name || 'Founder',
            source: `Checkout Abandonment (${emailInput.productId})`,
            leadActivity: JSON.stringify(activity),
            isSubscribed: true,
          })
          if (!appendRes.success) {
            summary.errors.push(`${intentEmail} ${stage}: provider accepted, but CRM receipt persistence failed`)
            continue
          }
        }
        summary.processedCount++
        summary.recoveredCandidates.push(`${intentEmail} (${stage}) [${actionId}]`)
        summary.receipts.push({
          email: intentEmail,
          stage,
          provider: result.provider || '',
          providerMessageId: result.providerMessageId,
          actionId,
        })
      } catch (error: any) {
        summary.errors.push(`${intentEmail} ${stage || 'intent-processing'}: ${error.message || String(error)}`)
      }
    }

    // Sync funnel candidates and eligible counts into CommercialActionTracker
    CommercialActionTracker.recordFunnelCandidateStats(
      leads.length + latestOpenIntentByEmail.size,
      summary.eligibleCheckoutCount
    )

    return summary
  }
}
