const fs = require('fs');
const path = require('path');

const CURRENT_META_PATH = path.join(__dirname, 'current-metadata.json');
const PHASE1_PATH = path.join(__dirname, 'phase1-rewrites.json');

const currentMeta = JSON.parse(fs.readFileSync(CURRENT_META_PATH, 'utf8'));
const phase1Rewrites = JSON.parse(fs.readFileSync(PHASE1_PATH, 'utf8'));

// Filter out Phase 1 pages
const phase1Paths = new Set(phase1Rewrites.map(p => p.path));
const remainingPages = currentMeta.filter(m => !phase1Paths.has(m.path));

// Select next 50 pages
const targets = remainingPages.slice(0, 50);

function extractKeyword(title) {
    let kw = title;
    // Strip common fluff from the old encylopedia titles
    const killWords = [" 2026", ": ", " | ", " Application Guide", " Complete Guide", " Funding Guide", " Grants Guide", " Requirements", " Complete Application Guide"];
    for (const w of killWords) {
        kw = kw.split(w)[0];
    }
    return kw.trim();
}

function extractAmount(str) {
    const match = str.match(/\\$[0-9]+[KMBkmb]?/);
    return match ? match[0].toUpperCase() : "$100K";
}

function determineIntent(kw) {
    const lower = kw.toLowerCase();
    if (lower.includes('apply') || lower.includes('how to') || lower.includes('process')) return 'apply';
    if (lower.includes('top') || lower.includes('list') || lower.includes('best')) return 'list';
    if (lower.includes('women') || lower.includes('minority') || lower.includes('startup')) return 'discovery';
    return 'discovery';
}

function generateTitle(target) {
    let title = "";
    // Randomize position simulation to ensure pattern variation across the 50 pages.
    const assumedPos = Math.floor(Math.random() * 20) + 1; 
    const isTop5 = assumedPos <= 5;
    
    if (isTop5) {
        title = `${target.keyword} 2026 – Funding Options & Eligibility`;
    } else if (target.intent === 'apply' || target.intent === 'how') {
        title = `How to Get ${target.keyword} (2026) – Step-by-Step Guide`;
    } else if (target.intent === 'list') {
        title = `Top ${target.keyword} (2026) – Get Up to ${target.amount}`;
    } else {
        // Alternate randomly between Pattern A and B for Discovery
        if (Math.random() > 0.5) {
            title = `${target.keyword} 2026 – Funding up to ${target.amount} Available`;
        } else {
            title = `Top ${target.keyword} (2026) – Get Up to ${target.amount}`;
        }
    }

    if (title.length > 65) {
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
    let audienceStr = target.keyword.includes('Canada') ? 'Canadian businesses' : 'startups and small businesses';
    return `Explore top ${target.keyword.toLowerCase()} offering up to ${target.amount} in funding. Check your eligibility, learn the exact application steps, and secure approval today.`;
}

const rewrites = targets.map(t => {
    const keyword = extractKeyword(t.currentTitle);
    const amount = extractAmount(t.currentTitle + " " + (t.currentDescription || ""));
    const intent = determineIntent(keyword);
    
    const contextObj = { keyword, amount, intent, slug: t.slug };
    
    return {
        slug: t.slug,
        type: t.type,
        path: t.path,
        newTitle: generateTitle(contextObj),
        newDesc: generateDescription(contextObj)
    };
});

const outputPath = path.join(__dirname, 'phase2-rewrites.json');
fs.writeFileSync(outputPath, JSON.stringify(rewrites, null, 2), 'utf8');

console.log(`✅ Generated Phase 2 AI Rewrites for ${rewrites.length} pages.`);
console.log(`Saved to scripts/phase2-rewrites.json`);
