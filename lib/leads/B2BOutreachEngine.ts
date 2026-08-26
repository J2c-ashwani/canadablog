import { SubscriberRepository, type SubscriberProfile } from "./SubscriberRepository";
import { sendEmail } from "../emails/mailer";
import { getB2BEmailContent, type B2BOutreachStage } from "../emails/b2b-outreach-templates";
import { appendOutreachSentLeadToSheet } from "../google-sheets";
import { getAllPurchases } from '@/lib/products/purchase-store';
import { isProviderVerifiedPurchase } from '@/lib/growth-os/evidence-metrics';


export interface B2BOutreachCandidate {
  lead: SubscriberProfile;
  nextStage: B2BOutreachStage | "completed";
  currentStage: string | null;
  priorityScore: number;
}

export class B2BOutreachEngine {
  // Tier 1: Candidate Pool Filter Threshold (Score >= 65 to enter outreach pipeline evaluation)
  static MINIMUM_PRIORITY_SCORE = 65;
  
  // Tier 2: Smart Autopilot Direct Dispatch Threshold (Score >= 80 required for instant automated send; 65-79 held in Review Queue)
  static AUTOPILOT_DIRECT_SEND_SCORE = 80;

  static calculatePriorityScore(sub: SubscriberProfile): { score: number; signals: string[] } {
    let behaviorScore = 50; // Base for form submission
    let icpScore = 10; // Base

    const signals: string[] = ['Form submitted (+50)'];

    // 1. Behavior Scoring
    let activity: any = {};
    try {
      if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
        activity = JSON.parse(sub.leadActivity);
      }
    } catch (e) {
      // ignore
    }

    if (activity.calculatorCompletedAt) {
      behaviorScore += 30;
      signals.push('Used calculator (+30)');
    }
    // Check if they attempted checkout
    if (activity.checkoutStartedAt || sub.reportPurchased) {
      behaviorScore += 40;
      signals.push('Checkout viewed (+40)');
    }

    behaviorScore = Math.min(100, behaviorScore);

    // 2. ICP Scoring
    const country = sub.country ? sub.country.toUpperCase().trim() : 'N/A';
    if (country === 'CANADA' || country === 'CAN' || country === 'USA' || country === 'US') {
      icpScore += 30;
      signals.push(`Market: ${country} (+30)`);
    }

    const size = sub.companySize || 'N/A';
    if (size === '10-49') { icpScore += 20; signals.push('Team size 10-49 (+20)'); }
    else if (size === '50-99') { icpScore += 30; signals.push('Team size 50-99 (+30)'); }
    else if (size === '100-499' || size === '500+') { icpScore += 40; signals.push('Enterprise size (+40)'); }

    const ind = sub.industry ? sub.industry.toLowerCase().trim() : 'N/A';
    if (['tech', 'software', 'it'].some(x => ind.includes(x))) { icpScore += 25; signals.push('Tech sector (+25)'); }
    else if (['manufacturing', 'industrial'].some(x => ind.includes(x))) { icpScore += 25; signals.push('Mfg sector (+25)'); }
    else if (['healthcare', 'medical'].some(x => ind.includes(x))) { icpScore += 25; signals.push('Healthcare sector (+25)'); }
    else if (['agri', 'food'].some(x => ind.includes(x))) { icpScore += 20; signals.push('Agri sector (+20)'); }

    const amount = sub.fundingAmount || 'N/A';
    if (['100k', '500k'].some(x => amount.toLowerCase().includes(x))) { icpScore += 20; signals.push('Funding intent 100k-500k (+20)'); }
    else if (['1m', 'million'].some(x => amount.toLowerCase().includes(x))) { icpScore += 30; signals.push('Funding intent 1M+ (+30)'); }

    icpScore = Math.min(100, icpScore);

