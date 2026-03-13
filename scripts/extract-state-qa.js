const fs = require('fs');
const ts = require('typescript');

function extractQA(file) {
  if (!fs.existsSync(file)) return [];
  const content = fs.readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true);
  const results = [];

  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      let q = '', a = '';
      for (const prop of node.properties) {
        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
          if (ts.isStringLiteral(prop.initializer) || ts.isNoSubstitutionTemplateLiteral(prop.initializer)) {
            if (prop.name.text === 'shortAnswerQuestion') q = prop.initializer.text;
            if (prop.name.text === 'shortAnswer') a = prop.initializer.text;
          }
        }
      }
      if (q && a) {
        results.push({q, a});
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
  return results;
}

const stateQAs = extractQA('lib/data/stateDetails.ts');
const guidesQAs = extractQA('lib/data/guides.ts');
const hubQAs1 = extractQA('inject-hub-eeat.js');
const hubQAs2 = extractQA('inject-hub-eeat2.js');

console.log('=== STATE PAGES (Total: ' + stateQAs.length + ') ===');
stateQAs.slice(0, 3).forEach(qa => console.log('Q:', qa.q, '\nA:', qa.a, '\n'));

console.log('=== HARDCODED GUIDES (Total: ' + guidesQAs.length + ') ===');
guidesQAs.slice(0, 3).forEach(qa => console.log('Q:', qa.q, '\nA:', qa.a, '\n'));

console.log('=== HUB PAGES (Total: ' + (hubQAs1.length + hubQAs2.length) + ') ===');
const allHubs = [...hubQAs1, ...hubQAs2];
if (allHubs.length > 0) {
    allHubs.slice(0, 3).forEach(qa => console.log('Q:', qa.q, '\nA:', qa.a, '\n'));
} else {
    // If AST fails on the raw JS scripts, just regex parse the known hub files
    console.log("No hub AST matches, script injection creates them dynamically.");
}
