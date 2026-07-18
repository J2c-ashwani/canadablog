// app/api/mca/apply/route.ts
// MCA Application Submission API
// 1. Duplicate detection
// 2. Validate all required fields
// 3. Calculate Priority Score (internal only)
// 4. Write to MCA Applications tab
// 5. Log to MCA Activity Log
// 6. Route to matching partners (configurable)

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculatePriorityScore } from '@/lib/mca/priority-score';
import {
  appendMCAApplication,
  appendMCAActivityLog,
  appendMCAPartnerSubmission,
  checkDuplicateApplication,
  generateApplicationId,
} from '@/lib/mca/sheets';
import { getMatchingPartners } from '@/lib/mca/partner-routing.config';
import type { MCAApplication } from '@/lib/mca/types';
import { applyRateLimit } from '@/lib/rate-limit';

// ─── Validation Schema ────────────────────────────────────────────────────────

const applicationSchema = z.object({
  // Step 1 — Business Identity
  legalBusinessName: z.string().min(2, 'Legal business name is required'),
  tradeName: z.string().optional(),
  businessRegistrationNumber: z.string().optional(),
  businessAddress: z.string().min(5, 'Business address is required'),
  city: z.string().min(2, 'City is required'),
  province: z.string().min(2, 'Province is required'),
  postalCode: z.string().min(5, 'Postal code is required'),
  ownerName: z.string().min(2, 'Owner name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  website: z.string().optional(),

  // Step 2 — Financial Profile
  industry: z.string().min(2, 'Industry is required'),
  yearsInBusiness: z.number().min(0).max(100),
  employees: z.number().min(0).optional(),
  monthlyRevenue: z.number().min(0, 'Monthly revenue is required'),
  fundingAmount: z.number().min(1000, 'Funding amount must be at least $1,000'),
  fundingPurpose: z.string().min(5, 'Funding purpose is required'),

  // Step 3 — Documents + Consent
  storageFileUrls: z.array(z.string().url()).min(1, 'Bank statements are required'),
  fileCount: z.number().min(1),
  consentToShare: z.literal(true, {
    errorMap: () => ({ message: 'Authorization to share documents is required' }),
  }),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Agreement to terms is required' }),
  }),

  // Attribution
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  ga4ClientId: z.string().optional(),
  landingPage: z.string().min(1),
  referrer: z.string().optional(),
});

// ─── POST Handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Rate limiting: 5 application submissions per hour per IP
  if (process.env.NODE_ENV !== 'development') {
    const limitRes = await applyRateLimit(request, 5, 60 * 60 * 1000);
    if (limitRes.isLimited) return limitRes.response as NextResponse;
  }

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    // Validate
    const parsed = applicationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          issues: parsed.error.issues.map((i) => ({
            field: i.path.join('.'),
            message: i.message,
          })),
        },
        { status: 422 }
      );
    }

    const data = parsed.data;

    // ─── Duplicate Detection ─────────────────────────────────────────────────
    const duplicate = await checkDuplicateApplication(
      data.email,
      data.phone,
      data.legalBusinessName
    );

    if (duplicate.isDuplicate) {
      // Log the duplicate attempt
      await appendMCAActivityLog({
        timestamp: new Date().toISOString(),
        applicationId: duplicate.existingApplicationId ?? 'unknown',
        email: data.email,
        event: 'duplicate_application_attempt',
        metadata: {
          matchType: duplicate.matchType,
          existingId: duplicate.existingApplicationId,
        },
      }).catch(() => {}); // non-blocking

      return NextResponse.json(
        {
          duplicate: true,
          message:
            'We found an existing application associated with your business. ' +
            'If you would like to update your application or check its status, ' +
            'please contact us at info@fsidigital.ca with your details.',
          existingApplicationId: duplicate.existingApplicationId,
        },
        { status: 409 }
      );
    }

    // ─── Priority Score ───────────────────────────────────────────────────────
    const { priorityScore, priorityBand } = calculatePriorityScore({
      monthlyRevenue: data.monthlyRevenue,
      yearsInBusiness: data.yearsInBusiness,
      fundingAmount: data.fundingAmount,
      industry: data.industry,
      province: data.province,
      website: data.website,
      consent: data.consent,
    });

    // ─── Build Application Record ─────────────────────────────────────────────
    const applicationId = generateApplicationId();
    const timestamp = new Date().toISOString();

    const application: MCAApplication = {
      ...data,
      applicationId,
      timestamp,
      priorityScore,
      priorityBand,
      applicationStatus: 'New',
      priorityProcessing: false,
      revenue: 0,
    };

    // ─── Write to Google Sheets ───────────────────────────────────────────────
    await appendMCAApplication(application);

    // ─── Activity Log: Submission ─────────────────────────────────────────────
    await appendMCAActivityLog({
      timestamp,
      applicationId,
      email: data.email,
      event: 'application_submitted',
      metadata: {
        band: priorityBand,
        score: priorityScore,
        industry: data.industry,
        province: data.province,
        monthlyRevenue: data.monthlyRevenue,
        fundingAmount: data.fundingAmount,
        fileCount: data.fileCount,
        landingPage: data.landingPage,
        utmSource: data.utmSource,
      },
    }).catch(() => {}); // non-blocking

    // ─── Partner Routing ──────────────────────────────────────────────────────
    const matchingPartners = getMatchingPartners(
      data.industry,
      data.province,
      priorityBand,
      data.monthlyRevenue
    );

    // Route to all matching partners (fire-and-forget, non-blocking)
    Promise.allSettled(
      matchingPartners.map(async (partner) => {
        if (partner.deliveryMethod === 'email' && partner.contactEmail) {
          // Email routing is handled by internal notification system
          // (future: send structured email to partner.contactEmail)
          await appendMCAPartnerSubmission({
            applicationId,
            businessName: data.legalBusinessName,
            email: data.email,
            monthlyRevenue: data.monthlyRevenue,
            fundingRequested: data.fundingAmount,
            band: priorityBand,
            priorityFlag: false,
            fileStorageUrls: data.storageFileUrls.join(', '),
            submissionMethod: 'email',
            submittedBy: `auto-router → ${partner.partnerId}`,
          });
        } else if (partner.deliveryMethod === 'webhook' && partner.webhookUrl) {
          // Webhook routing (for future partners with API endpoints)
          const webhookPayload = {
            applicationId,
            businessName: data.legalBusinessName,
            email: data.email,
            phone: data.phone,
            province: data.province,
            industry: data.industry,
            monthlyRevenue: data.monthlyRevenue,
            fundingRequested: data.fundingAmount,
            yearsInBusiness: data.yearsInBusiness,
            priorityBand,
            priorityFlag: false,
            fileCount: data.fileCount,
            timestamp,
          };
          await fetch(partner.webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(webhookPayload),
          });
          await appendMCAPartnerSubmission({
            applicationId,
            businessName: data.legalBusinessName,
            email: data.email,
            monthlyRevenue: data.monthlyRevenue,
            fundingRequested: data.fundingAmount,
            band: priorityBand,
            priorityFlag: false,
            fileStorageUrls: data.storageFileUrls.join(', '),
            submissionMethod: 'webhook',
            submittedBy: `auto-router → ${partner.partnerId}`,
          });
        }
      })
    ).catch(() => {}); // errors handled per-promise above

    return NextResponse.json(
      {
        success: true,
        applicationId,
        message: 'Your application has been received. Our team will be in touch within 24 hours.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('MCA Apply error:', error);
    return NextResponse.json(
      {
        error: 'We encountered an issue submitting your application. Please try again or contact us directly.',
      },
      { status: 500 }
    );
  }
}
