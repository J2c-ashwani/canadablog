#!/usr/bin/env node
/**
 * 🎬 Master 2D Animated Explainer Video Engine (Production Suite)
 * Direct implementation of the 5-scene @vidit.creates reference brief:
 *   1. Question & Reaction (Character in room, expression change)
 *   2. Correct Misconception (Central concept, decisive red cross overlay)
 *   3. Explain Mechanism (Animated diagram, connecting nodes, energy pulses)
 *   4. Follow Movement (Winding bezier path, traveling gold grant token)
 *   5. Reassuring Finish (Character returns in room, smiling, finger lift, CTA)
 *
 * Supports rendering:
 *   --pillar <1-7>        Render a specific pillar
 *   --config <path>       Render from an explicit config file
 *   --topic <slug|title>  Render by topic slug or title
 *   --all                 Batch render all 7 core content pillars
 */

const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');
const puppeteer = require('puppeteer');

const DIR = __dirname;
const REPO_ROOT = path.join(DIR, '../../..');
const CONFIGS_DIR = path.join(DIR, 'configs');
const HTML_PATH = path.join(DIR, 'render-canvas.html');
const ASSETS_DIR = path.join(DIR, '../assets');
const CHARACTER_DIR = path.join(ASSETS_DIR, 'character');
const BGM_DIR = path.join(ASSETS_DIR, 'bgm');
const VENV_BIN = path.join(REPO_ROOT, '.venv/bin');
const OUT_DIR = path.join(REPO_ROOT, 'out/videos/2d-animated-explainer');
const OUT_VIDEOS_DIR = path.join(REPO_ROOT, 'out/videos');
const PUBLIC_REELS_DIR = path.join(REPO_ROOT, 'public/videos/reels');

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(OUT_VIDEOS_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_REELS_DIR, { recursive: true });

