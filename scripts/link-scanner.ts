import fs from 'fs';
import path from 'path';

import { getAllBlogPosts } from '../lib/data/blogPosts';
const validBlogSlugs = new Set(getAllBlogPosts().map(p => '/blog/' + p.slug));

// Standard root + canada static routes
const validAppRoutes = new Set([
  '/', '/about', '/contact', '/expert-insights', '/grant-news',
  '/canada', '/canada/government-grants', '/canada/small-business-grants',
  '/canada/innovation-grants', '/canada/women-business-grants',
  '/canada/indigenous-entrepreneur-grants', '/usa', '/usa/technology-startup-grants'
]);

// Read state names using raw fs to avoid import issues
const statePath = path.join(process.cwd(), 'lib/data/stateDetails.ts');
const stateText = fs.readFileSync(statePath, 'utf8');
const stateMatches = [...stateText.matchAll(/name:\s*['"]([^'"]+)['"]/g)];
stateMatches.forEach(m => {
  const slug = m[1].toLowerCase().replace(/\s+/g, '-');
  validAppRoutes.add('/usa/' + slug);
});

// Download routes
const downloads = [
  '/download/alberta-business-grants-kit',
  '/download/agriculture-agri-food-application-kit',
  '/download/bc-women-business-grants-guide',
  '/download/british-columbia-grants-kit',
  '/download/cdap-application-kit',
  '/download/indigenous-women-business-grants-guide',
  '/download/ontario-business-grants-kit',
  '/download/sif-application-kit'
];
downloads.forEach(d => {
  validAppRoutes.add(d);
  validAppRoutes.add(d + '/thank-you');
});

function walkDir(dir: string, exts: string[]): string[] {
  const out: string[] = [];
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) out.push(...walkDir(full, exts));
      else if (entry.isFile() && exts.includes(path.extname(entry.name).toLowerCase())) out.push(full);
    }
  } catch(e) {}
  return out;
}

const root = '/Users/ashwanikumar/Downloads/canadablog';
const files = [...walkDir(path.join(root, 'app'), ['.ts', '.tsx']), ...walkDir(path.join(root, 'lib/data'), ['.ts'])];

const broken = [];
let totalLinksChecked = 0;

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const linkRegex = /href=["'](\/[a-z0-9\/-]+)["']/gi;
  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    let href = match[1];
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.includes('[')) continue;
    if (href !== '/' && href.endsWith('/')) href = href.slice(0, -1);
    if (href.startsWith('/images/') || href.startsWith('/api/') || href.startsWith('/fonts/') || href.startsWith('/assets/')) continue;
    
    totalLinksChecked++;
    let isBroken = false;
    
    if (href.startsWith('/blog/')) {
      if (!validBlogSlugs.has(href)) isBroken = true;
    } else if (href.startsWith('/usa/')) {
      // Allow dynamic city routes like /usa/texas/austin to pass validation for this check
      if (href.split('/').length <= 3 && !validAppRoutes.has(href)) isBroken = true;
    } else if (href.startsWith('/guides/')) {
      // Checking guides requires fs check
      const guidePath = path.join(root, 'app', href, 'page.tsx');
      if (!fs.existsSync(guidePath)) isBroken = true;
    } else {
      if (!validAppRoutes.has(href)) isBroken = true;
    }
    
    if (isBroken) {
      broken.push({ file: path.relative(root, file), href });
    }
  }
}

console.log('Total files scanned: ' + files.length);
console.log('Total internal links checked: ' + totalLinksChecked);

if (broken.length === 0) {
  console.log('\n✅ ZERO BROKEN LINKS FOUND ACROSS THE ENTIRE REPOSITORY!');
} else {
  // Deduplicate and group by href
  const report: Record<string, Set<string>> = {};
  for (const b of broken) {
    if (!report[b.href]) report[b.href] = new Set();
    report[b.href].add(b.file);
  }
  
  console.log('\n⚠️  Found ' + Object.keys(report).length + ' uniquely broken links:');
  for (const [href, fset] of Object.entries(report)) {
    console.log('\n❌ ' + href);
    console.log('   in: ' + Array.from(fset).join(', '));
  }
}
