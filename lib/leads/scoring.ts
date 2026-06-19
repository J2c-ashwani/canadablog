export const LEAD_CONSENT_VERSION = 'funding-specialist-contact-v2-2026-06-04';

export const LEAD_CONSENT_TEXT =
  'I agree that FSI Digital and vetted funding specialists may contact me about grants, loans, tax credits, and business funding options.';

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
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gaClientId?: string;
  offlineStatus?: string;
  actualSignedValue?: string;
  // CDP & Alert Preferences Options
  isSubscribed?: boolean;
  unsubscribeToken?: string;
  engagementScore?: number;
  lastOpenedAt?: string;
  lastClickedAt?: string;
  companySize?: string;
  fundingInterests?: string[];
  readinessScore?: number;
  readinessBand?: string;
  loginToken?: string;
  subscriptionStatus?: string;
  subscriptionId?: string;
  trialStartedAt?: string;
  website?: string;
  reportPurchased?: boolean;
  reportTransactionId?: string;
  lastEmailFollowup?: string;
  leadActivity?: string;
  lastAttributionSource?: string;
  firstReportViewedAt?: string;
  assessmentPurchasedAt?: string;
  lastAlertSentAt?: string;
  lastAlertOpenedAt?: string;
  lastAlertClickedAt?: string;
  lastLoginAt?: string;
  lastDashboardViewAt?: string;
  lastPortfolioViewAt?: string;
  lastAlertClickAt?: string;
  leadTier?: string;
  subscriptionCancelledAt?: string;
  cancellationReason?: string;
  strategyReportPurchased?: boolean;
  strategyReportTransactionId?: string;
  city?: string;
  employees?: string;
  annualRevenue?: string;
  timeline?: string;
  requestType?: string;
  emailVerified?: string;
  auditCandidate?: string;
  referralSource?: string;
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

function noteValue(notes: string, label: string) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = notes.match(new RegExp(`^${escapedLabel}:\\s*(.+)$`, 'im'));
  return match?.[1]?.trim();
}

function firstMeaningfulValue(...values: Array<string | undefined>) {
  return values.find(hasValue);
}

function normalizeAmount(value?: string) {
  const normalized = String(value || '').toLowerCase();
  if (normalized.includes('over-1m') || normalized.includes('1,000,000') || normalized.includes('1m')) return 'over-1m';
  if (normalized.includes('500k') || normalized.includes('500,000')) return '500k-1m';
  if (normalized.includes('100k') || normalized.includes('100,000')) return '100k-500k';
  if (normalized.includes('25k') || normalized.includes('25,000')) return '25k-100k';
  if (normalized.includes('under')) return 'under-25k';

  const numericValue = Number(normalized.replace(/[^0-9.]/g, ''));
  if (numericValue >= 1000000) return 'over-1m';
  if (numericValue >= 500000) return '500k-1m';
  if (numericValue >= 100000) return '100k-500k';
  if (numericValue >= 25000) return '25k-100k';

  return normalized;
}

