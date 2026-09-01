import { createTrackedGrowthUrl, type GrowthActionContext } from '@/lib/growth-os/action-attribution'
import { ChannelAdapters, type ChannelPublishResult } from '@/lib/growth-os/execution/adapters/channel-adapters'
import { getLatestOperationalState, setOperationalState } from '@/lib/growth-os/operations-store'

export const SOCIAL_REVENUE_SPRINT_END_AT = '2026-09-25T18:29:59.000Z'
const STATE_KEY = 'social-revenue-sprint-september-v1'
const MIN_VARIANT_GAP_MS = 36 * 60 * 60 * 1000

type ChannelId = 'linkedin' | 'facebook'

type ChannelReceipt = {
  status: ChannelPublishResult['status']
  externalId: string
  acceptedAt: string
  message: string
}

type SocialSprintState = {
  variants: Record<string, Partial<Record<ChannelId, ChannelReceipt>>>
  lastAcceptedAt: string
  updatedAt: string
}

type Variant = {
  id: string
  offerId: 'funding-bundle' | 'funding-match-report' | 'funding-roadmap' | 'funding-toolkit' | 'funding-membership'
  target: string
  linkedin: string
  facebook: string
  hashtags: string[]
}

const VARIANTS: Variant[] = [
  {
    id: 'sep-product-ladder-v1',
    offerId: 'funding-bundle',
    target: 'https://www.fsidigital.ca/products/bundle?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_bundle',
    linkedin: `Grant research gets expensive when a founder chases every program without a preparation order.\n\nFSI Digital's self-serve funding ladder is live:\n• $19 USD Funding Match Report\n• $49 USD Funding Strategy & Action Plan\n• $79 USD Complete Funding Blueprint\n• $29 USD/month Funding Watch\n\nNo sales call or live session is required. These are research and planning tools—not a grant approval or a substitute for confirming current rules with the official funding body.\n\nStart with the complete blueprint:`,
    facebook: `Looking for a structured way to research business grants without booking a call?\n\nFSI Digital's self-serve products start at $19 USD. The $79 USD Complete Funding Blueprint combines a personalized match report, action plan, and multi-year funding-stack simulation.\n\nProgram details change, so final eligibility must always be confirmed with the official funding body.`,
    hashtags: ['#SmallBusinessGrants', '#GovernmentFunding', '#NonDilutiveFunding', '#CanadianBusiness', '#StartupFunding'],
  },
  {
    id: 'sep-match-fit-v1',
    offerId: 'funding-match-report',
    target: 'https://www.fsidigital.ca/products/funding-match-report?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_report',
    linkedin: `Before spending hours on a grant application, answer four questions:\n\n1. Does the program fit the business profile?\n2. Are the planned costs eligible?\n3. Is the timing realistic?\n4. Can the program be stacked with other support?\n\nFSI Digital's $19 USD Funding Match Report is a self-serve first step for narrowing the current database to programs worth reviewing. No call is required. Final eligibility still belongs to the official funding body.\n\nReview the match report:`,
    facebook: `A grant list is not an application plan. Start by narrowing the options to programs that fit your business profile, planned costs, and timing.\n\nThe FSI Digital Funding Match Report is $19 USD, self-serve, and requires no call. Always confirm current program rules and final eligibility with the official funding body.`,
    hashtags: ['#BusinessGrants', '#FundingStrategy', '#SmallBusiness', '#FounderResources', '#NonDilutiveCapital'],
  },
  {
    id: 'sep-action-plan-v1',
    offerId: 'funding-roadmap',
    target: 'https://www.fsidigital.ca/products/action-plan?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_action_plan',
    linkedin: `Finding a possible grant is only the beginning. The harder questions are what to prepare first, which documents create risk, and how to sequence multiple applications.\n\nFSI Digital's $49 USD Funding Strategy & Action Plan turns a saved business profile into a self-serve milestone sequence, document checklist, risk warnings, and next-actions plan. No call or live session is required.\n\nProgram rules change. Confirm final eligibility and deadlines with the official funding body.\n\nBuild your action plan:`,
    facebook: `A list of grants does not tell you what to prepare first.\n\nThe $49 USD Funding Strategy & Action Plan provides a self-serve milestone sequence, document checklist, risk warnings, and next-actions plan based on your saved profile. No call is required. Confirm final program rules with the official funding body.`,
    hashtags: ['#GrantApplications', '#FundingStrategy', '#SmallBusiness', '#BusinessPlanning', '#GovernmentFunding'],
  },
  {
    id: 'sep-toolkit-v1',
    offerId: 'funding-toolkit',
    target: 'https://www.fsidigital.ca/products/toolkit?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_toolkit',
    linkedin: `Grant preparation often stalls on the same practical work: building a project budget, forecasting cash flow, describing the project, and tracking each application.\n\nFSI Digital's $29 USD Funding Application Toolkit is a self-serve download with budget, cash-flow, hiring-plan, proposal-outline, readiness-checklist, and tracking templates. No call or live session is required.\n\nTemplates support preparation; they do not guarantee approval.\n\nReview the toolkit:`,
    facebook: `Need the working documents behind a grant application?\n\nThe $29 USD Funding Application Toolkit includes downloadable budget, cash-flow, hiring-plan, project-outline, readiness-checklist, and application-tracking templates. It is self-serve, and no call is required. Templates do not guarantee funding approval.`,
    hashtags: ['#GrantWriting', '#BusinessTemplates', '#SmallBusiness', '#CashFlowPlanning', '#FundingReadiness'],
  },
  {
    id: 'sep-membership-radar-v1',
    offerId: 'funding-membership',
    target: 'https://www.fsidigital.ca/membership?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_membership_radar',
    linkedin: `Government funding programs change: intake windows open, deadlines move, and program details are updated. Repeating the same research every week is difficult for a small team.\n\nFunding Watch is $29 USD/month. It compares a saved business profile with FSI Digital's funding database and sends an automated weekly email radar, with dashboard and template access. It is self-serve and can be cancelled through PayPal. No call or live session is required.\n\nFinal eligibility must still be confirmed with the official funding body.\n\nStart Funding Watch:`,
    facebook: `Funding programs and deadlines change. Funding Watch compares your saved business profile with FSI Digital's database and sends an automated weekly email radar.\n\nIt is $29 USD/month, self-serve, includes dashboard and template access, and can be cancelled through PayPal. Final eligibility must be confirmed with the official funding body.`,
    hashtags: ['#FundingAlerts', '#GovernmentGrants', '#SmallBusiness', '#FundingDeadlines', '#BusinessFunding'],
  },
  {
    id: 'sep-bundle-stacking-v1',
    offerId: 'funding-bundle',
    target: 'https://www.fsidigital.ca/products/bundle?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_stacking',
    linkedin: `One funding program may support hiring while another supports research, equipment, exporting, or training. The planning risk is treating every program as isolated.\n\nThe $79 USD Complete Funding Blueprint combines personalized matches, an application sequence, document checklist, and a multi-year funding-stack simulation in one self-serve package. No call or live session is required.\n\nStacking rules and eligibility vary by program, so confirm the current terms with each official funding body.\n\nReview the complete blueprint:`,
    facebook: `Funding planning is more useful when matches, timing, documents, and possible program stacking are reviewed together.\n\nThe $79 USD Complete Funding Blueprint combines those steps in one self-serve package. No call is required. Always confirm current stacking and eligibility rules with each official funding body.`,
    hashtags: ['#FundingStack', '#NonDilutiveFunding', '#BusinessGrants', '#GrowthCapital', '#FundingStrategy'],
  },
  {
    id: 'sep-match-costs-v1',
    offerId: 'funding-match-report',
    target: 'https://www.fsidigital.ca/products/funding-match-report?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_eligible_costs',
    linkedin: `A business can fit a funding program while its planned expense does not. That distinction matters before application work begins.\n\nThe $19 USD Funding Match Report helps narrow current programs by business profile, planned costs, timing, and preparation needs. It is a self-serve research tool, not an approval decision. No call is required.\n\nConfirm eligible costs and final eligibility with the official program source.\n\nNarrow your shortlist:`,
    facebook: `A business may fit a grant while the planned expense does not.\n\nThe $19 USD Funding Match Report helps narrow programs by business profile, planned costs, timing, and preparation needs. It is self-serve and requires no call. Confirm eligible costs with the official program source.`,
    hashtags: ['#EligibleCosts', '#BusinessFunding', '#GrantResearch', '#SmallBusiness', '#FundingMatch'],
  },
  {
    id: 'sep-action-documents-v1',
    offerId: 'funding-roadmap',
    target: 'https://www.fsidigital.ca/products/action-plan?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_documents',
    linkedin: `Application deadlines are visible. Document readiness is often the hidden constraint. Financial statements, project budgets, hiring plans, quotes, and corporate records can determine whether the timeline is realistic.\n\nThe $49 USD Funding Strategy & Action Plan provides a profile-based document checklist, risk indicators, milestone sequence, and immediate next actions. It is self-serve and requires no call.\n\nRequirements vary; verify the current checklist on the official program page.\n\nCreate your preparation sequence:`,
    facebook: `The deadline is only one part of grant readiness. The document checklist determines whether the application timeline is realistic.\n\nThe $49 USD Funding Strategy & Action Plan provides a self-serve checklist, risk indicators, milestone sequence, and next actions. Verify current requirements with the official funding body.`,
    hashtags: ['#GrantReadiness', '#DocumentChecklist', '#BusinessPlanning', '#GovernmentFunding', '#ApplicationStrategy'],
  },
  {
    id: 'sep-toolkit-budget-v1',
    offerId: 'funding-toolkit',
    target: 'https://www.fsidigital.ca/products/toolkit?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_budget_templates',
    linkedin: `A project budget should connect the work, timeline, eligible costs, and funding request. Starting from a blank spreadsheet makes that harder than it needs to be.\n\nThe $29 USD Funding Application Toolkit includes downloadable project-budget and cash-flow models plus preparation and tracking templates. It is self-serve, with no call or live session required.\n\nAdapt every template to the official program's current instructions.\n\nGet the working templates:`,
    facebook: `Building a project budget from a blank spreadsheet?\n\nThe $29 USD Funding Application Toolkit includes downloadable project-budget and cash-flow models plus proposal, readiness, and tracking templates. It is self-serve. Adapt every template to the official program's current instructions.`,
    hashtags: ['#ProjectBudget', '#CashFlow', '#GrantTemplates', '#SmallBusinessTools', '#FundingApplication'],
  },
  {
    id: 'sep-membership-changes-v1',
    offerId: 'funding-membership',
    target: 'https://www.fsidigital.ca/membership?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_program_changes',
    linkedin: `A funding search is a snapshot. Monitoring is the ongoing job: new matches, recorded program changes, and deadlines relevant to the same business profile.\n\nFunding Watch automates that recurring check for $29 USD/month through a weekly email radar and self-serve dashboard. It does not include individual analyst review or a live session, and it can be cancelled through PayPal.\n\nOfficial program sources remain the final authority.\n\nMonitor your profile:`,
    facebook: `A one-time funding search becomes outdated. Funding Watch provides an automated weekly email radar and dashboard based on your saved business profile for $29 USD/month.\n\nIt is self-serve, has no individual analyst review or live session, and can be cancelled through PayPal. Official program sources remain the final authority.`,
    hashtags: ['#GrantMonitoring', '#FundingWatch', '#SmallBusiness', '#FundingPrograms', '#FounderTools'],
  },
  {
    id: 'sep-choose-next-step-v1',
    offerId: 'funding-match-report',
    target: 'https://www.fsidigital.ca/products/funding-match-report?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_choose_next_step',
    linkedin: `Choose the smallest funding tool that answers the next question:\n\n• Which programs fit? — $19 USD Funding Match Report\n• Which documents and steps come first? — $49 USD Action Plan\n• How could several programs fit over time? — $79 USD Complete Blueprint\n• What changed this week? — $29 USD/month Funding Watch\n\nEvery option is self-serve. No call or live session is required. These tools support research and planning; the official funding body determines eligibility.\n\nStart with the $19 match report:`,
    facebook: `Choose the next funding step by the question you need answered: matches ($19 USD), preparation sequence ($49 USD), multi-year blueprint ($79 USD), or automated weekly monitoring ($29 USD/month).\n\nAll options are self-serve and require no call. Official funding bodies determine final eligibility. Start with the $19 match report.`,
    hashtags: ['#BusinessFunding', '#GrantResearch', '#FundingPlan', '#SmallBusiness', '#FounderResources'],
  },
]

