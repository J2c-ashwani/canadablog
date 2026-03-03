import fs from 'fs';
import path from 'path';

function run() {
  const dirs = fs.readdirSync('app/blog');
  for (const dir of dirs) {
    if (dir === '[slug]') continue;
    const p = path.join('app/blog', dir);
    if (!fs.statSync(p).isDirectory()) continue;
    const pagePath = path.join(p, 'page.tsx');
    if (!fs.existsSync(pagePath)) continue;
    
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Check if it already has export metadata setup
    if (content.match(/export (const|function) metadata/i) || content.match(/generateMetadata/)) {
      continue;
    }

    // Try to find the title
    let pageTitleMatch = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || 
                         content.match(/title="([\s\S]*?)"/i) || 
                         content.match(/<title>([\s\S]*?)<\/title>/i) ||
                         content.match(/<PageHero[^>]+title=\{?"([^"]+)"\}?/i);
                         
    let pageTitle = dir.replace(/-/g, ' '); // fallback
    if (pageTitleMatch && pageTitleMatch[1]) {
      pageTitle = pageTitleMatch[1].replace(/<[^>]+>/g, '').trim().replace(/\n/g, ' ').replace(/"/g, "'");
    }
    
    const metaBlock = `import { generateMetadata as baseGenerateMetadata } from '@/lib/seo';

export function generateMetadata() {
  return baseGenerateMetadata({
    title: "${pageTitle}",
    description: "Discover comprehensive details about the ${pageTitle}. Check eligibility, requirements, and application procedures.",
    seo: { focusKeyword: "${pageTitle.split(' ').slice(0, 4).join(' ')}" }
  });
}
`;

    // Add to the top after imports!
    let importEndPositions = [...content.matchAll(/^import /gm)];
    let importEnd = -1;
    if (importEndPositions.length > 0) {
      let lastImport = importEndPositions[importEndPositions.length - 1];
      importEnd = lastImport.index;
      let nextLine = content.indexOf('\n', importEnd);
      // Ensure we go past multi-line imports if possible roughly
      let semiEnd = content.indexOf(';', nextLine);
      if (semiEnd - nextLine < 100 && semiEnd !== -1) nextLine = semiEnd + 1;
      
      content = content.slice(0, nextLine) + '\n\n' + metaBlock + '\n' + content.slice(nextLine);
    } else {
      content = metaBlock + '\n' + content;
    }

    fs.writeFileSync(pagePath, content);
    console.log(`Added optimized metadata to: ${dir} -> Title: ${pageTitle}`);
  }
}
run();
