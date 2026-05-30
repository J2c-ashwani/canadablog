// A simple, fast 32-bit seeded random number generator
function mulberry32(a: number) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

// String hash function to generate a valid seed from a string
function cyrb128(str: string) {
  let h1 = 1779033703, h2 = 3144134277,
      h3 = 1013904242, h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
      k = str.charCodeAt(i);
      h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
      h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
      h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
      h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0];
}

/**
* Creates a deterministic random number generator from a seed string.
*/
export function createSeededRandom(seedString: string) {
  const seed = cyrb128(seedString);
  return mulberry32(seed[0]);
}

/**
* Syntactically spins and localizes a generic paragraph by weaving in geographic variables.
* The output is 100% deterministic per city/industry, ensuring stable SSG builds.
*/
export function spinParagraph(text: string, city: string, province: string, industry: string, blockId: string): string {
  const rand = createSeededRandom(`${city}-${industry}-${blockId}`);
  let spunText = text;

  const randScale = rand();
  
  // 1. Deterministic Synonym Replacement
  if (randScale < 0.33) {
      spunText = spunText.replace(/government funding/gi, 'provincial and federal grants');
      spunText = spunText.replace(/government grants/gi, 'public funding programs');
      spunText = spunText.replace(/tax credits/gi, 'tax rebates');
  } else if (randScale < 0.66) {
      spunText = spunText.replace(/government funding/gi, 'financial support mechanisms');
      spunText = spunText.replace(/government grants/gi, 'subsidized capital');
      spunText = spunText.replace(/tax credits/gi, 'tax incentives');
  }

  if (rand() > 0.6) {
      spunText = spunText.replace(/ small/gi, ' SME');
  }

  // 2. Geographic Weaving (Prefix/Suffix)
  // We selectively inject the city and province so it feels natural, not robotic.
  const injectLoc = rand();
  
  if (injectLoc < 0.20 && !text.startsWith("For ")) {
      spunText = `For ${industry} companies operating in ${city}, ` + spunText.charAt(0).toLowerCase() + spunText.slice(1);
  } else if (injectLoc >= 0.20 && injectLoc < 0.40) {
      spunText = spunText + ` This funding dynamic profoundly impacts the ${city} economic region within ${province}.`;
  } else if (injectLoc >= 0.40 && injectLoc < 0.60 && !text.startsWith("Operating")) {
      spunText = `Operating effectively in ${province}'s market requires deep capital. ` + spunText;
  } else if (injectLoc >= 0.60 && injectLoc < 0.80) {
      spunText = spunText + ` Reviewers prioritize ${province}-based applicants demonstrating strong local supply chain linkages.`;
  }

  return spunText;
}

/**
* Deterministically shuffles an array (e.g. for bullet points/disqualifiers)
*/
export function shuffleArray<T>(array: T[], seedString: string): T[] {
  const rand = createSeededRandom(seedString);
  const copy = [...array];
  
  for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  
  return copy;
}
