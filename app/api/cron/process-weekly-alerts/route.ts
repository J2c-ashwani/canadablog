import { type NextRequest, NextResponse } from 'next/server';
import { AlertEngine } from '@/lib/leads/AlertEngine';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { getAllPrograms } from '@/lib/data/programs';
import { saveCampaignMetrics } from '@/lib/leads/alert-metrics';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RUN_LOG_PATH = path.join(process.cwd(), 'lib/data/weekly-alerts-cron-log.json');

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;

  if (!secret && process.env.NODE_ENV !== 'production') {
    return true;
  }

  if (!secret) {
    return false;
  }

  const authHeader = request.headers.get('authorization') || '';
  const headerSecret = request.headers.get('x-cron-secret') || '';
  const querySecret = request.nextUrl.searchParams.get('secret') || '';

  return authHeader === `Bearer ${secret}` || headerSecret === secret || querySecret === secret;
}

function ensureRunLogExists() {
  const dir = path.dirname(RUN_LOG_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(RUN_LOG_PATH)) {
    fs.writeFileSync(RUN_LOG_PATH, JSON.stringify({ lastRunDate: '' }), 'utf8');
  }
}

function checkDuplicateRun() {
  try {
    ensureRunLogExists();
    const content = fs.readFileSync(RUN_LOG_PATH, 'utf8');
    const log = JSON.parse(content || '{}');
    const today = new Date().toISOString().split('T')[0];
    return log.lastRunDate === today;
  } catch (err) {
    console.error('Error reading cron run log:', err);
    return false;
  }
}

function markRunComplete() {
  try {
    ensureRunLogExists();
    const today = new Date().toISOString().split('T')[0];
    fs.writeFileSync(RUN_LOG_PATH, JSON.stringify({ lastRunDate: today }), 'utf8');
  } catch (err) {
    console.error('Error marking cron run complete:', err);
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized alerts cron execution.' }, { status: 401 });
    }

    const force = request.nextUrl.searchParams.get('force') === 'true';

    // Prevent duplicate runs on the same calendar day (unless forced)
    if (!force && checkDuplicateRun()) {
      return NextResponse.json({ 
        success: true, 
        message: 'Personalized weekly digests already executed today. Skipped to prevent duplicates.'
      });
    }

    const subscribers = await SubscriberRepository.getAllSubscribers();
    const activeSubs = subscribers.filter((sub) => sub.isSubscribed);

    if (activeSubs.length === 0) {
      return NextResponse.json({ success: true, message: 'No active subscribers in segment.' });
    }

    const programs = getAllPrograms();
    const campaignId = `weekly_digest_${Date.now()}`;
    const subject = `Your Personalized Funding Intelligence Weekly Digest`;

    const senderApiKey = process.env.SENDER_API_KEY;
    const senderFromEmail = process.env.SENDER_FROM_EMAIL || 'hello@fsidigital.ca';
    const senderFromName = process.env.SENDER_FROM_NAME || 'FSI Digital';

    let sentCount = 0;
    let failedCount = 0;
    const errors: string[] = [];

    console.log(`\n📢 [AUTONOMOUS CRON START] Campaign ID: ${campaignId}`);
    console.log(`   Recipients: ${activeSubs.length} active subscribers`);

    for (const sub of activeSubs) {
      // Find matches for this subscriber
      const matched = programs.filter((p) => AlertEngine.matchesProfile(p, sub)).slice(0, 5);

      if (matched.length === 0) {
        console.log(`   ➔ Skipped: ${sub.email} (No matching opportunities)`);
        continue;
      }

      const emailContent = AlertEngine.generateWeeklyDigestBody(matched, sub);
      const fullHtml = AlertEngine.wrapEmailTemplate(emailContent, sub);

      if (senderApiKey) {
        try {
          const res = await fetch('https://api.sender.net/v2/message/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${senderApiKey}`
            },
            body: JSON.stringify({
              from: {
                email: senderFromEmail,
                name: senderFromName
              },
              to: {
                email: sub.email,
                name: sub.name || 'Founder'
              },
              subject: subject,
              html: fullHtml
            })
          });

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            console.error(`❌ Sender.net failed to send to ${sub.email}:`, errData);
            failedCount++;
            errors.push(`${sub.email}: ${JSON.stringify(errData)}`);
          } else {
            console.log(`   ➔ Sent weekly digest to: ${sub.email}`);
            sentCount++;
          }
        } catch (err: any) {
          console.error(`❌ Failed to request Sender.net for ${sub.email}:`, err);
          failedCount++;
          errors.push(`${sub.email}: ${err.message || 'Network error'}`);
        }
      } else {
        // Mock send logs in development/testing
        console.log(`   ➔ [Mock Send] Weekly Digest to: ${sub.email} | Token: ${sub.loginToken} | Matches: ${matched.length}`);
        sentCount++;
      }
    }

    // Save Campaign metrics
    await saveCampaignMetrics({
      campaignId,
      category: 'Weekly Intelligence',
      subject,
      sentCount,
      opens: 0,
      clicks: 0,
      conversions: 0,
      audits: 0,
      revenue: 0,
      timestamp: new Date().toISOString()
    });

    console.log(`📢 [AUTONOMOUS CRON COMPLETED] Sent: ${sentCount} | Failed: ${failedCount}\n`);

    // Log run date to prevent duplicate runs
    markRunComplete();

    return NextResponse.json({
      success: true,
      campaignId,
      processed: activeSubs.length,
      sent: sentCount,
      failed: failedCount,
      errors
    });
  } catch (error: any) {
    console.error('Weekly alerts cron execution error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
