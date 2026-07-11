import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const blogContentDir = path.resolve(__dirname, '../lib/data/blog-content');
const commit = 'da97d48^';

// Get list of deleted files in the migration commit
const output = execSync(`git show --name-status da97d48 | grep "D\tapp/blog/"`, { encoding: 'utf8' });
const lines = output.split('\n').filter(Boolean);

console.log(`Found ${lines.length} deleted React blog pages in commit da97d48.`);

let restoredCount = 0;

for (const line of lines) {
  const parts = line.split('\t');
  const filePath = parts[1]; // e.g. app/blog/nih-sbir-biotech-grants/page.tsx
  const slug = filePath.split('/')[2];
  const jsonPath = path.join(blogContentDir, `${slug}.json`);

  if (!fs.existsSync(jsonPath)) {
    console.log(`⚠️ JSON file not found for slug: ${slug}`);
    continue;
  }

  try {
    // Get original React JSX content from git history
    const jsxContent = execSync(`git show ${commit}:${filePath}`, { encoding: 'utf8' });
    
    // Parse the JSX content to extract paragraph text, headers, and lists
    const htmlBody = extractHtmlFromJsx(jsxContent);
    
    if (htmlBody.trim()) {
      const jsonContent = fs.readFileSync(jsonPath, 'utf8');
      const data = JSON.parse(jsonContent);
      
      // Update content field
      data.content = htmlBody;
      
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
      console.log(`✅ Restored content for slug: ${slug} (${htmlBody.length} chars)`);
      restoredCount++;
    } else {
      console.log(`⚠️ No content extracted for slug: ${slug}`);
    }
  } catch (err: any) {
    console.log(`❌ Error restoring content for slug ${slug}:`, err.message);
  }
}

console.log(`Successfully restored ${restoredCount} content pages.`);

/**
 * Extracts and reconstructs clean HTML from the raw JSX page content.
 */
function extractHtmlFromJsx(jsx: string): string {
  const lines = jsx.split('\n');
  const extracted: string[] = [];
  let inFaq = false;
  let inStats = false;
  let inHero = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip import declarations and metadata block
    if (line.startsWith('import ') || line.startsWith('export const metadata')) {
      continue;
    }

    // Identify and skip hero/FAQ/statistics blocks to avoid duplicating metadata layout
    if (line.includes('FAQ Section') || line.includes('faqData =') || line.includes('FAQPage')) {
      inFaq = true;
      continue;
    }
    if (inFaq && line.includes('</section>')) {
      inFaq = false;
      continue;
    }
    if (inFaq) continue;

    if (line.includes('Hero Section') || line.includes('bg-gradient-to-br')) {
      inHero = true;
      continue;
    }
    if (inHero && line.includes('</section>')) {
      inHero = false;
      continue;
    }
    if (inHero) continue;

    if (line.includes('Alberta Statistics') || line.includes('Quick Funding Facts') || line.includes('Summary Performance Scorecard')) {
      inStats = true;
      continue;
    }
    if (inStats && line.includes('</section>')) {
      inStats = false;
      continue;
    }
    if (inStats) continue;

    // Extract H2 headers
    const h2Match = line.match(/<h2[^>]*>(.*?)<\/h2>/);
    if (h2Match) {
      const cleanText = cleanJsxString(h2Match[1]);
      if (cleanText) extracted.push(`<h2>${cleanText}</h2>`);
      continue;
    }

    // Extract H3 headers / Card titles
    const h3Match = line.match(/<h3[^>]*>(.*?)<\/h3>/) || line.match(/<CardTitle[^>]*>(.*?)<\/CardTitle>/);
    if (h3Match) {
      const cleanText = cleanJsxString(h3Match[1]);
      if (cleanText) extracted.push(`<h3>${cleanText}</h3>`);
      continue;
    }

    // Extract Paragraphs
    const pMatch = line.match(/<p className="[^"]*(?:text-gray-700|text-gray-800|text-gray-600|leading-relaxed)[^"]*">(.*?)<\/p>/) || line.match(/<p[^>]*>(.*?)<\/p>/);
    if (pMatch) {
      const cleanText = cleanJsxString(pMatch[1]);
      // Skip empty, short answers, or CTA-like phrases to prevent duplicates
      if (cleanText && cleanText.length > 30 && !cleanText.includes('The Short Answer') && !cleanText.includes('Apply Now') && !cleanText.includes('Eligibility Check')) {
        extracted.push(`<p>${cleanText}</p>`);
      }
      continue;
    }

    // Extract list items (bullet points)
    const liMatch = line.match(/<li[^>]*>(.*?)<\/li>/);
    if (liMatch) {
      const cleanText = cleanJsxString(liMatch[1]).replace(/^[•\-\s]+/, ''); // remove bullet symbols
      if (cleanText) {
        // Group list items
        if (extracted.length > 0 && extracted[extracted.length - 1].endsWith('</ul>')) {
          const last = extracted.pop()!;
          extracted.push(last.replace('</ul>', `  <li>${cleanText}</li>\n</ul>`));
        } else {
          extracted.push(`<ul>\n  <li>${cleanText}</li>\n</ul>`);
        }
      }
      continue;
    }
  }

  // Join sections with clean line breaks
  return extracted.join('\n\n');
}

/**
 * Cleans up JSX string values by removing curly brackets and dynamic components
 */
function cleanJsxString(str: string): string {
  let clean = str
    .replace(/\{\s*postData\?.date\s*\|\|\s*"[^"]*"\s*\}/g, '')
    .replace(/\{[^{}]*\}/g, '') // remove generic javascript curly braces
    .replace(/<AutoLink[^>]*>(.*?)<\/AutoLink>/g, '$1') // unwrap AutoLinks
    .replace(/<Link[^>]*>(.*?)<\/Link>/g, '$1') // unwrap Next Links
    .replace(/<strong[^>]*>(.*?)<\/strong>/g, '<strong>$1</strong>')
    .replace(/<a[^>]*>(.*?)<\/a>/g, '<a>$1</a>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/<\/?[A-Z][a-zA-Z0-9]*[^>]*>/g, '') // strip React components
    .replace(/<\/?[a-z]+[^>]*>/g, (m) => {
      // Allow only safe HTML tags: strong, p, h2, h3, ul, li, ol
      if (m.startsWith('<strong') || m.startsWith('</strong') || m.startsWith('<a') || m.startsWith('</a')) {
        return m;
      }
      return '';
    })
    .trim();
  
  return clean;
}
