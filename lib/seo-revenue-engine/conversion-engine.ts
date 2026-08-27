export interface CommercialFunnelStructure {
  heroBlock: {
    heading: string
    subheading: string
    ctaText: string
    ctaUrl: string
    priceUSD: number
  }
  midPageBlock: {
    heading: string
    body: string
    ctaText: string
    ctaUrl: string
    priceUSD: number
  }
  membershipBlock: {
    heading: string
    body: string
    ctaText: string
    ctaUrl: string
    priceUSD: number
  }
  bundleBlock: {
    heading: string
    body: string
    ctaText: string
    ctaUrl: string
    priceUSD: number
  }
}

/**
 * FSI Conversion Engine (War Mode v1.0)
 * 
 * Ensures no commercial organic visitor reads content and leaves without an entry
 * point into the commercial monetization funnel.
 */
export class ConversionEngine {
  public static generatePageFunnel(keyword: string, province?: string): CommercialFunnelStructure {
    const loc = province ? ` in ${province.toUpperCase()}` : ' in Canada'

    return {
      heroBlock: {
        heading: `Find Funding Your Business May Qualify For${loc}`,
        subheading: 'Answer 5 quick questions and receive your personalized non-dilutive grant summary.',
        ctaText: 'Check My Eligibility — Free',
        ctaUrl: '/tools',
        priceUSD: 0
      },
      midPageBlock: {
        heading: 'Accelerate Your Funding Approval',
        body: 'Skip the trial-and-error. Get the verified 2026 Funding Action Plan with document preflight checklists and scoring rules.',
        ctaText: 'Get Personalized Funding Action Plan — $49 USD',
        ctaUrl: 'https://www.fsidigital.ca/checkout?product=action_plan_49',
        priceUSD: 49
      },
      membershipBlock: {
        heading: 'Keep Funding Matches and Deadlines Current',
        body: 'Use Funding Watch for recurring funding matches, deadline monitoring, briefing archives, and self-serve templates.',
        ctaText: 'Start Funding Watch — $29 USD/month',
        ctaUrl: 'https://www.fsidigital.ca/membership',
        priceUSD: 29
      },
      bundleBlock: {
        heading: 'Build a Complete Self-Serve Funding Blueprint',
        body: 'Combine the action plan, application templates, compliance checks, and capital-stacking tools in one instant-access bundle.',
        ctaText: 'Get Complete Funding Blueprint — $79 USD',
        ctaUrl: 'https://www.fsidigital.ca/products/bundle',
        priceUSD: 79
      }
    }
  }
}
