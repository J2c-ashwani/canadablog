import { blogPosts } from '../lib/data/blogPosts';
import fs from 'fs';

const dirs = fs.readdirSync('app/blog');
const missing = [];
for (const dir of dirs) {
  if (dir !== '[slug]' && fs.statSync(`app/blog/${dir}`).isDirectory()) {
    const found = blogPosts.find(p => p.slug === dir);
    if (!found) {
      missing.push(dir);
    }
  }
}
console.log('Total static dirs:', dirs.filter(d => d !== '[slug]' && fs.statSync(`app/blog/${d}`).isDirectory()).length);
console.log('Missing from blogPosts.ts:', missing.length);
if (missing.length > 0) console.log(missing);
