import { appendOperationalRow, readOperationalRows } from '@/lib/growth-os/operations-store';

export type MembershipSubscriptionStatus = 'ACTIVE' | 'APPROVED' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED';

export interface MembershipSubscriptionRecord {
  subscriptionId: string;
  email: string;
  planId: string;
  status: MembershipSubscriptionStatus;
  amountUSD: number;
  providerVerifiedAt: string;
  lastPaymentId: string;
  lastPaymentAt: string;
  cancelledAt: string;
  updatedAt: string;
  evidenceSource: string;
  actionId: string;
  actionChannel: string;
  actionCampaign: string;
  actionRecipientId: string;
  actionIssuedAt: string;
  activatedAt: string;
}

const SUBSCRIPTION_HEADERS = [
  'Subscription ID', 'Email', 'Plan ID', 'Status', 'Amount USD', 'Provider Verified At',
  'Last Payment ID', 'Last Payment At', 'Cancelled At', 'Updated At', 'Evidence Source',
  'Action ID', 'Action Channel', 'Action Campaign', 'Action Recipient ID',
  'Action Issued At',
  'Activated At',
];
const PAYMENT_HEADERS = [
  'Payment ID', 'Subscription ID', 'Email', 'Amount', 'Currency', 'Status', 'Occurred At', 'Recorded At',
  'Action ID', 'Action Channel', 'Action Campaign', 'Action Recipient ID',
];

function parseSubscription(row: string[]): MembershipSubscriptionRecord {
  return {
    subscriptionId: row[0] || '',
    email: String(row[1] || '').toLowerCase(),
    planId: row[2] || '',
    status: (row[3] || 'CANCELLED') as MembershipSubscriptionStatus,
    amountUSD: Number(row[4] || 0),
    providerVerifiedAt: row[5] || '',
    lastPaymentId: row[6] || '',
    lastPaymentAt: row[7] || '',
    cancelledAt: row[8] || '',
    updatedAt: row[9] || '',
    evidenceSource: row[10] || '',
    actionId: row[11] || '',
    actionChannel: row[12] || '',
    actionCampaign: row[13] || '',
    actionRecipientId: row[14] || '',
    actionIssuedAt: row[15] || '',
    activatedAt: row[16] || '',
  };
}

export async function recordMembershipSubscription(
  record: Omit<MembershipSubscriptionRecord, 'updatedAt' | 'actionId' | 'actionChannel' | 'actionCampaign' | 'actionRecipientId' | 'actionIssuedAt' | 'activatedAt'> & {
    updatedAt?: string;
    actionId?: string;
    actionChannel?: string;
    actionCampaign?: string;
    actionRecipientId?: string;
    actionIssuedAt?: string;
    activatedAt?: string;
  }
) {
  const normalized: MembershipSubscriptionRecord = {
    ...record,
    email: record.email.toLowerCase().trim(),
    updatedAt: record.updatedAt || new Date().toISOString(),
    actionId: record.actionId || '',
    actionChannel: record.actionChannel || '',
    actionCampaign: record.actionCampaign || '',
    actionRecipientId: record.actionRecipientId || '',
    actionIssuedAt: record.actionIssuedAt || '',
    activatedAt: record.activatedAt || '',
  };
  await appendOperationalRow('Membership Subscriptions', SUBSCRIPTION_HEADERS, [
    normalized.subscriptionId,
    normalized.email,
    normalized.planId,
    normalized.status,
    normalized.amountUSD,
    normalized.providerVerifiedAt,
    normalized.lastPaymentId,
    normalized.lastPaymentAt,
    normalized.cancelledAt,
    normalized.updatedAt,
    normalized.evidenceSource,
    normalized.actionId,
    normalized.actionChannel,
    normalized.actionCampaign,
    normalized.actionRecipientId,
    normalized.actionIssuedAt,
    normalized.activatedAt,
  ]);
  return normalized;
}

export async function getLatestMembershipSubscriptions(): Promise<MembershipSubscriptionRecord[]> {
  const rows = await readOperationalRows('Membership Subscriptions', SUBSCRIPTION_HEADERS);
  const latest = new Map<string, MembershipSubscriptionRecord>();
  rows.map(parseSubscription).forEach((record) => latest.set(record.subscriptionId, record));
  return Array.from(latest.values());
}