export function calculateLeadIntelligence(data: LeadCaptureData): LeadIntelligence {
  const missingFields: string[] = [];
  const source = data.source || '';
  const notes = data.additionalNotes || '';
  
  const email = data.email || '';
  const phone = data.phone || '';
  const name = data.name || '';
  const company = data.companyName || data.website || '';
  const industry = data.industry || '';
  const stage = data.businessStage || '';
  const employees = data.employees || data.companySize || '';
  const revenue = data.annualRevenue || '';
  const amountStr = data.fundingAmount || '';
  const purpose = data.fundingPurpose || '';
  const timeline = data.timeline || '';
  const isVerified = data.emailVerified === 'Yes' || data.emailVerified === 'true' || (data as any).emailVerified === true;
  
  const combined = `${source} ${notes} ${data.businessDescription || ''} ${industry} ${purpose} ${timeline}`.toLowerCase();
  
  let score = 0;

  // Base Profile Completeness
  if (hasValue(email)) score += 10;
  else missingFields.push('email');

  if (hasValue(phone)) score += 10;
  else missingFields.push('phone');

  if (hasValue(name) || hasValue(company)) score += 10;
  else missingFields.push('company/name');

  // B2B Scoring Rules
  // 1. Industry
  const indLower = industry.toLowerCase();
  if (indLower.includes('artificial intelligence') || indLower.includes('ai')) {
    score += 15;
  } else if (indLower.includes('technology') || indLower.includes('clean tech') || indLower.includes('cleantech')) {
    score += 10;
  } else if (indLower.includes('manufacturing')) {
    score += 10;
  }

  // 2. Revenue / Business Stage
  const stageLower = stage.toLowerCase();
  const revLower = revenue.toLowerCase();
  const hasHighRevenue = revLower.includes('$500k') || 
                         revLower.includes('$1m') || 
                         revLower.includes('$5m') ||
                         stageLower.includes('established') || 
                         stageLower.includes('enterprise') ||
                         stageLower.includes('100k–$1m') || 
                         stageLower.includes('$1m–$10m') || 
                         stageLower.includes('$10m+');
                         
  if (hasHighRevenue) {
    score += 10;
  }

  // 3. Employees
  const empLower = employees.toLowerCase();
  const hasEmployees = empLower.includes('6–20') || 
                       empLower.includes('21–100') || 
                       empLower.includes('100+') ||
                       empLower.includes('1-5') || 
                       parseInt(empLower.replace(/[^0-9]/g, '')) > 5;
  if (hasEmployees) {
    score += 10;
  }

  // 4. Funding Need
  const amtLower = amountStr.toLowerCase();
  const hasHugeNeed = amtLower.includes('$500k') || 
                      amtLower.includes('over $1m') || 
                      amtLower.includes('over-1m') ||
                      amtLower.includes('1m');
  const hasMediumNeed = amtLower.includes('$100k') || 
                        amtLower.includes('$250k');
                        
  if (hasHugeNeed) {
    score += 25;
  } else if (hasMediumNeed) {
    score += 15;
  } else if (amtLower.includes('$25k') || amtLower.includes('under')) {
    score += 5;
  }

  // 5. Timeline
  const timeLower = timeline.toLowerCase();
  if (timeLower.includes('immediately') || timeLower.includes('30 days')) {
    score += 10;
  }

  // 6. Email Verified
  if (isVerified) {
    score += 5;
  }

  // 7. Intent deductions
  const hasEducationalIntent = timeLower.includes('exploring') || 
                               combined.includes('just researching') || 
                               combined.includes('learning') || 
                               combined.includes('education only') ||
                               stageLower.includes('idea') ||
                               purpose.toLowerCase().includes('other') && combined.includes('student');
  if (hasEducationalIntent) {
    score -= 30;
  }

  // Source weightings
  if (includesAny(source, ['ai grant finder'])) score += 12;
  if (includesAny(source, ['grant calculator'])) score += 18;
  if (includesAny(source, ['newsletter'])) score -= 35;
  if (includesAny(source, ['pdf download'])) score -= 8;

  score = Math.max(0, Math.min(100, score));

  // Tiers (A: 85+, B: 50-84, C: <50)
  const tier: LeadTier = score >= 85 ? 'A' : score >= 50 ? 'B' : 'C';

  const estimatedValue =
    tier === 'A' ? '$50-$125 exclusive B2B lead' :
    tier === 'B' ? '$25-$60 qualified B2B lead' :
    '$0-$20 nurture/newsletter lead';

  const buyerSegment =
    includesAny(combined, ['technology', 'software', 'research', 'r&d', 'innovation']) ? 'Grant/SR&ED/IRAP consultant' :
    includesAny(combined, ['manufacturing', 'equipment', 'expansion']) ? 'Equipment finance or grant consultant' :
    includesAny(combined, ['working-capital', 'loan', 'cash flow']) ? 'Business lender or financing broker' :
    includesAny(combined, ['hiring', 'training']) ? 'Workforce funding consultant' :
    includesAny(combined, ['agriculture', 'agri']) ? 'Agriculture funding advisor' :
    'General grant consultant';

  const routing =
    tier === 'A' ? 'Readiness Score -> Consultation Strategy Audit checkout' :
    tier === 'B' ? 'Readiness Score -> Calculator results package selection' :
    'Newsletter Nurture';

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
