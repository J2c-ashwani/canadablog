
import { stateDetails } from './lib/data/stateDetails';

function countWords(str: string | undefined): number {
    if (!str) return 0;
    return str.replace(/[^\w\s]/g, '').trim().split(/\s+/).length;
}

let totalWords = 0;
const stateCounts: Record<string, number> = {};

stateDetails.forEach(state => {
    let stateWordCount = 0;

    // Overview
    stateWordCount += countWords(state.overview.introduction);
    stateWordCount += countWords(state.overview.economicLandscape);
    stateWordCount += countWords(state.overview.keyOpportunities);

    // Top Programs
    state.topPrograms.forEach(prog => {
        stateWordCount += countWords(prog.name);
        stateWordCount += countWords(prog.description);
        stateWordCount += countWords(prog.eligibility.join(' '));
        stateWordCount += countWords(prog.industries.join(' '));
        stateWordCount += countWords(prog.applicationProcess);
    });

    // Eligibility
    stateWordCount += countWords(state.eligibility.generalRequirements.join(' '));
    stateWordCount += countWords(state.eligibility.businessTypes.join(' '));
    stateWordCount += countWords(state.eligibility.restrictions.join(' '));
    stateWordCount += countWords(state.eligibility.documentationNeeded.join(' '));

    // Application Process
    state.applicationProcess.steps.forEach(step => {
        stateWordCount += countWords(step.title);
        stateWordCount += countWords(step.description);
    });
    stateWordCount += countWords(state.applicationProcess.tips.join(' '));

    // Industry Focus
    state.industryFocus.primary.forEach(ind => {
        stateWordCount += countWords(ind.name);
        stateWordCount += countWords(ind.description);
    });
    stateWordCount += countWords(state.industryFocus.emerging.join(' '));

    // Success Stories
    state.successStories.forEach(story => {
        stateWordCount += countWords(story.company);
        stateWordCount += countWords(story.outcome);
    });

    // FAQs
    state.faqs.forEach(faq => {
        stateWordCount += countWords(faq.question);
        stateWordCount += countWords(faq.answer);
    });

    // Expert Tips
    state.expertTips.forEach(tip => {
        stateWordCount += countWords(tip.title);
        stateWordCount += countWords(tip.content);
    });

    // Meta (often counted in SEO audits)
    stateWordCount += countWords(state.metaDescription);

    stateCounts[state.name] = stateWordCount;
    totalWords += stateWordCount;
});

console.log('| State | Current Words | Status | Final Words |');
console.log('| :--- | :---: | :---: | :---: |');

// Sort by word count ascending (focus on lowest first)
const sortedStates = Object.entries(stateCounts).sort((a, b) => a[1] - b[1]);

sortedStates.forEach(([stateName, count]) => {
    console.log(`| ${stateName} | ${count} | Needs Work | - |`);
});

console.log(`\n**Total Average:** ${Math.round(totalWords / stateDetails.length)} words`);
