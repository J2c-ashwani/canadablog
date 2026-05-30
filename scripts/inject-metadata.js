const fs = require('fs');
const path = require('path');

const REWRITES_PATH = path.join(__dirname, 'phase1-rewrites.json');
const CURRENT_META_PATH = path.join(__dirname, 'current-metadata.json');

const rewrites = JSON.parse(fs.readFileSync(REWRITES_PATH, 'utf8'));
const currentMeta = JSON.parse(fs.readFileSync(CURRENT_META_PATH, 'utf8'));

let successCount = 0;
let failCount = 0;

for (const target of rewrites) {
    const fullPath = path.join(__dirname, '../', target.path);
    if (!fs.existsSync(fullPath)) {
        console.error(`❌ File not found: ${fullPath}`);
        failCount++;
        continue;
    }

    // Find the original title and description from the extraction map
    const originalMap = currentMeta.find(m => m.path === target.path);
    if (!originalMap) {
        console.error(`❌ Original metadata not found in map for: ${target.path}`);
        failCount++;
        continue;
    }

    let content = fs.readFileSync(fullPath, 'utf8');

    // SAFE INJECTION: Exact string replacement instead of dangerous Regex
    // This perfectly preserves quotes, commas, and the AST
    let modified = false;

    if (originalMap.currentTitle) {
        const targetTitleStr = originalMap.currentTitle;
        // Escaping double quotes inside the string if any, though standard titles usually don't have them
        content = content.split(`"${targetTitleStr}"`).join(`"${target.newTitle}"`);
        modified = true;
    }

    if (originalMap.currentDescription) {
        const targetDescStr = originalMap.currentDescription;
        content = content.split(`"${targetDescStr}"`).join(`"${target.newDesc}"`);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ Injected safe metadata into: ${target.slug}`);
        successCount++;
    } else {
        console.log(`⚠️ No changes made to: ${target.slug}`);
    }
}

console.log(`\\n--- Injection Complete ---`);
console.log(`Successfully updated ${successCount} files.`);
if (failCount > 0) console.log(`Failed to update ${failCount} files.`);
console.log(`\\nRun 'pnpm build' next to guarantee zero AST syntax errors.`);
