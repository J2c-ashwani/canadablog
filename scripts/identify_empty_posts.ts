
import fs from 'fs';
import path from 'path';
import { blogPosts } from '../lib/data/blogPosts';

const blogDir = path.join(process.cwd(), 'app', 'blog');
const allSlugs = blogPosts.map(p => p.slug);
const existingDirs = fs.readdirSync(blogDir).filter(f => fs.statSync(path.join(blogDir, f)).isDirectory());

const missing = allSlugs.filter(slug => !existingDirs.includes(slug));

console.log(`Total Blog Posts in Data: ${allSlugs.length}`);
console.log(`Total Static Blog Folders: ${existingDirs.length}`);
console.log(`Missing/Dynamic Posts (Expected Empty): ${missing.length}`);
console.log('\nList of Empty Posts (Dynamic [slug]):');
missing.forEach(m => console.log(`- ${m}`));
