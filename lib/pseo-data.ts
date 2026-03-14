import { format, addDays } from "date-fns";

// Base start date for the pSEO drip campaign (March 5, 2026)
const DRIP_START_DATE = new Date("2026-03-05T00:00:00Z");
const PAGES_PER_DAY = 20;

export type PseoPage = {
    provinceSlug: string;
    provinceName: string;
    citySlug: string;
    cityName: string;
    industrySlug: string;
    industryName: string;
    publishedAt: string;
    isPublished: boolean;
};

// Top 150 US & Canadian Cities mapped to their Provinces/States
const CITIES = [
    // --- CANADA ---
    // Ontario
    { city: "Toronto", citySlug: "toronto", prov: "Ontario", provSlug: "on" },
    { city: "Ottawa", citySlug: "ottawa", prov: "Ontario", provSlug: "on" },
    { city: "Mississauga", citySlug: "mississauga", prov: "Ontario", provSlug: "on" },
    { city: "Brampton", citySlug: "brampton", prov: "Ontario", provSlug: "on" },
    { city: "Hamilton", citySlug: "hamilton", prov: "Ontario", provSlug: "on" },
    { city: "London", citySlug: "london", prov: "Ontario", provSlug: "on" },
    { city: "Markham", citySlug: "markham", prov: "Ontario", provSlug: "on" },
    { city: "Vaughan", citySlug: "vaughan", prov: "Ontario", provSlug: "on" },
    { city: "Kitchener", citySlug: "kitchener", prov: "Ontario", provSlug: "on" },
    { city: "Windsor", citySlug: "windsor", prov: "Ontario", provSlug: "on" },
    { city: "Richmond Hill", citySlug: "richmond-hill", prov: "Ontario", provSlug: "on" },
    { city: "Oakville", citySlug: "oakville", prov: "Ontario", provSlug: "on" },
    { city: "Burlington", citySlug: "burlington", prov: "Ontario", provSlug: "on" },
    { city: "Greater Sudbury", citySlug: "greater-sudbury", prov: "Ontario", provSlug: "on" },
    { city: "Oshawa", citySlug: "oshawa", prov: "Ontario", provSlug: "on" },
    { city: "Barrie", citySlug: "barrie", prov: "Ontario", provSlug: "on" },
    { city: "St. Catharines", citySlug: "st-catharines", prov: "Ontario", provSlug: "on" },
    { city: "Cambridge", citySlug: "cambridge", prov: "Ontario", provSlug: "on" },
    { city: "Kingston", citySlug: "kingston", prov: "Ontario", provSlug: "on" },
    { city: "Guelph", citySlug: "guelph", prov: "Ontario", provSlug: "on" },

    // British Columbia
    { city: "Vancouver", citySlug: "vancouver", prov: "British Columbia", provSlug: "bc" },
    { city: "Surrey", citySlug: "surrey", prov: "British Columbia", provSlug: "bc" },
    { city: "Burnaby", citySlug: "burnaby", prov: "British Columbia", provSlug: "bc" },
    { city: "Richmond", citySlug: "richmond", prov: "British Columbia", provSlug: "bc" },
    { city: "Kelowna", citySlug: "kelowna", prov: "British Columbia", provSlug: "bc" },
    { city: "Abbotsford", citySlug: "abbotsford", prov: "British Columbia", provSlug: "bc" },
    { city: "Coquitlam", citySlug: "coquitlam", prov: "British Columbia", provSlug: "bc" },
    { city: "Victoria", citySlug: "victoria", prov: "British Columbia", provSlug: "bc" },
    { city: "Saanich", citySlug: "saanich", prov: "British Columbia", provSlug: "bc" },
    { city: "Nanaimo", citySlug: "nanaimo", prov: "British Columbia", provSlug: "bc" },
    { city: "Kamloops", citySlug: "kamloops", prov: "British Columbia", provSlug: "bc" },

    // Alberta
    { city: "Calgary", citySlug: "calgary", prov: "Alberta", provSlug: "ab" },
    { city: "Edmonton", citySlug: "edmonton", prov: "Alberta", provSlug: "ab" },
    { city: "Red Deer", citySlug: "red-deer", prov: "Alberta", provSlug: "ab" },
    { city: "Lethbridge", citySlug: "lethbridge", prov: "Alberta", provSlug: "ab" },
    { city: "St. Albert", citySlug: "st-albert", prov: "Alberta", provSlug: "ab" },
    { city: "Medicine Hat", citySlug: "medicine-hat", prov: "Alberta", provSlug: "ab" },

    // Quebec
    { city: "Montreal", citySlug: "montreal", prov: "Quebec", provSlug: "qc" },
    { city: "Quebec City", citySlug: "quebec-city", prov: "Quebec", provSlug: "qc" },
    { city: "Laval", citySlug: "laval", prov: "Quebec", provSlug: "qc" },
    { city: "Gatineau", citySlug: "gatineau", prov: "Quebec", provSlug: "qc" },
    { city: "Longueuil", citySlug: "longueuil", prov: "Quebec", provSlug: "qc" },
    { city: "Sherbrooke", citySlug: "sherbrooke", prov: "Quebec", provSlug: "qc" },
    { city: "Levis", citySlug: "levis", prov: "Quebec", provSlug: "qc" },
    { city: "Trois-Rivieres", citySlug: "trois-rivieres", prov: "Quebec", provSlug: "qc" },

    // Manitoba & Sask
    { city: "Winnipeg", citySlug: "winnipeg", prov: "Manitoba", provSlug: "mb" },
    { city: "Saskatoon", citySlug: "saskatoon", prov: "Saskatchewan", provSlug: "sk" },
    { city: "Regina", citySlug: "regina", prov: "Saskatchewan", provSlug: "sk" },

    // Atlantic & Maritimes
    { city: "Halifax", citySlug: "halifax", prov: "Nova Scotia", provSlug: "ns" },
    { city: "St. John's", citySlug: "st-johns", prov: "Newfoundland", provSlug: "nl" },
    { city: "Moncton", citySlug: "moncton", prov: "New Brunswick", provSlug: "nb" },
    { city: "Saint John", citySlug: "saint-john", prov: "New Brunswick", provSlug: "nb" },
    { city: "Fredericton", citySlug: "fredericton", prov: "New Brunswick", provSlug: "nb" },
    { city: "Charlottetown", citySlug: "charlottetown", prov: "Prince Edward Island", provSlug: "pe" },

    // --- UNITED STATES ---
    // California
    { city: "Los Angeles", citySlug: "los-angeles", prov: "California", provSlug: "ca" },
    { city: "San Diego", citySlug: "san-diego", prov: "California", provSlug: "ca" },
    { city: "San Jose", citySlug: "san-jose", prov: "California", provSlug: "ca" },
    { city: "San Francisco", citySlug: "san-francisco", prov: "California", provSlug: "ca" },
    { city: "Fresno", citySlug: "fresno", prov: "California", provSlug: "ca" },
    { city: "Sacramento", citySlug: "sacramento", prov: "California", provSlug: "ca" },
    { city: "Long Beach", citySlug: "long-beach", prov: "California", provSlug: "ca" },
    { city: "Oakland", citySlug: "oakland", prov: "California", provSlug: "ca" },
    { city: "Bakersfield", citySlug: "bakersfield", prov: "California", provSlug: "ca" },
    { city: "Anaheim", citySlug: "anaheim", prov: "California", provSlug: "ca" },

    // Texas
    { city: "Houston", citySlug: "houston", prov: "Texas", provSlug: "tx" },
    { city: "San Antonio", citySlug: "san-antonio", prov: "Texas", provSlug: "tx" },
    { city: "Dallas", citySlug: "dallas", prov: "Texas", provSlug: "tx" },
    { city: "Austin", citySlug: "austin", prov: "Texas", provSlug: "tx" },
    { city: "Fort Worth", citySlug: "fort-worth", prov: "Texas", provSlug: "tx" },
    { city: "El Paso", citySlug: "el-paso", prov: "Texas", provSlug: "tx" },
    { city: "Arlington", citySlug: "arlington", prov: "Texas", provSlug: "tx" },
    { city: "Corpus Christi", citySlug: "corpus-christi", prov: "Texas", provSlug: "tx" },
    { city: "Plano", citySlug: "plano", prov: "Texas", provSlug: "tx" },
    { city: "Lubbock", citySlug: "lubbock", prov: "Texas", provSlug: "tx" },

    // Florida
    { city: "Jacksonville", citySlug: "jacksonville", prov: "Florida", provSlug: "fl" },
    { city: "Miami", citySlug: "miami", prov: "Florida", provSlug: "fl" },
    { city: "Tampa", citySlug: "tampa", prov: "Florida", provSlug: "fl" },
    { city: "Orlando", citySlug: "orlando", prov: "Florida", provSlug: "fl" },
    { city: "St. Petersburg", citySlug: "st-petersburg", prov: "Florida", provSlug: "fl" },
    { city: "Hialeah", citySlug: "hialeah", prov: "Florida", provSlug: "fl" },
    { city: "Tallahassee", citySlug: "tallahassee", prov: "Florida", provSlug: "fl" },

    // New York
    { city: "New York City", citySlug: "new-york-city", prov: "New York", provSlug: "ny" },
    { city: "Buffalo", citySlug: "buffalo", prov: "New York", provSlug: "ny" },
    { city: "Rochester", citySlug: "rochester", prov: "New York", provSlug: "ny" },
    { city: "Yonkers", citySlug: "yonkers", prov: "New York", provSlug: "ny" },
    { city: "Syracuse", citySlug: "syracuse", prov: "New York", provSlug: "ny" },

    // Mid-Market Heavyweights (Zero Grant SEO Competition)
    { city: "Chicago", citySlug: "chicago", prov: "Illinois", provSlug: "il" },
    { city: "Phoenix", citySlug: "phoenix", prov: "Arizona", provSlug: "az" },
    { city: "Philadelphia", citySlug: "philadelphia", prov: "Pennsylvania", provSlug: "pa" },
    { city: "Columbus", citySlug: "columbus", prov: "Ohio", provSlug: "oh" },
    { city: "Indianapolis", citySlug: "indianapolis", prov: "Indiana", provSlug: "in" },
    { city: "Charlotte", citySlug: "charlotte", prov: "North Carolina", provSlug: "nc" },
    { city: "Seattle", citySlug: "seattle", prov: "Washington", provSlug: "wa" },
    { city: "Denver", citySlug: "denver", prov: "Colorado", provSlug: "co" },
    { city: "Washington", citySlug: "washington", prov: "District of Columbia", provSlug: "dc" },
    { city: "Boston", citySlug: "boston", prov: "Massachusetts", provSlug: "ma" },
    { city: "Nashville", citySlug: "nashville", prov: "Tennessee", provSlug: "tn" },
    { city: "Detroit", citySlug: "detroit", prov: "Michigan", provSlug: "mi" },
    { city: "Oklahoma City", citySlug: "oklahoma-city", prov: "Oklahoma", provSlug: "ok" },
    { city: "Portland", citySlug: "portland", prov: "Oregon", provSlug: "or" },
    { city: "Las Vegas", citySlug: "las-vegas", prov: "Nevada", provSlug: "nv" },
    { city: "Memphis", citySlug: "memphis", prov: "Tennessee", provSlug: "tn" },
    { city: "Louisville", citySlug: "louisville", prov: "Kentucky", provSlug: "ky" },
    { city: "Baltimore", citySlug: "baltimore", prov: "Maryland", provSlug: "md" },
    { city: "Milwaukee", citySlug: "milwaukee", prov: "Wisconsin", provSlug: "wi" },
    { city: "Albuquerque", citySlug: "albuquerque", prov: "New Mexico", provSlug: "nm" },
    { city: "Tucson", citySlug: "tucson", prov: "Arizona", provSlug: "az" },
    { city: "Colorado Springs", citySlug: "colorado-springs", prov: "Colorado", provSlug: "co" },
    { city: "Raleigh", citySlug: "raleigh", prov: "North Carolina", provSlug: "nc" },
    { city: "Omaha", citySlug: "omaha", prov: "Nebraska", provSlug: "ne" },
    { city: "Miami", citySlug: "miami", prov: "Florida", provSlug: "fl" },
    { city: "Atlanta", citySlug: "atlanta", prov: "Georgia", provSlug: "ga" },
    { city: "Tulsa", citySlug: "tulsa", prov: "Oklahoma", provSlug: "ok" },
    { city: "Oakland", citySlug: "oakland", prov: "California", provSlug: "ca" },
    { city: "Minneapolis", citySlug: "minneapolis", prov: "Minnesota", provSlug: "mn" },
    { city: "Wichita", citySlug: "wichita", prov: "Kansas", provSlug: "ks" },
    { city: "Cleveland", citySlug: "cleveland", prov: "Ohio", provSlug: "oh" },
    { city: "New Orleans", citySlug: "new-orleans", prov: "Louisiana", provSlug: "la" },
    { city: "Bakersfield", citySlug: "bakersfield", prov: "California", provSlug: "ca" },
    { city: "Honolulu", citySlug: "honolulu", prov: "Hawaii", provSlug: "hi" },
    { city: "Anaheim", citySlug: "anaheim", prov: "California", provSlug: "ca" },
    { city: "Santa Ana", citySlug: "santa-ana", prov: "California", provSlug: "ca" },
    { city: "Lexington", citySlug: "lexington", prov: "Kentucky", provSlug: "ky" },
    { city: "Corpus Christi", citySlug: "corpus-christi", prov: "Texas", provSlug: "tx" },
    { city: "Henderson", citySlug: "henderson", prov: "Nevada", provSlug: "nv" },
    { city: "Riverside", citySlug: "riverside", prov: "California", provSlug: "ca" },
    { city: "Newark", citySlug: "newark", prov: "New Jersey", provSlug: "nj" },
    { city: "Saint Paul", citySlug: "saint-paul", prov: "Minnesota", provSlug: "mn" },
    { city: "Cincinnati", citySlug: "cincinnati", prov: "Ohio", provSlug: "oh" },
    { city: "Anchorage", citySlug: "anchorage", prov: "Alaska", provSlug: "ak" },
    { city: "Greensboro", citySlug: "greensboro", prov: "North Carolina", provSlug: "nc" },
    { city: "Plano", citySlug: "plano", prov: "Texas", provSlug: "tx" },
    { city: "Lincoln", citySlug: "lincoln", prov: "Nebraska", provSlug: "ne" },
    { city: "Irvine", citySlug: "irvine", prov: "California", provSlug: "ca" },
    { city: "Toledo", citySlug: "toledo", prov: "Ohio", provSlug: "oh" },
    { city: "Jersey City", citySlug: "jersey-city", prov: "New Jersey", provSlug: "nj" },
    { city: "Chula Vista", citySlug: "chula-vista", prov: "California", provSlug: "ca" },
    { city: "Durham", citySlug: "durham", prov: "North Carolina", provSlug: "nc" },
    { city: "Fort Wayne", citySlug: "fort-wayne", prov: "Indiana", provSlug: "in" },
    { city: "St. Petersburg", citySlug: "st-petersburg", prov: "Florida", provSlug: "fl" },
    { city: "Laredo", citySlug: "laredo", prov: "Texas", provSlug: "tx" },
    { city: "Madison", citySlug: "madison", prov: "Wisconsin", provSlug: "wi" },
    { city: "Chandler", citySlug: "chandler", prov: "Arizona", provSlug: "az" },
    { city: "Lubbock", citySlug: "lubbock", prov: "Texas", provSlug: "tx" },
    { city: "Scottsdale", citySlug: "scottsdale", prov: "Arizona", provSlug: "az" },
    { city: "Reno", citySlug: "reno", prov: "Nevada", provSlug: "nv" },
    { city: "Glendale", citySlug: "glendale", prov: "Arizona", provSlug: "az" },
    { city: "Norfolk", citySlug: "norfolk", prov: "Virginia", provSlug: "va" },
    { city: "Winston-Salem", citySlug: "winston-salem", prov: "North Carolina", provSlug: "nc" },
    { city: "North Las Vegas", citySlug: "north-las-vegas", prov: "Nevada", provSlug: "nv" },
    { city: "Gilbert", citySlug: "gilbert", prov: "Arizona", provSlug: "az" },
    { city: "Chesapeake", citySlug: "chesapeake", prov: "Virginia", provSlug: "va" },
    { city: "Irving", citySlug: "irving", prov: "Texas", provSlug: "tx" },
    { city: "Hialeah", citySlug: "hialeah", prov: "Florida", provSlug: "fl" },
    { city: "Garland", citySlug: "garland", prov: "Texas", provSlug: "tx" },
    { city: "Fremont", citySlug: "fremont", prov: "California", provSlug: "ca" },
    { city: "Richmond", citySlug: "richmond", prov: "Virginia", provSlug: "va" },
    { city: "Boise", citySlug: "boise", prov: "Idaho", provSlug: "id" },
    { city: "Baton Rouge", citySlug: "baton-rouge", prov: "Louisiana", provSlug: "la" },
    { city: "Des Moines", citySlug: "des-moines", prov: "Iowa", provSlug: "ia" },
];

