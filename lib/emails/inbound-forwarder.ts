import { getLatestOperationalState, setOperationalState } from '@/lib/growth-os/operations-store';
import { escapeHtml } from '@/lib/emails/mailer';

export interface InboundReplyCandidate {
  id?: string;
  fromEmail: string;
  toEmails?: string[];
  subject: string;
  receivedAt: string;
  snippet?: string;
  text?: string;
  html?: string;
}

export type ForwardedReplyRecord = {
  forwardedAt: string;
  fromEmail: string;
  subject: string;
  providerMessageId?: string;
};

const LEDGER_KEY = 'inbound_forwarded_to_founder_ledger';
const MAX_FORWARD_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export function getFounderInboxEmail(): string {
  return (
    process.env.FOUNDER_INBOX_EMAIL?.trim() ||
    process.env.CEO_REPORT_EMAIL?.trim() ||
    process.env.RESEND_REPLY_TO_EMAIL?.trim() ||
    'ashwani@fsidigital.ca'
  );
}

export function isLoopOrBounceSender(email: string, subject = ''): boolean {
  const clean = email.toLowerCase().trim();
  if (!clean || !clean.includes('@')) return true;
  if (/@(?:funding\.)?fsidigital\.ca$/i.test(clean)) return true;
  if (/^(mailer-daemon|postmaster|bounces?)@/i.test(clean)) return true;
  if (subject.trim().startsWith('[Inbound Reply]')) return true;
  return false;
}

