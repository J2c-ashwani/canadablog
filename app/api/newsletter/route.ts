import { type NextRequest, NextResponse } from "next/server"
import { captureEmailLead } from "@/lib/google-sheets"
import { sendNewsletterWelcomeEmail } from "@/lib/emails/newsletter-marketing"
import { getFallbackLoginToken } from "@/lib/leads/SubscriberRepository"
import { applyRateLimit } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
  // Rate Limit: 5 requests / minute
  if (process.env.NODE_ENV !== 'development') {
    const limitRes = await applyRateLimit(request, 5, 60 * 1000);
    if (limitRes.isLimited) return limitRes.response;
  }

  try {
    const { email, name } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    const loginToken = getFallbackLoginToken(email)

    // Save lead to Google Sheets with source tracking
    captureEmailLead(email, "Newsletter Subscription", name, undefined, undefined, undefined, undefined, undefined, undefined, undefined).catch((error) => {
      console.error("❌ Failed to save newsletter lead to Google Sheets:", error)
    })

    // Here you would integrate with your email service provider
    // Examples: Mailchimp, ConvertKit, SendGrid, etc.

    console.log(`📧 Newsletter signup: ${email}`)

    // Send welcome email with PDF guide and OTO dashboard access
    await sendNewsletterWelcomeEmail(email, name, loginToken).catch((error) => {
      console.error("❌ Failed to send welcome email to newsletter subscriber:", error)
    })

    return NextResponse.json(
      {
        message: "Successfully subscribed to newsletter",
        email: email,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Newsletter signup error:", error)
    return NextResponse.json({ error: "Failed to subscribe to newsletter" }, { status: 500 })
  }
}
