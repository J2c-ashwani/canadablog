import fs from 'fs';
import path from 'path';

export const blogPostsFile = 'lib/data/blogPosts.ts';

function doRun() {
  const dirs = fs.readdirSync('app/blog');
  for(let dir of dirs) {
    let p = path.join('app/blog', dir);
    if(fs.statSync(p).isDirectory() && dir !== '[slug]') {
      console.log("Analyzing:", dir);
      let pagePath = path.join(p, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        let content = fs.readFileSync(pagePath, 'utf8');
        let hasDynamicHead = content.match(/<Head>/i);
        let hasMeta = content.match(/metadata/i);
        console.log(`- Head: ${!!hasDynamicHead}, Meta: ${!!hasMeta}`);
      }
    }
  }
}
doRun();
