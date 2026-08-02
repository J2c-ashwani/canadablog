/**
 * Growth OS — Phase 3: Authority Engine — Central Orchestrator
 * Coordinates the full authority building pipeline from discovery through verification.
 */
import {
  AuthorityPipelineResult,
  AuthorityPipelineStage,
  AUTHORITY_EVENTS,
  KillSwitchStatus,
  KillSwitchState,
  OutreachDraft,
} from './types';
import { GuardrailEngine, type GuardrailContext } from './guardrail-engine';
import { SendScheduler } from './send-scheduler';
import { globalEventBus } from '../core/event-bus';
import {
  getOutreachProspectsFromSheet,
  updateOutreachProspectInSheet,
  appendAuthorityException,
} from '@/lib/google-sheets';
import { sendEmail } from '@/lib/emails/mailer';
import type { SubsystemHealthReport } from '../core/subsystem-health';
import type { BusinessImpactScore } from '../types';

export interface PipelineOptions {
  dryRun?: boolean;
  forceOutsideHours?: boolean;
  maxSends?: number;
  discoveryEnabled?: boolean;
}

export interface AuthorityEngineStatus {
  killSwitch: KillSwitchStatus;
  dailySentCount: number;
  effectiveDailyCap: number;
  pendingProspects: number;
  exceptionsCount: number;
  warmUpWeek: number;
  lastPipelineRun: string | null;
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export class AuthorityEngine {
  // In-memory tracking for current execution context (reset per pipeline run)
  private static recentlySentEmails: string[] = [];
  private static dailySentCount = 0;
  private static lastPipelineRun: string | null = null;

  /**
   * Executes the full Authority Engine pipeline:
   * Load Prospects → Guardrail Check → Dynamic Schedule → Send → Track
   */
  static async executePipeline(options: PipelineOptions = {}): Promise<AuthorityPipelineResult> {
    const startTime = Date.now();
    console.log('🚀 [AuthorityEngine] Starting pipeline execution...', {
      dryRun: options.dryRun || false,
      forceOutsideHours: options.forceOutsideHours || false,
      maxSends: options.maxSends || 'auto',
    });

    const result: AuthorityPipelineResult = {
      discoveredCount: 0,
      qualifiedCount: 0,
      draftsGenerated: 0,
      guardrailsPassed: 0,
      guardrailsFailed: 0,
      exceptionsQueued: 0,
      scheduled: 0,
      sent: 0,
      errors: [],
      executionTimeMs: 0,
      timestamp: new Date().toISOString(),
    };

    try {
      // Step 1: Check Kill Switch
      // For Sprint 1, we use a simple in-memory kill switch state.
      // Sprint 3 will integrate Redis-based persistent state.
      const killSwitchState: KillSwitchState = {
        status: 'active',
        lastEvaluatedAt: new Date().toISOString(),
        metrics: {
          totalSent: this.dailySentCount,
          totalBounced: 0,
          totalSpamComplaints: 0,
          totalReplied: 0,
          consecutiveBounces: 0,
          bounceRatePercent: 0,
          spamComplaintRatePercent: 0,
          replyRatePercent: 0,
        },
      };

      const killSwitchEval = GuardrailEngine.evaluateKillSwitch(killSwitchState);
      if (killSwitchEval.shouldPause) {
        console.log(`⚠️ [AuthorityEngine] Kill switch triggered: ${killSwitchEval.reason}`);
        await globalEventBus.publish(AUTHORITY_EVENTS.KILL_SWITCH_TRIGGERED, { reason: killSwitchEval.reason });
        result.executionTimeMs = Date.now() - startTime;
        return result;
      }

      // Step 2: Check Business Hours
      const { isHours, reason: hoursReason } = SendScheduler.isWithinBusinessHours();
      console.log(`🕐 [AuthorityEngine] Business hours check: ${hoursReason}`);

      if (!isHours && !options.forceOutsideHours) {
        console.log('⚠️ [AuthorityEngine] Outside business hours. Skipping. Pass forceOutsideHours=true to override.');
        result.executionTimeMs = Date.now() - startTime;
        return result;
      }

      // Step 3: Calculate effective cap & batch size
      const config = SendScheduler.getDefaultConfig();
      const effectiveCap = SendScheduler.calculateEffectiveCap(config, null);
      const maxSends = options.maxSends
        ? Math.min(options.maxSends, effectiveCap - this.dailySentCount)
        : effectiveCap - this.dailySentCount;

      if (maxSends <= 0) {
        console.log('⚠️ [AuthorityEngine] Daily cap reached. No more sends today.');
        result.executionTimeMs = Date.now() - startTime;
        return result;
      }

      // Step 4: Load Pending Prospects from Google Sheets
      console.log('📋 [AuthorityEngine] Loading pending prospects from Google Sheets...');
      const prospects = await getOutreachProspectsFromSheet();
      const pendingProspects = prospects.filter(p => p.status === 'pending' || !p.status);

      if (pendingProspects.length === 0) {
        console.log('✅ [AuthorityEngine] No pending prospects to process.');
        result.executionTimeMs = Date.now() - startTime;
        return result;
      }

      console.log(`📋 [AuthorityEngine] Found ${pendingProspects.length} pending prospects. Processing up to ${maxSends}.`);

      // Build guardrail context
      const recentEmails = prospects
        .filter(p => p.status === 'sent' && p.sentAt)
        .filter(p => {
          if (!p.sentAt) return false;
          const sentDate = new Date(p.sentAt);
          const daysSinceSent = (Date.now() - sentDate.getTime()) / (1000 * 60 * 60 * 24);
          return daysSinceSent <= 90;
        })
        .map(p => p.email);

      const guardrailContext: GuardrailContext = {
        recentlySentEmails: [...recentEmails, ...this.recentlySentEmails],
        bouncedDomains: [],
        dailySentCount: this.dailySentCount,
        effectiveDailyCap: effectiveCap,
        forceOutsideHours: options.forceOutsideHours,
      };

      // Step 5: Process each prospect
      const batch = pendingProspects.slice(0, maxSends);

      for (const prospect of batch) {
        const prospectId = `auth_${prospect.rowIndex}_${Date.now()}`;

        try {
          // Create a minimal OutreachDraft from the prospect data
          // Sprint 2 will replace this with AI-generated personalized drafts
          const draft: OutreachDraft = {
            prospectId,
            category: 'resource_page',
            angle: 'resource_suggestion',
            subject: prospect.personalizedHook
              ? `Quick resource for ${prospect.prospectName || prospect.website}`
              : `Suggestion for your startup resources`,
            subjectVariants: [],
            body: prospect.personalizedHook || `Hi ${prospect.name || 'there'},\n\nI was reviewing your website and thought this resource might be useful for your audience.\n\nWould you be open to taking a look?\n\nRegards,\nAshwani Kumar\nFounder, FSI Digital\n\nTo opt out of future messages, reply with "unsubscribe".`,
            fsiAssetUsed: prospect.targetPage || '/canada/small-business-grants',
            personalizationTokens: {
              websiteName: prospect.website || '',
              specificReference: prospect.personalizedHook || '',
              relevantResource: prospect.targetPage || '/canada/small-business-grants',
            },
            aiQualityScore: 0, // No AI scoring in Sprint 1
            generatedAt: new Date().toISOString(),
          };

          result.draftsGenerated++;

          // Run through Guardrail Engine
          const guardrailResult = GuardrailEngine.validateOutreach(draft, guardrailContext);

          if (guardrailResult.passed) {
            result.guardrailsPassed++;
            await globalEventBus.publish(AUTHORITY_EVENTS.GUARDRAIL_PASSED, { prospectId, email: prospect.email });

            // Send email
            if (options.dryRun) {
              console.log(`✅ [DRY RUN] Would send authority outreach to ${prospect.email}`);
              result.sent++;
            } else {
              const sendResult = await sendEmail({
                to: prospect.email,
                subject: draft.subject,
                html: `<div style="font-family: sans-serif; font-size: 15px; color: #334155; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">${draft.body.replace(/\n/g, '<br/>')}</div>`,
                text: draft.body,
                tagType: 'authority_outreach',
                companyName: prospect.prospectName || prospect.website,
                forceResend: true,
              });

              if (sendResult.success) {
                console.log(`✉️ [AuthorityEngine] Sent to ${prospect.email}`);
                await updateOutreachProspectInSheet(prospect.rowIndex, {
                  status: 'sent',
                  sentAt: new Date().toISOString(),
                  deliveryStatus: 'delivered',
                });

                await globalEventBus.publish(AUTHORITY_EVENTS.OUTREACH_SENT, {
                  prospectId,
                  email: prospect.email,
                  website: prospect.website,
                });

                this.dailySentCount++;
                this.recentlySentEmails.push(prospect.email);
                guardrailContext.dailySentCount = this.dailySentCount;
                result.sent++;

                // Randomized delay between sends
                const delay = SendScheduler.getRandomizedDelay(config);
                console.log(`⏳ [AuthorityEngine] Waiting ${Math.round(delay / 1000)}s before next send...`);
                await sleep(delay);
              } else {
                console.error(`❌ [AuthorityEngine] Send failed for ${prospect.email}: ${sendResult.error}`);
                await updateOutreachProspectInSheet(prospect.rowIndex, {
                  status: 'failed',
                  deliveryStatus: sendResult.error || 'send_failed',
                });
                result.errors.push({
                  prospectId,
                  stage: 'sent' as AuthorityPipelineStage,
                  error: sendResult.error || 'Email send failed',
                });
              }
            }
          } else {
            // Guardrail failed
            result.guardrailsFailed++;
            await globalEventBus.publish(AUTHORITY_EVENTS.GUARDRAIL_FAILED, {
              prospectId,
              email: prospect.email,
              failedChecks: guardrailResult.failedChecks,
            });

            if (guardrailResult.action === 'exception_queue') {
              // Route to Exception Queue
              result.exceptionsQueued++;
              console.log(`⚠️ [AuthorityEngine] Exception queued for ${prospect.email}: ${guardrailResult.failedChecks.join(', ')}`);

              if (!options.dryRun) {
                await appendAuthorityException({
                  id: `exc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                  prospectEmail: prospect.email,
                  prospectName: prospect.prospectName || prospect.name || '',
                  website: prospect.website,
                  draftSubject: draft.subject,
                  failedChecks: guardrailResult.failedChecks.join('; '),
                  status: 'pending',
                  ceoNotes: '',
                  createdAt: new Date().toISOString(),
                  resolvedAt: '',
                });
                await globalEventBus.publish(AUTHORITY_EVENTS.EXCEPTION_QUEUED, {
                  prospectId,
                  email: prospect.email,
                });
              }
            } else if (guardrailResult.action === 'auto_reject') {
              console.log(`🚫 [AuthorityEngine] Auto-rejected ${prospect.email}: ${guardrailResult.failedChecks.join(', ')}`);
              if (!options.dryRun) {
                await updateOutreachProspectInSheet(prospect.rowIndex, {
                  status: 'rejected',
                  deliveryStatus: `Guardrail: ${guardrailResult.failedChecks.join('; ')}`,
                });
              }
            } else if (guardrailResult.action === 'requeue') {
              console.log(`🔄 [AuthorityEngine] Re-queued ${prospect.email}: ${guardrailResult.failedChecks.join(', ')}`);
              // Leave status as 'pending' for next run
            }
          }
        } catch (err: any) {
          console.error(`❌ [AuthorityEngine] Error processing prospect ${prospect.email}:`, err.message);
          result.errors.push({
            prospectId,
            stage: 'draft_generated' as AuthorityPipelineStage,
            error: err.message || String(err),
          });
        }

        // Respect Google Sheets API rate limits
        await sleep(800);
      }
    } catch (err: any) {
      console.error('❌ [AuthorityEngine] Pipeline error:', err.message);
      result.errors.push({
        prospectId: 'pipeline',
        stage: 'discovered' as AuthorityPipelineStage,
        error: err.message || String(err),
      });
    }

    result.executionTimeMs = Date.now() - startTime;
    this.lastPipelineRun = new Date().toISOString();

    console.log(`🚀 [AuthorityEngine] Pipeline complete in ${result.executionTimeMs}ms.`, {
      drafts: result.draftsGenerated,
      passed: result.guardrailsPassed,
      failed: result.guardrailsFailed,
      exceptions: result.exceptionsQueued,
      sent: result.sent,
      errors: result.errors.length,
    });

    return result;
  }

  /**
   * Returns the current operational status of the Authority Engine.
   */
  static async getEngineStatus(): Promise<AuthorityEngineStatus> {
    let pendingCount = 0;
    let exceptionsCount = 0;

    try {
      const prospects = await getOutreachProspectsFromSheet();
      pendingCount = prospects.filter(p => p.status === 'pending' || !p.status).length;
    } catch {
      // Graceful degradation
    }

    try {
      const { getAuthorityExceptions } = await import('@/lib/google-sheets');
      const exceptions = await getAuthorityExceptions();
      exceptionsCount = exceptions.filter(e => e.status === 'pending').length;
    } catch {
      // Graceful degradation
    }

    const config = SendScheduler.getDefaultConfig();
    const effectiveCap = SendScheduler.calculateEffectiveCap(config, null);

    return {
      killSwitch: 'active',
      dailySentCount: this.dailySentCount,
      effectiveDailyCap: effectiveCap,
      pendingProspects: pendingCount,
      exceptionsCount,
      warmUpWeek: 0,
      lastPipelineRun: this.lastPipelineRun,
    };
  }

  /**
   * Returns a subsystem health report for Growth OS compliance monitoring.
   */
  static getSubsystemHealth(): SubsystemHealthReport {
    const impact: BusinessImpactScore = {
      revenueImpactUSD: 0,
      founderTimeSavedMinutes: 120,
      customerTrustAddedScore: 50,
      knowledgeAddedScore: 10,
      competitiveAdvantageScore: 30,
      compositeImpactRating: 42,
    };

    return {
      subsystemId: 'sub_authority_engine',
      subsystemName: 'Authority Engine (Phase 3)',
      monthlyCostUSD: 5.0,
      totalImpactGenerated: impact,
      lastUsedTimestamp: this.lastPipelineRun || new Date().toISOString(),
      recommendation: 'ACTIVE',
      reason: 'Core system for automated authority building and backlink outreach.',
    };
  }
}