function getChromeExecutablePath() {
  const possiblePaths = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

function getBase64Image(filename) {
  const p = path.join(CHARACTER_DIR, filename);
  const data = fs.readFileSync(p);
  return `data:image/png;base64,${data.toString('base64')}`;
}

const PILLAR_MAP = {
  1: 'pillar-1-traps.json',
  2: 'pillar-2-stacking.json',
  3: 'pillar-3-federal.json',
  4: 'pillar-4-digital.json',
  5: 'pillar-5-women.json',
  6: 'pillar-6-regional.json',
  7: 'pillar-7-checklist.json',
  'grant-rejection-traps': 'pillar-1-traps.json',
  'grant-stacking-secrets': 'pillar-2-stacking.json',
  'nrc-irap-innovation-grants': 'pillar-3-federal.json',
  'digital-adoption-funding': 'pillar-4-digital.json',
  'women-entrepreneur-grants': 'pillar-5-women.json',
  'agri-food-canada-grants': 'pillar-6-regional.json',
  'grant-application-checklist': 'pillar-7-checklist.json',
};

async function renderSingleConfig(configPath, browserInstance = null) {
  console.log(`\n===============================================================`);
  console.log(`🚀 Loading 2D Animated Explainer Configuration: ${path.basename(configPath)}`);
  console.log(`===============================================================`);

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const slug = config.meta.slug;

  const voiceoverPath = path.join(OUT_DIR, `${slug}-voiceover.mp3`);
  const subtitlesPath = path.join(OUT_DIR, `${slug}-subtitles.vtt`);
  const mixedAudioPath = path.join(OUT_DIR, `${slug}-mixed.mp3`);
  const rawVideoPath = path.join(OUT_DIR, `${slug}-raw.mp4`);
  const outFolderVideoPath = path.join(OUT_VIDEOS_DIR, `${slug}.mp4`);
  const finalMasterPath = path.join(PUBLIC_REELS_DIR, `${slug}.mp4`);
  const metadataPath = path.join(OUT_VIDEOS_DIR, `${slug}-metadata.json`);

  // Step 1: Synthesize Neural Canadian Voiceover
  if (!fs.existsSync(voiceoverPath)) {
    console.log(`🎙️ Synthesizing Neural Canadian Voiceover (${config.audio.voice})...`);
    const edgeTTS = path.join(VENV_BIN, 'edge-tts');
    execSync(
      `"${edgeTTS}" --voice "${config.audio.voice}" --rate "${config.audio.rate}" --text "${config.audio.script.replace(/"/g, '\\"')}" --write-media "${voiceoverPath}" --write-subtitles "${subtitlesPath}"`,
      { stdio: 'inherit' }
    );
  } else {
    console.log(`🎙️ Voiceover track cached: ${path.basename(voiceoverPath)}`);
  }

  // Get total duration from audio
  const durStr = execSync(
    `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${voiceoverPath}"`,
    { encoding: 'utf8' }
  ).trim();
  const totalDuration = parseFloat(durStr);
  const totalFrames = Math.ceil(totalDuration * config.meta.fps);
  const fadeOutStart = Math.max(0, totalDuration - 2.0);
  console.log(`⏱️ Voiceover Duration: ${totalDuration.toFixed(2)}s (${totalFrames} frames @ 30fps)`);

  // Dynamically synchronize the last scene and caption endTimes to audio duration
  if (config.scenes && config.scenes.length >= 5) {
    config.scenes[4].endTime = totalDuration;
  }
  if (config.captions && config.captions.length > 0) {
    config.captions[config.captions.length - 1].endTime = totalDuration;
  }

  // Step 2: Mix BGM Ducking
  console.log(`🎵 Mixing ducked Lo-Fi BGM (${config.audio.bgm || 'bgm-01.mp3'} @ 8% volume with 2.0s fadeout)...`);
  const bgmPath = path.join(BGM_DIR, config.audio.bgm || 'bgm-01.mp3');
  execSync(
    [
      'ffmpeg -y',
      `-i "${voiceoverPath}"`,
      `-stream_loop -1 -i "${bgmPath}"`,
      `-filter_complex "[1:a]volume=${config.audio.bgmVolume || 0.08},afade=t=out:st=${fadeOutStart.toFixed(2)}:d=2.0[bgm];[0:a][bgm]amix=inputs=2:duration=first:dropout_transition=2[a]"`,
      '-map "[a]"',
      '-c:a libmp3lame -b:a 192k -ar 44100',
      `"${mixedAudioPath}"`,
    ].join(' '),
    { stdio: 'pipe' }
  );

  // Step 3: Spawn FFmpeg Video Pipe
  console.log('🎬 Spawning FFmpeg video pipe for direct 30fps MJPEG streaming...');
  const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'mjpeg',
    '-r', String(config.meta.fps),
    '-i', '-',
    '-c:v', 'libx264',
    '-profile:v', 'high',
    '-level:v', '4.2',
    '-preset', 'fast',
    '-crf', '19',
    '-b:v', '6000k',
    '-maxrate', '8000k',
    '-bufsize', '10000k',
    '-g', '30',
    '-keyint_min', '30',
    '-sc_threshold', '0',
    '-pix_fmt', 'yuv420p',
    '-colorspace', 'bt709',
    '-color_primaries', 'bt709',
    '-color_trc', 'bt709',
    '-color_range', 'tv',
    '-r', String(config.meta.fps),
    rawVideoPath,
  ]);

  ffmpeg.stderr.on('data', () => {});

  // Step 4: Chrome Frame Rendering
  const shouldCloseBrowser = !browserInstance;
  const browser = browserInstance || await puppeteer.launch({
    headless: 'new',
    executablePath: getChromeExecutablePath(),
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: config.meta.width, height: config.meta.height });

  await page.exposeFunction('sendFrameChunk', (base64) => {
    const buf = Buffer.from(base64, 'base64');
    ffmpeg.stdin.write(buf);
  });

  await page.goto(`file://${HTML_PATH}`, { waitUntil: 'networkidle0' });

  const characterAssets = {
    pose1: getBase64Image('pose1-confused.png'),
    pose2: getBase64Image('pose2-warning.png'),
    pose3: getBase64Image('pose3-solution.png'),
  };

  await page.evaluate(async (cfg, assets) => {
    await window.initEngine(cfg, assets);
  }, config, characterAssets);

  console.log(`📽️ Rendering ${totalFrames} frames with full 2D movement & kinetic captions...`);
  const renderStartTime = Date.now();

  await page.evaluate(async (framesCount, fps) => {
    const c = document.getElementById('stage');
    for (let i = 0; i < framesCount; i++) {
      const t = i / fps;
      window.renderFrame(t);
      const dataUrl = c.toDataURL('image/jpeg', 0.90);
      const base64 = dataUrl.substring(23);
      await window.sendFrameChunk(base64);
    }
  }, totalFrames, config.meta.fps);

  const renderElapsed = ((Date.now() - renderStartTime) / 1000).toFixed(1);
  console.log(`✅ All ${totalFrames} frames rendered in ${renderElapsed}s (${(totalFrames / renderElapsed).toFixed(0)} fps)!`);

  ffmpeg.stdin.end();
  await new Promise((resolve) => ffmpeg.on('close', resolve));
  await page.close();
  if (shouldCloseBrowser) {
    await browser.close();
  }

  // Step 5: Merge Audio & Video with Faststart
  console.log('🎵 Muxing audio & video into final master MP4...');
  execSync(
    [
      'ffmpeg -y',
      `-i "${rawVideoPath}"`,
      `-i "${mixedAudioPath}"`,
      '-c:v copy',
      '-c:a aac -b:a 256k',
      `-t ${totalDuration.toFixed(2)}`,
      '-movflags +faststart',
      `"${finalMasterPath}"`,
    ].join(' '),
    { stdio: 'pipe' }
  );

  // Copy to out/videos/ for n8n/legacy compatibility
  fs.copyFileSync(finalMasterPath, outFolderVideoPath);

  // Step 6: Generate Social Metadata for Distribution
  const metadata = {
    title: config.meta.title,
    slug: slug,
    engine: '2d-animated-explainer',
    duration: totalDuration,
    format: '1080x1920-30fps',
    audioTrack: config.audio.voice,
    hashtags: [
      '#CanadianGrants',
      '#StartupFunding',
      '#BusinessGrantsCanada',
      '#NRCIRAP',
      '#SRED',
      '#FSIDigital',
      '#NonDilutiveFunding'
    ],
    caption: `${config.meta.title}\n\nStop leaving non-dilutive government money on the table. Discover how top Canadian businesses secure non-repayable grants.\n\nSimulate your funding eligibility in 60 seconds at fsidigital.ca/calculator\n\n#CanadianGrants #StartupFunding #BusinessGrantsCanada #FSIDigital`,
    publicUrl: `https://www.fsidigital.ca/grants/${slug}`,
    calculatorUrl: 'https://www.fsidigital.ca/calculator',
    videoPath: finalMasterPath,
    generatedAt: new Date().toISOString()
  };
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

  console.log(`🎉 2D ANIMATED REEL READY: ${slug}.mp4`);
  console.log(`📍 Public Reel: /videos/reels/${slug}.mp4`);
  console.log(`📍 Metadata Saved: ${metadataPath}`);

  return { slug, finalMasterPath, metadataPath, totalDuration };
}

