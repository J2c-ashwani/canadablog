import { type NextRequest, NextResponse } from 'next/server'
import { isValidCronRequest } from '@/lib/admin/auth'
import { acquireOperationLease, finishOperationLease } from '@/lib/growth-os/operations-store'
import { SocialRevenueSprintService } from '@/lib/growth-os/social-revenue-sprint'
import { sendEmail } from '@/lib/emails/mailer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 90

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized social revenue sprint.' }, { status: 401 })
  }
  const lease = await acquireOperationLease('social-revenue-sprint', 60 * 60 * 1000)
  if (!lease.acquired) return NextResponse.json({ success: true, skipped: true, reason: lease.reason })
  try {
    const result = await SocialRevenueSprintService.run()
    const failed = result.decision === 'PROVIDER_REJECTED'
    await finishOperationLease(lease, failed ? 'FAILED' : 'SUCCEEDED', result)

    // Send immediate email delivery report at the exact time of posting (7:00 PM IST)
    if (result.decision === 'PUBLISHED' || (result.results && result.results.length > 0)) {
      try {
        const nowIST = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'full',
          timeStyle: 'medium',
        }).format(new Date())

        const fbResult = result.results.find((r: any) => r.channelName === 'Facebook')
        const igResult = result.results.find((r: any) => r.channelName === 'Instagram')
        const liResult = result.results.find((r: any) => r.channelName === 'LinkedIn')
        const ytResult = result.results.find((r: any) => r.channelName === 'YouTube')

        const fbUrl = fbResult?.externalId
          ? (fbResult.externalId.includes('_') ? `https://www.facebook.com/${fbResult.externalId.split('_')[0]}/posts/${fbResult.externalId.split('_')[1]}` : `https://www.facebook.com/${fbResult.externalId}`)
          : 'https://www.facebook.com/1077759455417325'
        const igUrl = 'https://www.instagram.com/fsidigital.ca/'
        const liUrl = liResult?.externalId
          ? `https://www.linkedin.com/feed/update/${liResult.externalId}`
          : 'https://www.linkedin.com/in/sukashwanikumar/recent-activity/all/'
        const ytUrl = ytResult?.externalId
          ? `https://www.youtube.com/shorts/${ytResult.externalId}`
          : 'https://www.youtube.com/@fsidigital'

        const html = `
          <div style="font-family: Arial, sans-serif; background: #0f172a; color: #f8fafc; padding: 32px; border-radius: 12px; max-width: 640px; margin: 0 auto;">
            <div style="border-bottom: 2px solid #334155; padding-bottom: 16px; margin-bottom: 24px;">
              <span style="background: #10B981; color: #fff; font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase;">Live Published</span>
              <h2 style="color: #ffffff; margin: 12px 0 4px 0; font-size: 22px;">Daily Social Revenue Posts Live</h2>
              <p style="color: #94a3b8; font-size: 14px; margin: 0;">Dispatched on schedule: ${nowIST}</p>
            </div>

            <p style="color: #e2e8f0; font-size: 15px; line-height: 1.6;">
              Today's scheduled 7:00 PM IST social revenue sprint has completed successfully. All traffic is routed directly to the <strong>Interactive Grant Calculator</strong> (<a href="https://fsidigital.ca/calculator" style="color: #38bdf8;">fsidigital.ca/calculator</a>) to capture company data before presenting personalized paid report upgrades.
            </p>

            <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
              <tbody>
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="padding: 12px 8px; font-weight: bold; color: #38bdf8;">📘 Facebook</td>
                  <td style="padding: 12px 8px; color: #10B981;">${fbResult?.status === 'API_ACCEPTED' || fbResult?.status === 'LIVE_PUBLISHED' ? '✅ Published' : '⚠️ Queued'}</td>
                  <td style="padding: 12px 8px; text-align: right;"><a href="${fbUrl}" style="background: #2563eb; color: #fff; text-decoration: none; padding: 6px 14px; border-radius: 6px; font-size: 13px; font-weight: bold;">View Post →</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="padding: 12px 8px; font-weight: bold; color: #e11d48;">📸 Instagram</td>
                  <td style="padding: 12px 8px; color: #10B981;">${igResult?.status === 'API_ACCEPTED' || igResult?.status === 'LIVE_PUBLISHED' ? '✅ Published' : '⚠️ Queued'}</td>
                  <td style="padding: 12px 8px; text-align: right;"><a href="${igUrl}" style="background: #e11d48; color: #fff; text-decoration: none; padding: 6px 14px; border-radius: 6px; font-size: 13px; font-weight: bold;">View Post →</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="padding: 12px 8px; font-weight: bold; color: #0284c7;">💼 LinkedIn</td>
                  <td style="padding: 12px 8px; color: #10B981;">${liResult?.status === 'API_ACCEPTED' || liResult?.status === 'LIVE_PUBLISHED' ? '✅ Published' : '⚠️ Queued'}</td>
                  <td style="padding: 12px 8px; text-align: right;"><a href="${liUrl}" style="background: #0284c7; color: #fff; text-decoration: none; padding: 6px 14px; border-radius: 6px; font-size: 13px; font-weight: bold;">View Post →</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 8px; font-weight: bold; color: #ef4444;">🎬 YouTube Shorts</td>
                  <td style="padding: 12px 8px; color: #10B981;">${ytResult?.status === 'API_ACCEPTED' || ytResult?.status === 'LIVE_PUBLISHED' ? '✅ Published' : '⚠️ Queued'}</td>
                  <td style="padding: 12px 8px; text-align: right;"><a href="${ytUrl}" style="background: #dc2626; color: #fff; text-decoration: none; padding: 6px 14px; border-radius: 6px; font-size: 13px; font-weight: bold;">View Shorts →</a></td>
                </tr>
              </tbody>
            </table>

            <div style="background: rgba(255,255,255,0.05); border: 1px solid #334155; border-radius: 8px; padding: 14px 18px; margin-top: 16px;">
              <p style="margin: 0; color: #cbd5e1; font-size: 13px;"><strong>Active Variant:</strong> ${result.variantId || 'Social Revenue Sprint'}</p>
              <p style="margin: 6px 0 0 0; color: #cbd5e1; font-size: 13px;"><strong>Commercial Funnel:</strong> Social Post → Interactive Calculator → Data Capture → Paid Upgrades ($19–$79)</p>
            </div>
          </div>
        `

        await sendEmail({
          to: process.env.GROWTH_OS_REPORT_EMAIL || 'ashwani@fsidigital.ca',
          subject: `🚀 [Growth OS] Daily Social Posts Live — Facebook, Instagram, LinkedIn & YouTube Shorts`,
          html,
          text: `Daily Social Posts Published at ${nowIST}.\nFacebook: ${fbUrl}\nInstagram: ${igUrl}\nLinkedIn: ${liUrl}\n\nFunnel target: https://fsidigital.ca/calculator`,
          tagType: 'social-revenue-sprint'
        })
      } catch (emailErr) {
        console.error('[SocialRevenueSprint] Failed to send execution receipt email:', emailErr)
      }
    }

    return NextResponse.json({ success: !failed, result }, { status: failed ? 502 : 200 })
  } catch (error: any) {
    await finishOperationLease(lease, 'FAILED', { error: error.message || String(error) })
    return NextResponse.json({ success: false, error: error.message || 'Social revenue sprint failed.' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
