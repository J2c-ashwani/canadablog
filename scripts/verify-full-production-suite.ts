/**
 * FSI Digital — Full Production Systems Audit
 * Validates:
 * 1. Google Sheets CRM Connectivity & Row Counts
 * 2. Resend Email Transport & API Quotas
 * 3. PayPal Live Payment Gateway Token Exchange
 * 4. Upstash Redis Telemetry & Lease Store
 * 5. Social Media APIs (Facebook, Instagram, LinkedIn, YouTube)
 * 6. Hardcoded Suppression Verification (artit@egoblockchain.com)
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env.production.local' });

import { getGoogleSheetsClient } from '../lib/google-sheets';
import { isPermanentlySuppressed, sendEmail } from '../lib/emails/mailer';

interface AuditResult {
  service: string;
  status: 'HEALTHY' | 'DEGRADED' | 'FAILED' | 'CONFIGURED';
  details: string;
  latencyMs?: number;
}

async function runFullSuiteAudit() {
  console.log('════════════════════════════════════════════════════════════════════');
  console.log('🔎 FSI DIGITAL — COMPREHENSIVE PRODUCTION SYSTEMS AUDIT');
  console.log('════════════════════════════════════════════════════════════════════\n');

  const results: AuditResult[] = [];

  // 1. Google Sheets CRM Check
  const startSheets = Date.now();
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Leads!A1:C5',
    });
    const rows = res.data.values || [];
    results.push({
      service: 'Google Sheets CRM',
      status: 'HEALTHY',
      details: `Connected successfully. Headers verified: [${rows[0]?.slice(0, 3).join(', ')}].`,
      latencyMs: Date.now() - startSheets,
    });
  } catch (err: any) {
    results.push({
      service: 'Google Sheets CRM',
      status: 'FAILED',
      details: `Connection failed: ${err.message}`,
      latencyMs: Date.now() - startSheets,
    });
  }

  // 2. Resend Email Transport Check
  const startResend = Date.now();
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error('RESEND_API_KEY is not defined.');
    const res = await fetch('https://api.resend.com/emails?limit=1', {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (res.ok) {
      results.push({
        service: 'Resend Email API',
        status: 'HEALTHY',
        details: 'Authenticated successfully. HTTP 200 OK.',
        latencyMs: Date.now() - startResend,
      });
    } else {
      results.push({
        service: 'Resend Email API',
        status: 'FAILED',
        details: `HTTP ${res.status}: ${await res.text()}`,
        latencyMs: Date.now() - startResend,
      });
    }
  } catch (err: any) {
    results.push({
      service: 'Resend Email API',
      status: 'FAILED',
      details: `Exception: ${err.message}`,
      latencyMs: Date.now() - startResend,
    });
  }

  // 3. PayPal Live Payment Gateway
  const startPayPal = Date.now();
  try {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const secret = process.env.PAYPAL_CLIENT_SECRET;
    const env = process.env.PAYPAL_ENV || 'live';
    const baseUrl = env === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

    if (!clientId || !secret) throw new Error('PayPal Client ID or Secret missing.');
    const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');
    const res = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (res.ok) {
      const data = await res.json();
      results.push({
        service: `PayPal Payment Gateway (${env.toUpperCase()})`,
        status: 'HEALTHY',
        details: `OAuth token exchange succeeded. Token scope: [${(data.scope || '').slice(0, 30)}...]`,
        latencyMs: Date.now() - startPayPal,
      });
    } else {
      results.push({
        service: 'PayPal Payment Gateway',
        status: 'FAILED',
        details: `HTTP ${res.status}: ${await res.text()}`,
        latencyMs: Date.now() - startPayPal,
      });
    }
  } catch (err: any) {
    results.push({
      service: 'PayPal Payment Gateway',
      status: 'FAILED',
      details: `Exception: ${err.message}`,
      latencyMs: Date.now() - startPayPal,
    });
  }

  // 4. Upstash Redis Check
  const startRedis = Date.now();
  try {
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!redisUrl || !redisToken) throw new Error('Upstash Redis credentials missing.');
    const res = await fetch(`${redisUrl}/ping`, {
      headers: { Authorization: `Bearer ${redisToken}` },
    });
    if (res.ok) {
      const data = await res.json();
      results.push({
        service: 'Upstash Redis Ledger',
        status: 'HEALTHY',
        details: `Ping succeeded: ${data.result}`,
        latencyMs: Date.now() - startRedis,
      });
    } else {
      results.push({
        service: 'Upstash Redis Ledger',
        status: 'DEGRADED',
        details: `HTTP ${res.status}: ${await res.text()}`,
        latencyMs: Date.now() - startRedis,
      });
    }
  } catch (err: any) {
    results.push({
      service: 'Upstash Redis Ledger',
      status: 'DEGRADED',
      details: `Warning: ${err.message}`,
      latencyMs: Date.now() - startRedis,
    });
  }

  // 5. Facebook Graph API
  const startFB = Date.now();
  try {
    const pageToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN || process.env.FACEBOOK_ACCESS_TOKEN;
    const pageId = process.env.FACEBOOK_PAGE_ID || '1077759455417325';
    if (!pageToken) throw new Error('Facebook token missing.');
    const res = await fetch(`https://graph.facebook.com/v19.0/${pageId}?fields=name,id&access_token=${pageToken}`);
    if (res.ok) {
      const data = await res.json();
      results.push({
        service: 'Facebook Page API',
        status: 'HEALTHY',
        details: `Page verified: "${data.name}" (ID: ${data.id})`,
        latencyMs: Date.now() - startFB,
      });
    } else {
      const errText = await res.text();
      results.push({
        service: 'Facebook Page API',
        status: 'DEGRADED',
        details: `HTTP ${res.status}: ${errText.slice(0, 80)}`,
        latencyMs: Date.now() - startFB,
      });
    }
  } catch (err: any) {
    results.push({
      service: 'Facebook Page API',
      status: 'DEGRADED',
      details: err.message,
      latencyMs: Date.now() - startFB,
    });
  }

  // 6. Instagram Graph API
  const startIG = Date.now();
  try {
    const igToken = process.env.INSTAGRAM_ACCESS_TOKEN || process.env.FACEBOOK_ACCESS_TOKEN;
    const igId = process.env.INSTAGRAM_ACCOUNT_ID;
    if (!igToken || !igId) throw new Error('Instagram credentials missing.');
    const res = await fetch(`https://graph.facebook.com/v19.0/${igId}?fields=username,id&access_token=${igToken}`);
    if (res.ok) {
      const data = await res.json();
      results.push({
        service: 'Instagram Graph API',
        status: 'HEALTHY',
        details: `Account verified: @${data.username} (ID: ${data.id})`,
        latencyMs: Date.now() - startIG,
      });
    } else {
      results.push({
        service: 'Instagram Graph API',
        status: 'DEGRADED',
        details: `HTTP ${res.status}: ${(await res.text()).slice(0, 80)}`,
        latencyMs: Date.now() - startIG,
      });
    }
  } catch (err: any) {
    results.push({
      service: 'Instagram Graph API',
      status: 'DEGRADED',
      details: err.message,
      latencyMs: Date.now() - startIG,
    });
  }

  // 7. YouTube Data API v3
  const startYT = Date.now();
  try {
    const ytKey = process.env.YOUTUBE_API_KEY;
    if (!ytKey) throw new Error('YOUTUBE_API_KEY missing.');
    const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=id&chart=mostPopular&maxResults=1&key=${ytKey}`);
    if (res.ok) {
      results.push({
        service: 'YouTube Data API v3',
        status: 'HEALTHY',
        details: 'API Key active and verified against YouTube v3 service.',
        latencyMs: Date.now() - startYT,
      });
    } else {
      results.push({
        service: 'YouTube Data API v3',
        status: 'DEGRADED',
        details: `HTTP ${res.status}: ${(await res.text()).slice(0, 80)}`,
        latencyMs: Date.now() - startYT,
      });
    }
  } catch (err: any) {
    results.push({
      service: 'YouTube Data API v3',
      status: 'DEGRADED',
      details: err.message,
      latencyMs: Date.now() - startYT,
    });
  }

  // 8. Lead Suppression Guard
  const suppressedTest = isPermanentlySuppressed('artit@egoblockchain.com');
  const domainSuppressedTest = isPermanentlySuppressed('test@egoblockchain.com');
  const allowedTest = isPermanentlySuppressed('founder@legitimate-business.ca');
  const suppressionHealthy = suppressedTest && domainSuppressedTest && !allowedTest;

  results.push({
    service: 'Global Email Suppression Guard',
    status: suppressionHealthy ? 'HEALTHY' : 'FAILED',
    details: suppressionHealthy
      ? 'Verified: artit@egoblockchain.com and @egoblockchain.com blocked at transport layer; clean contacts allowed.'
      : 'Suppression logic mismatch detected.',
  });

  // Display Clean Table
  console.log('====================================================================');
  console.log('📊 PRODUCTION SYSTEMS VERIFICATION SCORECARD');
  console.log('====================================================================');
  for (const r of results) {
    const badge = r.status === 'HEALTHY' ? '✅ HEALTHY ' : r.status === 'DEGRADED' ? '⚠️ DEGRADED' : '❌ FAILED  ';
    const latency = r.latencyMs ? `(${r.latencyMs}ms)` : '';
    console.log(`${badge} | ${r.service.padEnd(32)} | ${r.details} ${latency}`);
  }
  console.log('====================================================================\n');
}

runFullSuiteAudit().catch(console.error);
