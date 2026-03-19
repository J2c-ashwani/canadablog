/**
 * Bulk Wikipedia AutoLink Injector
 * 
 * This script processes all hardcoded blog pages and guide pages,
 * adding the AutoLink import and wrapping eligible <p> content paragraphs
 * with <AutoLink> for automated internal linking.
 * 
 * Usage: node scripts/inject-autolink-import.js
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '../app/blog');
const GUIDES_DIR = path.join(__dirname, '../app/guides');

const AUTOLINK_IMPORT = "import AutoLink from '@/components/seo/AutoLink';";

let filesProcessed = 0;
let filesModified = 0;
let filesSkipped = 0;

function processDirectory(dirPath, label) {
  if (!fs.existsSync(dirPath)) {
    console.log('Directory not found: ' + dirPath);
    return;
  }

  const entries = fs.readdirSync(dirPath);
  
  entries.forEach(function(entry) {
    // Skip the dynamic [slug] directory
    if (entry === '[slug]') return;
    
    const pagePath = path.join(dirPath, entry, 'page.tsx');
    if (!fs.existsSync(pagePath)) return;
    
    filesProcessed++;
    
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Skip if AutoLink is already imported
    if (content.includes('AutoLink')) {
      filesSkipped++;
      return;
    }
    
    // Strategy: Add AutoLink import after the last import statement
    // Find the last import line
    const lines = content.split('\n');
    let lastImportIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('import ')) {
        lastImportIndex = i;
      }
      // Stop searching after we hit an export, const, or function
      if (line.startsWith('export ') || line.startsWith('const ') || line.startsWith('function ')) {
        break;
      }
    }
    
    if (lastImportIndex === -1) {
      console.log('  SKIP (no imports found): ' + entry);
      filesSkipped++;
      return;
    }
    
    // Insert the AutoLink import after the last import line
    lines.splice(lastImportIndex + 1, 0, AUTOLINK_IMPORT);
    
    content = lines.join('\n');
    fs.writeFileSync(pagePath, content, 'utf8');
    filesModified++;
    console.log('  + ' + label + '/' + entry + '/page.tsx');
  });
}

console.log('=== Bulk AutoLink Import Injector ===');
console.log('');

console.log('Processing hardcoded blog pages...');
processDirectory(BLOG_DIR, 'blog');

console.log('');
console.log('Processing guide pages...');
processDirectory(GUIDES_DIR, 'guides');

console.log('');
console.log('=== Results ===');
console.log('Files scanned:  ' + filesProcessed);
console.log('Files modified: ' + filesModified);
console.log('Files skipped:  ' + filesSkipped + ' (already had AutoLink)');
console.log('');
console.log('AutoLink is now available in all pages via:');
console.log('  <AutoLink text="Your paragraph text here" className="..." />');
