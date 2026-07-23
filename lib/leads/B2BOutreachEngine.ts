import { SubscriberRepository, type SubscriberProfile } from "./SubscriberRepository";
import { sendEmail } from "../emails/mailer";
import { getB2BEmailContent, type B2BOutreachStage } from "../emails/b2b-outreach-templates";

export interface B2BOutreachCandidate {
  lead: SubscriberProfile;
  nextStage: B2BOutreachStage | "completed";
  currentStage: string | null;
  priorityScore: number;
}

export class B2BOutreachEngine {
  // We only target highly qualified B2B leads with Behavior + ICP Priority Score >= 65
  static MINIMUM_PRIORITY_SCORE = 65;

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

    if (activity.calcRecoveryEmail1SentAt) {
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

  static async processDailyBatch(limit = 10, dryRun = false): Promise<{
    processed: number;
    sentCount: number;
    completedCount: number;
    errors: { email: string; stage: string; error: any }[];
    dryRun: boolean;
    skippedReason?: string;
  }> {
    // Business Hours Validation (9 AM - 5 PM EST)
    const etString = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const etDate = new Date(etString);
    const dayOfWeek = etDate.getDay(); 
    const hours = etDate.getHours();

    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isOutsideHours = hours < 9 || hours >= 17;

    if ((isWeekend || isOutsideHours) && !dryRun) {
      const reason = `Skipping campaign dispatch: Outside North American B2B business hours (EST Time: ${etDate.toLocaleTimeString()}).`;
      console.log(`⏳ ${reason}`);
      return { processed: 0, sentCount: 0, completedCount: 0, errors: [], dryRun, skippedReason: reason };
    }

    const allSubs = await SubscriberRepository.getAllSubscribers();
    const now = new Date();
    const candidates: B2BOutreachCandidate[] = [];
    let completedCount = 0;

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    for (const sub of allSubs) {
      if (!sub.isSubscribed || !sub.email || sub.reportPurchased) continue;

      // Calculate Priority Score
      const { score } = this.calculatePriorityScore(sub);
      if (score < this.MINIMUM_PRIORITY_SCORE) continue;

      let activity: any = {};
      try {
        if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
          activity = JSON.parse(sub.leadActivity);
        }
      } catch (e) {
        // ignore
      }

      const currentStage = activity.b2bOutreachStage || null;
      const lastSentStr = activity.b2bOutreachSentAt;

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
          activity.b2bOutreachSentAt = now.toISOString();
          try {
            if (!dryRun) {
              await SubscriberRepository.updateSubscriberPreferences(sub.email, {
                leadActivity: JSON.stringify(activity)
              });
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

    console.log(`🚀 [B2B Outreach] Batching ${batch.length} of ${candidates.length} candidates (dryRun: ${dryRun})...`);

    for (const cand of batch) {
      const { lead, nextStage } = cand;
      const email = lead.email;
      
      let success = false;
      let errorMsg: any = null;

      try {
        if (dryRun) {
          success = true;
          console.log(`[DRY RUN] Would send ${nextStage} outreach email to ${email} (Score: ${cand.priorityScore})`);
        } else {
          if (nextStage !== "completed") {
            const industry = lead.industry || 'N/A';
            const state = lead.region || 'ON';
            const content = getB2BEmailContent(nextStage, lead.name || 'Founder', industry, state);

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
          }
        }

        if (success && nextStage !== "completed") {
          let activity: any = {};
          try {
            if (lead.leadActivity && lead.leadActivity !== "N/A") {
              activity = JSON.parse(lead.leadActivity);
            }
          } catch (e) {}

          activity.b2bOutreachStage = nextStage;
          activity.b2bOutreachSentAt = now.toISOString();

          if (!dryRun) {
            await SubscriberRepository.updateSubscriberPreferences(email, {
              leadActivity: JSON.stringify(activity)
            });
            await sleep(800); // respects sheets API throttling
          }
          sentCount++;
          console.log(`✉️ B2B Outreach: Sent ${nextStage} to ${email}`);
        }
      } catch (err: any) {
        console.error(`B2B outreach failure for ${email} at stage ${nextStage}:`, err);
        errors.push({ email, stage: nextStage, error: err.message || err });
      }
    }

    return { processed: batch.length, sentCount, completedCount, errors, dryRun };
  }

  private static getNextStage(stage: string): string {
    if (stage === "b2b_day1") return "b2b_day4";
    if (stage === "b2b_day4") return "b2b_day7";
    return "completed";
  }
}
