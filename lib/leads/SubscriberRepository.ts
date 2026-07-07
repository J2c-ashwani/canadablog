import crypto from "crypto"
import { 
  appendLeadToSheet, 
  getLeadsFromSheet, 
  updateLeadInSheet 
} from "@/lib/google-sheets"
import type { LeadCaptureData } from "@/lib/leads/scoring"

export interface SubscriberProfile {
  email: string
  name?: string
  country: "Canada" | "USA"
  region: string // Province or State code (e.g. "ON", "CA")
  industry: string
  companySize: "1-9" | "10-49" | "50-99" | "100-499" | "500+"
  fundingInterests: ("Grants" | "Loans" | "Tax Credits" | "Hiring Subsidies")[]
  isSubscribed: boolean
  unsubscribeToken: string
  engagementScore: number
  lastOpenedAt?: string
  lastClickedAt?: string
  timestamp?: string
  loginToken?: string
  subscriptionStatus?: string
  subscriptionId?: string
  trialStartedAt?: string
  website?: string
  reportPurchased?: boolean
  reportTransactionId?: string
  strategyReportPurchased?: boolean
  strategyReportTransactionId?: string
  readinessScore?: number
  readinessBand?: string
  lastEmailFollowup?: string
  leadActivity?: string
  lastAttributionSource?: string
  firstReportViewedAt?: string
  assessmentPurchasedAt?: string
  lastAlertSentAt?: string
  lastAlertOpenedAt?: string
  lastAlertClickedAt?: string
  lastLoginAt?: string
  lastDashboardViewAt?: string
  lastPortfolioViewAt?: string
  lastAlertClickAt?: string
  leadTier?: string
  subscriptionCancelledAt?: string
  cancellationReason?: string
  source?: string
  phone?: string
  companyName?: string
  businessStage?: string
  fundingAmount?: string
  fundingPurpose?: string
  businessDescription?: string
  consentToPartnerContact?: boolean
  pagePath?: string
  ipAddress?: string
  userAgent?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  gaClientId?: string
  offlineStatus?: string
}

export interface ISubscriberRepository {
  saveSubscriber(profile: Omit<SubscriberProfile, "unsubscribeToken" | "engagementScore" | "isSubscribed">): Promise<{ success: boolean; error?: any }>
  getSubscriberByEmail(email: string): Promise<SubscriberProfile | null>
  getSubscribersByFilter(filters: Partial<SubscriberProfile>): Promise<SubscriberProfile[]>
  updateSubscriberPreferences(email: string, updates: Partial<Omit<SubscriberProfile, "email">>): Promise<{ success: boolean; error?: any }>
  unsubscribe(token: string): Promise<{ success: boolean; error?: any }>
  getAllSubscribers(): Promise<SubscriberProfile[]>
}

export const getFallbackLoginToken = (email: string): string => {
  const tokenSalt = process.env.SESSION_TOKEN_SALT || 'fsi-login-token-2026';
  return 'v2_' + crypto.createHash("sha256").update(email.toLowerCase().trim() + tokenSalt).digest("hex").slice(0, 32);
};

export const getFallbackUnsubscribeToken = (email: string): string => {
  const unsubscribeSalt = process.env.SESSION_UNSUBSCRIBE_SALT || 'fsi-salt-2026';
  return 'v2_' + crypto.createHash("sha256").update(email.toLowerCase().trim() + unsubscribeSalt).digest("hex").slice(0, 32);
};

export class GoogleSheetsSubscriberRepository implements ISubscriberRepository {
  private generateToken(): string {
    return "v2_" + crypto.randomBytes(16).toString("hex")
  }