async function main() {
  const args = process.argv.slice(2);

  // Check explicit config
  if (args.includes('--config')) {
    const configPath = args[args.indexOf('--config') + 1];
    return await renderSingleConfig(configPath);
  }

  // Check pillar number or name
  if (args.includes('--pillar')) {
    const p = args[args.indexOf('--pillar') + 1];
    if (p === 'all') {
      return await renderAllPillars();
    }
    const filename = PILLAR_MAP[p];
    if (!filename) {
      throw new Error(`Unknown pillar: ${p}. Valid options: 1-7 or slugs.`);
    }
    return await renderSingleConfig(path.join(CONFIGS_DIR, filename));
  }

  // Check topic argument
  if (args.includes('--topic')) {
    const topic = args[args.indexOf('--topic') + 1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    let matchedFile = null;
    for (const [key, file] of Object.entries(PILLAR_MAP)) {
      if (topic.includes(String(key)) || String(key).includes(topic)) {
        matchedFile = file;
        break;
      }
    }
    if (!matchedFile) {
      // Default to Pillar 1 or closest
      console.warn(`⚠️ No direct 2D pillar matched for topic '${args[args.indexOf('--topic') + 1]}', falling back to Pillar 1.`);
      matchedFile = 'pillar-1-traps.json';
    }
    return await renderSingleConfig(path.join(CONFIGS_DIR, matchedFile));
  }

  // Check --all
  if (args.includes('--all')) {
    return await renderAllPillars();
  }

  // Default: pillar 1
  return await renderSingleConfig(path.join(CONFIGS_DIR, 'pillar-1-traps.json'));
}

async function renderAllPillars() {
  const pillarFiles = [
    'pillar-1-traps.json',
    'pillar-2-stacking.json',
    'pillar-3-federal.json',
    'pillar-4-digital.json',
    'pillar-5-women.json',
    'pillar-6-regional.json',
    'pillar-7-checklist.json',
  ];

  console.log(`\n===============================================================`);
  console.log(`🚀 BATCH RENDERING ALL ${pillarFiles.length} 2D ANIMATED STRATEGIC PILLARS`);
  console.log(`===============================================================\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: getChromeExecutablePath(),
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];
  try {
    for (const file of pillarFiles) {
      const configPath = path.join(CONFIGS_DIR, file);
      const res = await renderSingleConfig(configPath, browser);
      results.push(res);
    }
  } finally {
    await browser.close();
  }

  console.log(`\n===============================================================`);
  console.log(`🎉 ALL ${results.length} 2D ANIMATED REELS COMPILED & DEPLOYED!`);
  console.log(`===============================================================`);
  results.forEach((r, idx) => {
    console.log(`  ${idx + 1}. [${r.slug}.mp4] Duration: ${r.totalDuration.toFixed(1)}s -> ${r.finalMasterPath}`);
  });

  return results;
}

if (require.main === module) {
  main().catch((err) => {
    console.error('❌ Pipeline Error:', err);
    process.exit(1);
  });
}

module.exports = {
  renderSingleConfig,
  renderAllPillars,
  PILLAR_MAP,
};
