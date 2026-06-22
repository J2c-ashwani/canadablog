import { type NextRequest, NextResponse } from 'next/server'
import { getStrategyRecoveryRecords } from '@/lib/strategy-session/recovery-store'
import { sendBookingReminderEmail } from '@/lib/emails/post-call-emails'
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository'
import { isValidCronRequest } from '@/lib/admin/auth'

// ── POST-PAYMENT BOOKING REMINDER CRON ─────────────────────────────────────
// Under the Pay-First flow, customers pay $199 on /audit, then are redirected
// to /booking where they book their Calendly slot. This cron detects customers
// who paid but have not booked their Calendly session within 2 hours.
//
// Trigger conditions:
//   1. Recovery record status === 'paid'
//   2. record.calendlyEventUri is empty (no booking recorded yet)
//   3. At least 2 hours have passed since paidAt
//   4. bookingReminderSentAt not already set in the subscriber's leadActivity
//
// Schedule: Register on cron-job.org (NOT Vercel cron — vercel.json is intentionally empty).
// Recommended frequency: every 4 hours
// URL: https://www.fsidigital.ca/api/cron/process-booking-reminder?secret=CRON_SECRET
// OR use header: x-cron-secret: CRON_SECRET
// ─────────────────────────────────────────────────────────────────────────────

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TWO_HOURS_MS = 2 * 60 * 60 * 1000

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized booking reminder cron execution.' }, { status: 401 })
  }

  try {
    const records = await getStrategyRecoveryRecords()
    const now = Date.now()

    let sentCount = 0
    let skippedCount = 0
    const errors: string[] = []

    for (const record of records) {
      // Only target paid records with no Calendly booking
      if (record.status !== 'paid') {
        skippedCount++
        continue
      }
      if (record.calendlyEventUri) {
        // Already booked — no reminder needed
        skippedCount++
        continue
      }
      if (!record.email || !record.paidAt) {
        skippedCount++
        continue
      }

      const paidAtMs = new Date(record.paidAt).getTime()
      if (isNaN(paidAtMs)) {
        skippedCount++
        continue
      }

      const elapsedSincePaid = now - paidAtMs
      if (elapsedSincePaid < TWO_HOURS_MS) {
        // Not enough time has passed since payment
        skippedCount++
        continue
      }

      // Check if we already sent the booking reminder via leadActivity
      let subscriber: any = null
      try {
        subscriber = await SubscriberRepository.getSubscriberByEmail(record.email)
      } catch (e) {
        // Subscriber not found — still attempt the email
      }

      let activity: Record<string, any> = {}
      if (subscriber?.leadActivity && subscriber.leadActivity !== 'N/A' && subscriber.leadActivity !== '{}') {
        try {
          activity = JSON.parse(subscriber.leadActivity)
        } catch (e) {}
      }

      if (activity.bookingReminderSentAt) {
        // Already sent — skip
        skippedCount++
        continue
      }

      // Send the booking reminder
      console.log(`[BookingReminder] Sending post-payment booking reminder to: ${record.email}`)
      try {
        const result = await sendBookingReminderEmail({
          to: record.email,
          name: record.name || 'Founder',
          loginToken: subscriber?.loginToken || undefined,
          recoveryId: record.recoveryId,
        })

        if (result.success || result.skipped) {
          // Mark sent in leadActivity so we never double-send
          activity.bookingReminderSentAt = new Date().toISOString()
          if (subscriber) {
            await SubscriberRepository.updateSubscriberPreferences(record.email, {
              leadActivity: JSON.stringify(activity),
            })
          }
          sentCount++
        }
      } catch (err: any) {
        console.error(`[BookingReminder] Failed to send to ${record.email}:`, err)
        errors.push(`${record.email}: ${err.message || 'Unknown error'}`)
      }
    }

    return NextResponse.json({
      success: errors.length === 0,
      processed: records.length,
      sent: sentCount,
      skipped: skippedCount,
      errors,
    })
  } catch (err: any) {
    console.error('[BookingReminder] Cron error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
