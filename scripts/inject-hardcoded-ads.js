const fs = require('fs');
const path = require('path');

const DIRS = [
  path.join(__dirname, '../app/blog'),
  path.join(__dirname, '../app/guides')
];

const ADSLOT_IMPORT = "import AdSlot from '@/components/blog/AdSlot';";

const HEADER_AD = `
      <div className="container mx-auto px-4 py-4">
        <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_HEADER_AD!} adFormat="horizontal" className="mb-6" style={{ minHeight: '90px' }} />
      </div>`;

const CONTENT_AD = `
        <div className="container mx-auto px-4 py-8">
          <AdSlot adSlot={process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_RECTANGLE!} adFormat="rectangle" style={{ minHeight: 250 }} />
        </div>`;

let filesModified = 0;

function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  const entries = fs.readdirSync(dirPath);
  
  entries.forEach(entry => {
    if (entry === '[slug]') return; // Skip dynamic routes
    
    const pagePath = path.join(dirPath, entry, 'page.tsx');
    if (!fs.existsSync(pagePath)) return;
    
    let content = fs.readFileSync(pagePath, 'utf8');
    let modified = false;
    
    // Add import if missing
    if (!content.includes('AdSlot from')) {
      const importMatches = [...content.matchAll(/^import /gm)];
      if (importMatches.length > 0) {
        const lastImportIndex = importMatches[importMatches.length - 1].index;
        const insertPosition = content.indexOf('\n', lastImportIndex) + 1;
        content = content.slice(0, insertPosition) + ADSLOT_IMPORT + '\n' + content.slice(insertPosition);
        modified = true;
      }
    }

    // Inject Header Ad right after <Header />
    if (content.includes('<Header />') && !content.includes('NEXT_PUBLIC_ADSENSE_HEADER_AD')) {
      content = content.replace('<Header />', '<Header />' + HEADER_AD);
      modified = true;
    }

    // Inject Content Ad before FAQ section or process section
    if (!content.includes('NEXT_PUBLIC_ADSENSE_IN_CONTENT_RECTANGLE')) {
      if (content.includes('<section id="faq"')) {
        content = content.replace('<section id="faq"', CONTENT_AD + '\n        <section id="faq"');
        modified = true;
      } else if (content.includes('<section id="process"')) {
        content = content.replace('<section id="process"', CONTENT_AD + '\n        <section id="process"');
        modified = true;
      } else if (content.includes('{/* CTA */}')) {
         content = content.replace('{/* CTA */}', CONTENT_AD + '\n        {/* CTA */}');
         modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(pagePath, content, 'utf8');
      filesModified++;
      console.log(`Injected ads into: ${entry}/page.tsx`);
    }
  });
}

DIRS.forEach(dir => processDirectory(dir));
console.log(`\\nComplete! Modified ${filesModified} files.`);
