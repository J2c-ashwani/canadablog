const fs = require('fs');
const ts = require('typescript');

const FILE = '/Users/ashwanikumar/.gemini/antigravity/scratch/canadablog/lib/data/blogPosts.ts';
const src = fs.readFileSync(FILE, 'utf8');

function extractAmounts(text = '') {
  const m = text.match(/\$[\d.,]+[MKB]?(\+)?/g) || [];
  return [...new Set(m)].slice(0, 3);
}

function extractPercent(text = '') {
  const m = text.match(/\d+%/g) || [];
  return m[0] || '';
}

function cleanTitle(title = '') {
  return title.split('|')[0].replace(/\.\.\./g, '').trim();
}

function shortenExcerpt(excerpt = '', maxChars = 200) {
  let cleaned = excerpt.replace(/<[^>]+>/g, '').replace(/[\r\n]+/g, ' ').trim();
  if (cleaned.length <= maxChars) return cleaned;
  const cut = cleaned.lastIndexOf(' ', maxChars);
  return cleaned.slice(0, cut).trim() + '.';
}

function generateAnswer(q, title, excerpt) {
  const ql = q.toLowerCase();
  const cleanT = cleanTitle(title);
  const allText = title + ' ' + excerpt;
  const amounts = extractAmounts(allText);
  const pct = extractPercent(excerpt);
  const mainAmount = amounts[0] || '';
  const secondAmount = amounts[1] || '';
  const shortExcerpt = shortenExcerpt(excerpt, 200);
  const amountStr = mainAmount ? ` Funding available: up to ${mainAmount}${secondAmount ? ` (with related programs offering ${secondAmount})` : ''}.` : '';

  let raw = '';
  if (ql.includes('how can my business apply') || ql.includes('how do i apply') || ql.includes('how to apply')) {
    raw = `To apply for ${cleanT}, start by reviewing the eligibility criteria and preparing a project proposal. ${shortExcerpt}${amountStr}`;
  } else if (ql.includes('deadline') || ql.includes('closing soon') || ql.includes('last chance')) {
    raw = `Yes — ${shortExcerpt} Apply as early as possible since programs run on a rolling intake basis until funds are depleted.${amountStr}`;
  } else if (ql.includes('best') || ql.includes('top')) {
    raw = `Yes — ${shortExcerpt}${amountStr}`;
  } else {
    raw = `Yes — ${shortExcerpt}${amountStr}`;
  }
  
  return raw.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}

const sourceFile = ts.createSourceFile(
  'blogPosts.ts',
  src,
  ts.ScriptTarget.Latest,
  true
);

const replacements = [];

function visit(node) {
  if (ts.isObjectLiteralExpression(node)) {
    let slug = '', q = '', title = '', excerpt = '', saProp = null;
    let oldSA = '';

    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
        const name = prop.name.text;
        if (ts.isStringLiteral(prop.initializer) || ts.isNoSubstitutionTemplateLiteral(prop.initializer)) {
          const val = prop.initializer.text;
          if (name === 'slug') slug = val;
          if (name === 'shortAnswerQuestion') q = val;
          if (name === 'title') title = val;
          if (name === 'excerpt') excerpt = val;
          if (name === 'shortAnswer') {
            saProp = prop; // Capture the full PropertyAssignment node
            oldSA = val;
          }
        }
      }
    }

    if (slug && q && title && excerpt && saProp) {
        // Skip already fixed good ones
        if (!oldSA.includes('Yes — several major Canadian grant deadlines') && 
            !oldSA.includes('Yes — Q1 2026 (January–March) is one') &&
            !oldSA.includes('Yes — Canadian businesses looking to grow')) {
            const newAnswer = generateAnswer(q, title, excerpt);
            // Replace the full node (e.g. `shortAnswer: "..."`)
            replacements.push({
                start: saProp.getStart(),
                end: saProp.getEnd(),
                text: `shortAnswer: ${JSON.stringify(newAnswer)}`
            });
        }
    }
  }
  ts.forEachChild(node, visit);
}

visit(sourceFile);

// Filter out duplicates that might occur if a node was visited twice by the walker
const uniqueReplacements = [];
const seenStarts = new Set();
for (const r of replacements) {
    if (!seenStarts.has(r.start)) {
        seenStarts.add(r.start);
        uniqueReplacements.push(r);
    }
}

// Apply replacements from top to bottom (sorted descending to preserve indices)
uniqueReplacements.sort((a, b) => b.start - a.start);

let finalCode = src;
for (const r of uniqueReplacements) {
    finalCode = finalCode.slice(0, r.start) + r.text + finalCode.slice(r.end);
}

fs.writeFileSync(FILE, finalCode, 'utf8');
console.log(`Successfully rewrote ${uniqueReplacements.length} shortAnswers via AST PropertyAssignment replacement.`);
