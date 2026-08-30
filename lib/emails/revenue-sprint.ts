import { isUnsubscribeToken } from '@/lib/auth/subscriber-tokens'
import { cleanCompanyName, cleanIndustryName, cleanRegionName, getFirstName, sendEmail } from '@/lib/emails/mailer'

export type RevenueSprintOfferId = 'funding-bundle' | 'funding-roadmap' | 'funding-membership' | 'funding-match-report'

const OFFERS: Record<RevenueSprintOfferId, {
  name: string
  price: number
  path: string
  tagType: string
  subject: string
  description: string
  deliverables: string[]
}> = {
  'funding-bundle': {
    name: 'Complete Funding Blueprint',
    price: 79,
    path: '/products/bundle',
    tagType: 'revenue-sprint-bundle-79',
    subject: 'A complete self-serve funding blueprint for your next application cycle',
    description: 'The most complete self-serve option for businesses actively planning applications and funding-stack decisions.',
    deliverables: ['Personalized match report', 'Step-by-step action plan', 'Multi-year stacking simulation'],
  },
  'funding-roadmap': {
    name: 'Funding Strategy & Action Plan',
    price: 49,
    path: '/products/action-plan',
    tagType: 'revenue-sprint-action-plan-49',
    subject: 'Turn your funding search into a preparation sequence',
    description: 'A self-serve roadmap for organizing deadlines, documents, risks, and the order in which to prepare applications.',
    deliverables: ['Prioritized program sequence', 'Document checklist', 'Immediate next-actions roadmap'],
  },
  'funding-membership': {
    name: 'Funding Watch',
    price: 29,
    path: '/membership',
    tagType: 'revenue-sprint-membership-29',
    subject: 'Keep your funding shortlist current without a call',
    description: 'The recurring self-serve option for founders who want profile-matched monitoring instead of a one-time report.',
    deliverables: ['Weekly automated radar email', 'Deadline and program-change alerts', 'Dashboard and template access'],
  },
  'funding-match-report': {
    name: 'Funding Match Report',
    price: 19,
    path: '/products/funding-match-report',
    tagType: 'revenue-sprint-report-19',
    subject: 'Your next self-serve funding-screening step',
    description: 'A concise first step for narrowing the current FSI database to programs worth reviewing for your profile.',
    deliverables: ['Personalized program shortlist', 'Readiness indicators', 'Recommended next steps'],
  },
}

function buildUrl(path: string, loginToken: string, tagType: string) {
  const params = new URLSearchParams({
    utm_source: 'growth_os',
    utm_medium: 'email',
    utm_campaign: tagType,
  })
  if (loginToken) params.set('token', loginToken)
  return `https://www.fsidigital.ca${path}?${params.toString()}`
}

export async function sendRevenueSprintOffer(input: {
  to: string
  name?: string
  companyName?: string
  industry?: string
  region?: string
  loginToken: string
  unsubscribeToken: string
  offerId: RevenueSprintOfferId
}) {
  const offer = OFFERS[input.offerId]
  const firstName = getFirstName(input.name)
  const company = cleanCompanyName(input.companyName)
  const industry = cleanIndustryName(input.industry)
  const region = cleanRegionName(input.region)
  const checkoutUrl = buildUrl(offer.path, input.loginToken, offer.tagType)
  const unsubscribeUrl = isUnsubscribeToken(input.unsubscribeToken, input.unsubscribeToken)
    ? `https://www.fsidigital.ca/subscribe/unsubscribe?token=${encodeURIComponent(input.unsubscribeToken)}`
    : 'https://www.fsidigital.ca/subscribe/unsubscribe'
  const profileContext = company
    ? `${company}'s ${industry} funding search in ${region}`
    : `your ${industry} funding search in ${region}`

  const html = `
    <div style="background:#f8fafc;padding:36px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#334155;">
      <div style="max-width:580px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:30px;">
        <div style="font-size:18px;font-weight:800;color:#0f172a;padding-bottom:16px;border-bottom:1px solid #f1f5f9;">FSI <span style="color:#059669;">Digital</span></div>
        <p style="font-weight:600;margin:22px 0 14px;">Hi ${firstName},</p>
        <p style="line-height:1.65;margin:0 0 14px;">You previously asked FSI Digital for business-funding information. Based on the profile saved for ${profileContext}, this is the most relevant next self-serve option in the current product set:</p>
        <div style="margin:22px 0;padding:20px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;">
          <div style="font-size:17px;font-weight:800;color:#064e3b;">${offer.name} — $${offer.price}${input.offerId === 'funding-membership' ? '/month' : ' USD one time'}</div>
          <p style="font-size:14px;line-height:1.55;color:#065f46;margin:9px 0 12px;">${offer.description}</p>
          <ul style="font-size:13px;line-height:1.7;color:#334155;margin:0;padding-left:20px;">${offer.deliverables.map((item) => `<li>${item}</li>`).join('')}</ul>
        </div>
        <p style="font-size:13px;line-height:1.6;color:#64748b;">No call or live session is required. Program availability and final eligibility should always be confirmed with the official funding body.</p>
        <div style="text-align:center;margin:26px 0;">
          <a href="${checkoutUrl}" style="display:inline-block;background:#059669;color:#ffffff;padding:13px 24px;border-radius:8px;text-decoration:none;font-weight:800;">View ${offer.name} — $${offer.price}${input.offerId === 'funding-membership' ? '/mo' : ''}</a>
        </div>
        <div style="padding-top:20px;border-top:1px solid #f1f5f9;font-size:13px;line-height:1.5;">Best regards,<br><strong>Ashwani K</strong><br><span style="color:#64748b;">Founder, FSI Digital</span></div>
        <div style="margin-top:20px;font-size:11px;color:#94a3b8;text-align:center;">You receive this because you opted in for funding information from FSI Digital.<br><a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;">Unsubscribe</a></div>
      </div>
    </div>`

  const text = `Hi ${firstName},\n\nYou previously asked FSI Digital for business-funding information. Based on the profile saved for ${profileContext}, the most relevant next self-serve option is:\n\n${offer.name} — $${offer.price}${input.offerId === 'funding-membership' ? '/month' : ' USD one time'}\n${offer.description}\n\nIncludes:\n${offer.deliverables.map((item) => `- ${item}`).join('\n')}\n\nNo call or live session is required. View it here:\n${checkoutUrl}\n\nProgram availability and final eligibility should always be confirmed with the official funding body.\n\nBest regards,\nAshwani K\nFounder, FSI Digital\n\nUnsubscribe: ${unsubscribeUrl}`

  return sendEmail({
    to: input.to,
    subject: offer.subject,
    html,
    text,
    tagType: offer.tagType,
    companyName: input.companyName,
  })
}

export function getRevenueSprintOffer(offerId: RevenueSprintOfferId) {
  return OFFERS[offerId]
}
