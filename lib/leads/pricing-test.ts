import crypto from "crypto";

export interface PricingGroupInfo {
  price: number;
  group: "Control" | "A" | "B";
}

/**
 * Calculates a deterministic pricing group and price for reactivation leads.
 * Splits traffic equally (approx 33.3% each) across 3 arms:
 * - Control: $199
 * - Test Group A: $99
 * - Test Group B: $49
 */
export function getReactivationPriceForEmail(email: string): PricingGroupInfo {
  if (!email) {
    return { price: 49, group: "B" }; // Default fallback
  }

  const emailNormalized = email.toLowerCase().trim();
  const emailHash = crypto.createHash("sha256").update(emailNormalized + "fsi-pricing-salt-2026").digest("hex");
  const hashVal = parseInt(emailHash.slice(0, 8), 16) % 99; // 0 to 98

  if (hashVal < 33) {
    return { price: 199, group: "Control" };
  } else if (hashVal < 66) {
    return { price: 99, group: "A" };
  } else {
    return { price: 49, group: "B" };
  }
}
