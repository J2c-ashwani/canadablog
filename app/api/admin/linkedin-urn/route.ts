import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const token = process.env.LINKEDIN_ACCESS_TOKEN?.trim() || process.env.LINKEDIN_CLIENT_ID?.trim();
    if (!token) {
      return NextResponse.json({
        error: "LINKEDIN_ACCESS_TOKEN is missing in environment variables.",
        instructions: "Add LINKEDIN_ACCESS_TOKEN to Vercel environment variables first."
      }, { status: 400 });
    }

    // Attempt 1: OpenID /userinfo endpoint
    let res = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      const data = await res.json();
      const sub = data.sub; // LinkedIn member ID
      const urn = `urn:li:person:${sub}`;
      return NextResponse.json({
        success: true,
        method: "userinfo",
        name: `${data.given_name || ''} ${data.family_name || ''}`.trim(),
        email: data.email,
        linkedinPersonUrn: urn,
        instructions: `Copy '${urn}' and add it as LINKEDIN_PERSON_URN in Vercel Environment Variables.`
      });
    }

    // Attempt 2: Legacy /v2/me endpoint
    res = await fetch("https://api.linkedin.com/v2/me", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      const data = await res.json();
      const id = data.id;
      const urn = `urn:li:person:${id}`;
      return NextResponse.json({
        success: true,
        method: "me",
        linkedinPersonUrn: urn,
        instructions: `Copy '${urn}' and add it as LINKEDIN_PERSON_URN in Vercel Environment Variables.`
      });
    }

    // Attempt 3: Try JWT payload decoding if token is a structured JWT
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payloadJson = Buffer.from(parts[1], 'base64').toString('utf-8');
        const payload = JSON.parse(payloadJson);
        const sub = payload.sub || payload.member_id || payload.user_id;
        if (sub) {
          const urn = sub.startsWith('urn:li:') ? sub : `urn:li:person:${sub}`;
          return NextResponse.json({
            success: true,
            method: "jwt_token_decode",
            linkedinPersonUrn: urn,
            instructions: `Copy '${urn}' and set it as LINKEDIN_PERSON_URN in Vercel environment variables.`
          });
        }
      }
    } catch {
      // ignore token decode failure
    }

    const errData = await res.json().catch(() => ({}));
    return NextResponse.json({
      error: "LinkedIn API token lacks profile-read scope (w_member_social only)",
      status: res.status,
      details: errData,
      manualInstructions: [
        "Your token has posting permissions (w_member_social) but LinkedIn requires finding your URN manually:",
        "1. Open LinkedIn.com in Chrome and go to your Profile page.",
        "2. Right-click anywhere -> 'View Page Source' (or press Cmd+Option+U on Mac).",
        "3. Press Cmd+F and search for: 'urn:li:member:' or 'urn:li:fsd_profile:'",
        "4. Copy the number/ID (e.g. 876543210 or ACoAAA...)",
        "5. Your LINKEDIN_PERSON_URN is: 'urn:li:person:YOUR_ID'",
        "6. Add LINKEDIN_PERSON_URN in Vercel Environment Variables and redeploy."
      ]
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
