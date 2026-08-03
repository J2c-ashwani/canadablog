/**
 * Growth OS — Phase 3: Authority Engine — Guardrail Engine
 * Automated quality gate that validates AI-generated outreach emails before sending.
 */

import {
  GuardrailResult,
  GuardrailCheck,
  GuardrailAction,
  OutreachDraft,
  KillSwitchState,
  KillSwitchThresholds
} from './types';

export interface GuardrailContext {
  recentlySentEmails: string[];
  bouncedDomains: string[];
  dailySentCount: number;
  effectiveDailyCap: number;
  forceOutsideHours?: boolean;
}

export class GuardrailEngine {
  private static SPAM_WORDS = [
    'free money', 'guaranteed', 'act now', 'limited time',
    'click here', 'urgent', 'congratulations', 'winner', 'no obligation'
  ];

  private static NOREPLY_EMAILS = [
    'noreply@', 'no-reply@', 'donotreply@', 'mailer-daemon@', 'bounce@'
  ];

  private static CTA_INDICATORS = [
    'would your team', 'open to', 'happy to', 'let me know', 'http://', 'https://', 'would you'
  ];

  private static PROFANITY_WORDS = [
    'fuck', 'shit', 'bitch', 'asshole', 'cunt', 'dick', 'bastard', 'damn'
  ];

  static getDefaultThresholds(): KillSwitchThresholds {
    return {
      maxBounceRatePercent: 5,
      maxSpamComplaintRatePercent: 0.1,
      minReplyRatePercent: 2,
      maxConsecutiveBounces: 10,
      evaluationWindowDays: 7
    };
  }

  static evaluateKillSwitch(state: KillSwitchState, thresholds?: KillSwitchThresholds): { shouldPause: boolean; reason: string } {
    const t = thresholds || this.getDefaultThresholds();

    if (state.metrics.bounceRatePercent > t.maxBounceRatePercent) {
      return { shouldPause: true, reason: `Bounce rate (${state.metrics.bounceRatePercent}%) exceeds threshold (${t.maxBounceRatePercent}%)` };
    }
    if (state.metrics.spamComplaintRatePercent > t.maxSpamComplaintRatePercent) {
      return { shouldPause: true, reason: `Spam complaint rate (${state.metrics.spamComplaintRatePercent}%) exceeds threshold (${t.maxSpamComplaintRatePercent}%)` };
    }
    if (state.metrics.totalSent >= 100 && state.metrics.replyRatePercent < t.minReplyRatePercent) {
      return { shouldPause: true, reason: `Reply rate (${state.metrics.replyRatePercent}%) below threshold (${t.minReplyRatePercent}%)` };
    }
    if (state.metrics.consecutiveBounces >= t.maxConsecutiveBounces) {
      return { shouldPause: true, reason: `Consecutive bounces (${state.metrics.consecutiveBounces}) exceeded limit (${t.maxConsecutiveBounces})` };
    }

    return { shouldPause: false, reason: '' };
  }

