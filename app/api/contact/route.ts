import { type NextRequest, NextResponse } from "next/server"
import { appendLeadToSheet } from "@/lib/google-sheets"
import { sendContactConfirmation } from "@/lib/emails/contact-confirmation"
import { validateEmail } from "@/lib/email-validator"

function formatPhoneNumber(phone: string, country?: string): string {
  if (!phone) return "N/A"

  const cleanPhone = phone.replace(/[^0-9]/g, "")
  if (cleanPhone.length === 0) return "N/A"

  const countryLower = (country || "").toLowerCase()
  let defaultPrefix = "1"
  if (countryLower.includes("india")) defaultPrefix = "91"
  if (countryLower.includes("united kingdom") || countryLower.includes("uk")) defaultPrefix = "44"
  if (countryLower.includes("australia")) defaultPrefix = "61"

  if (cleanPhone.length === 10) {
    return `+${defaultPrefix}${cleanPhone}`
  }

  if (cleanPhone.startsWith(defaultPrefix)) {
    return `+${cleanPhone}`
  }

  return phone.startsWith("+") ? phone : `+${cleanPhone}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone: rawPhone,
      category,
      message,
      companyName,
      country,
      state,
      industry,
      businessStage,
      fundingAmount,
      fundingPurpose,
      businessDescription,
      consentToPartnerContact,
      pagePath,
    } = body

    const phone = formatPhoneNumber(rawPhone, country)

    // Validate required fields
    if (!email || !name || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    const emailCheck = validateEmail(email)
    if (!emailCheck.isValid) {
      return NextResponse.json({ error: emailCheck.error }, { status: 400 })
    }

    // Save lead to Google Sheets with source tracking
    await appendLeadToSheet({
      source: `Contact Form - ${category || "General"}`,
      timestamp: new Date().toISOString(),
      email,
      name,
      companyName,
      country,
      state,
      industry,
      businessStage,
      fundingAmount,
      fundingPurpose,
      businessDescription,
      phone,
      additionalNotes: `Category: ${category || "General"}\nMessage: ${message}`,
      consentToPartnerContact: !!consentToPartnerContact,
      pagePath: pagePath || request.headers.get("referer") || "N/A",
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "N/A",
      userAgent: request.headers.get("user-agent") || "N/A",
    }).catch((error) => {
      console.error("❌ Failed to save contact lead to Google Sheets:", error)
    })

    console.log(`📧 Contact form submission from: ${name} (${email})`)

    // Send confirmation receipt email to the user (fire-and-forget)
    sendContactConfirmation({
      to: email,
      name: name || '',
      category: category || 'General',
      messageSnippet: message || '',
    }).catch((error) => {
      console.error('❌ Failed to send contact confirmation email:', error)
    })

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting us! We'll respond within 24 hours.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 })
  }
}
