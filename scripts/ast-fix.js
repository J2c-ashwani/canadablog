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
            saProp = prop;
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
            // Just replace the string literal token span exactly
            replacements.push({
                start: saProp.initializer.getStart(),
                end: saProp.initializer.getEnd(),
                text: JSON.stringify(newAnswer)
            });
        }
    }
  }
  ts.forEachChild(node, visit);
}

visit(sourceFile);

// Apply replacements from top to bottom (sorted descending to preserve indices)
replacements.sort((a, b) => b.start - a.start);

let finalCode = src;
for (const r of replacements) {
    finalCode = finalCode.slice(0, r.start) + r.text + finalCode.slice(r.end);
}

fs.writeFileSync(FILE, finalCode, 'utf8');
console.log(`Successfully rewrote ${replacements.length} shortAnswers via AST parsing.`);
