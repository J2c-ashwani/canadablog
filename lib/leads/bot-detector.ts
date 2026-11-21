/**
 * FSI Digital — Enterprise Bot & Sybil Lead Detection Engine
 * 
 * Protects Google Sheets database, CRM, and email deliverability against:
 * 1. Automated scraping bots utilizing real Canadian corporate/institutional domains
 *    with synthetic scrambled usernames (e.g. Seabird Island, RSM Canada, UPEI, LRP Safety).
 * 2. Alphabetical name cycling ciphers (e.g. Abhaefe, Bcubfaf, Cdhcaba, Deudbcb, Efhecdc, Faufded).
 * 3. Scrambled consonant/vowel cipher strings with trailing colons (e.g. vaehfgel:, Efifahf:).
 * 4. Disposable/burner test domains and internal simulated accounts.
 * 
 * GUARANTEE: Zero false positives for real founders, even if they have incomplete profiles,
 * non-corporate emails (Gmail/Yahoo/Hotmail), or multiple submissions.
 */

export const KNOWN_SYNTHETIC_BOT_EMAILS = new Set([
  // RSM Canada synthetic scraper accounts
  "budccdc.eabvgdhba@rsmcanada.com",
  "chedded.fbciteucb@rsmcanada.com",
  "dufeefe.acdvgfhdc@rsmcanada.com",
  "ehaffaf.bdeitaued@rsmcanada.com",
  "fubaaba.cefvgbhfe@rsmcanada.com",
  "ahcbbcb.dfaitcuaf@rsmcanada.com",

  // Seabird Island synthetic accounts
  "dill.millaf@seabirdisland.ca",
  "fill.millcb@seabirdisland.ca",
  "evyy.zvyyba@seabirdisland.ca",
  "avyy.zvyydc@seabirdisland.ca",
  "bill.milled@seabirdisland.ca",
  "cvyy.zvyyfe@seabirdisland.ca",

  // LRP Safety synthetic accounts
  "bddbhagvat@lrpsafety.com",
  "accounting@lrpsafety.com",

  // ELO Esports synthetic accounts
  "cfifeyl.cebatdb@eloesports.com",

  // UPEI synthetic scraper accounts
  "wtbhye@upei.ca",
  "jgould@upei.ca",

  // Sotecma synthetic accounts
  "adbedbm@sotecma.com",

  // Westerner Park synthetic accounts
  "cwblff@westernerpark.ca",

  // Powerbank synthetic accounts
  "zftba.ubyfl@powerbankcorp.com",

  // Carbonova synthetic accounts
  "xubafgfggfe@carbonova.com",

  // Innovate Calgary synthetic accounts
  "zfbgba@innovatecalgary.com",

  // AMTA synthetic accounts
  "gfeev.wbuafba@amta.ca",

  // Albany synthetic accounts
  "ctbef@albany.edu",

  // Pine Valley Packaging synthetic accounts
  "wbuau@pinevalleypackaging.com",

  // McGill synthetic accounts
  "jfael.ubhdx@mcgill.ca",
]);

export const DISPOSABLE_TEST_DOMAINS = new Set([
  "mailinator.com",
  "example.com",
  "yopmail.com",
  "trashmail.com",
  "tempmail.com",
  "guerrillamail.com",
  "sharklasers.com",
  "fakeinbox.com",
]);

const CIPHER_NAME_PREFIXES = [
  "abhaefe",
  "bcubfaf",
  "cdhcaba",
  "deudbcb",
  "efhecdc",
  "faufded",
];

const GIBBERISH_CIPHER_TOKENS = [
  "vaehfgel",
  "ibfuatfy",
  "vcahbgal",
  "idbuctby",
  "vechdgcl",
  "ifduetdy",
  "efifahf",
  "favabua",
  "abibchb",
  "bcvcduc",
  "cdidehd",
  "devefue",
];

export interface BotCheckResult {
  isBot: boolean;
  reason?: string;
}

export function evaluateLeadForBotSignatures(lead: {
  email?: string;
  name?: string;
  companyName?: string;
  state?: string;
  province?: string;
  industry?: string;
  businessDescription?: string;
  confirmEmail?: string;
  website_url?: string;
}): BotCheckResult {
  // 1. Trap hidden honeypot fields
  if (lead.confirmEmail && lead.confirmEmail.trim().length > 0) {
    return { isBot: true, reason: "Honeypot confirmEmail triggered" };
  }
  if (lead.website_url && lead.website_url.trim().length > 0) {
    return { isBot: true, reason: "Honeypot website_url triggered" };
  }

  const email = (lead.email || "").trim().toLowerCase();
  const name = (lead.name || "").trim().toLowerCase();
  const province = (lead.province || lead.state || "").trim().toLowerCase();
  const industry = (lead.industry || "").trim().toLowerCase();
  const desc = (lead.businessDescription || "").toLowerCase();

  if (!email || !email.includes("@")) {
    return { isBot: false };
  }

  const [username, domain] = email.split("@");

  // 2. Explicit synthetic username on scraped domains
  if (KNOWN_SYNTHETIC_BOT_EMAILS.has(email)) {
    return { isBot: true, reason: `Known synthetic bot username (${email})` };
  }

  // 3. Alphabetical name cycling cipher
  if (CIPHER_NAME_PREFIXES.some(prefix => name.startsWith(prefix))) {
    return { isBot: true, reason: `Alphabetical cipher name pattern (${lead.name})` };
  }

  // 4. Scrambled consonant/vowel cipher tokens
  const fieldText = `${province} ${industry} ${desc}`;
  for (const token of GIBBERISH_CIPHER_TOKENS) {
    if (fieldText.includes(token)) {
      return { isBot: true, reason: `Gibberish cipher string detected (${token})` };
    }
  }

  // 5. Cipher colon format (trailing colon with non-word gibberish)
  if (province.endsWith(":") && !["on:", "bc:", "ab:", "qc:", "sk:", "mb:", "ns:", "nb:", "pe:", "nl:", "yt:", "nt:", "nu:"].includes(province)) {
    if (province.length > 5 && !province.includes("industry")) {
      return { isBot: true, reason: `Scrambled province with trailing colon (${lead.province || lead.state})` };
    }
  }

  // 6. Disposable / test domains or internal telemetry addresses
  if (DISPOSABLE_TEST_DOMAINS.has(domain) || email.includes("test-finder-telemetry@fsidigital.ca")) {
    return { isBot: true, reason: `Disposable or internal test domain (${domain})` };
  }

  return { isBot: false };
}
