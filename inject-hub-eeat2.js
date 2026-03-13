const fs = require('fs');
const path = require('path');

// These pages use <div> for hero section, not <section>
// Inject EEAT right before the Stats Grid comment
const REMAINING_PAGES = [
    {
        path: 'app/usa/florida/page.tsx',
        shortAnswer: 'Florida businesses can access state incentives including the Florida High Tech Corridor ($250K matching grants), Incumbent Worker Training, Export Diversification grants, and the Qualified Target Industry Tax Refund. Combined with federal SBIR/STTR awards, Florida companies can access $100M+ annually.',
    },
    {
        path: 'app/usa/new-york/page.tsx',
        shortAnswer: 'New York businesses can access START-UP NY tax-free zones (10 years), NYSERDA clean energy grants up to $350K, Empire State Development programs, and the Pre-Seed Matching Fund ($50K–$250K). Federal SBIR programs add $1B+ annually for NY companies.',
    },
    {
        path: 'app/usa/texas/page.tsx',
        shortAnswer: 'Texas businesses benefit from the Texas Enterprise Fund, Texas Emerging Technology Fund, robust SBIR/STTR ecosystem, and no state income tax. Texas ranks #3 nationally for SBIR awards, making it one of the top states for non-dilutive startup funding.',
    },
    {
        path: 'app/canada/green-energy-grants/page.tsx',
        shortAnswer: 'Canadian clean energy businesses can access SDTC funding (up to $10M), NRCan Smart Renewables program ($50M+), Clean Investment Tax Credits (up to 30% refundable), and provincial green energy grants. Canada\'s $8B+ dedicated federal funding targets Net Zero by 2050.',
    },
    {
        path: 'app/canada/healthcare-startup-grants/page.tsx',
        shortAnswer: 'Canadian healthcare startups can access IRAP for medical device R&D, NSERC discovery grants, CIHR health research funding ($1.2B annually), provincial health innovation programs, and SR&ED tax credits covering 35–65% of eligible research expenses.',
    },
    {
        path: 'app/canada/agriculture-startup-funding/page.tsx',
        shortAnswer: 'Canadian agriculture businesses can access AgriInnovate ($10M per project), the Agricultural Clean Technology Program ($2M), AAFC programs, and provincial agri-food grants. The Canadian Agricultural Partnership provides $3B+ over 5 years for farm innovation and sustainability.',
    },
    {
        path: 'app/canada/indigenous-entrepreneur-grants/page.tsx',
        shortAnswer: 'Indigenous entrepreneurs in Canada can access NACCA\'s Aboriginal Entrepreneurship Program, the Indigenous Women Entrepreneurship Fund (IWEF), WELF loans up to $50K, and the historic $830M federal agreement. Indigenous Financial Institutions support First Nations, Métis, and Inuit business owners coast to coast.',
    },
];

const EEAT_IMPORTS = `import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"
`;

let injected = 0;
let errors = [];

for (const page of REMAINING_PAGES) {
    const filePath = path.join(__dirname, page.path);
    if (!fs.existsSync(filePath)) {
        console.log(`  ⚠️  No file: ${page.path}`);
        errors.push(page.path);
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('EEATBadge') || content.includes('ShortAnswerBox')) {
        console.log(`  ⏭️  Already has EEAT: ${page.path}`);
        continue;
    }

    // 1. Add imports after the last import line
    const lastImportIdx = content.lastIndexOf('\nimport ');
    const endOfLastImport = content.indexOf('\n', lastImportIdx + 1);
    content = content.substring(0, endOfLastImport + 1) + EEAT_IMPORTS + content.substring(endOfLastImport + 1);

    // 2. Build EEAT block - compact version to match div-based layout
    const safeAnswer = page.shortAnswer.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    const eeatBlock = `

                    {/* EEAT Components */}
                    <div className="mb-8 space-y-3 max-w-3xl mx-auto">
                      <ShortAnswerBox content="${safeAnswer}" />
                      <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-03-01" />
                      <EligibleCheck />
                    </div>
`;

    // 3. Insert right before {/* Stats Grid */}
    const statsGridComment = content.indexOf('{/* Stats Grid */}');
    if (statsGridComment === -1) {
        console.log(`  ❌ Could not find Stats Grid comment: ${page.path}`);
        errors.push(page.path);
        continue;
    }

    content = content.substring(0, statsGridComment) + eeatBlock.trimStart() + '\n                    ' + content.substring(statsGridComment);

    fs.writeFileSync(filePath, content, 'utf8');
    injected++;
    console.log(`  ✅ Injected EEAT: ${page.path}`);
}

console.log('\n=== SUMMARY ===');
console.log(`Injected: ${injected}`);
console.log(`Errors: ${errors.length}`);
if (errors.length > 0) console.log('Error paths:', errors.join('\n  '));