  private mapLeadToSubscriber(lead: any): SubscriberProfile {
    const interestsRaw = lead.fundingInterests || []
    
    return {
      email: lead.email,
      name: lead.name || "",
      country: (lead.country === "USA" || lead.country === "US") ? "USA" : "Canada",
      region: lead.state || "ON",
      industry: lead.industry || "other",
      companySize: (lead.companySize || "1-9") as any,
      fundingInterests: interestsRaw as any[],
      isSubscribed: lead.isSubscribed !== false,
      unsubscribeToken: lead.unsubscribeToken || (lead.email ? getFallbackUnsubscribeToken(lead.email) : this.generateToken()),
      engagementScore: lead.engagementScore !== undefined ? Number(lead.engagementScore) : 100,
      lastOpenedAt: lead.lastOpenedAt || undefined,
      lastClickedAt: lead.lastClickedAt || undefined,
      timestamp: lead.timestamp,
      loginToken: lead.loginToken || (lead.email ? getFallbackLoginToken(lead.email) : this.generateToken()),
      subscriptionStatus: lead.subscriptionStatus || "inactive",
      subscriptionId: lead.subscriptionId || "",
      trialStartedAt: lead.trialStartedAt || "",
      website: lead.website || "",
      companyName: lead.companyName || "",
      reportPurchased: !!lead.reportPurchased,
      reportTransactionId: lead.reportTransactionId || "",
      strategyReportPurchased: !!lead.strategyReportPurchased,
      strategyReportTransactionId: lead.strategyReportTransactionId || "",
      lastEmailFollowup: lead.lastEmailFollowup || "",
      leadActivity: lead.leadActivity || "{}",
      lastAttributionSource: lead.lastAttributionSource || "",
      firstReportViewedAt: lead.firstReportViewedAt || "",
      assessmentPurchasedAt: lead.assessmentPurchasedAt || "",
      lastAlertSentAt: lead.lastAlertSentAt || "",
      lastAlertOpenedAt: lead.lastAlertOpenedAt || "",
      lastAlertClickedAt: lead.lastAlertClickedAt || "",
      lastLoginAt: lead.lastLoginAt || "",
      lastDashboardViewAt: lead.lastDashboardViewAt || "",
      lastPortfolioViewAt: lead.lastPortfolioViewAt || "",
      lastAlertClickAt: lead.lastAlertClickAt || "",
      leadTier: lead.leadTier || "",
      subscriptionCancelledAt: lead.subscriptionCancelledAt || "",
      cancellationReason: lead.cancellationReason || "",
      source: lead.source || "",
      phone: lead.phone || "",
      businessStage: lead.businessStage || "",
      fundingAmount: lead.fundingAmount || "",
      fundingPurpose: lead.fundingPurpose || "",
      businessDescription: lead.businessDescription || "",
      consentToPartnerContact: lead.consentToPartnerContact === "Yes" || lead.consentToPartnerContact === true,
      pagePath: lead.pagePath || "",
      ipAddress: lead.ipAddress || "",
      userAgent: lead.userAgent || "",
      utmSource: lead.utmSource || "",
      utmMedium: lead.utmMedium || "",
      utmCampaign: lead.utmCampaign || "",
      gaClientId: lead.gaClientId || "",
      offlineStatus: lead.offlineStatus || "",
    }
  }

  async saveSubscriber(
    profile: Omit<SubscriberProfile, "unsubscribeToken" | "engagementScore" | "isSubscribed">
  ): Promise<{ success: boolean; error?: any }> {
    try {
      const existing = await this.getSubscriberByEmail(profile.email)
      if (existing) {
        // If already exists, update preferences instead of duplicating
        return this.updateSubscriberPreferences(profile.email, {
          name: profile.name || existing.name,
          country: profile.country,
          region: profile.region,
          industry: profile.industry,
          companySize: profile.companySize,
          fundingInterests: profile.fundingInterests,
          isSubscribed: true, // Re-subscribe if they register again
        })
      }

      const token = this.generateToken()
      const logToken = this.generateToken()
      const data: LeadCaptureData = {
        source: "Funding Intelligence Alerts Registration",
        timestamp: new Date().toISOString(),
        email: profile.email,
        name: profile.name,
        country: profile.country,
        state: profile.region,
        industry: profile.industry,
        companySize: profile.companySize,
        fundingInterests: profile.fundingInterests,
        isSubscribed: true,
        unsubscribeToken: token,
        loginToken: logToken,
        subscriptionStatus: "inactive",
        subscriptionId: "N/A",
        trialStartedAt: "N/A",
        website: profile.website || "N/A",
        companyName: profile.companyName || "N/A",
        reportPurchased: false,
        reportTransactionId: "N/A",
        strategyReportPurchased: false,
        strategyReportTransactionId: "N/A",
        lastEmailFollowup: "N/A",
        leadActivity: profile.leadActivity || "{}",
        lastAttributionSource: "N/A",
        firstReportViewedAt: "N/A",
        assessmentPurchasedAt: "N/A",
        lastAlertSentAt: "N/A",
        lastAlertOpenedAt: "N/A",
        lastAlertClickedAt: "N/A",
        lastLoginAt: "N/A",
        lastDashboardViewAt: "N/A",
        lastPortfolioViewAt: "N/A",
        lastAlertClickAt: "N/A",
        leadTier: "N/A",
        subscriptionCancelledAt: "N/A",
        cancellationReason: "N/A",
        engagementScore: 100,
        lastOpenedAt: "N/A",
        lastClickedAt: "N/A",
      }

      const res = await appendLeadToSheet(data)
      return { success: res.success, error: res.error }
    } catch (err) {
      console.error("Error in repository saveSubscriber:", err)
      return { success: false, error: err }
    }
  }

