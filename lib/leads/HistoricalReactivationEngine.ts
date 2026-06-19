import { SubscriberRepository, type SubscriberProfile } from "./SubscriberRepository"
import {
  sendFundingMatchUpdateEmail,
  sendReactivationReminderEmail,
  sendReactivationCaseStudyEmail,
  sendReactivationLastChanceEmail,
  sendReactivationFounderEmail,
  sendReactivationFinalCloseEmail
} from "../emails/newsletter-marketing"

export interface ReactivationCandidate {
  lead: SubscriberProfile;
  nextStage: "day0" | "day2" | "day5" | "day8" | "day11" | "day14";
  currentStage: string | null;
}

export class HistoricalReactivationEngine {
  // June 16, 2026 is the cutoff date before which all leads are considered historical
  static CUTOFF_DATE = new Date("2026-06-16T00:00:00.000Z");

  static async processDailyBatch(limit = 70, dryRun = false): Promise<{
    processed: number;
    sent: {
      day0: number;
      day2: number;
      day5: number;
      day8: number;
      day11: number;
      day14: number;
    };
    completedCount: number;
    errors: { email: string; stage: string; error: any }[];
    dryRun: boolean;
  }> {
    const allSubs = await SubscriberRepository.getAllSubscribers();
    const now = new Date();
    
    const candidates: ReactivationCandidate[] = [];
    let completedCount = 0;
    
    // We will do a sleep delay helper to avoid hitting Google Sheets API 429 rate limit
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    for (const sub of allSubs) {
      // 1. Must be subscribed
      if (!sub.isSubscribed || !sub.email) continue;
      
      // 2. Must not have purchased the report
      if (sub.reportPurchased) continue;
      
      // 3. Must have signed up before the cutoff date
      if (!sub.timestamp) continue;
      const signupDate = new Date(sub.timestamp);
      if (isNaN(signupDate.getTime()) || signupDate >= this.CUTOFF_DATE) continue;
      
      // 4. Parse activity
      let activity: any = {};
      try {
        if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
          activity = JSON.parse(sub.leadActivity);
        }
      } catch (e) {
        // ignore
      }
      
      const currentStage = activity.reactivationStage || null;
      const lastSentStr = activity.reactivationSentAt;
      
      if (currentStage === "completed") {
        continue; // Already finished the campaign
      }
      
      if (!currentStage) {
        // Ready for Day 0
        candidates.push({ lead: sub, nextStage: "day0", currentStage });
      } else {
        if (!lastSentStr) {
          candidates.push({ lead: sub, nextStage: this.getNextStage(currentStage) as any, currentStage });
          continue;
        }
        
        const lastSent = new Date(lastSentStr);
        if (isNaN(lastSent.getTime())) {
          candidates.push({ lead: sub, nextStage: this.getNextStage(currentStage) as any, currentStage });
          continue;
        }
        
        const elapsedDays = (now.getTime() - lastSent.getTime()) / (1000 * 60 * 60 * 24);
        
        if (currentStage === "day0" && elapsedDays >= 2) {
          candidates.push({ lead: sub, nextStage: "day2", currentStage });
        } else if (currentStage === "day2" && elapsedDays >= 3) {
          candidates.push({ lead: sub, nextStage: "day5", currentStage });
        } else if (currentStage === "day5" && elapsedDays >= 3) {
          candidates.push({ lead: sub, nextStage: "day8", currentStage });
        } else if (currentStage === "day8" && elapsedDays >= 3) {
          candidates.push({ lead: sub, nextStage: "day11", currentStage });
        } else if (currentStage === "day11" && elapsedDays >= 3) {
          candidates.push({ lead: sub, nextStage: "day14", currentStage });
        } else if (currentStage === "day14" && elapsedDays >= 1) {
          // No email is sent to transition from day14 to completed.
          // We can update the row immediately to completed without consuming daily Resend quota.
          activity.reactivationStage = "completed";
          activity.reactivationSentAt = now.toISOString();
          try {
            if (!dryRun) {
              await SubscriberRepository.updateSubscriberPreferences(sub.email, {
                leadActivity: JSON.stringify(activity)
              });
              // Small cooldown delay between sheet updates to respect rate limits
              await sleep(800);
            }
            completedCount++;
            console.log(`${dryRun ? "[DRY RUN] Would mark" : "🔒 Marked"} reactivation campaign completed for ${sub.email}`);
          } catch (err) {
            console.error(`Failed to mark reactivation completed for ${sub.email}:`, err);
          }
        }
      }
    }
    
    // Sort logic: Prioritize active sequences (those with a sent date) to keep them on schedule,
    // sorting by the oldest sent date first, followed by new leads (no sent date) at the end.
    candidates.sort((a, b) => {
      const actA = a.lead.leadActivity ? JSON.parse(a.lead.leadActivity) : {};
      const actB = b.lead.leadActivity ? JSON.parse(b.lead.leadActivity) : {};
      const timeA = actA.reactivationSentAt;
      const timeB = actB.reactivationSentAt;
      
      if (timeA && !timeB) return -1;
      if (!timeA && timeB) return 1;
      if (!timeA && !timeB) return 0;
      return new Date(timeA).getTime() - new Date(timeB).getTime();
    });
    
    // Slice up to the limit of emails allowed for today
    const batch = candidates.slice(0, limit);
    
