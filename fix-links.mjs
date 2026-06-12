// Run with: node fix-links.mjs
// Fixes all broken links across all 105 pages

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const PAGES_DIR = './src/pages';

// All link replacements — order matters, most specific first
const replacements = [
  // Affiliate link fix
  [/https?:\/\/chickroad\.info[^\s"']*/g, 'https://44deal.com'],
  
  // Broken internal paths with trailing slashes → correct slugs
  [/href="\/casino-rankings\/"/g, 'href="/top-casino-rankings"'],
  [/href="\/casino-rankings"/g, 'href="/top-casino-rankings"'],
  [/href='\/casino-rankings\/'/g, "href='/top-casino-rankings'"],
  [/href='\/casino-rankings'/g, "href='/top-casino-rankings'"],
  
  [/href="\/blacklisted-and-unsafe-casinos\/"/g, 'href="/blacklisted-online-casinos"'],
  [/href="\/blacklisted-and-unsafe-casinos"/g, 'href="/blacklisted-online-casinos"'],
  [/href='\/blacklisted-and-unsafe-casinos\/'/g, "href='/blacklisted-online-casinos'"],
  
  [/href="\/how-we-rate\/"/g, 'href="/how-we-rate-online-casinos"'],
  [/href="\/how-we-rate"/g, 'href="/how-we-rate-online-casinos"'],
  [/href='\/how-we-rate\/'/g, "href='/how-we-rate-online-casinos'"],
  [/href='\/how-we-rate'/g, "href='/how-we-rate-online-casinos'"],
  
  [/href="\/casino-reviews\/"/g, 'href="/detailed-casino-reviews"'],
  [/href="\/casino-reviews"/g, 'href="/detailed-casino-reviews"'],
  
  [/href="\/united-kingdom-bonus\/"/g, 'href="/uk-casino-bonus"'],
  [/href="\/united-kingdom-bonus"/g, 'href="/uk-casino-bonus"'],
  [/href='\/united-kingdom-bonus\/'/g, "href='/uk-casino-bonus'"],
  
  [/href="\/ireland-bonus\/"/g, 'href="/ireland-casino-bonus"'],
  [/href="\/ireland-bonus"/g, 'href="/ireland-casino-bonus"'],
  
  [/href="\/canada-bonus\/"/g, 'href="/canada-casino-bonus"'],
  [/href="\/canada-bonus"/g, 'href="/canada-casino-bonus"'],
  
  [/href="\/new-zealand-bonus\/"/g, 'href="/new-zealand-casino-bonus"'],
  [/href="\/new-zealand-bonus"/g, 'href="/new-zealand-casino-bonus"'],
  
  [/href="\/united-states-bonus\/"/g, 'href="/usa-casino-bonus"'],
  [/href="\/united-states-bonus"/g, 'href="/usa-casino-bonus"'],
  
  [/href="\/best-casino-comparison-sites\/"/g, 'href="/best-casino-comparison-sites"'],
  [/href="\/responsible-gambling\/"/g, 'href="/responsible-gambling"'],
  [/href="\/no-deposit-bonuses\/"/g, 'href="/no-deposit-bonuses"'],
  [/href="\/casino-bonus-finder\/"/g, 'href="/casino-bonus-finder"'],
  [/href="\/top-casino-bonuses\/"/g, 'href="/top-casino-bonuses"'],
  [/href="\/insider-articles\/"/g, 'href="/insider-articles"'],
  [/href="\/free-spin-slots\/"/g, 'href="/free-spin-slots"'],
  [/href="\/casino-promo-codes\/"/g, 'href="/casino-promo-codes"'],
  [/href="\/top-casino-rankings\/"/g, 'href="/top-casino-rankings"'],
  [/href="\/detailed-casino-reviews\/"/g, 'href="/detailed-casino-reviews"'],
  [/href="\/blacklisted-online-casinos\/"/g, 'href="/blacklisted-online-casinos"'],
  [/href="\/how-we-rate-online-casinos\/"/g, 'href="/how-we-rate-online-casinos"'],
  [/href="\/affiliate-disclosure\/"/g, 'href="/affiliate-disclosure"'],
  [/href="\/about\/"/g, 'href="/about"'],
  [/href="\/contact-us\/"/g, 'href="/contact-us"'],
  [/href="\/privacy-policy\/"/g, 'href="/privacy-policy"'],
  [/href="\/terms-and-conditions\/"/g, 'href="/terms-and-conditions"'],
  
  // Fix localhost URLs
  [/https?:\/\/localhost(:\d+)?(\/wordpress)?/g, ''],
  
  // Fix review page links with trailing slashes
  [/href="\/([\w-]+-review)\/"/g, 'href="/$1"'],
];

let totalFixed = 0;
let pagesFixed = 0;

const files = readdirSync(PAGES_DIR).filter(f => f.endsWith('.astro'));

for (const fname of files) {
  const fpath = join(PAGES_DIR, fname);
  let content = readFileSync(fpath, 'utf-8');
  const original = content;
  let fixes = 0;

  for (const [pattern, replacement] of replacements) {
    const before = content;
    content = content.replace(pattern, replacement);
    if (content !== before) fixes++;
  }

  if (content !== original) {
    writeFileSync(fpath, content, 'utf-8');
    pagesFixed++;
    totalFixed += fixes;
    console.log(`  Fixed: ${fname} (${fixes} replacements)`);
  }
}

console.log(`\n✅ Done — ${pagesFixed} pages updated, ${totalFixed} total fixes`);
