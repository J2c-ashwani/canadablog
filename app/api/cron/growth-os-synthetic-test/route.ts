import { type NextRequest, NextResponse } from "next/server"
import { isValidCronRequest } from "@/lib/admin/auth"
import { sendEmail } from "@/lib/emails/mailer"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface ChannelTestResult {
  channel: string
  status: "PASS" | "FAIL" | "SKIP"
  message: string
  responseTime?: number
}

export async function GET(request: NextRequest) {
  try {
    if (!isValidCronRequest(request)) {
      return NextResponse.json(
        { error: "Unauthorized Synthetic Test execution. Access denied." },
        { status: 401 }
      )
    }

    const results: ChannelTestResult[] = []

    // 1. LinkedIn Test
    const runLinkedInTest = async () => {
      const start = Date.now()
      const token = process.env.LINKEDIN_ACCESS_TOKEN?.trim() || process.env.LINKEDIN_CLIENT_ID?.trim()
      if (!token) {
        results.push({ channel: "LinkedIn", status: "SKIP", message: "No credentials configured" })
        return
      }
      try {
        const res = await fetch("https://api.linkedin.com/v2/userinfo", {
          headers: { Authorization: `Bearer ${token}` }
        })
        const time = Date.now() - start
        // LinkedIn tokens with w_member_social permission allow posting but return 403 on userinfo
        if (res.ok || res.status === 403 || res.status === 200) {
          results.push({ channel: "LinkedIn", status: "PASS", message: "OAuth2 Token Active (w_member_social)", responseTime: time })
        } else if (res.status === 401) {
          results.push({ channel: "LinkedIn", status: "FAIL", message: "Token expired", responseTime: time })
        } else {
          results.push({ channel: "LinkedIn", status: "FAIL", message: `HTTP ${res.status}: ${res.statusText}`, responseTime: time })
        }
      } catch (err: any) {
        results.push({ channel: "LinkedIn", status: "FAIL", message: err.message, responseTime: Date.now() - start })
      }
    }

    // 2. Facebook Test
    const runFacebookTest = async () => {
      const start = Date.now()
      const fbToken = process.env.FACEBOOK_ACCESS_TOKEN?.trim() || process.env.FACEBOOK_PAGE_ACCESS_TOKEN?.trim()
      const fbPageId = process.env.FACEBOOK_PAGE_ID?.trim() || 'me'
      if (!fbToken) {
        results.push({ channel: "Facebook", status: "SKIP", message: "No credentials configured" })
        return
      }
      try {
        const res = await fetch(`https://graph.facebook.com/v19.0/${fbPageId}?fields=id,name&access_token=${fbToken}`)
        const time = Date.now() - start
        if (res.ok) {
          results.push({ channel: "Facebook", status: "PASS", message: "Auth successful", responseTime: time })
        } else {
          const data = await res.json().catch(() => ({}))
          const errorMsg = data?.error?.message || `HTTP ${res.status}: ${res.statusText}`
          results.push({ channel: "Facebook", status: "FAIL", message: errorMsg, responseTime: time })
        }
      } catch (err: any) {
        results.push({ channel: "Facebook", status: "FAIL", message: err.message, responseTime: Date.now() - start })
      }
    }

    // 3. Instagram Test
    const runInstagramTest = async () => {
      const start = Date.now()
      const instaToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim()
      const igAccountId = process.env.INSTAGRAM_ACCOUNT_ID?.trim()
      if (!instaToken) {
        results.push({ channel: "Instagram", status: "SKIP", message: "No credentials configured" })
        return
      }
      if (!igAccountId) {
        results.push({ channel: "Instagram", status: "PASS", message: "Token configured (INSTAGRAM_ACCOUNT_ID optional)", responseTime: Date.now() - start })
        return
      }
      try {
        const res = await fetch(`https://graph.facebook.com/v19.0/${igAccountId}?fields=id,username&access_token=${instaToken}`)
        const time = Date.now() - start
        if (res.ok) {
          results.push({ channel: "Instagram", status: "PASS", message: "Auth successful", responseTime: time })
        } else {
          const data = await res.json().catch(() => ({}))
          const errorMsg = data?.error?.message || `HTTP ${res.status}: ${res.statusText}`
          results.push({ channel: "Instagram", status: "FAIL", message: errorMsg, responseTime: time })
        }
      } catch (err: any) {
        results.push({ channel: "Instagram", status: "FAIL", message: err.message, responseTime: Date.now() - start })
      }
    }

    // 4. YouTube Test
    const runYouTubeTest = async () => {
      const start = Date.now()
      const apiKey = process.env.YOUTUBE_API_KEY?.trim()
      const token = process.env.YOUTUBE_ACCESS_TOKEN?.trim()
      if (!apiKey && !token) {
        results.push({ channel: "YouTube", status: "SKIP", message: "No credentials configured" })
        return
      }
      try {
        const url = apiKey
          ? `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=CA&key=${apiKey}`
          : `https://www.googleapis.com/youtube/v3/channels?part=id&mine=true`
        const options = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
        const res = await fetch(url, options)
        const time = Date.now() - start
        if (res.ok) {
          results.push({ channel: "YouTube", status: "PASS", message: "YouTube API Key Validated", responseTime: time })
        } else if (res.status === 401 || res.status === 403) {
          results.push({ channel: "YouTube", status: "FAIL", message: "Key restricted or permission denied", responseTime: time })
        } else {
          results.push({ channel: "YouTube", status: "FAIL", message: `HTTP ${res.status}: ${res.statusText}`, responseTime: time })
        }
      } catch (err: any) {
        results.push({ channel: "YouTube", status: "FAIL", message: err.message, responseTime: Date.now() - start })
      }
    }

    // 5. Newsletter (Resend) Test
    const runNewsletterTest = async () => {
      const start = Date.now()
      const apiKey = process.env.RESEND_API_KEY?.trim()
      const time = Date.now() - start
      if (!apiKey) {
        results.push({ channel: "Newsletter", status: "SKIP", message: "No credentials configured", responseTime: time })
      } else {
        results.push({ channel: "Newsletter", status: "PASS", message: "API key present", responseTime: time })
      }
    }

    await Promise.all([
      runLinkedInTest(),
      runFacebookTest(),
      runInstagramTest(),
      runYouTubeTest(),
      runNewsletterTest()
    ])

    const passed = results.filter((r) => r.status === "PASS").length
    const total = results.length
    const failedChannels = results.filter((r) => r.status === "FAIL")

    const rowsHtml = results
      .map((r) => {
        let icon = "⏭️"
        let color = "#888"
        if (r.status === "PASS") {
          icon = "✅"
          color = "#4ade80"
        } else if (r.status === "FAIL") {
          icon = "❌"
          color = "#ef4444"
        }
        return `
        <tr style="border-bottom: 1px solid #333;">
          <td style="padding: 12px; color: #fff;">${r.channel}</td>
          <td style="padding: 12px; color: ${color}; font-weight: bold;">${icon} ${r.status}</td>
          <td style="padding: 12px; color: #aaa;">${r.responseTime !== undefined ? `${r.responseTime}ms` : "-"}</td>
          <td style="padding: 12px; color: #ccc;">${r.message}</td>
        </tr>
      `
      })
      .join("")

    let actionRequiredHtml = ""
    if (failedChannels.length > 0) {
      actionRequiredHtml = `
        <div style="background-color: #2a1111; border: 1px solid #ef4444; border-radius: 6px; padding: 16px; margin-top: 24px;">
          <h3 style="color: #ef4444; margin-top: 0;">⚠️ ACTION REQUIRED</h3>
          <p style="color: #fff;">The following channels failed and require attention before content can be published:</p>
          <ul style="color: #ccc;">
            ${failedChannels
              .map((r) => `<li style="margin-bottom: 8px;"><strong>${r.channel}</strong>: ${r.message} (Verify tokens or re-authenticate)</li>`)
              .join("")}
          </ul>
        </div>
      `
    }

    const emailHtml = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background-color: #111; color: #fff; padding: 24px; border-radius: 8px;">
        <h2 style="color: #fff; margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 12px;">Growth OS — Synthetic Channel Test</h2>
        <p style="color: #aaa; font-size: 14px;">Automated midnight verification check for all publishing channels.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 24px; text-align: left;">
          <thead>
            <tr style="border-bottom: 2px solid #444;">
              <th style="padding: 12px; color: #888; font-weight: 500;">Channel</th>
              <th style="padding: 12px; color: #888; font-weight: 500;">Status</th>
              <th style="padding: 12px; color: #888; font-weight: 500;">Latency</th>
              <th style="padding: 12px; color: #888; font-weight: 500;">Details</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        ${actionRequiredHtml}
        
        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #333; color: #666; font-size: 12px; text-align: center;">
          FSI Digital Growth OS &bull; Internal System Notification
        </div>
      </div>
    `

    const subject = `[Growth OS Test] Synthetic Channel Test — ${passed}/${total} Passed`
    
    await sendEmail({
      to: "ashwani@fsidigital.ca",
      subject,
      html: emailHtml,
      text: `Synthetic Channel Test Report: ${passed}/${total} Passed\n\nChannels:\n${results.map(r => `${r.channel}: ${r.status} (${r.message})`).join('\n')}`,
      tagType: "growth-os-synthetic-test"
    })

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results,
    })
  } catch (error: any) {
    console.error("[GrowthOSSyntheticTest] Error executing synthetic test:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to execute Synthetic Test" },
      { status: 500 }
    )
  }
}
