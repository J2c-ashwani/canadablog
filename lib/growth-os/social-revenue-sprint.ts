import { createTrackedGrowthUrl, type GrowthActionContext } from '@/lib/growth-os/action-attribution'
import { ChannelAdapters, type ChannelPublishResult } from '@/lib/growth-os/execution/adapters/channel-adapters'
import { getLatestOperationalState, setOperationalState } from '@/lib/growth-os/operations-store'

export const SOCIAL_REVENUE_SPRINT_END_AT = '2026-08-31T18:29:59.000Z'
const STATE_KEY = 'social-revenue-sprint-v1'
const MIN_VARIANT_GAP_MS = 18 * 60 * 60 * 1000

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
  offerId: 'funding-bundle' | 'funding-match-report'
  target: string
  linkedin: string
  facebook: string
  hashtags: string[]
}

const VARIANTS: Variant[] = [
  {
    id: 'bundle-proof-v1',
    offerId: 'funding-bundle',
    target: 'https://www.fsidigital.ca/products/bundle?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_bundle',
    linkedin: `Grant research gets expensive when a founder chases every program without a preparation order.\n\nFSI Digital's self-serve funding ladder is live:\n• $19 USD Funding Match Report\n• $49 USD Funding Strategy & Action Plan\n• $79 USD Complete Funding Blueprint\n• $29 USD/month Funding Watch\n\nNo sales call or live session is required. These are research and planning tools—not a grant approval or a substitute for confirming current rules with the official funding body.\n\nStart with the complete blueprint:`,
    facebook: `Looking for a structured way to research business grants without booking a call?\n\nFSI Digital's self-serve products start at $19 USD. The $79 USD Complete Funding Blueprint combines a personalized match report, action plan, and multi-year funding-stack simulation.\n\nProgram details change, so final eligibility must always be confirmed with the official funding body.`,
    hashtags: ['#SmallBusinessGrants', '#GovernmentFunding', '#NonDilutiveFunding', '#CanadianBusiness', '#StartupFunding'],
  },
  {
    id: 'match-report-v1',
    offerId: 'funding-match-report',
    target: 'https://www.fsidigital.ca/products/funding-match-report?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_report',
    linkedin: `Before spending hours on a grant application, answer four questions:\n\n1. Does the program fit the business profile?\n2. Are the planned costs eligible?\n3. Is the timing realistic?\n4. Can the program be stacked with other support?\n\nFSI Digital's $19 USD Funding Match Report is a self-serve first step for narrowing the current database to programs worth reviewing. No call is required. Final eligibility still belongs to the official funding body.\n\nReview the match report:`,
    facebook: `A grant list is not an application plan. Start by narrowing the options to programs that fit your business profile, planned costs, and timing.\n\nThe FSI Digital Funding Match Report is $19 USD, self-serve, and requires no call. Always confirm current program rules and final eligibility with the official funding body.`,
    hashtags: ['#BusinessGrants', '#FundingStrategy', '#SmallBusiness', '#FounderResources', '#NonDilutiveCapital'],
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
  return receipt?.status === 'API_ACCEPTED' || receipt?.status === 'LIVE_PUBLISHED'
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
      if (result.status !== 'API_ACCEPTED' && result.status !== 'LIVE_PUBLISHED') return
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
      decision: results.some((result) => result.status === 'API_ACCEPTED' || result.status === 'LIVE_PUBLISHED')
        ? 'PUBLISHED'
        : 'PROVIDER_REJECTED',
      variantId: variant.id,
      offerId: variant.offerId,
      attempted: results.length,
      accepted: results.filter((result) => result.status === 'API_ACCEPTED' || result.status === 'LIVE_PUBLISHED').length,
      results,
    }
  }
}
