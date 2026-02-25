const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Target files for E-E-A-T enrichment
const FILES = [
    'lib/data/blogPosts.ts',
    'lib/data/guides.ts'
];

const BATCH_SIZE = 20;

console.log(`🚀 Starting Daily E-E-A-T Drip Deployment (${BATCH_SIZE} pages)...`);

try {
    // Ensure we are on main and git is clean
    const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    if (currentBranch !== 'main') {
        console.warn("⚠️ Warning: You are not on the 'main' branch.");
    }
} catch (e) {
    console.error("Error checking Git status.");
    process.exit(1);
}

let totalEnrichedThisRun = 0;

for (const file of FILES) {
    if (totalEnrichedThisRun >= BATCH_SIZE) break;

    const filePath = path.join(__dirname, '..', file);

    // Get main version
    let mainContent = fs.readFileSync(filePath, 'utf-8');

    // Get eeat-rollout version
    let rolloutContent;
    try {
        rolloutContent = execSync(`git show eeat-rollout:${file}`).toString();
    } catch (e) {
        console.error(`Error: Could not read ${file} from eeat-rollout branch. Does the branch exist?`);
        continue;
    }

    // Find unenriched objects in the main content using regex
    // We look for objects with a slug but NO shortAnswer right before the closing bracket
    // This is a naive but effective parsing for this specific structure

    const rolloutLines = rolloutContent.split('\n');
    const mainLines = mainContent.split('\n');

    // We will find the shortAnswer blocks in rollout and migrate them to main based on slug
    let rolloutDataMap = {}; // slug -> enrichment string

    for (let i = 0; i < rolloutLines.length; i++) {
        const slugMatch = rolloutLines[i].match(/^\s+slug:\s*['"]([^'"]+)['"]/);
        if (slugMatch) {
            const slug = slugMatch[1];
            // Search ahead for shortAnswer
            let enrichmentBlock = '';
            for (let j = i; j < i + 60 && j < rolloutLines.length; j++) {
                if (rolloutLines[j].includes('shortAnswer:')) {
                    // Found enrichment start, gather lines until we hit the end of inlineCTA block
                    let startLine = j;
                    let k = startLine;
                    while (k < rolloutLines.length && !rolloutLines[k].match(/^\s{2}\},?\s*$/)) {
                        enrichmentBlock += rolloutLines[k] + '\n';
                        k++;
                    }
                    rolloutDataMap[slug] = enrichmentBlock;
                    break;
                }
            }
        }
    }

    let enrichedCountFile = 0;

    // Now modify main content
    let modifiedMainLines = [...mainLines];

    for (let i = 0; i < modifiedMainLines.length; i++) {
        if (totalEnrichedThisRun >= BATCH_SIZE) break;

        const mainSlugMatch = modifiedMainLines[i].match(/^\s+slug:\s*['"]([^'"]+)['"]/);
        if (mainSlugMatch) {
            const slug = mainSlugMatch[1];

            // Check if already enriched in main
            let isEnriched = false;
            let closeIdx = -1;
            for (let j = i; j < i + 60 && j < modifiedMainLines.length; j++) {
                if (modifiedMainLines[j].includes('shortAnswer:')) {
                    isEnriched = true;
                    break;
                }
                if (modifiedMainLines[j].match(/^\s{2}\},?\s*$/)) {
                    closeIdx = j;
                    break;
                }
            }

            if (!isEnriched && closeIdx !== -1 && rolloutDataMap[slug]) {
                // We need to inject the enrichment block
                // First ensure the preceding line has a comma
                let preCloseLine = modifiedMainLines[closeIdx - 1];
                if (!preCloseLine.trim().endsWith(',')) {
                    modifiedMainLines[closeIdx - 1] = preCloseLine + ',';
                }

                modifiedMainLines.splice(closeIdx, 0, rolloutDataMap[slug].trimEnd());
                enrichedCountFile++;
                totalEnrichedThisRun++;
                console.log(`✅ Enriched: ${slug}`);
            }
        }
    }

    if (enrichedCountFile > 0) {
        fs.writeFileSync(filePath, modifiedMainLines.join('\n'));
        console.log(`Updated ${enrichedCountFile} items in ${file}`);
    }
}

if (totalEnrichedThisRun > 0) {
    console.log(`\n🎉 Successfully enriched ${totalEnrichedThisRun} pages.`);

    // Git Commit
    try {
        execSync(`git add ${FILES.join(' ')}`);
        execSync(`git commit -m "feat: Daily E-E-A-T Enrichment Batch (${totalEnrichedThisRun} pages)"`);
        console.log("📦 Created git commit. You can now run: git push origin main");
    } catch (e) {
        console.error("Failed to create git commit automatically. Please commit manually.");
    }
} else {
    console.log("✨ All pages are already fully enriched! Nothing left to do.");
}
