const fs = require('fs');
const path = require('path');

/**
 * Auto-generates a high-quality Short Answer from the post's own data:
 * title, excerpt, and metrics values.
 *
 * Strategy: Extract the key funding amount from the title (e.g. "$2.3B+"),
 * the program names from the excerpt, and the top metric values.
 * Combine into a 2-sentence answer that directly addresses the search intent.
 */
function generateAnswer(slug, title, excerpt, metrics) {
    // Extract funding amount from title (e.g. "$2.3B+", "$10K", "$500M")
    const fundingMatch = title.match(/\$[\d,.]+[KMBkb]?\+?/);
    const funding = fundingMatch ? fundingMatch[0] : null;

    // Extract key program names from title/excerpt
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

    // Extract top 2 metric values
    const topMetrics = (metrics || []).slice(0, 2).map(m => {
        return `${m.label}: ${m.value}`;
    });

    // Build the answer
    let answer = '';

    // Use the excerpt as a base if it's substantial (>50 chars and not truncated)
    const cleanExcerpt = (excerpt || '').replace(/\.\s*$/, '');
    const isExcerptGood = cleanExcerpt.length > 80 && !cleanExcerpt.endsWith('...');

    if (isExcerptGood) {
        // Good excerpt — use first sentence + add metric detail
        const firstSentence = cleanExcerpt.split(/\.\s+/)[0];
        if (topMetrics.length >= 2) {
            answer = `${firstSentence}. Key highlights: ${topMetrics.join(', ')}.`;
        } else if (funding) {
            answer = `${firstSentence}. Total funding available: ${funding}.`;
        } else {
            answer = `${firstSentence}. Our guide covers eligibility, application steps, and expert tips to maximize your approval odds.`;
        }
    } else {
        // Poor/truncated excerpt — build from title and metrics
        // Clean the title (remove year, pipe separator, etc.)
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

    // Safety: ensure no unescaped quotes
    answer = answer.replace(/"/g, '\\"');

    return answer;
}

function fixFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let updatedCount = 0;

    for (let i = 0; i < lines.length; i++) {
        const sm = lines[i].match(/slug:\s*["']([^"']+)["']/);
        if (!sm) continue;

        const slug = sm[1];

        // Find shortAnswer line
        let saLine = -1;
        let saText = '';
        for (let j = i; j < i + 60 && j < lines.length; j++) {
            if (lines[j].includes('shortAnswer:')) {
                saLine = j;
                const saMatch = lines[j].match(/shortAnswer:\s*"(.*?)"/);
                if (saMatch) saText = saMatch[1];
                break;
            }
        }

        if (saLine === -1) continue;

        // Check if this is a bad entry
        const isBad = saText.includes('Funding amounts average') ||
            saText.includes('up to $150 for eligible') ||
            saText.match(/^(Complete guide to|Yes —).*\.\s*(Funding|Our article)/) ||
            saText.match(/Guide —/) ||
            saText.match(/Application Guide/) ||
            saText.match(/Application Process/) ||
            saText.match(/Funding Guide/) ||
            saText === '';

        if (!isBad) continue;

        // Gather data
        let title = '', excerpt = '';
        let metrics = [];
        for (let k = i - 3; k < i + 15 && k < lines.length; k++) {
            if (k < 0) continue;
            const tm = lines[k].match(/title:\s*"(.*?)"/);
            if (tm && !title) title = tm[1];
            const em = lines[k].match(/excerpt:\s*"(.*?)"/);
            if (em && !excerpt) excerpt = em[1];
        }

        // Find metrics array
        for (let k = i; k < i + 60 && k < lines.length; k++) {
            if (lines[k].includes('metrics:')) {
                for (let m = k; m < k + 20 && m < lines.length; m++) {
                    const labelMatch = lines[m].match(/label:\s*'([^']+)'/);
                    const valueMatch = lines[m].match(/value:\s*'([^']+)'/);
                    if (labelMatch && valueMatch) {
                        metrics.push({ label: labelMatch[1], value: valueMatch[1] });
                    }
                }
                break;
            }
        }

        const newAnswer = generateAnswer(slug, title, excerpt, metrics);
        const prefixMatch = lines[saLine].match(/^(\s*(?:\},?\s*)?shortAnswer:\s*)/);
        if (prefixMatch) {
            lines[saLine] = `${prefixMatch[1]}"${newAnswer}",`;
            updatedCount++;
            console.log(`✅ ${slug}`);
        }
    }

    fs.writeFileSync(filePath, lines.join('\n'));
    return updatedCount;
}

console.log('=== Fixing blogPosts.ts on eeat-rollout ===');
const blogCount = fixFile(path.join(__dirname, '..', 'lib/data/blogPosts.ts'));
console.log(`Blog posts fixed: ${blogCount}\n`);

console.log('=== Fixing guides.ts on eeat-rollout ===');
const guideCount = fixFile(path.join(__dirname, '..', 'lib/data/guides.ts'));
console.log(`Guides fixed: ${guideCount}\n`);

console.log(`🎉 Total fixed on eeat-rollout: ${blogCount + guideCount}`);
