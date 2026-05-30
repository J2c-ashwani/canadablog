#!/usr/bin/env node
/**
 * 🎬 Video Generation Engine for fsidigital.ca
 * 
 * Converts blog post content into branded YouTube Shorts / Reels.
 * 
 * Pipeline:
 *   1. Extract key stats from a blog post (via Gemini or hardcoded)
 *   2. Generate branded HTML slides
 *   3. Screenshot slides via Puppeteer
 *   4. Generate voiceover via edge-tts
 *   5. Stitch slides + voiceover into MP4 via FFmpeg
 * 
 * Usage:
 *   node scripts/video-engine/generate-video.js --topic "Alberta Technology Grants"
 *   node scripts/video-engine/generate-video.js --auto  (picks latest unprocessed blog)
 * 
 * Dependencies: puppeteer, edge-tts (Python), ffmpeg
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, '../../out/videos');
const SLIDE_DIR = path.join(OUTPUT_DIR, 'slides');
const VENV_BIN = path.join(__dirname, '../../.venv/bin');

// ─── Slide Content Generator ───────────────────────────────
function generateSlideContent(topic) {
  // Pre-built content templates for different grant topics
  // In production, this would call Gemini API to extract stats from the blog
  const templates = {
    default: {
      slides: [
        {
          type: 'intro',
          tag: 'VERIFIED GRANTS',
          title: topic,
          subtitle: 'Here are the Top 3 Programs ->',
        },
        {
          type: 'stat',
          tag: 'Innovation Giant',
          title: 'IRAP Innovation Grant',
          amount: 'Up to $500,000',
          desc: 'NRC\'s IRAP funds SMEs developing innovative tech. Get non-repayable funding + expert advisors.',
        },
        {
          type: 'stat',
          tag: 'Digital Adoption',
          title: 'CDAP Digital Grant',
          amount: 'Up to $15,000',
          desc: 'Free digital advisor + cash grant for small businesses to go digital. Covers e-commerce & tools.',
        },
        {
          type: 'stat',
          tag: 'Tax Benefits',
          title: 'SR&ED Tax Credits',
          amount: 'Up to 35% Back',
          desc: 'Canada\'s largest R&D incentive. Refundable tax credits on qualifying R&D expenditures.',
        },
        {
          type: 'cta',
          title: 'Want the full list + details?',
          cta: 'fsidigital.ca',
        },
      ],
      // We read EXACTLY what is written on slides, but format it for the TTS engine below.
      voiceover: `Verified Grants: ${topic}. Here are the Top 3 Programs. ` +
        `Number 1. Innovation Giant: IRAP Innovation Grant. Up to $500,000. NRC's IRAP funds SMEs developing innovative tech. Get non-repayable funding plus expert advisors. ` +
        `Number 2. Digital Adoption: CDAP Digital Grant. Up to $15,000. Free digital advisor plus cash grant for small businesses to go digital. Covers e-commerce and tools. ` +
        `Number 3. Tax Benefits: SR&ED Tax Credits. Up to 35% Back. Canada's largest R&D incentive. Refundable tax credits on qualifying R&D expenditures. ` +
        `Want the full list and details? Visit fsidigital.ca.`
    }
  };

  return templates.default;
}

// ─── HTML Slide Renderer ───────────────────────────────────
function renderSlideHTML(slide, index) {
  const slideClasses = {
    intro: 'slide-intro',
    stat: 'slide-stat',
    cta: 'slide-cta',
  };

  let bodyContent = '';

  if (slide.type === 'intro') {
    bodyContent = `
      <div class="bg-circle1"></div><div class="bg-circle2"></div>
      <div class="top-bar">
        <div class="logo">FSI Digital</div>
        <div class="flag">🇨🇦 🇺🇸</div>
      </div>
      <div class="mid">
        <div class="tag">${slide.tag}</div>
        <div class="title">${slide.title}</div>
        <div class="subtitle">${slide.subtitle}</div>
      </div>
    `;
  } else if (slide.type === 'stat') {
    bodyContent = `
      <div class="header">
        <div class="num-badge"><span>${index}</span></div>
        <div class="header-text">
          <div class="series-tag">${slide.tag}</div>
          <div class="grant-name">${slide.title}</div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="body">
        <div class="amt-label">Funding Amount</div>
        <div class="amt">${slide.amount}</div>
        <div class="desc">${slide.desc}</div>
      </div>
      <div class="footer">
        <div class="url">fsidigital.ca/grants</div>
        <div class="apply-btn">Save & Next →</div>
      </div>
    `;
  } else if (slide.type === 'cta') {
    bodyContent = `
      <div class="bg-overlay"></div>
      <div class="content">
        <div class="logo-huge">FSI Digital</div>
        <h2>${slide.title.replace('+', '<span style="color:#ff4444;">+</span><br>')}</h2>
        <div class="lead-box">
          <p>Visit</p>
          <div class="comment-word">fsidigital.ca</div>
          <p style="margin-top: 20px; font-size:40px; color:#aaa;">to check eligibility</p>
        </div>
        <div class="url-text">${slide.cta}</div>
      </div>
    `;
  }

  // Read slide template and inject content
  const template = fs.readFileSync(path.join(__dirname, 'slide-template.html'), 'utf8');
  const slideClass = slideClasses[slide.type] || 'slide-intro';

  return template.replace('</body>', `
    <div class="slide ${slideClass}">
      ${bodyContent}
    </div>
  </body>`);
}

// ─── Puppeteer Screenshot ──────────────────────────────────
async function screenshotSlides(slides) {
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch {
    console.log('📦 Installing puppeteer...');
    execSync('npm install puppeteer', { cwd: path.join(__dirname, '../..'), stdio: 'inherit' });
    puppeteer = require('puppeteer');
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  const paths = [];
  for (let i = 0; i < slides.length; i++) {
    const html = renderSlideHTML(slides[i], i);
    const htmlPath = path.join(SLIDE_DIR, `slide-${i}.html`);
    const pngPath = path.join(SLIDE_DIR, `slide-${i}.png`);

    fs.writeFileSync(htmlPath, html);
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: pngPath, type: 'png' });

    console.log(`   ✅ Slide ${i + 1}/${slides.length} captured`);
    paths.push(pngPath);
  }

  await browser.close();
  return paths;
}

// ─── Format text so TTS reads money correctly ──────────────
function formatTextForTTS(text) {
  return text
    // The previous regex looked for literal backslashes. Let's fix that.
    .replace(/\$\s?15,000/g, ' 15 thousand dollars ')
    .replace(/\$\s?500,000/g, ' 500 thousand dollars ')
    .replace(/\$\s?500K/gi, ' 500 thousand dollars ')
    .replace(/\$\s?15K/gi, ' 15 thousand dollars ')
    .replace(/\$/g, ' dollars ') // catch any remaining
    .replace(/35%/g, '35 percent')
    .replace(/fsidigital\.ca/gi, 'f s i digital dot c a')
    .replace(/SR&ED/g, 'S R and E D')
    .replace(/IRAP/g, 'Eye rap')
    .replace(/CDAP/g, 'C dap')
    .replace(/SMEs/g, 'small and medium enterprises'); // expanding jargon
}

// ─── Voiceover Generation ──────────────────────────────────
function generateVoiceover(text, outputPath) {
  const edgeTTS = path.join(VENV_BIN, 'edge-tts');
  
  // Using a professional North American English voice
  const voice = 'en-US-GuyNeural'; // Male, professional
  
  const formattedText = formatTextForTTS(text);
  
  console.log('   🎙️ Generating voiceover (with corrected pronunciation)...');
  execSync(
    `"${edgeTTS}" --voice "${voice}" --rate "+5%" --text "${formattedText.replace(/"/g, '\\"')}" --write-media "${outputPath}"`,
    { stdio: 'pipe' }
  );
  console.log('   ✅ Voiceover generated');
}

// ─── FFmpeg Video Assembly ─────────────────────────────────
function assembleVideo(slidePaths, voiceoverPath, outputPath) {
  console.log('   🎬 Assembling video with FFmpeg...');

  // Get voiceover duration
  const durationOutput = execSync(
    `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${voiceoverPath}"`,
    { encoding: 'utf8' }
  ).trim();
  const totalDuration = parseFloat(durationOutput);
  const slideDuration = totalDuration / slidePaths.length;

  console.log(`   ⏱️ Total voiceover: ${totalDuration.toFixed(1)}s → ${slideDuration.toFixed(1)}s per slide`);

  // Create input file for FFmpeg concat
  const inputListPath = path.join(SLIDE_DIR, 'input.txt');
  const inputList = slidePaths.map(p =>
    `file '${p}'\nduration ${slideDuration.toFixed(2)}`
  ).join('\n') + `\nfile '${slidePaths[slidePaths.length - 1]}'`;

  fs.writeFileSync(inputListPath, inputList);

  // FFmpeg: stitch slides + voiceover → MP4
  execSync([
    'ffmpeg -y',
    `-f concat -safe 0 -i "${inputListPath}"`,         // Slides
    `-i "${voiceoverPath}"`,                             // Audio
    '-vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p"',
    '-c:v libx264 -profile:v main -preset medium -crf 23',
    '-c:a aac -b:a 128k -ar 44100',
    '-shortest',
    '-movflags +faststart',
    `"${outputPath}"`
  ].join(' '), { stdio: 'pipe' });

  console.log(`   ✅ Video assembled: ${outputPath}`);
}

// ─── Social Media Metadata Generator ───────────────────────
function generateSocialMetadata(topic) {
  const now = new Date();
  const year = now.getFullYear();

  return {
    youtube: {
      title: `${topic} ${year} — FREE Government Funding (How to Apply)`,
      description: `🇨🇦🇺🇸 ${topic} — Complete guide to free government grants for businesses.\n\n` +
        `✅ No repayment required\n✅ Direct official links\n✅ Updated for ${year}\n\n` +
        `🔗 Check your eligibility FREE: https://www.fsidigital.ca/grant-finder\n\n` +
        `#grants #smallbusiness #funding #government #startup`,
      tags: [
        'business grants', 'government grants', 'free funding', 'small business',
        'startup grants', 'canada grants', 'usa grants', 'IRAP', 'CDAP', 'SRED',
        `grants ${year}`, 'non repayable grants', 'how to apply for grants'
      ],
    },
    linkedin: {
      text: `💰 ${topic} — ${year} Update\n\n` +
        `Most business owners don't know they qualify for $15K-$500K in FREE government grants.\n\n` +
        `Here are the top 3 programs:\n` +
        `1️⃣ IRAP — Up to $500K for innovation\n` +
        `2️⃣ CDAP — $15K cash for digital adoption\n` +
        `3️⃣ SR&ED — 35-70% of R&D costs returned\n\n` +
        `No equity. No repayment. Direct government links.\n\n` +
        `Check your eligibility → https://www.fsidigital.ca/grant-finder\n\n` +
        `#SmallBusiness #Grants #Funding #Startup #Canada #USA #Entrepreneur`,
    },
    twitter: {
      text: `🚨 ${topic}\n\n` +
        `Most founders don't know about these FREE programs:\n\n` +
        `💰 IRAP: Up to $500K\n` +
        `💰 CDAP: $15K cash\n` +
        `💰 SR&ED: 35-70% R&D back\n\n` +
        `No repayment. Zero equity.\n\n` +
        `Check eligibility FREE 👇\nhttps://www.fsidigital.ca/grant-finder`,
      hashtags: '#grants #smallbusiness #startup #funding #canada #usa',
    },
    instagram: {
      caption: `💰 FREE Government Grants for Businesses (${year})\n\n` +
        `Did you know you can get up to $500K+ in non-repayable funding?\n\n` +
        `Top 3 Programs:\n` +
        `✅ IRAP — Up to $500,000\n` +
        `✅ CDAP — $15,000 cash\n` +
        `✅ SR&ED — 35-70% R&D costs back\n\n` +
        `Link in bio → fsidigital.ca\n\n` +
        `#businessgrants #governmentgrants #freefunding #smallbusiness #startupfunding ` +
        `#canadabusiness #usabusiness #entrepreneur #grants2026 #fundingopportunity ` +
        `#smb #grantmoney #businessfunding #irap #cdap #sred #noequity`,
    },
    reddit: {
      title: `${topic} — Here's how to get $15K-$500K in free government grants (${year})`,
      body: `I've compiled a list of the top government grant programs for businesses in Canada and the USA.\n\n` +
        `**Top 3 Programs:**\n\n` +
        `1. **IRAP** — Up to $500,000 for innovation/R&D projects\n` +
        `2. **CDAP** — $15,000 cash grant for digital adoption\n` +
        `3. **SR&ED** — 35-70% of your R&D expenses returned as cash\n\n` +
        `All non-repayable. No equity taken. Direct government application links.\n\n` +
        `Full guide with eligibility checker: https://www.fsidigital.ca/grant-finder`,
      subreddits: ['r/smallbusiness', 'r/Entrepreneur', 'r/startups', 'r/canada', 'r/business'],
    },
    pinterest: {
      title: `${topic} — Free Government Funding ${year}`,
      description: `Complete guide to free government grants for small businesses. ` +
        `Up to $500K+ in non-repayable funding. IRAP, CDAP, SR&ED programs. ` +
        `No equity, no repayment. Apply now at fsidigital.ca`,
      boardName: 'Business Grants & Funding',
    },
  };
}

// ─── Main Execution ────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const topic = args.includes('--topic')
    ? args[args.indexOf('--topic') + 1]
    : 'Government Business Grants';

  console.log('═══════════════════════════════════════════════════════');
  console.log(`  🎬 VIDEO GENERATOR — "${topic}"`);
  console.log('═══════════════════════════════════════════════════════\n');

  // Ensure output directories exist
  fs.mkdirSync(SLIDE_DIR, { recursive: true });

  // Step 1: Generate content
  console.log('📝 Step 1: Generating slide content...');
  const content = generateSlideContent(topic);
  console.log(`   ✅ Generated ${content.slides.length} slides\n`);

  // Step 2: Render slides
  console.log('🖼️ Step 2: Rendering branded slides...');
  const slidePaths = await screenshotSlides(content.slides);
  console.log('');

  // Step 3: Generate voiceover
  console.log('🎙️ Step 3: Generating voiceover...');
  const voiceoverPath = path.join(OUTPUT_DIR, 'voiceover.mp3');
  generateVoiceover(content.voiceover, voiceoverPath);
  console.log('');

  // Step 4: Assemble video
  console.log('🎬 Step 4: Assembling final video...');
  const timestamp = new Date().toISOString().split('T')[0];
  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const videoPath = path.join(OUTPUT_DIR, `${timestamp}-${slug}.mp4`);
  assembleVideo(slidePaths, voiceoverPath, videoPath);
  console.log('');

  // Step 5: Generate social metadata
  console.log('📱 Step 5: Generating social media metadata...');
  const metadata = generateSocialMetadata(topic);
  const metadataPath = path.join(OUTPUT_DIR, `${timestamp}-${slug}-metadata.json`);
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(`   ✅ Metadata saved: ${metadataPath}\n`);

  // Summary
  console.log('═══════════════════════════════════════════════════════');
  console.log('  ✅ VIDEO GENERATED SUCCESSFULLY');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`  📹 Video:    ${videoPath}`);
  console.log(`  📋 Metadata: ${metadataPath}`);
  console.log(`  📐 Format:   1080×1920 (YouTube Shorts / Reels)`);
  console.log(`  🎙️ Voice:    en-US-GuyNeural (Microsoft Edge TTS)`);
  console.log('═══════════════════════════════════════════════════════\n');
}

main().catch(console.error);
