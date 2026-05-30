import fs from 'fs';
import path from 'path';
import { getAllBlogPosts, getBlogPostBySlug } from '../lib/data/blogPosts';

// Simple Levenshtein distance implementation
function levenshtein(a: string, b: string): number {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Recursively find files under a directory matching extensions
function walkDir(dir: string, extensions: string[]) {
  const out: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkDir(full, extensions));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (extensions.includes(ext)) out.push(full);
    }
  }
  return out;
}

const root = path.join(__dirname, '..');
const appDir = path.join(root, 'app');
const files = walkDir(appDir, ['.ts', '.tsx', '.js', '.jsx']);
const linkRegex = /href=["']\/blog\/(?<slug>[a-z0-9-]+)["']/gi;

const hits: Record<string, Set<string>> = {};

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    const slug = match.groups?.slug;
    if (!slug) continue;
    hits[slug] = hits[slug] ?? new Set();
    hits[slug].add(file);
  }
}

const slugs = Object.keys(hits).sort();
const missing = slugs.filter((slug) => !getBlogPostBySlug(slug));
const existingSlugs = getAllBlogPosts().map(p => p.slug);

console.log(`Found ${missing.length} missing slugs to fix.`);

const fixes: Record<string, { newSlug: string; distance: number; files: string[] }> = {};

for (const missingSlug of missing) {
  let bestMatch = '';
  let minDist = Infinity;
  for (const existing of existingSlugs) {
    const dist = levenshtein(missingSlug, existing);
    if (dist < minDist) {
      minDist = dist;
      bestMatch = existing;
    }
  }
  if (minDist <= 5) { // Threshold for auto-fix
    fixes[missingSlug] = { newSlug: bestMatch, distance: minDist, files: Array.from(hits[missingSlug]) };
  } else if (missingSlug.endsWith('-2025')) {
    // Special case: if missing slug ends with -2025, assume it was renamed to -2026
    const newSlug2026 = missingSlug.replace('-2025', '-2026');
    if (existingSlugs.includes(newSlug2026)) {
      fixes[missingSlug] = { newSlug: newSlug2026, distance: 0, files: Array.from(hits[missingSlug]) };
    }
  } else {
    console.log(`No close match for ${missingSlug} (min dist: ${minDist} to ${bestMatch})`);
  }
}

console.log(`\nApplying ${Object.keys(fixes).length} auto-fixes...`);

for (const [oldSlug, { newSlug, files }] of Object.entries(fixes)) {
  for (const file of files) {
    let text = fs.readFileSync(file, 'utf8');
    const oldHref = `/blog/${oldSlug}`;
    const newHref = `/blog/${newSlug}`;
    if (text.includes(oldHref)) {
      text = text.replace(new RegExp(oldHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newHref);
      fs.writeFileSync(file, text, 'utf8');
      console.log(`Updated ${path.relative(root, file)}: ${oldHref} -> ${newHref}`);
    }
  }
}

console.log('\nDone. Re-run the broken links checker to verify.');
