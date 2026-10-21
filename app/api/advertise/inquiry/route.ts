import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { applyRateLimit } from '@/lib/rate-limit';
import { validateEmail } from '@/lib/email-validator';
import { savePublishingInquiry } from '@/lib/advertising/store';
import {
  sendPublishingInquiryReceipt,
  sendPublishingInquiryAdminAlert,
} from '@/lib/advertising/emails';
import { PublishingInquiry } from '@/lib/advertising/config';

export const runtime = 'nodejs';

function calculateInquiryScore(body: Partial<PublishingInquiry>): number {
  let score = 50; // Base score for completing form
  const email = (body.email || '').toLowerCase().trim();
  const genericDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
  const domain = email.split('@')[1] || '';

  if (domain && !genericDomains.includes(domain)) {
    score += 20; // Corporate email
  }

  if (body.website && (body.website.startsWith('http://') || body.website.startsWith('https://'))) {
    score += 15;
  }

  if (body.budget && (body.budget.includes('$500') || body.budget.includes('$1,000') || body.budget.includes('Multiple'))) {
    score += 15;
  }

  return Math.min(score, 100);
}

export async function POST(request: NextRequest) {
  // Rate Limit: 5 submissions per 5 minutes per IP
  if (process.env.NODE_ENV !== 'development') {
    const limitRes = await applyRateLimit(request, 5, 5 * 60 * 1000);
    if (limitRes.isLimited) return limitRes.response;
  }

  try {
    const body = await request.json();

    // 1. Spam Honeypot Check
    if (body.website_hp || body.confirmEmail) {
      console.warn('🤖 Spam bot trapped on /api/advertise/inquiry via honeypot.');
      return NextResponse.json({
        success: true,
        message: 'Inquiry received. Our editorial team will review your proposal.',
      });
    }

    const {
      name,
      email,
      companyName,
      website,
      packageInterest,
      targetAudience,
      topicAngle,
      destinationUrl,
      timeline,
      budget,
      notes,
    } = body;

    // 2. Mandatory Field Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Contact name is required.' }, { status: 400 });
    }

    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Work email is required.' }, { status: 400 });
    }

    const emailValidation = validateEmail(email.trim());
    if (!emailValidation.isValid) {
      return NextResponse.json({ error: emailValidation.error || 'Please enter a valid business email address.' }, { status: 400 });
    }

    if (!companyName || !companyName.trim()) {
      return NextResponse.json({ error: 'Company or brand name is required.' }, { status: 400 });
    }

    if (!website || !website.trim()) {
      return NextResponse.json({ error: 'Company website URL is required.' }, { status: 400 });
    }

    if (!topicAngle || !topicAngle.trim()) {
      return NextResponse.json({ error: 'Please provide a brief topic or angle description.' }, { status: 400 });
    }

    const inquiryId = `inq_${Date.now()}_${randomUUID().slice(0, 8)}`;
    const score = calculateInquiryScore({ email, website, budget });

    const inquiryRecord: PublishingInquiry = {
      inquiryId,
      createdAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      companyName: companyName.trim(),
      website: website.trim(),
      packageInterest: packageInterest || 'Done-for-You Sponsored Article ($225 USD)',
      targetAudience: targetAudience ? targetAudience.trim() : undefined,
      topicAngle: topicAngle.trim(),
      destinationUrl: destinationUrl ? destinationUrl.trim() : undefined,
      timeline: timeline ? timeline.trim() : 'Flexible',
      budget: budget ? budget.trim() : undefined,
      notes: notes ? notes.trim() : undefined,
      score,
      status: 'new',
    };

    // Save to Google Sheets
    await savePublishingInquiry(inquiryRecord);

    // Send customer confirmation receipt & internal team alert
    await Promise.allSettled([
      sendPublishingInquiryReceipt(inquiryRecord),
      sendPublishingInquiryAdminAlert(inquiryRecord),
    ]);

    return NextResponse.json({
      success: true,
      inquiryId,
      message: 'Your publishing inquiry has been received. Our editorial team will review your proposal within 1 business day.',
    });
  } catch (error) {
    console.error('Error processing publishing inquiry:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while submitting your inquiry. Please try again or email us directly at ashwani@fsidigital.ca.' },
      { status: 500 }
    );
  }
}
