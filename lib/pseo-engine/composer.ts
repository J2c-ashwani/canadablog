import { getStateDetailBySlugOrAbbreviation } from '../data/stateDetails';

export type BlockIntent = 'informational' | 'transactional' | 'comparative';
export type PseoTier = 'A' | 'B' | 'C';

export type BlockType = 
  // Mandatory Anchor
  | 'AnchorBlock'
  // Informational
  | 'FundingRealityCheck'
  | 'FundingDensitySnapshot'
  | 'WhoWinsMatrix'
  // Transactional
  | 'BestEntryStrategy'
  | 'LocalBrokerStrategy'
  // Comparative
  | 'NearbyAlternatives'
  | 'FundingDecisionTree'
  // Strategy Extensions
  | 'LocalAdvantageHack'
  | 'WhoShouldLeave'
  | 'DisqualifiersList'
  | 'KeyLocalInstitutions'
  | 'InsiderInsightQuotes'
  | 'MicroFAQ';

export interface PseoBlock {
  type: BlockType;
  props: any;
}

export interface ComposeRequest {
  tier: PseoTier;
  industrySlug: string;
  citySlug: string;
  cityName: string;
  stateSlug: string;
  intent: BlockIntent;
}

const CANADIAN_REGION_SLUGS = new Set(['on', 'bc', 'ab', 'qc', 'mb', 'sk', 'ns', 'nl', 'nb', 'pe']);

const CANADIAN_PROVINCE_TOP_PROGRAMS: Record<string, Array<{ name: string; fundingAmount: string }>> = {
  on: [
    { name: 'Ontario Skills Development Fund (SDF)', fundingAmount: '$150,000–$500,000 workforce grants' },
    { name: 'Ontario Centre of Innovation (OCI) Voucher Program', fundingAmount: '$50,000–$150,000 tech commercialization' },
  ],
  bc: [
    { name: 'Innovate BC Ignite Program', fundingAmount: '$300,000 commercialization grants' },
    { name: 'BC Employer Training Grant', fundingAmount: 'Up to $10,000 per employee ($300K cap)' },
  ],
  ab: [
    { name: 'Alberta Innovates Digital Traction & Voucher Program', fundingAmount: '$50,000–$100,000 non-dilutive grants' },
    { name: 'Alberta Job Creation Tax Credit & CARES Program', fundingAmount: 'Up to $250,000 per project' },
  ],
  qc: [
    { name: 'Quebec R&D Tax Credit & Investissement Québec (IQ)', fundingAmount: 'Up to 30% refundable tax credit + $500K scale-up loans' },
    { name: 'Programme Innovation du Québec (MEIE)', fundingAmount: 'Up to $350,000 non-repayable grants' },
  ],
  mb: [
    { name: 'Manitoba Innovation Growth Program (IGP)', fundingAmount: 'Up to $100,000 cost-shared development grants' },
    { name: 'Manitoba Industry Expansion Program', fundingAmount: 'Up to 50% direct wage training reimbursement' },
  ],
  sk: [
    { name: 'Saskatchewan Technology Startup Incentive (STSI)', fundingAmount: '45% non-refundable angel tax credit' },
    { name: 'Saskatchewan Product Commercialization Program', fundingAmount: 'Up to $50,000 non-repayable grants' },
  ],
  ns: [
    { name: 'Nova Scotia Business Growth & Innovation Fund', fundingAmount: 'Up to $100,000 non-repayable funding' },
    { name: 'Nova Scotia WIPSI Training Incentive', fundingAmount: 'Up to $100,000 in 50% wage subsidies' },
  ],
  nb: [
    { name: 'Opportunities NB Business Growth Initiative', fundingAmount: 'Up to $200,000 non-repayable payroll & capital grants' },
    { name: 'NBIF Research & Voucher Fund', fundingAmount: 'Up to $80,000 project grants' },
  ],
  nl: [
    { name: 'Newfoundland & Labrador Business Development Support', fundingAmount: 'Up to $100,000 in 50% non-repayable grants' },
    { name: 'InnovateNL R&D Voucher Program', fundingAmount: 'Up to $75,000 technical validation grants' },
  ],
  pe: [
    { name: 'Innovation PEI Pilot Commercialization Fund', fundingAmount: 'Up to $100,000 non-repayable grants' },
    { name: 'PEI Capital Acquisition Grant', fundingAmount: 'Up to $25,000 non-repayable assistance' },
  ],
};

/**
 * Deterministically generates an array of 4-6 blocks based on Tier, Industry, and Intent.
 * Also injects "Named Entities" (Program Proof Layer) directly from the region's top programs.
 */
