import crypto from 'crypto';

export interface AdvertisingPackage {
  id: 'done-for-you' | 'client-supplied' | 'resource-insertion' | 'agency-bulk';
  name: string;
  tagline: string;
  priceUsd: number;
  priceDisplay: string;
  wordCount: string;
  turnaround: string;
  revisionRounds: number;
  maxLinks: number;
  directCheckout: boolean;
  featured?: boolean;
  inclusions: string[];
  description: string;
}

export const ADVERTISING_PACKAGES: Record<string, AdvertisingPackage> = {
  'done-for-you': {
    id: 'done-for-you',
    name: 'Done-for-You Sponsored Article',
    tagline: 'Full-service research, writing, editorial review, and guaranteed placement.',
    priceUsd: 225,
    priceDisplay: '$225 USD',
    wordCount: '1,200 – 1,500 words',
    turnaround: '3 – 5 business days',
    revisionRounds: 1,
    maxLinks: 2,
    directCheckout: true,
    featured: true,
    description: 'Our specialized editorial team researches and crafts an authoritative article tailored to business funding, technology, and growth, seamlessly integrating your brand and solution.',
    inclusions: [
      'Comprehensive research & topic framing aligned with FSI Digital publishing pillars',
      '1,200 – 1,500 words of original, expert-written editorial copy',
      'Up to 2 contextual outbound links (marked rel="sponsored")',
      'Custom high-resolution editorial header graphic & layout formatting',
      '1 structured revision round included prior to publication',
      'Initial draft delivered in 3–5 business days',
      'Active hosting guaranteed for at least 12 months',
      'Transparent "Sponsored Article" / "Paid Partnership" disclosure',
    ],
  },
  'client-supplied': {
    id: 'client-supplied',
    name: 'Client-Supplied Sponsored Article',
    tagline: 'Submit your ready draft for editorial fact-check, copyedit, and publication.',
    priceUsd: 125,
    priceDisplay: '$125 USD (Starting)',
    wordCount: '1,000 – 2,000 words',
    turnaround: '2 – 3 business days',
    revisionRounds: 1,
    maxLinks: 2,
    directCheckout: false,
    description: 'You supply the completed draft. Our editorial team reviews for clarity, voice, factual accuracy, and compliance before publication.',
    inclusions: [
      'Full editorial review & copyedit by FSI Digital editors',
      'Fact-checking and formatting optimization for readability',
      'Up to 2 contextual outbound links (marked rel="sponsored")',
      'Publication within 2–3 business days of editorial approval',
      'Active hosting guaranteed for at least 12 months',
      'Transparent sponsored content disclosure',
    ],
  },
  'resource-insertion': {
    id: 'resource-insertion',
    name: 'Resource Insertion / Article Sponsorship',
    tagline: 'Contextual citation or product spotlight inside existing high-ranking articles.',
    priceUsd: 100,
    priceDisplay: '$100 – $150 USD (Starting from $100)',
    wordCount: '50 – 150 words contextual update',
    turnaround: '2 business days',
    revisionRounds: 1,
    maxLinks: 1,
    directCheckout: false,
    description: 'Place your SaaS tool, professional service, or research resource inside an existing, topically aligned article covering business funding and growth.',
    inclusions: [
      'Editorial integration into an established, contextually relevant guide',
      '1 contextual outbound link (marked rel="sponsored")',
      'Editorial review to ensure topical fit and reader value',
      'Rapid turnaround within 48 hours of editorial sign-off',
      'Active placement guaranteed for at least 12 months',
    ],
  },
  'agency-bulk': {
    id: 'agency-bulk',
    name: 'Agency & Multi-Article Publishing',
    tagline: 'Dedicated workflow and volume discounts for PR firms and marketing agencies.',
    priceUsd: 0,
    priceDisplay: 'Custom Quote',
    wordCount: 'Customizable',
    turnaround: 'Priority SLA',
    revisionRounds: 2,
    maxLinks: 2,
    directCheckout: false,
    description: 'Designed for marketing agencies, content syndication partners, and PR professionals managing multiple client placements per month.',
    inclusions: [
      'Volume-based discounted tier pricing',
      'Dedicated editorial contact and priority review SLA',
      'Flexible mix of done-for-you writing and client-supplied drafts',
      'Custom publishing calendar & monthly invoicing options',
      'Detailed monthly placement and verification reporting',
    ],
  },
};

export const ACCEPTED_NICHES = [
  {
    title: 'Small Business Funding & Capital',
    description: 'Debt financing, venture capital, angel investment, revenue-based financing, working capital solutions, and commercial lending.',
    icon: 'Landmark',
  },
  {
    title: 'Government Grants & Tax Incentives',
    description: 'Federal and provincial/state grant programmes, R&D tax credits (SR&ED, SBIR, STTR), cleantech subsidies, and innovation funds.',
    icon: 'Award',
  },
  {
    title: 'Entrepreneurship & Scaling',
    description: 'Bootstrapping, corporate governance, fractional leadership, legal structuring, mergers & acquisitions, and operational scaling.',
    icon: 'TrendingUp',
  },
  {
    title: 'Research, Development & DeepTech',
    description: 'Artificial intelligence, robotics, biotech, aerospace, advanced manufacturing, quantum computing, and intellectual property strategy.',
    icon: 'Cpu',
  },
  {
    title: 'B2B Software & Enterprise Tools',
    description: 'Fintech, ERP, CRM, data analytics, cybersecurity, compliance automation, payroll, and developer infrastructure.',
    icon: 'Code2',
  },
  {
    title: 'Professional & Advisory Services',
    description: 'Corporate accounting, grant writing, fractional CFO advisory, IP law, immigration for founders, and management consulting.',
    icon: 'Briefcase',
  },
];