async function hydrateResendInboundBody(
  apiKey: string,
  replyId: string
): Promise<{ text: string; html: string; to: string[]; subject: string; from: string; created_at: string } | null> {
  if (!replyId) return null;
  try {
    const res = await fetch(`https://api.resend.com/emails/receiving/${encodeURIComponent(replyId)}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!res.ok) return null;
    const d = await res.json().catch(() => null);
    if (!d) return null;
    return {
      text: String(d.text || ''),
      html: String(d.html || ''),
      to: Array.isArray(d.to) ? d.to.map(String) : d.to ? [String(d.to)] : [],
      subject: String(d.subject || ''),
      from: String(d.from || ''),
      created_at: String(d.created_at || ''),
    };
  } catch {
    return null;
  }
}

/**
 * Forwards replies sent to the Resend receiving subdomain (e.g. *@funding.fsidigital.ca)
 * directly to the founder's primary inbox (ashwani@fsidigital.ca) with Reply-To set to
 * the prospect's email address, deduplicated durably in Google Sheets GrowthOS State.
 */
export async function forwardInboundRepliesToFounder(
  candidates: InboundReplyCandidate[],
  mode: 'live' | 'dry-run' = 'live'
): Promise<{ forwardedCount: number; skippedCount: number; failedCount: number; forwardedIds: string[] }> {
  const founderInbox = getFounderInboxEmail();
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const rawLedger = await getLatestOperationalState<Record<string, ForwardedReplyRecord>>(LEDGER_KEY).catch(() => null);
  const ledger: Record<string, ForwardedReplyRecord> =
    rawLedger && typeof rawLedger === 'object' ? { ...rawLedger } : {};

  let forwardedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;
  const forwardedIds: string[] = [];
  let ledgerDirty = false;
  const nowMs = Date.now();

  // Forward oldest-first so multi-message threads arrive in chronological order in Gmail
  const ordered = [...candidates].sort((a, b) => {
    const am = new Date(a.receivedAt || 0).getTime() || 0;
    const bm = new Date(b.receivedAt || 0).getTime() || 0;
    return am - bm;
  });

  for (const item of ordered) {
    const fromEmail = String(item.fromEmail || '')
      .match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i)?.[0]
      ?.toLowerCase() || '';
    const subject = String(item.subject || '(No Subject)').trim();

    if (isLoopOrBounceSender(fromEmail, subject)) {
      skippedCount++;
      continue;
    }

    const receivedMs = new Date(item.receivedAt || 0).getTime();
    if (Number.isFinite(receivedMs) && receivedMs > 0 && nowMs - receivedMs > MAX_FORWARD_AGE_MS) {
      skippedCount++;
      continue;
    }

    const dedupeKey = String(item.id || `${fromEmail}::${item.receivedAt}`).trim();
    if (!dedupeKey || ledger[dedupeKey]) {
      skippedCount++;
      continue;
    }

    if (mode === 'dry-run') {
      forwardedCount++;
      forwardedIds.push(dedupeKey);
      continue;
    }

    if (!apiKey) {
      failedCount++;
      continue;
    }

    let fullText = item.text || '';
    let fullHtml = item.html || '';
    let originalTo = (item.toEmails || []).join(', ');

    if ((!fullText && !fullHtml) && item.id) {
      const hydrated = await hydrateResendInboundBody(apiKey, item.id);
      if (hydrated) {
        fullText = hydrated.text;
        fullHtml = hydrated.html;
        if (hydrated.to.length > 0) originalTo = hydrated.to.join(', ');
      }
    }

    const fallbackBody = item.snippet || '(Empty message body)';
    const bodyText = fullText || fallbackBody;
    const forwardSubject = `[Inbound Reply] ${subject.replace(/^\[Inbound Reply\]\s*/i, '')} — from ${fromEmail}`;

    const bannerHtml = `
      <div style="background:#f8fafc;border:1px solid #cbd5e1;border-left:4px solid #0f172a;padding:12px 16px;border-radius:6px;margin-bottom:16px;font-family:Arial,sans-serif;font-size:13px;color:#334155;">
        <div><strong>Forwarded Prospect Reply to FSI Digital</strong></div>
        <div><strong>From:</strong> ${escapeHtml(fromEmail)} (hitting Reply responds directly to them)</div>
        ${originalTo ? `<div><strong>Addressed To:</strong> ${escapeHtml(originalTo)}</div>` : ''}
        <div><strong>Received At:</strong> ${escapeHtml(item.receivedAt || new Date().toISOString())}</div>
        <div><strong>Original Subject:</strong> ${escapeHtml(subject)}</div>
      </div>`;

    const renderedBodyHtml = fullHtml
      ? fullHtml
      : `<div style="font-family:Arial,sans-serif;white-space:pre-wrap;color:#0f172a;line-height:1.5;">${escapeHtml(bodyText)}</div>`;

    const sendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'Ashwani K <ashwani@funding.fsidigital.ca>',
        to: [founderInbox],
        reply_to: fromEmail,
        subject: forwardSubject,
        html: `${bannerHtml}${renderedBodyHtml}`,
        text: `Forwarded Inbound Reply\nFrom: ${fromEmail}\nTo: ${originalTo || 'funding.fsidigital.ca'}\nReceived: ${item.receivedAt}\nSubject: ${subject}\n\n---\n\n${bodyText}`,
        tags: [{ name: 'type', value: 'inbound-reply-forward' }],
      }),
    });

    const payload = await sendRes.json().catch(() => ({})) as { id?: string };
    if (sendRes.ok && payload.id) {
      forwardedCount++;
      forwardedIds.push(dedupeKey);
      ledger[dedupeKey] = {
        forwardedAt: new Date().toISOString(),
        fromEmail,
        subject,
        providerMessageId: payload.id,
      };
      ledgerDirty = true;
    } else {
      failedCount++;
    }
  }

  if (mode === 'live' && ledgerDirty) {
    // Keep ledger compact while preserving durability
    const prunedKeys = Object.keys(ledger).slice(-250);
    const trimmed: Record<string, ForwardedReplyRecord> = {};
    for (const k of prunedKeys) trimmed[k] = ledger[k];
    await setOperationalState(LEDGER_KEY, trimmed).catch(() => {});
  }

  return { forwardedCount, skippedCount, failedCount, forwardedIds };
}
