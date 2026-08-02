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

    const errData = await res.json().catch(() => ({}));
    return NextResponse.json({
      error: "LinkedIn API error",
      status: res.status,
      details: errData,
      instructions: "Check if your LinkedIn access token has 'openid profile' or 'w_member_social' permissions."
    }, { status: 400 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