export function composePseoBlocks(req: ComposeRequest): PseoBlock[] {
  const blocks: PseoBlock[] = [];
  const stateData = getStateDetailBySlugOrAbbreviation(req.stateSlug);
  const regionType = CANADIAN_REGION_SLUGS.has(req.stateSlug) ? 'province' : 'state';
  const canProvData = CANADIAN_PROVINCE_TOP_PROGRAMS[req.stateSlug.toLowerCase()];
  
  // Entity Proof Layer (Pull Top 2 Programs to inject hyper-local proof - HARD REQUIREMENT)
  const program1 = stateData?.topPrograms?.[0]?.name ||
    canProvData?.[0]?.name ||
    (regionType === 'province' ? 'NRC-IRAP Project Grant' : 'State Growth Fund');
  const amount1 = stateData?.topPrograms?.[0]?.fundingAmount ||
    canProvData?.[0]?.fundingAmount ||
    (regionType === 'province' ? '$50,000–$500,000 grants' : '$50,000+ grants');
  const program2 = stateData?.topPrograms?.[1]?.name ||
    canProvData?.[1]?.name ||
    (regionType === 'province' ? 'SR&ED Tax Credit Program' : 'Regional Job Creation Incentive');
  const amount2 = stateData?.topPrograms?.[1]?.fundingAmount ||
    canProvData?.[1]?.fundingAmount ||
    (regionType === 'province' ? 'Up to 64% refundable tax credit' : 'Variable grants and tax credits');

  // Internal Linking Anchor Text Variation Logic
  const anchorVariations = [
      `${req.stateSlug.replace('-', ' ')} grants`,
      `funding programs in ${req.stateSlug.replace('-', ' ')}`,
      `${req.stateSlug.replace('-', ' ')} business incentives`,
      `startup capital in ${req.stateSlug.replace('-', ' ')}`
  ];
  const anchorText = anchorVariations[(req.citySlug.length) % anchorVariations.length];

  // 1. Mandatory Anchor Block
  blocks.push({
    type: 'AnchorBlock',
    props: {
      cityName: req.cityName,
      industrySlug: req.industrySlug,
      program1, amount1, program2, amount2,
      tier: req.tier,
      regionType
    }
  });

  // Diversity Constraint: Shift the core block sequence based on city string length
  const diversityShift = req.citySlug.length % 3;

  // 2. Intent-Based Block Selection with Diversity Shifting
  if (req.intent === 'informational') {
    blocks.push({ type: 'FundingRealityCheck', props: { program1, amount1 } });
    if (diversityShift === 0) blocks.push({ type: 'WhoWinsMatrix', props: {} });
    if (diversityShift === 1 && req.tier === 'A') blocks.push({ type: 'FundingDensitySnapshot', props: {} });
  } 
  else if (req.intent === 'transactional') {
    blocks.push({ type: 'BestEntryStrategy', props: { program1 } });
    if (diversityShift !== 2) blocks.push({ type: 'LocalBrokerStrategy', props: {} });
  } 
  else if (req.intent === 'comparative') {
    blocks.push({ type: 'NearbyAlternatives', props: { currentTier: req.tier, stateSlug: req.stateSlug, anchorText } });
    if (diversityShift === 0) blocks.push({ type: 'FundingDecisionTree', props: {} });
  }

  // 3. Conditional Overrides based on Tier & Industry
  if (req.tier === 'A') {
    if (diversityShift === 1) blocks.push({ type: 'LocalAdvantageHack', props: {} });
  } 
  else if (req.tier === 'B' || req.tier === 'C') {
    blocks.push({ type: 'DisqualifiersList', props: { industrySlug: req.industrySlug, program2 } });
    if (!blocks.find(b => b.type === 'NearbyAlternatives')) {
      blocks.push({ type: 'NearbyAlternatives', props: { currentTier: req.tier, stateSlug: req.stateSlug, anchorText } });
    }
  }

  // Industry-specific injection (Diverse scattering)
  const techIndustries = ['technology', 'software', 'fintech'];
  if (techIndustries.includes(req.industrySlug.toLowerCase()) && diversityShift === 2) {
     if (!blocks.find(b => b.type === 'FundingDecisionTree')) blocks.push({ type: 'FundingDecisionTree', props: {} });
  }
  
  // 4. Micro-FAQ Block (Captures long-tail, boosts indexation)
  if (!blocks.find(b => b.type === 'MicroFAQ')) {
      blocks.push({ type: 'MicroFAQ', props: { industrySlug: req.industrySlug, cityName: req.cityName, program1, regionType } });
  }

  // 5. Who Should Leave (Trust Builder)
  if (req.citySlug.length % 2 === 0 && !blocks.find(b => b.type === 'WhoShouldLeave')) {
      blocks.push({ type: 'WhoShouldLeave', props: {} });
  }

  // Cap at 6 blocks exactly (excluding Anchor)
  return blocks.length > 7 ? blocks.slice(0, 7) : blocks;
}
