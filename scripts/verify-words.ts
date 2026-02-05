
import { stateDetails } from '../lib/data/stateDetails';

function countWords(str: string): number {
    return str.trim().split(/\s+/).length;
}

function getStateWordCount(state: any): number {
    let wordCount = 0;

    // Helper to recursively go through object strings
    function traverse(obj: any) {
        if (typeof obj === 'string') {
            wordCount += countWords(obj);
        } else if (Array.isArray(obj)) {
            obj.forEach(item => traverse(item));
        } else if (typeof obj === 'object' && obj !== null) {
            Object.values(obj).forEach(value => traverse(value));
        }
    }

    // Measure specific sections that contribute to the page content
    // We intentionally exclude 'id', 'slug', 'abbreviation' etc. if they are short, but
    // for a rough "content" count, iterating everything in the content object is fair.
    // The previous estimation was "data equivalent", so let's count all string data.
    traverse(state);

    return wordCount;
}

console.log('State Word Count Verification:');
console.log('--------------------------------');

const results: { state: string, count: number }[] = [];

Object.values(stateDetails).forEach((state: any) => {
    const count = getStateWordCount(state);
    results.push({ state: state.name, count });
});

// Sort by count ascending to see the lowest
results.sort((a, b) => a.count - b.count);

results.forEach(r => {
    console.log(`${r.state}: ${r.count} words`);
});

console.log('--------------------------------');
const average = results.reduce((acc, curr) => acc + curr.count, 0) / results.length;
console.log(`Average Word Count: ${Math.round(average)}`);
console.log(`Lowest: ${results[0].state} (${results[0].count})`);
console.log(`Highest: ${results[results.length - 1].state} (${results[results.length - 1].count})`);
