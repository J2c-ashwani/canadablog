import fs from 'fs';
import path from 'path';

const PSEO_DATA_PATH = path.resolve('lib/pseo-data.ts');

const NEW_CITIES = [
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
  { city: "Thunder Bay", citySlug: "thunder-bay", prov: "Ontario", provSlug: "on" },
  { city: "Sarnia", citySlug: "sarnia", prov: "Ontario", provSlug: "on" },
  { city: "Belleville", citySlug: "belleville", prov: "Ontario", provSlug: "on" },
  { city: "Sault Ste. Marie", citySlug: "sault-ste-marie", prov: "Ontario", provSlug: "on" },
  { city: "Welland", citySlug: "welland", prov: "Ontario", provSlug: "on" },
  { city: "Cornwall", citySlug: "cornwall", prov: "Ontario", provSlug: "on" },
  { city: "North Bay", citySlug: "north-bay", prov: "Ontario", provSlug: "on" },
  { city: "Timmins", citySlug: "timmins", prov: "Ontario", provSlug: "on" },
  { city: "Woodstock", citySlug: "woodstock", prov: "Ontario", provSlug: "on" },
  { city: "St. Thomas", citySlug: "st-thomas", prov: "Ontario", provSlug: "on" },
  { city: "Stratford", citySlug: "stratford", prov: "Ontario", provSlug: "on" },
  { city: "Orillia", citySlug: "orillia", prov: "Ontario", provSlug: "on" },

  // British Columbia
  { city: "Vancouver", citySlug: "vancouver", prov: "British Columbia", provSlug: "bc" },
  { city: "Surrey", citySlug: "surrey", prov: "British Columbia", provSlug: "bc" },
  { city: "Burnaby", citySlug: "burnaby", prov: "British Columbia", provSlug: "bc" },
  { city: "Richmond", citySlug: "richmond-bc", prov: "British Columbia", provSlug: "bc" },
  { city: "Kelowna", citySlug: "kelowna", prov: "British Columbia", provSlug: "bc" },
  { city: "Abbotsford", citySlug: "abbotsford", prov: "British Columbia", provSlug: "bc" },
  { city: "Coquitlam", citySlug: "coquitlam", prov: "British Columbia", provSlug: "bc" },
  { city: "Victoria", citySlug: "victoria", prov: "British Columbia", provSlug: "bc" },
  { city: "Saanich", citySlug: "saanich", prov: "British Columbia", provSlug: "bc" },
  { city: "Nanaimo", citySlug: "nanaimo", prov: "British Columbia", provSlug: "bc" },
  { city: "Kamloops", citySlug: "kamloops", prov: "British Columbia", provSlug: "bc" },
  { city: "Prince George", citySlug: "prince-george", prov: "British Columbia", provSlug: "bc" },
  { city: "Chilliwack", citySlug: "chilliwack", prov: "British Columbia", provSlug: "bc" },
  { city: "New Westminster", citySlug: "new-westminster", prov: "British Columbia", provSlug: "bc" },
  { city: "Port Coquitlam", citySlug: "port-coquitlam", prov: "British Columbia", provSlug: "bc" },
  { city: "Delta", citySlug: "delta", prov: "British Columbia", provSlug: "bc" },

  // Alberta
  { city: "Calgary", citySlug: "calgary", prov: "Alberta", provSlug: "ab" },
  { city: "Edmonton", citySlug: "edmonton", prov: "Alberta", provSlug: "ab" },
  { city: "Red Deer", citySlug: "red-deer", prov: "Alberta", provSlug: "ab" },
  { city: "Lethbridge", citySlug: "lethbridge", prov: "Alberta", provSlug: "ab" },
  { city: "St. Albert", citySlug: "st-albert", prov: "Alberta", provSlug: "ab" },
  { city: "Medicine Hat", citySlug: "medicine-hat", prov: "Alberta", provSlug: "ab" },
  { city: "Grande Prairie", citySlug: "grande-prairie", prov: "Alberta", provSlug: "ab" },
  { city: "Fort McMurray", citySlug: "fort-mcmurray", prov: "Alberta", provSlug: "ab" },
  { city: "Airdrie", citySlug: "airdrie", prov: "Alberta", provSlug: "ab" },
  { city: "Spruce Grove", citySlug: "spruce-grove", prov: "Alberta", provSlug: "ab" },
  { city: "Leduc", citySlug: "leduc", prov: "Alberta", provSlug: "ab" },

  // Quebec
  { city: "Montreal", citySlug: "montreal", prov: "Quebec", provSlug: "qc" },
  { city: "Quebec City", citySlug: "quebec-city", prov: "Quebec", provSlug: "qc" },
  { city: "Laval", citySlug: "laval", prov: "Quebec", provSlug: "qc" },
  { city: "Gatineau", citySlug: "gatineau", prov: "Quebec", provSlug: "qc" },
  { city: "Longueuil", citySlug: "longueuil", prov: "Quebec", provSlug: "qc" },
  { city: "Sherbrooke", citySlug: "sherbrooke", prov: "Quebec", provSlug: "qc" },
  { city: "Levis", citySlug: "levis", prov: "Quebec", provSlug: "qc" },
  { city: "Trois-Rivieres", citySlug: "trois-rivieres", prov: "Quebec", provSlug: "qc" },
  { city: "Saint-Jean-sur-Richelieu", citySlug: "saint-jean-sur-richelieu", prov: "Quebec", provSlug: "qc" },
  { city: "Drummondville", citySlug: "drummondville", prov: "Quebec", provSlug: "qc" },
  { city: "Granby", citySlug: "granby", prov: "Quebec", provSlug: "qc" },
  { city: "Saint-Hyacinthe", citySlug: "saint-hyacinthe", prov: "Quebec", provSlug: "qc" },
  { city: "Shawinigan", citySlug: "shawinigan", prov: "Quebec", provSlug: "qc" },

  // Manitoba & Sask
  { city: "Winnipeg", citySlug: "winnipeg", prov: "Manitoba", provSlug: "mb" },
  { city: "Brandon", citySlug: "brandon-mb", prov: "Manitoba", provSlug: "mb" },
  { city: "Steinbach", citySlug: "steinbach", prov: "Manitoba", provSlug: "mb" },
  { city: "Saskatoon", citySlug: "saskatoon", prov: "Saskatchewan", provSlug: "sk" },
  { city: "Regina", citySlug: "regina", prov: "Saskatchewan", provSlug: "sk" },
  { city: "Prince Albert", citySlug: "prince-albert", prov: "Saskatchewan", provSlug: "sk" },
  { city: "Moose Jaw", citySlug: "moose-jaw", prov: "Saskatchewan", provSlug: "sk" },

  // Atlantic & Maritimes
  { city: "Halifax", citySlug: "halifax", prov: "Nova Scotia", provSlug: "ns" },
  { city: "Sydney", citySlug: "sydney", prov: "Nova Scotia", provSlug: "ns" },
  { city: "Truro", citySlug: "truro", prov: "Nova Scotia", provSlug: "ns" },
  { city: "St. John's", citySlug: "st-johns", prov: "Newfoundland", provSlug: "nl" },
  { city: "Mount Pearl", citySlug: "mount-pearl", prov: "Newfoundland", provSlug: "nl" },
  { city: "Corner Brook", citySlug: "corner-brook", prov: "Newfoundland", provSlug: "nl" },
  { city: "Moncton", citySlug: "moncton", prov: "New Brunswick", provSlug: "nb" },
  { city: "Saint John", citySlug: "saint-john", prov: "New Brunswick", provSlug: "nb" },
  { city: "Fredericton", citySlug: "fredericton", prov: "New Brunswick", provSlug: "nb" },
  { city: "Charlottetown", citySlug: "charlottetown", prov: "Prince Edward Island", provSlug: "pe" },
  { city: "Summerside", citySlug: "summerside", prov: "Prince Edward Island", provSlug: "pe" },

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
  { city: "Santa Ana", citySlug: "santa-ana", prov: "California", provSlug: "ca" },
  { city: "Riverside", citySlug: "riverside", prov: "California", provSlug: "ca" },
  { city: "Stockton", citySlug: "stockton", prov: "California", provSlug: "ca" },
  { city: "Chula Vista", citySlug: "chula-vista", prov: "California", provSlug: "ca" },
  { city: "Irvine", citySlug: "irvine", prov: "California", provSlug: "ca" },
  { city: "Fremont", citySlug: "fremont", prov: "California", provSlug: "ca" },
  { city: "San Bernardino", citySlug: "san-bernardino", prov: "California", provSlug: "ca" },
  { city: "Modesto", citySlug: "modesto", prov: "California", provSlug: "ca" },
  { city: "Fontana", citySlug: "fontana", prov: "California", provSlug: "ca" },
  { city: "Oxnard", citySlug: "oxnard", prov: "California", provSlug: "ca" },
  { city: "Huntington Beach", citySlug: "huntington-beach", prov: "California", provSlug: "ca" },
  { city: "Glendale", citySlug: "glendale-ca", prov: "California", provSlug: "ca" },
  { city: "Santa Clarita", citySlug: "santa-clarita", prov: "California", provSlug: "ca" },
  { city: "Garden Grove", citySlug: "garden-grove", prov: "California", provSlug: "ca" },
  { city: "Santa Rosa", citySlug: "santa-rosa", prov: "California", provSlug: "ca" },
  { city: "Oceanside", citySlug: "oceanside", prov: "California", provSlug: "ca" },
  { city: "Rancho Cucamonga", citySlug: "rancho-cucamonga", prov: "California", provSlug: "ca" },
  { city: "Ontario", citySlug: "ontario-ca", prov: "California", provSlug: "ca" },
  { city: "Lancaster", citySlug: "lancaster", prov: "California", provSlug: "ca" },
  { city: "Palmdale", citySlug: "palmdale", prov: "California", provSlug: "ca" },
  { city: "Salinas", citySlug: "salinas", prov: "California", provSlug: "ca" },
  { city: "Pomona", citySlug: "pomona", prov: "California", provSlug: "ca" },
  { city: "Sunnyvale", citySlug: "sunnyvale", prov: "California", provSlug: "ca" },
  { city: "Escondido", citySlug: "escondido", prov: "California", provSlug: "ca" },
  { city: "Torrance", citySlug: "torrance", prov: "California", provSlug: "ca" },
  { city: "Pasadena", citySlug: "pasadena-ca", prov: "California", provSlug: "ca" },
  { city: "Orange", citySlug: "orange", prov: "California", provSlug: "ca" },
  { city: "Fullerton", citySlug: "fullerton", prov: "California", provSlug: "ca" },
  { city: "Thousand Oaks", citySlug: "thousand-oaks", prov: "California", provSlug: "ca" },
  { city: "Visalia", citySlug: "visalia", prov: "California", provSlug: "ca" },
  { city: "Simi Valley", citySlug: "simi-valley", prov: "California", provSlug: "ca" },
  { city: "Concord", citySlug: "concord", prov: "California", provSlug: "ca" },
  { city: "Roseville", citySlug: "roseville", prov: "California", provSlug: "ca" },
  { city: "Santa Clara", citySlug: "santa-clara", prov: "California", provSlug: "ca" },
  { city: "Vallejo", citySlug: "vallejo", prov: "California", provSlug: "ca" },
  { city: "Berkeley", citySlug: "berkeley", prov: "California", provSlug: "ca" },
  { city: "Victorville", citySlug: "victorville", prov: "California", provSlug: "ca" },
  { city: "El Monte", citySlug: "el-monte", prov: "California", provSlug: "ca" },
  { city: "Downey", citySlug: "downey", prov: "California", provSlug: "ca" },
  { city: "Costa Mesa", citySlug: "costa-mesa", prov: "California", provSlug: "ca" },
  { city: "Inglewood", citySlug: "inglewood", prov: "California", provSlug: "ca" },
  { city: "West Covina", citySlug: "west-covina", prov: "California", provSlug: "ca" },
  { city: "Norwalk", citySlug: "norwalk", prov: "California", provSlug: "ca" },
  { city: "Fairfield", citySlug: "fairfield", prov: "California", provSlug: "ca" },

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
  { city: "Laredo", citySlug: "laredo", prov: "Texas", provSlug: "tx" },
  { city: "Garland", citySlug: "garland", prov: "Texas", provSlug: "tx" },
  { city: "Frisco", citySlug: "frisco", prov: "Texas", provSlug: "tx" },
  { city: "McKinney", citySlug: "mckinney", prov: "Texas", provSlug: "tx" },
  { city: "Amarillo", citySlug: "amarillo", prov: "Texas", provSlug: "tx" },
  { city: "Grand Prairie", citySlug: "grand-prairie", prov: "Texas", provSlug: "tx" },
  { city: "Brownsville", citySlug: "brownsville", prov: "Texas", provSlug: "tx" },
  { city: "Pasadena", citySlug: "pasadena-tx", prov: "Texas", provSlug: "tx" },
  { city: "Mesquite", citySlug: "mesquite", prov: "Texas", provSlug: "tx" },
  { city: "McAllen", citySlug: "mcallen", prov: "Texas", provSlug: "tx" },
  { city: "Carrollton", citySlug: "carrollton", prov: "Texas", provSlug: "tx" },
  { city: "Waco", citySlug: "waco", prov: "Texas", provSlug: "tx" },
  { city: "Denton", citySlug: "denton", prov: "Texas", provSlug: "tx" },
  { city: "Abilene", citySlug: "abilene", prov: "Texas", provSlug: "tx" },
  { city: "Beaumont", citySlug: "beaumont", prov: "Texas", provSlug: "tx" },
  { city: "Round Rock", citySlug: "round-rock", prov: "Texas", provSlug: "tx" },
  { city: "The Woodlands", citySlug: "the-woodlands", prov: "Texas", provSlug: "tx" },
  { city: "Richardson", citySlug: "richardson", prov: "Texas", provSlug: "tx" },
  { city: "Pearland", citySlug: "pearland", prov: "Texas", provSlug: "tx" },
  { city: "College Station", citySlug: "college-station", prov: "Texas", provSlug: "tx" },
  { city: "Tyler", citySlug: "tyler", prov: "Texas", provSlug: "tx" },
  { city: "Lewisville", citySlug: "lewisville", prov: "Texas", provSlug: "tx" },

  // Florida
  { city: "Jacksonville", citySlug: "jacksonville", prov: "Florida", provSlug: "fl" },
  { city: "Miami", citySlug: "miami", prov: "Florida", provSlug: "fl" },
  { city: "Tampa", citySlug: "tampa", prov: "Florida", provSlug: "fl" },
  { city: "Orlando", citySlug: "orlando", prov: "Florida", provSlug: "fl" },
  { city: "St. Petersburg", citySlug: "st-petersburg", prov: "Florida", provSlug: "fl" },
  { city: "Hialeah", citySlug: "hialeah", prov: "Florida", provSlug: "fl" },
  { city: "Tallahassee", citySlug: "tallahassee", prov: "Florida", provSlug: "fl" },
  { city: "Port St. Lucie", citySlug: "port-st-lucie", prov: "Florida", provSlug: "fl" },
  { city: "Cape Coral", citySlug: "cape-coral", prov: "Florida", provSlug: "fl" },
  { city: "Fort Lauderdale", citySlug: "fort-lauderdale", prov: "Florida", provSlug: "fl" },
  { city: "Pembroke Pines", citySlug: "pembroke-pines", prov: "Florida", provSlug: "fl" },
  { city: "Hollywood", citySlug: "hollywood", prov: "Florida", provSlug: "fl" },
  { city: "Miramar", citySlug: "miramar", prov: "Florida", provSlug: "fl" },
  { city: "Gainesville", citySlug: "gainesville", prov: "Florida", provSlug: "fl" },
  { city: "Coral Springs", citySlug: "coral-springs", prov: "Florida", provSlug: "fl" },
  { city: "Clearwater", citySlug: "clearwater", prov: "Florida", provSlug: "fl" },
  { city: "Brandon", citySlug: "brandon-fl", prov: "Florida", provSlug: "fl" },
  { city: "Lehigh Acres", citySlug: "lehigh-acres", prov: "Florida", provSlug: "fl" },
  { city: "Spring Hill", citySlug: "spring-hill", prov: "Florida", provSlug: "fl" },
  { city: "Pompano Beach", citySlug: "pompano-beach", prov: "Florida", provSlug: "fl" },
  { city: "West Palm Beach", citySlug: "west-palm-beach", prov: "Florida", provSlug: "fl" },

  // New York
  { city: "New York City", citySlug: "new-york-city", prov: "New York", provSlug: "ny" },
  { city: "Buffalo", citySlug: "buffalo", prov: "New York", provSlug: "ny" },
  { city: "Rochester", citySlug: "rochester", prov: "New York", provSlug: "ny" },
  { city: "Yonkers", citySlug: "yonkers", prov: "New York", provSlug: "ny" },
  { city: "Syracuse", citySlug: "syracuse", prov: "New York", provSlug: "ny" },
  { city: "Albany", citySlug: "albany", prov: "New York", provSlug: "ny" },
  { city: "New Rochelle", citySlug: "new-rochelle", prov: "New York", provSlug: "ny" },
  { city: "Mount Vernon", citySlug: "mount-vernon", prov: "New York", provSlug: "ny" },
  { city: "Schenectady", citySlug: "schenectady", prov: "New York", provSlug: "ny" },
  { city: "Utica", citySlug: "utica", prov: "New York", provSlug: "ny" },
  { city: "White Plains", citySlug: "white-plains", prov: "New York", provSlug: "ny" },

  // Illinois
  { city: "Chicago", citySlug: "chicago", prov: "Illinois", provSlug: "il" },
  { city: "Aurora", citySlug: "aurora-il", prov: "Illinois", provSlug: "il" },
  { city: "Rockford", citySlug: "rockford", prov: "Illinois", provSlug: "il" },
  { city: "Joliet", citySlug: "joliet", prov: "Illinois", provSlug: "il" },
  { city: "Naperville", citySlug: "naperville", prov: "Illinois", provSlug: "il" },
  { city: "Springfield", citySlug: "springfield-il", prov: "Illinois", provSlug: "il" },
  { city: "Peoria", citySlug: "peoria-il", prov: "Illinois", provSlug: "il" },
  { city: "Elgin", citySlug: "elgin", prov: "Illinois", provSlug: "il" },

  // Arizona
  { city: "Phoenix", citySlug: "phoenix", prov: "Arizona", provSlug: "az" },
  { city: "Tucson", citySlug: "tucson", prov: "Arizona", provSlug: "az" },
  { city: "Mesa", citySlug: "mesa", prov: "Arizona", provSlug: "az" },
  { city: "Chandler", citySlug: "chandler", prov: "Arizona", provSlug: "az" },
  { city: "Gilbert", citySlug: "gilbert", prov: "Arizona", provSlug: "az" },
  { city: "Glendale", citySlug: "glendale-az", prov: "Arizona", provSlug: "az" },
  { city: "Scottsdale", citySlug: "scottsdale", prov: "Arizona", provSlug: "az" },
  { city: "Tempe", citySlug: "tempe", prov: "Arizona", provSlug: "az" },
  { city: "Peoria", citySlug: "peoria-az", prov: "Arizona", provSlug: "az" },
  { city: "Surprise", citySlug: "surprise", prov: "Arizona", provSlug: "az" },

  // Washington
  { city: "Seattle", citySlug: "seattle", prov: "Washington", provSlug: "wa" },
  { city: "Spokane", citySlug: "spokane", prov: "Washington", provSlug: "wa" },
  { city: "Tacoma", citySlug: "tacoma", prov: "Washington", provSlug: "wa" },
  { city: "Vancouver", citySlug: "vancouver-wa", prov: "Washington", provSlug: "wa" },
  { city: "Bellevue", citySlug: "bellevue", prov: "Washington", provSlug: "wa" },
  { city: "Kent", citySlug: "kent", prov: "Washington", provSlug: "wa" },
  { city: "Everett", citySlug: "everett", prov: "Washington", provSlug: "wa" },
  { city: "Renton", citySlug: "renton", prov: "Washington", provSlug: "wa" },
  { city: "Federal Way", citySlug: "federal-way", prov: "Washington", provSlug: "wa" },
  { city: "Yakima", citySlug: "yakima", prov: "Washington", provSlug: "wa" },

  // Colorado
  { city: "Denver", citySlug: "denver", prov: "Colorado", provSlug: "co" },
  { city: "Colorado Springs", citySlug: "colorado-springs", prov: "Colorado", provSlug: "co" },
  { city: "Aurora", citySlug: "aurora-co", prov: "Colorado", provSlug: "co" },
  { city: "Fort Collins", citySlug: "fort-collins", prov: "Colorado", provSlug: "co" },
  { city: "Lakewood", citySlug: "lakewood", prov: "Colorado", provSlug: "co" },
  { city: "Thornton", citySlug: "thornton", prov: "Colorado", provSlug: "co" },
  { city: "Arvada", citySlug: "arvada", prov: "Colorado", provSlug: "co" },
  { city: "Westminster", citySlug: "westminster", prov: "Colorado", provSlug: "co" },
  { city: "Pueblo", citySlug: "pueblo", prov: "Colorado", provSlug: "co" },

  // North Carolina
  { city: "Charlotte", citySlug: "charlotte", prov: "North Carolina", provSlug: "nc" },
  { city: "Raleigh", citySlug: "raleigh", prov: "North Carolina", provSlug: "nc" },
  { city: "Greensboro", citySlug: "greensboro", prov: "North Carolina", provSlug: "nc" },
  { city: "Durham", citySlug: "durham", prov: "North Carolina", provSlug: "nc" },
  { city: "Winston-Salem", citySlug: "winston-salem", prov: "North Carolina", provSlug: "nc" },
  { city: "Fayetteville", citySlug: "fayetteville", prov: "North Carolina", provSlug: "nc" },
  { city: "Cary", citySlug: "cary", prov: "North Carolina", provSlug: "nc" },
  { city: "Wilmington", citySlug: "wilmington", prov: "North Carolina", provSlug: "nc" },
  { city: "High Point", citySlug: "high-point", prov: "North Carolina", provSlug: "nc" },

  // Georgia
  { city: "Atlanta", citySlug: "atlanta", prov: "Georgia", provSlug: "ga" },
  { city: "Augusta", citySlug: "augusta", prov: "Georgia", provSlug: "ga" },
  { city: "Columbus", citySlug: "columbus-ga", prov: "Georgia", provSlug: "ga" },
  { city: "Savannah", citySlug: "savannah", prov: "Georgia", provSlug: "ga" },
  { city: "Athens", citySlug: "athens", prov: "Georgia", provSlug: "ga" },
  { city: "Sandy Springs", citySlug: "sandy-springs", prov: "Georgia", provSlug: "ga" },

  // Ohio
  { city: "Columbus", citySlug: "columbus", prov: "Ohio", provSlug: "oh" },
  { city: "Cleveland", citySlug: "cleveland", prov: "Ohio", provSlug: "oh" },
  { city: "Cincinnati", citySlug: "cincinnati", prov: "Ohio", provSlug: "oh" },
  { city: "Toledo", citySlug: "toledo", prov: "Ohio", provSlug: "oh" },
  { city: "Akron", citySlug: "akron", prov: "Ohio", provSlug: "oh" },
  { city: "Dayton", citySlug: "dayton", prov: "Ohio", provSlug: "oh" },
  { city: "Parma", citySlug: "parma", prov: "Ohio", provSlug: "oh" },
  { city: "Canton", citySlug: "canton", prov: "Ohio", provSlug: "oh" },

  // Michigan
  { city: "Detroit", citySlug: "detroit", prov: "Michigan", provSlug: "mi" },
  { city: "Grand Rapids", citySlug: "grand-rapids", prov: "Michigan", provSlug: "mi" },
  { city: "Warren", citySlug: "warren", prov: "Michigan", provSlug: "mi" },
  { city: "Sterling Heights", citySlug: "sterling-heights", prov: "Michigan", provSlug: "mi" },
  { city: "Ann Arbor", citySlug: "ann-arbor", prov: "Michigan", provSlug: "mi" },
  { city: "Lansing", citySlug: "lansing", prov: "Michigan", provSlug: "mi" },
  { city: "Flint", citySlug: "flint", prov: "Michigan", provSlug: "mi" },

  // Pennsylvania
  { city: "Philadelphia", citySlug: "philadelphia", prov: "Pennsylvania", provSlug: "pa" },
  { city: "Pittsburgh", citySlug: "pittsburgh", prov: "Pennsylvania", provSlug: "pa" },
  { city: "Allentown", citySlug: "allentown", prov: "Pennsylvania", provSlug: "pa" },
  { city: "Erie", citySlug: "erie", prov: "Pennsylvania", provSlug: "pa" },
  { city: "Reading", citySlug: "reading", prov: "Pennsylvania", provSlug: "pa" },

  // Tennessee
  { city: "Nashville", citySlug: "nashville", prov: "Tennessee", provSlug: "tn" },
  { city: "Memphis", citySlug: "memphis", prov: "Tennessee", provSlug: "tn" },
  { city: "Knoxville", citySlug: "knoxville", prov: "Tennessee", provSlug: "tn" },
  { city: "Chattanooga", citySlug: "chattanooga", prov: "Tennessee", provSlug: "tn" },
  { city: "Clarksville", citySlug: "clarksville", prov: "Tennessee", provSlug: "tn" },

  // Indiana
  { city: "Indianapolis", citySlug: "indianapolis", prov: "Indiana", provSlug: "in" },
  { city: "Fort Wayne", citySlug: "fort-wayne", prov: "Indiana", provSlug: "in" },
  { city: "Evansville", citySlug: "evansville", prov: "Indiana", provSlug: "in" },
  { city: "South Bend", citySlug: "south-bend", prov: "Indiana", provSlug: "in" },
  { city: "Carmel", citySlug: "carmel", prov: "Indiana", provSlug: "in" },

  // Other key hubs
  { city: "Washington", citySlug: "washington-dc", prov: "District of Columbia", provSlug: "dc" },
  { city: "Boston", citySlug: "boston", prov: "Massachusetts", provSlug: "ma" },
  { city: "Las Vegas", citySlug: "las-vegas", prov: "Nevada", provSlug: "nv" },
  { city: "Henderson", citySlug: "henderson", prov: "Nevada", provSlug: "nv" },
  { city: "Reno", citySlug: "reno", prov: "Nevada", provSlug: "nv" },
  { city: "North Las Vegas", citySlug: "north-las-vegas", prov: "Nevada", provSlug: "nv" },
  { city: "Portland", citySlug: "portland", prov: "Oregon", provSlug: "or" },
  { city: "Salem", citySlug: "salem", prov: "Oregon", provSlug: "or" },
  { city: "Eugene", citySlug: "eugene", prov: "Oregon", provSlug: "or" },
  { city: "Hillsboro", citySlug: "hillsboro", prov: "Oregon", provSlug: "or" },
  { city: "Beaverton", citySlug: "beaverton", prov: "Oregon", provSlug: "or" },
  { city: "Omaha", citySlug: "omaha", prov: "Nebraska", provSlug: "ne" },
  { city: "Lincoln", citySlug: "lincoln", prov: "Nebraska", provSlug: "ne" },
  { city: "Wichita", citySlug: "wichita", prov: "Kansas", provSlug: "ks" },
  { city: "New Orleans", citySlug: "new-orleans", prov: "Louisiana", provSlug: "la" },
  { city: "Baton Rouge", citySlug: "baton-rouge", prov: "Louisiana", provSlug: "la" },
  { city: "Honolulu", citySlug: "honolulu", prov: "Hawaii", provSlug: "hi" },
  { city: "Newark", citySlug: "newark", prov: "New Jersey", provSlug: "nj" },
  { city: "Jersey City", citySlug: "jersey-city", prov: "New Jersey", provSlug: "nj" },
  { city: "Saint Paul", citySlug: "saint-paul", prov: "Minnesota", provSlug: "mn" },
  { city: "Minneapolis", citySlug: "minneapolis", prov: "Minnesota", provSlug: "mn" },
  { city: "Duluth", citySlug: "duluth", prov: "Minnesota", provSlug: "mn" },
  { city: "Albuquerque", citySlug: "albuquerque", prov: "New Mexico", provSlug: "nm" },
  { city: "Anchorage", citySlug: "anchorage", prov: "Alaska", provSlug: "ak" },
  { city: "Louisville", citySlug: "louisville", prov: "Kentucky", provSlug: "ky" },
  { city: "Lexington", citySlug: "lexington", prov: "Kentucky", provSlug: "ky" },
  { city: "Baltimore", citySlug: "baltimore", prov: "Maryland", provSlug: "md" },
  { city: "Milwaukee", citySlug: "milwaukee", prov: "Wisconsin", provSlug: "wi" },
  { city: "Madison", citySlug: "madison", prov: "Wisconsin", provSlug: "wi" },
  { city: "Green Bay", citySlug: "green-bay", prov: "Wisconsin", provSlug: "wi" }
];

