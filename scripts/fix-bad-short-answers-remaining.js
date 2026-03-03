const fs = require('fs');
const path = require('path');

const newAnswers = {
  "ai-machine-learning-grants": "Complete 2026-2027 guide to AI and machine learning grants. Programs like Scale AI and provincial tech funds offer millions in non-dilutive capital to de-risk commercial AI development.",
  "alberta-government-business-grants": "Alberta offers a robust ecosystem of provincial funding. Programs through Alberta Innovates and the Alberta Enterprise Corporation provide strategic capital for tech, energy, and agriculture businesses.",
  "alberta-innovation-grants": "Access Alberta's dedicated innovation funding. Alberta Innovates provides direct commercialization grants up to $500,000 to help tech startups move from prototype to global market.",
  "alberta-small-business-grants": "Alberta small businesses can access targeted provincial grants. Funding is available for digital adoption, specialized training, and market expansion specifically designed for AB-based companies.",
  "amber-grant-for-women": "The Amber Grant awards $10,000 monthly and a $25,000 year-end prize to women entrepreneurs. It's one of the most accessible grants, requiring only a simple story-based application instead of a complex pitch deck.",
  "atlantic-canada-innovation-grants": "ACOA (Atlantic Canada Opportunities Agency) drives innovation in the East. They provide interest-free, non-dilutive loans and grants up to $500,000 for technology commercialization and productivity improvements.",
  "atlantic-canada-business-grants": "Atlantic Canadian businesses have access to specialized federal funding through ACOA. Programs support export expansion, hiring, and community economic development across the four eastern provinces.",
  "bc-small-business-grants": "BC offers targeted small business grants for local enterprises. Programs cover e-commerce scaling, employee training, and export readiness tailored specifically for British Columbia businesses.",
  "bdc-women-entrepreneurs-financing": "BDC offers flexible loans and specialized advisory services for women-led businesses. Beyond capital, they provide dedicated coaching to help women founders scale and optimize operations.",
  "biotech-life-sciences-grants": "Biotech startups can access massive federal funding pools like the NIH SBIR program. Phases I and II offer up to $2M+ in non-dilutive capital for high-risk, high-reward medical research.",
  "bmo-celebrating-women-grant": "BMO awards $10,000 grants alongside dedicated business advisory services. This program focuses on sustainability, community impact, and accelerating the growth of women-owned businesses.",
  "british-columbia-government-business-grants": "BC businesses can leverage provincial grants via Innovate BC and CleanBC. These programs prioritize sustainable economic growth, zero-emission technologies, and regional job creation.",
  "british-columbia-innovation-grants": "BC offers robust innovation support, highlighted by the 10% BC Innovation Tax Credit (BCITC). This stacks with federal SR&ED, allowing tech companies to dramatically reduce their R&D costs.",
  "california-tech-programs": "California startups can tap into state-specific tech hubs and the $50k CalSEED program. GO-Biz also offers the California Competes Tax Credit to incentivize job creation and major capital investments.",
  "canada-advanced-manufacturing-innovation-grants": "Advanced manufacturers can access $3.1B+ in scale-up capital. NGen and the Strategic Innovation Fund provide heavy subsidies for adopting Industry 4.0, robotics, and automation technologies.",
  "canada-aerospace-defence-innovation-grants": "The aerospace and defence sectors are supported by $450M+ in funding. Programs like the IDEaS challenge and CSA grants provide capital for R&D in dual-use technologies and space innovation.",
  "canada-agri-food-technology-innovation-grants": "Agri-food tech companies can leverage $2.3B+ in federal and provincial funding. Programs prioritize precision agriculture, automation, and sustainable food processing solutions.",
  "canada-manufacturing-industry-grants-guide": "Manufacturers can tap into $3.1B+ for facility upgrades and Industry 4.0 adoption. NGen and regional programs offer millions in non-repayable funding for automation and advanced manufacturing tech."
};

const filePath = path.join(__dirname, '..', 'lib/data/blogPosts.ts');
let content = fs.readFileSync(filePath, 'utf-8');

let updatedCount = 0;

for (const [slug, newAnswer] of Object.entries(newAnswers)) {
  const regex = new RegExp(`(slug:\\s*["']${slug}["'].*?shortAnswer:\\s*)(["'])(.*?)\\2`, 's');
  if (content.match(regex)) {
    content = content.replace(regex, `$1"${newAnswer}"`);
    updatedCount++;
    console.log(`✅ Updated short answer for: ${slug}`);
  } else {
    console.log(`❌ Could not find/match shortAnswer for: ${slug}`);
  }
}

fs.writeFileSync(filePath, content);
console.log(`\n🎉 Total updated: ${updatedCount}`);
