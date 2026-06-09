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
  companyName?: string
  reportPurchased?: boolean
  reportTransactionId?: string
  readinessScore?: number
  readinessBand?: string
  lastEmailFollowup?: string
}

export interface ISubscriberRepository {
  saveSubscriber(profile: Omit<SubscriberProfile, "unsubscribeToken" | "engagementScore" | "isSubscribed">): Promise<{ success: boolean; error?: any }>
  getSubscriberByEmail(email: string): Promise<SubscriberProfile | null>
  getSubscribersByFilter(filters: Partial<SubscriberProfile>): Promise<SubscriberProfile[]>
  updateSubscriberPreferences(email: string, updates: Partial<Omit<SubscriberProfile, "email">>): Promise<{ success: boolean; error?: any }>
  unsubscribe(token: string): Promise<{ success: boolean; error?: any }>
  getAllSubscribers(): Promise<SubscriberProfile[]>
}

export class GoogleSheetsSubscriberRepository implements ISubscriberRepository {
  private generateToken(): string {
    return crypto.randomBytes(16).toString("hex")
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
      unsubscribeToken: lead.unsubscribeToken || this.generateToken(),
      engagementScore: lead.engagementScore !== undefined ? Number(lead.engagementScore) : 100,
      lastOpenedAt: lead.lastOpenedAt || undefined,
      lastClickedAt: lead.lastClickedAt || undefined,
      timestamp: lead.timestamp,
      loginToken: lead.loginToken || "",
      subscriptionStatus: lead.subscriptionStatus || "inactive",
      subscriptionId: lead.subscriptionId || "",
      trialStartedAt: lead.trialStartedAt || "",
      website: lead.website || "",
      companyName: lead.companyName || "",
      reportPurchased: !!lead.reportPurchased,
      reportTransactionId: lead.reportTransactionId || "",
      lastEmailFollowup: lead.lastEmailFollowup || "",
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
        lastEmailFollowup: "N/A",
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
      const found = allLeads.find((l) => l.email.toLowerCase() === email.toLowerCase())
      if (!found) return null
      return this.mapLeadToSubscriber(found)
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
      if (updates.lastEmailFollowup !== undefined) data.lastEmailFollowup = updates.lastEmailFollowup

      const res = await updateLeadInSheet(email, data)
      return { success: res.success, error: res.error }
    } catch (err) {
      console.error("Error in repository updateSubscriberPreferences:", err)
      return { success: false, error: err }
    }
  }

  async unsubscribe(token: string): Promise<{ success: boolean; error?: any }> {
    try {
      const allLeads = await getLeadsFromSheet(1000)
      const found = allLeads.find((l: any) => l.unsubscribeToken === token)
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
      // Only map leads that have unsubscribeToken or are labeled as alert subscribers
      return allLeads
        .filter((l) => l.email && (l.unsubscribeToken || l.source?.includes("Alerts")))
        .map((l) => this.mapLeadToSubscriber(l))
    } catch (err) {
      console.error("Error in repository getAllSubscribers:", err)
      return []
    }
  }
}

export const SubscriberRepository: ISubscriberRepository = new GoogleSheetsSubscriberRepository()
