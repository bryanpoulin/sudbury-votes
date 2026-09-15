import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generatePng() {
  const ogSvg = path.join(process.cwd(), 'public', 'og-image.svg');
  const ogPng = path.join(process.cwd(), 'public', 'og-image.png');
  const pollSvg = path.join(process.cwd(), 'public', 'poll-og-preview.svg');
  const pollPng = path.join(process.cwd(), 'public', 'poll-og-preview.png');

  if (fs.existsSync(ogSvg)) {
    const svgBuffer = fs.readFileSync(ogSvg);
    await sharp(svgBuffer)
      .resize(1200, 630)
      .png({ quality: 95 })
      .toFile(ogPng);
    console.log('Successfully generated public/og-image.png (1200x630)');
  }

  if (fs.existsSync(pollSvg)) {
    const pollBuffer = fs.readFileSync(pollSvg);
    await sharp(pollBuffer)
      .resize(1200, 630)
      .png({ quality: 95 })
      .toFile(pollPng);
    console.log('Successfully generated public/poll-og-preview.png (1200x630)');
  }
}

generatePng().catch((err) => {
  console.error('Error generating OG png:', err);
  process.exit(1);
});
