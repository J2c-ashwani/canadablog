import { getMCAApplications, getMCAConfig } from '../lib/mca/sheets';

const STAGE_DELAYS = {
  EMAIL_1: 'Recovery Stage 1 Delay (Hours)',
  EMAIL_2: 'Recovery Stage 2 Delay (Hours)',
  EMAIL_3: 'Recovery Stage 3 Delay (Hours)',
  EMAIL_4: 'Recovery Stage 4 Delay (Hours)',
  EMAIL_5: 'Recovery Stage 5 Delay (Hours)',
} as const;

async function main() {
  const [applications, config] = await Promise.all([getMCAApplications(2000), getMCAConfig()]);
  const delays = {
    EMAIL_1: Number.parseFloat(config[STAGE_DELAYS.EMAIL_1] || '1'),
    EMAIL_2: Number.parseFloat(config[STAGE_DELAYS.EMAIL_2] || '6'),
    EMAIL_3: Number.parseFloat(config[STAGE_DELAYS.EMAIL_3] || '24'),
    EMAIL_4: Number.parseFloat(config[STAGE_DELAYS.EMAIL_4] || '72'),
    EMAIL_5: Number.parseFloat(config[STAGE_DELAYS.EMAIL_5] || '168'),
  };
  const now = Date.now();
  const eligibleByStage: Record<string, number> = { EMAIL_1: 0, EMAIL_2: 0, EMAIL_3: 0, EMAIL_4: 0, EMAIL_5: 0 };
  let missingRecoveryToken = 0;
  let paidOrClosed = 0;

  for (const application of applications) {
    if (application.priorityProcessing || application.recoveryPurchased
      || ['COMPLETED', 'CANCELLED'].includes(application.priorityRecoveryStatus || '')) {
      paidOrClosed++;
      continue;
    }
    if (!/^mca_rec_[a-f0-9]{32}$/.test(application.recoveryToken || '')) {
      missingRecoveryToken++;
      continue;
    }
    const createdAt = new Date(application.timestamp).getTime();
    if (!Number.isFinite(createdAt)) continue;
    const elapsedHours = (now - createdAt) / 3_600_000;
    const lastSentAt = new Date(application.lastRecoveryEmail || '').getTime();
    const sinceLastHours = Number.isFinite(lastSentAt) ? (now - lastSentAt) / 3_600_000 : Number.POSITIVE_INFINITY;
    const status = application.priorityRecoveryStatus || 'ACTIVE';
    if (['ACTIVE', 'NONE', '', 'CHECKOUT_STARTED'].includes(status) && elapsedHours >= delays.EMAIL_1) eligibleByStage.EMAIL_1++;
    else if (status === 'EMAIL_1_SENT' && elapsedHours >= delays.EMAIL_2 && sinceLastHours >= 2) eligibleByStage.EMAIL_2++;
    else if (status === 'EMAIL_2_SENT' && elapsedHours >= delays.EMAIL_3 && sinceLastHours >= 12) eligibleByStage.EMAIL_3++;
    else if (status === 'EMAIL_3_SENT' && elapsedHours >= delays.EMAIL_4 && sinceLastHours >= 24) eligibleByStage.EMAIL_4++;
    else if (status === 'EMAIL_4_SENT' && elapsedHours >= delays.EMAIL_5 && sinceLastHours >= 24) eligibleByStage.EMAIL_5++;
  }

  console.log(JSON.stringify({
    applications: applications.length,
    paidOrClosed,
    missingRecoveryToken,
    eligibleByStage,
    eligibleTotal: Object.values(eligibleByStage).reduce((sum, value) => sum + value, 0),
    proposedDailyCap: 5,
  }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
