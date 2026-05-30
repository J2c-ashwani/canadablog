import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'app/blog');
const CONTENT_DIR = path.join(process.cwd(), 'lib/data/blog-content');

// Helper to convert TSX classNames and Lucide icons to raw HTML
function cleanTsxToHtml(tsxContent) {
    if (!tsxContent) return '';
    let html = tsxContent;
    
    // Remove Lucide icons
    html = html.replace(/<[A-Z][a-zA-Z]+ [^>]*className="[^"]*"[^>]*\/>/g, '');
    html = html.replace(/<[A-Z][a-zA-Z]+ [^>]*\/>/g, '');
    
    // Remove Card components and just keep their contents
    html = html.replace(/<Card[^>]*>/g, '<div class="card p-6 border rounded-lg mb-6 shadow-sm">');
    html = html.replace(/<\/Card>/g, '</div>');
    html = html.replace(/<CardHeader[^>]*>/g, '');
    html = html.replace(/<\/CardHeader>/g, '');
    html = html.replace(/<CardContent[^>]*>/g, '');
    html = html.replace(/<\/CardContent>/g, '');
    html = html.replace(/<CardTitle[^>]*>/g, '<h3 class="font-bold text-xl mb-4">');
    html = html.replace(/<\/CardTitle>/g, '</h3>');
    
    // Fix className -> class
    html = html.replace(/className=/g, 'class=');
    
    // Remove Next.js Links
    html = html.replace(/<Link href="([^"]+)"[^>]*>/g, '<a href="$1">');
    html = html.replace(/<\/Link>/g, '</a>');
    
    // Fix escaped quotes/apostrophes
    html = html.replace(/&apos;/g, "'");
    html = html.replace(/&quot;/g, '"');
    html = html.replace(/&amp;/g, '&');
    
    // Clean up empty lines
    html = html.replace(/^\s*[\r\n]/gm, '');
    
    return html.trim();
}

function processFolder(folderName) {
    const pagePath = path.join(BLOG_DIR, folderName, 'page.tsx');
    if (!fs.existsSync(pagePath)) return false;
    
    const contentPath = path.join(CONTENT_DIR, `${folderName}.json`);
    if (!fs.existsSync(contentPath)) {
        console.log(`[SKIP] No JSON data found for ${folderName}`);
        return false;
    }
    
    const tsx = fs.readFileSync(pagePath, 'utf8');
    
    // We want to extract content starting from <section id="overview"> up to the FAQ or Related sections
    // Many sections use id="..." like id="overview", id="programs", id="eligibility"
    
    // Regex to grab all sections with an id
    const sectionRegex = /<section id="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g;
    let match;
    
    let combinedHtml = '';
    let sectionsFound = 0;
    
    while ((match = sectionRegex.exec(tsx)) !== null) {
        let sectionId = match[1];
        let sectionInner = match[2];
        
        // Strip out container divs, keep the core semantic tags (h2, p, ul, table)
        // Find the first h2
        const h2Start = sectionInner.indexOf('<h2');
        if (h2Start !== -1) {
            sectionInner = sectionInner.substring(h2Start);
        }
        
        // Clean up the inner html of the section
        // We will remove standard wrappers like <div className="max-w-4xl mx-auto">
        let cleanHtml = cleanTsxToHtml(sectionInner);
        
        // Remove trailing </div> tags left over from stripping the outer container opening tag
        cleanHtml = cleanHtml.replace(/<\/div>$/g, '');
        cleanHtml = cleanHtml.replace(/<\/div>$/g, '');
        cleanHtml = cleanHtml.replace(/<\/div>$/g, '');
        
        combinedHtml += cleanHtml + '\n\n';
        sectionsFound++;
    }
    
    if (sectionsFound > 0) {
        // We found content! Let's update the JSON.
        const jsonData = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
        
        if (jsonData.content === "" || jsonData.content.length < 300) {
            jsonData.content = combinedHtml;
            fs.writeFileSync(contentPath, JSON.stringify(jsonData, null, 2));
            console.log(`[ SUCCESS ] Extracted ${sectionsFound} sections for ${folderName}. Added ${combinedHtml.length} bytes of content.`);
            
            // WE NOW RENAME the old hardcoded folder to disable it
            const disabledPath = path.join(BLOG_DIR, `${folderName}_DISABLED_MIGRATED`);
            fs.renameSync(path.join(BLOG_DIR, folderName), disabledPath);
            return true;
        } else {
             console.log(`[ KEEP ] ${folderName} already has content in JSON (${jsonData.content.length} bytes).`);
             return false;
        }
    } else {
        console.log(`[ WARN ] No <section id="..."> blocks found in ${folderName}.`);
        return false;
    }
}

function runMigration() {
    const folders = fs.readdirSync(BLOG_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('[') && !dirent.name.endsWith('_DISABLED_MIGRATED'))
        .map(dirent => dirent.name);
        
    console.log(`Found ${folders.length} hardcoded folders in app/blog/`);
    let migratedCount = 0;
    
    for (const folder of folders) {
        if (processFolder(folder)) {
            migratedCount++;
        }
    }
    
    console.log(`\nMigration Complete: Migrated ${migratedCount} hardcoded folders into dynamic JSON.`);
}

runMigration();
