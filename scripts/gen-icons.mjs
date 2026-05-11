import sharp from 'sharp';
import { mkdirSync } from 'fs';

mkdirSync('public/icons', { recursive: true });

const BG = '#f3efe4';
const INK = '#5b7548';

function makeIconSvg(size, fontSize) {
  const cx = size / 2;
  const cy = size / 2;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <rect width="${size}" height="${size}" fill="${BG}"/>
      <text
        x="${cx}" y="${cy}"
        font-family="Georgia, serif"
        font-size="${fontSize}"
        font-weight="600"
        fill="${INK}"
        text-anchor="middle"
        dominant-baseline="central"
      >n</text>
    </svg>`
  );
}

function makeMaskableSvg(size) {
  const cx = size / 2;
  const cy = size / 2;
  const safe = size * 0.8;
  const fontSize = Math.round(safe * 0.6);
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <rect width="${size}" height="${size}" fill="${BG}"/>
      <text
        x="${cx}" y="${cy}"
        font-family="Georgia, serif"
        font-size="${fontSize}"
        font-weight="600"
        fill="${INK}"
        text-anchor="middle"
        dominant-baseline="central"
      >n</text>
    </svg>`
  );
}

await sharp(makeIconSvg(192, 128)).png().toFile('public/icons/icon-192.png');
console.log('icon-192.png');

await sharp(makeIconSvg(512, 340)).png().toFile('public/icons/icon-512.png');
console.log('icon-512.png');

await sharp(makeMaskableSvg(512)).png().toFile('public/icons/icon-512-maskable.png');
console.log('icon-512-maskable.png');
