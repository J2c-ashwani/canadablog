import { type NextRequest, NextResponse } from "next/server"
import { getAllPurchases, recordPurchase, updatePurchaseDeliveryStatus } from "@/lib/products/purchase-store"
import { getProduct } from "@/lib/products/catalog"
import { grantEntitlements } from "@/lib/products/entitlements"
import { sendEmail } from "@/lib/emails/mailer"
import { buildPurchaseEmail } from "@/lib/emails/product-purchase"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import {
  getProductPaymentIntent,
  markProductPaymentIntentFulfilled,
  recordProductPaymentCapture,
} from "@/lib/payments/product-payment-intents"
import {
  getMembershipSubscription,
  recordMembershipPayment,
  recordMembershipSubscription,
  type MembershipSubscriptionStatus,
} from '@/lib/membership/membership-store'

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const STAGE_HIERARCHY = [
  'Lead',
  'Calculator Lead',
  'Report Buyer',
  'Audit Buyer',
  'Booked Audit',
  'Audit Attended',
  'Audit Completed',
  'Filing Prospect',
  'Filing Client Signed',
  'Filing Client',
  'Won'
];

function shouldUpdateStage(currentStage: string | undefined, newStage: string): boolean {
  if (!currentStage) return true;
  const normalizedCurrent = currentStage.trim();
  const normalizedNew = newStage.trim();
  const currentIndex = STAGE_HIERARCHY.indexOf(normalizedCurrent);
  const newIndex = STAGE_HIERARCHY.indexOf(normalizedNew);
  if (currentIndex === -1) return true;
  return newIndex > currentIndex;
}

function parseActivity(value?: string) {
  try { return JSON.parse(value || '{}') } catch { return {} }
}

async function handleMembershipWebhook(event: any): Promise<boolean> {
  const eventType = String(event.event_type || '')
  const resource = event.resource || {}
  const statusByEvent: Record<string, MembershipSubscriptionStatus> = {
    'BILLING.SUBSCRIPTION.ACTIVATED': 'ACTIVE',
    'BILLING.SUBSCRIPTION.CANCELLED': 'CANCELLED',
    'BILLING.SUBSCRIPTION.SUSPENDED': 'SUSPENDED',
    'BILLING.SUBSCRIPTION.EXPIRED': 'EXPIRED',
  }
  if (statusByEvent[eventType]) {
    const subscriptionId = String(resource.id || '')
    const existing = await getMembershipSubscription(subscriptionId)
    const email = String(resource.subscriber?.email_address || existing?.email || '').toLowerCase().trim()
    const planId = String(resource.plan_id || existing?.planId || '')
    const expectedPlanId = process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID || ''
    if (!subscriptionId || !email) throw new Error('Membership webhook is missing subscription identity.')
    if (expectedPlanId && planId !== expectedPlanId) throw new Error('Membership webhook plan ID mismatch.')
    const status = statusByEvent[eventType]
    const occurredAt = String(event.create_time || new Date().toISOString())
    await recordMembershipSubscription({
      subscriptionId,
      email,
      planId,
      status,
      amountUSD: existing?.amountUSD || 29,
      providerVerifiedAt: occurredAt,
      lastPaymentId: existing?.lastPaymentId || '',
      lastPaymentAt: existing?.lastPaymentAt || '',
      cancelledAt: status === 'CANCELLED' ? occurredAt : existing?.cancelledAt || '',
      evidenceSource: `paypal_signed_webhook:${eventType}`,
    })
    const subscriber = await SubscriberRepository.getSubscriberByEmail(email)
    if (subscriber) {
      const activity = parseActivity(subscriber.leadActivity)
      activity.membershipStatus = status
      activity.membershipWebhookVerifiedAt = occurredAt
      const update = await SubscriberRepository.updateSubscriberPreferences(email, {
        subscriptionStatus: status,
        subscriptionId,
        subscriptionCancelledAt: status === 'CANCELLED' ? occurredAt : subscriber.subscriptionCancelledAt,
        leadActivity: JSON.stringify(activity),
      })
      if (!update.success) throw new Error('Membership webhook could not update the subscriber account.')
    }
    return true
  }

  if (eventType === 'PAYMENT.SALE.COMPLETED') {
    const subscriptionId = String(resource.billing_agreement_id || '')
    if (!subscriptionId) return false
    const subscription = await getMembershipSubscription(subscriptionId)
    if (!subscription) throw new Error(`Membership subscription ${subscriptionId} was not found.`)
    const paymentId = String(resource.id || '')
    const occurredAt = String(resource.create_time || event.create_time || new Date().toISOString())
    const paymentAmount = Number(resource.amount?.total || 0)
    const paymentCurrency = String(resource.amount?.currency || '').toUpperCase()
    const paymentState = String(resource.state || '').toLowerCase()
    if (!paymentId || paymentState !== 'completed' || paymentCurrency !== 'USD' || Math.abs(paymentAmount - subscription.amountUSD) > 0.01) {
      throw new Error('Membership payment webhook terms do not match the verified subscription.')
    }
    await recordMembershipPayment({
      paymentId,
      subscriptionId,
      email: subscription.email,
      amount: String(resource.amount?.total || ''),
      currency: String(resource.amount?.currency || 'USD'),
      status: String(resource.state || 'completed'),
      occurredAt,
    })
    await recordMembershipSubscription({
      ...subscription,
      status: 'ACTIVE',
      providerVerifiedAt: occurredAt,
      lastPaymentId: paymentId,
      lastPaymentAt: occurredAt,
      evidenceSource: `paypal_signed_webhook:${eventType}`,
    })
    return true
  }
  return false
}

