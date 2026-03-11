const fs = require('fs');
const path = require('path');

const targetGuides = [
    'apply-british-columbia-grants',
    'apply-alberta-business-grants',
    'apply-quebec-business-grants',
    'apply-ontario-business-grants',
    'apply-csbfp-government-financing',
    'apply-csbfp-loans',
    'canada-aerospace-defence-funding-guide',
    'canada-agri-food-funding-guide',
    'canada-manufacturing-funding-guide',
    'apply-agriculture-agri-food-canada',
    'canada-cleantech-funding-guide',
    'canada-life-sciences-funding-guide',
    'women-entrepreneurship-fund-guide'
];

const guidesDir = path.join(__dirname, 'app/guides');

let injected = 0;
let errors = [];

for (const guide of targetGuides) {
    const pagePath = path.join(guidesDir, guide, 'page.tsx');
    if (!fs.existsSync(pagePath)) {
        console.log(`ERROR: Could not find ${pagePath}`);
        errors.push(guide);
        continue;
    }

    let content = fs.readFileSync(pagePath, 'utf8');

    // Skip if already has EEATBadge
    if (content.includes('EEATBadge') && content.includes('ShortAnswerBox')) {
        console.log(`SKIP: ${guide} already has EEAT components.`);
        continue;
    }

    // 1. Add Imports
    const importsToAdd = [
        `import EEATBadge from '@/components/blog/EEATBadge'`,
        `import ShortAnswerBox from '@/components/blog/ShortAnswerBox'`,
        `import EligibleCheck from '@/components/blog/EligibleCheck'`,
        `import StickyTOC from '@/components/blog/StickyTOC'`,
        `import { ExpertTipBox } from '@/components/blog/ExpertTipBox'`
    ].filter(imp => {
        const componentName = imp.match(/import\s+(?:{\s*)?(\w+)/)[1];
        return !content.includes(componentName);
    });

    if (importsToAdd.length > 0) {
        const lastImportIdx = content.lastIndexOf('\nimport ');
        const endOfLastImport = content.indexOf('\n', lastImportIdx + 1);
        content = content.substring(0, endOfLastImport + 1) + importsToAdd.join('\n') + '\n' + content.substring(endOfLastImport + 1);
    }

    // 2. Extract IDs and Headers for StickyTOC
    // A simplistic approach: find id="foo" and optionally look for nearby text, but for React its often <div id="process"><h2>Title</h2>
    // We can regex: id="([^"]+)"[\s\S]{0,100}?<h[23][^>]*>([^<]+)<\/h[23]>
    let linksStr = '';
    const idRegex = /id="([^"]+)"[\s\S]{0,150}?<h[23][^>]*>(?:<[^>]+>)?([^<]+)(?:<\/[^>]+>)?<\/h[23]>/g;
    const links = [];
    let match;
    while ((match = idRegex.exec(content)) !== null) {
        // some cleanups for text
        let text = match[2].trim().replace(/\s+/g, ' ');
        if (text.length > 2) {
            links.push(`{ id: "${match[1]}", title: "${text}" }`);
        }
    }

    if (links.length === 0) {
        // Fallback links if parsing fails
        links.push(`{ id: "process", title: "Application Process" }`);
        links.push(`{ id: "faq", title: "FAQ" }`);
    }

    // Clean up links array
    const finalLinks = `[\n    ${links.slice(0, 5).join(',\n    ')}\n  ]`;

    // 3. Generate the 5 components block
    const eeatBlock = `
        {/* EEAT ENRICHMENT COMPONENTS (5 POINTS) */}
        <StickyTOC links={${finalLinks}} />
        
        <section className="py-6 bg-emerald-50 dark:bg-emerald-950/20 mt-4 mb-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <ShortAnswerBox content="The short answer: Applying for this grant requires demonstrating clear alignment with program objectives, registering with the specific portals, and preparing a comprehensive financial package. Approval times vary by funding stream." />
            </div>
          </div>
        </section>

        <section className="py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <EligibleCheck />
            </div>
          </div>
        </section>

        <section className="py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <ExpertTipBox type="strategy" title="Expert Strategy">
                <p>Always align your proposal with the funding agency's core policy objectives, such as job creation, environmental sustainability, or regional economic development. Provide concrete metrics to substantiate your claims.</p>
              </ExpertTipBox>
            </div>
          </div>
        </section>

        <section className="py-2 mb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-03-01" />
            </div>
          </div>
        </section>
`;

    // 4. Inject after Hero Section
    // Hero is usually the first <section> or just search for </section> after "Hero"
    // Let's find the first </section> that represents the Hero
    const heroEndIdx = content.indexOf('</section>');
    if (heroEndIdx !== -1) {
        const insertPos = heroEndIdx + '</section>'.length;
        content = content.substring(0, insertPos) + '\n' + eeatBlock + content.substring(insertPos);

        // We optionally remove the existing old "QUERY HOOK" if we just added a StickyTOC
        // But it's safer to leave it or remove it dynamically. Let's try to remove it:
        // This is optional but cleans up the duplicate jump links
        content = content.replace(/{\/\*[\s\d\w\.]*QUERY HOOK[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g, '');

        fs.writeFileSync(pagePath, content, 'utf8');
        console.log(`✅ Injected 5 points into: ${guide}`);
        injected++;
    } else {
        console.log(`ERROR: Could not find insert position in ${guide}`);
        errors.push(guide);
    }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Injected: ${injected} / ${targetGuides.length}`);
if (errors.length > 0) console.log(`Errors: ${errors.join(', ')}`);
