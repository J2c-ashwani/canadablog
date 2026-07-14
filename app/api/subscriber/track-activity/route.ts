import { NextResponse, type NextRequest } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, event, source } = body

    if (!email || !event) {
      return NextResponse.json({ error: "Email and event are required." }, { status: 400 })
    }

    // Retrieve subscriber
    const subscriber = await SubscriberRepository.getSubscriberByEmail(email)
    if (!subscriber) {
      return NextResponse.json({ error: "Subscriber not found." }, { status: 404 })
    }

    // Parse lead activity JSON safely
    let activity: any = {}
    try {
      if (subscriber.leadActivity && subscriber.leadActivity !== "N/A" && subscriber.leadActivity !== "{}") {
        activity = JSON.parse(subscriber.leadActivity)
      }
    } catch (e) {
      console.error("Failed to parse subscriber leadActivity JSON:", e)
    }

    // Timestamp the action based on event type
    const now = new Date().toISOString()
    const updates: any = {}

    // Map advanced telemetry parameters into activity JSON
    if (body.browser) activity.browser = body.browser
    if (body.os) activity.os = body.os
    if (body.device) activity.device = body.device
    if (body.viewport) activity.viewport = body.viewport
    if (body.durationSeconds) activity.durationSeconds = body.durationSeconds
    if (body.renderTimeSeconds) activity.renderTimeSeconds = body.renderTimeSeconds
    if (body.errorMessage) activity.lastErrorMessage = body.errorMessage
    if (body.surveyResponse) activity.lastSurveyResponse = body.surveyResponse

    if (event === "checkout_started" || event === "standalone_checkout_started") {
      activity.checkoutStartedAt = now
      if (body.priceShown) {
        activity.priceShown = body.priceShown
      }
    } else if (event === "checkout_viewed" || event === "paywall_viewed") {
      activity.paywallViewedAt = now
      if (body.priceShown) {
        activity.priceShown = body.priceShown
      }
    } else if (event === "step6_entered") {
      activity.step6Entered = true
      activity.step6EnteredAt = now
    } else if (event === "email_validated") {
      activity.emailValidated = true
      activity.emailValidatedAt = now
    } else if (event === "step6_exit") {
      activity.step6Exit = true
      activity.step6ExitAt = now
    } else if (event === "exit_survey_submitted") {
      activity.exitSurveySubmitted = true
      activity.exitSurveySubmittedAt = now
    } else if (event === "paypal_sdk_load_failed") {
      activity.paypalSdkLoadFailed = true
      activity.paypalSdkLoadFailedAt = now
    } else if (event === "paypal_buttons_failed") {
      activity.paypalButtonsFailed = true
      activity.paypalButtonsFailedAt = now
    } else if (event === "create_order_failed") {
      activity.createOrderFailed = true
      activity.createOrderFailedAt = now
    } else if (event === "payment_capture_failed") {
      activity.paymentCaptureFailed = true
      activity.paymentCaptureFailedAt = now
    } else if (event === "paypal_container_rendered") {
      activity.paypalContainerRendered = true
      activity.paypalContainerRenderedAt = now
    } else if (event === "paypal_buttons_rendered") {
      activity.paypalButtonsRendered = true
      activity.paypalButtonsRenderedAt = now
    } else if (event === "paypal_button_clicked") {
      activity.paypalButtonClicked = true
      activity.paypalButtonClickedAt = now
    } else if (event === "create_order_started") {
      activity.createOrderStarted = true
      activity.createOrderStartedAt = now
    } else if (event === "create_order_success") {
      activity.createOrderSuccess = true
      activity.createOrderSuccessAt = now
    } else if (event === "paypal_popup_opened") {
      activity.paypalPopupOpened = true
      activity.paypalPopupOpenedAt = now
    } else if (event === "payment_capture_success") {
      activity.paymentCaptureSuccess = true
      activity.paymentCaptureSuccessAt = now
    } else if (event === "redirect_booking") {
      activity.redirectBooking = true
      activity.redirectBookingAt = now
    } else if (event === "calculator_completed") {
      activity.calculatorCompletedAt = now
    } else if (event === "package_selected") {
      activity.packageSelected = body.packageSelected
      if (body.packageSelectedPrice) {
        activity.packageSelectedPrice = body.packageSelectedPrice
      }
      activity.packageSelectedAt = now
    } else if (event === "paypal_visible") {
      activity.paypalVisible = true
      activity.paypalVisibleAt = now
    } else if (event === "payment_approved") {
      activity.paymentApprovedAt = now
      if (body.paypalOrderId) {
        activity.paypalOrderId = body.paypalOrderId
      }
    } else if (event === "payment_completed") {
      activity.paymentCompletedAt = now
    } else if (event === "submit_survey") {
      if (!activity.surveys) {
        activity.surveys = []
      }
      activity.surveys.push({
        type: body.surveyType,
        response: body.surveyResponse,
        submittedAt: now
      })
    } else if (event === "report_viewed") {
      activity.reportViewedAt = now
      if (!subscriber.firstReportViewedAt || subscriber.firstReportViewedAt === "N/A" || subscriber.firstReportViewedAt === "") {
        updates.firstReportViewedAt = now
      }
    } else if (event === "action_plan_viewed") {
      activity.actionPlanViewedAt = now
    } else if (event === "pdf_downloaded") {
      activity.pdfDownloadedAt = now
    } else if (event === "audit_cta_clicked") {
      activity.auditCtaClickedAt = now
    } else if (event === "preview_viewed") {
      activity.previewViewed = true
      activity.previewViewedAt = now
    } else if (event === "preview_scroll_50") {
      activity.previewScroll50 = true
      activity.previewScroll50At = now
    } else if (event === "preview_scroll_100") {
      activity.previewScroll100 = true
      activity.previewScroll100At = now
    } else if (event === "preview_time_30s") {
      activity.previewTime30s = true
      activity.previewTime30sAt = now
    } else if (event === "preview_cta_clicked") {
      activity.previewCtaClicked = true
      activity.previewCtaClickedAt = now
    } else if (event === "portfolio_viewed" || event === "dashboard_viewed") {
      updates.lastPortfolioViewAt = now
      updates.lastDashboardViewAt = now
      if (source && source.toLowerCase().includes("alert")) {
        updates.lastAlertClickAt = now
        updates.lastAlertClickedAt = now
      }
    } else if (event === "login") {
      updates.lastLoginAt = now
      updates.lastPortfolioViewAt = now
      updates.lastDashboardViewAt = now
      if (source && source.toLowerCase().includes("alert")) {
        updates.lastAlertClickAt = now
        updates.lastAlertClickedAt = now
      }
    } else if (event === "alert_click") {
      updates.lastAlertClickAt = now
      updates.lastAlertClickedAt = now
      updates.lastPortfolioViewAt = now
      updates.lastDashboardViewAt = now
    } else if (event === "strategy_audit_purchased") {
      activity.strategyAuditPurchasedAt = now
      activity.auditPurchasedAt = now
      activity.depositPaid = true
      activity.depositPaidAt = now
      updates.strategyReportPurchased = true
      
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
      const shouldUpdateStage = (current: string | undefined, target: string) => {
        if (!current) return true;
        const currentIdx = STAGE_HIERARCHY.indexOf(current.trim());
        const targetIdx = STAGE_HIERARCHY.indexOf(target.trim());
        if (currentIdx === -1) return true;
        return targetIdx > currentIdx;
      };
      if (shouldUpdateStage(subscriber.offlineStatus, 'Audit Buyer')) {
        updates.offlineStatus = 'Audit Buyer';
      }
    } else if (
      event === "payment_cancelled" ||
      event === "popup_closed" ||
      event === "browser_exited" ||
      event === "diagnostic_started" ||
      event === "diagnostic_completed" ||
      event === "lead_saved" ||
      event === "product_recommended" ||
      event === "report_delivered" ||
      event === "upsell_viewed" ||
      event === "upsell_purchased" ||
      event === "booked_strategy_session" ||
      event === "became_client"
    ) {
      activity[`${event}At`] = now;
      activity[event] = true;
    } else {
      return NextResponse.json({ error: `Unsupported event type: ${event}` }, { status: 400 })
    }

    updates.leadActivity = JSON.stringify(activity)

    // Update attribution source if passed
    if (source) {
      updates.lastAttributionSource = source
    }

    const dbRes = await SubscriberRepository.updateSubscriberPreferences(email, updates)
    if (!dbRes.success) {
      return NextResponse.json({ error: dbRes.error || "Failed to update subscriber activity log." }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      event,
      leadActivity: activity,
      lastAttributionSource: source || subscriber.lastAttributionSource || "N/A"
    })
  } catch (err: any) {
    console.error("Track activity API route error:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
