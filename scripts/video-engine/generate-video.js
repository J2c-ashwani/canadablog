#!/usr/bin/env node
/**
 * 🎬 Master Video Generation Dispatcher for fsidigital.ca
 *
 * PRIMARY ENGINE (v2.0):
 *   2D Animated Character Explainer Engine (`scripts/video-engine/2d-animated-explainer/build-animated-video.js`)
 *   - 5-Scene Animated Structure (Question/Reaction -> Red Cross Misconception -> Mechanism Diagram -> Flow Path -> Solution Return)
 *   - Transparent 2D Character (Canadian Founder with navy blazer & maple leaf lapel pin)
 *   - Kinetic Yellow-Highlight Typography
 *   - Neural Voiceover + Ducked Lo-Fi BGM
 *
 * FALLBACK / LEGACY ENGINE:
 *   Preserved in `scripts/video-engine/generate-video.legacy.js`
 *   Triggerable with `--legacy` or `--engine legacy`
 *
 * Usage:
 *   node scripts/video-engine/generate-video.js --topic "NRC IRAP Innovation Grants"
 *   node scripts/video-engine/generate-video.js --pillar 2
 *   node scripts/video-engine/generate-video.js --all
 *   node scripts/video-engine/generate-video.js --legacy --topic "..."
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const isLegacy = args.includes('--legacy') || args.includes('--engine=legacy') || (args.includes('--engine') && args[args.indexOf('--engine') + 1] === 'legacy');

if (isLegacy) {
  console.log('⚠️ Running LEGACY video generation engine (floating HUD cards over B-roll)...');
  const legacyScript = path.join(__dirname, 'generate-video.legacy.js');
  const filteredArgs = args.filter(a => a !== '--legacy' && a !== '--engine' && a !== 'legacy');
  execSync(`node "${legacyScript}" ${filteredArgs.map(a => `"${a}"`).join(' ')}`, { stdio: 'inherit' });
  process.exit(0);
}

// ─── Forward to 2D Animated Explainer Engine ───
if (require.main === module) {
  const modernScript = path.join(__dirname, '2d-animated-explainer/build-animated-video.js');
  execSync(`node "${modernScript}" ${args.map(a => `"${a}"`).join(' ')}`, { stdio: 'inherit' });
  process.exit(0);
}

const modernEngine = require('./2d-animated-explainer/build-animated-video');

// Export legacy functions for backwards compatibility with any programmatic imports
const legacyModule = require('./generate-video.legacy');

module.exports = {
  ...legacyModule,
  generateSingleVideo: async (topicOrSlug) => {
    return await modernEngine.renderSingleConfig(
      path.join(__dirname, '2d-animated-explainer/configs', modernEngine.PILLAR_MAP[topicOrSlug] || 'pillar-1-traps.json')
    );
  },
  modernEngine,
};
