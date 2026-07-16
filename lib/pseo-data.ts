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
    tier: 'A' | 'B' | 'C';
};

// Top 150 US & Canadian Cities mapped to their Provinces/States
export const CITIES = [
    {
        "city": "Toronto",
        "citySlug": "toronto",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Ottawa",
        "citySlug": "ottawa",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Mississauga",
        "citySlug": "mississauga",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Brampton",
        "citySlug": "brampton",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Hamilton",
        "citySlug": "hamilton",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "London",
        "citySlug": "london",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Markham",
        "citySlug": "markham",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Vaughan",
        "citySlug": "vaughan",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Kitchener",
        "citySlug": "kitchener",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Windsor",
        "citySlug": "windsor",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Richmond Hill",
        "citySlug": "richmond-hill",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Oakville",
        "citySlug": "oakville",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Burlington",
        "citySlug": "burlington",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Greater Sudbury",
        "citySlug": "greater-sudbury",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Oshawa",
        "citySlug": "oshawa",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Barrie",
        "citySlug": "barrie",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "St. Catharines",
        "citySlug": "st-catharines",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Cambridge",
        "citySlug": "cambridge",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Kingston",
        "citySlug": "kingston",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Guelph",
        "citySlug": "guelph",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Thunder Bay",
        "citySlug": "thunder-bay",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Sarnia",
        "citySlug": "sarnia",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Belleville",
        "citySlug": "belleville",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Sault Ste. Marie",
        "citySlug": "sault-ste-marie",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Welland",
        "citySlug": "welland",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Cornwall",
        "citySlug": "cornwall",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "North Bay",
        "citySlug": "north-bay",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Timmins",
        "citySlug": "timmins",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Woodstock",
        "citySlug": "woodstock",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "St. Thomas",
        "citySlug": "st-thomas",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Stratford",
        "citySlug": "stratford",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Orillia",
        "citySlug": "orillia",
        "prov": "Ontario",
        "provSlug": "on"
    },
    {
        "city": "Vancouver",
        "citySlug": "vancouver",
        "prov": "British Columbia",
        "provSlug": "bc"
    },
    {
        "city": "Surrey",
        "citySlug": "surrey",
        "prov": "British Columbia",
        "provSlug": "bc"
    },
    {
        "city": "Burnaby",
        "citySlug": "burnaby",
        "prov": "British Columbia",
        "provSlug": "bc"
    },
    {
        "city": "Richmond",
        "citySlug": "richmond-bc",
        "prov": "British Columbia",
        "provSlug": "bc"
    },
    {
        "city": "Kelowna",
        "citySlug": "kelowna",
        "prov": "British Columbia",
        "provSlug": "bc"
    },
    {
        "city": "Abbotsford",
        "citySlug": "abbotsford",
        "prov": "British Columbia",
        "provSlug": "bc"
    },
    {
        "city": "Coquitlam",
        "citySlug": "coquitlam",
        "prov": "British Columbia",
        "provSlug": "bc"
    },
    {
        "city": "Victoria",
        "citySlug": "victoria",
        "prov": "British Columbia",
        "provSlug": "bc"
    },
    {
        "city": "Saanich",
        "citySlug": "saanich",
        "prov": "British Columbia",
        "provSlug": "bc"
    },
    {
        "city": "Nanaimo",
        "citySlug": "nanaimo",
        "prov": "British Columbia",
        "provSlug": "bc"
    },
    {
        "city": "Kamloops",
        "citySlug": "kamloops",
        "prov": "British Columbia",
        "provSlug": "bc"
    },
    {
        "city": "Prince George",
        "citySlug": "prince-george",
        "prov": "British Columbia",
        "provSlug": "bc"
    },
    {
        "city": "Chilliwack",
        "citySlug": "chilliwack",
        "prov": "British Columbia",
        "provSlug": "bc"
    },
    {
        "city": "New Westminster",
        "citySlug": "new-westminster",
        "prov": "British Columbia",
        "provSlug": "bc"
    },
    {
        "city": "Port Coquitlam",
        "citySlug": "port-coquitlam",
        "prov": "British Columbia",
        "provSlug": "bc"
    },
    {
        "city": "Delta",
        "citySlug": "delta",
        "prov": "British Columbia",
        "provSlug": "bc"
    },
    {
        "city": "Calgary",
        "citySlug": "calgary",
        "prov": "Alberta",
        "provSlug": "ab"
    },
    {
        "city": "Edmonton",
        "citySlug": "edmonton",
        "prov": "Alberta",
        "provSlug": "ab"
    },
    {
        "city": "Red Deer",
        "citySlug": "red-deer",
        "prov": "Alberta",
        "provSlug": "ab"
    },
    {
        "city": "Lethbridge",
        "citySlug": "lethbridge",
        "prov": "Alberta",
        "provSlug": "ab"
    },
    {
        "city": "St. Albert",
        "citySlug": "st-albert",
        "prov": "Alberta",
        "provSlug": "ab"
    },
    {
        "city": "Medicine Hat",
        "citySlug": "medicine-hat",
        "prov": "Alberta",
        "provSlug": "ab"
    },
    {
        "city": "Grande Prairie",
        "citySlug": "grande-prairie",
        "prov": "Alberta",
        "provSlug": "ab"
    },
    {
        "city": "Fort McMurray",
        "citySlug": "fort-mcmurray",
        "prov": "Alberta",
        "provSlug": "ab"
    },
    {
        "city": "Airdrie",
        "citySlug": "airdrie",
        "prov": "Alberta",
        "provSlug": "ab"
    },
    {
        "city": "Spruce Grove",
        "citySlug": "spruce-grove",
        "prov": "Alberta",
        "provSlug": "ab"
    },
    {
        "city": "Leduc",
        "citySlug": "leduc",
        "prov": "Alberta",
        "provSlug": "ab"
    },
    {
        "city": "Montreal",
        "citySlug": "montreal",
        "prov": "Quebec",
        "provSlug": "qc"
    },
    {
        "city": "Quebec City",
        "citySlug": "quebec-city",
        "prov": "Quebec",
        "provSlug": "qc"
    },
    {
        "city": "Laval",
        "citySlug": "laval",
        "prov": "Quebec",
        "provSlug": "qc"
    },
    {
        "city": "Gatineau",
        "citySlug": "gatineau",
        "prov": "Quebec",
        "provSlug": "qc"
    },
    {
        "city": "Longueuil",
        "citySlug": "longueuil",
        "prov": "Quebec",
        "provSlug": "qc"
    },
    {
        "city": "Sherbrooke",
        "citySlug": "sherbrooke",
        "prov": "Quebec",
        "provSlug": "qc"
    },
    {
        "city": "Levis",
        "citySlug": "levis",
        "prov": "Quebec",
        "provSlug": "qc"
    },
    {
        "city": "Trois-Rivieres",
        "citySlug": "trois-rivieres",
        "prov": "Quebec",
        "provSlug": "qc"
    },
    {
        "city": "Saint-Jean-sur-Richelieu",
        "citySlug": "saint-jean-sur-richelieu",
        "prov": "Quebec",
        "provSlug": "qc"
    },
    {
        "city": "Drummondville",
        "citySlug": "drummondville",
        "prov": "Quebec",
        "provSlug": "qc"
    },
    {
        "city": "Granby",
        "citySlug": "granby",
        "prov": "Quebec",
        "provSlug": "qc"
    },
    {
        "city": "Saint-Hyacinthe",
        "citySlug": "saint-hyacinthe",
        "prov": "Quebec",
        "provSlug": "qc"
    },
    {
        "city": "Shawinigan",
        "citySlug": "shawinigan",
        "prov": "Quebec",
        "provSlug": "qc"
    },
    {
        "city": "Winnipeg",
        "citySlug": "winnipeg",
        "prov": "Manitoba",
        "provSlug": "mb"
    },
    {
        "city": "Brandon",
        "citySlug": "brandon-mb",
        "prov": "Manitoba",
        "provSlug": "mb"
    },
    {
        "city": "Steinbach",
        "citySlug": "steinbach",
        "prov": "Manitoba",
        "provSlug": "mb"
    },
    {
        "city": "Saskatoon",
        "citySlug": "saskatoon",
        "prov": "Saskatchewan",
        "provSlug": "sk"
    },
    {
        "city": "Regina",
        "citySlug": "regina",
        "prov": "Saskatchewan",
        "provSlug": "sk"
    },
    {
        "city": "Prince Albert",
        "citySlug": "prince-albert",
        "prov": "Saskatchewan",
        "provSlug": "sk"
    },
    {
        "city": "Moose Jaw",
        "citySlug": "moose-jaw",
        "prov": "Saskatchewan",
        "provSlug": "sk"
    },
    {
        "city": "Halifax",
        "citySlug": "halifax",
        "prov": "Nova Scotia",
        "provSlug": "ns"
    },
    {
        "city": "Sydney",
        "citySlug": "sydney",
        "prov": "Nova Scotia",
        "provSlug": "ns"
    },
    {
        "city": "Truro",
        "citySlug": "truro",
        "prov": "Nova Scotia",
        "provSlug": "ns"
    },
    {
        "city": "St. John's",
        "citySlug": "st-johns",
        "prov": "Newfoundland",
        "provSlug": "nl"
    },
    {
        "city": "Mount Pearl",
        "citySlug": "mount-pearl",
        "prov": "Newfoundland",
        "provSlug": "nl"
    },
    {
        "city": "Corner Brook",
        "citySlug": "corner-brook",
        "prov": "Newfoundland",
        "provSlug": "nl"
    },
    {
        "city": "Moncton",
        "citySlug": "moncton",
        "prov": "New Brunswick",
        "provSlug": "nb"
    },
    {
        "city": "Saint John",
        "citySlug": "saint-john",
        "prov": "New Brunswick",
        "provSlug": "nb"
    },
    {
        "city": "Fredericton",
        "citySlug": "fredericton",
        "prov": "New Brunswick",
        "provSlug": "nb"
    },
    {
        "city": "Charlottetown",
        "citySlug": "charlottetown",
        "prov": "Prince Edward Island",
        "provSlug": "pe"
    },
    {
        "city": "Summerside",
        "citySlug": "summerside",
        "prov": "Prince Edward Island",
        "provSlug": "pe"
    },
    {
        "city": "Los Angeles",
        "citySlug": "los-angeles",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "San Diego",
        "citySlug": "san-diego",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "San Jose",
        "citySlug": "san-jose",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "San Francisco",
        "citySlug": "san-francisco",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Fresno",
        "citySlug": "fresno",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Sacramento",
        "citySlug": "sacramento",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Long Beach",
        "citySlug": "long-beach",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Oakland",
        "citySlug": "oakland",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Bakersfield",
        "citySlug": "bakersfield",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Anaheim",
        "citySlug": "anaheim",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Santa Ana",
        "citySlug": "santa-ana",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Riverside",
        "citySlug": "riverside",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Stockton",
        "citySlug": "stockton",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Chula Vista",
        "citySlug": "chula-vista",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Irvine",
        "citySlug": "irvine",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Fremont",
        "citySlug": "fremont",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "San Bernardino",
        "citySlug": "san-bernardino",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Modesto",
        "citySlug": "modesto",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Fontana",
        "citySlug": "fontana",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Oxnard",
        "citySlug": "oxnard",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Huntington Beach",
        "citySlug": "huntington-beach",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Glendale",
        "citySlug": "glendale-ca",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Santa Clarita",
        "citySlug": "santa-clarita",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Garden Grove",
        "citySlug": "garden-grove",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Santa Rosa",
        "citySlug": "santa-rosa",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Oceanside",
        "citySlug": "oceanside",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Rancho Cucamonga",
        "citySlug": "rancho-cucamonga",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Ontario",
        "citySlug": "ontario-ca",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Lancaster",
        "citySlug": "lancaster",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Palmdale",
        "citySlug": "palmdale",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Salinas",
        "citySlug": "salinas",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Pomona",
        "citySlug": "pomona",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Sunnyvale",
        "citySlug": "sunnyvale",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Escondido",
        "citySlug": "escondido",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Torrance",
        "citySlug": "torrance",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Pasadena",
        "citySlug": "pasadena-ca",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Orange",
        "citySlug": "orange",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Fullerton",
        "citySlug": "fullerton",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Thousand Oaks",
        "citySlug": "thousand-oaks",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Visalia",
        "citySlug": "visalia",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Simi Valley",
        "citySlug": "simi-valley",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Concord",
        "citySlug": "concord",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Roseville",
        "citySlug": "roseville",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Santa Clara",
        "citySlug": "santa-clara",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Vallejo",
        "citySlug": "vallejo",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Berkeley",
        "citySlug": "berkeley",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Victorville",
        "citySlug": "victorville",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "El Monte",
        "citySlug": "el-monte",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Downey",
        "citySlug": "downey",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Costa Mesa",
        "citySlug": "costa-mesa",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Inglewood",
        "citySlug": "inglewood",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "West Covina",
        "citySlug": "west-covina",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Norwalk",
        "citySlug": "norwalk",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Fairfield",
        "citySlug": "fairfield",
        "prov": "California",
        "provSlug": "ca"
    },
    {
        "city": "Houston",
        "citySlug": "houston",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "San Antonio",
        "citySlug": "san-antonio",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Dallas",
        "citySlug": "dallas",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Austin",
        "citySlug": "austin",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Fort Worth",
        "citySlug": "fort-worth",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "El Paso",
        "citySlug": "el-paso",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Arlington",
        "citySlug": "arlington",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Corpus Christi",
        "citySlug": "corpus-christi",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Plano",
        "citySlug": "plano",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Lubbock",
        "citySlug": "lubbock",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Laredo",
        "citySlug": "laredo",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Garland",
        "citySlug": "garland",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Frisco",
        "citySlug": "frisco",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "McKinney",
        "citySlug": "mckinney",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Amarillo",
        "citySlug": "amarillo",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Grand Prairie",
        "citySlug": "grand-prairie",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Brownsville",
        "citySlug": "brownsville",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Pasadena",
        "citySlug": "pasadena-tx",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Mesquite",
        "citySlug": "mesquite",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "McAllen",
        "citySlug": "mcallen",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Carrollton",
        "citySlug": "carrollton",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Waco",
        "citySlug": "waco",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Denton",
        "citySlug": "denton",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Abilene",
        "citySlug": "abilene",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Beaumont",
        "citySlug": "beaumont",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Round Rock",
        "citySlug": "round-rock",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "The Woodlands",
        "citySlug": "the-woodlands",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Richardson",
        "citySlug": "richardson",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Pearland",
        "citySlug": "pearland",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "College Station",
        "citySlug": "college-station",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Tyler",
        "citySlug": "tyler",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Lewisville",
        "citySlug": "lewisville",
        "prov": "Texas",
        "provSlug": "tx"
    },
    {
        "city": "Jacksonville",
        "citySlug": "jacksonville",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Miami",
        "citySlug": "miami",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Tampa",
        "citySlug": "tampa",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Orlando",
        "citySlug": "orlando",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "St. Petersburg",
        "citySlug": "st-petersburg",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Hialeah",
        "citySlug": "hialeah",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Tallahassee",
        "citySlug": "tallahassee",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Port St. Lucie",
        "citySlug": "port-st-lucie",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Cape Coral",
        "citySlug": "cape-coral",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Fort Lauderdale",
        "citySlug": "fort-lauderdale",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Pembroke Pines",
        "citySlug": "pembroke-pines",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Hollywood",
        "citySlug": "hollywood",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Miramar",
        "citySlug": "miramar",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Gainesville",
        "citySlug": "gainesville",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Coral Springs",
        "citySlug": "coral-springs",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Clearwater",
        "citySlug": "clearwater",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Brandon",
        "citySlug": "brandon-fl",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Lehigh Acres",
        "citySlug": "lehigh-acres",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Spring Hill",
        "citySlug": "spring-hill",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "Pompano Beach",
        "citySlug": "pompano-beach",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "West Palm Beach",
        "citySlug": "west-palm-beach",
        "prov": "Florida",
        "provSlug": "fl"
    },
    {
        "city": "New York City",
        "citySlug": "new-york-city",
        "prov": "New York",
        "provSlug": "ny"
    },
    {
        "city": "Buffalo",
        "citySlug": "buffalo",
        "prov": "New York",
        "provSlug": "ny"
    },
    {
        "city": "Rochester",
        "citySlug": "rochester",
        "prov": "New York",
        "provSlug": "ny"
    },
    {
        "city": "Yonkers",
        "citySlug": "yonkers",
        "prov": "New York",
        "provSlug": "ny"
    },
    {
        "city": "Syracuse",
        "citySlug": "syracuse",
        "prov": "New York",
        "provSlug": "ny"
    },
    {
        "city": "Albany",
        "citySlug": "albany",
        "prov": "New York",
        "provSlug": "ny"
    },
    {
        "city": "New Rochelle",
        "citySlug": "new-rochelle",
        "prov": "New York",
        "provSlug": "ny"
    },
    {
        "city": "Mount Vernon",
        "citySlug": "mount-vernon",
        "prov": "New York",
        "provSlug": "ny"
    },
    {
        "city": "Schenectady",
        "citySlug": "schenectady",
        "prov": "New York",
        "provSlug": "ny"
    },
    {
        "city": "Utica",
        "citySlug": "utica",
        "prov": "New York",
        "provSlug": "ny"
    },
    {
        "city": "White Plains",
        "citySlug": "white-plains",
        "prov": "New York",
        "provSlug": "ny"
    },
    {
        "city": "Chicago",
        "citySlug": "chicago",
        "prov": "Illinois",
        "provSlug": "il"
    },
    {
        "city": "Aurora",
        "citySlug": "aurora-il",
        "prov": "Illinois",
        "provSlug": "il"
    },
    {
        "city": "Rockford",
        "citySlug": "rockford",
        "prov": "Illinois",
        "provSlug": "il"
    },
    {
        "city": "Joliet",
        "citySlug": "joliet",
        "prov": "Illinois",
        "provSlug": "il"
    },
    {
        "city": "Naperville",
        "citySlug": "naperville",
        "prov": "Illinois",
        "provSlug": "il"
    },
    {
        "city": "Springfield",
        "citySlug": "springfield-il",
        "prov": "Illinois",
        "provSlug": "il"
    },
    {
        "city": "Peoria",
        "citySlug": "peoria-il",
        "prov": "Illinois",
        "provSlug": "il"
    },
    {
        "city": "Elgin",
        "citySlug": "elgin",
        "prov": "Illinois",
        "provSlug": "il"
    },
    {
        "city": "Phoenix",
        "citySlug": "phoenix",
        "prov": "Arizona",
        "provSlug": "az"
    },
    {
        "city": "Tucson",
        "citySlug": "tucson",
        "prov": "Arizona",
        "provSlug": "az"
    },
    {
        "city": "Mesa",
        "citySlug": "mesa",
        "prov": "Arizona",
        "provSlug": "az"
    },
    {
        "city": "Chandler",
        "citySlug": "chandler",
        "prov": "Arizona",
        "provSlug": "az"
    },
    {
        "city": "Gilbert",
        "citySlug": "gilbert",
        "prov": "Arizona",
        "provSlug": "az"
    },
    {
        "city": "Glendale",
        "citySlug": "glendale-az",
        "prov": "Arizona",
        "provSlug": "az"
    },
    {
        "city": "Scottsdale",
        "citySlug": "scottsdale",
        "prov": "Arizona",
        "provSlug": "az"
    },
    {
        "city": "Tempe",
        "citySlug": "tempe",
        "prov": "Arizona",
        "provSlug": "az"
    },
    {
        "city": "Peoria",
        "citySlug": "peoria-az",
        "prov": "Arizona",
        "provSlug": "az"
    },
    {
        "city": "Surprise",
        "citySlug": "surprise",
        "prov": "Arizona",
        "provSlug": "az"
    },
    {
        "city": "Seattle",
        "citySlug": "seattle",
        "prov": "Washington",
        "provSlug": "wa"
    },
    {
        "city": "Spokane",
        "citySlug": "spokane",
        "prov": "Washington",
        "provSlug": "wa"
    },
    {
        "city": "Tacoma",
        "citySlug": "tacoma",
        "prov": "Washington",
        "provSlug": "wa"
    },
    {
        "city": "Vancouver",
        "citySlug": "vancouver-wa",
        "prov": "Washington",
        "provSlug": "wa"
    },
    {
        "city": "Bellevue",
        "citySlug": "bellevue",
        "prov": "Washington",
        "provSlug": "wa"
    },
    {
        "city": "Kent",
        "citySlug": "kent",
        "prov": "Washington",
        "provSlug": "wa"
    },
    {
        "city": "Everett",
        "citySlug": "everett",
        "prov": "Washington",
        "provSlug": "wa"
    },
    {
        "city": "Renton",
        "citySlug": "renton",
        "prov": "Washington",
        "provSlug": "wa"
    },
    {
        "city": "Federal Way",
        "citySlug": "federal-way",
        "prov": "Washington",
        "provSlug": "wa"
    },
    {
        "city": "Yakima",
        "citySlug": "yakima",
        "prov": "Washington",
        "provSlug": "wa"
    },
    {
        "city": "Denver",
        "citySlug": "denver",
        "prov": "Colorado",
        "provSlug": "co"
    },
    {
        "city": "Colorado Springs",
        "citySlug": "colorado-springs",
        "prov": "Colorado",
        "provSlug": "co"
    },
    {
        "city": "Aurora",
        "citySlug": "aurora-co",
        "prov": "Colorado",
        "provSlug": "co"
    },
    {
        "city": "Fort Collins",
        "citySlug": "fort-collins",
        "prov": "Colorado",
        "provSlug": "co"
    },
    {
        "city": "Lakewood",
        "citySlug": "lakewood",
        "prov": "Colorado",
        "provSlug": "co"
    },
    {
        "city": "Thornton",
        "citySlug": "thornton",
        "prov": "Colorado",
        "provSlug": "co"
    },
    {
        "city": "Arvada",
        "citySlug": "arvada",
        "prov": "Colorado",
        "provSlug": "co"
    },
    {
        "city": "Westminster",
        "citySlug": "westminster",
        "prov": "Colorado",
        "provSlug": "co"
    },
    {
        "city": "Pueblo",
        "citySlug": "pueblo",
        "prov": "Colorado",
        "provSlug": "co"
    },
    {
        "city": "Charlotte",
        "citySlug": "charlotte",
        "prov": "North Carolina",
        "provSlug": "nc"
    },
    {
        "city": "Raleigh",
        "citySlug": "raleigh",
        "prov": "North Carolina",
        "provSlug": "nc"
    },
    {
        "city": "Greensboro",
        "citySlug": "greensboro",
        "prov": "North Carolina",
        "provSlug": "nc"
    },
    {
        "city": "Durham",
        "citySlug": "durham",
        "prov": "North Carolina",
        "provSlug": "nc"
    },
    {
        "city": "Winston-Salem",
        "citySlug": "winston-salem",
        "prov": "North Carolina",
        "provSlug": "nc"
    },
    {
        "city": "Fayetteville",
        "citySlug": "fayetteville",
        "prov": "North Carolina",
        "provSlug": "nc"
    },
    {
        "city": "Cary",
        "citySlug": "cary",
        "prov": "North Carolina",
        "provSlug": "nc"
    },
    {
        "city": "Wilmington",
        "citySlug": "wilmington",
        "prov": "North Carolina",
        "provSlug": "nc"
    },
    {
        "city": "High Point",
        "citySlug": "high-point",
        "prov": "North Carolina",
        "provSlug": "nc"
    },
    {
        "city": "Atlanta",
        "citySlug": "atlanta",
        "prov": "Georgia",
        "provSlug": "ga"
    },
    {
        "city": "Augusta",
        "citySlug": "augusta",
        "prov": "Georgia",
        "provSlug": "ga"
    },
    {
        "city": "Columbus",
        "citySlug": "columbus-ga",
        "prov": "Georgia",
        "provSlug": "ga"
    },
    {
        "city": "Savannah",
        "citySlug": "savannah",
        "prov": "Georgia",
        "provSlug": "ga"
    },
    {
        "city": "Athens",
        "citySlug": "athens",
        "prov": "Georgia",
        "provSlug": "ga"
    },
    {
        "city": "Sandy Springs",
        "citySlug": "sandy-springs",
        "prov": "Georgia",
        "provSlug": "ga"
    },
    {
        "city": "Columbus",
        "citySlug": "columbus",
        "prov": "Ohio",
        "provSlug": "oh"
    },
    {
        "city": "Cleveland",
        "citySlug": "cleveland",
        "prov": "Ohio",
        "provSlug": "oh"
    },
    {
        "city": "Cincinnati",
        "citySlug": "cincinnati",
        "prov": "Ohio",
        "provSlug": "oh"
    },
    {
        "city": "Toledo",
        "citySlug": "toledo",
        "prov": "Ohio",
        "provSlug": "oh"
    },
    {
        "city": "Akron",
        "citySlug": "akron",
        "prov": "Ohio",
        "provSlug": "oh"
    },
    {
        "city": "Dayton",
        "citySlug": "dayton",
        "prov": "Ohio",
        "provSlug": "oh"
    },
    {
        "city": "Parma",
        "citySlug": "parma",
        "prov": "Ohio",
        "provSlug": "oh"
    },
    {
        "city": "Canton",
        "citySlug": "canton",
        "prov": "Ohio",
        "provSlug": "oh"
    },
    {
        "city": "Detroit",
        "citySlug": "detroit",
        "prov": "Michigan",
        "provSlug": "mi"
    },
    {
        "city": "Grand Rapids",
        "citySlug": "grand-rapids",
        "prov": "Michigan",
        "provSlug": "mi"
    },
    {
        "city": "Warren",
        "citySlug": "warren",
        "prov": "Michigan",
        "provSlug": "mi"
    },
    {
        "city": "Sterling Heights",
        "citySlug": "sterling-heights",
        "prov": "Michigan",
        "provSlug": "mi"
    },
    {
        "city": "Ann Arbor",
        "citySlug": "ann-arbor",
        "prov": "Michigan",
        "provSlug": "mi"
    },
    {
        "city": "Lansing",
        "citySlug": "lansing",
        "prov": "Michigan",
        "provSlug": "mi"
    },
    {
        "city": "Flint",
        "citySlug": "flint",
        "prov": "Michigan",
        "provSlug": "mi"
    },
    {
        "city": "Philadelphia",
        "citySlug": "philadelphia",
        "prov": "Pennsylvania",
        "provSlug": "pa"
    },
    {
        "city": "Pittsburgh",
        "citySlug": "pittsburgh",
        "prov": "Pennsylvania",
        "provSlug": "pa"
    },
    {
        "city": "Allentown",
        "citySlug": "allentown",
        "prov": "Pennsylvania",
        "provSlug": "pa"
    },
    {
        "city": "Erie",
        "citySlug": "erie",
        "prov": "Pennsylvania",
        "provSlug": "pa"
    },
    {
        "city": "Reading",
        "citySlug": "reading",
        "prov": "Pennsylvania",
        "provSlug": "pa"
    },
    {
        "city": "Nashville",
        "citySlug": "nashville",
        "prov": "Tennessee",
        "provSlug": "tn"
    },
    {
        "city": "Memphis",
        "citySlug": "memphis",
        "prov": "Tennessee",
        "provSlug": "tn"
    },
    {
        "city": "Knoxville",
        "citySlug": "knoxville",
        "prov": "Tennessee",
        "provSlug": "tn"
    },
    {
        "city": "Chattanooga",
        "citySlug": "chattanooga",
        "prov": "Tennessee",
        "provSlug": "tn"
    },
    {
        "city": "Clarksville",
        "citySlug": "clarksville",
        "prov": "Tennessee",
        "provSlug": "tn"
    },
    {
        "city": "Indianapolis",
        "citySlug": "indianapolis",
        "prov": "Indiana",
        "provSlug": "in"
    },
    {
        "city": "Fort Wayne",
        "citySlug": "fort-wayne",
        "prov": "Indiana",
        "provSlug": "in"
    },
    {
        "city": "Evansville",
        "citySlug": "evansville",
        "prov": "Indiana",
        "provSlug": "in"
    },
    {
        "city": "South Bend",
        "citySlug": "south-bend",
        "prov": "Indiana",
        "provSlug": "in"
    },
    {
        "city": "Carmel",
        "citySlug": "carmel",
        "prov": "Indiana",
        "provSlug": "in"
    },
    {
        "city": "Washington",
        "citySlug": "washington-dc",
        "prov": "District of Columbia",
        "provSlug": "dc"
    },
    {
        "city": "Boston",
        "citySlug": "boston",
        "prov": "Massachusetts",
        "provSlug": "ma"
    },
    {
        "city": "Las Vegas",
        "citySlug": "las-vegas",
        "prov": "Nevada",
        "provSlug": "nv"
    },
    {
        "city": "Henderson",
        "citySlug": "henderson",
        "prov": "Nevada",
        "provSlug": "nv"
    },
    {
        "city": "Reno",
        "citySlug": "reno",
        "prov": "Nevada",
        "provSlug": "nv"
    },
    {
        "city": "North Las Vegas",
        "citySlug": "north-las-vegas",
        "prov": "Nevada",
        "provSlug": "nv"
    },
    {
        "city": "Portland",
        "citySlug": "portland",
        "prov": "Oregon",
        "provSlug": "or"
    },
    {
        "city": "Salem",
        "citySlug": "salem",
        "prov": "Oregon",
        "provSlug": "or"
    },
    {
        "city": "Eugene",
        "citySlug": "eugene",
        "prov": "Oregon",
        "provSlug": "or"
    },
    {
        "city": "Hillsboro",
        "citySlug": "hillsboro",
        "prov": "Oregon",
        "provSlug": "or"
    },
    {
        "city": "Beaverton",
        "citySlug": "beaverton",
        "prov": "Oregon",
        "provSlug": "or"
    },
    {
        "city": "Omaha",
        "citySlug": "omaha",
        "prov": "Nebraska",
        "provSlug": "ne"
    },
    {
        "city": "Lincoln",
        "citySlug": "lincoln",
        "prov": "Nebraska",
        "provSlug": "ne"
    },
    {
        "city": "Wichita",
        "citySlug": "wichita",
        "prov": "Kansas",
        "provSlug": "ks"
    },
    {
        "city": "New Orleans",
        "citySlug": "new-orleans",
        "prov": "Louisiana",
        "provSlug": "la"
    },
    {
        "city": "Baton Rouge",
        "citySlug": "baton-rouge",
        "prov": "Louisiana",
        "provSlug": "la"
    },
    {
        "city": "Honolulu",
        "citySlug": "honolulu",
        "prov": "Hawaii",
        "provSlug": "hi"
    },
    {
        "city": "Newark",
        "citySlug": "newark",
        "prov": "New Jersey",
        "provSlug": "nj"
    },
    {
        "city": "Jersey City",
        "citySlug": "jersey-city",
        "prov": "New Jersey",
        "provSlug": "nj"
    },
    {
        "city": "Saint Paul",
        "citySlug": "saint-paul",
        "prov": "Minnesota",
        "provSlug": "mn"
    },
    {
        "city": "Minneapolis",
        "citySlug": "minneapolis",
        "prov": "Minnesota",
        "provSlug": "mn"
    },
    {
        "city": "Duluth",
        "citySlug": "duluth",
        "prov": "Minnesota",
        "provSlug": "mn"
    },
    {
        "city": "Albuquerque",
        "citySlug": "albuquerque",
        "prov": "New Mexico",
        "provSlug": "nm"
    },
    {
        "city": "Anchorage",
        "citySlug": "anchorage",
        "prov": "Alaska",
        "provSlug": "ak"
    },
    {
        "city": "Louisville",
        "citySlug": "louisville",
        "prov": "Kentucky",
        "provSlug": "ky"
    },
    {
        "city": "Lexington",
        "citySlug": "lexington",
        "prov": "Kentucky",
        "provSlug": "ky"
    },
    {
        "city": "Baltimore",
        "citySlug": "baltimore",
        "prov": "Maryland",
        "provSlug": "md"
    },
    {
        "city": "Milwaukee",
        "citySlug": "milwaukee",
        "prov": "Wisconsin",
        "provSlug": "wi"
    },
    {
        "city": "Madison",
        "citySlug": "madison",
        "prov": "Wisconsin",
        "provSlug": "wi"
    },
    {
        "city": "Green Bay",
        "citySlug": "green-bay",
        "prov": "Wisconsin",
        "provSlug": "wi"
    },
    {
        "city": "Champaign-Urbana",
        "citySlug": "champaign-urbana",
        "prov": "Illinois",
        "provSlug": "il"
    },
    {
        "city": "Peoria",
        "citySlug": "peoria",
        "prov": "Illinois",
        "provSlug": "il"
    },
    {
        "city": "Allentown / Lehigh Valley",
        "citySlug": "allentown-lehigh-valley",
        "prov": "Pennsylvania",
        "provSlug": "pa"
    },
    {
        "city": "Raleigh-Durham",
        "citySlug": "raleigh-durham",
        "prov": "North Carolina",
        "provSlug": "nc"
    },
    {
        "city": "Asheville",
        "citySlug": "asheville",
        "prov": "North Carolina",
        "provSlug": "nc"
    },
    {
        "city": "Princeton",
        "citySlug": "princeton",
        "prov": "New Jersey",
        "provSlug": "nj"
    },
    {
        "city": "Arlington / Alexandria",
        "citySlug": "arlington-alexandria",
        "prov": "Virginia",
        "provSlug": "va"
    },
    {
        "city": "Richmond",
        "citySlug": "richmond",
        "prov": "Virginia",
        "provSlug": "va"
    },
    {
        "city": "Norfolk / Virginia Beach",
        "citySlug": "norfolk-virginia-beach",
        "prov": "Virginia",
        "provSlug": "va"
    },
    {
        "city": "Boston / Cambridge",
        "citySlug": "boston-cambridge",
        "prov": "Massachusetts",
        "provSlug": "ma"
    },
    {
        "city": "Worcester",
        "citySlug": "worcester",
        "prov": "Massachusetts",
        "provSlug": "ma"
    },
    {
        "city": "Lowell",
        "citySlug": "lowell",
        "prov": "Massachusetts",
        "provSlug": "ma"
    },
    {
        "city": "Chandler / Tempe",
        "citySlug": "chandler-tempe",
        "prov": "Arizona",
        "provSlug": "az"
    },
    {
        "city": "Boulder",
        "citySlug": "boulder",
        "prov": "Colorado",
        "provSlug": "co"
    },
    {
        "city": "Rochester",
        "citySlug": "rochester",
        "prov": "Minnesota",
        "provSlug": "mn"
    },
    {
        "city": "Rockville-Bethesda",
        "citySlug": "rockville-bethesda",
        "prov": "Maryland",
        "provSlug": "md"
    },
    {
        "city": "Columbia",
        "citySlug": "columbia",
        "prov": "Maryland",
        "provSlug": "md"
    },
    {
        "city": "Bloomington",
        "citySlug": "bloomington",
        "prov": "Indiana",
        "provSlug": "in"
    },
    {
        "city": "Lafayette / West Lafayette",
        "citySlug": "lafayette-west-lafayette",
        "prov": "Indiana",
        "provSlug": "in"
    },
    {
        "city": "Green Bay / Appleton",
        "citySlug": "green-bay-appleton",
        "prov": "Wisconsin",
        "provSlug": "wi"
    },
    {
        "city": "St. Louis",
        "citySlug": "st-louis",
        "prov": "Missouri",
        "provSlug": "mo"
    },
    {
        "city": "Kansas City",
        "citySlug": "kansas-city",
        "prov": "Missouri",
        "provSlug": "mo"
    },
    {
        "city": "Columbia",
        "citySlug": "columbia",
        "prov": "Missouri",
        "provSlug": "mo"
    },
    {
        "city": "Greenville",
        "citySlug": "greenville",
        "prov": "South Carolina",
        "provSlug": "sc"
    },
    {
        "city": "Charleston",
        "citySlug": "charleston",
        "prov": "South Carolina",
        "provSlug": "sc"
    },
    {
        "city": "Columbia",
        "citySlug": "columbia",
        "prov": "South Carolina",
        "provSlug": "sc"
    },
    {
        "city": "Huntsville",
        "citySlug": "huntsville",
        "prov": "Alabama",
        "provSlug": "al"
    },
    {
        "city": "Birmingham",
        "citySlug": "birmingham",
        "prov": "Alabama",
        "provSlug": "al"
    },
    {
        "city": "Mobile",
        "citySlug": "mobile",
        "prov": "Alabama",
        "provSlug": "al"
    },
    {
        "city": "Lafayette",
        "citySlug": "lafayette",
        "prov": "Louisiana",
        "provSlug": "la"
    },
    {
        "city": "Bowling Green",
        "citySlug": "bowling-green",
        "prov": "Kentucky",
        "provSlug": "ky"
    },
    {
        "city": "Hillsboro / Washington County",
        "citySlug": "hillsboro-washington-county",
        "prov": "Oregon",
        "provSlug": "or"
    },
    {
        "city": "Bend",
        "citySlug": "bend",
        "prov": "Oregon",
        "provSlug": "or"
    },
    {
        "city": "Oklahoma City",
        "citySlug": "oklahoma-city",
        "prov": "Oklahoma",
        "provSlug": "ok"
    },
    {
        "city": "Tulsa",
        "citySlug": "tulsa",
        "prov": "Oklahoma",
        "provSlug": "ok"
    },
    {
        "city": "Pryor Creek",
        "citySlug": "pryor-creek",
        "prov": "Oklahoma",
        "provSlug": "ok"
    },
    {
        "city": "Hartford",
        "citySlug": "hartford",
        "prov": "Connecticut",
        "provSlug": "ct"
    },
    {
        "city": "New Haven",
        "citySlug": "new-haven",
        "prov": "Connecticut",
        "provSlug": "ct"
    },
    {
        "city": "Groton / New London",
        "citySlug": "groton-new-london",
        "prov": "Connecticut",
        "provSlug": "ct"
    },
    {
        "city": "Des Moines",
        "citySlug": "des-moines",
        "prov": "Iowa",
        "provSlug": "ia"
    },
    {
        "city": "Ames",
        "citySlug": "ames",
        "prov": "Iowa",
        "provSlug": "ia"
    },
    {
        "city": "Cedar Rapids",
        "citySlug": "cedar-rapids",
        "prov": "Iowa",
        "provSlug": "ia"
    },
    {
        "city": "Jackson",
        "citySlug": "jackson",
        "prov": "Mississippi",
        "provSlug": "ms"
    },
    {
        "city": "Biloxi / Gulfport",
        "citySlug": "biloxi-gulfport",
        "prov": "Mississippi",
        "provSlug": "ms"
    },
    {
        "city": "Starkville / Columbus",
        "citySlug": "starkville-columbus",
        "prov": "Mississippi",
        "provSlug": "ms"
    },
    {
        "city": "Bentonville",
        "citySlug": "bentonville",
        "prov": "Arkansas",
        "provSlug": "ar"
    },
    {
        "city": "Little Rock",
        "citySlug": "little-rock",
        "prov": "Arkansas",
        "provSlug": "ar"
    },
    {
        "city": "Osceola / Jonesboro",
        "citySlug": "osceola-jonesboro",
        "prov": "Arkansas",
        "provSlug": "ar"
    },
    {
        "city": "Kansas City (KS)",
        "citySlug": "kansas-city-ks",
        "prov": "Kansas",
        "provSlug": "ks"
    },
    {
        "city": "Manhattan / Junction City",
        "citySlug": "manhattan-junction-city",
        "prov": "Kansas",
        "provSlug": "ks"
    },
    {
        "city": "Salt Lake City",
        "citySlug": "salt-lake-city",
        "prov": "Utah",
        "provSlug": "ut"
    },
    {
        "city": "Lehi",
        "citySlug": "lehi",
        "prov": "Utah",
        "provSlug": "ut"
    },
    {
        "city": "St. George",
        "citySlug": "st-george",
        "prov": "Utah",
        "provSlug": "ut"
    },
    {
        "city": "Santa Fe",
        "citySlug": "santa-fe",
        "prov": "New Mexico",
        "provSlug": "nm"
    },
    {
        "city": "Las Cruces",
        "citySlug": "las-cruces",
        "prov": "New Mexico",
        "provSlug": "nm"
    },
    {
        "city": "Morgantown",
        "citySlug": "morgantown",
        "prov": "West Virginia",
        "provSlug": "wv"
    },
    {
        "city": "Charleston",
        "citySlug": "charleston",
        "prov": "West Virginia",
        "provSlug": "wv"
    },
    {
        "city": "Martinsburg",
        "citySlug": "martinsburg",
        "prov": "West Virginia",
        "provSlug": "wv"
    },
    {
        "city": "Grand Island",
        "citySlug": "grand-island",
        "prov": "Nebraska",
        "provSlug": "ne"
    },
    {
        "city": "Boise",
        "citySlug": "boise",
        "prov": "Idaho",
        "provSlug": "id"
    },
    {
        "city": "Twin Falls",
        "citySlug": "twin-falls",
        "prov": "Idaho",
        "provSlug": "id"
    },
    {
        "city": "Coeur d'Alene",
        "citySlug": "coeur-dalene",
        "prov": "Idaho",
        "provSlug": "id"
    },
    {
        "city": "Kailua-Kona",
        "citySlug": "kailua-kona",
        "prov": "Hawaii",
        "provSlug": "hi"
    },
    {
        "city": "Kahului",
        "citySlug": "kahului",
        "prov": "Hawaii",
        "provSlug": "hi"
    },
    {
        "city": "Portland",
        "citySlug": "portland",
        "prov": "Maine",
        "provSlug": "me"
    },
    {
        "city": "Bangor",
        "citySlug": "bangor",
        "prov": "Maine",
        "provSlug": "me"
    },
    {
        "city": "Lewiston/Auburn",
        "citySlug": "lewistonauburn",
        "prov": "Maine",
        "provSlug": "me"
    },
    {
        "city": "Manchester",
        "citySlug": "manchester",
        "prov": "New Hampshire",
        "provSlug": "nh"
    },
    {
        "city": "Nashua",
        "citySlug": "nashua",
        "prov": "New Hampshire",
        "provSlug": "nh"
    },
    {
        "city": "Portsmouth",
        "citySlug": "portsmouth",
        "prov": "New Hampshire",
        "provSlug": "nh"
    },
    {
        "city": "Providence",
        "citySlug": "providence",
        "prov": "Rhode Island",
        "provSlug": "ri"
    },
    {
        "city": "Newport",
        "citySlug": "newport",
        "prov": "Rhode Island",
        "provSlug": "ri"
    },
    {
        "city": "Pawtucket",
        "citySlug": "pawtucket",
        "prov": "Rhode Island",
        "provSlug": "ri"
    },
    {
        "city": "Bozeman",
        "citySlug": "bozeman",
        "prov": "Montana",
        "provSlug": "mt"
    },
    {
        "city": "Missoula",
        "citySlug": "missoula",
        "prov": "Montana",
        "provSlug": "mt"
    },
    {
        "city": "Billings",
        "citySlug": "billings",
        "prov": "Montana",
        "provSlug": "mt"
    },
    {
        "city": "Wilmington",
        "citySlug": "wilmington",
        "prov": "Delaware",
        "provSlug": "de"
    },
    {
        "city": "Newark",
        "citySlug": "newark",
        "prov": "Delaware",
        "provSlug": "de"
    },
    {
        "city": "Dover",
        "citySlug": "dover",
        "prov": "Delaware",
        "provSlug": "de"
    },
    {
        "city": "Fargo",
        "citySlug": "fargo",
        "prov": "North Dakota",
        "provSlug": "nd"
    },
    {
        "city": "Bismarck",
        "citySlug": "bismarck",
        "prov": "North Dakota",
        "provSlug": "nd"
    },
    {
        "city": "Grand Forks",
        "citySlug": "grand-forks",
        "prov": "North Dakota",
        "provSlug": "nd"
    },
    {
        "city": "Fairbanks",
        "citySlug": "fairbanks",
        "prov": "Alaska",
        "provSlug": "ak"
    },
    {
        "city": "Juneau",
        "citySlug": "juneau",
        "prov": "Alaska",
        "provSlug": "ak"
    },
    {
        "city": "Burlington",
        "citySlug": "burlington",
        "prov": "Vermont",
        "provSlug": "vt"
    },
    {
        "city": "Montpelier/Barre",
        "citySlug": "montpelierbarre",
        "prov": "Vermont",
        "provSlug": "vt"
    },
    {
        "city": "Brattleboro",
        "citySlug": "brattleboro",
        "prov": "Vermont",
        "provSlug": "vt"
    },
    {
        "city": "Cheyenne",
        "citySlug": "cheyenne",
        "prov": "Wyoming",
        "provSlug": "wy"
    },
    {
        "city": "Jackson",
        "citySlug": "jackson",
        "prov": "Wyoming",
        "provSlug": "wy"
    },
    {
        "city": "Laramie",
        "citySlug": "laramie",
        "prov": "Wyoming",
        "provSlug": "wy"
    }
];