  static validateOutreach(draft: OutreachDraft, context: GuardrailContext): GuardrailResult {
    const checks: GuardrailCheck[] = [];
    const failedChecks: string[] = [];

    const addCheck = (name: string, passed: boolean, reason?: string) => {
      checks.push({ name, passed, reason });
      if (!passed) {
        failedChecks.push(name);
      }
    };

    const bodyLower = draft.body.toLowerCase();
    
    // Extract prospect email & name
    const prospectEmail = draft.prospectEmail || (draft as any).email || '';
    const prospectName = draft.prospectName || draft.personalizationTokens?.websiteName || '';

    // 1. Spam Word Detection
    const hasSpam = this.SPAM_WORDS.some(word => bodyLower.includes(word));
    addCheck('Spam Word Detection', !hasSpam, hasSpam ? 'Contains spam trigger words' : undefined);

    // 2. Personalization Present
    const websiteName = draft.personalizationTokens?.websiteName || prospectName || '';
    const specificRef = draft.personalizationTokens?.specificReference || '';
    const hasPersonalization = (websiteName && bodyLower.includes(websiteName.toLowerCase())) || 
                               (specificRef && bodyLower.includes(specificRef.toLowerCase())) ||
                               (prospectName && bodyLower.includes(prospectName.toLowerCase()));
    addCheck('Personalization Present', !!hasPersonalization, hasPersonalization ? undefined : 'Missing website name or specific content reference in body');

    // 3. Website Name Detected
    const websiteNameValid = websiteName.trim().length > 0 && bodyLower.includes(websiteName.toLowerCase());
    addCheck('Website Name Detected', websiteNameValid, websiteNameValid ? undefined : 'Website name is empty or not found in body');

    // 4. Valid Recipient Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isNoReply = prospectEmail ? this.NOREPLY_EMAILS.some(role => prospectEmail.toLowerCase().startsWith(role)) : false;
    const isValidEmail = prospectEmail ? (emailRegex.test(prospectEmail) && !isNoReply) : false;
    addCheck('Valid Recipient Email', isValidEmail, isValidEmail ? undefined : `Invalid email format or unmonitored address (${prospectEmail})`);

    // 5. Company/Site Name Exists
    const hasCompanyOrSite = prospectName.trim().length > 0 || websiteName.trim().length > 0;
    addCheck('Company/Site Name Exists', hasCompanyOrSite, hasCompanyOrSite ? undefined : 'Both prospectName and websiteName are empty');

    // 6. CTA Present
    const hasCta = this.CTA_INDICATORS.some(cta => bodyLower.includes(cta));
    addCheck('CTA Present', hasCta, hasCta ? undefined : 'Missing call-to-action indicator');

    // 7. Email Length (120 - 250 words)
    const wordCount = draft.body.split(/\s+/).filter(w => w.length > 0).length;
    const isLengthValid = wordCount >= 100 && wordCount <= 280;
    addCheck('Email Length', isLengthValid, isLengthValid ? undefined : `Email length (${wordCount} words) is outside 100-280 range`);

    // 8. No Duplicate Outreach
    const isDuplicate = prospectEmail ? context.recentlySentEmails.includes(prospectEmail) : false;
    addCheck('No Duplicate Outreach', !isDuplicate, isDuplicate ? 'Email was recently contacted' : undefined);

    // 9. Business Hours Only
    const now = new Date();
    const estDate = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      weekday: 'short',
      hour: 'numeric',
      hour12: false
    }).format(now);
    const parts = estDate.split(', ');
    const weekday = parts[0];
    const hour = parseInt(parts[1] || '0', 10);
    const isBusinessDay = !['Sat', 'Sun'].includes(weekday);
    const isBusinessHour = hour >= 9 && hour < 17;
    const isBusinessHours = context.forceOutsideHours || (isBusinessDay && isBusinessHour);
    addCheck('Business Hours Only', !!isBusinessHours, isBusinessHours ? undefined : 'Outside of Mon-Fri 9am-5pm EST business hours');

    // 10. Daily Cap Respected
    const respectsCap = context.dailySentCount < context.effectiveDailyCap;
    addCheck('Daily Cap Respected', respectsCap, respectsCap ? undefined : 'Daily send cap reached');

    // 11. Bounce History
    const domain = prospectEmail.includes('@') ? prospectEmail.split('@')[1].toLowerCase() : '';
    const hasBounced = domain ? context.bouncedDomains.includes(domain) : false;
    addCheck('Bounce History', !hasBounced, hasBounced ? 'Domain has a history of hard bounces' : undefined);

    // 12. Profanity/Tone Check
    const hasProfanity = this.PROFANITY_WORDS.some(word => bodyLower.includes(word));
    addCheck('Profanity/Tone Check', !hasProfanity, hasProfanity ? 'Contains profanity or unprofessional tone' : undefined);

    // 13. Unsubscribe Link Present
    const hasUnsubscribe = bodyLower.includes('unsubscribe') || bodyLower.includes('opt out') || bodyLower.includes('opt-out');
    addCheck('Unsubscribe Link Present', hasUnsubscribe, hasUnsubscribe ? undefined : 'Missing unsubscribe or opt-out link');

    // 14. FSI Asset Valid
    const assetUsed = draft.fsiAssetUsed || '';
    const isAssetValid = assetUsed.startsWith('/') || assetUsed.startsWith('https://www.fsidigital.ca');
    addCheck('FSI Asset Valid', isAssetValid, isAssetValid ? undefined : 'FSI asset URL must be relative or point to fsidigital.ca');

    // Determine Action
    let action: GuardrailAction = 'auto_send';
    if (failedChecks.length > 0) {
      const rejectTriggers = ['Spam Word Detection', 'No Duplicate Outreach', 'Bounce History', 'Profanity/Tone Check', 'Valid Recipient Email'];
      const requeueTriggers = ['Business Hours Only', 'Daily Cap Respected'];
      
      if (failedChecks.some(c => rejectTriggers.includes(c))) {
        action = 'auto_reject';
      } else if (failedChecks.some(c => requeueTriggers.includes(c))) {
        action = 'requeue';
      } else {
        action = 'exception_queue';
      }
    }

    return {
      passed: failedChecks.length === 0,
      checks,
      action,
      failedChecks
    };
  }
}
