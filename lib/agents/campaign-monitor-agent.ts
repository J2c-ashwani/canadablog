import {
  getGoogleSheetsClient,
  getOutreachProspectsFromSheet,
  getPartnerInquiriesFromSheet,
  updateOutreachProspectInSheet,
} from '@/lib/google-sheets';
import { getAllPurchases } from '@/lib/products/purchase-store';
import { readOperationalRows, setOperationalState } from '@/lib/growth-os/operations-store';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import {
  fetchRecentBrevoEvents,
  fetchRecentBrevoEventDetails,
  persistDeliveryEvents,
  type BrevoEventDetail,
} from '@/lib/emails/delivery-events';
import { isTestOrInternalContact } from '@/lib/leads/commercial-eligibility';
import type { AgentExecutionMode } from './types';

export interface InboundReplySummary {
  id: string;
  fromEmail: string;
  subject: string;
  receivedAt: string;
  snippet: string;
}

export interface EngagedRecipientSummary {
  email: string;
  lastEventType: 'opened' | 'clicked';
  occurredAt: string;
  providerMessageId?: string;
  openedSubject?: string;
  openedTag?: string;
  openCount?: number;
}

export interface CampaignMonitorReport {
  checkedAt: string;
  mode: AgentExecutionMode;
  emailTelemetry: {
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    complained: number;
    unsubscribed: number;
    brevoSyncedNewEvents: number;
    openRatePct: number;
    clickRatePct: number;
    bounceRatePct: number;
  };
  sponsorCampaign: {
    totalProspects: number;
    untouchedReady: number;
    touch1Active: number;
    touch2Active: number;
    touch3Complete: number;
    repliedOrConverted: number;
    bouncedRowsAutoSuppressed: number;
    publishingInquiriesCount: number;
    publishingOrdersCount: number;
    engagedSponsorEmails: string[];
  };
  partnerCampaign: {
    totalInquiries: number;
    untouched: number;
    inFollowUp: number;
    wonOrActive: number;
  };
  verifiedRevenue: {
    completedPurchasesCount: number;
    allTimeUsdGross: number;
  };
  recentEngagements: EngagedRecipientSummary[];
  inboundReplies: InboundReplySummary[];
  alerts: string[];
}

export class CampaignMonitorAgent {
  static readonly AGENT_NAME = 'CampaignMonitorAgent';

  static async run(mode: AgentExecutionMode, persistState = true): Promise<CampaignMonitorReport> {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    // Poll live Brevo events first and persist any new events cleanly (deduplicated by eventId)
    let brevoSyncedNewEvents = 0;
    const [brevoEvents, brevoEventDetails] = await Promise.all([
      fetchRecentBrevoEvents(100),
      fetchRecentBrevoEventDetails(100).catch(() => [] as BrevoEventDetail[]),
    ]);
    if (mode === 'live' && brevoEvents.length > 0) {
      brevoSyncedNewEvents = await persistDeliveryEvents(brevoEvents).catch(() => 0);
    }

    const fetchResendInboundReplies = async (): Promise<InboundReplySummary[]> => {
      const apiKey = process.env.RESEND_API_KEY?.trim();
      if (!apiKey) return [];
      try {
        const res = await fetch('https://api.resend.com/emails/receiving?limit=20', {
          headers: { Authorization: `Bearer ${apiKey}` },
        });
        if (!res.ok) return [];
        const json = await res.json().catch(() => ({}));
        const list: any[] = Array.isArray(json?.data) ? json.data : [];
        return list.map((item) => {
          const fromRaw = String(item?.from || '');
          const fromEmail = fromRaw.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i)?.[0]?.toLowerCase() || '';
          return {
            id: String(item?.id || ''),
            fromEmail,
            subject: String(item?.subject || ''),
            receivedAt: String(item?.created_at || new Date().toISOString()),
            snippet: String(item?.text || item?.html || '').replace(/<[^>]+>/g, ' ').trim().slice(0, 300),
          };
        }).filter((r) => Boolean(r.fromEmail));
      } catch {
        return [];
      }
    };

