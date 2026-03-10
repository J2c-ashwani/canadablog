const fs = require('fs');
const path = require('path');

// Hub pages to inject EEAT into, with custom short answers per page
const HUB_PAGES = [
    // ============ USA HUBS ============
    {
        path: 'app/usa/page.tsx',
        shortAnswer: 'Yes — U.S. businesses can access $50B+ in federal and state grants annually. Key programs include NSF SBIR ($305K–$2M), DOE SBIR, SBA initiatives, and 50 state-level funding pools. Non-dilutive, no equity required.',
        insertAfter: '{/* Hero Section */}',
    },
    {
        path: 'app/usa/federal-grants/page.tsx',
        shortAnswer: 'Federal grants for U.S. small businesses are available through NSF, SBA, DOE, NIH, and DOD. Phase I SBIR awards range from $150K–$305K, with Phase II up to $2M. No equity required — 100% non-dilutive funding.',
        insertAfter: '{/* Hero Section */}',
    },
    {
        path: 'app/usa/small-business-grants/page.tsx',
        shortAnswer: 'U.S. small businesses can access $50B+ annually through SBA programs, SBIR/STTR grants, and state-level funding. The SBA 7(a) loan guarantees up to $5M. SBIR Phase I provides up to $305K in non-dilutive funding.',
        insertAfter: '{/* Hero Section */}',
    },
    {
        path: 'app/usa/technology-startup-grants/page.tsx',
        shortAnswer: 'U.S. tech startups can access NSF SBIR ($305K Phase I, $2M Phase II), DOE clean energy grants, DOD SBIR, and state accelerator programs. Non-dilutive funding supports AI, biotech, hardware, SaaS, and deep tech innovations.',
        insertAfter: '{/* Hero Section */}',
    },
    {
        path: 'app/usa/women-entrepreneurs-grants/page.tsx',
        shortAnswer: 'Women entrepreneurs in the U.S. can access SBA WOSB federal contracting set-asides, Amber Grant ($10K monthly), NWBC programs, and state-level women business center grants. Combined value exceeds $500M annually nationwide.',
        insertAfter: '{/* Hero Section */}',
    },
    {
        path: 'app/usa/florida/page.tsx',
        shortAnswer: 'Florida businesses can access state incentives including the Qualified Target Industry Tax Refund, Innovation Incentive Program, and SBIR matching funds. Combined with federal programs, Florida businesses can access $100M+ annually.',
        insertAfter: '{/* Hero Section */}',
    },
    {
        path: 'app/usa/new-york/page.tsx',
        shortAnswer: 'New York businesses can access START-UP NY tax-free zones, NYSERDA clean energy grants up to $350K, Empire State Development programs, and the Pre-Seed Matching Fund ($50K–$250K). Federal SBIR programs add $1B+ annually for NY companies.',
        insertAfter: '{/* Hero Section */}',
    },
    {
        path: 'app/usa/texas/page.tsx',
        shortAnswer: 'Texas businesses benefit from the Texas Enterprise Fund, Texas Emerging Technology Fund, and robust SBIR/STTR ecosystem. Texas ranks #3 nationally for SBIR awards. No state income tax plus federal non-dilutive grants makes Texas a top startup destination.',
        insertAfter: '{/* Hero Section */}',
    },

    // ============ CANADA HUBS ============
    {
        path: 'app/canada/page.tsx',
        shortAnswer: 'Canada offers 300+ government grant programs with $10B+ available annually. Key programs include IRAP (up to $500K), SR&ED tax credits (up to 65% refundable), Strategic Innovation Fund ($100M+), and provincial grants across all 10 provinces.',
        insertAfter: '{/* Hero Section */}',
    },
    {
        path: 'app/canada/government-grants/page.tsx',
        shortAnswer: 'Canadian government grants span federal and provincial programs worth $12B+ annually. Top programs: Strategic Innovation Fund, IRAP ($500K for R&D), SR&ED tax credits (35% federal refundable), CanExport ($75K), and 7 Regional Development Agencies covering every province.',
        insertAfter: '{/* Hero Section */}',
    },
    {
        path: 'app/canada/small-business-grants/page.tsx',
        shortAnswer: 'Canadian small businesses can access IRAP (up to $500K), CSBFP loan guarantees ($1M), BDC financing, provincial grants, and SR&ED tax credits. Combined federal and provincial support exceeds $5B annually for SMEs with fewer than 500 employees.',
        insertAfter: '{/* Hero Section */}',
    },
    {
        path: 'app/canada/women-business-grants/page.tsx',
        shortAnswer: 'Canadian women entrepreneurs can access the Women Entrepreneurship Fund ($100K+), WELF loans ($50K), WES ecosystem grants, Amber Grant, and provincial programs worth $850M+ combined. The federal WES strategy committed $6B to double women-owned businesses.',
        insertAfter: '{/* Hero Section */}',
    },
    {
        path: 'app/canada/innovation-grants/page.tsx',
        shortAnswer: 'Canada\'s innovation grant programs include IRAP (up to $500K), SR&ED tax credits (65% refundable), Strategic Innovation Fund ($100M+), Scale AI, NSERC, and provincial R&D credits. Combined innovation funding exceeds $4.2B annually for Canadian businesses.',
        insertAfter: '{/* Hero Section */}',
    },
    {
        path: 'app/canada/green-energy-grants/page.tsx',
        shortAnswer: 'Canadian clean energy businesses can access SDTC funding (up to $10M), NRCan clean energy programs, Investment Tax Credits (up to 30% refundable), and provincial green energy grants. Canada\'s net-zero transition is backed by $120B+ in climate commitments.',
        insertAfter: '{/* Hero Section */}',
    },
    {
        path: 'app/canada/healthcare-startup-grants/page.tsx',
        shortAnswer: 'Canadian healthcare startups can access IRAP for medical device R&D, NSERC discovery grants, CIHR health research funding ($1.2B annually), provincial health innovation programs, and SR&ED tax credits covering 35–65% of eligible research expenses.',
        insertAfter: '{/* Hero Section */}',
    },
    {
        path: 'app/canada/agriculture-startup-funding/page.tsx',
        shortAnswer: 'Canadian agriculture businesses can access AgriInnovate ($10M per project), AAFC programs, CFIA support, and provincial agri-food grants. The Canadian Agricultural Partnership provides $3B+ over 5 years for farm innovation, sustainability, and technology adoption.',
        insertAfter: '{/* Hero Section */}',
    },
    {
        path: 'app/canada/indigenous-entrepreneur-grants/page.tsx',
        shortAnswer: 'Indigenous entrepreneurs in Canada can access NACCA\'s Aboriginal Entrepreneurship Program, the Indigenous Women Entrepreneurship Fund ($50K), WELF loans, and federal Indigenous Business Development programs. The NACCA federal agreement secured $830M over 10 years.',
        insertAfter: '{/* Hero Section */}',
    },
];

