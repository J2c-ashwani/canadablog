const fs = require('fs');
const path = require('path');

function extractGeneric(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const extract = [];

    for (let i = 0; i < lines.length; i++) {
        const sm = lines[i].match(/slug:\s*["']([^"']+)["']/);
        if (sm) {
            let isGeneric = false;
            for (let j = i; j < i + 60 && j < lines.length; j++) {
                if (lines[j].includes('shortAnswer:') && lines[j].includes('Our guide covers eligibility')) {
                    isGeneric = true;
                    break;
                }
                if (lines[j].includes('shortAnswer:') && lines[j].includes('Our comprehensive guide covers all eligible')) {
                    isGeneric = true;
                    break;
                }
            }

            if (isGeneric) {
                let title = '', excerpt = '';
                for (let k = i - 3; k < i + 15 && k < lines.length; k++) {
                    if (k < 0) continue;
                    const tm = lines[k].match(/title:\s*"(.*?)"/);
                    if (tm && !title) title = tm[1];
                    const em = lines[k].match(/excerpt:\s*"(.*?)"/);
                    if (em && !excerpt) excerpt = em[1];
                }
                extract.push({ slug: sm[1], title, excerpt });
            }
        }
    }
    return extract;
}

const blogDocs = extractGeneric(path.join(__dirname, '..', 'lib/data/blogPosts.ts'));
const guideDocs = extractGeneric(path.join(__dirname, '..', 'lib/data/guides.ts'));

fs.writeFileSync(path.join(__dirname, 'generic-extract.json'), JSON.stringify({ blogs: blogDocs, guides: guideDocs }, null, 2));
console.log(`Extracted ${blogDocs.length} blogs and ${guideDocs.length} guides.`);
