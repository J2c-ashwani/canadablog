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

// Top 50 Canadian Cities mapped to their Provinces
const CITIES = [
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
    // British Columbia
    { city: "Vancouver", citySlug: "vancouver", prov: "British Columbia", provSlug: "bc" },
    { city: "Surrey", citySlug: "surrey", prov: "British Columbia", provSlug: "bc" },
    { city: "Burnaby", citySlug: "burnaby", prov: "British Columbia", provSlug: "bc" },
    { city: "Richmond", citySlug: "richmond", prov: "British Columbia", provSlug: "bc" },
    { city: "Kelowna", citySlug: "kelowna", prov: "British Columbia", provSlug: "bc" },
    // Alberta
    { city: "Calgary", citySlug: "calgary", prov: "Alberta", provSlug: "ab" },
    { city: "Edmonton", citySlug: "edmonton", prov: "Alberta", provSlug: "ab" },
    { city: "Red Deer", citySlug: "red-deer", prov: "Alberta", provSlug: "ab" },
    { city: "Lethbridge", citySlug: "lethbridge", prov: "Alberta", provSlug: "ab" },
    // Quebec
    { city: "Montreal", citySlug: "montreal", prov: "Quebec", provSlug: "qc" },
    { city: "Quebec City", citySlug: "quebec-city", prov: "Quebec", provSlug: "qc" },
    { city: "Laval", citySlug: "laval", prov: "Quebec", provSlug: "qc" },
    { city: "Gatineau", citySlug: "gatineau", prov: "Quebec", provSlug: "qc" },
    // Manitoba & Sask
    { city: "Winnipeg", citySlug: "winnipeg", prov: "Manitoba", provSlug: "mb" },
    { city: "Saskatoon", citySlug: "saskatoon", prov: "Saskatchewan", provSlug: "sk" },
    { city: "Regina", citySlug: "regina", prov: "Saskatchewan", provSlug: "sk" },
    // Atlantic
    { city: "Halifax", citySlug: "halifax", prov: "Nova Scotia", provSlug: "ns" },
    { city: "St. John's", citySlug: "st-johns", prov: "Newfoundland", provSlug: "nl" },
    { city: "Moncton", citySlug: "moncton", prov: "New Brunswick", provSlug: "nb" }
];

// Target High-Value Industries
const INDUSTRIES = [
    { name: "Technology Startups", slug: "technology" },
    { name: "Agriculture and Farming", slug: "agriculture" },
    { name: "Manufacturing", slug: "manufacturing" },
    { name: "Healthcare and Medical", slug: "healthcare" },
    { name: "Clean Tech and Energy", slug: "clean-energy" },
    { name: "Women-Owned Businesses", slug: "women-entrepreneurs" }
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
