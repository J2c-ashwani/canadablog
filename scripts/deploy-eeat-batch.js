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

    // Step 1: Extract shortAnswer for each slug from eeat-rollout
    // Pattern in eeat-rollout: `}, shortAnswer: "...",` on the line after seo closing
    const rolloutShortAnswers = {};
    const rolloutLines = rolloutContent.split('\n');

    for (let i = 0; i < rolloutLines.length; i++) {
        const slugMatch = rolloutLines[i].match(/^\s+slug:\s*['"]([^'"]+)['"]/);
        if (slugMatch) {
            const slug = slugMatch[1];
            // Scan forward to find shortAnswer (search within entry, stop at next slug)
            for (let j = i + 1; j < Math.min(i + 500, rolloutLines.length); j++) {
                if (rolloutLines[j].match(/^\s+slug:\s*['"]/) && j > i + 1) break;

                // Match: `}, shortAnswer: "...",`  or  `shortAnswer: "...",`
                const saLineMatch = rolloutLines[j].match(/shortAnswer:\s*"(.+)"/);
                if (saLineMatch) {
                    // Store the clean shortAnswer text (already properly escaped in source)
                    rolloutShortAnswers[slug] = saLineMatch[1];
                    break;
                }
            }
        }
    }

    console.log(`  Found ${Object.keys(rolloutShortAnswers).length} shortAnswers in eeat-rollout:${file}`);

    // Step 2: Find slugs in main that DON'T have shortAnswer yet
    const mainLines = mainContent.split('\n');
    let modifiedLines = [...mainLines];
    let enrichedCount = 0;
    let offset = 0; // Track line insertions

    for (let i = 0; i < mainLines.length; i++) {
        if (totalEnrichedThisRun >= BATCH_SIZE) break;

        const slugMatch = mainLines[i].match(/^\s+slug:\s*['"]([^'"]+)['"]/);
        if (!slugMatch) continue;

        const slug = slugMatch[1];
        if (!rolloutShortAnswers[slug]) continue;

        // Check if main already has shortAnswer for this slug
        let alreadyHas = false;
        for (let j = i + 1; j < Math.min(i + 500, mainLines.length); j++) {
            if (mainLines[j].match(/^\s+slug:\s*['"]/) && j > i + 1) break;
            if (mainLines[j].includes('shortAnswer')) {
                alreadyHas = true;
                break;
            }
        }

        if (alreadyHas) continue;

        // Find the seo: { keywords: [...] } block and inject shortAnswer after it
        // Pattern: `    seo: {` ... `    },`  →  `    }, shortAnswer: "...",`
        let injected = false;
        
        // Attempt 1: Try to find and inject after seo block
        for (let j = i + 1; j < Math.min(i + 500, mainLines.length); j++) {
            if (mainLines[j].match(/^\s+slug:\s*['"]/) && j > i + 1) break;

            // Look for the closing of the seo block: `    },` or `},`
            if (mainLines[j].match(/^\s+seo:\s*\{/)) {
                // Found seo block start, now find its closing `},`
                let braceDepth = 0;
                for (let k = j; k < Math.min(j + 10, mainLines.length); k++) {
                    for (const ch of mainLines[k]) {
                        if (ch === '{') braceDepth++;
                        if (ch === '}') braceDepth--;
                    }
                    if (braceDepth === 0) {
                        // k is the line closing seo block: e.g `    },`
                        // Replace `    },` with `    }, shortAnswer: "...",`
                        const adjustedK = k + offset;
                        const closingLine = modifiedLines[adjustedK].trimEnd();
                        const saText = rolloutShortAnswers[slug];
                        modifiedLines[adjustedK] = closingLine + ` shortAnswer: "${saText}",`;

                        enrichedCount++;
                        totalEnrichedThisRun++;
                        console.log(`✅ Enriched (seo block): ${slug} (${file.split('/').pop()})`);
                        injected = true;
                        break;
                    }
                }
                break;
            }
        }
        
        // Attempt 2: If no seo block, inject right before `metrics: [`
        if (!injected) {
            for (let j = i + 1; j < Math.min(i + 500, mainLines.length); j++) {
                if (mainLines[j].match(/^\s+slug:\s*['"]/) && j > i + 1) break;
                
                if (mainLines[j].match(/^\s+metrics:\s*\[/)) {
                    const adjustedJ = j + offset;
                    const saText = rolloutShortAnswers[slug];
                    // Insert a new line with shortAnswer right before metrics
                    modifiedLines.splice(adjustedJ, 0, `    shortAnswer: "${saText}",`);
                    offset++; // we added a line, increment offset
                    
                    enrichedCount++;
                    totalEnrichedThisRun++;
                    console.log(`✅ Enriched (fallback metrics): ${slug} (${file.split('/').pop()})`);
                    injected = true;
                    break;
                }
            }
        }
    }

    if (enrichedCount > 0) {
        fs.writeFileSync(filePath, modifiedLines.join('\n'));
    }
}

// 2. Process Hardcoded Files (Canada provinces)
if (totalEnrichedThisRun < BATCH_SIZE) {
    try {
        const diffOutput = execSync('git diff --name-only main eeat-rollout -- app/canada/').toString();
        const diffFiles = diffOutput.trim().split('\n').filter(Boolean);

        for (const file of diffFiles) {
            if (totalEnrichedThisRun >= BATCH_SIZE) break;
            if (file.endsWith('page.tsx')) {
                // Check if main already has this file modified vs rollout
                try {
                    const mainVersion = fs.readFileSync(file, 'utf-8');
                    const rolloutVersion = execSync(`git show eeat-rollout:${file}`, { maxBuffer: 5 * 1024 * 1024 }).toString();
                    if (mainVersion !== rolloutVersion) {
                        execSync(`git checkout eeat-rollout -- ${file}`);
                        console.log(`✅ Hardcoded Page Enriched: ${file}`);
                        totalEnrichedThisRun++;
                    }
                } catch (e) {
                    execSync(`git checkout eeat-rollout -- ${file}`);
                    console.log(`✅ Hardcoded Page Enriched: ${file}`);
                    totalEnrichedThisRun++;
                }
            }
        }
    } catch (e) {
        console.error("Error checking git diff for app/canada/", e.message);
    }
}

if (totalEnrichedThisRun > 0) {
    console.log(`\n🎉 Successfully enriched ${totalEnrichedThisRun} pages for today's drip.`);
    try {
        execSync(`git add -A`);
        execSync(`git commit -m "feat: Daily E-E-A-T Enrichment Batch (${totalEnrichedThisRun} pages) - ${new Date().toISOString().split('T')[0]}"`);
        console.log("📦 Created git commit. You can now run: git push origin main");
    } catch (e) {
        console.error("Failed to create git commit automatically. Please commit manually.");
    }
} else {
    console.log("✨ All pages are already fully enriched! Nothing left to do.");
}
