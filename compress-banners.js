// Compress base64 PNGs inside SVG files → JPEG at 82% quality
const fs = require('fs');
const path = require('path');

async function compressSVG(filePath) {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('sharp not found, run: npm install sharp');
    process.exit(1);
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const re = /data:image\/png;base64,([A-Za-z0-9+\/=]+)/g;
  let match;
  let replacements = [];

  while ((match = re.exec(content)) !== null) {
    const base64Data = match[1];
    const pngBuffer = Buffer.from(base64Data, 'base64');
    const origSize = pngBuffer.length;

    try {
      const jpegBuffer = await sharp(pngBuffer)
        .jpeg({ quality: 82, mozjpeg: true })
        .toBuffer();

      const newSize = jpegBuffer.length;
      const saving = ((1 - newSize / origSize) * 100).toFixed(1);
      console.log(`  PNG ${(origSize/1024).toFixed(0)}KB -> JPEG ${(newSize/1024).toFixed(0)}KB (-${saving}%)`);

      const jpegBase64 = jpegBuffer.toString('base64');
      replacements.push({
        original: match[0],
        replacement: `data:image/jpeg;base64,${jpegBase64}`
      });
    } catch (err) {
      console.log(`  Skipping one image: ${err.message}`);
    }
  }

  for (const r of replacements) {
    content = content.replace(r.original, r.replacement);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  const newFileSize = fs.statSync(filePath).size;
  console.log(`  Final: ${(newFileSize / 1024).toFixed(0)}KB`);
}

async function main() {
  const bannersDir = path.join(__dirname, 'website', 'images', 'banners');
  const files = fs.readdirSync(bannersDir)
    .filter(f => f.endsWith('.svg'))
    .filter(f => fs.statSync(path.join(bannersDir, f)).size > 100000);

  console.log(`Found ${files.length} heavy SVGs to compress\n`);

  for (const file of files) {
    const filePath = path.join(bannersDir, file);
    const origSize = fs.statSync(filePath).size;
    console.log(`${file} (${(origSize / 1024 / 1024).toFixed(1)}MB):`);
    await compressSVG(filePath);
    console.log('');
  }
}

main().catch(console.error);