export async function getMembershipSubscription(subscriptionId: string) {
  return (await getLatestMembershipSubscriptions()).find((record) => record.subscriptionId === subscriptionId) || null;
}

export async function recordMembershipPayment(data: {
  paymentId: string;
  subscriptionId: string;
  email: string;
  amount: string;
  currency: string;
  status: string;
  occurredAt: string;
  actionId?: string;
  actionChannel?: string;
  actionCampaign?: string;
  actionRecipientId?: string;
}) {
  const rows = await readOperationalRows('Membership Payments', PAYMENT_HEADERS);
  if (rows.some((row) => row[0] === data.paymentId)) return { duplicate: true };
  await appendOperationalRow('Membership Payments', PAYMENT_HEADERS, [
    data.paymentId,
    data.subscriptionId,
    data.email.toLowerCase().trim(),
    data.amount,
    data.currency,
    data.status,
    data.occurredAt,
    new Date().toISOString(),
    data.actionId || '',
    data.actionChannel || '',
    data.actionCampaign || '',
    data.actionRecipientId || '',
  ]);
  return { duplicate: false };
}

export async function recordMembershipPaymentTransition(data: {
  paymentId: string;
  status: string;
  occurredAt?: string;
}) {
  const rows = await readOperationalRows('Membership Payments', PAYMENT_HEADERS);
  const matchingRows = rows.filter((row) => row[0] === data.paymentId);
  const latest = matchingRows[matchingRows.length - 1];
  if (!latest) return { found: false, duplicate: false };
  if (String(latest[5] || '').toLowerCase() === data.status.toLowerCase()) {
    return { found: true, duplicate: true };
  }
  await appendOperationalRow('Membership Payments', PAYMENT_HEADERS, [
    latest[0] || data.paymentId,
    latest[1] || '',
    String(latest[2] || '').toLowerCase().trim(),
    latest[3] || '',
    latest[4] || '',
    data.status,
    data.occurredAt || new Date().toISOString(),
    new Date().toISOString(),
    latest[8] || '',
    latest[9] || '',
    latest[10] || '',
    latest[11] || '',
  ]);
  return { found: true, duplicate: false };
}

export interface MembershipPaymentRecord {
  paymentId: string;
  subscriptionId: string;
  email: string;
  amount: number;
  currency: string;
  status: string;
  occurredAt: string;
  actionId: string;
  actionChannel: string;
  actionCampaign: string;
  actionRecipientId: string;
}

export async function getMembershipPaymentSequenceNumber(subscriptionId: string, paymentId: string) {
  const rows = await readOperationalRows('Membership Payments', PAYMENT_HEADERS);
  const firstSeen = new Map<string, { paymentId: string; occurredAt: string; recordedAt: string }>();
  rows.forEach((row) => {
    if (row[1] !== subscriptionId || !row[0] || firstSeen.has(row[0])) return;
    firstSeen.set(row[0], { paymentId: row[0], occurredAt: row[6] || '', recordedAt: row[7] || '' });
  });
  const ordered = [...firstSeen.values()].sort((left, right) => {
    const time = new Date(left.occurredAt || left.recordedAt).getTime() - new Date(right.occurredAt || right.recordedAt).getTime();
    return time || left.paymentId.localeCompare(right.paymentId);
  });
  const index = ordered.findIndex((payment) => payment.paymentId === paymentId);
  return index >= 0 ? index + 1 : 0;
}

export async function getMembershipPayments(): Promise<MembershipPaymentRecord[]> {
  const latest = new Map<string, MembershipPaymentRecord>();
  (await readOperationalRows('Membership Payments', PAYMENT_HEADERS)).forEach((row) => {
    const record = {
      paymentId: row[0] || '',
      subscriptionId: row[1] || '',
      email: String(row[2] || '').toLowerCase(),
      amount: Number(row[3] || 0),
      currency: row[4] || '',
      status: row[5] || '',
      occurredAt: row[6] || '',
      actionId: row[8] || '',
      actionChannel: row[9] || '',
      actionCampaign: row[10] || '',
      actionRecipientId: row[11] || '',
    };
    if (record.paymentId) latest.set(record.paymentId, record);
  });
  return Array.from(latest.values());
}
