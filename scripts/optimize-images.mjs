// Конвертирует PNG-скриншоты лайнапов в WebP и удаляет оригиналы.
// Запуск: npm run optimize-images (после добавления новых лайнапов).
// Идемпотентность: если .webp уже есть, PNG пропускается.

import { readdir, stat, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GRENADES_DIR = join(__dirname, '..', 'src', 'data', 'grenades');

const MAX_WIDTH = 1920;
const QUALITY = 80;

async function findPngs(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...(await findPngs(full)));
    } else if (extname(entry.name).toLowerCase() === '.png') {
      result.push(full);
    }
  }
  return result;
}

async function main() {
  if (!existsSync(GRENADES_DIR)) {
    console.error(`Папка не найдена: ${GRENADES_DIR}`);
    process.exit(1);
  }

  const pngs = await findPngs(GRENADES_DIR);
  if (pngs.length === 0) {
    console.log('PNG не найдены — конвертировать нечего.');
    return;
  }

  let converted = 0;
  let skipped = 0;
  let bytesBefore = 0;
  let bytesAfter = 0;

  for (const png of pngs) {
    const webp = join(dirname(png), `${basename(png, extname(png))}.webp`);

    if (existsSync(webp)) {
      skipped++;
      continue;
    }

    const before = (await stat(png)).size;

    await sharp(png)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(webp);

    const after = (await stat(webp)).size;
    await unlink(png);

    bytesBefore += before;
    bytesAfter += after;
    converted++;

    const rel = png.slice(GRENADES_DIR.length + 1);
    console.log(
      `✓ ${rel}  ${(before / 1e6).toFixed(2)}МБ → ${(after / 1e6).toFixed(2)}МБ`
    );
  }

  console.log('\n── Сводка ──');
  console.log(`Сконвертировано: ${converted}`);
  console.log(`Пропущено (уже WebP): ${skipped}`);
  if (converted > 0) {
    const saved = bytesBefore - bytesAfter;
    const pct = ((saved / bytesBefore) * 100).toFixed(1);
    console.log(
      `Размер: ${(bytesBefore / 1e6).toFixed(1)}МБ → ${(bytesAfter / 1e6).toFixed(1)}МБ ` +
        `(−${(saved / 1e6).toFixed(1)}МБ, −${pct}%)`
    );
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