export const PROHIBITED_NICHES = [
  'Casino, sports betting, gambling affiliate networks, and lottery systems',
  'Adult products, dating platforms, and sexually explicit content',
  'Fraudulent financial products, get-rich-quick schemes, and deceptive crypto tokens',
  'Predatory payday loans, high-interest consumer debt, and unregulated credit repair',
  'Unverified medical claims, miracle cures, and non-compliant health supplements',
  'Plagiarized, scraped, spun, or automated low-quality link-farm articles',
  'Private Blog Networks (PBNs) or manipulative search rank schemes',
  'Weaponry, illicit substances, and unregulated controlled chemicals',
];

export const PUBLISHING_STANDARDS = {
  minWordCount: 1000,
  maxWordCount: 2500,
  maxOutboundSponsoredLinks: 2,
  linkAttribute: 'rel="sponsored"',
  turnaroundDaysDfy: '3 to 5 business days',
  turnaroundDaysSupplied: '2 to 3 business days',
  revisionRoundsIncluded: 1,
  guaranteedHostingMonths: 12,
  supportEmail: 'ashwani@fsidigital.ca',
  billingCurrency: 'USD',
  dfyAmountUsd: '225.00',
};

export const REFUND_POLICY = {
  unpaidInquiries: 'No financial transaction. Non-compliant or misaligned proposals are declined within 1 business day with zero cost or obligation.',
  paidOrdersPreDrafting: '100% full refund ($225.00 USD) processed via PayPal within 3–5 business days if a submitted brief cannot meet editorial guidelines prior to the start of drafting.',
  paidOrdersPostDrafting: '50% partial refund if cancellation is requested after the initial draft has been created, covering writing labor, provided live publication has not been authorized.',
  postPublication: 'Once final editorial sign-off is completed and the article is published live, hosting is guaranteed for at least 12 months and sales are final.',
};

export type OrderStatus =
  | 'paid'
  | 'brief_submitted'
  | 'in_production'
  | 'draft_ready'
  | 'revision_requested'
  | 'approved'
  | 'published'
  | 'refunded';

export interface PublishingInquiry {
  inquiryId: string;
  createdAt: string;
  name: string;
  email: string;
  companyName: string;
  website: string;
  packageInterest: string;
  targetAudience?: string;
  topicAngle: string;
  destinationUrl?: string;
  timeline?: string;
  budget?: string;
  notes?: string;
  honeypot?: string;
  score?: number;
  status: 'new' | 'contacted' | 'proposal_sent' | 'closed_won' | 'closed_lost';
}

export interface PublishingBrief {
  // Section A: Company & Brand
  legalCompanyName: string;
  brandName: string;
  companyOverview: string;
  targetCustomers: string;
  valueProposition: string;

  // Section B: Goals & Core Message
  primaryGoal: 'brand_awareness' | 'product_launch' | 'thought_leadership' | 'case_study' | 'lead_generation';
  coreMessage: string;
  targetKeywords: string;
  referenceArticles?: string;

  // Section C: Article Specifications
  audienceSeniority: string;
  suggestedHeadlines?: string;
  keyPointsToInclude: string;
  voiceAndTone: 'authoritative' | 'practical_how_to' | 'executive_analytical' | 'conversational_expert';

  // Section D: Links & CTAs
  primaryUrl: string;
  primaryAnchorText: string;
  secondaryUrl?: string;
  secondaryAnchorText?: string;
  readerCtaText: string;

  // Section E: Editorial Agreement
  agreesToEditorialPolicy: boolean;
  agreesToDisclosureRequirement: boolean;
  notesForEditorialTeam?: string;

  submittedAt: string;
}

export interface PublishingOrder {
  orderId: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  packageId: string;
  packageName: string;
  amountUsd: string;
  currency: 'USD';
  buyerName: string;
  buyerEmail: string;
  companyName: string;
  website: string;
  token: string;
  brief?: PublishingBrief;
  draftTitle?: string;
  draftContent?: string;
  draftDeliveredAt?: string;
  revisionNotes?: string;
  revisionRequestedAt?: string;
  approvedAt?: string;
  publishedUrl?: string;
  publishedAt?: string;
}

/**
 * Creates an HMAC SHA-256 token scoped to an order ID and email.
 * Prevents unauthorized access or tampering with post-purchase briefs and reviews.
 */
export function generateOrderAccessToken(orderId: string, email: string): string {
  const secret = process.env.SESSION_TOKEN_SALT || process.env.OTP_SECRET || 'fsi_digital_publishing_secret_salt_2026';
  return crypto
    .createHmac('sha256', secret)
    .update(`${orderId.trim()}:${email.trim().toLowerCase()}`)
    .digest('hex');
}

/**
 * Validates the cryptographic token for an order.
 */
export function verifyOrderAccessToken(orderId: string, email: string, token: string): boolean {
  if (!orderId || !email || !token) return false;
  const expectedToken = generateOrderAccessToken(orderId, email);
  try {
    return crypto.timingSafeEqual(Buffer.from(token, 'hex'), Buffer.from(expectedToken, 'hex'));
  } catch {
    return false;
  }
}
