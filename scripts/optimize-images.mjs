import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.resolve(__dirname, '../src/assets/images');
const rootAssetsDir = path.resolve(__dirname, '../src/assets');

console.log('🖼️ Starting image optimization with sharp (in-memory buffer)...');

async function optimizeLogo() {
  const logoSource = path.join(imagesDir, 'logo.png');
  const logoTargetWebp = path.join(imagesDir, 'logo.webp');
  
  if (fs.existsSync(logoSource)) {
    const buffer = fs.readFileSync(logoSource);
    await sharp(buffer)
      .resize({ width: 380, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(logoTargetWebp);
    
    const stat = fs.statSync(logoTargetWebp);
    console.log(`✅ logo.webp generated: ${(stat.size / 1024).toFixed(1)} KB (target: < 35 KB)`);
  }

  // Remove duplicate src/assets/logo.png if it exists
  const dupLogo = path.join(rootAssetsDir, 'logo.png');
  if (fs.existsSync(dupLogo)) {
    fs.unlinkSync(dupLogo);
    console.log('🗑️ Removed duplicate src/assets/logo.png');
  }
}

const widths = [640, 1024, 1600];

async function processResponsiveImage(filename, baseName) {
  const inputPath = path.join(imagesDir, filename);
  if (!fs.existsSync(inputPath)) {
    console.warn(`⚠️ File not found: ${filename}`);
    return;
  }

  const fileBuffer = fs.readFileSync(inputPath);
  const metadata = await sharp(fileBuffer).metadata();
  const origWidth = metadata.width || 1200;

  for (const w of widths) {
    const targetWidth = Math.min(w, origWidth);

    // WebP output
    const webpOut = path.join(imagesDir, `${baseName}-${w}.webp`);
    await sharp(fileBuffer)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(webpOut);

    // AVIF output
    const avifOut = path.join(imagesDir, `${baseName}-${w}.avif`);
    await sharp(fileBuffer)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .avif({ quality: 70, effort: 5 })
      .toFile(avifOut);
  }

  // Base .webp fallback
  const baseWebpOut = path.join(imagesDir, `${baseName}.webp`);
  await sharp(fileBuffer)
    .resize({ width: Math.min(1024, origWidth), withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(baseWebpOut);

  // Base .avif fallback
  const baseAvifOut = path.join(imagesDir, `${baseName}.avif`);
  await sharp(fileBuffer)
    .resize({ width: Math.min(1024, origWidth), withoutEnlargement: true })
    .avif({ quality: 70, effort: 5 })
    .toFile(baseAvifOut);

  const stat = fs.statSync(baseWebpOut);
  console.log(`✅ ${baseName}.webp generated: ${(stat.size / 1024).toFixed(1)} KB`);
}

async function generateGlobePoster() {
  const posterSvg = `
  <svg width="680" height="620" viewBox="0 0 680 620" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#2F80ED" stop-opacity="0.18"/>
        <stop offset="60%" stop-color="#D4A44A" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#070D1F" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="globeGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stop-color="#1A3365"/>
        <stop offset="60%" stop-color="#0B1838"/>
        <stop offset="100%" stop-color="#050A18"/>
      </radialGradient>
      <linearGradient id="goldArc" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDE047"/>
        <stop offset="50%" stop-color="#D4A44A"/>
        <stop offset="100%" stop-color="#2F80ED"/>
      </linearGradient>
    </defs>

    <!-- Ambient backdrop glow -->
    <circle cx="340" cy="310" r="280" fill="url(#bgGlow)"/>

    <!-- Outer atmospheric ring -->
    <circle cx="340" cy="310" r="175" fill="none" stroke="#2F80ED" stroke-width="2" opacity="0.25"/>
    <circle cx="340" cy="310" r="185" fill="none" stroke="#D4A44A" stroke-width="1" opacity="0.2" stroke-dasharray="4 8"/>

    <!-- Globe Sphere -->
    <circle cx="340" cy="310" r="160" fill="url(#globeGrad)" stroke="rgba(212,164,74,0.3)" stroke-width="1.5"/>

    <!-- Latitude & Longitude grid lines -->
    <ellipse cx="340" cy="310" rx="160" ry="60" fill="none" stroke="#2F80ED" stroke-width="1" opacity="0.3"/>
    <ellipse cx="340" cy="310" rx="160" ry="120" fill="none" stroke="#2F80ED" stroke-width="1" opacity="0.2"/>
    <ellipse cx="340" cy="310" rx="70" ry="160" fill="none" stroke="#2F80ED" stroke-width="1" opacity="0.25"/>
    <line x1="340" y1="150" x2="340" y2="470" stroke="#D4A44A" stroke-width="1" opacity="0.4"/>
    <line x1="180" y1="310" x2="500" y2="310" stroke="#D4A44A" stroke-width="1.5" opacity="0.5"/>

    <!-- Flight Arcs -->
    <path d="M 375 295 Q 310 180 255 240" fill="none" stroke="url(#goldArc)" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
    <path d="M 375 295 Q 350 160 320 220" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
    <path d="M 375 295 Q 430 200 450 360" fill="none" stroke="#F4C76A" stroke-width="2" stroke-linecap="round" opacity="0.8"/>

    <!-- Pin Nodes -->
    <circle cx="375" cy="295" r="5" fill="#FDE047" stroke="#D4A44A" stroke-width="2"/>
    <circle cx="375" cy="295" r="9" fill="none" stroke="#FDE047" stroke-width="1" opacity="0.7"/>
    <circle cx="255" cy="240" r="4" fill="#60A5FA"/>
    <circle cx="320" cy="220" r="4" fill="#F4C76A"/>
    <circle cx="450" cy="360" r="4" fill="#60A5FA"/>

    <!-- India HQ Badge -->
    <rect x="330" y="315" width="140" height="24" rx="8" fill="rgba(7,13,31,0.92)" stroke="rgba(212,164,74,0.5)" stroke-width="1"/>
    <text x="340" y="331" fill="#FDE047" font-size="10" font-family="system-ui, sans-serif" font-weight="bold">🇮🇳 BMS India HQ</text>
  </svg>`;

  const posterOut = path.join(imagesDir, 'globe-poster.webp');
  await sharp(Buffer.from(posterSvg))
    .webp({ quality: 70, effort: 6 })
    .toFile(posterOut);

  const stat = fs.statSync(posterOut);
  console.log(`✅ globe-poster.webp generated: ${(stat.size / 1024).toFixed(1)} KB (target: < 40 KB)`);
}

async function run() {
  await optimizeLogo();

  const files = [
    { file: 'country-usa.png', base: 'country-usa' },
    { file: 'country-australia.png', base: 'country-australia' },
    { file: 'country-uk.png', base: 'country-uk' },
    { file: 'country-canada.png', base: 'country-canada' },
    { file: 'study-visa.jpg', base: 'study-visa' },
    { file: 'tourist-visa.avif', base: 'tourist-visa' },
    { file: 'sop-documentation.avif', base: 'sop-documentation' },
    { file: 'refusal-cases.avif', base: 'refusal-cases' },
    { file: 'inside-canada.avif', base: 'inside-canada' },
    { file: 'offer-letter.avif', base: 'offer-letter' },
    { file: 'about-hero.avif', base: 'about-hero' },
    { file: 'consultation-banner.avif', base: 'consultation-banner' },
  ];

  for (const item of files) {
    await processResponsiveImage(item.file, item.base);
  }

  await generateGlobePoster();
  console.log('✨ All images optimized successfully!');
}

run().catch(console.error);