  async getSubscriberByEmail(email: string): Promise<SubscriberProfile | null> {
    try {
      const allLeads = await getLeadsFromSheet(1000)
      const matches = allLeads.filter((l) => l.email && l.email.toLowerCase().trim() === email.toLowerCase().trim())
      if (matches.length === 0) return null
      
      // Merge all matches (oldest to newest, so newest overwrites oldest)
      let mergedSub = this.mapLeadToSubscriber(matches[matches.length - 1]); // oldest
      
      for (let i = matches.length - 2; i >= 0; i--) {
        const newerSub = this.mapLeadToSubscriber(matches[i]);
        
        let mergedActivity: any = {};
        try { mergedActivity = JSON.parse(mergedSub.leadActivity || "{}"); } catch(e){}
        let newerActivity: any = {};
        try { newerActivity = JSON.parse(newerSub.leadActivity || "{}"); } catch(e){}
        
        const nextActivity = {
          ...mergedActivity,
          ...newerActivity
        };
        
        mergedSub = {
          ...mergedSub,
          ...newerSub,
          leadActivity: JSON.stringify(nextActivity)
        };
        
        if (newerSub.reportPurchased || mergedSub.reportPurchased) {
          mergedSub.reportPurchased = true;
        }
        if (newerSub.strategyReportPurchased || mergedSub.strategyReportPurchased) {
          mergedSub.strategyReportPurchased = true;
        }
      }
      
      return mergedSub;
    } catch (err) {
      console.error("Error in repository getSubscriberByEmail:", err)
      return null
    }
  }

  async getSubscribersByFilter(filters: Partial<SubscriberProfile>): Promise<SubscriberProfile[]> {
    try {
      const all = await this.getAllSubscribers()
      return all.filter((sub) => {
        if (!sub.isSubscribed) return false // Only active subscribers by default
        
        if (filters.country && sub.country !== filters.country) return false
        if (filters.region && sub.region !== filters.region) return false
        if (filters.industry && sub.industry !== filters.industry) return false
        if (filters.companySize && sub.companySize !== filters.companySize) return false
        
        if (filters.fundingInterests && filters.fundingInterests.length > 0) {
          const hasInterestMatch = filters.fundingInterests.some((interest) => 
            sub.fundingInterests.includes(interest)
          )
          if (!hasInterestMatch) return false
        }
        
        return true
      })
    } catch (err) {
      console.error("Error in repository getSubscribersByFilter:", err)
      return []
    }
  }

