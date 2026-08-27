export interface MCAReadinessProfile {
  applicationId: string;
  legalBusinessName: string;
  province: string;
  industry: string;
  yearsInBusiness: number;
  monthlyRevenue: number;
  fundingAmount: number;
  fundingPurpose: string;
  fileCount: number;
}

export interface MCAReadinessReport {
  score: number;
  band: 'Strong profile' | 'Needs preparation' | 'High preparation need';
  requestToRevenueRatio: number | null;
  findings: Array<{ label: string; points: number; maximum: number; detail: string }>;
  preparationChecklist: string[];
  checked: string[];
  notChecked: string[];
}

function finiteNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function buildMCAReadinessReport(profile: MCAReadinessProfile): MCAReadinessReport {
  const monthlyRevenue = finiteNumber(profile.monthlyRevenue);
  const fundingAmount = finiteNumber(profile.fundingAmount);
  const yearsInBusiness = finiteNumber(profile.yearsInBusiness);
  const fileCount = Math.floor(finiteNumber(profile.fileCount));
  const requestToRevenueRatio = monthlyRevenue > 0 ? fundingAmount / monthlyRevenue : null;

  const revenuePoints = monthlyRevenue >= 10_000 ? 25 : monthlyRevenue >= 5_000 ? 12 : 0;
  const timePoints = yearsInBusiness >= 2 ? 25 : yearsInBusiness >= 1 ? 18 : yearsInBusiness >= 0.5 ? 10 : 0;
  const ratioPoints = requestToRevenueRatio === null ? 0 : requestToRevenueRatio <= 1.5 ? 25 : requestToRevenueRatio <= 2.5 ? 15 : 5;
  const documentPoints = fileCount >= 3 ? 25 : fileCount >= 1 ? 12 : 0;
  const score = revenuePoints + timePoints + ratioPoints + documentPoints;

  return {
    score,
    band: score >= 75 ? 'Strong profile' : score >= 45 ? 'Needs preparation' : 'High preparation need',
    requestToRevenueRatio: requestToRevenueRatio === null ? null : Number(requestToRevenueRatio.toFixed(2)),
    findings: [
      {
        label: 'Declared monthly revenue',
        points: revenuePoints,
        maximum: 25,
        detail: monthlyRevenue >= 10_000
          ? 'Your declared monthly revenue clears the report’s strongest readiness threshold.'
          : monthlyRevenue >= 5_000
            ? 'Your declared revenue clears the entry threshold but may narrow available funding ranges.'
            : 'Declared monthly revenue is below the report’s entry threshold; confirm that the figure is current and complete.',
      },
      {
        label: 'Time in business',
        points: timePoints,
        maximum: 25,
        detail: yearsInBusiness >= 2
          ? 'Two or more years in business strengthens the declared operating-history signal.'
          : yearsInBusiness >= 0.5
            ? 'Your operating history is established but shorter than the strongest report threshold.'
            : 'A short operating history can materially limit funding options.',
      },
      {
        label: 'Funding request ratio',
        points: ratioPoints,
        maximum: 25,
        detail: requestToRevenueRatio === null
          ? 'A request ratio cannot be calculated because declared monthly revenue is zero.'
          : `Your request is ${requestToRevenueRatio.toFixed(2)}× declared monthly revenue. Lower ratios generally require less preparation.`,
      },
      {
        label: 'Document inventory',
        points: documentPoints,
        maximum: 25,
        detail: fileCount >= 3
          ? `${fileCount} uploaded files were recorded, meeting this report’s document-count threshold.`
          : fileCount >= 1
            ? `${fileCount} uploaded file${fileCount === 1 ? ' was' : 's were'} recorded. Confirm all required statement periods and pages are included.`
            : 'No uploaded files were recorded. Prepare complete original statement PDFs before underwriting.',
      },
    ],
    preparationChecklist: [
      'Export original, complete bank-statement PDFs directly from the financial institution.',
      'Confirm every page and statement period is present before providing documents to a funding partner.',
      'Review recent overdrafts, returned payments, negative balances, and unusual deposits yourself and prepare factual explanations.',
      'Confirm the legal business name, registration details, address, and ownership information are consistent across documents.',
      'Check that the requested amount and use of funds are specific and proportionate to current monthly revenue.',
    ],
    checked: [
      'Declared monthly revenue threshold',
      'Declared time in business',
      'Funding request relative to declared monthly revenue',
      'Number of uploaded files recorded with the application',
    ],
    notChecked: [
      'Bank-statement transactions, balances, deposits, NSF events, or overdrafts',
      'PDF page completeness, OCR quality, authenticity, or document contents',
      'Creditworthiness, lender eligibility, approval probability, or lender decisions',
    ],
  };
}
