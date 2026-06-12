// Run with: node add-internal-links.mjs
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const PAGES_DIR = './src/pages';
const MARKER = '<!-- internal-links-block -->';

const categories = {
  'top-casino-bonuses': 'tier1', 'no-deposit-bonuses': 'tier1',
  'detailed-casino-reviews': 'tier1', 'top-casino-rankings': 'tier1',
  'casino-bonus-finder': 'tier1', 'casino-promo-codes': 'tier1',
  'free-spin-slots': 'tier1',
  'vulkanvegas-review': 'review', 'wazamba-review': 'review',
  'verdecasino-review': 'review', 'fairspin-casino-review': 'review',
  'icecasino-review': 'review', 'legiano-review': 'review',
  'betico-review': 'review', 'azurslot-review': 'review',
  'bankonbet-review': 'review', 'booi-review': 'review',
  'cadoola-review': 'review', 'ggvegas-review': 'review',
  'imperial-wins-review': 'review', 'imperial-wins-casino-review-no-deposit-bonus': 'review',
  'mostbet-review': 'review', 'playfortuna-review': 'review',
  'savaspin-review': 'review', 'sg-casino-review': 'review',
  'slotocash-review': 'review', 'spinbara-review-usdt-casino-bonus': 'review',
  'vulkanbet-review': 'review', 'vulkanspiele-review': 'review',
  'wageon-review': 'review', 'weiss-review': 'review',
  'winshark-review': 'review', 'allyspin-review-reload-casino-bonus': 'review',
  'miami-club-review': 'review', 'satoshi-hero-premium-crypto-casino-review': 'review',
  '1win-casino-bonus-code': 'review', 'get-alfcasino-bonus-code': 'review',
  'cazinostars-uk-review-blacklisted': 'review', 'royal-reels-casino-login-warning-review': 'review',
  'united-kingdom': 'country', 'ireland': 'country', 'canada': 'country',
  'new-zealand': 'country', 'united-states': 'country',
  'uk-casino-bonus': 'country_sub', 'uk-no-deposit-bonus': 'country_sub',
  'uk-online-casinos': 'country_sub', 'uk-banking-guide': 'country_sub',
  'uk-casino-safety-legal-guide': 'country_sub', 'uk-market-report': 'country_sub',
  'ireland-casino-bonus': 'country_sub', 'ireland-no-deposit-bonus': 'country_sub',
  'ireland-online-casinos': 'country_sub', 'ireland-banking-guide': 'country_sub',
  'ireland-casino-safety-legal-guide': 'country_sub', 'ireland-market-report': 'country_sub',
  'canada-casino-bonus': 'country_sub', 'canada-no-deposit-bonus': 'country_sub',
  'canada-online-casinos': 'country_sub', 'canada-banking-guide': 'country_sub',
  'canada-casino-safety-legal-guide': 'country_sub', 'canada-market-report': 'country_sub',
  'best-mobile-casinos-canada': 'country_sub',
  'new-zealand-casino-bonus': 'country_sub', 'new-zealand-no-deposit-bonus': 'country_sub',
  'new-zealand-online-casinos': 'country_sub', 'new-zealand-banking-guide': 'country_sub',
  'new-zealand-casino-safety-legal-guide': 'country_sub', 'new-zealand-market-report': 'country_sub',
  'usa-casino-bonus': 'country_sub', 'usa-no-deposit-bonus': 'country_sub',
  'usa-online-casinos': 'country_sub', 'usa-banking-guide': 'country_sub',
  'usa-casino-safety-legal-guide': 'country_sub', 'usa-market-report': 'country_sub',
  'about': 'info', 'how-we-rate-online-casinos': 'info',
  'casino-review-guidelines': 'info', 'responsible-gambling': 'info',
  'affiliate-disclosure': 'info', 'editorial-policy': 'info',
  'privacy-policy': 'info', 'terms-and-conditions': 'info',
  'cookie-policy': 'info', 'contact-us': 'info',
  'blacklisted-online-casinos': 'info', 'complaints-transparency-report': 'info',
  'bonus-accuracy-disclaimer': 'info', 'accessibility-statement': 'info',
  'age-disclaimer-18': 'info', 'partners': 'info',
  'bonus-calculator-tool': 'tool', 'what-is-card-counting-in-blackjack': 'article',
  'smarter-casino-deposit-bonuses': 'article', 'no-deposit-casino-bonuses-post': 'article',
  'no-deposit-casinos': 'article', 'insider-articles': 'article',
  'investigations': 'article', 'best-casino-comparison-sites': 'article',
  'tools': 'tool', 'tools-2': 'tool', 'stream': 'tool',
  'tcsdrops': 'tool', 'mia': 'tool',
};

const countryPrefixes = {
  'uk': 'united-kingdom', 'ireland': 'ireland',
  'canada': 'canada', 'new-zealand': 'new-zealand', 'usa': 'united-states',
};

function getCountryPrefix(slug) {
  for (const [prefix, hub] of Object.entries(countryPrefixes)) {
    if (slug.startsWith(prefix)) return { prefix, hub };
  }
  return { prefix: slug, hub: '/' };
}

function getCountrySubpagePrefix(slug) {
  if (slug.startsWith('uk-')) return 'uk';
  if (slug.startsWith('ireland-')) return 'ireland';
  if (slug.startsWith('canada-') || slug === 'best-mobile-casinos-canada') return 'canada';
  if (slug.startsWith('new-zealand-')) return 'new-zealand';
  if (slug.startsWith('usa-')) return 'usa';
  return null;
}

