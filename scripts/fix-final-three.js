const fs = require('fs');
const ts = require('typescript');

const FILE = 'lib/data/blogPosts.ts';
let src = fs.readFileSync(FILE, 'utf8');

function extractAmounts(text = '') {
  const m = text.match(/\$[\d.,]+[MKB]?(\+)?/g) || [];
  return [...new Set(m)].slice(0, 3);
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
  const mainAmount = amounts[0] || '';
  const secondAmount = amounts[1] || '';
  const shortExcerpt = shortenExcerpt(excerpt, 200);
  const amountStr = mainAmount ? ` Funding available: up to ${mainAmount}${secondAmount ? ` (with related programs offering ${secondAmount})` : ''}.` : '';

  let raw = '';
  if (ql.includes('how can my business apply') || ql.includes('how do i apply') || ql.includes('how to apply')) {
    raw = `To apply for ${cleanT}, start by reviewing the eligibility criteria and preparing a project proposal. ${shortExcerpt}${amountStr}`;
  } else {
    raw = `Yes — ${shortExcerpt}${amountStr}`;
  }
  return raw.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}

const sourceFile = ts.createSourceFile('blogPosts.ts', src, ts.ScriptTarget.Latest, true);
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
        if (oldSA.includes('provides valuable funding in non-repayable') || oldSA.includes('Scale your factory with Canadian government grants')) {
            const newAnswer = generateAnswer(q, title, excerpt);
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

replacements.sort((a, b) => b.start - a.start);
for (const r of replacements) {
    src = src.slice(0, r.start) + r.text + src.slice(r.end);
}

fs.writeFileSync(FILE, src, 'utf8');
console.log(`Fixed last ${replacements.length} stragglers.`);
