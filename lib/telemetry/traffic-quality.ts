export interface TrafficQualityResult {
  score: number;
  classification: 'High Confidence Human' | 'Medium Confidence' | 'Suspicious' | 'Likely Bot';
  timezone: string;
  language: string;
}

export function calculateTrafficQuality(): TrafficQualityResult {
  if (typeof window === 'undefined') {
    return { score: 50, classification: 'Medium Confidence', timezone: '', language: '' };
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  const language = navigator.language || '';
  const userAgent = navigator.userAgent || '';
  const isWebdriver = navigator.webdriver;

  let score = 50; // Base score
  let botSignals = 0;
  let humanSignals = 0;

  // 1. Webdriver check
  if (isWebdriver) {
    botSignals += 3;
    score -= 40;
  }

  // 2. User Agent check
  const botWords = [
    'headless', 'bot', 'crawler', 'spider', 'lighthouse', 'phantomjs', 'selenium', 
    'playwright', 'puppeteer', 'python-requests', 'axios', 'curl', 'wget', 'go-http'
  ];
  const uaLower = userAgent.toLowerCase();
  const matchesBotWord = botWords.some(word => uaLower.includes(word));
  if (matchesBotWord) {
    botSignals += 2;
    score -= 30;
  }

  // 3. Timezone checks
  if (timezone === 'Asia/Singapore') {
    botSignals += 1;
    score -= 20;
  } else if (
    timezone.startsWith('America/') || 
    timezone.startsWith('Pacific/Honolulu') || 
    timezone.startsWith('America/St_Johns')
  ) {
    humanSignals += 1;
    score += 15;
  }

  // 4. Browser language check
  if (language.toLowerCase().startsWith('en') || language.toLowerCase().startsWith('fr') || language.toLowerCase().startsWith('es')) {
    humanSignals += 1;
    score += 10;
  }

  // 5. Check local/session storage indicators
  const hasInteraction = sessionStorage.getItem('fsi_human_interaction') === 'true';
  if (hasInteraction) {
    humanSignals += 2;
    score += 35;
  }

  const pagesViewed = parseInt(sessionStorage.getItem('fsi_pages_viewed') || '0', 10);
  if (pagesViewed > 1) {
    humanSignals += 1;
    score += 15;
  }

  // Cap score between 0 and 100
  score = Math.max(0, Math.min(100, score));

  // Classification logic
  let classification: 'High Confidence Human' | 'Medium Confidence' | 'Suspicious' | 'Likely Bot' = 'Medium Confidence';
  if (isWebdriver || matchesBotWord || score < 30) {
    classification = 'Likely Bot';
  } else if (score < 50 || timezone === 'Asia/Singapore') {
    classification = 'Suspicious';
  } else if (score >= 80 || hasInteraction) {
    classification = 'High Confidence Human';
  }

  return {
    score,
    classification,
    timezone,
    language
  };
}