  async updateSubscriberPreferences(
    email: string, 
    updates: Partial<Omit<SubscriberProfile, "email">>
  ): Promise<{ success: boolean; error?: any }> {
    try {
      const data: Partial<LeadCaptureData> = {}
      if (updates.name !== undefined) data.name = updates.name
      if (updates.country !== undefined) data.country = updates.country
      if (updates.region !== undefined) data.state = updates.region
      if (updates.industry !== undefined) data.industry = updates.industry
      if (updates.companySize !== undefined) data.companySize = updates.companySize
      if (updates.fundingInterests !== undefined) data.fundingInterests = updates.fundingInterests
      if (updates.isSubscribed !== undefined) data.isSubscribed = updates.isSubscribed
      if (updates.unsubscribeToken !== undefined) data.unsubscribeToken = updates.unsubscribeToken
      if (updates.engagementScore !== undefined) data.engagementScore = updates.engagementScore
      if (updates.lastOpenedAt !== undefined) data.lastOpenedAt = updates.lastOpenedAt
      if (updates.lastClickedAt !== undefined) data.lastClickedAt = updates.lastClickedAt
      if (updates.loginToken !== undefined) data.loginToken = updates.loginToken
      if (updates.subscriptionStatus !== undefined) data.subscriptionStatus = updates.subscriptionStatus
      if (updates.subscriptionId !== undefined) data.subscriptionId = updates.subscriptionId
      if (updates.trialStartedAt !== undefined) data.trialStartedAt = updates.trialStartedAt
      if (updates.website !== undefined) data.website = updates.website
      if (updates.companyName !== undefined) data.companyName = updates.companyName
      if (updates.reportPurchased !== undefined) data.reportPurchased = updates.reportPurchased
      if (updates.reportTransactionId !== undefined) data.reportTransactionId = updates.reportTransactionId
      if (updates.strategyReportPurchased !== undefined) data.strategyReportPurchased = updates.strategyReportPurchased
      if (updates.strategyReportTransactionId !== undefined) data.strategyReportTransactionId = updates.strategyReportTransactionId
      if (updates.lastEmailFollowup !== undefined) data.lastEmailFollowup = updates.lastEmailFollowup
      if (updates.leadActivity !== undefined) data.leadActivity = updates.leadActivity
      if (updates.lastAttributionSource !== undefined) data.lastAttributionSource = updates.lastAttributionSource
      if (updates.firstReportViewedAt !== undefined) data.firstReportViewedAt = updates.firstReportViewedAt
      if (updates.assessmentPurchasedAt !== undefined) data.assessmentPurchasedAt = updates.assessmentPurchasedAt
      if (updates.lastAlertSentAt !== undefined) data.lastAlertSentAt = updates.lastAlertSentAt
      if (updates.lastAlertOpenedAt !== undefined) data.lastAlertOpenedAt = updates.lastAlertOpenedAt
      if (updates.lastAlertClickedAt !== undefined) data.lastAlertClickedAt = updates.lastAlertClickedAt
      if (updates.lastLoginAt !== undefined) data.lastLoginAt = updates.lastLoginAt
      if (updates.lastDashboardViewAt !== undefined) data.lastDashboardViewAt = updates.lastDashboardViewAt
      if (updates.lastPortfolioViewAt !== undefined) data.lastPortfolioViewAt = updates.lastPortfolioViewAt
      if (updates.lastAlertClickAt !== undefined) data.lastAlertClickAt = updates.lastAlertClickAt
      if (updates.leadTier !== undefined) data.leadTier = updates.leadTier
      if (updates.subscriptionCancelledAt !== undefined) data.subscriptionCancelledAt = updates.subscriptionCancelledAt
      if (updates.cancellationReason !== undefined) data.cancellationReason = updates.cancellationReason
      if (updates.source !== undefined) data.source = updates.source
      if (updates.phone !== undefined) data.phone = updates.phone
      if (updates.businessStage !== undefined) data.businessStage = updates.businessStage
      if (updates.fundingAmount !== undefined) data.fundingAmount = updates.fundingAmount
      if (updates.fundingPurpose !== undefined) data.fundingPurpose = updates.fundingPurpose
      if (updates.businessDescription !== undefined) data.businessDescription = updates.businessDescription
      if (updates.consentToPartnerContact !== undefined) data.consentToPartnerContact = updates.consentToPartnerContact
      if (updates.pagePath !== undefined) data.pagePath = updates.pagePath
      if (updates.ipAddress !== undefined) data.ipAddress = updates.ipAddress
      if (updates.userAgent !== undefined) data.userAgent = updates.userAgent
      if (updates.utmSource !== undefined) data.utmSource = updates.utmSource
      if (updates.utmMedium !== undefined) data.utmMedium = updates.utmMedium
      if (updates.utmCampaign !== undefined) data.utmCampaign = updates.utmCampaign
      if (updates.gaClientId !== undefined) data.gaClientId = updates.gaClientId
      if (updates.offlineStatus !== undefined) data.offlineStatus = updates.offlineStatus

      const res = await updateLeadInSheet(email, data)
      return { success: res.success, error: res.error }
    } catch (err) {
      console.error("Error in repository updateSubscriberPreferences:", err)
      return { success: false, error: err }
    }
  }

