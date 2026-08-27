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
          <p>Thanks for your interest. The Complete Funding Blueprint gives you instant, self-serve access to the action plan, application templates, compliance checks, and capital-stacking tools.</p>
          <p><a href="https://www.fsidigital.ca/products/bundle" style="font-weight: bold; color: #0284c7;">Get the Complete Funding Blueprint — $79 USD &rarr;</a></p>
        `,
        suggestedResponseText: `Hi ${prospectName},\n\nThanks for your interest. Get instant self-serve access to the Complete Funding Blueprint for $79 USD:\nhttps://www.fsidigital.ca/products/bundle\n\nBest regards,\nFSI Digital Team`
      }
    }

    if (text.includes('expensive') || text.includes('cost') || text.includes('budget') || text.includes('afford') || text.includes('free')) {
      return {
        category: 'PRICE_RESISTANCE',
        sentiment: 'NEUTRAL',
        recommendedAction: 'OFFER_DOWNSELL',
        suggestedResponseHtml: `
          <p>Hi ${prospectName},</p>
          <p>Understood. The self-serve <strong>Personalized Funding Match Report ($19 USD)</strong> is the lowest-cost way to narrow the programs worth reviewing first.</p>
          <p><a href="https://www.fsidigital.ca/products/funding-match-report" style="font-weight: bold; color: #0284c7;">Get the $19 Funding Match Report &rarr;</a></p>
        `,
        suggestedResponseText: `Hi ${prospectName},\n\nUnderstood. Start with the self-serve Personalized Funding Match Report for $19 USD:\nhttps://www.fsidigital.ca/products/funding-match-report\n\nBest regards,\nFSI Digital Team`
      }
    }

    // Default Scope / Clarification
    return {
      category: 'SCOPE_INQUIRY',
      sentiment: 'NEUTRAL',
      recommendedAction: 'PROVIDE_FAQ_CLARIFICATION',
      suggestedResponseHtml: `
        <p>Hi ${prospectName},</p>
        <p>Thank you for reaching out. ${offerName} is a self-serve product built from the business profile and funding objective you provide.</p>
        <p>You can review the current product scope and proceed directly from the product page—no call or live session is required.</p>
      `,
      suggestedResponseText: `Hi ${prospectName},\n\nThank you for reaching out. ${offerName} is self-serve and does not require a call or live session. You can review its scope and proceed directly from the product page.\n\nBest regards,\nFSI Digital Team`
    }
  }
}
