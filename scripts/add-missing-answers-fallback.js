const fs = require('fs');
const path = require('path');

function generateAnswer(slug, title, excerpt, metrics) {
    const fundingMatch = title.match(/\$[\d,.]+[KMBkb]?\+?/);
    const funding = fundingMatch ? fundingMatch[0] : null;

    const programNames = [];
    const programPatterns = [
        /(?:through |via |including |Access )([\w\s&]+(?:Program|Fund|Initiative|Grant|Credit|Agency))/gi,
        /(SR&ED|IRAP|SBIR|STTR|CDAP|ACOA|NGen|SDTC|SIF|BDC|EDC|CanExport|Futurpreneur|WeBC|Scale AI)/g,
    ];
    for (const pat of programPatterns) {
        const matches = [...(excerpt || '').matchAll(pat), ...(title || '').matchAll(pat)];
        for (const m of matches) {
            const name = (m[1] || m[0]).trim();
            if (name.length > 2 && name.length < 50 && !programNames.includes(name)) {
                programNames.push(name);
            }
        }
    }

    const topMetrics = (metrics || []).slice(0, 2).map(m => {
        return `${m.label}: ${m.value}`;
    });

    let answer = '';
    const cleanExcerpt = (excerpt || '').replace(/\.\s*$/, '');
    const isExcerptGood = cleanExcerpt.length > 80 && !cleanExcerpt.endsWith('...');

    if (isExcerptGood) {
        const firstSentence = cleanExcerpt.split(/\.\s+/)[0];
        if (topMetrics.length >= 2) {
            answer = `${firstSentence}. Key highlights: ${topMetrics.join(', ')}.`;
        } else if (funding) {
            answer = `${firstSentence}. Total funding available: ${funding}.`;
        } else {
            answer = `${firstSentence}. Our guide covers eligibility, application steps, and expert tips to maximize your approval odds.`;
        }
    } else {
        const cleanTitle = title.replace(/\s*\|.*$/, '').replace(/\s*\d{4}(-\d{4})?\s*$/, '').trim();

        if (funding && topMetrics.length >= 2) {
            answer = `${cleanTitle}: access ${funding} in available funding. Key programs offer ${topMetrics.join(' and ')}.`;
        } else if (funding) {
            answer = `${cleanTitle}: ${funding} in total funding is available across multiple federal and provincial programs. Our guide breaks down eligibility requirements, application steps, and expert strategies.`;
        } else if (topMetrics.length >= 2) {
            answer = `${cleanTitle} — key highlights include ${topMetrics.join(' and ')}. Our guide covers all eligible programs, application steps, and expert tips.`;
        } else {
            answer = `${cleanTitle}. Our comprehensive guide covers all eligible programs, step-by-step application instructions, and expert tips to maximize your funding.`;
        }
    }

    answer = answer.replace(/"/g, '\\"');
    return answer;
}

function addMissingAnswersFallback(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let updatedCount = 0;

    for (let i = 0; i < lines.length; i++) {
        const sm = lines[i].match(/slug:\s*["']([^"']+)["']/);
        if (!sm) continue;

        const slug = sm[1];

        let hasShortAnswer = false;
        let insertLine = -1;

        // Scan a larger window for the closing brace or other properties
        for (let j = i; j < i + 100 && j < lines.length; j++) {
            if (lines[j].includes('shortAnswer:')) {
                hasShortAnswer = true;
                break;
            }

            // Try to find the end of the object where we can insert
            if (lines[j].match(/^\s*},/)) {
                // If the next line is the start of a new object or another },
                // then this is likely the end of the current object.
                insertLine = j;
                break;
            }
        }

        if (hasShortAnswer || insertLine === -1) continue;

        let title = '', excerpt = '';
        let metrics = [];

        for (let k = i - 3; k < i + 20 && k < Math.min(lines.length, insertLine); k++) {
            if (k < 0) continue;
            const tm = lines[k].match(/title:\s*"(.*?)"/);
            if (tm && !title) title = tm[1];
            const em = lines[k].match(/excerpt:\s*"(.*?)"/);
            if (em && !excerpt) excerpt = em[1];
        }

        const newAnswer = generateAnswer(slug, title, excerpt, metrics);

        // Insert shortAnswer before the closing brace
        // e.g.     }, ->     shortAnswer: "...",\n    },
        const indentMatch = lines[insertLine].match(/^(\s*)/);
        const indent = indentMatch ? indentMatch[1] : '    ';

        // Use a 4-space indent from the closing brace as standard
        const propIndent = indent + '  ';

        lines.splice(insertLine, 0, `${propIndent}shortAnswer: "${newAnswer}",`);

        updatedCount++;
        console.log(`✅ Added to ${slug} (fallback)`);

        i++; // adjust index
    }

    fs.writeFileSync(filePath, lines.join('\n'));
    return updatedCount;
}

console.log('=== Adding missing shortAnswers on Main (Fallback Phase) ===');
const blogCount = addMissingAnswersFallback(path.join(__dirname, '..', 'lib/data/blogPosts.ts'));
console.log(`Blog posts updated: ${blogCount}\n`);

const guideCount = addMissingAnswersFallback(path.join(__dirname, '..', 'lib/data/guides.ts'));
console.log(`Guides updated: ${guideCount}\n`);

console.log(`🎉 Total added on main: ${blogCount + guideCount}`);
