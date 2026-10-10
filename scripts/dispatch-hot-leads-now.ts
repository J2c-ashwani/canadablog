/**
 * FSI Digital — Immediate High-Intent Lead Commercial Closer
 *
 * Dispatches high-converting commercial offer emails & founder follow-ups
 * to hot leads in the pipeline (e.g. Guruditya, Arnold, Jamie).
 *
 * Usage:
 *   npx tsx scripts/dispatch-hot-leads-now.ts --dry-run
 *   npx tsx scripts/dispatch-hot-leads-now.ts --email=guruditya.sinha@gmail.com --live
 *   npx tsx scripts/dispatch-hot-leads-now.ts --batch=10 --live
 *   npx tsx scripts/dispatch-hot-leads-now.ts --followup --live
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

if (fs.existsSync(path.resolve(process.cwd(), '.env.local'))) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
} else {
  dotenv.config();
}

import { SubscriberRepository, type SubscriberProfile } from '../lib/leads/SubscriberRepository';
import { SalesAgent } from '../lib/ceo-agent/specialists/sales-agent';
import { sendEmail, getFirstName, cleanCompanyName, cleanRegionName, cleanIndustryName } from '../lib/emails/mailer';
import { sendSalesBlast2 } from '../lib/emails/sales-blast';
import { CommercialActionTracker, generateActionId } from '../lib/ceo-agent/ledger/action-tracker';

async function main() {
  const args = process.argv.slice(2);
  const isLive = args.includes('--live');
  const targetEmailArg = args.find((a) => a.startsWith('--email='))?.split('=')[1]?.toLowerCase().trim();
  const batchArg = args.find((a) => a.startsWith('--batch='))?.split('=')[1];
  const isFollowup = args.includes('--followup');
  const batchSize = batchArg ? parseInt(batchArg, 10) : (targetEmailArg ? 1 : 10);

  console.log('===============================================================');
  console.log('⚡ FSI DIGITAL — IMMEDIATE HIGH-INTENT SALES CLOSING DISPATCHER');
  console.log('===============================================================');
  console.log(`Mode: ${isLive ? '🔴 LIVE DISPATCH (Real emails sent)' : '🟢 DRY RUN (Preview only)'}`);
  if (targetEmailArg) console.log(`Target Email: ${targetEmailArg}`);
  if (isFollowup) console.log(`Action Type: Follow-up Touch (Wave 2)`);
  console.log(`Batch Size: ${batchSize}`);
  console.log('---------------------------------------------------------------\n');

  console.log('Fetching lead database...');
  let subscribers: SubscriberProfile[] = [];
  try {
    subscribers = await SubscriberRepository.getAllSubscribers(true);
  } catch (err: any) {
    console.error('❌ Failed to fetch subscribers:', err.message);
    process.exit(1);
  }

  console.log(`Total Subscribers loaded: ${subscribers.length}\n`);

function isAshwaniOrInternalTest(email?: string): boolean {
  if (!email) return true;
  const lower = email.toLowerCase().trim();
  return (
    lower.includes('ashwani') ||
    lower.includes('join2campus') ||
    lower.includes('fsidigital') ||
    lower.startsWith('test@') ||
    lower.includes('@example.com')
  );
}

  // 1. Follow-up mode for previously contacted leads (e.g. Arnold, Jamie)
  if (isFollowup) {
    console.log('Finding candidates who received initial offer but haven\'t purchased (excluding internal/test leads)...');
    const followupCandidates = subscribers.filter((sub) => {
      if (isAshwaniOrInternalTest(sub.email)) return false;
      if (sub.reportPurchased || sub.strategyReportPurchased) return false;
      if (targetEmailArg && sub.email.toLowerCase().trim() !== targetEmailArg) return false;

      // Must have received a commercial outreach or sales alert previously
      let activity: any = {};
      try {
        if (sub.leadActivity && sub.leadActivity !== 'N/A') {
          activity = typeof sub.leadActivity === 'string' ? JSON.parse(sub.leadActivity) : sub.leadActivity;
        }
      } catch {}

      const wasContacted = activity.salesBlast1SentAt ||
        activity.lastOfferSentAt ||
        activity.lastCommercialActionId ||
        sub.email.includes('parkland') ||
        sub.email.includes('hotmail.com') ||
        sub.email.includes('jamielynn');

      return Boolean(wasContacted);
    }).slice(0, batchSize);

    console.log(`Found ${followupCandidates.length} follow-up candidates.\n`);

    for (const sub of followupCandidates) {
      console.log(`Candidate: ${sub.name || 'Founder'} (${sub.email}) — Company: ${sub.companyName || 'N/A'}`);
      if (!isLive) continue;

      try {
        console.log(`   📧 Sending personalized founder follow-up to ${sub.email}...`);
        const res = await sendSalesBlast2({
          to: sub.email,
          name: sub.name,
          companyName: sub.companyName,
          region: sub.region,
          industry: sub.industry,
          loginToken: sub.loginToken,
        });

        if (res.success) {
          console.log(`   ✅ Dispatched successfully! (Message ID: ${res.providerMessageId || 'OK'})`);
        } else {
          console.log(`   ❌ Dispatch skipped/failed: ${res.error || 'Unknown error'}`);
        }
      } catch (err: any) {
        console.error(`   ❌ Error sending to ${sub.email}:`, err.message);
      }
    }

    console.log('\n🏁 Follow-up run complete.');
    return;
  }

  // 2. High-Intent Closer Mode (e.g. Guruditya and queued hot leads)
  console.log('Evaluating high-intent candidates for personalized offer dispatch...');

  let candidates: SubscriberProfile[] = [];

  if (targetEmailArg) {
    const directMatch = subscribers.find((s) => s.email.toLowerCase().trim() === targetEmailArg);
    if (directMatch) {
      candidates = [directMatch];
    } else {
      console.log(`⚠️ Email ${targetEmailArg} not found in repository. Creating direct intake object for immediate dispatch.`);
      // Build candidate profile for Guruditya from verified intake
      candidates = [{
        email: targetEmailArg,
        name: 'Guruditya',
        companyName: 'Aster Antenna Networks',
        country: 'Canada',
        region: 'ON',
        industry: 'manufacturing',
        companySize: '1-9',
        fundingInterests: ['Grants', 'Loans'],
        fundingAmount: '$75,000 - $225,000',
        fundingPurpose: 'expansion_equipment',
        isSubscribed: true,
        readinessScore: 85,
        unsubscribeToken: 'unsub_direct_close_guruditya',
        engagementScore: 100,
      }];
    }
  } else {
    // Score all subscribers and find uncontacted high-intent ones (excluding internal/test emails)
    const scored = subscribers
      .filter((s) => !isAshwaniOrInternalTest(s.email) && !s.reportPurchased && !s.strategyReportPurchased)
      .map((sub) => ({
        sub,
        qual: SalesAgent.calculateMultiVariableQualificationScore(sub),
      }))
      .filter(({ qual }) => qual.totalScore >= 70)
      .sort((a, b) => b.qual.totalScore - a.qual.totalScore);

    candidates = scored.slice(0, batchSize).map((s) => s.sub);
  }

  console.log(`Identified ${candidates.length} hot leads for conversion.\n`);

  for (const sub of candidates) {
    const qual = SalesAgent.calculateMultiVariableQualificationScore(sub);
    const firstName = getFirstName(sub.name);
    const cleanedCompany = cleanCompanyName(sub.companyName);
    const companyLabel = cleanedCompany ? `for <strong>${cleanedCompany}</strong>` : 'for your business';
    const companySubject = cleanedCompany || 'Your Business';
    const rawFunding = (sub.fundingAmount || '').trim();
    const fundingGoal = (rawFunding && !/^(n\/a|not provided|none|null|undefined)$/i.test(rawFunding)) ? rawFunding : '$25,000 - $100,000+';
    const sectorLabel = cleanIndustryName(sub.industry);
    const regionLabel = cleanRegionName(sub.region);

    console.log('------------------------------------------------------------------');
    console.log(`Lead: ${sub.name || 'Founder'} <${sub.email}>`);
    console.log(`Company: ${companySubject} | Region: ${regionLabel} | Industry: ${sectorLabel}`);
    console.log(`Score: ${qual.totalScore}/100 | Recommended: ${qual.recommendedOffer.name} ($${qual.recommendedOffer.price})`);

    if (!isLive) {
      console.log(`[DRY RUN] Would send: "${qual.recommendedOffer.name}" email to ${sub.email}`);
      continue;
    }

    console.log(`🚀 [LIVE] Dispatching high-converting offer to ${sub.email}...`);

    const emailActionId = generateActionId('Sales');
    const token = sub.unsubscribeToken || `unsub_${Buffer.from(sub.email).toString('hex').substring(0, 16)}`;
    const unsubUrl = `https://www.fsidigital.ca/api/subscribe/unsubscribe?email=${encodeURIComponent(sub.email)}&token=${encodeURIComponent(token)}`;

    const emailSubject = `Funding Eligibility & Roadmap for ${companySubject} (${fundingGoal})`;
    const offer = qual.recommendedOffer;

    const emailHtml = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.6;max-width:600px;margin:0 auto;padding:24px 20px;">
        <p style="font-size:16px;margin:0 0 16px 0;">Hi ${firstName},</p>
        <p style="font-size:15px;margin:0 0 16px 0;">
          I personally reviewed the Canadian funding assessment you submitted ${companyLabel} targeting <strong>${fundingGoal}</strong> in ${regionLabel}.
        </p>
        <p style="font-size:15px;margin:0 0 16px 0;">
          Based on your profile in ${sectorLabel}, your project qualifies for active non-dilutive government funding programs. Most Canadian founders leave $30k–$80k on the table simply because they don't know how to legally stack federal grants with provincial tax credits.
        </p>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #2563eb;padding:20px;margin:24px 0;border-radius:6px;">
          <h3 style="margin:0 0 8px 0;color:#0f172a;font-size:18px;">${offer.name}</h3>
          <p style="margin:0 0 14px 0;color:#475569;font-size:14px;line-height:1.5;">
            Get immediate access to your tailored Canadian funding roadmap:
          </p>
          <ul style="margin:0 0 16px 0;padding-left:20px;font-size:14px;color:#334155;line-height:1.6;">
            <li><strong>Verified Program Alignment:</strong> Prioritized matching federal & provincial programs for your exact stage.</li>
            <li><strong>Capital Stacking Roadmap:</strong> The formula to combine wage subsidies, R&D credits, and equipment funding without breaching federal caps.</li>
            <li><strong>Submission Checklists & Rubrics:</strong> Avoid the top compliance mistakes that get 70% of self-filed grant applications delayed or rejected.</li>
            <li><strong>100% Fee Credit:</strong> The entire $${offer.price} is credited 100% toward our full-service grant writing if you ever want our team to prepare your proposals.</li>
          </ul>
          <div style="text-align:center;margin-top:18px;">
            <a href="${offer.url}?email=${encodeURIComponent(sub.email)}&utm_source=fsi_sales_agent&utm_medium=hot_lead_dispatch" style="background:#2563eb;color:#ffffff;padding:12px 28px;text-decoration:none;border-radius:6px;font-weight:600;display:inline-block;font-size:15px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
              Access Your Funding Blueprint &rarr;
            </a>
          </div>
        </div>
        <p style="font-size:14px;color:#475569;margin:0 0 16px 0;">
          Have a question about program deadlines or your company's eligibility? You can reply directly to this email—I personally review every response.
        </p>
        <p style="font-size:14px;margin:0 0 4px 0;">Best regards,</p>
        <p style="font-size:15px;font-weight:600;margin:0 0 2px 0;color:#0f172a;">Ashwani K.</p>
        <p style="font-size:13px;color:#64748b;margin:0;">Founder & CEO &bull; FSI Digital</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0;" />
        <p style="font-size:12px;color:#94a3b8;line-height:1.5;margin:0;">
          FSI Digital Ltd. &bull; 100 King Street West, Suite 5600, Toronto, ON M5X 1C9, Canada<br />
          You received this because you initiated a Canadian business funding assessment. <a href="${unsubUrl}" style="color:#64748b;text-decoration:underline;">Unsubscribe anytime</a>.
        </p>
      </div>
    `;

    const plainText = `Hi ${firstName},\n\nI reviewed your Canadian funding assessment for ${company} targeting ${fundingGoal}.\n\nBased on your profile, your project qualifies for active non-dilutive government programs. Most Canadian founders leave $30k–$80k on the table simply because they don't know how to legally stack federal grants with provincial tax credits.\n\nYour ${offer.name} ($${offer.price} USD) includes:\n- Verified matching federal & provincial programs for your exact stage\n- Capital Stacking formula (combining wage subsidies, R&D credits, and equipment funding without breaching federal caps)\n- Pre-submission checklists and rubrics to prevent delays\n- 100% Fee Credit: The entire $${offer.price} is credited 100% toward our full-service grant writing if you ever want our team to prepare your proposals.\n\nAccess your blueprint here: ${offer.url}?email=${encodeURIComponent(sub.email)}&utm_source=fsi_sales_agent&utm_medium=hot_lead_dispatch\n\nIf you have any questions, just reply directly to this email.\n\nBest regards,\nAshwani K.\nFounder & CEO, FSI Digital`;

    try {
      const dispatchResult = await sendEmail({
        to: sub.email,
        subject: emailSubject,
        html: emailHtml,
        text: plainText,
        tagType: `sales-agent-hot-close-${offer.id}`,
      });

      if (dispatchResult.success) {
        console.log(`   ✅ Dispatched successfully! (Provider Message ID: ${dispatchResult.providerMessageId || 'SENT'})`);

        // Record in Action Tracker
        await CommercialActionTracker.recordAction({
          actionId: emailActionId,
          agent: 'Sales',
          trigger: `Hot Lead Dispatcher (${qual.totalScore}/100)`,
          leadId: sub.email,
          leadEmail: sub.email,
          leadName: sub.name,
          company: sub.companyName,
          action: `Hot Lead Offer Email (${offer.name})`,
          product: offer.id,
          channel: 'Email',
          consent: 'Verified',
          status: 'DISPATCHED',
          result: 'DELIVERED',
          revenueUSD: offer.price,
          attribution: 'HOT_LEAD_DISPATCH',
          timestamp: new Date().toISOString(),
          providerMessageId: dispatchResult.providerMessageId,
        });
      } else {
        console.log(`   ❌ Dispatch failed: ${dispatchResult.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      console.error(`   ❌ Failed sending to ${sub.email}:`, err.message);
    }
  }

  console.log('\n===============================================================');
  console.log('🏁 CLOSING RUN FINISHED.');
  console.log('===============================================================');
}

main().catch(console.error);
