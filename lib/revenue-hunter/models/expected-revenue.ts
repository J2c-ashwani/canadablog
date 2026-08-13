export type ProductOfferTier = 
  | 'TIER_REPORT_19' 
  | 'TIER_ACTION_PLAN_49' 
  | 'TIER_BUNDLE_79' 
  | 'TIER_STRATEGY_199' 
  | 'TIER_FILING_2500'

export interface ProductOfferDefinition {
  tier: ProductOfferTier
  name: string
  priceUSD: number
  targetIntentLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'ENTERPRISE'
  idealCandidateProfile: string
  checkoutUrl: string
}

export const PRODUCT_OFFERS: Record<ProductOfferTier, ProductOfferDefinition> = {
  TIER_REPORT_19: {
    tier: 'TIER_REPORT_19',
    name: 'Custom Funding Match Report',
    priceUSD: 19,
    targetIntentLevel: 'LOW',
    idealCandidateProfile: 'Early-stage founders, pre-revenue SMEs seeking high-level grant discovery',
    checkoutUrl: 'https://www.fsidigital.ca/checkout?product=report_19'
  },
  TIER_ACTION_PLAN_49: {
    tier: 'TIER_ACTION_PLAN_49',
    name: 'Comprehensive Funding Action Plan & Checklist',
    priceUSD: 49,
    targetIntentLevel: 'MEDIUM',
    idealCandidateProfile: 'Active SMEs planning Q3/Q4 grant applications needing step-by-step roadmaps',
    checkoutUrl: 'https://www.fsidigital.ca/checkout?product=action_plan_49'
  },
  TIER_BUNDLE_79: {
    tier: 'TIER_BUNDLE_79',
    name: 'Complete Capital Stacking Toolkit',
    priceUSD: 79,
    targetIntentLevel: 'HIGH',
    idealCandidateProfile: 'High-growth companies aiming to stack federal, provincial, and tax credits (SR&ED + IRAP)',
    checkoutUrl: 'https://www.fsidigital.ca/checkout?product=bundle_79'
  },
  TIER_STRATEGY_199: {
    tier: 'TIER_STRATEGY_199',
    name: '1-on-1 Executive Grant Strategy & Audit Session',
    priceUSD: 199,
    targetIntentLevel: 'HIGH',
    idealCandidateProfile: 'Founders with $100K+ capital requirements seeking live expert alignment and review',
    checkoutUrl: 'https://www.fsidigital.ca/checkout?product=strategy_session_199'
  },
  TIER_FILING_2500: {
    tier: 'TIER_FILING_2500',
    name: 'Full-Service Grant Filing & Technical Writing Engagement',
    priceUSD: 2500,
    targetIntentLevel: 'ENTERPRISE',
    idealCandidateProfile: 'Established Tech, CleanTech, AgriTech, and Manufacturing firms targeting $250K+ in non-dilutive capital',
    checkoutUrl: 'https://www.fsidigital.ca/contact?service=grant_filing_2500'
  }
}

export interface ExpectedRevenueCalculation {
  leadEmail: string
  leadName: string
  companyName: string
  industry: string
  province: string
  
  // Funnel Probabilities
  pDelivery: number
  pOpen: number
  pClick: number
  pCheckout: number
  pPayment: number
  
  // Selected Offer & Expected Value
  recommendedOffer: ProductOfferDefinition
  expectedValueUSD: number
  confidenceScore: number // 0 to 1
  priorityRankScore: number
  
  // Key Driver Context
  primaryIntentDriver: string
}

