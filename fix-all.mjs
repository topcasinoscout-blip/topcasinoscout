// TopCasinoScout — Fix all broken links + pages
// Run with: node fix-all.mjs

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const PAGES_DIR = './src/pages';

// ── 1. FIX ALL BROKEN LINKS ACROSS ALL PAGES ─────────────────
const linkFixes = [
  // Affiliate
  [/https?:\/\/chickroad\.info[^\s"']*/g, 'https://44deal.com'],
  // Internal broken paths
  [/href="\/casino-rankings\/?"/g, 'href="/top-casino-rankings"'],
  [/href='\/casino-rankings\/?'/g, "href='/top-casino-rankings'"],
  [/href="\/blacklisted-and-unsafe-casinos\/?"/g, 'href="/blacklisted-online-casinos"'],
  [/href='\/blacklisted-and-unsafe-casinos\/?'/g, "href='/blacklisted-online-casinos'"],
  [/href="\/how-we-rate\/?"/g, 'href="/how-we-rate-online-casinos"'],
  [/href='\/how-we-rate\/?'/g, "href='/how-we-rate-online-casinos'"],
  [/href="\/casino-reviews\/?"/g, 'href="/detailed-casino-reviews"'],
  [/href='\/casino-reviews\/?'/g, "href='/detailed-casino-reviews'"],
  [/href="\/united-kingdom-bonus\/?"/g, 'href="/uk-casino-bonus"'],
  [/href='\/united-kingdom-bonus\/?'/g, "href='/uk-casino-bonus'"],
  [/href="\/ireland-bonus\/?"/g, 'href="/ireland-casino-bonus"'],
  [/href="\/canada-bonus\/?"/g, 'href="/canada-casino-bonus"'],
  [/href="\/new-zealand-bonus\/?"/g, 'href="/new-zealand-casino-bonus"'],
  [/href="\/united-states-bonus\/?"/g, 'href="/usa-casino-bonus"'],
  // Remove trailing slashes from internal links
  [/href="\/([\w-]+)\/"/g, 'href="/$1"'],
  [/href='\/([\w-]+)\/'/g, "href='/$1'"],
  // Fix localhost
  [/https?:\/\/localhost(:\d+)?(\/wordpress)?/g, ''],
  // Fix dead worker URLs - replace with 44deal
  [/https?:\/\/[a-z0-9-]+\.workers\.dev[^\s"']*/g, 'https://44deal.com'],
];

let totalPages = 0;

const files = readdirSync(PAGES_DIR).filter(f => f.endsWith('.astro'));
for (const fname of files) {
  const fpath = join(PAGES_DIR, fname);
  let content = readFileSync(fpath, 'utf-8');
  const original = content;
  for (const [pattern, replacement] of linkFixes) {
    content = content.replace(pattern, replacement);
  }
  if (content !== original) {
    writeFileSync(fpath, content, 'utf-8');
    totalPages++;
    console.log(`  Fixed: ${fname}`);
  }
}
console.log(`\n✅ Link fixes complete — ${totalPages} pages updated`);

// ── 2. FIX TCSDROPS PAGE ─────────────────────────────────────
const tcsdropContent = `---
import Layout from '../layouts/Layout.astro';
const title = "TCS Drops — Exclusive Stream Rewards";
const description = "TCS Drops — Exclusive stream-only casino bonus offers. Enter your access code to unlock this month's private viewer reward.";
---
<Layout title={title} description={description} slug="tcsdrops">
<style>
  .drops-wrap { font-family:Inter,Arial,sans-serif; background:#050505; min-height:100vh; }
  @keyframes tcs-soft-pulse { 0%,100%{box-shadow:0 14px 30px rgba(217,172,29,.22),0 0 0 rgba(240,198,58,0);transform:translateY(0)} 50%{box-shadow:0 16px 36px rgba(217,172,29,.30),0 0 24px rgba(240,198,58,.18);transform:translateY(-1px)} }
</style>
<div class="drops-wrap">
  <div id="tcs-age-gate" style="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(0,0,0,.88);backdrop-filter:blur(8px);">
    <div style="width:100%;max-width:460px;background:linear-gradient(180deg,#0e1228 0%,#050505 100%);border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:30px 24px;text-align:center;box-shadow:0 20px 70px rgba(0,0,0,.65);">
      <div style="display:inline-flex;align-items:center;justify-content:center;width:68px;height:68px;border-radius:50%;background:linear-gradient(180deg,#f0c63a 0%,#d9ac1d 100%);color:#111;font-size:.75rem;font-weight:900;margin-bottom:18px;line-height:1.2;">TCS<br>Drops</div>
      <div id="tcs-age-step">
        <h2 style="margin:0 0 12px;color:#fff;font-size:1.85rem;font-weight:900;">Age Restricted Content</h2>
        <p style="margin:0 auto;max-width:360px;color:#c7d0e6;font-size:1rem;line-height:1.7;">This page contains 18+ content. Are you aged 18 or over?</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:24px;">
          <button id="tcs-age-yes" type="button" style="border:none;cursor:pointer;border-radius:18px;padding:16px;font-size:1rem;font-weight:900;color:#111;background:linear-gradient(180deg,#f0c63a 0%,#d9ac1d 100%);">Yes, I am 18+</button>
          <button id="tcs-age-no" type="button" style="border:1px solid rgba(255,255,255,.14);cursor:pointer;border-radius:18px;padding:16px;font-size:1rem;font-weight:800;color:#fff;background:rgba(255,255,255,.04);">No</button>
        </div>
      </div>
      <div id="tcs-code-step" style="display:none;">
        <h2 style="margin:0 0 12px;color:#fff;font-size:1.85rem;font-weight:900;">Enter Access Key</h2>
        <p style="margin:0 auto;max-width:360px;color:#c7d0e6;font-size:1rem;line-height:1.7;">Use the stream code to unlock this month's private viewer reward.</p>
        <div style="margin-top:20px;">
          <input id="tcs-access-code" type="text" placeholder="Enter Access Key" autocomplete="off" style="width:100%;box-sizing:border-box;border:1px solid rgba(255,255,255,.14);border-radius:18px;padding:16px;font-size:1rem;font-weight:700;text-align:center;color:#fff;background:rgba(255,255,255,.05);outline:none;">
        </div>
        <p style="margin:10px 0 0;color:#8f9aba;font-size:.86rem;">Hint: the code is shown during the livestream</p>
        <p id="tcs-code-error" style="display:none;margin:10px 0 0;color:#ff5f5f;font-size:.9rem;font-weight:800;">Incorrect access code</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:22px;">
          <button id="tcs-code-submit" type="button" style="border:none;cursor:pointer;border-radius:18px;padding:16px;font-size:1rem;font-weight:900;color:#111;background:linear-gradient(180deg,#f0c63a 0%,#d9ac1d 100%);">Unlock the Drop</button>
          <button id="tcs-code-back" type="button" style="border:1px solid rgba(255,255,255,.14);cursor:pointer;border-radius:18px;padding:16px;font-size:1rem;font-weight:800;color:#fff;background:rgba(255,255,255,.04);">Back</button>
        </div>
      </div>
    </div>
  </div>
  <section style="background:#050505;padding:60px 16px;font-family:Inter,Arial,sans-serif;min-height:100vh;">
    <div style="max-width:420px;margin:0 auto;text-align:center;">
      <div style="background:#000;border-radius:26px;overflow:hidden;box-shadow:0 18px 60px rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.06);">
        <div style="background:linear-gradient(180deg,#101a48 0%,#090d23 100%);padding:14px;">
          <a href="https://44deal.com" target="_blank" rel="noopener noreferrer nofollow" style="display:block;text-decoration:none;">
            <img src="/wp-content/uploads/2026/04/ChatGPT-Image-Apr-6-2026-09_38_10-AM.webp" alt="TCS Drops" style="display:block;width:100%;height:auto;border-radius:22px;" onerror="this.style.display='none'">
          </a>
          <div style="position:absolute;left:26px;right:26px;bottom:26px;display:flex;justify-content:center;pointer-events:none;">
            <div style="display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:999px;background:rgba(8,12,24,.86);border:1px solid rgba(255,214,107,.16);">
              <span style="width:8px;height:8px;background:#ffd66b;border-radius:50%;display:inline-block;"></span>
              <span style="color:#e9cf8c;font-size:.84rem;font-weight:800;text-transform:uppercase;">Exclusive Access Reward</span>
            </div>
          </div>
        </div>
        <div style="padding:20px 26px;text-align:center;background:#000;">
          <h1 style="margin:0;color:#fff;font-size:2rem;font-weight:900;">You Found It.</h1>
          <p style="margin:10px auto 0;max-width:340px;color:#d7def0;font-size:1.05rem;font-weight:700;">Exclusive Stream Offer</p>
          <div style="margin-top:18px;">
            <a href="https://44deal.com" target="_blank" rel="noopener noreferrer nofollow" style="display:block;text-decoration:none;background:linear-gradient(180deg,#f0c63a 0%,#d9ac1d 100%);color:#0d0d0d;font-weight:900;font-size:1.12rem;padding:20px 22px;border-radius:22px;animation:tcs-soft-pulse 2.2s ease-in-out infinite;">Unlock Bonus</a>
          </div>
          <p style="margin:14px auto 0;max-width:340px;color:#aeb6cc;font-size:.95rem;line-height:1.55;">This is the private offer we only show during live streams. If you are seeing this, you came from the stream.</p>
          <div style="margin-top:16px;">
            <a href="https://t.me/tcsdrops" target="_blank" rel="noopener noreferrer nofollow" style="display:inline-flex;align-items:center;justify-content:center;gap:10px;text-decoration:none;background:#117fc2;color:#fff;font-weight:800;font-size:1rem;padding:14px 22px;border-radius:18px;">Continue to Telegram</a>
          </div>
          <p style="margin:18px 0 0;color:#72798a;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;">Play responsibly • 18+</p>
        </div>
      </div>
    </div>
  </section>
</div>
<script>
(function(){
  var gate=document.getElementById('tcs-age-gate');
  var ageStep=document.getElementById('tcs-age-step');
  var codeStep=document.getElementById('tcs-code-step');
  var yesBtn=document.getElementById('tcs-age-yes');
  var noBtn=document.getElementById('tcs-age-no');
  var codeInput=document.getElementById('tcs-access-code');
  var codeSubmit=document.getElementById('tcs-code-submit');
  var codeBack=document.getElementById('tcs-code-back');
  var codeError=document.getElementById('tcs-code-error');
  var ACCESS_CODE='MAY150FS';
  function unlock(){if(gate)gate.style.display='none';document.body.style.overflow='';}
  try{if(localStorage.getItem('tcs_drops_ok')==='1'){unlock();return;}}catch(e){}
  document.body.style.overflow='hidden';
  if(yesBtn)yesBtn.onclick=function(){if(ageStep)ageStep.style.display='none';if(codeStep)codeStep.style.display='block';if(codeInput)setTimeout(function(){codeInput.focus();},50);};
  if(noBtn)noBtn.onclick=function(){window.location.href='https://cashmonster.app/signup?invite=3F63FA3A';};
  if(codeBack)codeBack.onclick=function(){if(codeStep)codeStep.style.display='none';if(ageStep)ageStep.style.display='block';};
  function check(){var v=(codeInput?codeInput.value:'').trim().toUpperCase();if(v===ACCESS_CODE){try{localStorage.setItem('tcs_drops_ok','1');}catch(e){}unlock();}else{if(codeError)codeError.style.display='block';}}
  if(codeSubmit)codeSubmit.onclick=check;
  if(codeInput){codeInput.onkeydown=function(e){if(e.key==='Enter'){e.preventDefault();check();}};codeInput.oninput=function(){if(codeError)codeError.style.display='none';};}
})();
</script>
</Layout>`;

writeFileSync(join(PAGES_DIR, 'tcsdrops.astro'), tcsdropContent, 'utf-8');
console.log('✅ tcsdrops.astro rebuilt (no Worker dependency)');

// ── 3. FIX MIA PAGE (empty) ───────────────────────────────────
const miaContent = `---
import Layout from '../layouts/Layout.astro';
const title = "Page Not Found";
const description = "This page could not be found. Return to TopCasinoScout for casino reviews, bonuses and rankings.";
---
<Layout title={title} description={description} slug="mia">
  <div style="max-width:640px;margin:80px auto;padding:0 24px;text-align:center;">
    <div style="font-size:4rem;margin-bottom:20px;">🔍</div>
    <h1 style="font-size:2rem;font-weight:800;margin-bottom:12px;">This page has moved</h1>
    <p style="color:rgba(255,255,255,.65);margin-bottom:32px;line-height:1.7;">The page you're looking for isn't here. Try one of these instead:</p>
    <div style="display:flex;flex-direction:column;gap:12px;max-width:320px;margin:0 auto;">
      <a href="/" style="display:block;padding:14px 24px;background:#ffcc33;color:#05051b;font-weight:700;border-radius:10px;text-decoration:none;">🏠 Go to Homepage</a>
      <a href="/top-casino-bonuses" style="display:block;padding:13px 24px;border:1.5px solid rgba(255,204,51,.4);color:#fff;font-weight:600;border-radius:10px;text-decoration:none;">🎁 Top Casino Bonuses</a>
      <a href="/detailed-casino-reviews" style="display:block;padding:13px 24px;border:1.5px solid rgba(255,204,51,.4);color:#fff;font-weight:600;border-radius:10px;text-decoration:none;">📋 Casino Reviews</a>
      <a href="/casino-bonus-finder" style="display:block;padding:13px 24px;border:1.5px solid rgba(255,204,51,.4);color:#fff;font-weight:600;border-radius:10px;text-decoration:none;">🤖 AI Bonus Finder</a>
    </div>
  </div>
</Layout>`;

writeFileSync(join(PAGES_DIR, 'mia.astro'), miaContent, 'utf-8');
console.log('✅ mia.astro rebuilt as 404-style redirect page');

// ── 4. FIX STREAM PAGE ────────────────────────────────────────
const streamContent = `---
import Layout from '../layouts/Layout.astro';
const title = "Live Casino Streams & Exclusive Offers";
const description = "TopCasinoScout live casino stream content on YouTube and Kick. Access exclusive stream-only promotions and verified bonus offers.";
---
<Layout title={title} description={description} slug="stream">
  <div class="tcs-page-content">
    <div class="tcs-label-pill">Live Stream Content • Verified Offers</div>
    <h1>Live Casino Streams &amp; Exclusive Offers</h1>
    <p class="tcs-text-lead">At TopCasinoScout, we create and share live casino stream content across platforms including YouTube and Kick. Our streams focus on real gameplay, platform testing, and identifying the strongest available promotions in real time.</p>
    <div class="tcs-review-block">
      <span class="tcs-label-pill">Exclusive Offers</span>
      <h2>Stream-Only Bonus Access</h2>
      <p>Through verified partnerships, we provide access to exclusive stream offers and promotions that are not always publicly available. These offers are selected based on value, transparency, and availability.</p>
      <div class="tcs-hero-ctas">
        <a href="/tcsdrops" class="tcs-btn-primary">🎁 Enter TCS Drops</a>
        <a href="/casino-bonus-finder" class="tcs-btn-secondary">🤖 AI Bonus Finder</a>
      </div>
    </div>
    <div class="tcs-review-block">
      <span class="tcs-label-pill">Platforms</span>
      <h2>Where to Watch</h2>
      <p>Follow our live streams on YouTube and Kick for real-time bonus reveals, casino testing, and exclusive viewer rewards. Join our Telegram for instant notifications when drops go live.</p>
      <div class="tcs-hero-ctas">
        <a href="https://t.me/tcsdrops" target="_blank" rel="noopener nofollow" class="tcs-btn-secondary">📱 Join Telegram</a>
      </div>
    </div>
    <p style="font-size:.78rem;color:rgba(255,255,255,.35);margin-top:24px;">18+ · Play responsibly · Content for informational purposes only</p>
  </div>
</Layout>`;

writeFileSync(join(PAGES_DIR, 'stream.astro'), streamContent, 'utf-8');
console.log('✅ stream.astro rebuilt cleanly');

console.log('\n✅ All fixes complete! Run: git add . && git commit -m "Fix broken links and rebuild pages" && git push');
