#!/usr/bin/env node
/**
 * 🎬 Dynamic Video Generation Engine for fsidigital.ca
 * Inspired by MoneyPrinterTurbo — Upgraded to Full Commercial Standard
 * 
 * Pipeline:
 *   1. Resolve topic profile (grant amounts, criteria, hook, voiceover script)
 *   2. Generate floating glassmorphism HUD slide cards (HTML/CSS)
 *   3. Screenshot slides with alpha channel via Puppeteer (omitBackground: true)
 *   4. Generate human-like neural voiceover via Microsoft Edge-TTS
 *   5. Mix voiceover with royalty-free background music (audio ducking at 12% + fade-out)
 *   6. Composite alpha slide cards over continuous looping B-roll video background
 *   7. Output 1080×1920 MP4 directly to public/videos/reels/ and out/videos/
 * 
 * Usage:
 *   node scripts/video-engine/generate-video.js --topic "NRC IRAP Innovation Grants"
 *   node scripts/video-engine/generate-video.js --all
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO_ROOT = path.join(__dirname, '../..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'out/videos');
const SLIDE_DIR = path.join(OUTPUT_DIR, 'slides');
const PUBLIC_REELS_DIR = path.join(REPO_ROOT, 'public/videos/reels');
const ASSETS_DIR = path.join(__dirname, 'assets');
const BROLL_DIR = path.join(ASSETS_DIR, 'broll');
const BGM_DIR = path.join(ASSETS_DIR, 'bgm');
const VENV_BIN = path.join(REPO_ROOT, '.venv/bin');

// ─── Chrome Detection Helper ────────────────────────────────
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
  return undefined; // Let Puppeteer use its bundled/cached browser if found
}

// ─── Topic Content Database ─────────────────────────────────
const TOPIC_PRESETS = {
  'digital-adoption-funding': {
    slug: 'digital-adoption-funding',
    title: 'CDAP & Digital Adoption Grants',
    broll: 'tech-network.mp4',
    bgm: 'bgm-01.mp3',
    slides: [
      {
        type: 'intro',
        pill: '🇨🇦 ACTIVE FEDERAL FUNDING',
        title: 'Digital Adoption Grants 2026',
        subtitle: 'Get up to $15,000 cash grant plus $100,000 in zero percent financing for business technology.',
      },
      {
        type: 'stat',
        counter: '01 / 03',
        pill: 'DIGITAL TECH GRANT',
        title: 'CDAP Boost Your Business',
        amountLabel: 'NON-REPAYABLE CASH GRANT',
        amount: '$15,000',
        features: [
          'Direct grant to cover 90% of digital advisor fees',
          'For Canadian businesses with $500K+ annual revenue',
          'Covers ERP, CRM, and cloud workflow systems',
        ],
      },
      {
        type: 'stat',
        counter: '02 / 03',
        pill: 'BDC ZERO PERCENT LOAN',
        title: 'BDC 0% Digital Financing',
        amountLabel: 'ZERO PERCENT INTEREST CAPITAL',
        amount: '$100,000',
        features: [
          '0% interest loan with 5-year payback term',
          'Zero penalty early repayment allowed',
          'Direct companion to CDAP advisory stream',
        ],
      },
      {
        type: 'stat',
        counter: '03 / 03',
        pill: 'REGIONAL DIGITAL STREAMS',
        title: 'Provincial Tech Grants',
        amountLabel: 'MATCHING REIMBURSEMENT',
        amount: 'Up to $25,000',
        features: [
          'Stackable on top of federal CDAP allocations',
          'Available in Ontario, BC, and Alberta',
          'Covers custom software & automation tooling',
        ],
      },
      {
        type: 'cta',
        pill: 'FREE GRANT FINDER',
        title: 'Check Your Company Match',
        subtitle: 'See which non-repayable digital funding programs your business qualifies for today.',
        url: 'fsidigital.ca/calculator',
      },
    ],
    voiceover:
      'Digital Adoption Grants for Canadian businesses in 2026. ' +
      'If your company is modernizing software, e-commerce, or automation, you can qualify for significant non-dilutive capital. ' +
      'First: The CDAP Boost Your Business grant provides up to fifteen thousand dollars in non-repayable cash to build your digital strategy. ' +
      'Second: Qualified companies unlock up to one hundred thousand dollars in zero percent interest financing directly from BDC. ' +
      'Third: Provincial digital programs offer up to twenty-five thousand dollars in matching funds that legally stack with federal programs. ' +
      'Find out exactly how much your company qualifies for at f s i digital dot c a slash calculator.',
  },

  'rd-tax-credits-canada': {
    slug: 'rd-tax-credits-canada',
    title: 'SR&ED R&D Tax Credits Explained',
    broll: 'tech-network.mp4',
    bgm: 'bgm-02.mp3',
    slides: [
      {
        type: 'intro',
        pill: '🔬 CRA INCENTIVE PROGRAM',
        title: 'Getting Cash Back on R&D in Canada',
        subtitle: 'How Canadian tech companies claim up to 35% in direct cash refunds on engineering wages.',
      },
      {
        type: 'stat',
        counter: '01 / 03',
        pill: 'FEDERAL CRA REFUND',
        title: 'SR&ED Federal Tax Credit',
        amountLabel: 'DIRECT CASH REFUND',
        amount: 'Up to 35%',
        amountVariant: 'emerald',
        features: [
          '100% refundable for CCPCs (Canadian-Controlled Private Corps)',
          'Refunds developer wages, contractor costs, and materials',
          'No minimum revenue or profit required',
        ],
      },
      {
        type: 'stat',
        counter: '02 / 03',
        pill: 'PROVINCIAL TOP-UP',
        title: 'Provincial R&D Tax Credits',
        amountLabel: 'ADDITIONAL REFUNDABLE CREDITS',
        amount: 'Up to 10%',
        amountVariant: 'emerald',
        features: [
          'Ontario (OITC/ORDTC) and BC (BC SR&ED) top-ups',
          'Combined effective tax recovery reaches 45%+',
          'Directly paid via CRA corporate tax filings',
        ],
      },
      {
        type: 'stat',
        counter: '03 / 03',
        pill: 'ELIGIBLE EXPENDITURES',
        title: 'What Qualifies for Cash Back',
        amountLabel: 'QUALIFIED EXPENDITURES',
        amount: '$3.5 Billion/yr',
        amountVariant: 'gold',
        features: [
          'Internal software and hardware engineering salaries',
          'Eligible third-party technical subcontractors',
          'Prototypes, experimentation trials, and testing',
        ],
      },
      {
        type: 'cta',
        pill: 'ESTIMATE YOUR REFUND',
        title: 'Calculate Your R&D Refund',
        subtitle: 'Enter your engineering payroll into our free calculator to see your estimated cash refund.',
        url: 'fsidigital.ca/calculator',
      },
    ],
    voiceover:
      'Getting Cash Back on R&D: Canada\'s S R and E D program explained. ' +
      'If your company builds software, hardware, or technical processes in Canada, CRA will refund up to 35 percent of your developer salaries in CASH. ' +
      'Even with zero revenue, Canadian-Controlled Private Corporations receive 100 percent refundable cash payouts. ' +
      'Combined with provincial tax credits in Ontario, B C, and Quebec, effective recovery often exceeds 45 percent. ' +
      'Canada distributes over 3.5 billion dollars in S R and E D credits every single year. ' +
      'Calculate your estimated cash refund in 60 seconds at f s i digital dot c a slash calculator.',
  },

  'women-entrepreneur-grants': {
    slug: 'women-entrepreneur-grants',
    title: 'Women Entrepreneur Grants: $25K to $250K',
    broll: 'office-team.mp4',
    bgm: 'bgm-03.mp3',
    slides: [
      {
        type: 'intro',
        pill: '🌟 GOVERNMENT FUNDING',
        title: 'Women Entrepreneur Grants 2026',
        subtitle: 'From $25,000 starter grants to $250,000 scaling capital for women-owned businesses.',
      },
      {
        type: 'stat',
        counter: '01 / 03',
        pill: 'WES ECOSYSTEM FUND',
        title: 'Women Entrepreneurship Strategy',
        amountLabel: 'NON-REPAYABLE ALLOCATION',
        amount: 'Up to $100,000',
        features: [
          'Non-dilutive capital for scaling operations',
          'Must be at least 51% women-owned and controlled',
          'Funds market expansion, tooling, and commercialization',
        ],
      },
      {
        type: 'stat',
        counter: '02 / 03',
        pill: 'BDC WOMEN TECH FUND',
        title: 'BDC Women in Tech Capital',
        amountLabel: 'GROWTH FINANCING POOL',
        amount: '$250,000+',
        features: [
          'Patient debt and co-investment capital',
          'Designed specifically for women-led tech companies',
          'Executive advisory network and mentoring support',
        ],
      },
      {
        type: 'stat',
        counter: '03 / 03',
        pill: 'TRADE & EXPORT ACCELERATOR',
        title: 'EDC Women in Trade Grants',
        amountLabel: 'EXPORT MATCHING CAPITAL',
        amount: 'Up to $50,000',
        features: [
          'Expands international sales into the US, UK, and Europe',
          'Reimburses global marketing, trade missions, and IP filing',
          'Zero equity taken',
        ],
      },
      {
        type: 'cta',
        pill: 'VERIFY ELIGIBILITY',
        title: 'Check Your Grant Match',
        subtitle: 'Find active federal and provincial funding streams open to women founders today.',
        url: 'fsidigital.ca/calculator',
      },
    ],
    voiceover:
      'Government funding for women-owned businesses in 2026. ' +
      'From twenty-five thousand dollar starter grants to two hundred fifty thousand dollars in growth capital, dedicated government support is active across Canada. ' +
      'First: The Women Entrepreneurship Strategy provides up to one hundred thousand dollars in non-repayable capital for scaling companies. ' +
      'Second: BDC\'s Women in Tech fund offers dedicated growth financing and patient debt starting at two hundred fifty thousand dollars. ' +
      'Third: EDC provides export grants up to fifty thousand dollars to expand your sales globally with zero equity taken. ' +
      'Check your company\'s grant eligibility at f s i digital dot c a slash calculator.',
  },

  'green-economy-cleantech-funding': {
    slug: 'green-economy-cleantech-funding',
    title: 'CleanTech & Green Economy Grants',
    broll: 'tech-network.mp4',
    bgm: 'bgm-01.mp3',
    slides: [
      {
        type: 'intro',
        pill: '🌱 FEDERAL CLIMATE CAPITAL',
        title: 'CleanTech & Green Economy Grants',
        subtitle: 'Access Canada\'s multi-billion dollar clean innovation and sustainability funding facilities.',
      },
      {
        type: 'stat',
        counter: '01 / 03',
        pill: 'SDTC TECH FUND',
        title: 'SDTC Clean Innovation Grant',
        amountLabel: 'NON-REPAYABLE SEED CAPITAL',
        amount: 'Up to $5,000,000',
        features: [
          'Non-repayable funding for pre-commercial clean technologies',
          'Covers up to 33% of eligible project costs',
          'Zero equity dilution for founders',
        ],
      },
      {
        type: 'stat',
        counter: '02 / 03',
        pill: 'NET ZERO ACCELERATOR',
        title: 'Strategic Innovation Fund',
        amountLabel: 'MAJOR DECARBONIZATION ALLOCATION',
        amount: '$10,000,000+',
        features: [
          'For large-scale decarbonization and green industrial scaling',
          'National priority facility for Canadian clean tech',
          'Direct matching agreements with federal ministers',
        ],
      },
      {
        type: 'stat',
        counter: '03 / 03',
        pill: 'PROVINCIAL CLEAN GRANTS',
        title: 'Regional Clean Growth Streams',
        amountLabel: 'PROVINCIAL INCENTIVES',
        amount: 'Up to $500,000',
        features: [
          'Emissions Reduction Alberta (ERA) & CleanBC facilities',
          'Energy efficiency and carbon reduction matching grants',
          'Open to small and mid-sized commercial enterprises',
        ],
      },
      {
        type: 'cta',
        pill: 'VERIFY MATCH',
        title: 'Check CleanTech Funding',
        subtitle: 'Discover active grant programs and funding caps for your sustainable technology venture.',
        url: 'fsidigital.ca/calculator',
      },
    ],
    voiceover:
      'Clean tech and green economy capital in 2026. ' +
      'Clean technology and sustainability ventures have access to the largest non-repayable capital pools in Canadian history. ' +
      'First: SDTC funds pre-commercial clean tech pilots with up to five million dollars in non-repayable capital without taking equity. ' +
      'Second: The Net Zero Accelerator provides major eight-figure growth allocations for industrial decarbonization. ' +
      'Third: Provincial programs like Emissions Reduction Alberta and Clean B C provide up to five hundred thousand dollars in matching grants. ' +
      'Check your eligibility at f s i digital dot c a slash calculator.',
  },

  'nrc-irap-innovation-grants': {
    slug: 'nrc-irap-innovation-grants',
    title: 'NRC IRAP Innovation Grants',
    broll: 'tech-network.mp4',
    bgm: 'bgm-01.mp3',
    slides: [
      {
        type: 'intro',
        pill: '🇨🇦 CANADA INNOVATION GIANT',
        title: 'NRC IRAP Innovation Grants',
        subtitle: 'How Canadian tech companies secure up to $500,000 in non-repayable R&D capital.',
      },
      {
        type: 'stat',
        counter: '01 / 03',
        pill: 'FEDERAL INNOVATION GRANT',
        title: 'NRC IRAP R&D Grant',
        amountLabel: 'MAXIMUM CASH ALLOCATION',
        amount: '$500,000',
        features: [
          'Non-Repayable Grant (Zero Equity Dilution)',
          'For Canadian Incorporated SMEs (<500 FTEs)',
          'Covers Technical Salaries (up to 80%) & Subcontractors (up to 50%)',
        ],
      },
      {
        type: 'stat',
        counter: '02 / 03',
        pill: 'EXPERT ITA ADVISORS',
        title: 'Industrial Technology Advisors',
        amountLabel: 'DEDICATED TECHNICAL ADVISOR',
        amount: 'Free Advisory',
        features: [
          'Assigned seasoned tech executive to guide your application',
          'Direct mentorship on commercial strategy and market entry',
          'Pre-qualifies your business before full proposal submission',
        ],
      },
      {
        type: 'stat',
        counter: '03 / 03',
        pill: 'DUAL-FUNDING STACK',
        title: 'Stack IRAP with SR&ED',
        amountLabel: 'LEGAL FUNDING STACK',
        amount: '60%+ Total Costs',
        features: [
          'IRAP pays your engineering wages upfront throughout the year',
          'SR&ED refunds remaining non-subsidized expenditures at year end',
          'Maximizes cash flow without raising venture debt',
        ],
      },
      {
        type: 'cta',
        pill: 'CHECK ELIGIBILITY',
        title: 'Verify Your IRAP Readiness',
        subtitle: 'Find out if your technical innovation qualifies for NRC IRAP funding in under 60 seconds.',
        url: 'fsidigital.ca/calculator',
      },
    ],
    voiceover:
      'NRC IRAP Innovation Grants in 2026. ' +
      'The National Research Council\'s Eye-rap program is Canada\'s premier funding stream for technology companies. ' +
      'First: Eye-rap provides up to five hundred thousand dollars in non-repayable grants to fund technical salaries and subcontractors. ' +
      'Second: Every applicant is paired with a dedicated Industrial Technology Advisor who mentors your commercialization roadmap. ' +
      'Third: You can legally stack Eye-rap with S R and E D tax credits, recovering over 60 percent of your total technical development costs. ' +
      'Check your company\'s Eye-rap eligibility at f s i digital dot c a slash calculator.',
  },
};

// ─── Generate Slide Content Helper ──────────────────────────
function resolveTopicContent(topic) {
  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  if (TOPIC_PRESETS[slug]) {
    return TOPIC_PRESETS[slug];
  }

  // Look for partial match
  for (const [key, preset] of Object.entries(TOPIC_PRESETS)) {
    if (slug.includes(key) || key.includes(slug)) {
      return preset;
    }
  }

  // Fallback generic high-converting template
  return {
    slug,
    title: topic,
    broll: 'tech-network.mp4',
    bgm: 'bgm-01.mp3',
    slides: [
      {
        type: 'intro',
        pill: '🇨🇦 VERIFIED GOVERNMENT GRANTS',
        title: topic,
        subtitle: 'Here are the Top 3 Programs you can qualify for in 2026 →',
      },
      {
        type: 'stat',
        counter: '01 / 03',
        pill: 'INNOVATION GIANT',
        title: 'NRC IRAP Innovation Grant',
        amountLabel: 'NON-REPAYABLE GRANT',
        amount: '$500,000',
        features: [
          'Covers up to 80% of technical salaries',
          'Zero equity taken from founders',
          'Includes expert technology advisor guidance',
        ],
      },
      {
        type: 'stat',
        counter: '02 / 03',
        pill: 'DIGITAL ADOPTION',
        title: 'CDAP Digital Grant',
        amountLabel: 'CASH GRANT + 0% LOAN',
        amount: '$15,000 + $100K',
        features: [
          'Non-repayable cash for software and automation',
          'Access to 0% interest BDC financing',
          'For Canadian small and mid-sized businesses',
        ],
      },
      {
        type: 'stat',
        counter: '03 / 03',
        pill: 'TAX CREDITS',
        title: 'SR&ED R&D Tax Credits',
        amountLabel: 'DIRECT CASH REFUND',
        amount: 'Up to 35%',
        amountVariant: 'emerald',
        features: [
          'Refundable cash credit on engineering payroll',
          'Canada\'s largest non-dilutive incentive',
          'Claimable even with zero revenue or profit',
        ],
      },
      {
        type: 'cta',
        pill: 'FREE GRANT FINDER',
        title: 'Check Your Grant Eligibility',
        subtitle: 'Calculate your non-repayable grant match across 500+ active programs in 60 seconds.',
        url: 'fsidigital.ca/calculator',
      },
    ],
    voiceover:
      `Verified Grants: ${topic}. Here are the Top 3 Programs for Canadian businesses. ` +
      `Number 1. The NRC Eye-rap innovation grant funds up to five hundred thousand dollars in non-repayable cash for novel development. ` +
      `Number 2. The CDAP digital grant gives you fifteen thousand dollars in cash plus one hundred thousand in zero percent financing for automation. ` +
      `Number 3. S R and E D tax credits refund up to 35 percent of your developer salaries in CASH from CRA. ` +
      `Check your company's full grant match at f s i digital dot c a slash calculator.`,
  };
}

// ─── HTML Slide Renderer ───────────────────────────────────
function renderSlideHTML(slide, index, totalSlides) {
  const templatePath = path.join(__dirname, 'slide-template.html');
  const template = fs.readFileSync(templatePath, 'utf8');

  let cardBody = '';

  if (slide.type === 'intro') {
    cardBody = `
      <div class="badge-row">
        <div class="pill-badge">${slide.pill || '🇨🇦 GOVERNMENT FUNDING'}</div>
        <div class="counter-badge">FSI DIGITAL</div>
      </div>
      <div class="title-intro">${slide.title}</div>
      <div class="desc-text">${slide.subtitle}</div>
      <div class="card-footer">
        <div class="footer-brand">🇨🇦 VERIFIED GRANTS</div>
        <div class="footer-cta">Swipe Up / Tap →</div>
      </div>
    `;
  } else if (slide.type === 'stat') {
    const amountClass = slide.amountVariant === 'emerald' ? 'amount-value amount-emerald' : 'amount-value';
    const featuresHtml = (slide.features || [])
      .map(
        (f) => `
        <div class="feature-item">
          <span class="feature-icon">✓</span>
          <span>${f}</span>
        </div>`
      )
      .join('');

    cardBody = `
      <div class="badge-row">
        <div class="pill-badge">${slide.pill || 'PROGRAM SPOTLIGHT'}</div>
        <div class="counter-badge">${slide.counter || `0${index + 1} / 0${totalSlides}`}</div>
      </div>
      <div class="title-stat">${slide.title}</div>
      <div class="amount-box">
        <div class="amount-label">${slide.amountLabel || 'MAXIMUM CASH ALLOCATION'}</div>
        <div class="${amountClass}">${slide.amount}</div>
      </div>
      <div class="features-grid">
        ${featuresHtml}
      </div>
      <div class="card-footer">
        <div class="footer-brand">FSI DIGITAL</div>
        <div class="footer-cta">Apply at fsidigital.ca →</div>
      </div>
    `;
  } else if (slide.type === 'cta') {
    cardBody = `
      <div class="cta-center">
        <div class="pill-badge">${slide.pill || 'GET YOUR FUNDING'}</div>
        <div class="title-stat" style="font-size: 78px;">${slide.title}</div>
        <div class="desc-text">${slide.subtitle}</div>
        <div class="cta-big-url">${slide.url || 'fsidigital.ca/calculator'}</div>
        <div class="card-footer" style="width: 100%; justify-content: center; margin-top: 20px;">
          <div class="footer-cta" style="font-size: 36px; padding: 20px 48px;">Free 60-Second Match →</div>
        </div>
      </div>
    `;
  }

  const slideWrapper = `
    <div class="slide-container">
      <div class="glass-card">
        <div class="card-glow"></div>
        ${cardBody}
      </div>
    </div>
  `;

  return template.replace('</body>', `${slideWrapper}\n</body>`);
}

// ─── Puppeteer Screenshot (Alpha Transparency) ─────────────
async function screenshotSlides(slides) {
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch {
    console.log('📦 Installing puppeteer...');
    execSync('npm install puppeteer', { cwd: REPO_ROOT, stdio: 'inherit' });
    puppeteer = require('puppeteer');
  }

  const chromePath = getChromeExecutablePath();
  const launchOptions = {
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
  if (chromePath) {
    launchOptions.executablePath = chromePath;
  }

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  const paths = [];
  for (let i = 0; i < slides.length; i++) {
    const html = renderSlideHTML(slides[i], i, slides.length);
    const htmlPath = path.join(SLIDE_DIR, `slide-${i}.html`);
    const pngPath = path.join(SLIDE_DIR, `slide-${i}.png`);

    fs.writeFileSync(htmlPath, html);
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
    // omitBackground: true ensures the transparent body creates an alpha channel PNG
    await page.screenshot({ path: pngPath, type: 'png', omitBackground: true });

    console.log(`   ✅ Slide ${i + 1}/${slides.length} captured (alpha transparent)`);
    paths.push(pngPath);
  }

  await browser.close();
  return paths;
}

// ─── Text Normalizer for Edge-TTS ───────────────────────────
function formatTextForTTS(text) {
  return text
    .replace(/\$\s?5,000,000/g, ' 5 million dollars ')
    .replace(/\$\s?10,000,000\+/g, ' 10 million dollars or more ')
    .replace(/\$\s?500,000/g, ' 500 thousand dollars ')
    .replace(/\$\s?250,000\+/g, ' 250 thousand dollars or more ')
    .replace(/\$\s?250,000/g, ' 250 thousand dollars ')
    .replace(/\$\s?100,000/g, ' 100 thousand dollars ')
    .replace(/\$\s?50,000/g, ' 50 thousand dollars ')
    .replace(/\$\s?25,000/g, ' 25 thousand dollars ')
    .replace(/\$\s?15,000/g, ' 15 thousand dollars ')
    .replace(/\$\s?15K/gi, ' 15 thousand dollars ')
    .replace(/\$\s?500K/gi, ' 500 thousand dollars ')
    .replace(/\$/g, ' dollars ')
    .replace(/35%/g, '35 percent')
    .replace(/45%\+/g, '45 percent or more')
    .replace(/60%\+/g, '60 percent or more')
    .replace(/0%/g, 'zero percent')
    .replace(/fsidigital\.ca\/calculator/gi, 'f s i digital dot c a slash calculator')
    .replace(/fsidigital\.ca/gi, 'f s i digital dot c a')
    .replace(/SR&ED/g, 'S R and E D')
    .replace(/IRAP/g, 'Eye-rap')
    .replace(/CDAP/g, 'C-dap')
    .replace(/SDTC/g, 'S D T C')
    .replace(/CCPCs/g, 'C C P Cs')
    .replace(/SMEs/g, 'small and medium enterprises')
    .replace(/FTEs/g, 'full time employees');
}

// ─── Edge-TTS Voiceover Generator ───────────────────────────
function generateVoiceover(text, outputPath, voice = 'en-US-GuyNeural') {
  const edgeTTS = path.join(VENV_BIN, 'edge-tts');
  const formattedText = formatTextForTTS(text);

  console.log(`   🎙️ Generating Edge-TTS voiceover (${voice})...`);
  execSync(
    `"${edgeTTS}" --voice "${voice}" --rate "+4%" --text "${formattedText.replace(/"/g, '\\"')}" --write-media "${outputPath}"`,
    { stdio: 'pipe' }
  );
  console.log('   ✅ Voiceover generated');
}

// ─── Audio Mixer & BGM Ducking ──────────────────────────────
function mixAudioWithBGM(voiceoverPath, bgmFilename, outputPath) {
  console.log('   🎵 Mixing voiceover with background music (12% ducked)...');

  // Verify voiceover duration
  const durationOutput = execSync(
    `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${voiceoverPath}"`,
    { encoding: 'utf8' }
  ).trim();
  const totalDuration = parseFloat(durationOutput);
  const fadeOutStart = Math.max(0, totalDuration - 2.0);

  const bgmPath = path.join(BGM_DIR, bgmFilename);
  const activeBgm = fs.existsSync(bgmPath) ? bgmPath : path.join(BGM_DIR, 'bgm-01.mp3');

  // FFmpeg filter: BGM looped/ducked to 12% volume with 2s fade out, mixed with voiceover
  execSync(
    [
      'ffmpeg -y',
      `-i "${voiceoverPath}"`,
      `-stream_loop -1 -i "${activeBgm}"`,
      `-filter_complex "[1:a]volume=0.12,afade=t=out:st=${fadeOutStart.toFixed(2)}:d=2.0[bgm];[0:a][bgm]amix=inputs=2:duration=first:dropout_transition=2[a]"`,
      '-map "[a]"',
      '-c:a libmp3lame -b:a 192k -ar 44100',
      `"${outputPath}"`,
    ].join(' '),
    { stdio: 'pipe' }
  );

  console.log(`   ✅ Audio mixed successfully (${totalDuration.toFixed(1)}s)`);
  return totalDuration;
}

// ─── FFmpeg Video Assembly (B-Roll + Alpha Glass Cards) ─────
function assembleVideo(slidePaths, mixedAudioPath, brollFilename, outputPath, totalDuration) {
  console.log('   🎬 Assembling video: B-roll background + floating glass HUD cards...');

  const slideDuration = totalDuration / slidePaths.length;
  console.log(`   ⏱️ Total duration: ${totalDuration.toFixed(1)}s → ${slideDuration.toFixed(1)}s per slide card`);

  // Build FFmpeg concat list for transparent slide sequence
  const inputListPath = path.join(SLIDE_DIR, 'input.txt');
  const inputList =
    slidePaths.map((p) => `file '${p}'\nduration ${slideDuration.toFixed(2)}`).join('\n') +
    `\nfile '${slidePaths[slidePaths.length - 1]}'`;
  fs.writeFileSync(inputListPath, inputList);

  const brollPath = path.join(BROLL_DIR, brollFilename);
  const activeBroll = fs.existsSync(brollPath) ? brollPath : path.join(BROLL_DIR, 'tech-network.mp4');

  // FFmpeg composite pipeline:
  // [0:v] B-roll video looped, scaled/cropped to 1080x1920, darkened slightly for maximum HUD contrast
  // [1:v] Transparent slide sequence
  // [0:v][1:v] overlay=0:0:shortest=1
  // [2:a] Mixed voiceover + ducked BGM
  execSync(
    [
      'ffmpeg -y',
      `-stream_loop -1 -i "${activeBroll}"`,
      `-f concat -safe 0 -i "${inputListPath}"`,
      `-i "${mixedAudioPath}"`,
      '-filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,eq=brightness=-0.12:contrast=1.12[bg];[bg][1:v]overlay=0:0:shortest=1[v]"',
      '-map "[v]"',
      '-map 2:a',
      '-c:v libx264 -profile:v high -preset fast -crf 20 -pix_fmt yuv420p',
      '-c:a aac -b:a 192k',
      `-t ${totalDuration.toFixed(2)}`,
      '-movflags +faststart',
      `"${outputPath}"`,
    ].join(' '),
    { stdio: 'pipe' }
  );

  console.log(`   ✅ Video assembled: ${outputPath}`);
}

// ─── Social Media Metadata Generator ───────────────────────
function generateSocialMetadata(topic, slug) {
  const year = new Date().getFullYear();
  return {
    slug,
    youtube: {
      title: `${topic} (${year}) — Complete Canadian Grant Guide`,
      description:
        `🇨🇦 ${topic} — Complete guide to non-repayable government funding in ${year}.\n\n` +
        `✅ Up to $500K+ in non-repayable capital\n` +
        `✅ Zero equity taken from founders\n` +
        `✅ Verified direct government links\n\n` +
        `🔗 Check your company's funding eligibility: https://www.fsidigital.ca/calculator\n\n` +
        `#grants #smallbusiness #funding #canadabusiness #startup #IRAP #SRED`,
      tags: [
        'business grants',
        'government grants',
        'canada grants',
        'IRAP',
        'CDAP',
        'SRED',
        `grants ${year}`,
        'non repayable grants',
        'canadian startups',
      ],
    },
    instagram: {
      caption:
        `💰 ${topic} (${year})\n\n` +
        `Did you know Canadian businesses qualify for up to $500,000+ in non-repayable government funding?\n\n` +
        `Top Active Programs:\n` +
        `✅ NRC IRAP — Up to $500,000 for tech innovation\n` +
        `✅ CDAP — $15,000 cash grant + $100K 0% loan\n` +
        `✅ SR&ED — Up to 35% CASH REFUND on developer salaries\n\n` +
        `Check your eligibility in 60 seconds 👇\n` +
        `🔗 Link in bio: fsidigital.ca/calculator\n\n` +
        `#BusinessGrants #CanadianStartups #TechFounders #StartupFunding #IRAP #SRED #CanadaInnovation #Entrepreneurship`,
    },
    facebook: {
      text:
        `🇨🇦 ${topic} (${year} Official Update)\n\n` +
        `Most Canadian business owners are unaware they qualify for $15,000 to $500,000 in non-repayable government grants.\n\n` +
        `Watch the video breakdown for active funding pools, eligibility criteria, and stacking rules.\n\n` +
        `Check your company's grant match:\n` +
        `👉 https://fsidigital.ca/calculator`,
    },
    linkedin: {
      text:
        `Canada distributes over $5 Billion annually in non-dilutive business incentives and grant facilities.\n\n` +
        `For Canadian founders and executives, knowing how to align with NRC IRAP, SR&ED tax credits, and CDAP digital programs is worth hundreds of thousands of dollars in non-dilutive capital.\n\n` +
        `Watch the video breakdown above.\n\n` +
        `Check your company's eligibility:\n` +
        `https://fsidigital.ca/calculator\n\n` +
        `#SmallBusiness #CanadianTech #InnovationCanada #BusinessGrants #Founders #VentureCapital #NonDilutiveFunding`,
    },
  };
}

// ─── Single Video Pipeline ─────────────────────────────────
async function generateSingleVideo(topicName) {
  const content = resolveTopicContent(topicName);
  const slug = content.slug;

  console.log('═══════════════════════════════════════════════════════');
  console.log(`  🎬 GENERATING REEL: "${content.title}" [${slug}]`);
  console.log('═══════════════════════════════════════════════════════\n');

  // Step 1: Render slides via Puppeteer
  console.log('🖼️ Step 1: Rendering floating glass HUD slide cards...');
  const slidePaths = await screenshotSlides(content.slides);
  console.log('');

  // Step 2: Voiceover via Edge-TTS
  console.log('🎙️ Step 2: Generating neural voiceover...');
  const voiceoverPath = path.join(OUTPUT_DIR, `${slug}-voiceover.mp3`);
  generateVoiceover(content.voiceover, voiceoverPath);
  console.log('');

  // Step 3: Mix voiceover with BGM & ducking
  console.log('🎵 Step 3: Mixing BGM with voiceover ducking...');
  const mixedAudioPath = path.join(OUTPUT_DIR, `${slug}-mixed-audio.mp3`);
  const totalDuration = mixAudioWithBGM(voiceoverPath, content.bgm || 'bgm-01.mp3', mixedAudioPath);
  console.log('');

  // Step 4: Assemble final MP4
  console.log('🎬 Step 4: Compositing B-roll + glass slides + audio...');
  const outVideoPath = path.join(OUTPUT_DIR, `${slug}.mp4`);
  assembleVideo(slidePaths, mixedAudioPath, content.broll || 'tech-network.mp4', outVideoPath, totalDuration);
  console.log('');

  // Step 5: Save directly to public/videos/reels/
  fs.mkdirSync(PUBLIC_REELS_DIR, { recursive: true });
  const publicVideoPath = path.join(PUBLIC_REELS_DIR, `${slug}.mp4`);
  fs.copyFileSync(outVideoPath, publicVideoPath);
  console.log(`   🚀 Published to public reels: ${publicVideoPath}`);

  // Step 6: Save social metadata
  const metadata = generateSocialMetadata(content.title, slug);
  const metadataPath = path.join(OUTPUT_DIR, `${slug}-metadata.json`);
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(`   📋 Saved metadata: ${metadataPath}\n`);

  console.log(`  ✅ Reel Completed: ${slug}.mp4 (${totalDuration.toFixed(1)}s, 1080×1920)`);
  console.log('═══════════════════════════════════════════════════════\n');

  return { slug, outVideoPath, publicVideoPath };
}

// ─── Main Execution ────────────────────────────────────────
async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(SLIDE_DIR, { recursive: true });
  fs.mkdirSync(PUBLIC_REELS_DIR, { recursive: true });

  const args = process.argv.slice(2);

  if (args.includes('--all')) {
    const keys = Object.keys(TOPIC_PRESETS);
    console.log(`🚀 Generating all ${keys.length} core platform reels...\n`);
    for (const key of keys) {
      await generateSingleVideo(key);
    }
    console.log(`🎉 All ${keys.length} reels successfully generated and published!`);
    return;
  }

  const topicArg = args.includes('--topic')
    ? args[args.indexOf('--topic') + 1]
    : 'NRC IRAP Innovation Grants';

  await generateSingleVideo(topicArg);
}

main().catch((err) => {
  console.error('❌ Video generation failed:', err);
  process.exit(1);
});