  async unsubscribe(token: string): Promise<{ success: boolean; error?: any }> {
    if (!token || !token.startsWith('v2_')) {
      return { success: false, error: "Legacy or invalid unsubscribe token" }
    }

    try {
      const unsubscribeSalt = process.env.SESSION_UNSUBSCRIBE_SALT || 'fsi-salt-2026';
      const allLeads = await getLeadsFromSheet(1000)
      const found = allLeads.find((l: any) => {
        if (l.unsubscribeToken === token) return true
        if (!l.unsubscribeToken && l.email) {
          const deterministic = 'v2_' + crypto.createHash("sha256").update(l.email.toLowerCase().trim() + unsubscribeSalt).digest("hex").slice(0, 32)
          return deterministic === token
        }
        return false
      })
      if (!found) {
        console.warn(`Unsubscribe token not found: ${token}`)
        return { success: false, error: "Token not found" }
      }
      return this.updateSubscriberPreferences(found.email, {
        isSubscribed: false,
        engagementScore: Math.max(0, (found.engagementScore !== undefined ? Number(found.engagementScore) : 100) - 20)
      })
    } catch (err) {
      console.error("Error in repository unsubscribe:", err)
      return { success: false, error: err }
    }
  }

  async getAllSubscribers(): Promise<SubscriberProfile[]> {
    try {
      const allLeads = await getLeadsFromSheet(1000)
      
      // De-duplicate and merge rows by email (case-insensitive)
      const mergedMap = new Map<string, SubscriberProfile>();
      
      // Iterate in reverse (oldest first) so that newer entries naturally override older ones
      for (let i = allLeads.length - 1; i >= 0; i--) {
        const lead = allLeads[i];
        if (!lead.email) continue;
        const emailKey = lead.email.toLowerCase().trim();
        const sub = this.mapLeadToSubscriber(lead);
        
        if (!mergedMap.has(emailKey)) {
          mergedMap.set(emailKey, sub);
        } else {
          // Merge existing newer profile with this older duplicate row's details
          const existing = mergedMap.get(emailKey)!;
          
          let existingActivity: any = {};
          let olderActivity: any = {};
          try {
            existingActivity = JSON.parse(existing.leadActivity || "{}");
          } catch(e) {}
          try {
            olderActivity = JSON.parse(sub.leadActivity || "{}");
          } catch(e) {}
          
          const mergedActivity = {
            ...existingActivity, // newer profile data
            ...olderActivity // older profile data (fallback)
          };
          
          // Actually we want newer to overwrite older:
          const finalActivity = {
            ...olderActivity,
            ...existingActivity
          };
          
          existing.leadActivity = JSON.stringify(finalActivity);
          if (sub.reportPurchased) existing.reportPurchased = true;
          if (sub.strategyReportPurchased) existing.strategyReportPurchased = true;
          
          if (!existing.name && sub.name) existing.name = sub.name;
          if (!existing.phone && sub.phone) existing.phone = sub.phone;
          if (!existing.companyName && sub.companyName) existing.companyName = sub.companyName;
          if (!existing.region && sub.region) existing.region = sub.region;
          if (!existing.industry && sub.industry) existing.industry = sub.industry;
        }
      }
      
      // Return only active subscribers (isSubscribed !== false)
      return Array.from(mergedMap.values()).filter(sub => sub.isSubscribed);
    } catch (err) {
      console.error("Error in repository getAllSubscribers:", err)
      return []
    }
  }
}

export const SubscriberRepository: ISubscriberRepository = new GoogleSheetsSubscriberRepository()
