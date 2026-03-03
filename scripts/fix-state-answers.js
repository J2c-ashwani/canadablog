const fs = require('fs');
const path = require('path');

function fixStateDetails(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // We will do a simple string manipulation using regex to insert shortAnswer
    // before seoKeywords: in each StateDetailedGrant object

    let updatedCount = 0;

    // Split by objects (roughly matching the '    {' that starts an object)
    const stateMatches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];

    for (const match of stateMatches) {
        const stateId = match[1];

        // Find the block for this state
        const blockStartIndex = match.index;
        const nextMatch = stateMatches[stateMatches.indexOf(match) + 1];
        const blockEndIndex = nextMatch ? nextMatch.index : content.length;

        const stateBlock = content.substring(blockStartIndex, blockEndIndex);

        if (stateBlock.includes('shortAnswer:')) continue; // Already has it

        // Extract required data
        const nameMatch = stateBlock.match(/name:\s*['"]([^'"]+)['"]/);
        const name = nameMatch ? nameMatch[1] : stateId;

        const fundingMatch = stateBlock.match(/totalFunding:\s*['"]([^'"]+)['"]/);
        const totalFunding = fundingMatch ? fundingMatch[1] : 'millions';

        const programMatch = stateBlock.match(/programCount:\s*['"]([^'"]+)['"]/);
        const programCount = programMatch ? programMatch[1] : 'dozens of';

        // Generate answer
        const shortAnswer = `${name} offers over ${totalFunding} in small business funding and incentives across ${programCount} state/provincial programs. Start with the local economic development office — our comprehensive guide breaks down the top programs, eligibility requirements, and application steps.`;

        // Insert it right before seoKeywords
        const insertPosition = stateBlock.indexOf('seoKeywords:');
        if (insertPosition !== -1) {
            const before = stateBlock.substring(0, insertPosition);
            const after = stateBlock.substring(insertPosition);

            const newBlock = before + `shortAnswer: "${shortAnswer}",\n\n    ` + after;
            content = content.substring(0, blockStartIndex) + newBlock + content.substring(blockEndIndex);

            // Adjust indices because content length changed
            const lengthDiff = newBlock.length - stateBlock.length;
            for (let i = stateMatches.indexOf(match) + 1; i < stateMatches.length; i++) {
                stateMatches[i].index += lengthDiff;
            }

            updatedCount++;
            console.log(`✅ Added shortAnswer to ${name}`);
        }
    }

    fs.writeFileSync(filePath, content);
    return updatedCount;
}

console.log('=== Adding shortAnswer to stateDetails.ts ===');
const stateCount = fixStateDetails(path.join(__dirname, '..', 'lib/data/stateDetails.ts'));
console.log(`State profiles updated: ${stateCount}\n`);