async function verifyPayPalWebhookSignature(request: NextRequest, body: string): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID
  if (!webhookId) {
    console.error("[PayPal Webhook] PAYPAL_WEBHOOK_ID not configured")
    return false
  }
  
  const baseUrl = process.env.PAYPAL_ENV === "live" 
    ? "https://api-m.paypal.com" 
    : "https://api-m.sandbox.paypal.com"
  
  // Get PayPal auth token
  const authResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })
  const authPayload = await authResponse.json()
  const access_token = authPayload.access_token
  if (!authResponse.ok || !access_token) throw new Error('PayPal webhook authentication failed.')
  
  // Verify webhook signature
  const verifyResponse = await fetch(`${baseUrl}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      auth_algo: request.headers.get("paypal-auth-algo"),
      cert_url: request.headers.get("paypal-cert-url"),
      transmission_id: request.headers.get("paypal-transmission-id"),
      transmission_sig: request.headers.get("paypal-transmission-sig"),
      transmission_time: request.headers.get("paypal-transmission-time"),
      webhook_id: webhookId,
      webhook_event: JSON.parse(body),
    }),
  })
  
  const verifyResult = await verifyResponse.json()
  if (!verifyResponse.ok) throw new Error('PayPal webhook signature verification request failed.')
  return verifyResult.verification_status === "SUCCESS"
}

export async function POST(request: NextRequest) {
  try {
    const bodyText = await request.text()
    const isVerified = await verifyPayPalWebhookSignature(request, bodyText)
    
    if (!isVerified) {
      console.error("[PayPal Webhook] Signature verification failed")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const event = JSON.parse(bodyText)
    console.log(`[PayPal Webhook] Received event: ${event.event_type}`)

    if (await handleMembershipWebhook(event)) {
      return NextResponse.json({ received: true, membershipEvent: true })
    }
    
    if (event.event_type === "CHECKOUT.ORDER.COMPLETED" || event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
      const resource = event.resource
      const purchaseUnit = resource.purchase_units?.[0]
      
      let actualOrderId = resource.id
      let actualIntentId = purchaseUnit?.custom_id
      let actualProductId = purchaseUnit?.reference_id
      
      if (event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
          actualOrderId = resource.supplementary_data?.related_ids?.order_id || resource.id
          actualIntentId = resource.custom_id || actualIntentId
      }
      
      if (!actualIntentId) {
          console.log("[PayPal Webhook] No custom_id (payment intent id) found, skipping")
          return NextResponse.json({ received: true })
      }
      
      const paymentIntent = await getProductPaymentIntent(actualIntentId)
      if (!paymentIntent) {
          console.log(`[PayPal Webhook] No payment intent found for ${actualIntentId}`)
          return NextResponse.json({ received: true })
      }
      
      actualProductId = actualProductId || paymentIntent.productId
      if (!paymentIntent.paypalOrderId || paymentIntent.paypalOrderId !== actualOrderId) {
          console.error(`[PayPal Webhook] Order mismatch for intent ${actualIntentId}`)
          return NextResponse.json({ error: "Payment order does not match its server-owned intent." }, { status: 409 })
      }
      if (actualProductId && actualProductId !== paymentIntent.productId) {
          console.error(`[PayPal Webhook] Product mismatch for intent ${actualIntentId}`)
          return NextResponse.json({ error: "Payment product does not match its server-owned intent." }, { status: 409 })
      }
      actualProductId = paymentIntent.productId

      const capture = resource.payments?.captures?.[0] || purchaseUnit?.payments?.captures?.[0] || resource
      const captureId = String(capture?.id || "")
      const capturedAmount = String(capture?.amount?.value || purchaseUnit?.amount?.value || "")
      const capturedCurrency = String(capture?.amount?.currency_code || purchaseUnit?.amount?.currency_code || "")
      if (!captureId || Number(capturedAmount) !== Number(paymentIntent.expectedAmount) || capturedCurrency.toUpperCase() !== paymentIntent.currency.toUpperCase()) {
          console.error(`[PayPal Webhook] Capture terms mismatch for intent ${actualIntentId}`)
          return NextResponse.json({ error: "Provider capture terms do not match the server-owned intent." }, { status: 409 })
      }
      await recordProductPaymentCapture(actualIntentId, captureId)
      
      const allPurchases = await getAllPurchases()
      const existingPurchase = allPurchases.find(
        (p: any) => p.paypalOrderId === actualOrderId && p.productId === actualProductId
      )
      
      if (existingPurchase) {
          // A retry may arrive after the ledger write but before entitlement
          // creation. Entitlements are idempotent, so safely repair that gap.
          await grantEntitlements({
            purchaseId: existingPurchase.purchaseId,
            email: paymentIntent.email,
            productId: actualProductId,
            orderId: actualOrderId,
          })
          await markProductPaymentIntentFulfilled(
            actualIntentId,
            existingPurchase.purchaseId,
            existingPurchase.deliveryStatus || 'retry_pending'
          )
          console.log(`[PayPal Webhook] Existing purchase reconciled for order ${actualOrderId}`)
          return NextResponse.json({ received: true })
      }
      
      const product = getProduct(actualProductId)
      if (!product) {
          console.log(`[PayPal Webhook] Product not found: ${actualProductId}`)
          return NextResponse.json({ received: true })
      }
      
      // Fulfilment
      const { email, name, profileData, addons, attribution } = paymentIntent
      const expectedPrice = Number(paymentIntent.expectedAmount)
      
      let addonTotal = 0
      if (addons?.toolkit) addonTotal += 29
      if (addons?.approvalLibrary) addonTotal += 9
      if (addons?.strategySession) addonTotal += 180
      const netProductPrice = expectedPrice - addonTotal

      const normalizedProfileData = {
          province: typeof profileData?.province === 'string' ? profileData.province : 'ON',
          industry: typeof profileData?.industry === 'string' ? profileData.industry : 'other',
          revenue: typeof profileData?.revenue === 'string' ? profileData.revenue : 'pre-revenue',
          goal: typeof profileData?.goal === 'string' ? profileData.goal : 'expansion',
          company: typeof profileData?.company === 'string' ? profileData.company : '',
          phone: typeof profileData?.phone === 'string' ? profileData.phone : '',
      }
      
      const purchase = await recordPurchase({
          email,
          name,
          productId: actualProductId,
          amount: netProductPrice.toFixed(2),
          paypalOrderId: actualOrderId,
          profileData: normalizedProfileData,
          attribution: attribution || {},
          currency: paymentIntent.currency,
          paypalCaptureId: captureId,
          paymentStatus: "provider_capture_verified",
          deliveryStatus: "retry_pending",
      })
      
      await grantEntitlements({
          purchaseId: purchase.purchaseId,
          email,
          productId: actualProductId,
          orderId: actualOrderId,
      })
      
      // Handle addons
      if (addons?.toolkit) {
          const addonPurchase = await recordPurchase({
              email, name, productId: 'funding-toolkit', amount: '29.00', paypalOrderId: actualOrderId,
              profileData: normalizedProfileData, attribution: attribution || {}, currency: paymentIntent.currency,
              paypalCaptureId: captureId, paymentStatus: "provider_capture_verified", deliveryStatus: "retry_pending",
          })
          await grantEntitlements({ purchaseId: addonPurchase.purchaseId, email, productId: 'funding-toolkit', orderId: actualOrderId })
      }
      if (addons?.approvalLibrary) {
          const addonPurchase = await recordPurchase({
              email, name, productId: 'funding-approval-library', amount: '9.00', paypalOrderId: actualOrderId,
              profileData: normalizedProfileData, attribution: attribution || {}, currency: paymentIntent.currency,
              paypalCaptureId: captureId, paymentStatus: "provider_capture_verified", deliveryStatus: "retry_pending",
          })
          await grantEntitlements({ purchaseId: addonPurchase.purchaseId, email, productId: 'funding-approval-library', orderId: actualOrderId })
      }
      if (addons?.strategySession) {
          const addonPurchase = await recordPurchase({
              email, name, productId: 'strategy-session', amount: '180.00', paypalOrderId: actualOrderId,
              profileData: normalizedProfileData, attribution: attribution || {}, currency: paymentIntent.currency,
              paypalCaptureId: captureId, paymentStatus: "provider_capture_verified", deliveryStatus: "retry_pending",
          })
          await grantEntitlements({ purchaseId: addonPurchase.purchaseId, email, productId: 'strategy-session', orderId: actualOrderId })
      }
      
      // Update CRM
      try {
          const updates: any = {
              region: normalizedProfileData.province,
              industry: normalizedProfileData.industry,
              businessStage: normalizedProfileData.revenue,
              fundingPurpose: normalizedProfileData.goal,
              phone: normalizedProfileData.phone || undefined,
          }
          
          const existing = await SubscriberRepository.getSubscriberByEmail(email)
          
          if (actualProductId === 'funding-match-report' || actualProductId === 'portfolio-assessment') {
              updates.reportPurchased = true; updates.reportTransactionId = actualOrderId; updates.engagementScore = 120;
              if (shouldUpdateStage(existing?.offlineStatus, 'Report Buyer')) updates.offlineStatus = 'Report Buyer';
          } else if (actualProductId === 'funding-roadmap') {
              updates.strategyReportPurchased = true; updates.strategyReportTransactionId = actualOrderId; updates.engagementScore = 150;
              if (shouldUpdateStage(existing?.offlineStatus, 'Report Buyer')) updates.offlineStatus = 'Report Buyer';
          } else if (actualProductId === 'funding-bundle') {
              updates.reportPurchased = true; updates.reportTransactionId = actualOrderId;
              updates.strategyReportPurchased = true; updates.strategyReportTransactionId = actualOrderId; updates.engagementScore = 150;
              if (shouldUpdateStage(existing?.offlineStatus, 'Report Buyer')) updates.offlineStatus = 'Report Buyer';
          } else if (actualProductId === 'strategy-audit' || actualProductId === 'strategy-session' || addons?.strategySession) {
              updates.strategyReportPurchased = true; updates.strategyReportTransactionId = actualOrderId; updates.engagementScore = 200;
              if (shouldUpdateStage(existing?.offlineStatus, 'Audit Buyer')) updates.offlineStatus = 'Audit Buyer';
          }
          
          let activity: any = {}
          if (existing?.leadActivity && existing.leadActivity !== 'N/A' && existing.leadActivity !== '{}') {
              try { activity = JSON.parse(existing.leadActivity) } catch(e){}
          }
          activity.paymentCompletedAt = new Date().toISOString()
          activity.purchasedProductId = actualProductId
          
          if (actualProductId === 'strategy-audit') {
              activity.auditPurchasedAt = activity.paymentCompletedAt;
              activity.depositPaid = true;
              activity.depositPaidAt = activity.paymentCompletedAt;
          }

          if (addons) {
              if (!activity.addons) activity.addons = {}
              if (addons.toolkit) { activity.purchasedToolkit = true; activity.addons.toolkit = true }
              if (addons.approvalLibrary) { activity.purchasedApprovalLibrary = true; activity.addons.approvalLibrary = true }
              if (addons.strategySession) activity.addons.strategySession = true
          }
          updates.leadActivity = JSON.stringify(activity)
          
          if (existing) {
              await SubscriberRepository.updateSubscriberPreferences(email, updates)
              console.log("[PayPal Webhook] ✅ Main CRM lead updated as buyer");
          } else {
              await SubscriberRepository.saveSubscriber({
                  email, name, phone: normalizedProfileData.phone, country: 'Canada', region: normalizedProfileData.province,
                  industry: normalizedProfileData.industry, companySize: '1-9', fundingInterests: ['Grants'], website: '', companyName: '',
                  leadActivity: JSON.stringify(activity)
              })
              await SubscriberRepository.updateSubscriberPreferences(email, updates)
              console.log("[PayPal Webhook] ✅ Main CRM lead created and marked as buyer");
          }
      } catch (crmErr) {
          console.error('[PayPal Webhook] CRM Leads update failed:', crmErr)
      }
      
      const emailContent = buildPurchaseEmail({
          name,
          email,
          accessToken: purchase.accessToken,
          paypalOrderId: actualOrderId,
          productName: product.name + (addons?.toolkit ? ' + Toolkit' : '') + (addons?.approvalLibrary ? ' + Approval Library' : ''),
          amount: expectedPrice.toFixed(2),
      })
      
      const emailResult = await sendEmail({
          to: email,
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text,
          tagType: 'product-purchase'
      })
      await updatePurchaseDeliveryStatus(
        purchase.purchaseId,
        emailResult.success ? 'provider_accepted' : 'retry_pending',
        emailResult.providerMessageId || ''
      )
      
      await markProductPaymentIntentFulfilled(
        actualIntentId,
        purchase.purchaseId,
        emailResult.success ? 'provider_accepted' : 'retry_pending'
      )
      console.log(`[PayPal Webhook] Successfully processed order ${actualOrderId}`)
    } else {
      console.log(`[PayPal Webhook] Unhandled event type: ${event.event_type}`)
    }
    
    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("[PayPal Webhook] Error processing event:", error)
    await sendEmail({
        to: 'ashwani@fsidigital.ca',
        subject: '🚨 EMERGENCY: PayPal Webhook Processing Failed',
        html: `<p>Webhook failed to process: ${error.message}</p>`,
        text: `Webhook failed to process: ${error.message}`,
        tagType: 'system-alert'
    }).catch(() => {})
    
    // A non-2xx response asks PayPal to retry a transient processing failure.
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
