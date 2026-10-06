/**
 * FSI Digital — AI Calling Compliance & Safety Guard
 *
 * Implements strict Canadian / CRTC & Telecommunications governance rules:
 * 1. Calling Hours Window:
 *    - Mon-Fri: 9:00 AM to 8:30 PM local prospect time
 *    - Sat-Sun: 9:00 AM to 5:00 PM local prospect time
 * 2. Maximum Attempts:
 *    - Max 3 outbound attempts per prospect lifetime
 * 3. Cooldown Pacing:
 *    - Minimum 24 hours between outbound attempts
 * 4. Do-Not-Call Enforcement:
 *    - Hard block if lead has doNotCall === true
 * 5. Standalone Consent:
 *    - Hard block without explicit consentToAiCall === true
 */

export const MAX_OUTBOUND_ATTEMPTS = 3;
export const MIN_COOLDOWN_HOURS = 24;

const PROVINCE_TIMEZONES: Record<string, string> = {
  // Pacific (UTC-7 or UTC-8)
  bc: 'America/Vancouver',
  britishcolumbia: 'America/Vancouver',
  yt: 'America/Whitehorse',
  yukon: 'America/Whitehorse',

  // Mountain (UTC-6 or UTC-7)
  ab: 'America/Edmonton',
  alberta: 'America/Edmonton',
  nt: 'America/Yellowknife',
  nwt: 'America/Yellowknife',

  // Central (UTC-5 or UTC-6)
  sk: 'America/Regina',
  saskatchewan: 'America/Regina',
  mb: 'America/Winnipeg',
  manitoba: 'America/Winnipeg',

  // Eastern (UTC-4 or UTC-5)
  on: 'America/Toronto',
  ontario: 'America/Toronto',
  qc: 'America/Montreal',
  quebec: 'America/Montreal',

  // Atlantic (UTC-3 or UTC-4)
  nb: 'America/Moncton',
  newbrunswick: 'America/Moncton',
  ns: 'America/Halifax',
  novascotia: 'America/Halifax',
  pe: 'America/Halifax',
  pei: 'America/Halifax',

  // Newfoundland (UTC-2.5 or UTC-3.5)
  nl: 'America/St_Johns',
  newfoundland: 'America/St_Johns',
};

/**
 * Returns the prospect's IANA timezone based on province or state.
 * Defaults to America/Toronto (Eastern Time) for Canada.
 */
export function getProspectTimezone(provinceOrState?: string): string {
  if (!provinceOrState) return 'America/Toronto';
  const clean = provinceOrState.toLowerCase().replace(/[^a-z]/g, '');
  return PROVINCE_TIMEZONES[clean] || 'America/Toronto';
}

/**
 * Checks whether the current time is within permitted telecommunications calling hours:
 * - Weekdays (Mon-Fri): 9:00 AM (09:00) to 8:30 PM (20:30)
 * - Weekends (Sat-Sun): 9:00 AM (09:00) to 5:00 PM (17:00)
 */
export function isWithinCallingWindow(
  provinceOrState?: string,
  now: Date = new Date()
): { allowed: boolean; reason?: string; localHour: number; localMinute: number; dayOfWeek: number } {
  const timeZone = getProspectTimezone(provinceOrState);

  // Format local date and time in the prospect's timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
  });

  const parts = formatter.formatToParts(now);
  const hourPart = parts.find((p) => p.type === 'hour')?.value;
  const minutePart = parts.find((p) => p.type === 'minute')?.value;
  const weekdayPart = parts.find((p) => p.type === 'weekday')?.value;

  const localHour = parseInt(hourPart || '0', 10);
  const localMinute = parseInt(minutePart || '0', 10);
  const isWeekend = weekdayPart === 'Sat' || weekdayPart === 'Sun';
  const dayOfWeek = isWeekend ? 0 : 1;

  const decimalHour = localHour + localMinute / 60;

  if (isWeekend) {
    // 9:00 AM (9.0) to 5:00 PM (17.0)
    if (decimalHour < 9.0 || decimalHour >= 17.0) {
      return {
        allowed: false,
        reason: `Outside permitted weekend calling hours (9:00 AM – 5:00 PM local time). Local time is ${String(localHour).padStart(2, '0')}:${String(localMinute).padStart(2, '0')} (${timeZone}).`,
        localHour,
        localMinute,
        dayOfWeek,
      };
    }
  } else {
    // 9:00 AM (9.0) to 8:30 PM (20.5)
    if (decimalHour < 9.0 || decimalHour >= 20.5) {
      return {
        allowed: false,
        reason: `Outside permitted weekday calling hours (9:00 AM – 8:30 PM local time). Local time is ${String(localHour).padStart(2, '0')}:${String(localMinute).padStart(2, '0')} (${timeZone}).`,
        localHour,
        localMinute,
        dayOfWeek,
      };
    }
  }

  return {
    allowed: true,
    localHour,
    localMinute,
    dayOfWeek,
  };
}

export interface EligibilityCheckParams {
  consentToAiCall?: boolean;
  doNotCall?: boolean;
  attemptCount?: number;
  lastAttemptAt?: string;
  state?: string;
  now?: Date;
}

/**
 * Validates all pre-activation safety guardrails before any outbound call is attempted.
 */
export function checkCallEligibility(params: EligibilityCheckParams): {
  eligible: boolean;
  reason?: string;
} {
  // 1. Standalone Consent Guard
  if (!params.consentToAiCall) {
    return { eligible: false, reason: 'Consent for AI voice call not provided by lead' };
  }

  // 2. Do-Not-Call (DNC) Registry Guard
  if (params.doNotCall) {
    return { eligible: false, reason: 'Lead has requested Do-Not-Call (DNC status active)' };
  }

  // 3. Maximum Attempts Limit Guard
  const attempts = params.attemptCount || 0;
  if (attempts >= MAX_OUTBOUND_ATTEMPTS) {
    return {
      eligible: false,
      reason: `Maximum outbound attempts limit reached (${attempts}/${MAX_OUTBOUND_ATTEMPTS})`,
    };
  }

  // 4. Cooldown Pacing Guard (24 hours minimum between attempts)
  if (params.lastAttemptAt) {
    const lastAttemptMs = new Date(params.lastAttemptAt).getTime();
    const currentMs = (params.now || new Date()).getTime();
    const hoursSinceLastAttempt = (currentMs - lastAttemptMs) / (1000 * 60 * 60);

    if (hoursSinceLastAttempt < MIN_COOLDOWN_HOURS) {
      const hoursRemaining = (MIN_COOLDOWN_HOURS - hoursSinceLastAttempt).toFixed(1);
      return {
        eligible: false,
        reason: `Outbound call in cooldown period (${hoursRemaining} hours remaining of ${MIN_COOLDOWN_HOURS}h mandatory interval)`,
      };
    }
  }

  // 5. Permitted Calling Window (CRTC / Timezone Governance)
  const windowCheck = isWithinCallingWindow(params.state, params.now);
  if (!windowCheck.allowed) {
    return {
      eligible: false,
      reason: windowCheck.reason,
    };
  }

  return { eligible: true };
}
