import fs from 'fs';
import path from 'path';
import { getSortedKeywordMap, KeywordLink } from '../lib/seo/keywordMap';

const BLOG_CONTENT_DIR = path.join(__dirname, '../lib/data/blog-content');
// const GUIDE_CONTENT_DIR = path.join(__dirname, '../lib/data/guide-content'); // Add if guides use JSON

function applyWikipediaLinks(html: string): { newHtml: string, linksAdded: number } {
  if (!html) return { newHtml: html, linksAdded: 0 };

  const keywordMap = getSortedKeywordMap();
  const linkedUrls = new Set<string>();
  let linksAdded = 0;
  
  // Create a regex for all keywords
  // Escape regex special chars
  const escapedKeywords = keywordMap.map(k => k.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const keywordPattern = escapedKeywords.join('|');
  
  // This incredible regex matches:
  // Group 1: <a>...</a> OR <h1-6>...</h1-6> OR <button>...</button>
  // Group 2: The actual keywords (bounded by word boundaries)
  const masterRegex = new RegExp(`(<a[^>]*>.*?<\\/a>|<h[1-6][^>]*>.*?<\\/h[1-6]>|<button[^>]*>.*?<\\/button>)|\\b(${keywordPattern})\\b`, 'gi');

  const newHtml = html.replace(masterRegex, (match, ignoreGroup, matchedKeyword) => {
    // 1. If it's an HTML tag we want to ignore, return it untouched.
    if (ignoreGroup) return match;

    // 2. We found a keyword! Let's find exactly which one from our dictionary.
    const lowerMatch = matchedKeyword.toLowerCase();
    const keywordObj = keywordMap.find(k => k.keyword.toLowerCase() === lowerMatch);
    
    if (!keywordObj) return match; // Fallback, shouldn't happen

    // 3. Spam Protection: Only link to a specific URL ONCE per article.
    // If we've already linked to "/usa/texas", don't link the word "Texas" again.
    if (linkedUrls.has(keywordObj.url)) {
      return match;
    }

    // 4. Wrap the word in an SEO-optimized internal link.
    // Use standard <a> tag. React dangerouslySetInnerHTML handles routing perfectly for standard links.
    linkedUrls.add(keywordObj.url);
    linksAdded++;
    
    return `<a href="${keywordObj.url}" class="text-blue-600 hover:text-blue-800 underline decoration-blue-200 decoration-2 underline-offset-2 transition-colors font-medium wikipedia-link">${matchedKeyword}</a>`;
  });

  return { newHtml, linksAdded };
}

async function run() {
  console.log('🤖 Starting Omni-Channel Wikipedia Linker...');

  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    console.error(`Directory not found: ${BLOG_CONTENT_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(BLOG_CONTENT_DIR).filter(f => f.endsWith('.json'));
  let totalLinks = 0;
  let filesModified = 0;

  for (const file of files) {
    const filePath = path.join(BLOG_CONTENT_DIR, file);
    try {
      const db = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      if (!db.content) continue;

      const { newHtml, linksAdded } = applyWikipediaLinks(db.content);
      
      if (linksAdded > 0) {
        db.content = newHtml;
        fs.writeFileSync(filePath, JSON.stringify(db, null, 2), 'utf8');
        filesModified++;
        totalLinks += linksAdded;
        console.log(`✅ [${file}]: Added ${linksAdded} contextual links`);
      }
    } catch (err) {
      console.error(`❌ Error parsing ${file}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.log(`\n🎉 DONE! Injected ${totalLinks} contextual internal links across ${filesModified} articles.`);
  console.log(`Rankings to the moon 🚀`);
}

run().catch(console.error);
