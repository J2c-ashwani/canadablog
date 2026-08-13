import { InternalLinkRecommendation } from './types'

/**
 * FSI Internal Link Engine (War Mode v1.0)
 * 
 * Server-rendered authority routing:
 * Analyzes semantic topic clusters (Industry, Province, Grant Program)
 * and automatically matches source pages with highest-commercial destination paths.
 */

export class InternalLinkEngine {
  public static generateInternalLinkPlan(sourcePath: string, keyword: string): InternalLinkRecommendation[] {
    const q = keyword.toLowerCase()
    const recommendations: InternalLinkRecommendation[] = []

    // 1. Regional Routing
    if (q.includes('ontario') || q.includes('toronto')) {
      recommendations.push({
        sourceUrlPath: sourcePath,
        destinationUrlPath: '/topics/ontario-small-business-grants',
        recommendedAnchorText: 'Explore active Ontario business grant programs',
        contextSnippet: 'For founders operating in Ontario, see the full breakdown of provincial grants and wage subsidies: ',
        authorityGainPotential: 'HIGH'
      })
    } else if (q.includes('alberta') || q.includes('calgary') || q.includes('edmonton')) {
      recommendations.push({
        sourceUrlPath: sourcePath,
        destinationUrlPath: '/topics/alberta-innovates-grant',
        recommendedAnchorText: 'Alberta Innovates funding eligibility criteria',
        contextSnippet: 'Alberta-based technology and industrial ventures can review specific matching rules: ',
        authorityGainPotential: 'HIGH'
      })
    } else if (q.includes('bc') || q.includes('vancouver')) {
      recommendations.push({
        sourceUrlPath: sourcePath,
        destinationUrlPath: '/topics/bc-tech-grant',
        recommendedAnchorText: 'British Columbia tech and innovation grants',
        contextSnippet: 'Review Western Economic Diversification and BC regional initiatives: ',
        authorityGainPotential: 'HIGH'
      })
    }

    // 2. High-Ticket Program Anchors (IRAP & SR&ED)
    if (q.includes('tech') || q.includes('software') || q.includes('r&d') || q.includes('innovation') || q.includes('manufacturing')) {
      recommendations.push({
        sourceUrlPath: sourcePath,
        destinationUrlPath: '/programs/irap-grant',
        recommendedAnchorText: 'NRC IRAP technology grant roadmap',
        contextSnippet: 'High-growth technology firms can stack local capital with the federal NRC IRAP program: ',
        authorityGainPotential: 'HIGH'
      })
      recommendations.push({
        sourceUrlPath: sourcePath,
        destinationUrlPath: '/programs/sred-tax-credit',
        recommendedAnchorText: 'SR&ED scientific research tax credit rules',
        contextSnippet: 'Ensure you maximize refundable tax credits alongside direct grant receipts: ',
        authorityGainPotential: 'HIGH'
      })
    }

    // 3. Calculator / Diagnostic Hub Anchor
    recommendations.push({
      sourceUrlPath: sourcePath,
      destinationUrlPath: '/tools',
      recommendedAnchorText: 'calculate your funding match in 60 seconds',
      contextSnippet: 'To estimate your exact capital entitlement across 50+ Canadian programs, ',
      authorityGainPotential: 'MEDIUM'
    })

    return recommendations
  }
}
