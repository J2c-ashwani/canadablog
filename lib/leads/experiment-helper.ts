// Zero-dependency cookie & localStorage persistent experiment variant helper

export interface ExperimentConfig {
  name: string;
  status: 'active' | 'paused' | 'disabled' | 'A_won' | 'B_won';
  startedAt: string;
  endedAt: string | null;
  trafficSplit: number; // e.g. 50 for 50/50 split
  defaultVariant: string;
  allowedVariants: string[];
}

export interface ActiveExperiment {
  variant: string;
  name: string;
  status: string;
  startedAt: string;
  endedAt: string | null;
}

// ── Central Experiment Governance Registry ──
const EXPERIMENT_REGISTRY: Record<string, ExperimentConfig> = {
  calculator_cta: {
    name: 'calculator_cta',
    status: 'active',
    startedAt: '2026-07-14',
    endedAt: null,
    trafficSplit: 50,
    defaultVariant: 'A',
    allowedVariants: ['A', 'B']
  }
};

/**
 * Retrieves the assigned variant and metadata for an experiment.
 * Handles pause/disable overrides and auto-deploy winner promotions.
 */
export function getExperiment(experimentName: string): ActiveExperiment {
  const config = EXPERIMENT_REGISTRY[experimentName];
  
  if (!config) {
    return {
      variant: 'A',
      name: experimentName,
      status: 'disabled',
      startedAt: '',
      endedAt: null
    };
  }

  // 1. Check override states (Kill switch & Auto-Deploy Winner declarations)
  if (config.status === 'paused' || config.status === 'disabled') {
    return {
      variant: config.defaultVariant,
      name: config.name,
      status: config.status,
      startedAt: config.startedAt,
      endedAt: config.endedAt
    };
  }

  if (config.status === 'A_won') {
    return {
      variant: 'A',
      name: config.name,
      status: config.status,
      startedAt: config.startedAt,
      endedAt: config.endedAt
    };
  }

  if (config.status === 'B_won') {
    return {
      variant: 'B',
      name: config.name,
      status: config.status,
      startedAt: config.startedAt,
      endedAt: config.endedAt
    };
  }

  // 2. Retrieve A/B Variant with cookie persistence
  const variant = getExperimentVariant(config.name, config.allowedVariants, config.defaultVariant);

  return {
    variant,
    name: config.name,
    status: config.status,
    startedAt: config.startedAt,
    endedAt: config.endedAt
  };
}

/**
 * Underlying helper that split tests traffic and caches it in localStorage and cookies for 90 days.
 */
export function getExperimentVariant(
  experimentName: string,
  allowedVariants: string[] = ['A', 'B'],
  defaultVariant: string = 'A'
): string {
  if (typeof window === 'undefined') {
    return defaultVariant;
  }

  const storageKey = `fsi_exp_${experimentName}`;
  
  // 1. Try to read from localStorage first
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored && allowedVariants.includes(stored)) {
      return stored;
    }
  } catch (e) {
    // Ignore
  }

  // 2. Try to read from cookies
  try {
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
      c = c.trim();
      if (c.startsWith(`${storageKey}=`)) {
        const value = c.substring(storageKey.length + 1);
        if (allowedVariants.includes(value)) {
          return value;
        }
      }
    }
  } catch (e) {
    // Ignore
  }

  // 3. Random assignment (50/50 split for 2 variants)
  const randomIndex = Math.floor(Math.random() * allowedVariants.length);
  const assignedVariant = allowedVariants[randomIndex] || defaultVariant;

  // 4. Persist in localStorage
  try {
    window.localStorage.setItem(storageKey, assignedVariant);
  } catch (e) {
    // Ignore
  }

  // 5. Persist in cookies (expires in 90 days)
  try {
    const date = new Date();
    date.setTime(date.getTime() + (90 * 24 * 60 * 60 * 1000));
    document.cookie = `${storageKey}=${assignedVariant}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
  } catch (e) {
    // Ignore
  }

  return assignedVariant;
}
