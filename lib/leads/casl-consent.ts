/**
 * FSI Digital — CASL Compliance & Consent Governance Engine
 * Ensures 100% compliance with Canada's Anti-Spam Legislation (CASL) and CRTC directives.
 *
 * Requirements:
 * 1. Express consent verification for commercial electronic messages (CEMs).
 * 2. Active transactional communication governance (abandoned checkout inquiry).
 * 3. Mandatory sender identification (FSI Digital, postal address, contact info).
 * 4. Unconditional, working unsubscribe mechanism on every outbound communication.
 * 5. Strict 48-hour delivery spacing to prevent inbox harassment.
 */

export interface CaslConsentRecord {
  email: string;
  name?: string;
  companyName?: string;
  marketingConsent: boolean;
  transactionalContactAllowed: boolean;
  consentSource: string;
  consentTimestamp: string;
  unsubscribeStatus: 'ACTIVE' | 'UNSUBSCRIBED' | 'SUPPRESSED';
  unsubscribeToken?: string;
  lastContactedAt?: string;
}

export interface CaslValidationResult {
  isEligible: boolean;
  reason: string;
  consentType: 'EXPRESS_MARKETING' | 'TRANSACTIONAL_CHECKOUT_RECOVERY' | 'INELIGIBLE';
  unsubscribeToken: string;
}

export const CASL_SENDER_IDENTITY = {
  companyName: 'FSI Digital Ltd.',
  brandName: 'FSI Digital — Funding Strategy & Intelligence',
  senderEmail: 'hello@fsidigital.ca',
  physicalAddress: '100 King Street West, Suite 5600, Toronto, ON M5X 1C9, Canada',
  website: 'https://www.fsidigital.ca',
};

/**
 * Validates whether a prospect is legally eligible to receive a commercial recovery or marketing email under CASL.
 */
export function validateCaslEligibility(
  record: {
    email: string;
    name?: string;
    isSubscribed?: boolean;
    unsubscribeToken?: string;
    consentToPartnerContact?: boolean;
    leadActivity?: string;
    source?: string;
    timestamp?: string;
  },
  intendedType: 'TRANSACTIONAL_RECOVERY' | 'MARKETING_OFFER' = 'TRANSACTIONAL_RECOVERY'
): CaslValidationResult {
  const email = (record.email || '').toLowerCase().trim();

  // 1. Basic Email Syntax Validation
  if (!email || !email.includes('@') || email.length < 5) {
    return {
      isEligible: false,
      reason: 'Invalid email address syntax',
      consentType: 'INELIGIBLE',
      unsubscribeToken: '',
    };
  }

  // 2. Exclude Internal and Test Addresses
  const lowerName = (record.name || '').toLowerCase().trim();
  if (
    email.endsWith('@fsidigital.ca') ||
    email.endsWith('@example.com') ||
    email.endsWith('@test.com') ||
    email.includes('sukashwanikumar') ||
    lowerName.includes('test lead') ||
    lowerName.includes('audit test')
  ) {
    return {
      isEligible: false,
      reason: 'Internal testing address excluded from commercial outreach',
      consentType: 'INELIGIBLE',
      unsubscribeToken: '',
    };
  }

  // 3. Parse Unsubscribe & Suppression State
  let activity: Record<string, any> = {};
  try {
    activity = JSON.parse(record.leadActivity || '{}');
  } catch {
    activity = {};
  }

  const isExplicitlyUnsubscribed =
    record.isSubscribed === false ||
    activity.unsubscribedAt ||
    activity.unsubscribed === true ||
    activity.unsubscribeStatus === 'UNSUBSCRIBED';

  if (isExplicitlyUnsubscribed) {
    return {
      isEligible: false,
      reason: 'Contact has actively unsubscribed or opted out (CASL Mandatory Suppression)',
      consentType: 'INELIGIBLE',
      unsubscribeToken: record.unsubscribeToken || '',
    };
  }

  // 4. Rate-Limit: Ensure Minimum 48-Hour Gap Between Automated Provider Dispatches
  const now = Date.now();
  const lastContactMs = activity.lastContactedAt
    ? new Date(activity.lastContactedAt).getTime()
    : activity.lastEmailSentAt
    ? new Date(activity.lastEmailSentAt).getTime()
    : 0;

  if (Number.isFinite(lastContactMs) && now - lastContactMs < 48 * 60 * 60 * 1000) {
    return {
      isEligible: false,
      reason: `Recipient contacted within last 48 hours (Anti-harassment pacing). Next contact in ${Math.round(
        (48 * 60 * 60 * 1000 - (now - lastContactMs)) / (60 * 60 * 1000)
      )}h`,
      consentType: 'INELIGIBLE',
      unsubscribeToken: record.unsubscribeToken || '',
    };
  }

  const token = record.unsubscribeToken || `unsub_${Buffer.from(email).toString('hex').substring(0, 16)}`;

  // 5. Evaluate Transactional Recovery vs Marketing CEM
  if (intendedType === 'TRANSACTIONAL_RECOVERY') {
    // Under CASL & CRTC guidance: Transactional recovery is permitted when a customer
    // initiates a commercial purchase transaction (created payment intent / checkout started)
    // within the past 30 days, provided it contains clear sender identification and a working opt-out link.
    const checkoutStartedAt = activity.checkoutStartedAt || record.timestamp;
    const checkoutAgeDays = checkoutStartedAt
      ? (now - new Date(checkoutStartedAt).getTime()) / (24 * 60 * 60 * 1000)
      : 999;

    if (checkoutAgeDays > 30) {
      return {
        isEligible: false,
        reason: 'Commercial transaction intent expired (>30 days since checkout start)',
        consentType: 'INELIGIBLE',
        unsubscribeToken: token,
      };
    }

    return {
      isEligible: true,
      reason: 'Legitimate commercial transaction recovery permitted with explicit opt-out',
      consentType: 'TRANSACTIONAL_CHECKOUT_RECOVERY',
      unsubscribeToken: token,
    };
  }

  // 6. Marketing CEM requires express consent (checkbox checked or explicit opt-in)
  const hasExpressMarketingConsent =
    record.consentToPartnerContact === true ||
    activity.marketingConsent === true ||
    activity.consentGiven === true ||
    record.isSubscribed === true;

  if (!hasExpressMarketingConsent) {
    return {
      isEligible: false,
      reason: 'CASL Express Consent Missing: Contact has not explicitly opted into commercial marketing CEMs',
      consentType: 'INELIGIBLE',
      unsubscribeToken: token,
    };
  }

  return {
    isEligible: true,
    reason: 'Verified CASL Express Consent verified via recorded opt-in',
    consentType: 'EXPRESS_MARKETING',
    unsubscribeToken: token,
  };
}
