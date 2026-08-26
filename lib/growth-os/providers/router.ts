/**
 * Growth OS — Abstract Capability Provider Router (Enterprise Resilient Core)
 * Features runtime health tracking, circuit breakers, configurable fallback chains,
 * task optimization, and zero-crash capability guarding.
 */

export type CapabilityType = "Research" | "Quality" | "Writing" | "Reasoning"
export type ProviderName = "Gemini" | "Claude" | "OpenAI"

export interface TaskRequirements {
  structuredJSON?: boolean
  longContext?: boolean
  lowCostFast?: boolean
  highReasoning?: boolean
}

export interface ProviderStatus {
  providerName: ProviderName
  modelName: string
  isConfigured: boolean
  isHealthy: boolean
  failureCount: number
  circuitBreakerOpenUntil?: number // Timestamp in ms
  lastSuccessTimestamp?: string
  averageLatencyMs: number
}

export interface ProviderConfig {
  providerName: ProviderName
  modelName: string
  active: boolean
  isHealthy: boolean
}

export class ProviderRouter {
  private static readonly geminiModel = process.env.GEMINI_MODEL || "gemini-3.6-flash"
  // Configurable Fallback Priority Order
  private static priorityChain: ProviderName[] = ["Gemini", "Claude", "OpenAI"]

  // Capability Configuration Map
  private static capabilityMap: Map<CapabilityType, ProviderConfig> = new Map([
    ["Research", { providerName: "Gemini", modelName: ProviderRouter.geminiModel, active: true, isHealthy: true }],
    ["Quality", { providerName: "Gemini", modelName: ProviderRouter.geminiModel, active: true, isHealthy: true }],
    ["Writing", { providerName: "Gemini", modelName: ProviderRouter.geminiModel, active: true, isHealthy: true }],
    ["Reasoning", { providerName: "Gemini", modelName: ProviderRouter.geminiModel, active: true, isHealthy: true }],
  ])

  // Runtime Health & Circuit Breaker Tracking
  private static healthRegistry: Map<ProviderName, ProviderStatus> = new Map([
    ["Gemini", { providerName: "Gemini", modelName: ProviderRouter.geminiModel, isConfigured: false, isHealthy: false, failureCount: 0, averageLatencyMs: 0 }],
    ["Claude", { providerName: "Claude", modelName: "claude-3-5-sonnet", isConfigured: false, isHealthy: false, failureCount: 0, averageLatencyMs: 400 }],
    ["OpenAI", { providerName: "OpenAI", modelName: "gpt-4o", isConfigured: false, isHealthy: false, failureCount: 0, averageLatencyMs: 350 }],
  ])

