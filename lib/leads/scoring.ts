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
  potentialFundingRange?: string;
};


export type LeadIntelligence = {
  score: number;
  qualificationScore: number;
  intentScore: number;
  tier: LeadTier;
  leadType: string;
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
  const rawPurpose = data.fundingPurpose || '';
  const purpose = Array.isArray(rawPurpose) ? rawPurpose.join(', ') : String(rawPurpose);
  const timeline = data.timeline || '';
  const isVerified = data.emailVerified === 'Yes' || data.emailVerified === 'true' || (data as any).emailVerified === true;
  
  const combined = `${source} ${notes} ${data.businessDescription || ''} ${industry} ${purpose} ${timeline}`.toLowerCase();

  // 1. Determine Lead Type
  let leadType = 'Other';
  const srcLower = source.toLowerCase();
  
  if (srcLower.includes('newsletter')) {
    leadType = 'Newsletter';
  } else if (srcLower.includes('pdf download') || srcLower.includes('lead magnet') || srcLower.includes('alerts registration') || srcLower.includes('guide')) {
    leadType = 'Lead Magnet';
  } else if (srcLower.includes('calculator') || srcLower.includes('grant calculator')) {
    leadType = 'Calculator';
  } else if (srcLower.includes('ai grant finder') || srcLower.includes('ai finder')) {
    leadType = 'AI Finder';
  } else if (srcLower.includes('contact form')) {
    leadType = 'Contact Form';
  } else if (srcLower.includes('audit') || srcLower.includes('strategy session') || srcLower.includes('purchase') || srcLower.includes('checkout')) {
    leadType = 'Audit Prospect';
  }

  // 2. Newsletter Bypass (Tier D - Unqualified nurture, not scored)
  if (leadType === 'Newsletter') {
    return {
      score: 0,
      qualificationScore: 0,
      intentScore: 0,
      tier: 'D',
      leadType,
      estimatedValue: '$0-$20 nurture/newsletter lead',
      buyerSegment: 'General grant consultant',
      routing: 'Newsletter Nurture',
      consentStatus: data.consentToPartnerContact ? 'partner-consent' : hasValue(data.consentVersion) ? 'internal-only' : 'unknown',
      missingFields: [],
      qualificationNotes: 'Unqualified newsletter subscriber. Routed to nurture campaign.',
    };
  }
  
  // 3. Calculate Business Qualification Score (0-100)
  let qualificationScore = 0;

  // Base Profile Completeness
  if (hasValue(email)) qualificationScore += 10;
  else missingFields.push('email');

  // Phone is structurally absent in 'AI Grant Finder' (skip phone completeness deductions/penalties for it)
  const isPhoneOptional = leadType === 'AI Finder';
  if (hasValue(phone) || isPhoneOptional) {
    qualificationScore += 10;
  } else {
    missingFields.push('phone');
  }

  if (hasValue(name) || hasValue(company)) qualificationScore += 10;
  else missingFields.push('company/name');

  // B2B Qualification Rules
  // A. Industry
  const indLower = industry.toLowerCase();
  if (indLower.includes('artificial intelligence') || indLower.includes('ai')) {
    qualificationScore += 15;
  } else if (indLower.includes('technology') || indLower.includes('clean tech') || indLower.includes('cleantech')) {
    qualificationScore += 10;
  } else if (indLower.includes('manufacturing')) {
    qualificationScore += 10;
  }

  // B. Revenue / Business Stage
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
    qualificationScore += 10;
  }

  // C. Employees
  const empLower = employees.toLowerCase();
  const hasEmployees = empLower.includes('6–20') || 
                       empLower.includes('21–100') || 
                       empLower.includes('100+') ||
                       empLower.includes('1-5') || 
                       parseInt(empLower.replace(/[^0-9]/g, '')) > 5;
  if (hasEmployees) {
    qualificationScore += 10;
  }

  // D. Funding Need
  const amtLower = amountStr.toLowerCase();
  const hasHugeNeed = amtLower.includes('$500k') || 
                      amtLower.includes('over $1m') || 
                      amtLower.includes('over-1m') ||
                      amtLower.includes('1m');
  const hasMediumNeed = amtLower.includes('$100k') || 
                        amtLower.includes('$250k');
                        
  if (hasHugeNeed) {
    qualificationScore += 25;
  } else if (hasMediumNeed) {
    qualificationScore += 15;
  } else if (amtLower.includes('$25k') || amtLower.includes('under')) {
    qualificationScore += 5;
  }

  // E. Timeline
  const timeLower = timeline.toLowerCase();
  if (timeLower.includes('immediately') || timeLower.includes('30 days')) {
    qualificationScore += 10;
  }

  // F. Email Verified
  if (isVerified) {
    qualificationScore += 5;
  }

  // G. Intent deductions
  const hasEducationalIntent = timeLower.includes('exploring') || 
                               combined.includes('just researching') || 
                               combined.includes('learning') || 
                               combined.includes('education only') ||
                               stageLower.includes('idea') ||
                               (purpose.toLowerCase().includes('other') && combined.includes('student'));
  if (hasEducationalIntent) {
    qualificationScore -= 30;
  }

  qualificationScore = Math.max(0, Math.min(100, qualificationScore));

  // 4. Calculate Intent Score (0-100)
  let intentScore = 0;

  // Safe-parse lead activity JSON
  let activity: any = {};
  try {
    if (data.leadActivity && data.leadActivity !== 'N/A' && data.leadActivity !== '{}') {
      activity = JSON.parse(data.leadActivity);
    }
  } catch (e) {
    // Ignore JSON parse errors
  }

  // Visited Calculator: +10
  if (activity.visitedCalculator || activity.calculatorStartedAt || leadType === 'Calculator' || leadType === 'AI Finder') {
    intentScore += 10;
  }
  // Completed Calculator: +20
  if (activity.completedCalculator || activity.calculatorCompletedAt) {
    intentScore += 20;
  }
  // Contact Form submissions represent direct high-intent inquiries: +25
  if (leadType === 'Contact Form') {
    intentScore += 25;
  }
  // AI Finder submissions represent direct high-intent inquiries: +20
  if (leadType === 'AI Finder') {
    intentScore += 20;
  }
  // Selected $79 (Complete Bundle): +25
  if (activity.selected79 || activity.productSelected === 'funding-bundle' || data.productId === 'funding-bundle') {
    intentScore += 25;
  }
  // Opened PayPal (Checkout Started): +30
  if (activity.openedPaypal || activity.checkoutStartedAt) {
    intentScore += 30;
  }
  // Downloaded Toolkit: +15
  if (activity.downloadedToolkit || activity.toolkitDownloaded || data.productId === 'funding-toolkit') {
    intentScore += 15;
  }
  // Booked Call: +50
  if (activity.bookedCall || activity.callBooked || data.offlineStatus === 'Booked Audit') {
    intentScore += 50;
  }

  intentScore = Math.max(0, Math.min(100, intentScore));

  // Combined score (capped at 100)
  const score = Math.max(0, Math.min(100, qualificationScore + intentScore));

  // Multi-dimensional Tiers (A: Qual >= 60 && Intent >= 20, B: Qual >= 40 && Intent >= 10, C: Fallback, D: Newsletter)
  const qualThreshold = parseInt(process.env.TIER_A_THRESHOLD || '60', 10);
  
  let tier: LeadTier = 'C';
  if (qualificationScore >= qualThreshold && intentScore >= 20) {
    tier = 'A';
  } else if (qualificationScore >= 40 && intentScore >= 10) {
    tier = 'B';
  }

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
    qualificationScore,
    intentScore,
    tier,
    leadType,
    estimatedValue,
    buyerSegment,
    routing,
    consentStatus,
    missingFields,
    qualificationNotes: `Tier ${tier} lead scored ${score}/100. ${buyerSegment}. ${routing}.`,
  };
}
