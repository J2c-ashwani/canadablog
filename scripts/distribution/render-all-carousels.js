const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const CAROUSEL_SPECS = [
  {
    name: 'grant-checklist',
    htmlFile: 'scratch/archive/carousel-grant-checklist.html',
    slideIndices: [0, 1, 2, 3, 4, 5, 6], // all 7 slides
  },
  {
    name: 'canada-grants',
    htmlFile: 'scratch/archive/carousel-canada-grants.html',
    slideIndices: [0, 1, 2, 3, 4, 5, 6, 12], // 8 slides
  },
  {
    name: 'women-grants',
    htmlFile: 'scratch/archive/carousel-women-grants.html',
    slideIndices: [0, 1, 2, 3, 4, 5, 6, 12], // 8 slides
  },
  {
    name: 'sbir-howto',
    htmlFile: 'scratch/archive/carousel-sbir-howto.html',
    slideIndices: [0, 1, 2, 3, 4, 5, 6, 7], // 8 slides
  },
  {
    name: 'stat-shock',
    htmlFile: 'scratch/archive/carousel-stat-shock.html',
    slideIndices: [0, 1, 2, 3, 4, 5, 6], // 7 slides
  }
];

async function renderCarousels() {
  console.log('🚀 Starting Carousel Rendering Engine...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });

  const rootPublicDir = path.resolve('public/images/social/carousels');

  for (const spec of CAROUSEL_SPECS) {
    const targetDir = path.join(rootPublicDir, spec.name);
    fs.mkdirSync(targetDir, { recursive: true });

    const htmlPath = path.resolve(spec.htmlFile);
    console.log(`\n📸 Rendering '${spec.name}' from ${spec.htmlFile}...`);
    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });

    const allSlides = await page.$$('.slide');
    console.log(`   Found ${allSlides.length} total slides in HTML. Selecting ${spec.slideIndices.length} slides.`);

    for (let outIdx = 0; outIdx < spec.slideIndices.length; outIdx++) {
      const srcIdx = spec.slideIndices[outIdx];
      const slide = allSlides[srcIdx];
      if (!slide) {
        console.warn(`   ⚠️ Slide index ${srcIdx} not found!`);
        continue;
      }
      const outPath = path.join(targetDir, `slide-${outIdx + 1}.png`);
      await slide.screenshot({ path: outPath, type: 'png' });
      console.log(`   ✅ Saved slide ${outIdx + 1}/${spec.slideIndices.length} -> ${path.relative(process.cwd(), outPath)}`);
    }
  }

  await browser.close();
  console.log('\n✨ All carousel slides rendered successfully into public/images/social/carousels/!');
}

renderCarousels().catch(console.error);