  /**
   * Evaluates whether a requested provider has a configured API key.
   */
  public static isProviderConfigured(provider: ProviderName): boolean {
    switch (provider) {
      case "Gemini":
        return Boolean(process.env.GOOGLE_GEMINI_API_KEY && process.env.GOOGLE_GEMINI_API_KEY.trim() !== "")
      case "Claude":
        return Boolean(process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY.trim() !== "")
      case "OpenAI":
        return Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== "")
      default:
        return false
    }
  }

  /**
   * Circuit Breaker & Health Check: Evaluates whether a provider is currently reachable and healthy.
   */
  public static isProviderHealthy(provider: ProviderName): boolean {
    const isConfigured = this.isProviderConfigured(provider)
    if (!isConfigured) return false

    const status = this.healthRegistry.get(provider)
    if (!status) return isConfigured

    // Check Circuit Breaker
    if (status.circuitBreakerOpenUntil && Date.now() < status.circuitBreakerOpenUntil) {
      console.warn(`[ProviderRouter] Circuit breaker OPEN for '${provider}' until ${new Date(status.circuitBreakerOpenUntil).toLocaleTimeString()}.`)
      return false
    }

    return status.failureCount < 3
  }

  /**
   * Reports a successful provider invocation to update runtime health metrics.
   */
  public static reportSuccess(provider: ProviderName, latencyMs: number): void {
    const status = this.healthRegistry.get(provider)
    if (status) {
      status.failureCount = 0
      status.circuitBreakerOpenUntil = undefined
      status.lastSuccessTimestamp = new Date().toISOString()
      status.averageLatencyMs = Math.round((status.averageLatencyMs + latencyMs) / 2)
      status.isHealthy = true
    }
  }

  /**
   * Reports a provider failure to trip circuit breakers if threshold is exceeded.
   */
  public static reportFailure(provider: ProviderName, errorReason: string): void {
    const status = this.healthRegistry.get(provider)
    if (status) {
      status.failureCount += 1
      console.warn(`[ProviderRouter] Provider '${provider}' reported failure (${status.failureCount}/3). Reason: ${errorReason}`)

      if (status.failureCount >= 3) {
        // Trip Circuit Breaker for 60 seconds
        status.circuitBreakerOpenUntil = Date.now() + 60 * 1000
        status.isHealthy = false
        console.error(`[ProviderRouter] 🚨 Circuit breaker TRIPPED for '${provider}' for 60 seconds.`)
      }
    }
  }

  /**
   * Resolves the optimal healthy provider for a capability and task.
   * If the primary provider is unconfigured or unhealthy, iterates through the fallback chain.
   */
  public static getProvider(capability: CapabilityType, taskReqs?: TaskRequirements): ProviderConfig {
    // Guard against unmapped capability registration
    const configured = this.capabilityMap.get(capability)
    if (!configured) {
      throw new Error(`[ProviderRouter Error] Capability '${capability}' is not registered in ProviderRouter map.`)
    }

    // Task-based Routing Optimization (if specific requirements are provided)
    if (taskReqs?.longContext && this.isProviderHealthy("Claude")) {
      return { providerName: "Claude", modelName: "claude-3-5-sonnet", active: true, isHealthy: true }
    }
    if (taskReqs?.structuredJSON && this.isProviderHealthy("OpenAI")) {
      return { providerName: "OpenAI", modelName: "gpt-4o", active: true, isHealthy: true }
    }

    // 1. Try Configured Primary Provider
    if (configured.active && this.isProviderHealthy(configured.providerName)) {
      return { ...configured, isHealthy: true }
    }

    // 2. Iterate Configurable Fallback Priority Chain
    console.warn(`[ProviderRouter] Primary provider '${configured.providerName}' for '${capability}' is unhealthy or unconfigured. Iterating fallback chain...`)

    for (const candidate of this.priorityChain) {
      if (this.isProviderHealthy(candidate)) {
        console.log(`[ProviderRouter] Fallback chain resolved to healthy provider: '${candidate}' for '${capability}'.`)
        return {
          providerName: candidate,
          modelName: candidate === "Claude" ? "claude-3-5-sonnet" : candidate === "OpenAI" ? "gpt-4o" : this.geminiModel,
          active: true,
          isHealthy: true,
        }
      }
    }

    // Default Fallback
    return {
      providerName: "Gemini",
      modelName: this.geminiModel,
      active: true,
      isHealthy: this.isProviderConfigured("Gemini"),
    }
  }

  /**
   * Configuration Updates
   */
  public static setPriorityChain(chain: ProviderName[]): void {
    this.priorityChain = chain
    console.log("[ProviderRouter] Configurable fallback priority chain updated:", chain)
  }

  public static updateRouting(capability: CapabilityType, config: Partial<ProviderConfig>): void {
    const existing = this.capabilityMap.get(capability) || {
      providerName: "Gemini",
      modelName: this.geminiModel,
      active: true,
      isHealthy: true,
    }
    const updated: ProviderConfig = {
      ...existing,
      ...config,
      isHealthy: this.isProviderHealthy(config.providerName || existing.providerName),
    }
    this.capabilityMap.set(capability, updated)
    console.log(`[ProviderRouter] Routing updated for ${capability}:`, updated)
  }
}