    const [prospects, partnerInquiries, purchases, pubInquiries, pubOrders, inboundReplies, emailEventsRes] = await Promise.all([
      getOutreachProspectsFromSheet({ strict: false }),
      getPartnerInquiriesFromSheet().catch(() => []),
      getAllPurchases({ strict: false }).catch(() => []),
      readOperationalRows('Publishing Inquiries', ['Inquiry ID']).catch(() => []),
      readOperationalRows('Publishing Orders', ['Order ID']).catch(() => []),
      fetchResendInboundReplies(),
      spreadsheetId
        ? getGoogleSheetsClient()
            .then((sheets) =>
              sheets.spreadsheets.values.get({
                spreadsheetId,
                range: "'Email Events'!A2:H",
              })
            )
            .catch(() => null)
        : Promise.resolve(null),
    ]);

    const evRows = emailEventsRes?.data?.values || [];
    let delivered = 0;
    let opened = 0;
    let clicked = 0;
    let bounced = 0;
    let complained = 0;
    let unsubscribed = 0;

    const detailByEmailMsg = new Map<string, BrevoEventDetail>();
    const latestDetailByEmail = new Map<string, BrevoEventDetail>();
    for (const det of brevoEventDetails) {
      const em = det.email.toLowerCase().trim();
      if (!em || (!det.subject && !det.tag)) continue;
      if (det.messageId) {
        const key = `${em}|${det.messageId}`;
        if (!detailByEmailMsg.has(key)) detailByEmailMsg.set(key, det);
      }
      const prevLatest = latestDetailByEmail.get(em);
      if (!prevLatest || (det.occurredAt || '') > (prevLatest.occurredAt || '')) {
        latestDetailByEmail.set(em, det);
      }
    }

    const prospectByEmail = new Map<string, (typeof prospects)[number]>();
    for (const p of prospects) {
      const em = String(p.email || '').toLowerCase().trim();
      if (em && !prospectByEmail.has(em)) prospectByEmail.set(em, p);
    }

    const existingEventIds = new Set<string>(evRows.map((r) => String(r[0] || '')).filter(Boolean));
    const mergedRows: Array<[string, string, string, string]> = evRows.map((r) => [
      String(r[3] || ''),
      String(r[4] || ''),
      String(r[5] || r[6] || ''),
      String(r[2] || ''),
    ]);
    // In dry-run (when Brevo events weren't written yet), overlay live Brevo events in memory
    for (const bev of brevoEvents) {
      if (!existingEventIds.has(bev.eventId)) {
        mergedRows.push([bev.eventType, bev.recipient, bev.occurredAt, bev.providerMessageId || '']);
      }
    }

    const bouncedEmailSet = new Set<string>();
    const unsubEmailSet = new Set<string>();
    const openedOrClickedEmails = new Set<string>();
    const engagementCountByEmail = new Map<string, number>();
    const engagedMap = new Map<string, EngagedRecipientSummary>();

    const resolveMeta = (email: string, msgId: string) => {
      const exact = msgId ? detailByEmailMsg.get(`${email}|${msgId}`) : undefined;
      const latest = exact || latestDetailByEmail.get(email);
      let openedSubject = latest?.subject || '';
      let openedTag = latest?.tag || '';
      if (!openedSubject) {
        const pr = prospectByEmail.get(email);
        if (pr && (pr.deliveryStatus || '').includes('media_')) {
          openedSubject = `Sponsored placement on FSI Digital for ${pr.prospectName || pr.website}`;
          openedTag = openedTag || `sponsored-media-${pr.deliveryStatus}`;
        }
      }
      return {
        providerMessageId: msgId || latest?.messageId || '',
        openedSubject: openedSubject || undefined,
        openedTag: openedTag || undefined,
      };
    };

    const toEpochMs = (iso: string): number => {
      const ms = new Date(iso || 0).getTime();
      return Number.isFinite(ms) ? ms : 0;
    };