// Target High-Value Industries (Expanded from 6 to 15)
const INDUSTRIES = [
    // Original 6
    { name: "Technology Startups", slug: "technology" },
    { name: "Agriculture and Farming", slug: "agriculture" },
    { name: "Manufacturing", slug: "manufacturing" },
    { name: "Healthcare and Medical", slug: "healthcare" },
    { name: "Clean Tech and Energy", slug: "clean-energy" },
    { name: "Women-Owned Businesses", slug: "women-entrepreneurs" },
    // New 9 Additions
    { name: "Restaurants and Hospitality", slug: "restaurants-hospitality" },
    { name: "Retail and Main Street", slug: "retail" },
    { name: "Non-profits and Social Enterprises", slug: "non-profits" },
    { name: "Veteran-Owned Businesses", slug: "veterans" },
    { name: "Minority and BIPOC Founders", slug: "minority-owned" },
    { name: "Arts and Entertainment", slug: "arts-entertainment" },
    { name: "Education and EdTech", slug: "education" },
    { name: "Supply Chain and Logistics", slug: "logistics" },
    { name: "Local Trades and Construction", slug: "construction" }
];

let cachedPages: PseoPage[] | null = null;

/**
 * Generates the deterministic cross-product of all Cities x Industries.
 * Assigns a specific `publishedAt` date by incrementing by 1 day every `PAGES_PER_DAY` items.
 */
