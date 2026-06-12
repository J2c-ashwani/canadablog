import { NextResponse, type NextRequest } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { sendReportPurchaseEmail } from "@/lib/emails/report-purchase"
import { verifyPayPalOrder } from "@/lib/payments/paypal"
import { PortfolioScoreEngine } from "@/lib/leads/PortfolioScoreEngine"
import { getAllPrograms } from "@/lib/data/programs"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, transactionId, source } = body

    if (!email || !transactionId) {
      return NextResponse.json({ error: "Email and transactionId are required." }, { status: 400 })
    }

    // Check if subscriber exists
    const subscriber = await SubscriberRepository.getSubscriberByEmail(email)
    if (!subscriber) {
      return NextResponse.json({ error: "Subscriber not found. Please complete the assessment screener first." }, { status: 404 })
    }

    // Secure server-side PayPal order validation
    const expectedPrice = subscriber.subscriptionStatus === "active" || subscriber.subscriptionStatus === "trial" ? "99.00" : "199.00";
    const verification = await verifyPayPalOrder(transactionId, expectedPrice);
    if (!verification.verified) {
      return NextResponse.json({ error: `Payment verification failed: ${verification.error}` }, { status: 400 });
    }

    // Calculate details for email
    const allPrograms = getAllPrograms()
    const readiness = PortfolioScoreEngine.calculateReadiness({
      isIncorporated: true, // fallback to typical B2B profile if properties missing
      hasRd: true,
      hasHiring: true,
      hasExporting: true,
      companySize: subscriber.companySize || "1-9"
    })
    
    const interests = subscriber.fundingInterests || []
    const programSlugs = allPrograms.map(p => p.slug)
    const stackingRange = PortfolioScoreEngine.calculateStackingRange(programSlugs, allPrograms)

    // Update subscriber status in sheets
    const updates: any = {
      reportPurchased: true,
      reportTransactionId: transactionId,
      assessmentPurchasedAt: new Date().toISOString(),
    }

    if (source) {
      updates.lastAttributionSource = source
    }

    const dbRes = await SubscriberRepository.updateSubscriberPreferences(email, updates)
    if (!dbRes.success) {
      return NextResponse.json({ error: dbRes.error || "Failed to update subscriber record in Google Sheets." }, { status: 500 })
    }

    // Trigger purchase confirmation email
    sendReportPurchaseEmail({
      to: subscriber.email,
      name: subscriber.name || "Founder",
      loginToken: subscriber.loginToken || "",
      companyName: subscriber.companyName || "Your Company",
      readinessScore: readiness.score,
      estimatedFunding: stackingRange.formatted
    }).catch((err) => {
      console.error("❌ Failed to dispatch report purchase confirmation email:", err)
    })

    return NextResponse.json({
      success: true,
      loginToken: subscriber.loginToken,
      reportPurchased: true,
      reportTransactionId: transactionId
    })
  } catch (err: any) {
    console.error("Report buy API route error:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