    for (const [rawType, rawEmail, occurredAt, msgId] of mergedRows) {
      const evType = rawType.toLowerCase();
      const email = rawEmail.toLowerCase().trim();
      const evMs = toEpochMs(occurredAt);
      if (evType.includes('deliver')) delivered++;
      if (evType.includes('open')) {
        opened++;
        if (email) {
          openedOrClickedEmails.add(email);
          engagementCountByEmail.set(email, (engagementCountByEmail.get(email) || 0) + 1);
          const prev = engagedMap.get(email);
          const prevMs = prev ? toEpochMs(prev.occurredAt) : -1;
          const meta = resolveMeta(email, msgId);
          if (!prev || prevMs <= evMs) {
            engagedMap.set(email, {
              email,
              lastEventType: prev?.lastEventType === 'clicked' && prevMs > evMs ? 'clicked' : 'opened',
              occurredAt,
              providerMessageId: meta.providerMessageId || prev?.providerMessageId,
              openedSubject: meta.openedSubject || prev?.openedSubject,
              openedTag: meta.openedTag || prev?.openedTag,
              openCount: engagementCountByEmail.get(email) || 1,
            });
          } else {
            prev.openCount = engagementCountByEmail.get(email) || prev.openCount || 1;
          }
        }
      }
      if (evType.includes('click')) {
        clicked++;
        if (email) {
          openedOrClickedEmails.add(email);
          engagementCountByEmail.set(email, (engagementCountByEmail.get(email) || 0) + 1);
          const prev = engagedMap.get(email);
          const prevMs = prev ? toEpochMs(prev.occurredAt) : -1;
          const meta = resolveMeta(email, msgId);
          engagedMap.set(email, {
            email,
            lastEventType: 'clicked',
            occurredAt: prev && prevMs > evMs ? prev.occurredAt : occurredAt,
            providerMessageId: meta.providerMessageId || prev?.providerMessageId,
            openedSubject: meta.openedSubject || prev?.openedSubject,
            openedTag: meta.openedTag || prev?.openedTag,
            openCount: engagementCountByEmail.get(email) || 1,
          });
        }
      }
      if (evType.includes('bounc')) {
        bounced++;
        if (email) bouncedEmailSet.add(email);
      }
      if (evType.includes('complain') || evType.includes('spam')) {
        complained++;
        if (email) bouncedEmailSet.add(email);
      }
      if (evType.includes('unsubscrib')) {
        unsubscribed++;
        if (email) unsubEmailSet.add(email);
      }
    }

    if (mode === 'live' && unsubEmailSet.size > 0) {
      for (const unsubEmail of unsubEmailSet) {
        await SubscriberRepository.updateSubscriberPreferences(unsubEmail, { isSubscribed: false }).catch(() => {});
      }
    }

    let untouchedReady = 0;
    let touch1Active = 0;
    let touch2Active = 0;
    let touch3Complete = 0;
    let repliedOrConverted = 0;
    let bouncedRowsAutoSuppressed = 0;
    const engagedSponsorEmails: string[] = [];

    for (const p of prospects) {
      const email = String(p.email || '').toLowerCase().trim();
      const statusLower = String(p.status || '').toLowerCase().trim();
      const deliveryLower = String(p.deliveryStatus || '').toLowerCase().trim();

      if (bouncedEmailSet.has(email) && statusLower !== 'failed' && deliveryLower !== 'bounced_suppressed') {
        if (mode === 'live') {
          await updateOutreachProspectInSheet(p.rowIndex, {
            status: 'failed',
            deliveryStatus: 'bounced_suppressed',
          });
        }
        bouncedRowsAutoSuppressed++;
        continue;
      }

      if (p.replied || p.positiveConversation || p.paymentId || deliveryLower.includes('ordered')) {
        repliedOrConverted++;
        continue;
      }
      if (statusLower === 'failed' || statusLower === 'rejected') continue;

      if (openedOrClickedEmails.has(email) && engagedSponsorEmails.length < 20) {
        engagedSponsorEmails.push(email);
      }

      if (deliveryLower.includes('media_touch_3') || deliveryLower.includes('media_sequence_complete')) {
        touch3Complete++;
      } else if (deliveryLower.includes('media_touch_2')) {
        touch2Active++;
      } else if (deliveryLower.includes('media_touch_1') || deliveryLower.includes('media_pitch_sent')) {
        touch1Active++;
      } else if (statusLower === 'pending' || statusLower === 'review_required') {
        untouchedReady++;
      }
    }

