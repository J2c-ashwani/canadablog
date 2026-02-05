// check-enrichment.mjs - Script to find non-enriched blog posts
import fs from 'fs';

const content = fs.readFileSync('lib/data/blogPosts.ts', 'utf8');

// Extract all blog posts using a different approach
// Find each blog post object by matching the pattern
const postPattern = /\{\s*id:\s*(\d+),\s*slug:\s*"([^"]+)",[\s\S]*?(?=\n\s*\{|\n];)/g;

let results = [];
let match;

// Split the blogPosts array content
const arrayStart = content.indexOf('export const blogPosts');
const arrayContent = content.slice(arrayStart);

// Find each post entry
const matches = arrayContent.matchAll(/\{\s*id:\s*(\d+),[\s\S]*?slug:\s*"([^"]+)"[\s\S]*?(?:metrics:\s*\[[\s\S]*?\]|expertTip:\s*\{[\s\S]*?\})?[\s\S]*?\n\s*\}/g);

let enriched = [];
let notEnriched = [];

for (const m of matches) {
  const block = m[0];
  const hasMetrics = block.includes('metrics:');
  const hasExpertTip = block.includes('expertTip:');
  const id = m[1];
  
  // Extract slug more carefully
  const slugMatch = block.match(/slug:\s*"([^"]+)"/);
  const slug = slugMatch ? slugMatch[1] : 'unknown';
  
  // Extract title
  const titleMatch = block.match(/title:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1].substring(0, 60) : 'unknown';
  
  if (hasMetrics && hasExpertTip) {
    enriched.push({ id, slug, title });
  } else {
    notEnriched.push({ id, slug, title, hasMetrics, hasExpertTip });
  }
}

console.log('=== BLOG POST ENRICHMENT STATUS ===\n');
console.log(`Fully Enriched (INDEXED): ${enriched.length} posts`);
console.log(`Not Enriched (NOINDEX): ${notEnriched.length} posts`);
console.log(`\n--- Posts MISSING metrics OR expertTip (top 30): ---\n`);

notEnriched.slice(0, 30).forEach((p, i) => {
  console.log(`${i+1}. [ID ${p.id}] ${p.slug}`);
  console.log(`   Title: ${p.title}...`);
  console.log(`   Has metrics: ${p.hasMetrics}, Has expertTip: ${p.hasExpertTip}\n`);
});