// Target High-Value Industries (Expanded from 6 to 15)
export const INDUSTRIES = [
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

// High Value Target Cities - Tier A (Must Index)
const TIER_A_CITIES = ['Toronto', 'Vancouver', 'Calgary', 'Montreal', 'Ottawa', 'Edmonton', 'Mississauga', 'Los Angeles', 'San Francisco', 'Houston', 'Dallas', 'Austin', 'Miami', 'New York City', 'Chicago'];

// Medium Value Target Cities - Tier B (Index Later)
const TIER_B_CITIES = ['Winnipeg', 'Quebec City', 'Hamilton', 'Halifax', 'Victoria', 'Saskatoon', 'Regina', 'Brampton', 'Surrey', 'Burnaby', 'Richmond', 'Laval', 'San Diego', 'San Jose', 'San Antonio', 'Fort Worth', 'Tampa', 'Orlando', 'Buffalo', 'Rochester', 'Philadelphia', 'Phoenix', 'Boston', 'Seattle', 'Denver', 'Atlanta', 'Detroit'];

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
        
        let cityTier: 'A' | 'B' | 'C' = 'C';
        if (TIER_A_CITIES.includes(city.city)) {
            cityTier = 'A';
        } else if (TIER_B_CITIES.includes(city.city)) {
            cityTier = 'B';
        }

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
                isPublished: true, // Campaign fully launched - enable all indexing
                tier: cityTier
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

export type PseoProvinceSummary = {
    provinceSlug: string;
    provinceName: string;
    pageCount: number;
    cityCount: number;
    industryCount: number;
};

export type PseoCitySummary = {
    provinceSlug: string;
    provinceName: string;
    citySlug: string;
    cityName: string;
    pageCount: number;
    industryCount: number;
    tier: 'A' | 'B' | 'C';
};

function uniquePseoPages(pages: PseoPage[]): PseoPage[] {
    const seen = new Set<string>();

    return pages.filter((page) => {
        const key = `${page.provinceSlug}/${page.citySlug}/${page.industrySlug}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

export function getPublishedPseoPages(): PseoPage[] {
    return uniquePseoPages(getAllPseoPages().filter((page) => page.isPublished));
}

export function getPseoProvincePages(provinceSlug: string): PseoPage[] {
    return getPublishedPseoPages().filter((page) => page.provinceSlug === provinceSlug);
}

export function getPseoCityPages(provinceSlug: string, citySlug: string): PseoPage[] {
    return getPublishedPseoPages().filter(
        (page) => page.provinceSlug === provinceSlug && page.citySlug === citySlug
    );
}

export function getPseoProvinceSummaries(): PseoProvinceSummary[] {
    const provinceMap = new Map<string, {
        provinceName: string;
        cities: Set<string>;
        industries: Set<string>;
        pages: number;
    }>();

    for (const page of getPublishedPseoPages()) {
        const current = provinceMap.get(page.provinceSlug) || {
            provinceName: page.provinceName,
            cities: new Set<string>(),
            industries: new Set<string>(),
            pages: 0,
        };

        current.cities.add(page.citySlug);
        current.industries.add(page.industrySlug);
        current.pages += 1;
        provinceMap.set(page.provinceSlug, current);
    }

    return Array.from(provinceMap.entries())
        .map(([provinceSlug, province]) => ({
            provinceSlug,
            provinceName: province.provinceName,
            pageCount: province.pages,
            cityCount: province.cities.size,
            industryCount: province.industries.size,
        }))
        .sort((a, b) => a.provinceName.localeCompare(b.provinceName));
}

export function getPseoProvinceSummary(provinceSlug: string): PseoProvinceSummary | null {
    return getPseoProvinceSummaries().find((province) => province.provinceSlug === provinceSlug) || null;
}

export function getPseoCitySummaries(provinceSlug: string): PseoCitySummary[] {
    const cityMap = new Map<string, {
        provinceName: string;
        cityName: string;
        industries: Set<string>;
        pages: number;
        tier: 'A' | 'B' | 'C';
    }>();

    for (const page of getPseoProvincePages(provinceSlug)) {
        const current = cityMap.get(page.citySlug) || {
            provinceName: page.provinceName,
            cityName: page.cityName,
            industries: new Set<string>(),
            pages: 0,
            tier: page.tier,
        };

        current.industries.add(page.industrySlug);
        current.pages += 1;
        cityMap.set(page.citySlug, current);
    }

    const tierWeight = { A: 1, B: 2, C: 3 };

    return Array.from(cityMap.entries())
        .map(([citySlug, city]) => ({
            provinceSlug,
            provinceName: city.provinceName,
            citySlug,
            cityName: city.cityName,
            pageCount: city.pages,
            industryCount: city.industries.size,
            tier: city.tier,
        }))
        .sort((a, b) => {
            if (tierWeight[a.tier] !== tierWeight[b.tier]) {
                return tierWeight[a.tier] - tierWeight[b.tier];
            }

            return a.cityName.localeCompare(b.cityName);
        });
}

export function getPseoCitySummary(provinceSlug: string, citySlug: string): PseoCitySummary | null {
    return getPseoCitySummaries(provinceSlug).find((city) => city.citySlug === citySlug) || null;
}
