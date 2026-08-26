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
  QualifiedOpportunity,
} from './types';
import { GuardrailEngine, type GuardrailContext } from './guardrail-engine';
import { SendScheduler } from './send-scheduler';
import { OutreachGenerator } from './outreach-generator';
import { AssetScanner } from './asset-scanner';
import { globalEventBus } from '../core/event-bus';
import {
  getOutreachProspectsFromSheet,
  updateOutreachProspectInSheet,
  appendAuthorityException,
} from '@/lib/google-sheets';
import { sendEmail } from '@/lib/emails/mailer';
import type { SubsystemHealthReport } from '../core/subsystem-health';
import type { BusinessImpactScore } from '../types';
import { readOperationalRows } from '@/lib/growth-os/operations-store';

const EMAIL_EVENT_HEADERS = ['Event ID', 'Provider', 'Provider Message ID', 'Event Type', 'Recipient', 'Occurred At', 'Received At'];

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

export class AuthorityEngine {
  // In-memory tracking for current execution context
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
      const prospects = await getOutreachProspectsFromSheet();
      const providerIds = new Set(prospects.map((prospect) => prospect.providerMessageId).filter(Boolean));
      const emailEvents = await readOperationalRows('Email Events', EMAIL_EVENT_HEADERS);
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const authorityEvents = emailEvents.filter((row) =>
        providerIds.has(row[2] || '') && new Date(row[5] || row[6] || '').getTime() >= sevenDaysAgo
      );
      const todayET = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
      this.dailySentCount = prospects.filter((prospect) => prospect.providerMessageId && prospect.sentAt &&
        new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(prospect.sentAt)) === todayET
      ).length;
      const sent7d = prospects.filter((prospect) => prospect.providerMessageId && new Date(prospect.sentAt || '').getTime() >= sevenDaysAgo);
      const bounced7d = authorityEvents.filter((row) => String(row[3] || '').toLowerCase() === 'email.bounced').length;
      const complained7d = authorityEvents.filter((row) => String(row[3] || '').toLowerCase() === 'email.complained').length;
      const replied7d = sent7d.filter((prospect) => prospect.replied || Boolean(prospect.repliedAt)).length;
      // Step 1: Check Kill Switch
      const killSwitchState: KillSwitchState = {
        status: 'active',
        lastEvaluatedAt: new Date().toISOString(),
        metrics: {
          totalSent: sent7d.length,
          totalBounced: bounced7d,
          totalSpamComplaints: complained7d,
          totalReplied: replied7d,
          consecutiveBounces: bounced7d,
          bounceRatePercent: sent7d.length ? Number(((bounced7d / sent7d.length) * 100).toFixed(2)) : 0,
          spamComplaintRatePercent: sent7d.length ? Number(((complained7d / sent7d.length) * 100).toFixed(2)) : 0,
          replyRatePercent: sent7d.length ? Number(((replied7d / sent7d.length) * 100).toFixed(2)) : 0,
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
        console.log('⚠️ [AuthorityEngine] Outside business hours. Skipping. Pass forceOutsideHours=true or ?force=true to override.');
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
      // Case-insensitive status matching
      const pendingProspects = prospects.filter(p => {
        const statusLower = (p.status || '').trim().toLowerCase();
        return statusLower === 'qualified';
      });

      if (pendingProspects.length === 0) {
        console.log('✅ [AuthorityEngine] No pending prospects to process.');
        result.executionTimeMs = Date.now() - startTime;
        return result;
      }

      console.log(`📋 [AuthorityEngine] Found ${pendingProspects.length} pending prospects. Processing up to ${maxSends}.`);

      // Build guardrail context
      const recentEmails = prospects
        .filter(p => {
          const statusLower = (p.status || '').trim().toLowerCase();
          return statusLower === 'sent' && p.sentAt;
        })
        .filter(p => {
          if (!p.sentAt) return false;
          const sentDate = new Date(p.sentAt);
          const daysSinceSent = (Date.now() - sentDate.getTime()) / (1000 * 60 * 60 * 24);
          return daysSinceSent <= 90;
        })
        .map(p => p.email.toLowerCase());

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
        const prospectId = prospect.prospectId || `legacy_row_${prospect.rowIndex}`;

        try {
          const website = prospect.website || 'fsidigital.ca';
          const prospectName = prospect.name || prospect.prospectName || website;
          const targetAsset = prospect.targetPage || '/canada/small-business-grants';

          // Build a qualified opportunity object to feed the OutreachGenerator
          const qualifiedOpp: QualifiedOpportunity = {
            id: prospectId,
            website,
            prospectName,
            email: prospect.email,
            category: 'resource_page',
            targetPage: targetAsset,
            discoveredAt: new Date().toISOString(),
            sourceQuery: '',
            metadata: {
              siteTitle: prospect.prospectName || website,
              siteDescription: prospect.personalizedHook || '',
              recentArticles: [],
              aboutSummary: '',
            },
            score: {
              authorityScore: 75,
              commercialScore: 80,
              estimatedROI: 78,
              tier: 'A',
              recommendedAction: 'auto_outreach',
              breakdown: {
                topicalRelevance: 20, domainQuality: 20, indexingStatus: 15, estimatedTraffic: 10, outboundLinkQuality: 10, categoryAcceptance: 15, audienceOverlap: 25, fundingTopicCoverage: 20, commercialTrafficIntent: 20, referralPotential: 15,
              },
            },
          };

          // Generate AI-aligned draft grounded in FSI asset scanner
          const draft = OutreachGenerator.generateOutreach(qualifiedOpp);
          draft.prospectEmail = prospect.email;
          draft.prospectName = prospectName;

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
                companyName: prospectName,
                forceResend: true,
              });

              if (sendResult.success && sendResult.providerMessageId) {
                console.log(`✉️ [AuthorityEngine] Email successfully sent to ${prospect.email}`);
                const persisted = await updateOutreachProspectInSheet(prospect.rowIndex, {
                  status: 'sent',
                  sentAt: new Date().toISOString(),
                  // Provider acceptance is not proof of inbox delivery; delivery webhooks
                  // are the only path allowed to advance this value to "delivered".
                  deliveryStatus: 'provider_accepted',
                  providerMessageId: sendResult.providerMessageId,
                });
                if (!persisted.success) throw persisted.error || new Error('Authority provider receipt could not be persisted.');

                await globalEventBus.publish(AUTHORITY_EVENTS.OUTREACH_SENT, {
                  prospectId,
                  email: prospect.email,
                  website: prospect.website,
                });

                this.dailySentCount++;
                this.recentlySentEmails.push(prospect.email.toLowerCase());
                guardrailContext.dailySentCount = this.dailySentCount;
                result.sent++;

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
            console.log(`⚠️ [AuthorityEngine] Guardrail failed for ${prospect.email}: [${guardrailResult.failedChecks.join(', ')}] -> Action: ${guardrailResult.action}`);

            await globalEventBus.publish(AUTHORITY_EVENTS.GUARDRAIL_FAILED, {
              prospectId,
              email: prospect.email,
              failedChecks: guardrailResult.failedChecks,
            });

            if (guardrailResult.action === 'exception_queue') {
              result.exceptionsQueued++;
              if (!options.dryRun) {
                await appendAuthorityException({
                  id: `exc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                  prospectEmail: prospect.email,
                  prospectName: prospectName,
                  website: prospect.website,
                  draftSubject: draft.subject,
                  failedChecks: guardrailResult.failedChecks.join('; '),
                  status: 'pending',
                  ceoNotes: '',
                  createdAt: new Date().toISOString(),
                  resolvedAt: '',
                });
                await updateOutreachProspectInSheet(prospect.rowIndex, {
                  status: 'exception_queued',
                  deliveryStatus: `Guardrail Exception: ${guardrailResult.failedChecks.join('; ')}`,
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
                  deliveryStatus: `Guardrail Reject: ${guardrailResult.failedChecks.join('; ')}`,
                });
              }
            } else if (guardrailResult.action === 'requeue') {
              console.log(`🔄 [AuthorityEngine] Re-queued ${prospect.email}: ${guardrailResult.failedChecks.join(', ')}`);
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
    let killSwitch: KillSwitchStatus = 'active';

    try {
      const prospects = await getOutreachProspectsFromSheet();
      pendingCount = prospects.filter(p => {
        const s = (p.status || '').trim().toLowerCase();
        return s === 'pending' || s === 'qualified' || s === 'review_required' || s === '';
      }).length;
      const providerIds = new Set(prospects.map((prospect) => prospect.providerMessageId).filter(Boolean));
      const events = await readOperationalRows('Email Events', EMAIL_EVENT_HEADERS);
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const sent = prospects.filter((prospect) => prospect.providerMessageId && new Date(prospect.sentAt || '').getTime() >= sevenDaysAgo);
      const relevantEvents = events.filter((row) => providerIds.has(row[2] || '') && new Date(row[5] || row[6] || '').getTime() >= sevenDaysAgo);
      const bounced = relevantEvents.filter((row) => String(row[3] || '').toLowerCase() === 'email.bounced').length;
      const complained = relevantEvents.filter((row) => String(row[3] || '').toLowerCase() === 'email.complained').length;
      const replied = sent.filter((prospect) => prospect.replied || Boolean(prospect.repliedAt)).length;
      const evaluation = GuardrailEngine.evaluateKillSwitch({
        status: 'active',
        lastEvaluatedAt: new Date().toISOString(),
        metrics: {
          totalSent: sent.length,
          totalBounced: bounced,
          totalSpamComplaints: complained,
          totalReplied: replied,
          consecutiveBounces: bounced,
          bounceRatePercent: sent.length ? (bounced / sent.length) * 100 : 0,
          spamComplaintRatePercent: sent.length ? (complained / sent.length) * 100 : 0,
          replyRatePercent: sent.length ? (replied / sent.length) * 100 : 0,
        },
      });
      killSwitch = evaluation.shouldPause ? 'paused' : 'active';
      const todayET = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
      this.dailySentCount = prospects.filter((prospect) => prospect.providerMessageId && prospect.sentAt &&
        new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(prospect.sentAt)) === todayET
      ).length;
    } catch {
      // Graceful degradation
    }

    try {
      const { getAuthorityExceptions } = await import('@/lib/google-sheets');
      const exceptions = await getAuthorityExceptions();
      exceptionsCount = exceptions.filter(e => (e.status || '').toLowerCase() === 'pending').length;
    } catch {
      // Graceful degradation
    }

    const config = SendScheduler.getDefaultConfig();
    const effectiveCap = SendScheduler.calculateEffectiveCap(config, null);

    return {
      killSwitch,
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
      founderTimeSavedMinutes: 0,
      customerTrustAddedScore: 0,
      knowledgeAddedScore: 0,
      competitiveAdvantageScore: 0,
      compositeImpactRating: 0,
    };

    return {
      subsystemId: 'sub_authority_engine',
      subsystemName: 'Authority Engine (Phase 3)',
      monthlyCostUSD: 0,
      totalImpactGenerated: impact,
      lastUsedTimestamp: this.lastPipelineRun || '',
      recommendation: 'ACTIVE',
      reason: 'Impact and cost remain unverified until provider delivery, backlink, and revenue evidence are linked.',
    };
  }
}
