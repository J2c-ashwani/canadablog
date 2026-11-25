import { Redis } from '@upstash/redis';
import { getGoogleSheetsClient } from '@/lib/google-sheets';
import { getAllPrograms } from '@/lib/data/programs';

export interface InfraHygieneReport {
  checkedAt: string;
  redisStatus: 'OK' | 'FIXED_LIMIT_EXCEEDED' | 'DISABLED' | 'UNCONFIGURED';
  redisDetail: string;
  resendConfigured: boolean;
  brevoConfigured: boolean;
  paypalConfigured: boolean;
  stripeConfigured: boolean;
  cronSecretConfigured: boolean;
  openProgramsCount: number;
  totalProgramsCount: number;
  bouncedEmails: Set<string>;
  engagedEmails: Set<string>;
  suppressedEmailsCount: number;
  recommendedEnvActions: string[];
}

export class InfraHygieneAgent {
  static async runHealthAudit(): Promise<InfraHygieneReport> {
    const recommendedEnvActions: string[] = [];

    const resendConfigured = Boolean(process.env.RESEND_API_KEY?.trim());
    const brevoConfigured = Boolean(process.env.BREVO_API_KEY?.trim());
    const paypalConfigured = Boolean(
      (process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID) &&
      process.env.PAYPAL_CLIENT_SECRET
    );
    const stripeConfigured = Boolean(
      process.env.STRIPE_SECRET_KEY &&
      !process.env.STRIPE_SECRET_KEY.includes('mock')
    );
    const cronSecretConfigured = Boolean(process.env.CRON_SECRET?.trim());

    if (!brevoConfigured) {
      recommendedEnvActions.push(
        'Set BREVO_API_KEY in Vercel production env so weekly newsletters, multi-touch reactivation, sponsored media, and Funding Watch offload cleanly to Brevo (300/day).'
      );
    }
    if (!stripeConfigured) {
      recommendedEnvActions.push(
        'STRIPE_SECRET_KEY is not configured; card payments remain active via PayPal Smart Buttons (&enable-funding=card) and mobile full-page redirect.'
      );
    }

    let redisStatus: InfraHygieneReport['redisStatus'] = 'UNCONFIGURED';
    let redisDetail = 'Upstash credentials missing; using Sheets operational fallback.';

    if (process.env.DISABLE_REDIS === 'true') {
      redisStatus = 'DISABLED';
      redisDetail = 'DISABLE_REDIS=true active; operating on durable Google Sheets coordination.';
    } else if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      try {
        const client = new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });
        const size = await client.dbsize();
        redisStatus = 'OK';
        redisDetail = `Upstash Redis responsive (${size} keys).`;
      } catch (err: any) {
        const msg = String(err?.message || err || '');
        if (/fixed plan limits|max request|limit/i.test(msg)) {
          redisStatus = 'FIXED_LIMIT_EXCEEDED';
          redisDetail = `Upstash quota limit reached (${msg}); Sheets fallback is handling leases, set DISABLE_REDIS=true or reset Upstash console to silence failing roundtrips.`;
          recommendedEnvActions.push(
            'Upstash Redis Fixed plan limit reached: clear telemetry/reset quota on Upstash Console or temporarily set DISABLE_REDIS=true in Vercel env ($0 cost) to silence failing roundtrips.'
          );
        } else {
          redisStatus = 'FIXED_LIMIT_EXCEEDED';
          redisDetail = `Redis unavailable: ${msg}`;
        }
      }
    }

    const bouncedEmails = new Set<string>();
    const engagedEmails = new Set<string>();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    if (spreadsheetId) {
      try {
        const sheets = await getGoogleSheetsClient();
        const res = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: "'Email Events'!A2:H",
        });
        const rows = res.data.values || [];
        for (const row of rows) {
          const evType = String(row[3] || '').toLowerCase();
          const email = String(row[4] || '').toLowerCase().trim();
          if (!email) continue;
          if (evType.includes('bounc') || evType.includes('complaint') || evType.includes('suppress')) {
            bouncedEmails.add(email);
          } else if (evType.includes('open') || evType.includes('click')) {
            engagedEmails.add(email);
          }
        }
      } catch (err: any) {
        console.warn('InfraHygieneAgent could not read Email Events tab:', err?.message || err);
      }
    }

    const programs = getAllPrograms();
    const openPrograms = programs.filter((p) => p.status === 'Open');

    return {
      checkedAt: new Date().toISOString(),
      redisStatus,
      redisDetail,
      resendConfigured,
      brevoConfigured,
      paypalConfigured,
      stripeConfigured,
      cronSecretConfigured,
      openProgramsCount: openPrograms.length,
      totalProgramsCount: programs.length,
      bouncedEmails,
      engagedEmails,
      suppressedEmailsCount: bouncedEmails.size,
      recommendedEnvActions,
    };
  }
}
