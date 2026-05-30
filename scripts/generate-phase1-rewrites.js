const fs = require('fs');
const path = require('path');

// The 20 selected high-value pages for Phase 1
// We emulate GSC data via `assumedPos` and `intent` based on keyword research
const TARGETS = [
    { slug: 'apply-sba-loans', type: 'guide', keyword: 'SBA Loans', amount: '$5M', assumedPos: 12, intent: 'apply' },
    { slug: 'canada-startup-funding-grants-guide', type: 'blog', keyword: 'Canada Startup Grants', amount: '$1.2B', assumedPos: 8, intent: 'list' },
    { slug: 'apply-irap-grants', type: 'guide', keyword: 'IRAP Grants', amount: '$10M', assumedPos: 15, intent: 'apply' },
    { slug: 'apply-small-business-grants', type: 'guide', keyword: 'Small Business Grants', amount: '$250K', assumedPos: 20, intent: 'discovery' },
    { slug: 'women-entrepreneurship-fund-guide', type: 'guide', keyword: 'Women Entrepreneurship Grants', amount: '$100K', assumedPos: 9, intent: 'discovery' },
    { slug: 'apply-federal-grants', type: 'guide', keyword: 'Federal Grants', amount: '$500K', assumedPos: 6, intent: 'apply' },
    { slug: 'canada-cleantech-funding-guide', type: 'guide', keyword: 'CleanTech Funding Canada', amount: '$10M', assumedPos: 14, intent: 'discovery' },
    { slug: 'canada-manufacturing-funding-guide', type: 'guide', keyword: 'Manufacturing Grants Canada', amount: '$5M', assumedPos: 11, intent: 'discovery' },
    { slug: 'apply-sbir-grants', type: 'guide', keyword: 'SBIR Grants Phase 1 & 2', amount: '$1.7M', assumedPos: 19, intent: 'apply' },
    { slug: 'apply-ontario-business-grants', type: 'guide', keyword: 'Ontario Business Grants', amount: '$150K', assumedPos: 7, intent: 'apply' },
    { slug: 'canada-agri-food-funding-guide', type: 'guide', keyword: 'Agri-Food Grants Canada', amount: '$2.3B', assumedPos: 25, intent: 'discovery' },
    { slug: 'apply-doe-clean-energy-grants', type: 'guide', keyword: 'DOE Clean Energy Grants', amount: '$62B', assumedPos: 30, intent: 'apply' },
    { slug: 'nserc-research-grants-guide', type: 'guide', keyword: 'NSERC Research Grants', amount: '$1M', assumedPos: 16, intent: 'discovery' },
    { slug: 'canada-digital-ai-funding-guide', type: 'guide', keyword: 'AI Startup Grants Canada', amount: '$850M', assumedPos: 18, intent: 'discovery' },
    { slug: 'sred-application-guide', type: 'guide', keyword: 'SR&ED Tax Credits', amount: '35% ROI', assumedPos: 5, intent: 'apply' },
    { slug: 'apply-minority-grants', type: 'guide', keyword: 'Minority Business Grants', amount: '$50K', assumedPos: 12, intent: 'apply' },
    { slug: 'canada-aerospace-defence-funding-guide', type: 'guide', keyword: 'Aerospace Grants Canada', amount: '$450M', assumedPos: 22, intent: 'discovery' },
    { slug: 'bdc-women-entrepreneurs-financing-guide', type: 'guide', keyword: 'BDC Women Entrepreneurs Loans', amount: '$100K', assumedPos: 3, intent: 'how' },
    { slug: 'apply-quebec-business-grants', type: 'guide', keyword: 'Quebec Business Grants', amount: '$15M', assumedPos: 10, intent: 'apply' },
    { slug: 'apply-csbfp-loans', type: 'guide', keyword: 'CSBFP Loans Canada', amount: '$1.15M', assumedPos: 15, intent: 'apply' }
];

function generateTitle(target) {
    let title = "";
    const isTop5 = target.assumedPos <= 5;
    
    // Position Awareness + Intent Matching
    if (isTop5) {
        // Moderate title for top rankers (don't over-optimize)
        title = `${target.keyword} 2026 – Funding Options & Eligibility`;
    } else if (target.intent === 'apply' || target.intent === 'how') {
        // Pattern D
        title = `How to Get ${target.keyword} (2026) – Step-by-Step Guide`;
    } else if (target.intent === 'list') {
        // Pattern A or C randomly based on length
        title = `Top ${target.keyword} (2026) – Get Up to ${target.amount}`;
    } else {
        // Pattern B (Aggressive)
        title = `${target.keyword} 2026 – Funding up to ${target.amount} Available`;
    }

    // Title Length Guard: 65 chars max
    if (title.length > 65) {
        // Smart trim
        title = title.replace(' – Funding Options & Eligibility', ' (2026 Guide)');
        title = title.replace(' – Step-by-Step Guide', ' (2026 Guide)');
        title = title.replace(' Available', '');
        if (title.length > 65) {
             title = title.substring(0, 62) + '...';
        }
    }
    
    return title;
}

function generateDescription(target) {
    // Formula: [Benefit] + [Funding Amount] + [Action] + [Urgency]
    let audienceStr = target.keyword.includes('Canada') || target.slug.includes('canada') 
                      ? 'Canadian businesses' : 'startups and small businesses';
    
    return `Explore top ${target.keyword.toLowerCase()} offering up to ${target.amount} in funding. Check your eligibility, learn the exact application steps, and secure approval today.`;
}

const rewrites = TARGETS.map(t => {
    return {
        slug: t.slug,
        type: t.type,
        path: `app/${t.type === 'guide' ? 'guides' : 'blog'}/${t.slug}/page.tsx`,
        newTitle: generateTitle(t),
        newDesc: generateDescription(t)
    };
});

const outputPath = path.join(__dirname, 'phase1-rewrites.json');
fs.writeFileSync(outputPath, JSON.stringify(rewrites, null, 2), 'utf8');

console.log(`✅ Generated Phase 1 AI Rewrites for ${rewrites.length} pages.`);
console.log(`Saved to scripts/phase1-rewrites.json`);
