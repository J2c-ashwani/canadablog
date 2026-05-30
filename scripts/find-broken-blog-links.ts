import fs from 'fs';
import path from 'path';
import { getBlogPostBySlug } from '../lib/data/blogPosts';

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
    hits[slug].add(path.relative(root, file));
  }
}

const slugs = Object.keys(hits).sort();
const missing = slugs.filter((slug) => !getBlogPostBySlug(slug));

console.log(`Found ${slugs.length} unique /blog/ links in app/`);
if (missing.length === 0) {
  console.log('✅ All linked /blog/ slugs resolve to a post.');
  process.exit(0);
}

console.log(`\n⚠️  ${missing.length} missing /blog/ slugs (no post found):\n`);
for (const slug of missing) {
  console.log(`- ${slug}`);
  for (const file of hits[slug]) {
    console.log(`    referenced in: ${file}`);
  }
}

console.log(`\nTip: Add the missing post to lib/data/blogPosts.ts (or remove/update the link).`);
