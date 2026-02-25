const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const BATCH_SIZE = 20;
let totalEnrichedThisRun = 0;

console.log(`🚀 Starting Daily E-E-A-T Drip Deployment (${BATCH_SIZE} pages)...`);

try {
    const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    if (currentBranch !== 'main') {
        console.warn("⚠️ Warning: You are not on the 'main' branch.");
    }
} catch (e) {
    console.error("Error checking Git status.");
    process.exit(1);
}

// 1. Process Database Files
const DATA_FILES = [
    'lib/data/blogPosts.ts',
    'lib/data/guides.ts',
    'lib/data/stateDetails.ts'
];

for (const file of DATA_FILES) {
    if (totalEnrichedThisRun >= BATCH_SIZE) break;

    const filePath = path.join(__dirname, '..', file);
    let mainContent;
    try {
        mainContent = fs.readFileSync(filePath, 'utf-8');
    } catch (e) {
        continue;
    }

    let rolloutContent;
    try {
        rolloutContent = execSync(`git show eeat-rollout:${file}`, { maxBuffer: 10 * 1024 * 1024 }).toString();
    } catch (e) {
        console.error(`Error: Could not read ${file} from eeat-rollout. Skipping.`);
        continue;
    }

    const rolloutLines = rolloutContent.split('\n');
    const mainLines = mainContent.split('\n');
    let rolloutDataMap = {};

    for (let i = 0; i < rolloutLines.length; i++) {
        const slugMatch = rolloutLines[i].match(/^\s+slug:\s*['"]([^'"]+)['"]/);
        if (slugMatch) {
            const slug = slugMatch[1];
            let enrichmentBlock = '';
            for (let j = i; j < i + 60 && j < rolloutLines.length; j++) {
                if (rolloutLines[j].includes('shortAnswer:')) {
                    let startLine = j;
                    let k = startLine;
                    while (k < rolloutLines.length && !rolloutLines[k].match(/^\s{2}\},?\s*$/) && !rolloutLines[k].match(/^\s{4}\},?\s*$/)) {
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
    let modifiedMainLines = [...mainLines];

    for (let i = 0; i < modifiedMainLines.length; i++) {
        if (totalEnrichedThisRun >= BATCH_SIZE) break;

        const mainSlugMatch = modifiedMainLines[i].match(/^\s+slug:\s*['"]([^'"]+)['"]/);
        if (mainSlugMatch) {
            const slug = mainSlugMatch[1];
            let isEnriched = false;
            let closeIdx = -1;

            for (let j = i; j < i + 60 && j < modifiedMainLines.length; j++) {
                if (modifiedMainLines[j].includes('shortAnswer:')) {
                    isEnriched = true;
                    break;
                }
                if (modifiedMainLines[j].match(/^\s{2}\},?\s*$/) || modifiedMainLines[j].match(/^\s{4}\},?\s*$/)) {
                    closeIdx = j;
                    break;
                }
            }

            if (!isEnriched && closeIdx !== -1 && rolloutDataMap[slug]) {
                let preCloseLine = modifiedMainLines[closeIdx - 1];
                if (!preCloseLine.trim().endsWith(',') && preCloseLine.trim() !== '') {
                    modifiedMainLines[closeIdx - 1] = preCloseLine + ',';
                }
                modifiedMainLines.splice(closeIdx, 0, rolloutDataMap[slug].trimEnd());
                enrichedCountFile++;
                totalEnrichedThisRun++;
                console.log(`✅ Database Enriched: ${slug} (${file.split('/').pop()})`);
            }
        }
    }

    if (enrichedCountFile > 0) {
        fs.writeFileSync(filePath, modifiedMainLines.join('\n'));
    }
}

// 2. Process Hardcoded Files
if (totalEnrichedThisRun < BATCH_SIZE) {
    try {
        const diffOutput = execSync('git diff --name-only main eeat-rollout -- app/canada/').toString();
        const diffFiles = diffOutput.trim().split('\n').filter(Boolean);

        for (const file of diffFiles) {
            if (totalEnrichedThisRun >= BATCH_SIZE) break;
            if (file.endsWith('page.tsx')) {
                execSync(`git checkout eeat-rollout -- ${file}`);
                console.log(`✅ Hardcoded Page Enriched: ${file}`);
                totalEnrichedThisRun++;
            }
        }
    } catch (e) {
        console.error("Error checking git diff for app/canada/", e.message);
    }
}

if (totalEnrichedThisRun > 0) {
    console.log(`\n🎉 Successfully enriched ${totalEnrichedThisRun} pages for today's drip.`);
    try {
        execSync(`git add lib/data/blogPosts.ts lib/data/guides.ts lib/data/stateDetails.ts app/canada/`);
        execSync(`git commit -m "feat: Daily E-E-A-T Enrichment Batch (${totalEnrichedThisRun} pages)"`);
        console.log("📦 Created git commit. You can now run: git push origin main");
    } catch (e) {
        console.error("Failed to create git commit automatically. Please commit manually.");
    }
} else {
    console.log("✨ All pages are already fully enriched! Nothing left to do.");
}
