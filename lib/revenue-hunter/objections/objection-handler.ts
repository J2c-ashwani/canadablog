export type ObjectionCategory = 
  | 'PRICE_RESISTANCE' 
  | 'SCOPE_INQUIRY' 
  | 'ELIGIBILITY_DOUBT' 
  | 'POSITIVE_PURCHASE_INTENT' 
  | 'UNSUBSCRIBE_REQUEST' 
  | 'GENERAL'

export interface ObjectionAnalysis {
  category: ObjectionCategory
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'
  recommendedAction: 'ROUTE_TO_CHECKOUT' | 'OFFER_DOWNSELL' | 'PROVIDE_FAQ_CLARIFICATION' | 'UNSUBSCRIBE'
  suggestedResponseHtml: string
  suggestedResponseText: string
}

export class ObjectionHandler {
  public static analyzeInboundReply(replyText: string, prospectName: string, offerName: string): ObjectionAnalysis {
    const text = replyText.toLowerCase()

    if (text.includes('unsubscribe') || text.includes('stop') || text.includes('remove me')) {
      return {
        category: 'UNSUBSCRIBE_REQUEST',
        sentiment: 'NEGATIVE',
        recommendedAction: 'UNSUBSCRIBE',
        suggestedResponseHtml: '<p>You have been successfully removed from our outreach sequence. Thank you.</p>',
        suggestedResponseText: 'You have been successfully removed from our outreach sequence. Thank you.'
      }
    }

    if (text.includes('interested') || text.includes('call') || text.includes('schedule') || text.includes('book') || text.includes('ready') || text.includes('send link')) {
      return {
        category: 'POSITIVE_PURCHASE_INTENT',
        sentiment: 'POSITIVE',
        recommendedAction: 'ROUTE_TO_CHECKOUT',
        suggestedResponseHtml: `
          <p>Hi ${prospectName},</p>
          <p>Fantastic — we would be glad to work with you on your funding applications.</p>
          <p>You can reserve your session or complete your project intake directly here:</p>
          <p><a href="https://www.fsidigital.ca/checkout" style="font-weight: bold; color: #0284c7;">Complete Intake & Proceed &rarr;</a></p>
          <p>Once submitted, our team prepares your draft immediately.</p>
        `,
        suggestedResponseText: `Hi ${prospectName},\n\nFantastic — you can reserve your session or complete your project intake here:\nhttps://www.fsidigital.ca/checkout\n\nBest regards,\nFSI Digital Team`
      }
    }

    if (text.includes('expensive') || text.includes('cost') || text.includes('budget') || text.includes('afford') || text.includes('free')) {
      return {
        category: 'PRICE_RESISTANCE',
        sentiment: 'NEUTRAL',
        recommendedAction: 'OFFER_DOWNSELL',
        suggestedResponseHtml: `
          <p>Hi ${prospectName},</p>
          <p>Understood completely. If a full engagement or strategy session is not the right fit for your current cash flow, we also offer our self-serve <strong>Step-by-Step Funding Action Plan ($49 USD)</strong>.</p>
          <p>It provides full application templates, scoring rubrics, and direct government portal links so you can file independently.</p>
          <p><a href="https://www.fsidigital.ca/checkout?product=action_plan_49" style="font-weight: bold; color: #0284c7;">Access $49 Funding Action Plan &rarr;</a></p>
        `,
        suggestedResponseText: `Hi ${prospectName},\n\nUnderstood. We also offer our self-serve Funding Action Plan for $49 USD:\nhttps://www.fsidigital.ca/checkout?product=action_plan_49\n\nBest regards,\nFSI Digital Team`
      }
    }

    // Default Scope / Clarification
    return {
      category: 'SCOPE_INQUIRY',
      sentiment: 'NEUTRAL',
      recommendedAction: 'PROVIDE_FAQ_CLARIFICATION',
      suggestedResponseHtml: `
        <p>Hi ${prospectName},</p>
        <p>Thank you for reaching out. In our ${offerName}, we conduct a comprehensive evaluation of your company's R&D, capital expenditures, and hiring plans to map exact non-dilutive grant programs.</p>
        <p>Let us know if you'd like to review your current grant eligibility or book a working session.</p>
      `,
      suggestedResponseText: `Hi ${prospectName},\n\nThank you for reaching out. We would be happy to review your grant eligibility.\n\nBest regards,\nFSI Digital Team`
    }
  }
}
