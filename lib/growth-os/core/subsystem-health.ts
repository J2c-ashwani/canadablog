import { BusinessImpactScore } from '../types'
import { AuthorityEngine } from '../authority/authority-engine'

export interface SubsystemHealthReport {
  subsystemId: string
  subsystemName: string
  monthlyCostUSD: number
  totalImpactGenerated: BusinessImpactScore
  lastUsedTimestamp: string
  recommendation: 'ACTIVE' | 'DEPRECATED' | 'RETIRE_RECOMMENDED'
  reason: string
}

const ZERO_IMPACT: BusinessImpactScore = {
  revenueImpactUSD: 0,
  founderTimeSavedMinutes: 0,
  customerTrustAddedScore: 0,
  knowledgeAddedScore: 0,
  competitiveAdvantageScore: 0,
  compositeImpactRating: 0,
}

/** Reports only values supported by runtime configuration or subsystem evidence. */
export class SubsystemHealthMonitor {
  public static getSubsystemReports(): SubsystemHealthReport[] {
    const authority = AuthorityEngine.getSubsystemHealth()
    const geminiConfigured = Boolean(process.env.GOOGLE_GEMINI_API_KEY)
    return [
      authority,
      {
        subsystemId: 'sub_campaign_gen',
        subsystemName: 'Campaign Copy Generator',
        monthlyCostUSD: 0,
        totalImpactGenerated: ZERO_IMPACT,
        lastUsedTimestamp: '',
        recommendation: geminiConfigured ? 'ACTIVE' : 'DEPRECATED',
        reason: geminiConfigured
          ? 'AI provider is configured; revenue impact remains unverified until a campaign has provider and purchase attribution.'
          : 'No AI provider credential is configured.',
      },
    ]
  }

  public static auditSubsystems(): SubsystemHealthReport[] {
    return this.getSubsystemReports()
  }
}
