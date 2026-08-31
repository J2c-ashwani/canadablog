import { getOutreachProspectsFromSheet } from '../lib/google-sheets';

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const BLOCKED_MAILBOX_PREFIXES = ['noreply@', 'no-reply@', 'donotreply@', 'mailer-daemon@', 'bounce@'];

function normalizedStatus(value: string) {
  return value.trim().toLowerCase() || 'pending';
}

function hasValidContact(value: string) {
  const email = value.trim().toLowerCase();
  return EMAIL_PATTERN.test(email) && !BLOCKED_MAILBOX_PREFIXES.some((prefix) => email.startsWith(prefix));
}

function isPublicSource(value: string | undefined) {
  return /^https:\/\//i.test(String(value || '').trim());
}

async function main() {
  const prospects = await getOutreachProspectsFromSheet({ strict: true });
  const byStatus: Record<string, number> = {};
  const bySource: Record<string, number> = {};
  let validContact = 0;
  let hasPublicSource = 0;
  let hasPersonalizationEvidence = 0;
  let alreadyProviderAccepted = 0;
  let sendQualified = 0;
  let humanReviewReady = 0;
  let discoveryOnly = 0;

  for (const prospect of prospects) {
    const status = normalizedStatus(prospect.status || '');
    const source = String(prospect.source || '').trim().toLowerCase() || 'unknown';
    const contactValid = hasValidContact(prospect.email || '');
    const publicSource = isPublicSource(prospect.sourceUrl);
    const personalized = String(prospect.personalizedHook || '').trim().length >= 30
      && String(prospect.prospectName || prospect.name || '').trim().length > 1;
    const unsent = !prospect.providerMessageId && !prospect.sentAt;

    byStatus[status] = (byStatus[status] || 0) + 1;
    bySource[source] = (bySource[source] || 0) + 1;
    if (contactValid) validContact++;
    if (publicSource) hasPublicSource++;
    if (personalized) hasPersonalizationEvidence++;
    if (prospect.providerMessageId) alreadyProviderAccepted++;
    if (status === 'qualified' && contactValid && publicSource && personalized && unsent) sendQualified++;
    if (['review_required', 'qualified'].includes(status) && contactValid && publicSource && personalized && unsent) {
      humanReviewReady++;
    } else if (!prospect.providerMessageId) {
      discoveryOnly++;
    }
  }

  console.log(JSON.stringify({
    generatedAt: new Date().toISOString(),
    dryRun: true,
    messagesSent: 0,
    prospects: prospects.length,
    byStatus,
    bySource,
    evidenceCoverage: {
      validContact,
      hasPublicSource,
      hasPersonalizationEvidence,
      alreadyProviderAccepted,
    },
    partnerPilotInventory: {
      sendQualified,
      humanReviewReady,
      discoveryOnly,
    },
    decision: sendQualified > 0 ? 'HUMAN_REVIEW_BEFORE_ANY_SEND' : 'NO_SEND_QUALIFIED_INVENTORY',
    note: 'A public source URL is review evidence, not proof of consent or authorization to send.',
  }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
