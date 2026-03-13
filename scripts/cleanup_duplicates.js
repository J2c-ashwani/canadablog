const fs = require('fs');
const ts = require('typescript');

const FILE = 'lib/data/blogPosts.ts';
let src = fs.readFileSync(FILE, 'utf8');

const sourceFile = ts.createSourceFile(
  'blogPosts.ts',
  src,
  ts.ScriptTarget.Latest,
  true
);

const removals = [];

function visit(node) {
  if (ts.isObjectLiteralExpression(node)) {
    let saProps = [];
    
    // Find all 'shortAnswer' property assignments in this object literal
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
        if (prop.name.text === 'shortAnswer') {
          saProps.push(prop);
        }
      }
    }

    // If there are more than 1, we want to keep the FIRST one (which our previous script generated)
    // and remove the subsqeuent duplicates.
    if (saProps.length > 1) {
       for (let i = 1; i < saProps.length; i++) {
          const propToRemove = saProps[i];
          // Find the exact range of the property including its trailing comma
          let start = propToRemove.getFullStart();
          let end = propToRemove.getEnd();
          
          // Peek ahead to consume the trailing comma
          if (src[end] === ',') end++;
          removals.push({ start, end });
       }
    }

    // Also remove the specific inlineCTA and jumpLinks duplicate blocks that were injected incorrectly
    // in the arrays (TS1117 errors around 4215, 6956, 16843 are sometimes caused by other dup keys)
    let keysSeen = new Set();
    for (const prop of node.properties) {
       if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
           const nameText = prop.name.text;
           if (keysSeen.has(nameText)) {
               // Duplicate! Remove it (except for shortAnswer which we just handled precisely above)
               if (nameText !== 'shortAnswer') {
                  let start = prop.getFullStart();
                  let end = prop.getEnd();
                  if (src[end] === ',') end++;
                  removals.push({start, end});
               }
           } else {
               keysSeen.add(nameText);
           }
       }
    }
  }
  ts.forEachChild(node, visit);
}

visit(sourceFile);

// Filter and sort removals descending
const uniqueRemovals = [];
const seenStarts = new Set();
for (const r of removals) {
    if (!seenStarts.has(r.start)) {
        seenStarts.add(r.start);
        uniqueRemovals.push(r);
    }
}
uniqueRemovals.sort((a, b) => b.start - a.start);

for (const r of uniqueRemovals) {
    src = src.slice(0, r.start) + src.slice(r.end);
}

console.log(`Removed ${uniqueRemovals.length} duplicate properties.`);
fs.writeFileSync(FILE, src, 'utf8');
