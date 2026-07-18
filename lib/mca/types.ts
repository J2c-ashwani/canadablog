// lib/mca/types.ts
// MCA Platform — Core Type Definitions

export type PriorityBand = 'A' | 'B' | 'C' | 'D';

export type ApplicationStatus =
  | 'New'
  | 'Documents Received'
  | 'Under Review'
  | 'Submitted to Partner'
  | 'Partner Contacted Applicant'
  | 'Approved'
  | 'Declined'
  | 'Funded'
  | 'Closed';

export type PartnerOutcome =
  | 'Submitted'
  | 'Contacted'
  | 'Approved'
  | 'Declined'
  | 'Funded';

export type DeliveryMethod = 'email' | 'webhook';

export interface PartnerRoutingFilter {
  industries: string[] | null;   // null = all industries
  provinces: string[] | null;    // null = all provinces
  minBand: PriorityBand;         // minimum priority band to route
  minMonthlyRevenue: number;     // minimum monthly revenue in CAD
}

export interface PartnerRoutingRule {
  partnerId: string;
  name: string;
  active: boolean;
  priority: number;              // lower = higher priority
  filters: PartnerRoutingFilter;
  deliveryMethod: DeliveryMethod;
  webhookUrl?: string;
  contactEmail?: string;
}

export interface MCAApplicationInput {
  // Step 1 — Business Identity
  legalBusinessName: string;
  tradeName?: string;
  businessRegistrationNumber?: string;
  businessAddress: string;
  city: string;
  province: string;
  postalCode: string;
  ownerName: string;
  email: string;
  phone: string;
  website?: string;

  // Step 2 — Financial Profile
  industry: string;
  yearsInBusiness: number;
  employees?: number;
  monthlyRevenue: number;
  fundingAmount: number;
  fundingPurpose: string;

  // Step 3 — Documents + Consent
  storageFileUrls: string[];
  fileCount: number;
  consentToShare: boolean;
  consent: boolean;

  // Attribution (auto)
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  ga4ClientId?: string;
  landingPage: string;
  referrer?: string;
}

export interface MCAApplication extends MCAApplicationInput {
  applicationId: string;
  timestamp: string;
  priorityScore: number;
  priorityBand: PriorityBand;
  applicationStatus: ApplicationStatus;
  priorityProcessing: boolean;
  priorityPaymentId?: string;
  partnerOutcome?: PartnerOutcome;
  revenue: number;
  notes?: string;
  recoveryToken?: string;
  priorityRecoveryStatus?: 'NONE' | 'ACTIVE' | 'EMAIL_1_SENT' | 'EMAIL_2_SENT' | 'EMAIL_3_SENT' | 'EMAIL_4_SENT' | 'EMAIL_5_SENT' | 'COMPLETED' | 'CANCELLED';
  recoveryEmail1Sent?: string;
  recoveryEmail2Sent?: string;
  recoveryEmail3Sent?: string;
  recoveryEmail4Sent?: string;
  recoveryEmail5Sent?: string;
  recoveryClicked?: boolean;
  lastRecoveryEmail?: string;
  recoveryStage?: 'NONE' | 'EMAIL_1' | 'EMAIL_2' | 'EMAIL_3' | 'EMAIL_4' | 'EMAIL_5' | 'PURCHASED' | 'COMPLETED' | 'CANCELLED';
  recoveryPurchased?: boolean;
}

export interface MCAPriorityOrder {
  timestamp: string;
  applicationId: string;
  email: string;
  paypalOrderId: string;
  amountCAD: number;
  status: 'Pending' | 'Captured' | 'Refunded';
  fulfilmentStatus: 'Queued' | 'In Review' | 'Completed';
  specialistAssigned?: string;
  completedAt?: string;
}

export interface MCAActivityLog {
  timestamp: string;
  applicationId: string;
  email: string;
  event: string;
  metadata?: Record<string, unknown>;
}

export interface FileUploadResult {
  storageUrl: string;
  fileName: string;
  sizeBytes: number;
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  matchType?: 'email' | 'phone' | 'businessName';
  existingApplicationId?: string;
}