function actionContext(channel: ChannelId, variant: Variant): GrowthActionContext {
  return {
    actionId: `act_social_revenue-sprint-${variant.id}-${channel}`,
    channel: 'organic_social',
    campaign: `revenue-sprint-social-${channel}-${variant.id}`,
    recipientId: `audience-${channel}-${variant.id}`,
  }
}

function accepted(receipt?: ChannelReceipt) {
  return Boolean(receipt?.externalId)
    && (receipt?.status === 'API_ACCEPTED' || receipt?.status === 'LIVE_PUBLISHED')
}

function providerAccepted(result: ChannelPublishResult) {
  return Boolean(result.externalId)
    && (result.status === 'API_ACCEPTED' || result.status === 'LIVE_PUBLISHED')
}

export class SocialRevenueSprintService {
  public static async run() {
    const now = Date.now()
    const existing = await getLatestOperationalState<SocialSprintState>(STATE_KEY)
    const state: SocialSprintState = existing || { variants: {}, lastAcceptedAt: '', updatedAt: '' }
    if (now > new Date(SOCIAL_REVENUE_SPRINT_END_AT).getTime()) {
      return { active: false, decision: 'EXPIRED', attempted: 0, accepted: 0, results: [] as ChannelPublishResult[] }
    }

    const variant = VARIANTS.find((candidate) => {
      const receipts = state.variants[candidate.id] || {}
      return !accepted(receipts.linkedin) || !accepted(receipts.facebook)
    })
    if (!variant) {
      return { active: true, decision: 'COMPLETE', attempted: 0, accepted: 0, results: [] as ChannelPublishResult[] }
    }

    const isFirstVariant = variant.id === VARIANTS[0].id
    const lastAcceptedMs = new Date(state.lastAcceptedAt || '').getTime()
    if (!isFirstVariant && Number.isFinite(lastAcceptedMs) && now - lastAcceptedMs < MIN_VARIANT_GAP_MS) {
      return { active: true, decision: 'WAITING_FOR_NEXT_VARIANT', attempted: 0, accepted: 0, results: [] as ChannelPublishResult[] }
    }

    const receipts = state.variants[variant.id] || {}
    const results: ChannelPublishResult[] = []
    const dispatch = async (channel: ChannelId, send: () => Promise<ChannelPublishResult>) => {
      if (accepted(receipts[channel])) return
      const result = await send()
      results.push(result)
      if (!providerAccepted(result)) return
      const acceptedAt = new Date().toISOString()
      receipts[channel] = {
        status: result.status,
        externalId: result.externalId || '',
        acceptedAt,
        message: result.message,
      }
      state.variants[variant.id] = receipts
      state.lastAcceptedAt = acceptedAt
      state.updatedAt = acceptedAt
      await setOperationalState(STATE_KEY, state)
    }

    const linkedInUrl = createTrackedGrowthUrl(variant.target, actionContext('linkedin', variant))
    const facebookUrl = createTrackedGrowthUrl(variant.target, actionContext('facebook', variant))
    await dispatch('linkedin', () => ChannelAdapters.postLinkedIn(`${variant.linkedin}\n${linkedInUrl}`, variant.hashtags))
    await dispatch('facebook', () => ChannelAdapters.postFacebook(variant.facebook, facebookUrl))

    return {
      active: true,
      decision: results.some(providerAccepted)
        ? 'PUBLISHED'
        : 'PROVIDER_REJECTED',
      variantId: variant.id,
      offerId: variant.offerId,
      attempted: results.length,
      accepted: results.filter(providerAccepted).length,
      results,
    }
  }
}