function run() {
  let content = fs.readFileSync(PSEO_DATA_PATH, 'utf8');

  // Verify unique city count in script
  const seenSlugs = new Set();
  const uniqueCitiesList = [];
  for (const c of NEW_CITIES) {
    const key = `${c.provSlug}/${c.citySlug}`;
    if (!seenSlugs.has(key)) {
      seenSlugs.add(key);
      uniqueCitiesList.push(c);
    }
  }

  console.log(`Unique cities generated in list: ${uniqueCitiesList.length}`);

  // Replace CITIES array in file content
  // Regex to match the CITIES block from export const CITIES = [ to ];
  const citiesStartTag = 'export const CITIES = [';
  const citiesEndTag = '];';
  const startIndex = content.indexOf(citiesStartTag);
  const endIndex = content.indexOf(citiesEndTag, startIndex);

  if (startIndex === -1 || endIndex === -1) {
    console.error('Could not locate CITIES array in lib/pseo-data.ts');
    return;
  }

  const citiesArrayString = JSON.stringify(uniqueCitiesList, null, 4);
  const newCitiesBlock = `export const CITIES = ${citiesArrayString};\n`;

  let updatedContent = content.slice(0, startIndex) + newCitiesBlock + content.slice(endIndex + citiesEndTag.length);

  // Now lift the restriction inside getAllPseoPages() loop:
  // We locate the restriction block and replace it with direct loop calculations.
  const restrictionTarget = `            // Apply evidence-based scaling rules (Phase 4):
            // 1. Keep original 6 high-value industries for all cities.
            // 2. Keep 'restaurants-hospitality' ONLY for Tier A cities + Calgary + Orlando.
            // 3. Exclude the rest of the new additions to preserve crawl budget and focus on proven opportunities.
            const isOriginal6 = ['technology', 'agriculture', 'manufacturing', 'healthcare', 'clean-energy', 'women-entrepreneurs'].includes(industry.slug);
            const isProvenWinner = industry.slug === 'restaurants-hospitality' && (cityTier === 'A' || city.citySlug === 'calgary' || city.citySlug === 'orlando');
            
            if (!isOriginal6 && !isProvenWinner) {
                continue; // Skip generating this unproven page combination
            }`;

  if (updatedContent.includes(restrictionTarget)) {
    updatedContent = updatedContent.replace(restrictionTarget, '');
    console.log('✅ Lifted industry restriction block successfully.');
  } else {
    console.log('⚠️ Could not locate industry restriction block.');
  }

  fs.writeFileSync(PSEO_DATA_PATH, updatedContent, 'utf8');
  console.log(`🎉 Complete. Saved updated lib/pseo-data.ts with ${uniqueCitiesList.length} cities.`);
}

run();
