const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lib/data/blogPosts.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The objects start with `  {`
const parts = content.split(/\n  \{\n/);

let newContent = parts[0]; // the preamble

let fixedCount = 0;

for (let i = 1; i < parts.length; i++) {
  let postStr = '\n  {\n' + parts[i];
  
  // Count shortAnswer occurrences
  const matches = [...postStr.matchAll(/shortAnswer:/g)];
  
  if (matches.length > 1) {
    fixedCount++;
    console.log(`Found ${matches.length} shortAnswers in block.`);
    
    // We only want to remove lines that match `^\s*shortAnswer: "...",?$` 
    // AND we want to make sure we leave at least one.
    // The easiest way is to split by lines, and remove the standalone ones
    // until we only have 1 shortAnswer left total in the block!

    let lines = postStr.split('\n');
    let saCount = matches.length;
    
    for (let j = 0; j < lines.length; j++) {
      if (saCount <= 1) break; // Don't remove the last one!
      
      // If the line is JUST a shortAnswer property
      if (/^\s*shortAnswer:\s*(?:"(.*)"|'(.*)'),?\s*$/.test(lines[j])) {
        // delete it
        lines[j] = null;
        saCount--;
      }
    }
    
    postStr = lines.filter(l => l !== null).join('\n');
  }
  
  newContent += postStr;
}

fs.writeFileSync(filePath, newContent, 'utf8');
console.log(`Fixed ${fixedCount} posts with duplicate shortAnswers.`);
