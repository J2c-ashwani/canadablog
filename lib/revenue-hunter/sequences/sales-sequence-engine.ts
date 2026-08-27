import { ExpectedRevenueCalculation, ProductOfferTier } from '../models/expected-revenue'

export interface GeneratedSalesMessage {
  subject: string
  htmlBody: string
  plainTextBody: string
  offerTier: ProductOfferTier
  priceUSD: number
  ctaUrl: string
}

export class SalesSequenceEngine {
  public static generateMessageForProspect(prospect: ExpectedRevenueCalculation): GeneratedSalesMessage {
    const offer = prospect.recommendedOffer
    const firstName = prospect.leadName.split(' ')[0] || 'Founder'
    const company = prospect.companyName || 'your enterprise'
    const industry = prospect.industry || 'technology'
    const province = prospect.province || 'Canada'

    let subject = ''
    let bodyIntro = ''
    let offerSection = ''
    let ctaButtonText = ''

    switch (offer.tier) {
      case 'TIER_BUNDLE_79':
        subject = `Capital Stacking Toolkit for ${company} (${province})`
        bodyIntro = `Canadian funding programs yield the highest return when federal non-dilutive grants and provincial tax incentives are combined without exceeding stacking caps.`
        offerSection = `
          <div style="background-color: #f8fafc; border-left: 4px solid #059669; padding: 16px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #0f172a;">Complete Capital Stacking Toolkit ($79 USD)</p>
            <p style="margin: 0 0 12px; font-size: 14px; color: #334155;">
              Get complete application templates, compliance checklists, stacking calculators, and narrative guidelines tailored to ${industry} in ${province}.
            </p>
          </div>
        `
        ctaButtonText = 'Access Capital Stacking Toolkit ($79)'
        break

      case 'TIER_REPORT_19':
        subject = `Funding Match Report for ${company}`
        bodyIntro = `Use your current business profile in ${province} to narrow the grant and funding programs worth reviewing first.`
        offerSection = `
          <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #0f172a;">Personalized Funding Match Report ($19 USD)</p>
            <p style="margin: 0 0 12px; font-size: 14px; color: #334155;">
              Get a self-serve shortlist and next-step view based on your declared region, industry, stage, and funding objective.
            </p>
          </div>
        `
        ctaButtonText = 'Get My Funding Match Report ($19)'
        break

      case 'TIER_MEMBERSHIP_29':
        subject = `Funding Watch for ${company} (${province})`
        bodyIntro = `Funding windows and deadlines change throughout the year. Funding Watch keeps ${company}'s self-serve funding shortlist current without requiring a call or live session.`
        offerSection = `
          <div style="background-color: #f8fafc; border-left: 4px solid #7c3aed; padding: 16px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #0f172a;">Funding Watch Membership ($29 USD/month)</p>
            <p style="margin: 0 0 12px; font-size: 14px; color: #334155;">
              Receive recurring funding matches, deadline monitoring, briefing archives, and self-serve templates matched to your declared profile.
            </p>
          </div>
        `
        ctaButtonText = 'Start Funding Watch ($29/month)'
        break

      case 'TIER_ACTION_PLAN_49':
      default:
        subject = `Funding Action Plan & Checklist for ${company}`
        bodyIntro = `We identified active Canadian non-dilutive funding programs suitable for ${company}'s current stage in ${province}.`
        offerSection = `
          <div style="background-color: #f8fafc; border-left: 4px solid #d97706; padding: 16px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #0f172a;">Step-by-Step Funding Action Plan ($49 USD)</p>
            <p style="margin: 0 0 12px; font-size: 14px; color: #334155;">
              A comprehensive breakdown of deadlines, eligible expenses, required documentation, and direct applicant scoring criteria for your sector.
            </p>
          </div>
        `
        ctaButtonText = 'Download Funding Action Plan ($49)'
        break
    }

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
        <p>Hi ${firstName},</p>
        <p>${bodyIntro}</p>
        ${offerSection}
        <div style="margin: 28px 0; text-align: center;">
          <a href="${offer.checkoutUrl}" style="background-color: #0f172a; color: #ffffff; padding: 14px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; font-size: 15px;">
            ${ctaButtonText} &rarr;
          </a>
        </div>
        <p style="font-size: 13px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
          FSI Digital — Canadian Business Funding Intelligence<br>
          Toronto, ON | <a href="https://www.fsidigital.ca" style="color: #64748b; text-decoration: underline;">fsidigital.ca</a>
        </p>
      </div>
    `

    const plainTextBody = `Hi ${firstName},\n\n${bodyIntro.replace(/<[^>]*>/g, '')}\n\n${offer.name} (${offer.priceUSD > 0 ? `$${offer.priceUSD} USD` : 'Custom'})\n\nView details and proceed: ${offer.checkoutUrl}\n\nBest regards,\nFSI Digital Funding Intelligence`

    return {
      subject,
      htmlBody,
      plainTextBody,
      offerTier: offer.tier,
      priceUSD: offer.priceUSD,
      ctaUrl: offer.checkoutUrl
    }
  }
}
