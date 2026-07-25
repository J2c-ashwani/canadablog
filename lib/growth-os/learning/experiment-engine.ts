/**
 * Growth OS — A/B Experiment Engine
 * Conducts controlled A/B tests on subject lines, headlines, CTAs, and offers.
 */

export interface ExperimentVariant {
  variantId: string
  name: string
  copyText: string
  impressions: number
  conversions: number
  conversionRate: number
}

export interface Experiment {
  id: string
  name: string
  targetElement: "SubjectLine" | "Headline" | "CTA" | "OfferPrice"
  variants: ExperimentVariant[]
  status: "RUNNING" | "CONCLUDED"
  winningVariantId?: string
  concludedTimestamp?: string
}

export class ExperimentEngine {
  private static experiments: Map<string, Experiment> = new Map()

  public static createExperiment(
    name: string,
    targetElement: Experiment["targetElement"],
    variantTexts: { name: string; copyText: string }[]
  ): Experiment {
    const exp: Experiment = {
      id: `exp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name,
      targetElement,
      variants: variantTexts.map((v, idx) => ({
        variantId: `var_${idx + 1}`,
        name: v.name,
        copyText: v.copyText,
        impressions: 0,
        conversions: 0,
        conversionRate: 0,
      })),
      status: "RUNNING",
    }
    this.experiments.set(exp.id, exp)
    return exp
  }

  public static recordConversion(experimentId: string, variantId: string, isConversion: boolean): void {
    const exp = this.experiments.get(experimentId)
    if (!exp || exp.status === "CONCLUDED") return

    const variant = exp.variants.find((v) => v.variantId === variantId)
    if (variant) {
      variant.impressions += 1
      if (isConversion) variant.conversions += 1
      variant.conversionRate = Number(((variant.conversions / variant.impressions) * 100).toFixed(2))
    }

    // Evaluate for conclusion (min 50 impressions per variant)
    const minImpressions = exp.variants.every((v) => v.impressions >= 50)
    if (minImpressions) {
      const winner = [...exp.variants].sort((a, b) => b.conversionRate - a.conversionRate)[0]
      exp.status = "CONCLUDED"
      exp.winningVariantId = winner.variantId
      exp.concludedTimestamp = new Date().toISOString()
      console.log(`[ExperimentEngine] Experiment '${exp.name}' CONCLUDED. Winning Variant: '${winner.name}' (${winner.conversionRate}% Conv Rate).`)
    }
  }

  public static getWinningVariant(experimentId: string): ExperimentVariant | null {
    const exp = this.experiments.get(experimentId)
    if (!exp || !exp.winningVariantId) return null
    return exp.variants.find((v) => v.variantId === exp.winningVariantId) || null
  }
}
