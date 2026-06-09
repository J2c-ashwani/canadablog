import { type NextRequest, NextResponse } from "next/server"
import { AlertEngine } from "@/lib/leads/AlertEngine"
import { SubscriberRepository, type SubscriberProfile } from "@/lib/leads/SubscriberRepository"
import { getAllPrograms } from "@/lib/data/programs"
import { saveCampaignMetrics } from "@/lib/leads/alert-metrics"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, category, priority, subject, programSlug, changeText } = body

    if (!id || !category || !priority || !subject) {
      return NextResponse.json({ error: "Missing required draft properties" }, { status: 400 })
    }

    const subscribers = await SubscriberRepository.getAllSubscribers()
    const activeSubs = subscribers.filter(s => s.isSubscribed)
    let targetSubs: SubscriberProfile[] = []

    const programs = getAllPrograms()
    const program = programs.find(p => p.slug === programSlug)

    // Filter subscribers matching this specific alert segment
    if (category === "Weekly Intelligence") {
      targetSubs = activeSubs // All active subscribers receive a personalized digest
    } else if (program) {
      targetSubs = activeSubs.filter(sub => AlertEngine.matchesProfile(program, sub))
    }

    if (targetSubs.length === 0) {
      return NextResponse.json({ error: "No active recipients in target segment." }, { status: 400 })
    }

    // Prepare campaign record in metrics database
    await saveCampaignMetrics({
      campaignId: id,
      category,
      subject,
      sentCount: targetSubs.length,
      opens: 0,
      clicks: 0,
      conversions: 0,
      audits: 0,
      revenue: 0,
      timestamp: new Date().toISOString()
    })

    const senderApiKey = process.env.SENDER_API_KEY
    const senderFromEmail = process.env.SENDER_FROM_EMAIL || "hello@fsidigital.ca"
    const senderFromName = process.env.SENDER_FROM_NAME || "FSI Digital"

    // Dispatch emails
    console.log(`\n📢 [ALERT BROADCAST START] Campaign ID: ${id}`)
    console.log(`   Subject: "${subject}"`)
    console.log(`   Priority: [${priority}] | Category: [${category}]`)
    console.log(`   Recipients: ${targetSubs.length} active subscriber profiles`)
    
    for (const sub of targetSubs) {
      let emailContent = ""
      if (category === "New Opportunity" && program) {
        emailContent = AlertEngine.generateNewOpportunityBody(program, sub)
      } else if (category === "Program Change" && program && changeText) {
        emailContent = AlertEngine.generateProgramChangeBody(program, sub, changeText)
      } else if (category === "Weekly Intelligence") {
        const matched = programs.filter(p => AlertEngine.matchesProfile(p, sub)).slice(0, 5)
        emailContent = AlertEngine.generateWeeklyDigestBody(matched, sub)
      } else if (category === "Emergency" && program) {
        emailContent = AlertEngine.generateEmergencyAlertBody(program, sub)
      }

      const fullHtml = AlertEngine.wrapEmailTemplate(emailContent, sub)
      
      if (senderApiKey) {
        try {
          const res = await fetch("https://api.sender.net/v2/message/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": `Bearer ${senderApiKey}`
            },
            body: JSON.stringify({
              from: {
                email: senderFromEmail,
                name: senderFromName
              },
              to: {
                email: sub.email,
                name: sub.name || "Founder"
              },
              subject: subject,
              html: fullHtml
            })
          })

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}))
            console.error(`❌ Sender.net failed to send to ${sub.email}:`, errData)
          } else {
            console.log(`   ➔ Sent to: ${sub.email} via Sender.net`)
          }
        } catch (err) {
          console.error(`❌ Failed to request Sender.net for ${sub.email}:`, err)
        }
      } else {
        // Console mock send logs to verify compliance
        console.log(`   ➔ Mock Sent to: ${sub.email} | Token: ${sub.unsubscribeToken}`)
      }
    }
    console.log(`📢 [ALERT BROADCAST COMPLETED] Successfully logged campaign metrics.\n`)

    return NextResponse.json({ 
      success: true, 
      sentCount: targetSubs.length, 
      message: `Alert broadcast successfully sent to ${targetSubs.length} active subscribers.`
    })
  } catch (error) {
    console.error("Alert send API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
