import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generatePng() {
  const ogSvg = path.join(process.cwd(), 'public', 'og-image.svg');
  const ogPng = path.join(process.cwd(), 'public', 'og-image.png');
  const prioritiesSvg = path.join(process.cwd(), 'public', 'priorities-og-preview.svg');
  const prioritiesPng = path.join(process.cwd(), 'public', 'priorities-og-preview.png');

  if (fs.existsSync(ogSvg)) {
    const svgBuffer = fs.readFileSync(ogSvg);
    await sharp(svgBuffer)
      .resize(1200, 630)
      .png({ quality: 95 })
      .toFile(ogPng);
    console.log('Successfully generated public/og-image.png (1200x630)');
  }

  if (fs.existsSync(prioritiesSvg)) {
    const prioritiesBuffer = fs.readFileSync(prioritiesSvg);
    await sharp(prioritiesBuffer)
      .resize(1200, 630)
      .png({ quality: 95 })
      .toFile(prioritiesPng);
    console.log('Successfully generated public/priorities-og-preview.png (1200x630)');
  }
}

generatePng().catch((err) => {
  console.error('Error generating OG png:', err);
  process.exit(1);
});
