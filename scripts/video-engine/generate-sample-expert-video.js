#!/usr/bin/env node
/**
 * 🎬 Expert-Standard Short-Form Video Generator
 * Purpose-built to produce narrative-matched, high-retention commercial Reels/Shorts
 * 
 * Rules:
 * - Template visually reflects the script's specific topic (Traps = Warning HUD + Split Cards; Stacking = Mathematical Pipeline; etc.)
 * - Yellow power-word highlights (#FFE600) for instant mobile hook and retention
 * - 5-beat story structure matching high-retention algorithmic requirements
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO_ROOT = path.join(__dirname, '../..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'out/videos/sample-expert');
const SLIDE_DIR = path.join(OUTPUT_DIR, 'slides');
const PUBLIC_REELS_DIR = path.join(REPO_ROOT, 'public/videos/reels');
const ASSETS_DIR = path.join(__dirname, 'assets');
const BROLL_DIR = path.join(ASSETS_DIR, 'broll');
const BGM_DIR = path.join(ASSETS_DIR, 'bgm');
const VENV_BIN = path.join(REPO_ROOT, '.venv/bin');

fs.mkdirSync(SLIDE_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_REELS_DIR, { recursive: true });

// ─── 1. Content Script Definition (Purpose-Built for Traps & Audits) ───
const SAMPLE_STORY = {
  slug: 'sample-irap-grant-traps-expert',
  title: 'The 3 IRAP Grant Traps That Kill 80% of Applications',
  broll: 'office-team.mp4',
  bgm: 'bgm-01.mp3',
  voice: 'en-CA-LiamNeural',
  slides: [
    {
      type: 'hook-alert',
      theme: 'trap',
      pill: '🚨 HIGH-RISK WARNING',
      counter: 'FSI INTEL',
      headline: 'Why 80% of IRAP Applications Get <span class="hl-yellow">KILLED</span> in 60 Seconds',
      subtitle: 'The 3 fatal mistakes Canadian tech founders make with NRC advisors →',
      footerCta: 'Watch Before Applying →',
    },
    {
      type: 'trap-split',
      theme: 'trap',
      pill: '❌ TRAP 01 / 03',
      counter: 'PAYROLL AUDIT',
      headline: 'The <span class="hl-yellow">Overseas Contractor</span> Disaster',
      badTitle: '❌ What Founders Try to Claim',
      badDesc: 'Paying offshore dev agencies in India, Europe, or US.<br><strong>Result:</strong> $0 Refund & Immediate Audit Flag.',
      goodTitle: '✅ The Strict NRC IRAP Rule',
      goodDesc: 'Only Canadian T4 employees & domestic subcontractors qualify.<br><strong>Result:</strong> Up to 80% Non-Repayable Cash Subsidy.',
      footerCta: 'Canadian Soil Only →',
    },
    {
      type: 'policy-alert',
      theme: 'trap',
      pill: '❌ TRAP 02 / 03',
      counter: 'TIMING TRAP',
      headline: 'The <span class="hl-yellow">Retroactive Expense</span> Myth',
      quoteBadge: '⚠️ CRITICAL NRC DEADLINE RULE',
      quoteBody: '"Any development cost incurred BEFORE written ITA approval is permanently ineligible for funding."',
      explanation: 'Founders build for 6 months, then apply. <strong>You cannot backdate claims.</strong> You must speak to an NRC advisor before spending project capital.',
      footerCta: 'Pre-Approval Required →',
    },
    {
      type: 'trap-split',
      theme: 'blueprint',
      pill: '❌ TRAP 03 / 03',
      counter: 'ELIGIBILITY RULE',
      headline: 'The <span class="hl-yellow">Commercial Pitch</span> Mistake',
      badTitle: '❌ Pitching Revenue & Sales Growth',
      badDesc: 'Treating IRAP like a venture capital pitch.<br><strong>Result:</strong> Rejected. IRAP does NOT fund sales or marketing.',
      goodTitle: '✅ Pitching Technical Uncertainty',
      goodDesc: 'Proving novel engineering risk and architectural hurdles.<br><strong>Result:</strong> Up to $500,000 Direct Cash Allocation.',
      footerCta: 'Technical Risk Only →',
    },
    {
      type: 'conversion-audit',
      theme: 'approved',
      pill: '🛡️ PRE-SUBMISSION AUDIT',
      counter: 'FSI DIGITAL',
      headline: 'Pre-Screen Your <span class="hl-yellow">Grant Readiness</span> in 60s',
      subtitle: 'Check your company against active IRAP, SR&ED, and Provincial funding streams before you apply.',
      url: 'fsidigital.ca/calculator',
      buttonText: 'Check Eligibility in 60 Seconds →',
    },
  ],
  voiceover:
    'Why do 80 percent of Canadian IRAP applications get killed in under 60 seconds? ' +
    'Here are the three fatal traps founders keep falling into. ' +
    'Trap Number 1: The overseas contractor disaster. The NRC will not fund dev shops in India or the US. You must have Canadian T4 payroll to get up to 80 percent back. ' +
    'Trap Number 2: The retroactive expense trap. You cannot backdate expenses. Any dollar spent before your written approval from an NRC advisor is permanently lost. ' +
    'Trap Number 3: Pitching commercial sales instead of technical uncertainty. IRAP is not venture capital. They only fund engineering risk, not marketing. ' +
    'Before you submit, audit your company eligibility in 60 seconds at f s i digital dot c a slash calculator.',
};

// ─── 2. High-Impact Slide CSS with Custom Themes & Components ───
function buildSlideHTML(slide, index, total) {
  const isTrap = slide.theme === 'trap';
  const isApproved = slide.theme === 'approved';
  const isBlueprint = slide.theme === 'blueprint';

  const themeClass = isTrap ? 'theme-trap' : (isApproved ? 'theme-approved' : 'theme-blueprint');
  const pillGradient = isTrap
    ? 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)'
    : (isApproved ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)');
  const glowColor = isTrap ? 'rgba(239, 68, 68, 0.40)' : (isApproved ? 'rgba(16, 185, 129, 0.40)' : 'rgba(56, 189, 248, 0.40)');

  let cardContent = '';

  if (slide.type === 'hook-alert') {
    cardContent = `
      <div class="badge-row">
        <div class="pill-badge" style="background: ${pillGradient};">${slide.pill}</div>
        <div class="counter-badge">${slide.counter}</div>
      </div>
      <div class="headline-xl">${slide.headline}</div>
      <div class="subtitle-lg">${slide.subtitle}</div>
      <div class="card-footer">
        <div class="footer-brand">🇨🇦 FSI DIGITAL ADVISORY</div>
        <div class="footer-cta" style="background: #DC2626;">${slide.footerCta}</div>
      </div>
    `;
  } else if (slide.type === 'trap-split') {
    cardContent = `
      <div class="badge-row">
        <div class="pill-badge" style="background: ${pillGradient};">${slide.pill}</div>
        <div class="counter-badge">${slide.counter}</div>
      </div>
      <div class="headline-md">${slide.headline}</div>
      <div class="split-container">
        <div class="split-box split-bad">
          <div class="split-header">${slide.badTitle}</div>
          <div class="split-body">${slide.badDesc}</div>
        </div>
        <div class="split-box split-good">
          <div class="split-header">${slide.goodTitle}</div>
          <div class="split-body">${slide.goodDesc}</div>
        </div>
      </div>
      <div class="card-footer">
        <div class="footer-brand">FSI INTEL</div>
        <div class="footer-cta">${slide.footerCta}</div>
      </div>
    `;
  } else if (slide.type === 'policy-alert') {
    cardContent = `
      <div class="badge-row">
        <div class="pill-badge" style="background: ${pillGradient};">${slide.pill}</div>
        <div class="counter-badge">${slide.counter}</div>
      </div>
      <div class="headline-md">${slide.headline}</div>
      <div class="policy-box">
        <div class="policy-badge">${slide.quoteBadge}</div>
        <div class="policy-quote">${slide.quoteBody}</div>
      </div>
      <div class="explanation-box">${slide.explanation}</div>
      <div class="card-footer">
        <div class="footer-brand">NRC POLICY #1</div>
        <div class="footer-cta">${slide.footerCta}</div>
      </div>
    `;
  } else if (slide.type === 'conversion-audit') {
    cardContent = `
      <div class="badge-row" style="justify-content: center;">
        <div class="pill-badge" style="background: ${pillGradient}; font-size: 34px;">${slide.pill}</div>
      </div>
      <div class="headline-xl" style="text-align: center; margin-top: 10px;">${slide.headline}</div>
      <div class="subtitle-lg" style="text-align: center;">${slide.subtitle}</div>
      <div class="cta-url-box">
        <span class="lock-icon">🔒</span> ${slide.url}
      </div>
      <div style="display: flex; justify-content: center; width: 100%; margin-top: 10px;">
        <div class="footer-cta" style="background: #059669; font-size: 36px; padding: 22px 54px; border-radius: 24px;">
          ${slide.buttonText}
        </div>
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
    background: transparent !important;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .slide-container {
    width: 1080px;
    height: 1920px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 220px 40px 260px 40px; /* Safe zones for vertical reels */
  }

  /* High-Contrast Glassmorphism HUD Card */
  .glass-card {
    border-radius: 46px;
    padding: 56px 48px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(34px);
    -webkit-backdrop-filter: blur(34px);
  }

  .theme-trap {
    background: linear-gradient(155deg, rgba(28, 8, 12, 0.97) 0%, rgba(12, 4, 7, 0.98) 100%);
    border: 3px solid rgba(239, 68, 68, 0.45);
    box-shadow: 0 40px 100px -15px rgba(0, 0, 0, 0.95),
                0 0 70px rgba(220, 38, 38, 0.30),
                inset 0 1px 2px rgba(255, 255, 255, 0.25);
  }

  .theme-blueprint {
    background: linear-gradient(155deg, rgba(8, 18, 38, 0.97) 0%, rgba(3, 8, 20, 0.98) 100%);
    border: 3px solid rgba(56, 189, 248, 0.45);
    box-shadow: 0 40px 100px -15px rgba(0, 0, 0, 0.95),
                0 0 70px rgba(56, 189, 248, 0.30),
                inset 0 1px 2px rgba(255, 255, 255, 0.25);
  }

  .theme-approved {
    background: linear-gradient(155deg, rgba(6, 26, 18, 0.97) 0%, rgba(2, 14, 9, 0.98) 100%);
    border: 3px solid rgba(16, 185, 129, 0.45);
    box-shadow: 0 40px 100px -15px rgba(0, 0, 0, 0.95),
                0 0 70px rgba(16, 185, 129, 0.30),
                inset 0 1px 2px rgba(255, 255, 255, 0.25);
  }

  .card-glow {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, ${glowColor} 0%, transparent 70%);
    top: -180px;
    right: -180px;
    pointer-events: none;
  }

  /* Badge Row */
  .badge-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .pill-badge {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    color: #ffffff;
    font-size: 30px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 14px 34px;
    border-radius: 9999px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  }

  .counter-badge {
    font-size: 32px;
    font-weight: 900;
    color: #FFFFFF;
    letter-spacing: 0.08em;
  }

  /* Headlines with Yellow Power-Words */
  .headline-xl {
    font-size: 84px;
    font-weight: 900;
    color: #FFFFFF;
    line-height: 1.14;
    letter-spacing: -0.02em;
    text-shadow: 0 4px 30px rgba(0, 0, 0, 0.7);
  }

  .headline-md {
    font-size: 74px;
    font-weight: 900;
    color: #FFFFFF;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  .hl-yellow {
    color: #FFE600 !important;
    text-shadow: 0 0 25px rgba(255, 230, 0, 0.5);
  }

  .subtitle-lg {
    font-size: 42px;
    font-weight: 700;
    color: #CBD5E1;
    line-height: 1.4;
  }

  /* Split Cards Component */
  .split-container {
    display: flex;
    flex-direction: column;
    gap: 22px;
    margin-top: 4px;
  }

  .split-box {
    border-radius: 28px;
    padding: 28px 36px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .split-bad {
    background: rgba(220, 38, 38, 0.16);
    border: 2px solid rgba(239, 68, 68, 0.45);
  }

  .split-bad .split-header {
    color: #F87171;
    font-size: 32px;
    font-weight: 900;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .split-good {
    background: rgba(16, 185, 129, 0.16);
    border: 2px solid rgba(16, 185, 129, 0.45);
  }

  .split-good .split-header {
    color: #34D399;
    font-size: 32px;
    font-weight: 900;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .split-body {
    font-size: 38px;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.35;
  }

  /* Policy Alert Box */
  .policy-box {
    background: rgba(239, 68, 68, 0.14);
    border-left: 8px solid #EF4444;
    border-radius: 20px;
    padding: 32px 36px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .policy-badge {
    color: #F87171;
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 0.08em;
  }

  .policy-quote {
    font-size: 40px;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.35;
    font-style: italic;
  }

  .explanation-box {
    font-size: 38px;
    font-weight: 700;
    color: #E2E8F0;
    line-height: 1.4;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 24px 32px;
  }

  /* CTA URL Box */
  .cta-url-box {
    font-size: 64px;
    font-weight: 900;
    color: #FFE600;
    background: rgba(255, 255, 255, 0.08);
    border: 3px dashed rgba(16, 185, 129, 0.7);
    border-radius: 32px;
    padding: 32px 48px;
    text-align: center;
    letter-spacing: 0.03em;
  }

  /* Footer Inside Card */
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 28px;
    border-top: 2px solid rgba(255, 255, 255, 0.15);
    margin-top: 6px;
  }

  .footer-brand {
    font-size: 32px;
    font-weight: 900;
    color: #CBD5E1;
    letter-spacing: 0.06em;
  }

  .footer-cta {
    background: #DC2626;
    color: #FFFFFF;
    font-size: 30px;
    font-weight: 900;
    padding: 14px 34px;
    border-radius: 20px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
  }
</style>
</head>
<body>
  <div class="slide-container">
    <div class="glass-card ${themeClass}">
      <div class="card-glow"></div>
      ${cardContent}
    </div>
  </div>
</body>
</html>
  `;
}

// ─── 3. Main Pipeline Orchestration ───
async function run() {
  console.log('🚀 Generating Expert Sample Reel: ', SAMPLE_STORY.title);

  // Step A: Puppeteer Screenshot with System Google Chrome
  const puppeteer = require('puppeteer');
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

  console.log('📸 Rendering 5 Custom-Themed Slide Cards via Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 2 });

  const slidePngPaths = [];
  for (let i = 0; i < SAMPLE_STORY.slides.length; i++) {
    const html = buildSlideHTML(SAMPLE_STORY.slides[i], i, SAMPLE_STORY.slides.length);
    const htmlPath = path.join(SLIDE_DIR, `slide-${i}.html`);
    const pngPath = path.join(SLIDE_DIR, `slide-${i}.png`);

    fs.writeFileSync(htmlPath, html);
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: pngPath, type: 'png', omitBackground: true });
    console.log(`   ✅ Slide ${i + 1}/${SAMPLE_STORY.slides.length} captured (theme: ${SAMPLE_STORY.slides[i].theme})`);
    slidePngPaths.push(pngPath);
  }
  await browser.close();

  // Step B: Neural Audio Generation (Edge-TTS)
  const voiceoverPath = path.join(OUTPUT_DIR, 'voiceover.mp3');
  console.log(`🎙️ Synthesizing Neural Voiceover (${SAMPLE_STORY.voice})...`);
  const edgeTTS = path.join(VENV_BIN, 'edge-tts');
  const formattedScript = SAMPLE_STORY.voiceover
    .replace(/80 percent/g, '80 percent')
    .replace(/IRAP/g, 'Eye-rap')
    .replace(/SR&ED/g, 'S R and E D')
    .replace(/NRC/g, 'N R C')
    .replace(/fsidigital\.ca\/calculator/gi, 'f s i digital dot c a slash calculator');

  execSync(
    `"${edgeTTS}" --voice "${SAMPLE_STORY.voice}" --rate "+4%" --text "${formattedScript.replace(/"/g, '\\"')}" --write-media "${voiceoverPath}"`,
    { stdio: 'inherit' }
  );

  // Step C: Audio Ducking & BGM Mix
  const mixedAudioPath = path.join(OUTPUT_DIR, 'mixed-audio.mp3');
  const durationOutput = execSync(
    `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${voiceoverPath}"`,
    { encoding: 'utf8' }
  ).trim();
  const totalDuration = parseFloat(durationOutput);
  const fadeOutStart = Math.max(0, totalDuration - 2.0);
  const bgmPath = path.join(BGM_DIR, SAMPLE_STORY.bgm);

  console.log(`🎵 Mixing Voiceover with BGM (${totalDuration.toFixed(1)}s total duration)...`);
  execSync(
    [
      'ffmpeg -y',
      `-i "${voiceoverPath}"`,
      `-stream_loop -1 -i "${bgmPath}"`,
      `-filter_complex "[1:a]volume=0.10,afade=t=out:st=${fadeOutStart.toFixed(2)}:d=2.0[bgm];[0:a][bgm]amix=inputs=2:duration=first:dropout_transition=2[a]"`,
      '-map "[a]"',
      '-c:a libmp3lame -b:a 192k -ar 44100',
      `"${mixedAudioPath}"`,
    ].join(' '),
    { stdio: 'pipe' }
  );

  // Step D: Assemble Video with Continuous B-Roll Motion
  const slideDuration = totalDuration / slidePngPaths.length;
  console.log(`🎬 Compiling Final 1080x1920 MP4 Video (${slideDuration.toFixed(2)}s per slide)...`);

  const inputListPath = path.join(SLIDE_DIR, 'input.txt');
  const inputList =
    slidePngPaths.map((p) => `file '${p}'\nduration ${slideDuration.toFixed(2)}`).join('\n') +
    `\nfile '${slidePngPaths[slidePngPaths.length - 1]}'`;
  fs.writeFileSync(inputListPath, inputList);

  const brollPath = path.join(BROLL_DIR, SAMPLE_STORY.broll);
  const finalVideoPublicPath = path.join(PUBLIC_REELS_DIR, `${SAMPLE_STORY.slug}.mp4`);
  const finalVideoOutPath = path.join(OUTPUT_DIR, `${SAMPLE_STORY.slug}.mp4`);

  execSync(
    [
      'ffmpeg -y',
      `-stream_loop -1 -i "${brollPath}"`,
      `-f concat -safe 0 -i "${inputListPath}"`,
      `-i "${mixedAudioPath}"`,
      '-filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,eq=brightness=-0.14:contrast=1.15[bg];[1:v]scale=1080:1920:flags=lanczos[fg];[bg][fg]overlay=0:0:shortest=1[v]"',
      '-map "[v]"',
      '-map 2:a',
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

  // Copy to public reels directory
  fs.copyFileSync(finalVideoOutPath, finalVideoPublicPath);

  console.log('🎉 EXPERT SAMPLE REEL GENERATED SUCCESSFULLY!');
  console.log('📍 Output File (Public URL): /videos/reels/' + `${SAMPLE_STORY.slug}.mp4`);
  console.log('📍 Local Absolute Path:', finalVideoPublicPath);
}

run().catch((err) => {
  console.error('❌ Pipeline Error:', err);
  process.exit(1);
});
