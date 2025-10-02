import { type NextRequest, NextResponse } from "next/server"
import { processGrantFinderRequest, type GrantFinderRequest } from "@/lib/ai-grant-matcher"

export async function POST(request: NextRequest) {
  try {
    const body: GrantFinderRequest = await request.json()

    // Validate required fields
    if (!body.country || !body.industry || !body.businessStage || !body.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Process the grant finder request
    const results = await processGrantFinderRequest(body)

    // In a real implementation, you might also:
    // 1. Save the request to a database
    // 2. Send an email with the results
    // 3. Track analytics

    return NextResponse.json(results)
  } catch (error) {
    console.error("Grant finder error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
