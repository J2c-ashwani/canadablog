import { type NextRequest, NextResponse } from 'next/server';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';

export const runtime = 'nodejs';

function clean(value: unknown, fallback = '') {
  return String(value || fallback).trim().slice(0, 500);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * POST /api/audit/questionnaire
 *
 * Stores the 3 pre-call questionnaire answers directly onto the
 * subscriber's CRM row as dedicated sales fields — NOT as telemetry events.
 *
 * Fields written:
 *   auditGoal          — primary funding goal (e.g. "sred", "hiring", "digital", "other")
 *   businessAge        — how long the company has operated
 *   fundingExperience  — whether they've applied for government funding before
 *
 * These fields are stored in leadActivity JSON on the subscriber row.
 * They surface in the admin leads table for pre-call prep.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = clean(body.email).toLowerCase();
    const orderId = clean(body.orderId);
    const auditGoal = clean(body.auditGoal);
    const businessAge = clean(body.businessAge);
    const fundingExperience = clean(body.fundingExperience);
    const submittedAt = new Date().toISOString();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    if (!auditGoal || !businessAge || !fundingExperience) {
      return NextResponse.json({ error: 'All three questionnaire fields are required.' }, { status: 400 });
    }

    // Fetch current subscriber row
    const subscriber = await SubscriberRepository.getSubscriberByEmail(email);

    let activity: Record<string, any> = {};
    if (subscriber?.leadActivity && subscriber.leadActivity !== 'N/A' && subscriber.leadActivity !== '{}') {
      try {
        activity = JSON.parse(subscriber.leadActivity);
      } catch (e) {
        console.error('[Audit Questionnaire] Failed to parse leadActivity:', e);
      }
    }

    // Write dedicated sales fields — separate from behavioural telemetry
    activity.auditGoal = auditGoal;
    activity.businessAge = businessAge;
    activity.fundingExperience = fundingExperience;
    activity.auditQuestionnaireSubmittedAt = submittedAt;
    if (orderId) activity.auditOrderId = orderId;

    if (subscriber) {
      await SubscriberRepository.updateSubscriberPreferences(email, {
        leadActivity: JSON.stringify(activity),
      });
      console.log(`[Audit Questionnaire] Saved sales fields for ${email}:`, {
        auditGoal, businessAge, fundingExperience, submittedAt
      });
    } else {
      // Subscriber not found — still log for manual recovery
      console.warn(`[Audit Questionnaire] Subscriber not found for ${email}. Questionnaire answers:`, {
        auditGoal, businessAge, fundingExperience, orderId, submittedAt
      });
    }

    return NextResponse.json({ success: true, savedAt: submittedAt });
  } catch (error) {
    console.error('[Audit Questionnaire] Error:', error);
    return NextResponse.json({ error: 'Failed to save questionnaire answers.' }, { status: 500 });
  }
}
