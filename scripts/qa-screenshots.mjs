import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUTPUT_DIR = path.resolve('qa-screenshots');
const PUBLIC_IMAGES_DIR = path.resolve('public/images');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
  fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
}

const OBJECTS = [
  'study-visa',
  'tourist-visa',
  'sop-doc',
  'refusal-cases',
  'inside-canada',
  'offer-letter',
  'hero-globe',
  'landmark-canada',
  'landmark-uk',
  'landmark-usa',
  'landmark-australia',
  'landmark-germany',
];

const ANGLES = ['front', 'three_quarter', 'side', 'top'];

async function runVisualQA() {
  console.log('🚀 Starting Automated 3D Visual QA Loop...');
  console.log(`Target: ${OBJECTS.length} objects × ${ANGLES.length} angles = ${OBJECTS.length * ANGLES.length} screenshots`);

  let browser;
  try {
    browser = await chromium.launch({
      channel: 'chrome',
      headless: true,
    });
  } catch (e) {
    console.log('Falling back to default chromium launcher...');
    browser = await chromium.launch({ headless: true });
  }

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2, // High-DPI crisp capture for QA inspection
  });

  const page = await context.newPage();

  const results = [];

  for (const obj of OBJECTS) {
    console.log(`\n📸 Capturing object: ${obj}`);
    for (const angle of ANGLES) {
      const url = `http://localhost:5173/__qa?object=${obj}&angle=${angle}&autorotate=false`;
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        // Wait for canvas element to exist
        await page.waitForSelector('#qa-canvas-stage', { timeout: 8000 });
        // Give Three.js frame 800ms to render the procedural geometries and environment
        await page.waitForTimeout(800);

        const stage = page.locator('#qa-canvas-stage');
        const filename = `${obj}_${angle}.png`;
        const filePath = path.join(OUTPUT_DIR, filename);

        await stage.screenshot({ path: filePath });
        const stats = fs.statSync(filePath);
        console.log(`  ✓ ${angle.padEnd(14)} -> ${filename} (${(stats.size / 1024).toFixed(1)} KB)`);
        results.push({ obj, angle, filename, sizeKb: (stats.size / 1024).toFixed(1) });
      } catch (err) {
        console.error(`  ✗ Failed capturing ${obj} [${angle}]:`, err.message);
      }
    }
  }

  // Generate light scene globe-poster.webp from hero-globe_front.png under 40 KB
  const globeHeroShot = path.join(OUTPUT_DIR, 'hero-globe_front.png');
  const globePosterWebp = path.join(PUBLIC_IMAGES_DIR, 'globe-poster.webp');

  if (fs.existsSync(globeHeroShot)) {
    console.log('\n🎨 Generating optimized globe-poster.webp for light theme...');
    await sharp(globeHeroShot)
      .resize(640, null, { fit: 'inside' })
      .webp({ quality: 82, effort: 6 })
      .toFile(globePosterWebp);

    const posterStats = fs.statSync(globePosterWebp);
    const posterSizeKb = (posterStats.size / 1024).toFixed(1);
    console.log(`  ✓ globe-poster.webp generated: ${posterSizeKb} KB (Budget: < 40 KB)`);
  }

  await browser.close();

  // Save report index
  const report = {
    timestamp: new Date().toISOString(),
    totalScreenshots: results.length,
    objectsCaptured: OBJECTS,
    angles: ANGLES,
    screenshots: results,
  };
  fs.writeFileSync(path.join(OUTPUT_DIR, 'qa-report.json'), JSON.stringify(report, null, 2));

  console.log('\n🎉 Visual QA loop completed! Screenshots saved to /qa-screenshots');
}

runVisualQA().catch((err) => {
  console.error('Visual QA script error:', err);
  process.exit(1);
});
