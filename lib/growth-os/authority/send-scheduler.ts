/**
 * Growth OS — Phase 3: Authority Engine — Send Scheduler
 * Dynamic volume scheduler that determines how many emails to send based on available opportunities.
 */

import { AuthoritySendConfig, SendSchedulerState } from './types';

export class SendScheduler {
  static getDefaultConfig(): AuthoritySendConfig {
    return {
      dailyCap: 50,
      hourlyMax: 8,
      minIntervalMinutes: 5,
      maxIntervalMinutes: 12,
      businessHoursOnly: true,
      warmUp: {
        enabled: true,
        schedule: {
          week1: 5,
          week2: 15,
          week3: 30,
          week4: 50
        }
      }
    };
  }

  static calculateEffectiveCap(config: AuthoritySendConfig, warmUpStartDate: string | null): number {
    if (!config.warmUp.enabled || !warmUpStartDate) {
      return config.dailyCap;
    }

    const start = new Date(warmUpStartDate);
    const now = new Date();
    const diffTime = Math.max(0, now.getTime() - start.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const week = Math.floor(diffDays / 7) + 1;
    
    if (week === 1) return config.warmUp.schedule.week1 || 5;
    if (week === 2) return config.warmUp.schedule.week2 || 15;
    if (week === 3) return config.warmUp.schedule.week3 || 30;
    if (week >= 4) return config.warmUp.schedule.week4 || config.dailyCap;
    
    return config.dailyCap;
  }

  static getRandomizedDelay(config: AuthoritySendConfig): number {
    const minMs = config.minIntervalMinutes * 60 * 1000;
    const maxMs = config.maxIntervalMinutes * 60 * 1000;
    return Math.floor(Math.random() * (maxMs - minMs + 1) + minMs);
  }

  static isWithinBusinessHours(): { isHours: boolean; reason: string } {
    const now = new Date();
    const estDate = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      weekday: 'short',
      hour: 'numeric',
      hour12: false
    }).format(now);

    const parts = estDate.split(', ');
    if (parts.length !== 2) {
      return { isHours: false, reason: 'Failed to parse timezone format' };
    }

    const weekday = parts[0];
    const hour = parseInt(parts[1], 10);

    if (['Sat', 'Sun'].includes(weekday)) {
      return { isHours: false, reason: 'Outside business hours: Weekend' };
    }

    if (hour < 9 || hour >= 17) {
      return { isHours: false, reason: `Outside business hours: ${hour}:00 EST` };
    }

    return { isHours: true, reason: 'Within business hours' };
  }

  static calculateBatchSize(availableOpportunities: number, dailySentCount: number, effectiveCap: number): { sendNow: number; queueForLater: number } {
    const remainingCap = Math.max(0, effectiveCap - dailySentCount);
    const sendNow = Math.min(availableOpportunities, remainingCap);
    const queueForLater = availableOpportunities - sendNow;

    return { sendNow, queueForLater };
  }

  static getSchedulerState(
    dailySentCount: number, 
    config: AuthoritySendConfig, 
    warmUpStartDate: string | null, 
    queuedCount: number, 
    lastSentAt: string | null
  ): SendSchedulerState {
    const effectiveDailyCap = this.calculateEffectiveCap(config, warmUpStartDate);
    
    let warmUpWeek = 0;
    if (config.warmUp.enabled && warmUpStartDate) {
      const start = new Date(warmUpStartDate);
      const now = new Date();
      const diffTime = Math.max(0, now.getTime() - start.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      warmUpWeek = Math.floor(diffDays / 7) + 1;
      if (warmUpWeek > 4) warmUpWeek = 0; // 0 = complete
    }

    // Determine next available at based on lastSentAt + minimum delay
    let nextAvailableAt = null;
    if (lastSentAt) {
      const minMs = config.minIntervalMinutes * 60 * 1000;
      nextAvailableAt = new Date(new Date(lastSentAt).getTime() + minMs).toISOString();
    }

    return {
      dailySentCount,
      effectiveDailyCap,
      warmUpWeek,
      queuedCount,
      lastSentAt,
      nextAvailableAt
    };
  }
}
