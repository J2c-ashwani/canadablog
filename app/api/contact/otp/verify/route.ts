import { type NextRequest, NextResponse } from "next/server";
import { decrypt, encrypt } from "@/lib/crypto-helper";
import { updateLeadInSheet } from "@/lib/google-sheets";
import { applyRateLimit } from "@/lib/rate-limit";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // Rate limiting: 20 verification attempts per hour per IP
  const limitRes = await applyRateLimit(request, 20, 60 * 60 * 1000);
  if (limitRes.isLimited) return limitRes.response;

  try {
    const { email, code, token } = await request.json();

    if (!email || !code || !token) {
      return NextResponse.json({ error: "Email, verification code, and state token are required" }, { status: 400 });
    }

    // Decrypt the verification token
    const decryptedText = decrypt(token);
    if (!decryptedText) {
      return NextResponse.json({ error: "Invalid state token. Please request a new code." }, { status: 400 });
    }

    const payload = JSON.parse(decryptedText);

    // Validate email matching
    if (payload.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json({ error: "Email mismatch. Please request a new code." }, { status: 400 });
    }

    // Check expiry (10 minutes)
    if (Date.now() > payload.expiresAt) {
      return NextResponse.json({ error: "Verification code expired. Please request a new code." }, { status: 400 });
    }

    // Check incorrect code attempts
    if (payload.code !== code.trim()) {
      const nextAttempts = payload.attempts + 1;
      if (nextAttempts >= 3) {
        return NextResponse.json({
          error: "Maximum incorrect attempts exceeded. Please request a new verification code.",
          maxAttemptsReached: true
        }, { status: 400 });
      }

      // Re-encrypt the token with incremented attempt count
      const updatedPayload = JSON.stringify({
        ...payload,
        attempts: nextAttempts
      });
      const updatedToken = encrypt(updatedPayload);

      return NextResponse.json({
        success: false,
        error: `Incorrect verification code. ${3 - nextAttempts} attempts remaining.`,
        token: updatedToken
      }, { status: 200 }); // Return 200 with success: false to let client try again with the new token
    }

    // OTP matches! Update the lead verification status in Google Sheets database
    await updateLeadInSheet(email, { emailVerified: "Yes" }).catch(err => {
      console.error("[OTP Verify Route] Failed to update lead status in Sheets:", err);
    });

    // Generate a cryptographically signed verified email signature (valid for form submission confirmation)
    const verifiedSignaturePayload = JSON.stringify({
      email: email.toLowerCase(),
      verifiedAt: Date.now()
    });
    const verifiedSignature = encrypt(verifiedSignaturePayload);

    return NextResponse.json({
      success: true,
      verifiedSignature,
      message: "Email successfully verified."
    }, { status: 200 });

  } catch (error) {
    console.error("[OTP Verify Route] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
