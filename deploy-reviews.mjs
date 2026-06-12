// TopCasinoScout — Deploy all casino review pages
// Run with: node deploy-reviews.mjs
// Place this file in: C:\Users\TopCasinoScout\Desktop\topcasinoscout-project\topcasinoscout\

import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const PAGES_DIR = './src/pages';
const data = JSON.parse(readFileSync('./review-data.json', 'utf-8'));

console.log(`\nDeploying ${data.length} casino review pages...\n`);

let written = 0;
for (const review of data) {
  const fpath = join(PAGES_DIR, review.filename);
  writeFileSync(fpath, review.content, 'utf-8');
  console.log(`  ✓ ${review.filename}`);
  written++;
}

console.log(`\n✅ ${written} pages written successfully!`);
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Update all casino reviews with real affiliate data and TCS scores"');
console.log('  git push');