export function getAllPseoPages(): PseoPage[] {
    if (cachedPages) return cachedPages;

    const pages: PseoPage[] = [];
    const now = new Date();
    let dayOffset = 0;
    let counter = 0;

    // We loop through cities and industries to deterministically generate URLs
    for (const city of CITIES) {
        for (const industry of INDUSTRIES) {
            // Calculate pub date based on counter
            const itemPubDate = addDays(DRIP_START_DATE, dayOffset);
            const isPublished = itemPubDate <= now;

            pages.push({
                provinceSlug: city.provSlug,
                provinceName: city.prov,
                citySlug: city.citySlug,
                cityName: city.city,
                industrySlug: industry.slug,
                industryName: industry.name,
                publishedAt: itemPubDate.toISOString(),
                isPublished: isPublished
            });

            counter++;
            if (counter % PAGES_PER_DAY === 0) {
                dayOffset++;
            }
        }
    }

    cachedPages = pages;
    return pages;
}

/**
 * Fetches a specific pSEO page configuration. Returns null if invalid path.
 */
export function getPseoPage(provinceSlug: string, citySlug: string, industrySlug: string): PseoPage | null {
    const allPages = getAllPseoPages();
    return allPages.find(p =>
        p.provinceSlug === provinceSlug &&
        p.citySlug === citySlug &&
        p.industrySlug === industrySlug
    ) || null;
}