function makeLinksBlock(slug, cat) {
  let links = [];

  if (cat === 'review') {
    links = [
      ['📋 All Casino Reviews', '/detailed-casino-reviews'],
      ['🏆 Top Casino Rankings', '/top-casino-rankings'],
      ['🎁 Best Casino Bonuses', '/top-casino-bonuses'],
      ['🎰 No Deposit Bonuses', '/no-deposit-bonuses'],
      ['🤖 AI Bonus Finder', '/casino-bonus-finder'],
      ['🚫 Blacklisted Casinos', '/blacklisted-online-casinos'],
    ];
  } else if (cat === 'tier1') {
    links = [
      ['🏆 Casino Rankings', '/top-casino-rankings'],
      ['📋 Casino Reviews', '/detailed-casino-reviews'],
      ['🤖 AI Bonus Finder', '/casino-bonus-finder'],
      ['🎰 No Deposit Bonuses', '/no-deposit-bonuses'],
      ['🎫 Promo Codes', '/casino-promo-codes'],
      ['🔄 Free Spins', '/free-spin-slots'],
    ].filter(([, h]) => h !== `/${slug}`);
  } else if (cat === 'country') {
    let prefix;
    if (slug === 'united-kingdom') prefix = 'uk';
    else if (slug === 'united-states') prefix = 'usa';
    else if (slug === 'new-zealand') prefix = 'new-zealand';
    else prefix = slug;
    const name = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    links = [
      [`🎁 ${name} Casino Bonuses`, `/${prefix}-casino-bonus`],
      [`🎰 No Deposit Bonuses`, `/${prefix}-no-deposit-bonus`],
      [`🏦 Banking Guide`, `/${prefix}-banking-guide`],
      [`⚖️ Safety & Legal Guide`, `/${prefix}-casino-safety-legal-guide`],
      ['📋 All Casino Reviews', '/detailed-casino-reviews'],
      ['🎁 Best Bonuses', '/top-casino-bonuses'],
    ];
  } else if (cat === 'country_sub') {
    const prefix = getCountrySubpagePrefix(slug);
    const hub = prefix ? `/${countryPrefixes[prefix] || prefix}` : '/';
    const hubName = hub.replace('/', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Home';
    links = [
      [`🌍 ${hubName} Hub`, hub],
      ['🎁 Best Casino Bonuses', '/top-casino-bonuses'],
      ['🎰 No Deposit Bonuses', '/no-deposit-bonuses'],
      ['📋 Casino Reviews', '/detailed-casino-reviews'],
      ['🤖 AI Bonus Finder', '/casino-bonus-finder'],
      ['🏆 Casino Rankings', '/top-casino-rankings'],
    ].filter(([, h]) => h !== `/${slug}`);
  } else if (cat === 'info') {
    links = [
      ['🏠 Home', '/'],
      ['📋 Casino Reviews', '/detailed-casino-reviews'],
      ['🎁 Top Bonuses', '/top-casino-bonuses'],
      ['🎰 No Deposit Bonuses', '/no-deposit-bonuses'],
      ['🏆 Casino Rankings', '/top-casino-rankings'],
      ['🤖 AI Bonus Finder', '/casino-bonus-finder'],
    ];
  } else {
    links = [
      ['🎁 Top Casino Bonuses', '/top-casino-bonuses'],
      ['🎰 No Deposit Bonuses', '/no-deposit-bonuses'],
      ['📋 Casino Reviews', '/detailed-casino-reviews'],
      ['🏆 Casino Rankings', '/top-casino-rankings'],
      ['🤖 AI Bonus Finder', '/casino-bonus-finder'],
      ['🎫 Promo Codes', '/casino-promo-codes'],
    ];
  }

  const items = links.slice(0, 6).map(([text, href]) =>
    `      <a href="${href}" class="il-link">${text}</a>`
  ).join('\n');

  return `
${MARKER}
<div class="internal-links-block">
  <div class="il-inner">
    <span class="il-label">📌 Related</span>
    <div class="il-links">
${items}
    </div>
  </div>
</div>

<style>
  .internal-links-block {
    background: rgba(255,204,51,.06);
    border-top: 1px solid rgba(255,204,51,.2);
    border-bottom: 1px solid rgba(255,204,51,.2);
    padding: 18px 24px;
    margin: 32px 0 0;
  }
  .il-inner {
    max-width: 1140px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  .il-label {
    font-size: .75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .08em;
    color: rgba(255,204,51,.8);
    white-space: nowrap;
    flex-shrink: 0;
  }
  .il-links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .il-link {
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 999px;
    font-size: .8rem;
    font-weight: 600;
    color: rgba(255,255,255,.8);
    text-decoration: none;
    transition: border-color .15s, background .15s, color .15s;
  }
  .il-link:hover {
    border-color: rgba(255,204,51,.5);
    background: rgba(255,204,51,.08);
    color: #ffcc33;
    text-decoration: none;
  }
</style>`;
}

// Process all pages
let updated = 0, skipped = 0;
const files = readdirSync(PAGES_DIR).filter(f => f.endsWith('.astro'));

for (const fname of files) {
  const slug = fname === 'index.astro' ? 'home' : fname.replace('.astro', '');
  if (slug === 'home') { skipped++; continue; } // homepage has its own links

  const fpath = join(PAGES_DIR, fname);
  let content = readFileSync(fpath, 'utf-8');

  if (content.includes(MARKER)) { skipped++; continue; }

  const cat = categories[slug] || 'info';
  const block = makeLinksBlock(slug, cat);

  if (content.includes('</Layout>')) {
    content = content.replace('</Layout>', `${block}\n</Layout>`);
  } else {
    content += `\n${block}\n`;
  }

  writeFileSync(fpath, content, 'utf-8');
  updated++;
}

console.log(`✅ Updated: ${updated} pages`);
console.log(`⏭  Skipped: ${skipped}`);
