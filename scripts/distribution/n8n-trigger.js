process.env.TZ = 'America/Toronto';
/**
 * 🚀 N8N Orchestration Script
 * 
 * Called daily by n8n to generate one piece of content per run.
 * 
 * Usage: node scripts/distribution/n8n-trigger.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TRACKER_FILE = path.join(__dirname, 'posted-tracker.json');

// Ensure tracker exists
if (!fs.existsSync(TRACKER_FILE)) {
    fs.writeFileSync(TRACKER_FILE, JSON.stringify({ index: 0 }, null, 2));
}

const tracker = JSON.parse(fs.readFileSync(TRACKER_FILE, 'utf8'));

// List of high-value SEO topics for daily generation
const topics = [
    "Alberta Technology Grants",
    "Ontario Innovation Grants",
    "Digital Adoption Funding",
    "R&D Tax Credits Canada",
    "Women Entrepreneur Grants",
    "Green Economy & Cleantech Funding",
    "Startup Business Loans",
    "USA SBA Funding Complete Guide",
    "Export Development Grants"
];

const topicIndex = tracker.index % topics.length;
const topic = topics[topicIndex];

try {
    // Call the video generator
    console.warn(`[N8N] Generating video out of: ${topic}`);
    execSync(`node scripts/video-engine/generate-video.js --topic "${topic}"`, { stdio: 'inherit', cwd: path.join(__dirname, '../..') });

    // Mark as posted / increment
    tracker.index += 1;
    fs.writeFileSync(TRACKER_FILE, JSON.stringify(tracker, null, 2));

    // Find the latest metadata JSON
    const outputDir = path.join(__dirname, '../../out/videos');
    const files = fs.readdirSync(outputDir).filter(f => f.endsWith('-metadata.json'));
    files.sort((a, b) => fs.statSync(path.join(outputDir, b)).mtimeMs - fs.statSync(path.join(outputDir, a)).mtimeMs);
    
    const latestMetadata = files[0];
    const metadataPath = path.join(outputDir, latestMetadata);
    const videoPath = metadataPath.replace('-metadata.json', '.mp4');

    // Output strictly JSON so n8n can parse it cleanly
    const jsonOutput = JSON.stringify({
        success: true,
        topic: topic,
        url: `https://www.fsidigital.ca/grants/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        videoPath: videoPath,
        metadataPath: metadataPath,
        metadata: JSON.parse(fs.readFileSync(metadataPath, 'utf8'))
    });

    console.log(jsonOutput);

} catch (err) {
    console.error(JSON.stringify({ error: "Video generation failed", details: err.message }));
    process.exit(1);
}
