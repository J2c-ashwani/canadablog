import { type NextRequest, NextResponse } from "next/server";
import { applyRateLimit } from "@/lib/rate-limit";
import { encrypt } from "@/lib/crypto-helper";
import { sendOtpEmail } from "@/lib/emails/otp-email";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // Rate limiting: 10 requests per hour per IP for OTP sending
  const limitRes = await applyRateLimit(request, 10, 60 * 60 * 1000);
  if (limitRes.isLimited) return limitRes.response;

  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    // Generate a 6-digit numeric OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // Symmetrically encrypt the verification payload
    const payload = JSON.stringify({
      email,
      code: otpCode,
      expiresAt,
      attempts: 0
    });

    const encryptedToken = encrypt(payload);

    // Send the verification email using Resend
    const mailRes = await sendOtpEmail({ to: email, code: otpCode });

    if (!mailRes.success && !mailRes.skipped) {
      return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
    }

    // Return the encrypted token (verification state) to the client
    return NextResponse.json({
      success: true,
      token: encryptedToken,
      message: "Verification code sent successfully."
    }, { status: 200 });

  } catch (error) {
    console.error("[OTP Send Route] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
