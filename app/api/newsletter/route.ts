import { type NextRequest, NextResponse } from "next/server"
import { captureEmailLead } from "@/lib/google-sheets"

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Save lead to Google Sheets with source tracking
    captureEmailLead(email, "Newsletter Subscription", name).catch((error) => {
      console.error("❌ Failed to save newsletter lead to Google Sheets:", error)
    })

    // Here you would integrate with your email service provider
    // Examples: Mailchimp, ConvertKit, SendGrid, etc.

    console.log(`📧 Newsletter signup: ${email}`)

    // You can add the email to your database here
    // await addToNewsletter(email)

    // Send welcome email with PDF guide
    // await sendWelcomeEmail(email)

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
