import { getStateDetailBySlug } from '../data/stateDetails';

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
  | 'InsiderInsightQuotes';

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

/**
 * Deterministically generates an array of 4-6 blocks based on Tier, Industry, and Intent.
 * Also injects "Named Entities" (Program Proof Layer) directly from the state's top programs.
 */
export function composePseoBlocks(req: ComposeRequest): PseoBlock[] {
  const blocks: PseoBlock[] = [];
  const stateData = getStateDetailBySlug(req.stateSlug);
  
  // Entity Proof Layer (Pull Top Program to inject hyper-local proof)
  const topProgram = stateData?.topPrograms?.[0]?.name || 'State Growth Fund';
  const topProgramAmount = stateData?.topPrograms?.[0]?.fundingAmount || '$50,000+ grants';

  // 1. Mandatory Anchor Block
  blocks.push({
    type: 'AnchorBlock',
    props: {
      cityName: req.cityName,
      industrySlug: req.industrySlug,
      topProgram,
      tier: req.tier
    }
  });

  // 2. Intent-Based Block Selection
  if (req.intent === 'informational') {
    blocks.push({ type: 'FundingRealityCheck', props: { topProgram, topProgramAmount } });
    if (req.tier === 'A') blocks.push({ type: 'FundingDensitySnapshot', props: {} });
    blocks.push({ type: 'WhoWinsMatrix', props: {} });
  } 
  else if (req.intent === 'transactional') {
    blocks.push({ type: 'BestEntryStrategy', props: { topProgram } });
    blocks.push({ type: 'LocalBrokerStrategy', props: {} });
  } 
  else if (req.intent === 'comparative') {
    blocks.push({ type: 'NearbyAlternatives', props: { currentTier: req.tier, stateSlug: req.stateSlug } });
    blocks.push({ type: 'FundingDecisionTree', props: {} });
  }

  // 3. Conditional Overrides based on Tier & Industry (Adding Diversity Composition)
  if (req.tier === 'A') {
    blocks.push({ type: 'LocalAdvantageHack', props: {} });
  } 
  else if (req.tier === 'B' || req.tier === 'C') {
    blocks.push({ type: 'DisqualifiersList', props: { industrySlug: req.industrySlug } });
    
    // Ensure we have NearbyAlternatives to funnel link juice
    if (!blocks.find(b => b.type === 'NearbyAlternatives')) {
      blocks.push({ type: 'NearbyAlternatives', props: { currentTier: req.tier, stateSlug: req.stateSlug } });
    }
  }

  // Industry-specific injection
  const techIndustries = ['technology', 'software', 'fintech'];
  if (techIndustries.includes(req.industrySlug.toLowerCase())) {
     if (!blocks.find(b => b.type === 'FundingDecisionTree')) {
         blocks.push({ type: 'FundingDecisionTree', props: {} }); // VC vs Grant
     }
  }

  const hardIndustries = ['manufacturing', 'logistics', 'agriculture'];
  if (hardIndustries.includes(req.industrySlug.toLowerCase())) {
     blocks.push({ type: 'KeyLocalInstitutions', props: {} }); // Physical zoning/SBDCs
  }
  
  // 4. Who Should Leave (Trust Builder)
  // Inject this on 50% of the pages purely based on city string length for deterministic rendering
  if (req.citySlug.length % 2 === 0 && !blocks.find(b => b.type === 'WhoShouldLeave')) {
      blocks.push({ type: 'WhoShouldLeave', props: {} });
  }

  // Cap at 6 blocks exactly (excluding Anchor which is mandatory) if we over-allocated
  if (blocks.length > 7) {
      return blocks.slice(0, 7);
  }

  return blocks;
}