export class ExpectedRevenueModel {
  public static calculateExpectedRevenue(lead: {
    email: string
    name?: string
    companyName?: string
    industry?: string
    region?: string
    fundingAmount?: string
    readinessScore?: number
    engagementScore?: number
    leadActivity?: string
    timestamp?: string
    companySize?: string
  }): ExpectedRevenueCalculation {
    const rawActivity = (lead.leadActivity || '').toLowerCase()
    const ind = (lead.industry || '').toLowerCase()
    const funding = (lead.fundingAmount || '').toLowerCase()
    const size = lead.companySize || '1-9'
    const readiness = lead.readinessScore || 50
    const engagement = lead.engagementScore || 0

    // 1. Sector & Size Multipliers
    const isTechOrMfg = ['tech', 'software', 'mfg', 'manufacturing', 'clean', 'agri', 'life sciences', 'ai', 'biotech'].some(s => ind.includes(s))
    const isLargeFunding = funding.includes('100') || funding.includes('250') || funding.includes('500') || funding.includes('1m') || funding.includes('5m')
    const isMultiPersonTeam = size !== '1-9' && size !== 'N/A'

    // 2. Interaction Signals
    const hasStartedCheckout = rawActivity.includes('checkoutstarted')
    const hasClickedLinks = rawActivity.includes('linkclicks') || rawActivity.includes('clicked')
    const hasPreviousOutreach = rawActivity.includes('b2b_day') || rawActivity.includes('cartrecovery')

    // 3. Conditional Probability Modeling (Calibrated for B2B Commercial Intake)
    let pDelivery = 0.96
    let pOpen = 0.35
    let pClick = 0.15
    let pCheckout = 0.08
    let pPayment = 0.28 // Historical baseline

    if (hasPreviousOutreach) {
      pOpen += 0.10
    }
    if (hasClickedLinks || readiness >= 60) {
      pOpen += 0.25
      pClick += 0.18
      pCheckout += 0.12
    }
    if (hasStartedCheckout) {
      pOpen += 0.30
      pClick += 0.25
      pCheckout += 0.25
      pPayment += 0.10
    }

    // Clamp probabilities
    pOpen = Math.min(pOpen, 0.85)
    pClick = Math.min(pClick, 0.65)
    pCheckout = Math.min(pCheckout, 0.50)
    pPayment = Math.min(pPayment, 0.45)

    // 4. Adaptive Offer Selection
    let recommendedOffer: ProductOfferDefinition
    let primaryIntentDriver = 'General Grant Discovery'

    if (hasStartedCheckout) {
      recommendedOffer = PRODUCT_OFFERS.TIER_ACTION_PLAN_49
      primaryIntentDriver = 'Recent Abandoned Checkout — High Willingness to Transact'
    } else if (isTechOrMfg && isLargeFunding && (readiness >= 65 || isMultiPersonTeam)) {
      recommendedOffer = PRODUCT_OFFERS.TIER_FILING_2500
      primaryIntentDriver = 'High-Value Innovation SME ($100K+ Target, Team > 10)'
    } else if (hasClickedLinks || readiness >= 60 || engagement >= 40) {
      recommendedOffer = PRODUCT_OFFERS.TIER_STRATEGY_199
      primaryIntentDriver = 'High Intent via Assessment / Multiple Link Clicks'
    } else if (isLargeFunding || readiness >= 50) {
      recommendedOffer = PRODUCT_OFFERS.TIER_BUNDLE_79
      primaryIntentDriver = 'Active SME Seeking Multi-Program Capital Stacking'
    } else if (readiness >= 40) {
      recommendedOffer = PRODUCT_OFFERS.TIER_ACTION_PLAN_49
      primaryIntentDriver = 'Early Stage Discovery Needing Step-by-Step Action Plan'
    } else {
      recommendedOffer = PRODUCT_OFFERS.TIER_REPORT_19
      primaryIntentDriver = 'Entry Level Grant Overview'
    }

    // 5. Expected Value Calculation ($EV = P(Full Conversion) * Deal Value)
    // P(Conversion) = pOpen * pClick * pCheckout * pPayment
    const pConversion = pOpen * pClick * pCheckout * pPayment
    const expectedValueUSD = Number((pConversion * recommendedOffer.priceUSD).toFixed(2))

    // 6. Recency & Confidence Weights
    const daysSinceIntake = lead.timestamp 
      ? Math.max(1, (Date.now() - new Date(lead.timestamp).getTime()) / (1000 * 60 * 60 * 24))
      : 30
    
    // Recency decay: slightly penalize stale leads > 90 days
    const recencyWeight = Math.max(0.5, 1 - (daysSinceIntake / 365) * 0.5)
    const confidenceScore = Number(((readiness / 100) * 0.6 + (pOpen) * 0.4).toFixed(2))
    
    const priorityRankScore = Number((expectedValueUSD * confidenceScore * recencyWeight * 100).toFixed(1))

    return {
      leadEmail: lead.email,
      leadName: lead.name && lead.name !== 'N/A' ? lead.name : 'Founder',
      companyName: lead.companyName && lead.companyName !== 'N/A' ? lead.companyName : (lead.name ? `${lead.name}'s Enterprise` : 'Canadian SME'),
      industry: lead.industry && lead.industry !== 'N/A' ? lead.industry : 'Innovation / General',
      province: lead.region && lead.region !== 'N/A' ? lead.region : 'Canada',
      pDelivery,
      pOpen: Number(pOpen.toFixed(2)),
      pClick: Number(pClick.toFixed(2)),
      pCheckout: Number(pCheckout.toFixed(2)),
      pPayment: Number(pPayment.toFixed(2)),
      recommendedOffer,
      expectedValueUSD,
      confidenceScore,
      priorityRankScore,
      primaryIntentDriver
    }
  }
}