const EEAT_IMPORTS = `import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EEATBadge from "@/components/blog/EEATBadge"
import EligibleCheck from "@/components/blog/EligibleCheck"
`;

const ROOT = path.join(__dirname);

let injected = 0;
let skipped = 0;
let errors = [];

for (const hub of HUB_PAGES) {
    const filePath = path.join(ROOT, hub.path);
    if (!fs.existsSync(filePath)) {
        console.log(`  ⚠️  No file: ${hub.path}`);
        skipped++;
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if already has EEAT
    if (content.includes('EEATBadge') || content.includes('ShortAnswerBox')) {
        console.log(`  ⏭️  Already has EEAT: ${hub.path}`);
        skipped++;
        continue;
    }

    // 1. Add imports after the last import line
    const lastImportIdx = content.lastIndexOf('\nimport ');
    if (lastImportIdx === -1) {
        console.log(`  ❌ No imports found: ${hub.path}`);
        errors.push(hub.path);
        continue;
    }
    const endOfLastImport = content.indexOf('\n', lastImportIdx + 1);
    content = content.substring(0, endOfLastImport + 1) + EEAT_IMPORTS + content.substring(endOfLastImport + 1);

    // 2. Build the EEAT block
    const eeatBlock = `
      {/* EEAT Components */}
      <section className="py-6 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <ShortAnswerBox content="${hub.shortAnswer.replace(/"/g, '&quot;')}" />
            <EEATBadge authorName="Ashwani K." authorImage="/ash-author-1.jpg" date="2026-03-01" />
            <EligibleCheck />
          </div>
        </div>
      </section>
`;

    // 3. Find the hero section end — look for first </section> after the Hero comment
    // Different pages have different patterns, try multiple approaches
    let insertPos = -1;

    // Try: find {/* Hero Section */} comment then first </section>
    const heroComment = content.indexOf('{/* Hero Section */}');
    if (heroComment !== -1) {
        const sectionEnd = content.indexOf('</section>', heroComment);
        if (sectionEnd !== -1) {
            insertPos = sectionEnd + '</section>'.length;
        }
    }

    // Fallback: find the first </section> in the JSX return
    if (insertPos === -1) {
        const returnIdx = content.indexOf('return (');
        if (returnIdx !== -1) {
            const firstSectionEnd = content.indexOf('</section>', returnIdx);
            if (firstSectionEnd !== -1) {
                insertPos = firstSectionEnd + '</section>'.length;
            }
        }
    }

    if (insertPos === -1) {
        console.log(`  ❌ Could not find insertion point: ${hub.path}`);
        errors.push(hub.path);
        continue;
    }

    content = content.substring(0, insertPos) + eeatBlock + content.substring(insertPos);

    fs.writeFileSync(filePath, content, 'utf8');
    injected++;
    console.log(`  ✅ Injected EEAT: ${hub.path}`);
}

console.log('\n=== SUMMARY ===');
console.log(`Injected: ${injected}`);
console.log(`Skipped: ${skipped}`);
console.log(`Errors: ${errors.length}`);
if (errors.length > 0) console.log('Error paths:', errors.join('\n  '));