    const score = Math.round((behaviorScore + icpScore) / 2);
    return { score, signals };
  }

  static async processDailyBatch(limit = 10, dryRun = false, ignoreHours = false): Promise<{
    processed: number;
    sentCount: number;
    completedCount: number;
    errors: { email: string; stage: string; error: any }[];
    receipts: Array<{ email: string; stage: string; provider: string; providerMessageId: string; acceptedAt: string }>;
    dryRun: boolean;
    skippedReason?: string;
  }> {
    // Business Hours Validation (9 AM - 5 PM EST, Monday-Friday)
    const etString = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const etDate = new Date(etString);
    const dayOfWeek = etDate.getDay(); 
    const hours = etDate.getHours();

    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isOutsideHours = hours < 9 || hours >= 17;

    if ((isWeekend || isOutsideHours) && !dryRun && !ignoreHours) {
      const reason = `Skipping campaign dispatch: Outside North American B2B business hours (EST Time: ${etDate.toLocaleTimeString()}). Pass ?force=true to override.`;
      console.log(`⏳ ${reason}`);
      return { processed: 0, sentCount: 0, completedCount: 0, errors: [], receipts: [], dryRun, skippedReason: reason };
    }

    const allSubs = await SubscriberRepository.getAllSubscribers();
    const verifiedBuyerEmails = new Set(
      (await getAllPurchases())
        .filter(isProviderVerifiedPurchase)
        .map((purchase) => purchase.email.toLowerCase().trim())
    );
    const now = new Date();
    const candidates: B2BOutreachCandidate[] = [];
    let completedCount = 0;

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    for (const sub of allSubs) {
      if (!sub.isSubscribed || !sub.email || verifiedBuyerEmails.has(sub.email.toLowerCase().trim())) continue;

      // Calculate Priority Score
      const { score } = this.calculatePriorityScore(sub);
      if (score < this.AUTOPILOT_DIRECT_SEND_SCORE) continue;

      let activity: any = {};
      try {
        if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
          activity = JSON.parse(sub.leadActivity);
        }
      } catch (e) {
        // ignore
      }

      const currentStage = activity.b2bOutreachStage || null;
      const lastSentStr = activity.b2bOutreachAcceptedAt;

      // Legacy stages without a provider receipt are not reliable enough to
      // advance or restart automatically; leave them untouched for audit.
      if (currentStage && !activity.b2bOutreachProviderMessageId) continue;

      if (currentStage === "completed") continue;

      if (!currentStage) {
        // Ready for Day 1 outreach
        candidates.push({ lead: sub, nextStage: "b2b_day1", currentStage, priorityScore: score });
      } else {
        if (!lastSentStr) {
          candidates.push({ lead: sub, nextStage: this.getNextStage(currentStage) as any, currentStage, priorityScore: score });
          continue;
        }

        const lastSent = new Date(lastSentStr);
        if (isNaN(lastSent.getTime())) {
          candidates.push({ lead: sub, nextStage: this.getNextStage(currentStage) as any, currentStage, priorityScore: score });
          continue;
        }

        const elapsedDays = (now.getTime() - lastSent.getTime()) / (1000 * 60 * 60 * 24);

        if (currentStage === "b2b_day1" && elapsedDays >= 3) {
          candidates.push({ lead: sub, nextStage: "b2b_day4", currentStage, priorityScore: score });
        } else if (currentStage === "b2b_day4" && elapsedDays >= 3) {
          candidates.push({ lead: sub, nextStage: "b2b_day7", currentStage, priorityScore: score });
        } else if (currentStage === "b2b_day7" && elapsedDays >= 3) {
          // Complete campaign stage
          activity.b2bOutreachStage = "completed";
          activity.b2bOutreachAcceptedAt = now.toISOString();
          try {
            if (!dryRun) {
              const completionWrite = await SubscriberRepository.updateSubscriberPreferences(sub.email, {
                leadActivity: JSON.stringify(activity)
              });
              if (!completionWrite.success) throw completionWrite.error || new Error('Campaign completion state could not be persisted.');
              await sleep(800);
            }
            completedCount++;
            console.log(`🔒 Completed B2B Outreach Campaign for ${sub.email}`);
          } catch (err) {
            console.error(`Failed to mark B2B outreach completed for ${sub.email}:`, err);
          }
        }
      }
    }

    // Sort: Prioritize higher scores
    candidates.sort((a, b) => b.priorityScore - a.priorityScore);

    const batch = candidates.slice(0, limit);
    let sentCount = 0;
    const errors: { email: string; stage: string; error: any }[] = [];
    const receipts: Array<{ email: string; stage: string; provider: string; providerMessageId: string; acceptedAt: string }> = [];

    console.log(`🚀 [B2B Outreach] Batching ${batch.length} of ${candidates.length} candidates (dryRun: ${dryRun})...`);

    for (const cand of batch) {
      const { lead, nextStage } = cand;
      if (nextStage === "completed") continue;
      const email = lead.email;
      
      let success = false;
      let errorMsg: any = null;

      try {
        const industry = lead.industry || 'N/A';
        const state = lead.region || 'ON';
        const content = getB2BEmailContent(nextStage, lead.name || 'Founder', industry, state, 'general', lead.unsubscribeToken);
        let provider = 'dry-run';
        let providerMessageId = '';

        if (dryRun) {
          success = true;
          console.log(`[DRY RUN] Would send ${nextStage} outreach email to ${email} (Score: ${cand.priorityScore})`);
        } else {
          const res = await sendEmail({
            to: email,
            subject: content.subject,
            html: content.html,
            text: content.text,
            tagType: nextStage,
            companyName: lead.companyName,
            forceResend: true
          });
          success = res.success;
          errorMsg = res.error;
          provider = res.provider || '';
          providerMessageId = res.providerMessageId || '';
          if (success && !providerMessageId) {
            success = false;
            errorMsg = 'Provider accepted the request without returning a durable message ID.';
          }
        }

        if (success) {
          let activity: any = {};
          try {
            if (lead.leadActivity && lead.leadActivity !== "N/A") {
              activity = JSON.parse(lead.leadActivity);
            }
          } catch (e) {}

          activity.b2bOutreachStage = nextStage;
          activity.b2bOutreachAcceptedAt = now.toISOString();
          activity.b2bOutreachProvider = provider;
          activity.b2bOutreachProviderMessageId = providerMessageId;

          if (!dryRun) {
            const subscriberWrite = await SubscriberRepository.updateSubscriberPreferences(email, {
              leadActivity: JSON.stringify(activity)
            });
            if (!subscriberWrite.success) throw new Error('Provider accepted the email, but the CRM stage could not be persisted.');

            // Auto-append sent lead directly to "Outreach Sent Leads" tab in Google Sheets
            try {
              const outreachWrite = await appendOutreachSentLeadToSheet({
                timestamp: now.toISOString(),
                companyName: lead.companyName || lead.name || "N/A",
                domain: lead.website || "N/A",
                email: email,
                decisionMaker: lead.name || "Founder",
                intentScore: cand.priorityScore,
                fundingConfidencePct: cand.priorityScore,
                outreachStage: nextStage,
                subject: content.subject,
                recommendedGuides: "SR&ED / IRAP Playbook",
                status: "PROVIDER_ACCEPTED",
                provider,
                providerMessageId,
                providerAcceptance: "accepted",
              });
              if (!outreachWrite.success) throw outreachWrite.error || new Error('Outreach receipt write failed.');
            } catch (sheetErr: any) {
              throw new Error(`Provider accepted the email, but the outreach receipt could not be persisted: ${sheetErr?.message || sheetErr}`);
            }

            await sleep(800); // respects sheets API throttling
          }
          sentCount++;
          if (!dryRun) receipts.push({ email, stage: nextStage, provider, providerMessageId, acceptedAt: now.toISOString() });
          console.log(`✉️ B2B Outreach: Provider accepted ${nextStage} for ${email}`);
        } else if (!dryRun) {
          errors.push({ email, stage: nextStage, error: errorMsg || 'Email provider rejected the message.' });
        }

      } catch (err: any) {
        console.error(`B2B outreach failure for ${email} at stage ${nextStage}:`, err);
        errors.push({ email, stage: nextStage, error: err.message || err });
      }
    }

    return { processed: batch.length, sentCount, completedCount, errors, receipts, dryRun };
  }

  private static getNextStage(stage: string): string {
    if (stage === "b2b_day1") return "b2b_day4";
    if (stage === "b2b_day4") return "b2b_day7";
    return "completed";
  }
}
