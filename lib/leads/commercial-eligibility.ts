type CommercialContact = {
  email?: string;
  name?: string;
  leadActivity?: string;
};

export function parseCommercialActivity(value?: string): Record<string, any> {
  try {
    return JSON.parse(value && value !== 'N/A' ? value : '{}');
  } catch {
    return {};
  }
}

export function isTestOrInternalContact(contact: CommercialContact) {
  const identity = `${contact.email || ''} ${contact.name || ''}`.toLowerCase().trim();
  return identity.includes('@example.com')
    || identity.includes('@test.com')
    || identity.includes('@fsidigital.ca')
    || identity.includes('test lead')
    || identity.includes('audit test')
    || identity.includes('alert-nurture-test')
    || identity.includes('sukashwanikumar')
    || identity.includes('ashwani kumar');
}

/** Keep automated commercial contact to one provider-accepted message per 48h. */
export function hasRecentCommercialProviderAcceptance(
  contact: CommercialContact,
  withinHours = 48,
) {
  const activity = parseCommercialActivity(contact.leadActivity);
  const pairs: Array<[unknown, unknown]> = [
    [activity.lastNewsletterAcceptedAt, activity.lastNewsletterProviderMessageId],
    [activity.b2bOutreachAcceptedAt, activity.b2bOutreachProviderMessageId],
    [activity.cartRecoveryEmail1AcceptedAt, activity.cartRecoveryEmail1ProviderMessageId],
    [activity.cartRecoveryEmail2AcceptedAt, activity.cartRecoveryEmail2ProviderMessageId],
    [activity.cartRecoveryEmail3AcceptedAt, activity.cartRecoveryEmail3ProviderMessageId],
    [activity.calcRecoveryEmail1AcceptedAt, activity.calcRecoveryEmail1ProviderMessageId],
    [activity.calcRecoveryEmail2AcceptedAt, activity.calcRecoveryEmail2ProviderMessageId],
    [activity.calcRecoveryEmail3AcceptedAt, activity.calcRecoveryEmail3ProviderMessageId],
  ];
  const cutoff = Date.now() - withinHours * 60 * 60 * 1000;
  return pairs.some(([acceptedAt, providerMessageId]) => {
    if (!providerMessageId || !acceptedAt) return false;
    const timestamp = new Date(String(acceptedAt)).getTime();
    return Number.isFinite(timestamp) && timestamp >= cutoff;
  });
}
