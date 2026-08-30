import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generatePng() {
  const svgPath = path.join(process.cwd(), 'public', 'og-image.svg');
  const pngPath = path.join(process.cwd(), 'public', 'og-image.png');
  const svgBuffer = fs.readFileSync(svgPath);

  await sharp(svgBuffer)
    .resize(1200, 630)
    .png({ quality: 95 })
    .toFile(pngPath);

  console.log('Successfully generated public/og-image.png (1200x630)');
}

generatePng().catch((err) => {
  console.error('Error generating OG png:', err);
  process.exit(1);
});
