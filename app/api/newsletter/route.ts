import { type NextRequest, NextResponse } from "next/server"
import { sendNewsletterWelcomeEmail } from "@/lib/emails/newsletter-marketing"
import { ensureScopedSubscriberTokens, SubscriberRepository } from "@/lib/leads/SubscriberRepository"
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

    const saved = await SubscriberRepository.saveSubscriber({
      email,
      name: name || '',
      country: 'Canada',
      region: 'ON',
      industry: 'other',
      companySize: '1-9',
      fundingInterests: ['Grants'],
      leadActivity: JSON.stringify({ newsletterSubscribedAt: new Date().toISOString() }),
    })
    if (!saved.success) {
      return NextResponse.json({ error: "Unable to save your subscription" }, { status: 500 })
    }

    const credentials = await ensureScopedSubscriberTokens(email)
    if (!credentials) {
      return NextResponse.json({ error: "Unable to secure your subscription" }, { status: 500 })
    }

    // Here you would integrate with your email service provider
    // Examples: Mailchimp, ConvertKit, SendGrid, etc.

    console.log("📧 Newsletter signup processed successfully")

    // Send welcome email with PDF guide and OTO dashboard access
    await sendNewsletterWelcomeEmail(email, name, credentials.loginToken).catch((error) => {
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
