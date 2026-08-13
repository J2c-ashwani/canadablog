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
  bottomBlock: {
    heading: string
    body: string
    ctaText: string
    ctaUrl: string
    priceUSD: number
  }
  highTicketBlock: {
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
      bottomBlock: {
        heading: 'Need Help Deciding Which Grants to Pursue?',
        body: 'Book a 1-on-1 strategy and grant audit session with an FSI funding specialist to review your capital stack.',
        ctaText: 'Book 1-on-1 Strategy Session — $199 USD',
        ctaUrl: 'https://www.fsidigital.ca/checkout?product=strategy_session_199',
        priceUSD: 199
      },
      highTicketBlock: {
        heading: 'Want Us to Handle Your Grant Filing End-to-End?',
        body: 'For established tech, clean-tech, and manufacturing ventures targeting $250K+ in capital, our senior writing team manages the entire submission.',
        ctaText: 'Request Grant Filing Assessment ($2,500+)',
        ctaUrl: 'https://www.fsidigital.ca/contact?service=grant_filing_2500',
        priceUSD: 2500
      }
    }
  }
}
