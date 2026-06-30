import { SubscriberRepository, type SubscriberProfile } from "./SubscriberRepository";
import {
  sendAlertWelcomeEmail,
  sendAlertOpportunityEmail,
  sendAlertMatchReportEmail,
  sendAlertActionPlanEmail,
  sendAlertSuccessEmail,
  sendAlertAuditEmail,
  sendAlertAuditFollowupEmail,
  sendAlertReferralEmail
} from "../emails/alert-nurture";

export interface AlertNurtureCandidate {
  lead: SubscriberProfile;
  nextStage: "welcome" | "opp" | "report" | "plan" | "success" | "audit" | "audit_followup" | "referral";
  currentStage: string;
}

export class AlertNurtureEngine {
  static async processDailyBatch(limit = 50, dryRun = false): Promise<{
    processed: number;
    sent: {
      welcome: number;
      opp: number;
      report: number;
      plan: number;
      success: number;
      audit: number;
      audit_followup: number;
      referral: number;
    };
    completedCount: number;
    errors: { email: string; stage: string; error: any }[];
    dryRun: boolean;
  }> {
    const allSubs = await SubscriberRepository.getAllSubscribers();
    const now = new Date();
    
    const candidates: AlertNurtureCandidate[] = [];
    let completedCount = 0;
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    for (const sub of allSubs) {
      if (!sub.isSubscribed || !sub.email) continue;
      
      // Parse activity JSON
      let activity: any = {};
      try {
        if (sub.leadActivity && sub.leadActivity !== "N/A" && sub.leadActivity !== "{}") {
          activity = JSON.parse(sub.leadActivity);
        }
      } catch (e) {
        // ignore
      }
      
      // Only process alert subscribers
      if (!activity.alertSubscribed) continue;
      
      const currentStage = activity.alertNurtureStage || null;
      const lastSentStr = activity.alertNurtureSentAt || activity.alertDate;
      
      if (currentStage === "completed") {
        continue;
      }
      
      // If no nurture stage is set but alertDate exists, they need the welcome email first
      if (!currentStage) {
        candidates.push({ lead: sub, nextStage: "welcome", currentStage: "none" });
        continue;
      }
      
      if (!lastSentStr) {
        // Fallback if timestamp is missing
        candidates.push({ lead: sub, nextStage: this.getNextStage(currentStage) as any, currentStage });
        continue;
      }
      
      const lastSent = new Date(lastSentStr);
      if (isNaN(lastSent.getTime())) {
        candidates.push({ lead: sub, nextStage: this.getNextStage(currentStage) as any, currentStage });
        continue;
      }
      
      const elapsedDays = (now.getTime() - lastSent.getTime()) / (1000 * 60 * 60 * 24);
      
      if (currentStage === "welcome" && elapsedDays >= 2) {
        // Skip further pitches if they already bought both
        if (sub.reportPurchased && sub.strategyReportPurchased) {
          activity.alertNurtureStage = "completed";
          activity.alertNurtureSentAt = now.toISOString();
          if (!dryRun) {
            await SubscriberRepository.updateSubscriberPreferences(sub.email, {
              leadActivity: JSON.stringify(activity)
            });
            await sleep(800);
          }
          completedCount++;
          continue;
        }
        candidates.push({ lead: sub, nextStage: "opp", currentStage });
      } else if (currentStage === "opp" && elapsedDays >= 4) {
        if (sub.reportPurchased) {
          candidates.push({ lead: sub, nextStage: "plan", currentStage });
        } else {
          candidates.push({ lead: sub, nextStage: "report", currentStage });
        }
      } else if (currentStage === "report" && elapsedDays >= 7) {
        if (sub.strategyReportPurchased) {
          candidates.push({ lead: sub, nextStage: "success", currentStage });
        } else {
          candidates.push({ lead: sub, nextStage: "plan", currentStage });
        }
      } else if (currentStage === "plan" && elapsedDays >= 7) {
        candidates.push({ lead: sub, nextStage: "success", currentStage });
      } else if (currentStage === "success" && elapsedDays >= 9) {
        candidates.push({ lead: sub, nextStage: "audit", currentStage });
      } else if (currentStage === "audit" && elapsedDays >= 15) {
        candidates.push({ lead: sub, nextStage: "audit_followup", currentStage });
      } else if (currentStage === "audit_followup" && elapsedDays >= 7) {
        candidates.push({ lead: sub, nextStage: "referral", currentStage });
      } else if (currentStage === "referral" && elapsedDays >= 1) {
        activity.alertNurtureStage = "completed";
        activity.alertNurtureSentAt = now.toISOString();
        try {
          if (!dryRun) {
            await SubscriberRepository.updateSubscriberPreferences(sub.email, {
              leadActivity: JSON.stringify(activity)
            });
            await sleep(800);
          }
          completedCount++;
          console.log(`🔒 Marked alerts nurture campaign completed for ${sub.email}`);
        } catch (err) {
          console.error(`Failed to mark alerts nurture completed for ${sub.email}:`, err);
        }
      }
    }
    
    // Sort logic: oldest sent date first
    candidates.sort((a, b) => {
      const actA = a.lead.leadActivity ? JSON.parse(a.lead.leadActivity) : {};
      const actB = b.lead.leadActivity ? JSON.parse(b.lead.leadActivity) : {};
      const timeA = actA.alertNurtureSentAt || actA.alertDate;
      const timeB = actB.alertNurtureSentAt || actB.alertDate;
      if (timeA && !timeB) return -1;
      if (!timeA && timeB) return 1;
      if (!timeA && !timeB) return 0;
      return new Date(timeA).getTime() - new Date(timeB).getTime();
    });
    
    const batch = candidates.slice(0, limit);
    
    let welcomeCount = 0;
    let oppCount = 0;
    let reportCount = 0;
    let planCount = 0;
    let successCount = 0;
    let auditCount = 0;
    let auditFollowupCount = 0;
    let referralCount = 0;
    const errors: { email: string; stage: string; error: any }[] = [];
    
    console.log(`🚀 [Alert Nurture Batch] Processing ${batch.length} candidate subscribers...`);
    
    // ... loop processing ... (omitted for mapping, but this is setup code)
    // Wait, the variables must be declared before candidate loop. We should do that.
    // Let's replace the counts declaration and return block properly.
    
    for (const candidate of batch) {
      const { lead, nextStage } = candidate;
      const email = lead.email;
      
      let success = false;
      let errorMsg: any = null;
      
      try {
        const province = lead.region || "ON";
        const industry = lead.industry || "other";
        
        if (dryRun) {
          success = true;
          console.log(`[DRY RUN] Would send alert nurture ${nextStage} email to ${email}`);
        } else {
          if (nextStage === "welcome") {
            const res = await sendAlertWelcomeEmail({
              to: email,
              name: lead.name,
              loginToken: lead.loginToken || "",
              province,
              industry
            });
            success = res.success;
            errorMsg = res.error;
          } else if (nextStage === "opp") {
            const res = await sendAlertOpportunityEmail({
              to: email,
              name: lead.name,
              loginToken: lead.loginToken || "",
              province,
              industry
            });
            success = res.success;
            errorMsg = res.error;
          } else if (nextStage === "report") {
            const res = await sendAlertMatchReportEmail({
              to: email,
              name: lead.name,
              loginToken: lead.loginToken || "",
              province,
              industry
            });
            success = res.success;
            errorMsg = res.error;
          } else if (nextStage === "plan") {
            const res = await sendAlertActionPlanEmail({
              to: email,
              name: lead.name,
              loginToken: lead.loginToken || "",
              province,
              industry
            });
            success = res.success;
            errorMsg = res.error;
          } else if (nextStage === "success") {
            const res = await sendAlertSuccessEmail({
              to: email,
              name: lead.name,
              loginToken: lead.loginToken || "",
              province,
              industry
            });
            success = res.success;
            errorMsg = res.error;
          } else if (nextStage === "audit") {
            const res = await sendAlertAuditEmail({
              to: email,
              name: lead.name,
              loginToken: lead.loginToken || "",
              province,
              industry
            });
            success = res.success;
            errorMsg = res.error;
          } else if (nextStage === "audit_followup") {
            const res = await sendAlertAuditFollowupEmail({
              to: email,
              name: lead.name,
              loginToken: lead.loginToken || "",
              province,
              industry
            });
            success = res.success;
            errorMsg = res.error;
          } else if (nextStage === "referral") {
            const res = await sendAlertReferralEmail({
              to: email,
              name: lead.name,
              loginToken: lead.loginToken || "",
              province,
              industry
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
          
          activity.alertNurtureStage = nextStage;
          activity.alertNurtureSentAt = new Date().toISOString();
          
          if (!dryRun) {
            await SubscriberRepository.updateSubscriberPreferences(email, {
              leadActivity: JSON.stringify(activity)
            });
            console.log(`✉️ Alert nurture email (${nextStage}) sent to ${email}`);
          }
          
          if (nextStage === "welcome") welcomeCount++;
          else if (nextStage === "opp") oppCount++;
          else if (nextStage === "report") reportCount++;
          else if (nextStage === "plan") planCount++;
          else if (nextStage === "success") successCount++;
          else if (nextStage === "audit") auditCount++;
          else if (nextStage === "audit_followup") auditFollowupCount++;
          else if (nextStage === "referral") referralCount++;
          
        } else {
          errors.push({ email, stage: nextStage, error: errorMsg || "Unknown error" });
          console.error(`❌ Failed to send alert nurture email (${nextStage}) to ${email}:`, errorMsg);
        }
      } catch (err) {
        errors.push({ email, stage: nextStage, error: err });
        console.error(`❌ Exception sending alert nurture email (${nextStage}) to ${email}:`, err);
      }
      
      if (!dryRun) {
        await sleep(800);
      }
    }
    
    return {
      processed: batch.length,
      sent: {
        welcome: welcomeCount,
        opp: oppCount,
        report: reportCount,
        plan: planCount,
        success: successCount,
        audit: auditCount,
        audit_followup: auditFollowupCount,
        referral: referralCount
      },
      completedCount,
      errors,
      dryRun
    };
  }
  
  private static getNextStage(stage: string): string {
    if (stage === "welcome") return "opp";
    if (stage === "opp") return "report";
    if (stage === "report") return "plan";
    if (stage === "plan") return "success";
    if (stage === "success") return "audit";
    if (stage === "audit") return "audit_followup";
    if (stage === "audit_followup") return "referral";
    return "completed";
  }
}
