import { type NextRequest, NextResponse } from "next/server"
import { isValidCronRequest } from "@/lib/admin/auth"
import { GrowthOSKernel } from "@/lib/growth-os/core/growth-kernel"
import { getAllPurchases } from "@/lib/products/purchase-store"
import { sendEmail } from "@/lib/emails/mailer"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const searchParams = request.nextUrl.searchParams
    const keyParam = searchParams.get("key")

    // 1. Use the same auth pattern as the growth-os cron
    const isAuthorized =
      isValidCronRequest(request) ||
      keyParam === "fsi2026admin" ||
      authHeader === `Bearer fsi2026admin` ||
      authHeader === `Bearer ${process.env.CRON_SECRET}`

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized Growth OS Health Cron execution. Access denied." },
        { status: 401 }
      )
    }

    console.log(`[GrowthOSHealthCron] Executing daily health check...`)

    // 2. Run the Growth OS daily loop and capture the result
    let kernelResult = null
    let kernelError = null

    try {
      kernelResult = await GrowthOSKernel.executeDailyGrowthLoop()
    } catch (error: any) {
      console.error("[GrowthOSHealthCron] Error executing master growth loop:", error)
      kernelError = error.message || String(error)
    }

    // 3. Gather purchase data from the last 24 hours
    let recentPurchases = []
    let totalRevenue = 0
    let productsSold: string[] = []
    
    try {
      const allPurchases = await getAllPurchases()
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
      
      recentPurchases = allPurchases.filter(p => {
        if (!p.createdAt) return false
        const pDate = new Date(p.createdAt)
        return pDate >= oneDayAgo
      })

      recentPurchases.forEach(p => {
        totalRevenue += parseFloat(p.amount) || 0
        if (p.productId) productsSold.push(p.productId)
      })
    } catch (err: any) {
      console.error("[GrowthOSHealthCron] Error gathering purchases:", err)
    }

    // 3b. Gather subscriber lead intelligence metrics
    let totalSubscribers = 0
    let newLeads24h = 0
    try {
      const { SubscriberRepository } = await import("@/lib/leads/SubscriberRepository")
      const subscribers = await SubscriberRepository.getAllSubscribers()
      totalSubscribers = subscribers.length
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
      newLeads24h = subscribers.filter(s => s.timestamp && new Date(s.timestamp) >= oneDayAgo).length
    } catch (subErr) {
      console.error("[GrowthOSHealthCron] Error gathering subscriber metrics:", subErr)
    }

    // 4. Build and send a formatted HTML email report
    const todayDate = new Date().toISOString().split("T")[0]
    const getStatusIcon = (status: boolean) => status ? '✅' : '❌'
    
    let channelStatusHtml = ''
    let exceptionsHtml = ''
    let channelsLive = 0
    let channelsFailed = 0
    const totalChannels = 7
    let overallStatusText = 'FAILED'

    if (kernelResult?.multiChannelReceipt?.channelStatusSummary) {
      const summary = kernelResult.multiChannelReceipt.channelStatusSummary
      
      const channels = [
        { name: 'Blog', status: summary.Blog },
        { name: 'Newsletter', status: summary.Newsletter },
        { name: 'LinkedIn', status: summary.LinkedIn },
        { name: 'Instagram/Facebook', status: summary.InstagramFacebook },
        { name: 'YouTube', status: summary.YouTube },
        { name: 'FAQ', status: summary.FAQ },
        { name: 'Partner', status: summary.Partner }
      ]

      channels.forEach(ch => {
        const isLive = ch.status === 'LIVE_PUBLISHED'
        const isQueued = ch.status === 'QUEUED_FOR_APPROVAL'
        const isFailed = ch.status === 'FAILED'
        
        let icon = '❌'
        if (isLive) {
          icon = '✅'
          channelsLive++
        } else if (isQueued) {
          icon = '❌'
        } else if (isFailed) {
          icon = '❌'
          channelsFailed++
        }
        
        channelStatusHtml += `<li>${ch.name}: ${icon} ${ch.status || 'UNKNOWN'}</li>`

        if (isQueued) {
           exceptionsHtml += `<li>${ch.name} returned QUEUED_FOR_APPROVAL</li>`
        } else if (isFailed) {
           exceptionsHtml += `<li>${ch.name} returned FAILED</li>`
        }
      })
      
      if (channelsLive === totalChannels) {
        overallStatusText = 'SUCCESS'
      } else if (channelsLive > 0) {
        overallStatusText = 'PARTIAL_SUCCESS'
      } else {
        overallStatusText = 'FAILED'
      }
    } else {
       channelStatusHtml = '<li>No channel data available (Kernel failed or returned no receipt)</li>'
       channelsFailed = totalChannels
    }
    
    if (!exceptionsHtml) {
      exceptionsHtml = '<li>None</li>'
    }

    if (kernelError) {
      exceptionsHtml += `<li><strong style="color:#ef4444">Kernel Error:</strong> ${kernelError}</li>`
    }

    const htmlContent = `
      <div style="font-family: sans-serif; background-color: #1a1a2e; color: #ffffff; padding: 20px; line-height: 1.6;">
        <h2 style="color: #4ade80; border-bottom: 1px solid #334155; padding-bottom: 10px;">GROWTH OS DAILY HEALTH REPORT &mdash; ${todayDate}</h2>
        
        <h3 style="color: #94a3b8; margin-top: 20px;">CONTENT PIPELINE</h3>
        <ul>
          <li><strong>Topic:</strong> ${kernelResult?.opportunity?.id || kernelResult?.opportunity?.buyerSegment || 'N/A'}</li>
          <li><strong>Signal Processed:</strong> ${getStatusIcon(!!kernelResult?.opportunity)}</li>
          <li><strong>Campaign Generated:</strong> ${getStatusIcon(!!kernelResult?.bundle)}</li>
        </ul>

        <h3 style="color: #94a3b8; margin-top: 20px;">CHANNEL STATUS</h3>
        <ul style="list-style-type: none; padding-left: 0;">
          ${channelStatusHtml}
        </ul>

        <h3 style="color: #94a3b8; margin-top: 20px;">OVERALL STATUS</h3>
        <ul>
          <li><strong>Channels Live:</strong> ${channelsLive} / ${totalChannels}</li>
          <li><strong>Channels Failed:</strong> ${channelsFailed}</li>
          <li><strong>Overall:</strong> ${overallStatusText === 'SUCCESS' ? '<span style="color:#4ade80">SUCCESS</span>' : overallStatusText === 'PARTIAL_SUCCESS' ? '<span style="color:#fbbf24">PARTIAL_SUCCESS</span>' : '<span style="color:#ef4444">FAILED</span>'}</li>
        </ul>

        <h3 style="color: #94a3b8; margin-top: 20px;">REVENUE & BUSINESS HEALTH (Last 24 Hours)</h3>
        <ul>
          <li><strong>Total Purchases:</strong> ${recentPurchases.length}</li>
          <li><strong>Total Revenue:</strong> $${totalRevenue.toFixed(2)}</li>
          <li><strong>Products Sold:</strong> ${productsSold.length > 0 ? productsSold.join(", ") : "None"}</li>
          <li><strong>New Leads (24h):</strong> ${newLeads24h}</li>
          <li><strong>Total Lead Database:</strong> ${totalSubscribers} subscribers</li>
        </ul>

        <h3 style="color: #94a3b8; margin-top: 20px;">EXCEPTIONS</h3>
        <ul>
          ${exceptionsHtml}
        </ul>
      </div>
    `

    const plainTextContent = `GROWTH OS DAILY HEALTH REPORT - ${todayDate}
Overall: ${overallStatusText}
Revenue: $${totalRevenue.toFixed(2)} (${recentPurchases.length} purchases)`

    await sendEmail({
      to: "ashwani@fsidigital.ca",
      subject: `GROWTH OS DAILY HEALTH REPORT — ${todayDate}`,
      html: htmlContent,
      text: plainTextContent,
      tagType: "health-report",
      from: "FSI Digital Growth OS <hello@fsidigital.ca>"
    })

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "Growth OS Health Cron executed and report sent.",
      kernelStatus: overallStatusText,
    })
  } catch (error: any) {
    console.error("[GrowthOSHealthCron] Unhandled error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to execute Growth OS Health Cron" },
      { status: 500 }
    )
  }
}
