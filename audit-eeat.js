const fs = require('fs');
const path = require('path');

const blogDir = '/Users/ashwanikumar/.gemini/antigravity/scratch/canadablog/app/blog';
const dirs = fs.readdirSync(blogDir).filter(d => {
  return fs.statSync(path.join(blogDir, d)).isDirectory() && d !== '[slug]';
});

const results = [];

for (const dir of dirs) {
  const pagePath = path.join(blogDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;
  const content = fs.readFileSync(pagePath, 'utf8');

  const hasSA = content.includes('ShortAnswerBox') || 
    (content.includes('shortAnswer') && content.includes('postData')) || 
    content.includes('The Short Answer:') ||
    content.includes('short-answer');
  const hasMetrics = content.includes('GrantSuccessTable') || content.includes('Quick Funding Facts');
  const hasET = content.includes('ExpertTipBox');
  const hasEC = content.includes('EligibleCheck');
  const hasEB = content.includes('EEATBadge');

  const missing = [];
  if (!hasSA) missing.push('ShortAnswer');
  if (!hasMetrics) missing.push('Metrics');
  if (!hasET) missing.push('ExpertTip');
  if (!hasEC) missing.push('EligibleCheck');
  if (!hasEB) missing.push('EEATBadge');

  const usaPatterns = ['usa', 'sba', 'sbir', 'federal-grants', 'wosb', 'wbdc', 'nwbc', 
    'state-', 'dod-', 'doe-', 'nih-', 'nsf-', 'nasa-', 'usda-', 
    'small-business-grants-complete', 'california', 'colorado', 'massachusetts', 
    'new-york', 'washington', 'industry-specific-business', 'private-women-grants', 
    'women-business-centers', 'women-tech-stem', 'hardware-iot', 'software-saas', 
    'cybersecurity', 'clean-tech-energy', 'biotech-life', 'ai-machine'];
  
  const canadaPatterns = ['canada', 'ontario', 'quebec', 'alberta', 'bc-', 'british-columbia', 
    'manitoba', 'saskatchewan', 'atlantic', 'prairie', 'territories', 'sred', 'irap', 
    'canexport', 'csbfp', 'nserc', 'strategic-innovation', 'scotiabank', 'bdc-', 'bmo-', 
    'rbc-', 'cartier', 'amber-grant', 'edc-', 'indigenous', 'youth-entrepreneurship', 
    'regional-development', 'women-entrepreneurship', 'women-clean-technology', 
    'women-export', 'women-manufacturing', 'women-social', 'women-technology-grants-canada', 
    'commercialization', 'demonstration-pilot', 'development-proof', 'ideation'];

  const isUSA = usaPatterns.some(p => dir.includes(p));
  const isCanada = canadaPatterns.some(p => dir.includes(p));

  let region = 'Other';
  if (isUSA) region = 'USA';
  if (isCanada) region = 'Canada';

  results.push({
    slug: dir,
    region,
    lines: content.split('\n').length,
    missing,
    mc: missing.length
  });
}

const needsWork = results.filter(r => r.mc > 0);
const complete = results.filter(r => r.mc === 0);
const canada = needsWork.filter(r => r.region === 'Canada');
const usa = needsWork.filter(r => r.region === 'USA');
const other = needsWork.filter(r => r.region === 'Other');

console.log('CANADA PAGES MISSING EEAT: ' + canada.length);
console.log('---');
canada.forEach((p, i) => {
  console.log((i + 1) + '. ' + p.slug + ' (' + p.lines + ' lines) - Missing: ' + p.missing.join(', '));
});

console.log('');
console.log('USA PAGES MISSING EEAT: ' + usa.length);
console.log('---');
usa.forEach((p, i) => {
  console.log((i + 1) + '. ' + p.slug + ' (' + p.lines + ' lines) - Missing: ' + p.missing.join(', '));
});

if (other.length > 0) {
  console.log('');
  console.log('OTHER PAGES MISSING EEAT: ' + other.length);
  console.log('---');
  other.forEach((p, i) => {
    console.log((i + 1) + '. ' + p.slug + ' (' + p.lines + ' lines) - Missing: ' + p.missing.join(', '));
  });
}

console.log('');
console.log('ALREADY COMPLETE: ' + complete.length);
complete.forEach(p => console.log('  OK ' + p.slug));

console.log('');
console.log('TOTAL: ' + results.length);
console.log('Needs work: ' + needsWork.length);
console.log('Already done: ' + complete.length);
console.log('Phases needed (10/phase): ' + Math.ceil(needsWork.length / 10));
