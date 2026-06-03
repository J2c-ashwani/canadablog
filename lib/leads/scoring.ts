export const LEAD_CONSENT_VERSION = 'partner-contact-v1-2026-06-04';

export const LEAD_CONSENT_TEXT =
  'I agree that FSI Digital and selected funding partners may contact me about grants, loans, tax credits, and business funding options.';

export type LeadTier = 'A' | 'B' | 'C' | 'D';

export type LeadCaptureData = {
  source: string;
  timestamp: string;
  email: string;
  name?: string;
  companyName?: string;
  country?: string;
  state?: string;
  industry?: string;
  businessStage?: string;
  fundingAmount?: string;
  fundingPurpose?: string;
  businessDescription?: string;
  phone?: string;
  additionalNotes?: string;
  consentToPartnerContact?: boolean;
  consentText?: string;
  consentVersion?: string;
  pagePath?: string;
  ipAddress?: string;
  userAgent?: string;
};

export type LeadIntelligence = {
  score: number;
  tier: LeadTier;
  estimatedValue: string;
  buyerSegment: string;
  routing: string;
  consentStatus: 'partner-consent' | 'internal-only' | 'unknown';
  missingFields: string[];
  qualificationNotes: string;
};

function hasValue(value?: string) {
  const normalized = String(value || '').trim().toLowerCase();
  return normalized.length > 0 && normalized !== 'n/a' && normalized !== 'not provided';
}

function includesAny(value: string | undefined, terms: string[]) {
  const normalized = String(value || '').toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

function normalizeAmount(value?: string) {
  const normalized = String(value || '').toLowerCase();
  if (normalized.includes('over-1m') || normalized.includes('1,000,000') || normalized.includes('1m')) return 'over-1m';
  if (normalized.includes('500k') || normalized.includes('500,000')) return '500k-1m';
  if (normalized.includes('100k') || normalized.includes('100,000')) return '100k-500k';
  if (normalized.includes('25k') || normalized.includes('25,000')) return '25k-100k';
  if (normalized.includes('under')) return 'under-25k';
  return normalized;
}

export function calculateLeadIntelligence(data: LeadCaptureData): LeadIntelligence {
  const missingFields: string[] = [];
  const source = data.source || '';
  const notes = data.additionalNotes || '';
  const combined = `${source} ${notes} ${data.businessDescription || ''}`;
  const amount = normalizeAmount(data.fundingAmount || notes);
  let score = 0;

  if (hasValue(data.email)) score += 10;
  else missingFields.push('email');

  if (hasValue(data.phone)) score += 20;
  else missingFields.push('phone');

  if (hasValue(data.companyName) || hasValue(data.name)) score += 12;
  else missingFields.push('company/name');

  if (hasValue(data.country)) score += 6;
  else missingFields.push('country');

  if (hasValue(data.state)) score += 7;
  else missingFields.push('state/province');

  if (hasValue(data.industry)) score += 8;
  else missingFields.push('industry');

  if (hasValue(data.businessStage)) score += 8;
  if (includesAny(data.businessStage || notes, ['100k', '500k', '1m', 'growth', 'established', 'over'])) score += 8;
  if (includesAny(data.businessStage || notes, ['pre-revenue', 'idea'])) score -= 5;

  if (amount === '25k-100k') score += 8;
  if (amount === '100k-500k') score += 12;
  if (amount === '500k-1m' || amount === 'over-1m') score += 15;

  if (hasValue(data.fundingPurpose)) score += 7;
  if (includesAny(data.fundingPurpose || notes, ['research', 'equipment', 'expansion', 'hiring', 'training'])) score += 8;
  if (includesAny(data.fundingPurpose || notes, ['working-capital', 'marketing'])) score += 2;

  if (hasValue(data.businessDescription)) score += data.businessDescription!.trim().length >= 40 ? 10 : 4;

  if (includesAny(source, ['ai grant finder', 'grant calculator'])) score += 12;
  if (includesAny(source, ['newsletter'])) score -= 35;
  if (includesAny(source, ['pdf download'])) score -= 8;

  if (data.consentToPartnerContact) score += 8;

  score = Math.max(0, Math.min(100, score));

  const tier: LeadTier = score >= 75 ? 'A' : score >= 55 ? 'B' : score >= 35 ? 'C' : 'D';
  const estimatedValue =
    tier === 'A' ? '$50-$125 exclusive lead' :
    tier === 'B' ? '$25-$60 qualified lead' :
    tier === 'C' ? '$5-$20 nurture lead' :
    '$0-$5 newsletter/raw lead';

  const buyerSegment =
    includesAny(combined, ['technology', 'software', 'research', 'r&d', 'innovation']) ? 'Grant/SR&ED/IRAP consultant' :
    includesAny(combined, ['manufacturing', 'equipment', 'expansion']) ? 'Equipment finance or grant consultant' :
    includesAny(combined, ['working-capital', 'loan', 'cash flow']) ? 'Business lender or financing broker' :
    includesAny(combined, ['hiring', 'training']) ? 'Workforce funding consultant' :
    includesAny(combined, ['agriculture', 'agri']) ? 'Agriculture funding advisor' :
    'General grant consultant';

  const routing =
    tier === 'A' && data.consentToPartnerContact ? 'Send to exclusive partner within 5 minutes' :
    tier === 'A' ? 'Internal follow-up first; request partner consent before resale' :
    tier === 'B' && data.consentToPartnerContact ? 'Offer to partner pool or nurture sequence' :
    tier === 'B' ? 'Internal nurture; request missing fields' :
    tier === 'C' ? 'Email nurture and retargeting audience' :
    'Newsletter only';

  const consentStatus = data.consentToPartnerContact
    ? 'partner-consent'
    : hasValue(data.consentVersion) ? 'internal-only' : 'unknown';

  return {
    score,
    tier,
    estimatedValue,
    buyerSegment,
    routing,
    consentStatus,
    missingFields,
    qualificationNotes: `Tier ${tier} lead scored ${score}/100. ${buyerSegment}. ${routing}.`,
  };
}