    let day0Count = 0;
    let day2Count = 0;
    let day5Count = 0;
    let day8Count = 0;
    let day11Count = 0;
    let day14Count = 0;
    const errors: { email: string; stage: string; error: any }[] = [];
    
    console.log(`${dryRun ? "[DRY RUN] " : ""}🚀 [Reactivation Batch] Processing ${batch.length} leads out of ${candidates.length} ready candidates...`);
    
    // Process sequentially with a delay to completely avoid Google Sheets API rate limit errors (429)
    for (const candidate of batch) {
      const { lead, nextStage } = candidate;
      const email = lead.email;
      
      let success = false;
      let errorMsg: any = null;
      
      try {
        if (dryRun) {
          success = true;
          console.log(`[DRY RUN] Would send ${nextStage} email to ${email} (Name: ${lead.name || "Founder"}, Company: ${lead.companyName || "N/A"})`);
        } else {
          if (nextStage === "day0") {
            const res = await sendFundingMatchUpdateEmail({
              to: email,
              name: lead.name,
              loginToken: lead.loginToken || "",
              companyName: lead.companyName,
              newProgramsCount: 3,
              newProgramsList: ["Scale-Up Support Program", "Technology Growth Fund", "Provincial Job Grant"],
              forceResend: true
            });
            success = res.success;
            errorMsg = res.error;
          } else if (nextStage === "day2") {
            const res = await sendReactivationReminderEmail({
              to: email,
              name: lead.name,
              loginToken: lead.loginToken || "",
              companyName: lead.companyName,
              region: lead.region,
              industry: lead.industry,
              businessStage: lead.businessStage,
              fundingInterests: lead.fundingInterests,
              forceResend: true
            });
            success = res.success;
            errorMsg = res.error;
          } else if (nextStage === "day5") {
            const res = await sendReactivationCaseStudyEmail({
              to: email,
              name: lead.name,
              loginToken: lead.loginToken || "",
              companyName: lead.companyName,
              region: lead.region,
              industry: lead.industry,
              businessStage: lead.businessStage,
              fundingInterests: lead.fundingInterests,
              forceResend: true
            });
            success = res.success;
            errorMsg = res.error;
          } else if (nextStage === "day8") {
            const res = await sendReactivationLastChanceEmail({
              to: email,
              name: lead.name,
              loginToken: lead.loginToken || "",
              companyName: lead.companyName,
              region: lead.region,
              industry: lead.industry,
              businessStage: lead.businessStage,
              fundingInterests: lead.fundingInterests,
              forceResend: true
            });
            success = res.success;
            errorMsg = res.error;
          } else if (nextStage === "day11") {
            const res = await sendReactivationFounderEmail({
              to: email,
              name: lead.name,
              loginToken: lead.loginToken || "",
              companyName: lead.companyName,
              region: lead.region,
              industry: lead.industry,
              businessStage: lead.businessStage,
              fundingInterests: lead.fundingInterests,
              forceResend: true
            });
            success = res.success;
            errorMsg = res.error;
          } else if (nextStage === "day14") {
            const res = await sendReactivationFinalCloseEmail({
              to: email,
              name: lead.name,
              loginToken: lead.loginToken || "",
              companyName: lead.companyName,
              region: lead.region,
              industry: lead.industry,
              businessStage: lead.businessStage,
              fundingInterests: lead.fundingInterests,
              forceResend: true
            });
            success = res.success;
            errorMsg = res.error;
          }
        }
        
        if (success) {
          let activity: any = {};
          try {
            if (lead.leadActivity && lead.leadActivity !== "N/A" && lead.leadActivity !== "{}") {
              activity = JSON.parse(lead.leadActivity);
            }
          } catch (e) {
            // ignore
          }
          
          activity.reactivationStage = nextStage;
          activity.reactivationSentAt = new Date().toISOString();
          
          if (!dryRun) {
            await SubscriberRepository.updateSubscriberPreferences(email, {
              leadActivity: JSON.stringify(activity)
            });
            console.log(`✉️ Successful reactivation email (${nextStage}) sent to ${email}`);
          }
          
          if (nextStage === "day0") day0Count++;
          else if (nextStage === "day2") day2Count++;
          else if (nextStage === "day5") day5Count++;
          else if (nextStage === "day8") day8Count++;
          else if (nextStage === "day11") day11Count++;
          else if (nextStage === "day14") day14Count++;
          
        } else {
          errors.push({ email, stage: nextStage, error: errorMsg || "Unknown error" });
          console.error(`❌ Failed to send reactivation email (${nextStage}) to ${email}:`, errorMsg);
        }
      } catch (err) {
        errors.push({ email, stage: nextStage, error: err });
        console.error(`❌ Exception sending reactivation email (${nextStage}) to ${email}:`, err);
      }
      
      // Delay for 800ms between leads to ensure we stay safely within the 60 requests/minute Google Sheets limit
      if (!dryRun) {
        await sleep(800);
      }
    }
    
    return {
      processed: batch.length,
      sent: {
        day0: day0Count,
        day2: day2Count,
        day5: day5Count,
        day8: day8Count,
        day11: day11Count,
        day14: day14Count
      },
      completedCount,
      errors,
      dryRun
    };
  }
  
  private static getNextStage(stage: string): string {
    if (stage === "day0") return "day2";
    if (stage === "day2") return "day5";
    if (stage === "day5") return "day8";
    if (stage === "day8") return "day11";
    if (stage === "day11") return "day14";
    return "completed";
  }
}
