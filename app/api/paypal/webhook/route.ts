import { type NextRequest, NextResponse } from "next/server"
import { getAllPurchases, recordPurchase } from "@/lib/products/purchase-store"
import { getProduct } from "@/lib/products/catalog"
import { grantEntitlements } from "@/lib/products/entitlements"
import { sendEmail } from "@/lib/emails/mailer"
import { buildPurchaseEmail } from "@/lib/emails/product-purchase"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { getProductPaymentIntent, markProductPaymentIntentCompleted } from "@/lib/payments/product-payment-intents"

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
      "Authorization": `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })
  
  const { access_token } = await authResponse.json()
  
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
      actualOrderId = paymentIntent.paypalOrderId || actualOrderId
      
      const allPurchases = await getAllPurchases()
      const existingPurchase = allPurchases.find(
        (p: any) => p.paypalOrderId === actualOrderId && p.productId === actualProductId
      )
      
      if (existingPurchase) {
          console.log(`[PayPal Webhook] Purchase already fulfilled for order ${actualOrderId}`)
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
              profileData: normalizedProfileData, attribution: attribution || {}
          })
          await grantEntitlements({ purchaseId: addonPurchase.purchaseId, email, productId: 'funding-toolkit', orderId: actualOrderId })
      }
      if (addons?.approvalLibrary) {
          const addonPurchase = await recordPurchase({
              email, name, productId: 'funding-approval-library', amount: '9.00', paypalOrderId: actualOrderId,
              profileData: normalizedProfileData, attribution: attribution || {}
          })
          await grantEntitlements({ purchaseId: addonPurchase.purchaseId, email, productId: 'funding-approval-library', orderId: actualOrderId })
      }
      if (addons?.strategySession) {
          const addonPurchase = await recordPurchase({
              email, name, productId: 'strategy-session', amount: '180.00', paypalOrderId: actualOrderId,
              profileData: normalizedProfileData, attribution: attribution || {}
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
      
      await sendEmail({
          to: email,
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text,
          tagType: 'product-purchase'
      })
      
      await markProductPaymentIntentCompleted(actualIntentId)
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
    
    // Return 200 to prevent retries
    return NextResponse.json({ received: true, error: "Internal Error, but handled" })
  }
}
