/**
 * FSI Digital — Grant-Ready Corporate Digital Foundation Pilot Runner ($499 USD)
 * 
 * Targets verified early-stage / ideation leads in the CRM who currently operate with
 * personal email domains (@gmail, @yahoo, etc.) and lack an active corporate website.
 * 
 * Offers a complete 72-hour productized institutional presence ($499 USD) to remove
 * the #1 government grant evaluator rejection barrier ("Zero Verifiable Operational Presence").
 * 
 * Usage:
 *   npx tsx scripts/run-website-advisory-pilot.ts                # Dry-run simulation (prints copy)
 *   npx tsx scripts/run-website-advisory-pilot.ts --execute     # Live production dispatch (Resend)
 *   npx tsx scripts/run-website-advisory-pilot.ts --limit=10    # Custom cohort limit
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { getGoogleSheetsClient } from '@/lib/google-sheets';
import { sendEmail } from '@/lib/emails/mailer';
import { getAllPurchases } from '@/lib/products/purchase-store';

const PERSONAL_DOMAINS = new Set([
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'live.com'
]);

const EARLY_STAGES = new Set([
  'idea', 'startup', 'pre-revenue', 'pre_revenue'
]);

const COMPANY_INDICATORS = [
  'the', 'high', 'sf', 'electronic', 'bridge', 'stakes', 'wellness', 'media', 'ranch',
  'studio', 'detailing', 'dish', 'learning', 'necessities', 'ventures', 'enterprises',
  'solutions', 'partners', 'tech', 'group', 'holdings', 'inc', 'llc', 'ltd', 'packaging'
];

const COMMON_FIRST_NAMES = [
  'patrick', 'david', 'brad', 'brendon', 'shibashish', 'sneha', 'sidhant', 'haley',
  'manpreet', 'joyeeta', 'dominique', 'fatuma', 'annie', 'katherine', 'irene',
  'michael', 'amanda', 'connor', 'nisarg', 'chintan', 'sarah', 'alex', 'john',
  'peter', 'mark', 'robert', 'james', 'lisa', 'jennifer', 'jessica', 'rachel',
  'jarvis'
];

function capitalize(s: string): string {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function isCompanyString(s: string): boolean {
  const lower = s.toLowerCase().trim();
  return COMPANY_INDICATORS.some(w => lower === w || lower.includes(' ' + w) || lower.startsWith(w + ' ') || lower.endsWith(' ' + w));
}

function extractFirstName(email: string, rawName: string, company: string): string {
  const cleanRaw = (rawName || '').trim();
  const cleanComp = (company || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const emailUser = email.split('@')[0].toLowerCase().replace(/[0-9_.-]+$/g, '');

  if (cleanRaw && !isCompanyString(cleanRaw)) {
    const parts = cleanRaw.split(/\s+/);
    if (parts.length >= 2 && !cleanRaw.toLowerCase().includes('ltd') && !cleanRaw.toLowerCase().includes('inc') && !cleanRaw.toLowerCase().includes('llc')) {
      const first = parts[0].trim();
      if (first.length >= 2 && !first.includes('.') && !isCompanyString(first)) {
        return capitalize(first);
      }
    }
  }

  for (const fn of COMMON_FIRST_NAMES) {
    if (emailUser.startsWith(fn)) {
      return capitalize(fn);
    }
  }

  if (emailUser.includes('.')) {
    const dotPart = emailUser.split('.')[0].toLowerCase();
    if (dotPart.length >= 3 && !COMPANY_INDICATORS.includes(dotPart) && !cleanComp.includes(dotPart) && !dotPart.includes(cleanComp)) {
      if (COMMON_FIRST_NAMES.includes(dotPart)) {
        return capitalize(dotPart);
      }
    }
  }

  return '';
}

function isGibberish(s: string): boolean {
  if (/^[bcdfghjklmnpqrstvwxyz]{5,}/i.test(s)) return true;
  if (/^[a-z]{10,}$/i.test(s) && !COMMON_FIRST_NAMES.some(n => s.toLowerCase().includes(n))) {
    const consonants = (s.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
    if (consonants / s.length > 0.75) return true;
  }
  return false;
}

interface TargetedLead {
  rowIndex: number;
  email: string;
  salutation: string;
  firstName: string;
  company: string;
  provinceName: string;
  programFocus: string;
  fundingGoal: string;
}

async function getTargetedCohort(limit: number): Promise<TargetedLead[]> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID missing from environment variables.');
  }

  const [sheets, allPurchases] = await Promise.all([
    getGoogleSheetsClient(),
    getAllPurchases({ strict: false }).catch(() => []),
  ]);

  const buyerEmails = new Set(allPurchases.map(p => (p.email || '').toLowerCase().trim()).filter(Boolean));

  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: 'Leads!A:AZ' });
  const rows = res.data.values || [];

  const cohort: TargetedLead[] = [];
  const seenEmails = new Set<string>();

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const email = (row[2] || '').trim().toLowerCase();
    const nameRaw = (row[3] || '').trim();
    const provinceRaw = (row[5] || '').trim().toLowerCase();
    const stageRaw = (row[7] || '').trim().toLowerCase();
    const fundingGoalRaw = (row[8] || '').trim();
    const companyRaw = (row[47] || '').trim();

    if (!email || !email.includes('@')) continue;
    if (seenEmails.has(email) || buyerEmails.has(email)) continue;

    const domain = email.split('@')[1];
    if (!PERSONAL_DOMAINS.has(domain)) continue;

    const emailUser = email.split('@')[0];
    if (isGibberish(emailUser) || email.includes('test') || email.includes('yopmail') || email.includes('mailinator')) continue;

    const isEarly = EARLY_STAGES.has(stageRaw) || stageRaw === 'idea' || stageRaw === 'startup';
    if (!isEarly) continue;

    // Resolve company name
    let company = companyRaw;
    if (!company || company.toLowerCase() === 'n/a' || company.toLowerCase() === 'none') {
      company = nameRaw;
    }
    if (!company || company.toLowerCase() === 'n/a' || company.toLowerCase() === 'none' || company.toLowerCase() === 'founder' || company.toLowerCase() === 'packaging') {
      continue;
    }

    let firstName = extractFirstName(email, nameRaw, company);
    if (firstName && company.toLowerCase().includes(firstName.toLowerCase()) && isCompanyString(company)) {
      firstName = '';
    }
    const salutation = firstName ? `Hi ${firstName},` : 'Hello,';

    // If company is just a person's name (e.g., "Nisarg Patel" or "Dominique Mbongolo"), use "your venture" in context
    let displayCompany = company;
    if (firstName && company.toLowerCase().startsWith(firstName.toLowerCase()) && company.includes(' ')) {
      displayCompany = 'your venture';
    }

    // Province & regional grant mapping
    let provinceName = 'Canada';
    let programFocus = 'NRC-IRAP and regional economic development programs';
    if (provinceRaw.includes('on') || provinceRaw.includes('ontario')) {
      provinceName = 'Ontario';
      programFocus = 'the Ontario Centre of Innovation (OCI) and NRC-IRAP';
    } else if (provinceRaw.includes('ab') || provinceRaw.includes('alberta')) {
      provinceName = 'Alberta';
      programFocus = 'Alberta Innovates Voucher and PrairiesCan';
    } else if (provinceRaw.includes('bc') || provinceRaw.includes('british')) {
      provinceName = 'British Columbia';
      programFocus = 'Innovate BC and PacifiCan';
    } else if (provinceRaw.includes('qc') || provinceRaw.includes('quebec')) {
      provinceName = 'Quebec';
      programFocus = 'Investissement Québec and NRC-IRAP';
    }

    // Funding goal
    let fundingGoal = '$50,000 to $250,000 in non-dilutive capital';
    if (fundingGoalRaw.includes('25k-100k')) fundingGoal = '$25,000 to $100,000 in non-repayable grants';
    else if (fundingGoalRaw.includes('100k-500k')) fundingGoal = '$100,000 to $500,000 in non-dilutive funding';
    else if (fundingGoalRaw.includes('over-1m')) fundingGoal = 'over $1,000,000 in co-funded support';
    else if (fundingGoalRaw.includes('under-25k')) fundingGoal = 'up to $25,000 in non-repayable seed grants';

    seenEmails.add(email);
    cohort.push({
      rowIndex: i + 1,
      email,
      salutation,
      firstName,
      company: displayCompany,
      provinceName,
      programFocus,
      fundingGoal,
    });

    if (cohort.length >= limit) break;
  }

  return cohort;
}

function generatePersonalizedEmail(lead: TargetedLead) {
  const subject = `Grant Assessment Follow-up: Institutional digital presence requirement for ${lead.company}`;

  const plainText = `${lead.salutation}

In your recent funding assessment for ${lead.company}, your venture was categorized in the early-stage bracket for Canadian non-dilutive grant programs in ${lead.provinceName} (such as ${lead.programFocus}).

When government program officers review funding applications for ${lead.fundingGoal}, the very first automated compliance filter applied by evaluators is:

"Lack of verifiable operational and commercial presence."

Submitting an application from a personal email address without an active, institutional corporate web presence almost always results in immediate disqualification by program officers. Evaluators require documented proof that the applicant is an accountable, operational entity before allocating taxpayer capital.

To remove this barrier ahead of the upcoming grant cycles, our senior advisory team has launched the "Grant-Ready Corporate Digital Foundation" ($499 USD flat).

Within 72 business hours, our team delivers:
1. Institutional 3-5 Page Web Presence: Built specifically to satisfy government evaluator verification guidelines (Corporate Overview, R&D / Innovation Scope, Operational Leadership, and Privacy / Terms).
2. Dedicated Corporate Email Setup: Fully configured custom email (e.g., founder@${lead.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com) to ensure official government correspondence is recognized.
3. Reviewer-Ready Compliance Architecture: Verifiable corporate registry alignment, technical summary, and active digital footprint.

This is a complete, productized service delivered in 72 hours for a one-time fee of $499 USD—no ongoing agency retainers, no long design cycles, and no sales calls required.

If you are preparing to submit funding applications this quarter and want ${lead.company}'s digital foundation active this week, reply directly to this email with "FOUNDATION" or let me know your timeline.

Best regards,

Ashwani K
Senior Advisory Team | FSI Digital
Email: ashwani@fsidigital.ca
Website: https://www.fsidigital.ca
`;

  const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a; line-height: 1.6; font-size: 15px;">
  <p style="margin-top: 0;">${lead.salutation}</p>
  
  <p>In your recent funding assessment for <strong>${lead.company}</strong>, your venture was categorized in the early-stage bracket for Canadian non-dilutive grant programs in <strong>${lead.provinceName}</strong> (such as <strong>${lead.programFocus}</strong>).</p>
  
  <p>When government program officers review funding applications for <strong>${lead.fundingGoal}</strong>, the very first automated compliance filter applied by evaluators is:</p>
  
  <div style="background: #f8fafc; border-left: 4px solid #ef4444; padding: 12px 16px; margin: 18px 0; border-radius: 4px;">
    <p style="margin: 0; font-weight: 700; color: #991b1b; font-size: 14px;">"Lack of verifiable operational and commercial presence."</p>
  </div>
  
  <p>Submitting an application from a personal email address without an active, institutional corporate web presence almost always results in immediate disqualification by program officers. Evaluators require documented proof that the applicant is an accountable, operational entity before allocating taxpayer capital.</p>
  
  <p>To remove this barrier ahead of the upcoming grant cycles, our senior advisory team has launched the <strong>"Grant-Ready Corporate Digital Foundation"</strong> (<strong>$499 USD flat</strong>).</p>
  
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px 20px; margin: 20px 0;">
    <p style="margin: 0 0 10px 0; font-weight: 700; color: #0f172a; font-size: 14px;">Within 72 business hours, our team delivers:</p>
    <ul style="margin: 0; padding-left: 20px; color: #334155;">
      <li style="margin-bottom: 8px;"><strong>Institutional 3–5 Page Web Presence:</strong> Built specifically to satisfy government evaluator verification guidelines (Corporate Overview, R&D / Innovation Scope, Operational Leadership, and Privacy / Terms).</li>
      <li style="margin-bottom: 8px;"><strong>Dedicated Corporate Email Setup:</strong> Fully configured custom email (e.g. founder@${lead.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com) to ensure official government correspondence is recognized.</li>
      <li><strong>Reviewer-Ready Compliance Architecture:</strong> Verifiable corporate registry alignment, technical summary, and active digital footprint.</li>
    </ul>
  </div>
  
  <p>This is a complete, productized service delivered in 72 hours for a one-time fee of <strong>$499 USD</strong>—no ongoing agency retainers, no long design cycles, and no sales calls required.</p>
  
  <p>If you are preparing to submit funding applications this quarter and want <strong>${lead.company}</strong>'s digital foundation active this week, <strong>reply directly to this email with "FOUNDATION"</strong> or let me know your timeline.</p>
  
  <div style="margin-top: 28px; padding-top: 18px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #475569;">
    <p style="margin: 0 0 4px 0; font-weight: 700; color: #0f172a;">Ashwani K</p>
    <p style="margin: 0; color: #64748b;">Senior Advisory Team | FSI Digital</p>
    <p style="margin: 4px 0 0 0;"><a href="mailto:ashwani@fsidigital.ca" style="color: #2563eb; text-decoration: none;">ashwani@fsidigital.ca</a> · <a href="https://www.fsidigital.ca" style="color: #2563eb; text-decoration: none;">fsidigital.ca</a></p>
  </div>
</div>
`;

  return { subject, plainText, html };
}

async function main() {
  const args = process.argv.slice(2);
  const execute = args.includes('--execute');
  const limitArg = args.find(a => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 20;

  console.log('════════════════════════════════════════════════════════════════════');
  console.log('🚀 FSI DIGITAL — $499 USD WEBSITE ADVISORY PILOT RUNNER');
  console.log(`   Mode: ${execute ? '⚡ LIVE PRODUCTION DISPATCH' : '🔍 DRY-RUN SIMULATION (Inspection Only)'}`);
  console.log(`   Target Limit: ${limit} leads`);
  console.log('════════════════════════════════════════════════════════════════════\n');

  const cohort = await getTargetedCohort(limit);
  console.log(`✅ Loaded ${cohort.length} verified candidate leads for dispatch.\n`);

  let dispatched = 0;
  let errors = 0;

  for (let i = 0; i < cohort.length; i++) {
    const lead = cohort[i];
    const { subject, plainText, html } = generatePersonalizedEmail(lead);

    console.log(`────────────────────────────────────────────────────────────────────`);
    console.log(`[Lead ${i + 1}/${cohort.length}] To: ${lead.email}`);
    console.log(`   Salutation: ${lead.salutation}`);
    console.log(`   Company: ${lead.company}`);
    console.log(`   Jurisdiction: ${lead.provinceName} | Goal: ${lead.fundingGoal}`);
    console.log(`   Subject: ${subject}`);

    if (execute) {
      try {
        const result = await sendEmail({
          to: lead.email,
          subject,
          html,
          text: plainText,
          from: 'Ashwani K <ashwani@funding.fsidigital.ca>',
          tagType: 'website-advisory-pilot-499',
          companyName: lead.company,
        });

        if (result.success && result.providerMessageId) {
          dispatched++;
          console.log(`   ✅ Dispatched successfully via Resend [ID: ${result.providerMessageId}]`);
        } else {
          errors++;
          console.error(`   ❌ Dispatch failed: ${result.error || 'Unknown error'}`);
        }

        // 1.5s gentle delay between sends
        await new Promise(r => setTimeout(r, 1500));
      } catch (sendErr: any) {
        errors++;
        console.error(`   ❌ Send exception:`, sendErr.message || sendErr);
      }
    } else {
      console.log(`   🔎 [DRY-RUN] Sample Preview:`);
      console.log(`      "${plainText.slice(0, 180).replace(/\n/g, ' ')}..."`);
    }
  }

  console.log('\n════════════════════════════════════════════════════════════════════');
  console.log(`📊 PILOT EXECUTION SUMMARY:`);
  console.log(`   - Total Candidates: ${cohort.length}`);
  console.log(`   - Dispatched: ${dispatched}`);
  console.log(`   - Errors: ${errors}`);
  console.log(`   - Mode: ${execute ? 'LIVE DISPATCH COMPLETED' : 'DRY RUN ONLY (Pass --execute to fire)'}`);
  console.log('════════════════════════════════════════════════════════════════════\n');
}

main().catch(console.error);
