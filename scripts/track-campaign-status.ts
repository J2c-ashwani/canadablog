/**
 * FSI Digital — Campaign Telemetry & Delivery Auditor
 * 
 * Fetches real-time delivery, open, click, and bounce telemetry from Resend
 * for:
 * 1. Batch 1 Reactivation Campaign
 * 2. $499 USD Website Advisory Pilot
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

interface ResendEmailItem {
  id: string;
  to: string[];
  from: string;
  created_at: string;
  subject: string;
  last_event: string;
  tags?: Array<{ name: string; value: string }>;
}

async function fetchAllRecentEmails(): Promise<ResendEmailItem[]> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured in .env.local');
  }

  // Fetch up to 100 emails
  const url = 'https://api.resend.com/emails?limit=100';
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Resend API returned HTTP ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  return (data.data || []) as ResendEmailItem[];
}

async function main() {
  console.log('════════════════════════════════════════════════════════════════════');
  console.log('📊 FSI DIGITAL — REAL-TIME CAMPAIGN TELEMETRY AUDIT');
  console.log('════════════════════════════════════════════════════════════════════\n');

  const emails = await fetchAllRecentEmails();
  console.log(`Fetched ${emails.length} recent messages from Resend.\n`);

  // Separate into Website Advisory Pilot and Reactivation Campaign
  const websitePilotEmails: ResendEmailItem[] = [];
  const reactivationEmails: ResendEmailItem[] = [];
  const otherEmails: ResendEmailItem[] = [];

  for (const item of emails) {
    const subject = item.subject || '';
    if (subject.includes('Institutional digital presence requirement')) {
      websitePilotEmails.push(item);
    } else if (
      subject.includes('The Funding Leak Receipt') ||
      subject.includes('ALLOCATION NOTICE') ||
      subject.includes('Advisory Closeout Memo')
    ) {
      reactivationEmails.push(item);
    } else {
      otherEmails.push(item);
    }
  }

  // 1. Audit Website Advisory Pilot ($499 USD)
  console.log('====================================================================');
  console.log('🌐 1. $499 USD WEBSITE ADVISORY PILOT TELEMETRY');
  console.log('====================================================================');
  printCohortMetrics(websitePilotEmails);

  // 2. Audit Batch 1 Reactivation Campaign
  console.log('\n====================================================================');
  console.log('📬 2. MULTI-TOUCH REACTIVATION CAMPAIGN TELEMETRY');
  console.log('====================================================================');
  printCohortMetrics(reactivationEmails);

  // 3. Print individual lead status table for Website Pilot
  console.log('\n====================================================================');
  console.log('📋 $499 WEBSITE PILOT: INDIVIDUAL LEAD BREAKDOWN');
  console.log('====================================================================');
  printLeadTable(websitePilotEmails);

  // 4. Print individual lead status table for Reactivation
  console.log('\n====================================================================');
  console.log('📋 REACTIVATION CAMPAIGN: INDIVIDUAL LEAD BREAKDOWN');
  console.log('====================================================================');
  printLeadTable(reactivationEmails);
}

function printCohortMetrics(list: ResendEmailItem[]) {
  const total = list.length;
  if (total === 0) {
    console.log('No emails found for this cohort.');
    return;
  }

  const delivered = list.filter(e => e.last_event === 'delivered').length;
  const opened = list.filter(e => e.last_event === 'opened').length;
  const clicked = list.filter(e => e.last_event === 'clicked').length;
  const bounced = list.filter(e => e.last_event === 'bounced' || e.last_event === 'hardbounced').length;
  const suppressed = list.filter(e => e.last_event === 'suppressed').length;
  const deliveryDelayed = list.filter(e => e.last_event === 'delivery_delayed').length;

  // Note: If last_event is 'opened', it was also delivered. If 'clicked', it was also opened and delivered.
  const effectiveDelivered = delivered + opened + clicked;
  const effectiveOpened = opened + clicked;

  console.log(`Total Dispatched:      ${total}`);
  console.log(`Delivered:             ${effectiveDelivered} / ${total} (${((effectiveDelivered / total) * 100).toFixed(1)}%)`);
  console.log(`Opened:                ${effectiveOpened} / ${total} (${((effectiveOpened / total) * 100).toFixed(1)}%)`);
  console.log(`Clicked:               ${clicked} / ${total} (${((clicked / total) * 100).toFixed(1)}%)`);
  console.log(`Bounced / Failed:      ${bounced} (${((bounced / total) * 100).toFixed(1)}%)`);
  console.log(`Suppressed:            ${suppressed}`);
  console.log(`Delayed:               ${deliveryDelayed}`);
}

function printLeadTable(list: ResendEmailItem[]) {
  list.forEach((e, idx) => {
    const to = e.to.join(', ');
    const time = new Date(e.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
    const eventBadge = e.last_event === 'clicked'
      ? '🔥 CLICKED'
      : e.last_event === 'opened'
        ? '👀 OPENED'
        : e.last_event === 'delivered'
          ? '✅ DELIVERED'
          : e.last_event === 'bounced'
            ? '❌ BOUNCED'
            : e.last_event.toUpperCase();

    console.log(`[${idx + 1}] ${to.padEnd(35)} | ${eventBadge.padEnd(14)} | ${time} IST | ${e.subject.slice(0, 45)}...`);
  });
}

main().catch(console.error);
