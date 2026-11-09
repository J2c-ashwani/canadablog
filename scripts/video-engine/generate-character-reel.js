#!/usr/bin/env node
/**
 * 🎬 2D Character-Driven Explainer Reel Generator for FSI Digital
 * Inspired by @vidit.creates — Engineered for High Retention B2B FinTech
 * 
 * Features:
 * - Real 2D Flat Vector Canadian Founder Character in 3 dynamic poses
 * - Clean modern tech aesthetic (Kurzgesagt / Stripe / Figma style)
 * - Narrative-matched visual scenes: Panic Hook -> Warning Trap -> Diagram -> Solution -> CTA
 * - Electric Yellow (#FFE600) keyword highlights
 * - Neural Canadian Voiceover (en-CA-LiamNeural) + ducked lo-fi beat
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO_ROOT = path.join(__dirname, '../..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'out/videos/character-reel');
const SLIDE_DIR = path.join(OUTPUT_DIR, 'slides');
const PUBLIC_REELS_DIR = path.join(REPO_ROOT, 'public/videos/reels');
const ASSETS_DIR = path.join(__dirname, 'assets');
const CHARACTER_DIR = path.join(ASSETS_DIR, 'character');
const BGM_DIR = path.join(ASSETS_DIR, 'bgm');
const VENV_BIN = path.join(REPO_ROOT, '.venv/bin');

fs.mkdirSync(SLIDE_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_REELS_DIR, { recursive: true });

// Convert character PNGs to base64 for reliable Puppeteer rendering
function getBase64Image(filename) {
  const p = path.join(CHARACTER_DIR, filename);
  const data = fs.readFileSync(p);
  return `data:image/png;base64,${data.toString('base64')}`;
}

const POSE_CONFUSED = getBase64Image('pose1-confused.png');
const POSE_WARNING = getBase64Image('pose2-warning.png');
const POSE_SOLUTION = getBase64Image('pose3-solution.png');

// ─── Scene Definitions ───
const SCENES = [
  {
    id: 'scene-1-hook',
    characterPose: POSE_CONFUSED,
    characterPosition: 'center',
    pill: '🇨🇦 CANADIAN TECH ALERT',
    pillBg: '#DC2626',
    headline: 'Did the CRA Just Flag Your <span class="hl-yellow">Developer Salaries</span>?',
    subline: 'The $50,000 contractor trap that kills 80% of grant claims',
    bubble: 'Wait... my offshore dev team doesn\'t qualify?!',
    badgeType: 'alert',
  },
  {
    id: 'scene-2-trap',
    characterPose: POSE_WARNING,
    characterPosition: 'left',
    pill: '❌ TRAP 01: OVERSEAS CONTRACTORS',
    pillBg: '#DC2626',
    headline: 'Devs in India or US? <span class="hl-yellow">$0.00 Reimbursement</span>',
    subline: 'The NRC & CRA have ONE non-negotiable rule:',
    cardBad: {
      title: '❌ Overseas Dev Invoices',
      desc: 'US, India, Europe Contractors',
      tag: '0% Eligible • Audit Trigger',
    },
    cardGood: {
      title: '✅ Canadian T4 Payroll',
      desc: 'Full-time Canadian Residents',
      tag: 'Up to 80% Cash Back',
    },
  },
  {
    id: 'scene-3-diagram',
    characterPose: POSE_WARNING,
    characterPosition: 'right',
    pill: '🏛️ THE CANADIAN SOIL RULE',
    pillBg: '#2563EB',
    headline: 'Only Work Done on <span class="hl-yellow">Canadian Soil</span> Qualifies',
    subline: 'How the federal government verifies salary claims:',
    diagramSteps: [
      { step: '01', title: 'Canadian Corporation (CCPC)', detail: 'Incorporated in Canada with domestic control' },
      { step: '02', title: 'T4 Payroll with CPP & EI', detail: 'Developers physically residing in Canada' },
      { step: '03', title: 'Non-Repayable 80% Grant', detail: 'Cash wire directly from NRC IRAP' },
    ],
  },
  {
    id: 'scene-4-solution',
    characterPose: POSE_SOLUTION,
    characterPosition: 'left',
    pill: '🛡️ THE 3-STEP WORKAROUND',
    pillBg: '#059669',
    headline: 'How Top Tech Firms <span class="hl-yellow">Maximize Funding</span> Legally',
    subline: 'Follow this exact preparation order before filing:',
    solutionItems: [
      'Shift core architectural leadership to Canadian T4 payroll',
      'Pre-approve your project with an NRC advisor BEFORE spending',
      'Stack IRAP (80% wage subsidy) with SR&ED (35% tax credit)',
    ],
  },
  {
    id: 'scene-5-cta',
    characterPose: POSE_SOLUTION,
    characterPosition: 'center',
    pill: '🚀 INSTANT CAPITAL READINESS',
    pillBg: '#059669',
    headline: 'Check Your <span class="hl-yellow">Grant Match</span> in 60 Seconds',
    subline: 'Free, self-serve, and evaluates active federal & provincial programs.',
    url: 'fsidigital.ca/calculator',
    button: 'Audit Your Eligibility Now →',
  },
];

const VOICEOVER_SCRIPT = 
  'Did the CRA just flag your developer salaries? ' +
  'If you are a Canadian tech founder, listen carefully before submitting your next grant application. ' +
  'Trap Number 1: The overseas contractor disaster. ' +
  'If you are hiring developers in India, Europe, or the US, the NRC and CRA will give you exactly zero dollars back. ' +
  'The federal rule is absolute: Only engineering work performed physically on Canadian soil by T4 employees qualifies for up to 80 percent cash reimbursement. ' +
  'Here is the legal workaround: Shift project architecture to your Canadian team, pre-approve with an NRC advisor before spending capital, and stack IRAP with S R and E D for maximum recovery. ' +
  'Find out exactly which active grants your business qualifies for in 60 seconds at f s i digital dot c a slash calculator.';

// ─── HTML Scene Builder ───
function buildSceneHTML(scene) {
  let mainVisual = '';

  if (scene.id === 'scene-1-hook') {
    mainVisual = `
      <div class="speech-bubble-pop">
        <span class="bubble-icon">💬</span> ${scene.bubble}
      </div>
      <div class="character-wrap pos-center">
        <img class="character-img" src="${scene.characterPose}" alt="Canadian Founder" />
      </div>
    `;
  } else if (scene.id === 'scene-2-trap') {
    mainVisual = `
      <div class="split-layout">
        <div class="card-bad">
          <div class="card-head-bad">${scene.cardBad.title}</div>
          <div class="card-desc">${scene.cardBad.desc}</div>
          <div class="card-tag-bad">${scene.cardBad.tag}</div>
        </div>
        <div class="card-good">
          <div class="card-head-good">${scene.cardGood.title}</div>
          <div class="card-desc">${scene.cardGood.desc}</div>
          <div class="card-tag-good">${scene.cardGood.tag}</div>
        </div>
      </div>
      <div class="character-wrap pos-left">
        <img class="character-img" src="${scene.characterPose}" alt="Canadian Founder" />
      </div>
    `;
  } else if (scene.id === 'scene-3-diagram') {
    const stepsHtml = scene.diagramSteps.map(s => `
      <div class="step-row">
        <div class="step-num">${s.step}</div>
        <div class="step-info">
          <div class="step-title">${s.title}</div>
          <div class="step-detail">${s.detail}</div>
        </div>
      </div>
    `).join('');

    mainVisual = `
      <div class="diagram-layout">
        ${stepsHtml}
      </div>
      <div class="character-wrap pos-right">
        <img class="character-img" src="${scene.characterPose}" alt="Canadian Founder" />
      </div>
    `;
  } else if (scene.id === 'scene-4-solution') {
    const itemsHtml = scene.solutionItems.map(item => `
      <div class="solution-item">
        <span class="solution-check">✓</span>
        <span>${item}</span>
      </div>
    `).join('');

    mainVisual = `
      <div class="solution-layout">
        ${itemsHtml}
      </div>
      <div class="character-wrap pos-left">
        <img class="character-img" src="${scene.characterPose}" alt="Canadian Founder" />
      </div>
    `;
  } else if (scene.id === 'scene-5-cta') {
    mainVisual = `
      <div class="cta-layout">
        <div class="cta-url-badge">
          🔒 ${scene.url}
        </div>
        <div class="cta-button-glow">${scene.button}</div>
      </div>
      <div class="character-wrap pos-center">
        <img class="character-img" src="${scene.characterPose}" alt="Canadian Founder" />
      </div>
    `;
  }

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    width: 1080px;
    height: 1920px;
    margin: 0;
    padding: 0;
    background: #0B1120;
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    overflow: hidden;
    color: #FFFFFF;
    -webkit-font-smoothing: antialiased;
  }

  /* Modern Studio Office Background with Ambient Gradients */
  .studio-bg {
    position: absolute;
    width: 1080px;
    height: 1920px;
    background: radial-gradient(circle at 50% 30%, #1E293B 0%, #0F172A 60%, #020617 100%);
    overflow: hidden;
  }

  .ambient-glow {
    position: absolute;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, transparent 70%);
    top: 15%;
    left: 20%;
    pointer-events: none;
  }

  .grid-pattern {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 80px 80px;
    opacity: 0.6;
  }

  /* Safe Area Wrapper */
  .safe-area {
    position: relative;
    width: 1080px;
    height: 1920px;
    padding: 180px 50px 240px 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10;
  }

  /* Top Hook Area */
  .top-header {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .pill-badge {
    align-self: flex-start;
    padding: 12px 30px;
    border-radius: 9999px;
    font-size: 28px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }

  .headline-main {
    font-size: 78px;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: -0.02em;
    text-shadow: 0 4px 30px rgba(0, 0, 0, 0.8);
  }

  .hl-yellow {
    color: #FFE600 !important;
    text-shadow: 0 0 25px rgba(255, 230, 0, 0.55);
  }

  .subline-main {
    font-size: 40px;
    font-weight: 700;
    color: #94A3B8;
    line-height: 1.35;
  }

  /* Middle Graphic Stage */
  .stage-content {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 40px 0;
  }

  /* Character Placements */
  .character-wrap {
    position: absolute;
    bottom: -60px;
    z-index: 20;
    filter: drop-shadow(0 25px 40px rgba(0, 0, 0, 0.8));
  }

  .character-img {
    width: 620px;
    height: auto;
    display: block;
  }

  .pos-center {
    left: 50%;
    transform: translateX(-50%);
  }

  .pos-left {
    left: -20px;
  }

  .pos-right {
    right: -20px;
    transform: scaleX(-1); /* Flips naturally to point inward */
  }

  /* Speech Bubble */
  .speech-bubble-pop {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #FFFFFF;
    color: #0F172A;
    font-size: 36px;
    font-weight: 900;
    padding: 24px 40px;
    border-radius: 32px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
    z-index: 30;
    white-space: nowrap;
    border: 4px solid #FFE600;
  }

  /* Split Cards Layout (Side by Side / Offset) */
  .split-layout {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 580px;
    align-self: flex-end;
    z-index: 25;
  }

  .card-bad {
    background: rgba(30, 10, 15, 0.95);
    border: 3px solid #EF4444;
    border-radius: 28px;
    padding: 30px;
    box-shadow: 0 15px 35px rgba(220, 38, 38, 0.3);
  }

  .card-head-bad {
    color: #F87171;
    font-size: 32px;
    font-weight: 900;
  }

  .card-tag-bad {
    margin-top: 10px;
    color: #FCA5A5;
    font-size: 26px;
    font-weight: 800;
    background: rgba(239, 68, 68, 0.2);
    display: inline-block;
    padding: 6px 16px;
    border-radius: 12px;
  }

  .card-good {
    background: rgba(6, 30, 20, 0.95);
    border: 3px solid #10B981;
    border-radius: 28px;
    padding: 30px;
    box-shadow: 0 15px 35px rgba(16, 185, 129, 0.3);
  }

  .card-head-good {
    color: #34D399;
    font-size: 32px;
    font-weight: 900;
  }

  .card-tag-good {
    margin-top: 10px;
    color: #6EE7B7;
    font-size: 26px;
    font-weight: 800;
    background: rgba(16, 185, 129, 0.2);
    display: inline-block;
    padding: 6px 16px;
    border-radius: 12px;
  }

  .card-desc {
    color: #FFFFFF;
    font-size: 32px;
    font-weight: 700;
    margin-top: 8px;
  }

  /* Diagram Steps Layout */
  .diagram-layout {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 600px;
    align-self: flex-start;
    z-index: 25;
  }

  .step-row {
    background: rgba(15, 23, 42, 0.95);
    border: 2px solid rgba(56, 189, 248, 0.4);
    border-radius: 24px;
    padding: 24px 28px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  }

  .step-num {
    font-size: 36px;
    font-weight: 900;
    color: #38BDF8;
    background: rgba(56, 189, 248, 0.15);
    padding: 10px 18px;
    border-radius: 16px;
  }

  .step-title {
    font-size: 32px;
    font-weight: 800;
    color: #FFFFFF;
  }

  .step-detail {
    font-size: 24px;
    font-weight: 600;
    color: #94A3B8;
    margin-top: 4px;
  }

  /* Solution Layout */
  .solution-layout {
    display: flex;
    flex-direction: column;
    gap: 22px;
    width: 580px;
    align-self: flex-end;
    z-index: 25;
  }

  .solution-item {
    background: rgba(6, 30, 20, 0.95);
    border: 2px solid #059669;
    border-radius: 24px;
    padding: 24px 28px;
    display: flex;
    align-items: flex-start;
    gap: 18px;
    font-size: 32px;
    font-weight: 700;
    line-height: 1.35;
    color: #FFFFFF;
  }

  .solution-check {
    color: #34D399;
    font-weight: 900;
    font-size: 36px;
  }

  /* CTA Layout */
  .cta-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    z-index: 30;
    position: relative;
    top: -40px;
  }

  .cta-url-badge {
    font-size: 60px;
    font-weight: 900;
    color: #FFE600;
    background: rgba(2, 6, 23, 0.95);
    border: 4px dashed #059669;
    border-radius: 32px;
    padding: 28px 48px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
  }

  .cta-button-glow {
    background: #059669;
    color: #FFFFFF;
    font-size: 36px;
    font-weight: 900;
    padding: 20px 52px;
    border-radius: 24px;
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.5);
  }

  /* Bottom Safe Banner */
  .bottom-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 24px;
    border-top: 2px solid rgba(255, 255, 255, 0.12);
  }

  .footer-brand {
    font-size: 30px;
    font-weight: 900;
    letter-spacing: 0.06em;
    color: #94A3B8;
  }

  .footer-verified {
    font-size: 26px;
    font-weight: 800;
    color: #10B981;
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
</head>
<body>
  <div class="studio-bg">
    <div class="ambient-glow"></div>
    <div class="grid-pattern"></div>
  </div>

  <div class="safe-area">
    <div class="top-header">
      <div class="pill-badge" style="background: ${scene.pillBg};">${scene.pill}</div>
      <div class="headline-main">${scene.headline}</div>
      <div class="subline-main">${scene.subline}</div>
    </div>

    <div class="stage-content">
      ${mainVisual}
    </div>

    <div class="bottom-footer">
      <div class="footer-brand">🇨🇦 FSI DIGITAL · CAPITAL INTELLIGENCE</div>
      <div class="footer-verified">✓ Active Federal Rules 2026</div>
    </div>
  </div>
</body>
</html>
  `;
}

// ─── Execution Pipeline ───
async function main() {
  console.log('🎬 Starting 2D Character-Driven Explainer Generation...');

  // 1. Render Scenes via Puppeteer (Google Chrome)
  const puppeteer = require('puppeteer');
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

  console.log('📸 Rendering 5 2D Character Scenes with Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 2 });

  const scenePngPaths = [];
  for (let i = 0; i < SCENES.length; i++) {
    const html = buildSceneHTML(SCENES[i]);
    const htmlPath = path.join(SLIDE_DIR, `scene-${i}.html`);
    const pngPath = path.join(SLIDE_DIR, `scene-${i}.png`);

    fs.writeFileSync(htmlPath, html);
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: pngPath, type: 'png' });
    console.log(`   ✅ Scene ${i + 1}/${SCENES.length} rendered (${SCENES[i].id})`);
    scenePngPaths.push(pngPath);
  }
  await browser.close();

  // 2. Generate Neural Canadian Voiceover (Edge-TTS)
  console.log('🎙️ Synthesizing Neural Canadian Voiceover (en-CA-LiamNeural)...');
  const voiceoverPath = path.join(OUTPUT_DIR, 'voiceover.mp3');
  const edgeTTS = path.join(VENV_BIN, 'edge-tts');
  const formattedScript = VOICEOVER_SCRIPT
    .replace(/80 percent/g, '80 percent')
    .replace(/IRAP/g, 'Eye-rap')
    .replace(/SR&ED/g, 'S R and E D')
    .replace(/NRC/g, 'N R C')
    .replace(/fsidigital\.ca\/calculator/gi, 'f s i digital dot c a slash calculator');

  execSync(
    `"${edgeTTS}" --voice "en-CA-LiamNeural" --rate "+4%" --text "${formattedScript.replace(/"/g, '\\"')}" --write-media "${voiceoverPath}"`,
    { stdio: 'inherit' }
  );

  // 3. Audio Ducking with Lo-Fi BGM
  const mixedAudioPath = path.join(OUTPUT_DIR, 'mixed-audio.mp3');
  const durationOutput = execSync(
    `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${voiceoverPath}"`,
    { encoding: 'utf8' }
  ).trim();
  const totalDuration = parseFloat(durationOutput);
  const fadeOutStart = Math.max(0, totalDuration - 2.0);
  const bgmPath = path.join(BGM_DIR, 'bgm-01.mp3');

  console.log(`🎵 Mixing Audio Ducking (${totalDuration.toFixed(1)}s total)...`);
  execSync(
    [
      'ffmpeg -y',
      `-i "${voiceoverPath}"`,
      `-stream_loop -1 -i "${bgmPath}"`,
      `-filter_complex "[1:a]volume=0.08,afade=t=out:st=${fadeOutStart.toFixed(2)}:d=2.0[bgm];[0:a][bgm]amix=inputs=2:duration=first:dropout_transition=2[a]"`,
      '-map "[a]"',
      '-c:a libmp3lame -b:a 192k -ar 44100',
      `"${mixedAudioPath}"`,
    ].join(' '),
    { stdio: 'pipe' }
  );

  // 4. FFmpeg Video Assembly
  const sceneDuration = totalDuration / scenePngPaths.length;
  console.log(`🎬 Compiling Final 2D Character Video (${sceneDuration.toFixed(2)}s per scene)...`);

  const inputListPath = path.join(SLIDE_DIR, 'input.txt');
  const inputList =
    scenePngPaths.map((p) => `file '${p}'\nduration ${sceneDuration.toFixed(2)}`).join('\n') +
    `\nfile '${scenePngPaths[scenePngPaths.length - 1]}'`;
  fs.writeFileSync(inputListPath, inputList);

  const finalVideoPublicPath = path.join(PUBLIC_REELS_DIR, 'canadian-founder-grant-traps-explainer.mp4');
  const finalVideoOutPath = path.join(OUTPUT_DIR, 'canadian-founder-grant-traps-explainer.mp4');

  execSync(
    [
      'ffmpeg -y',
      `-f concat -safe 0 -i "${inputListPath}"`,
      `-i "${mixedAudioPath}"`,
      '-vf "fps=30,scale=1080:1920"',
      '-c:v libx264 -profile:v high -level:v 4.2 -preset fast -crf 20',
      '-b:v 5500k -maxrate 7000k -bufsize 9000k',
      '-g 30 -keyint_min 30 -sc_threshold 0',
      '-pix_fmt yuv420p',
      '-colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv',
      '-c:a aac -b:a 256k -ar 44100',
      `-t ${totalDuration.toFixed(2)}`,
      '-movflags +faststart',
      `"${finalVideoOutPath}"`,
    ].join(' '),
    { stdio: 'pipe' }
  );

  fs.copyFileSync(finalVideoOutPath, finalVideoPublicPath);
  console.log('🎉 2D CHARACTER EXPLAINER REEL READY!');
  console.log('📍 Public Path: /videos/reels/canadian-founder-grant-traps-explainer.mp4');
  console.log('📍 Absolute Path:', finalVideoPublicPath);
}

main().catch((err) => {
  console.error('❌ Error generating character reel:', err);
  process.exit(1);
});