    let partnerUntouched = 0;
    let partnerFollowUp = 0;
    let partnerWon = 0;
    for (const inq of partnerInquiries) {
      if (isTestOrInternalContact({ email: inq.email, name: inq.name })) continue;
      const st = String(inq.status || '').toLowerCase();
      if (st.includes('won') || st.includes('active') || st.includes('closed')) partnerWon++;
      else if (st.includes('proposed') || st.includes('follow-up') || st.includes('touch')) partnerFollowUp++;
      else partnerUntouched++;
    }

    const seenOrders = new Set<string>();
    let completedPurchasesCount = 0;
    let allTimeUsdGross = 0;
    for (const purchase of purchases) {
      const orderId = String(purchase.paypalOrderId || '').trim();
      const purchaseId = String(purchase.purchaseId || '').trim();
      if (
        String(purchase.status || '').toLowerCase() !== 'completed' ||
        orderId.startsWith('TEST-') ||
        orderId.startsWith('ORDER_E2E_') ||
        purchaseId.startsWith('TEST_') ||
        isTestOrInternalContact({ email: purchase.email, name: purchase.name })
      ) {
        continue;
      }
      if (orderId) {
        if (seenOrders.has(orderId)) continue;
        seenOrders.add(orderId);
      }
      completedPurchasesCount++;
      allTimeUsdGross += Number.parseFloat(String(purchase.amount || '0')) || 0;
    }

    const denom = Math.max(1, delivered);
    const openRatePct = Number(((opened / denom) * 100).toFixed(2));
    const clickRatePct = Number(((clicked / denom) * 100).toFixed(2));
    const bounceRatePct = Number(((bounced / Math.max(1, delivered + bounced)) * 100).toFixed(2));

    const alerts: string[] = [];
    if (bounceRatePct > 4) {
      alerts.push(`Elevated historical bounce rate (${bounceRatePct}%): bounced domains auto-suppressed before dispatch.`);
    }
    if (untouchedReady < 15) {
      alerts.push(`Sponsor pipeline untouched inventory is low (${untouchedReady}); automatic Serper prospecting active.`);
    }
    if (pubInquiries.length === 0 && touch1Active + touch2Active === 0) {
      alerts.push('Zero sponsored media pitches delivered yet — launching automated Wave 1 Touch-1 campaign.');
    }

    const recentEngagements = Array.from(engagedMap.values())
      .filter((e) => !bouncedEmailSet.has(e.email) && !unsubEmailSet.has(e.email) && !isTestOrInternalContact({ email: e.email }))
      .sort((a, b) => toEpochMs(b.occurredAt) - toEpochMs(a.occurredAt))
      .slice(0, 50);

    const report: CampaignMonitorReport = {
      checkedAt: new Date().toISOString(),
      mode,
      emailTelemetry: {
        delivered,
        opened,
        clicked,
        bounced,
        complained,
        unsubscribed,
        brevoSyncedNewEvents,
        openRatePct,
        clickRatePct,
        bounceRatePct,
      },
      sponsorCampaign: {
        totalProspects: prospects.length,
        untouchedReady,
        touch1Active,
        touch2Active,
        touch3Complete,
        repliedOrConverted,
        bouncedRowsAutoSuppressed,
        publishingInquiriesCount: pubInquiries.length,
        publishingOrdersCount: pubOrders.length,
        engagedSponsorEmails,
      },
      partnerCampaign: {
        totalInquiries: partnerInquiries.length,
        untouched: partnerUntouched,
        inFollowUp: partnerFollowUp,
        wonOrActive: partnerWon,
      },
      verifiedRevenue: {
        completedPurchasesCount,
        allTimeUsdGross: Number(allTimeUsdGross.toFixed(2)),
      },
      recentEngagements,
      inboundReplies,
      alerts,
    };

    if (mode === 'live' && persistState) {
      await setOperationalState('ceo_campaign_monitor_latest', report).catch((err) => {
        console.warn('CampaignMonitorAgent could not persist state:', err?.message || err);
      });
    }

    return report;
  }
}
