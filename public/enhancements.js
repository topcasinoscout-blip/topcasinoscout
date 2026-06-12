// TopCasinoScout — Site-Wide JS Enhancements
(function() {
  'use strict';

  // 1. READING PROGRESS BAR
  var progress = document.createElement('div');
  progress.id = 'tcs-progress';
  document.body.appendChild(progress);
  window.addEventListener('scroll', function() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  }, { passive: true });

  // 2. FLOATING CLAIM BAR
  var floatBar = document.createElement('div');
  floatBar.id = 'tcs-float-bar';
  floatBar.innerHTML = '<span class="fb-text"><strong>Ready to claim?</strong> Our AI found the best bonus available in your region right now.</span><a href="https://44deal.com" class="fb-btn" target="_blank" rel="nofollow noopener sponsored">Unlock My Bonus →</a><button class="fb-close" aria-label="Close">×</button>';
  document.body.appendChild(floatBar);
  var barDismissed = false;
  try { if (sessionStorage.getItem('tcs-bar-dismissed')) barDismissed = true; } catch(e) {}
  window.addEventListener('scroll', function() {
    if (barDismissed) return;
    floatBar.classList.toggle('is-visible', window.scrollY > 400);
  }, { passive: true });
  floatBar.querySelector('.fb-close').addEventListener('click', function() {
    barDismissed = true;
    floatBar.classList.remove('is-visible');
    try { sessionStorage.setItem('tcs-bar-dismissed', '1'); } catch(e) {}
  });

  // 3. SCORE BARS ANIMATION
  if ('IntersectionObserver' in window) {
    var barObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.tcs-score-bar-fill[data-width]').forEach(function(bar) {
            bar.style.width = bar.getAttribute('data-width') + '%';
          });
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.tcs-score-bar-wrap').forEach(function(el) { barObs.observe(el); });
  }

  // 4. FAQ ACCORDIONS — convert .tcs-faq-card into accordions
  document.querySelectorAll('.tcs-faq-card').forEach(function(card) {
    var h3 = card.querySelector('h3');
    if (!h3 || card.querySelector('.tcs-accordion-trigger')) return;
    card.classList.add('tcs-accordion-item');
    var bodyNodes = [];
    var node = h3.nextSibling;
    while (node) { bodyNodes.push(node); node = node.nextSibling; }
    var trigger = document.createElement('button');
    trigger.className = 'tcs-accordion-trigger';
    trigger.textContent = h3.textContent;
    var body = document.createElement('div');
    body.className = 'tcs-accordion-body';
    bodyNodes.forEach(function(n) { body.appendChild(n); });
    h3.replaceWith(trigger);
    card.appendChild(body);
    trigger.addEventListener('click', function() {
      var isOpen = card.classList.contains('is-open');
      document.querySelectorAll('.tcs-accordion-item.is-open').forEach(function(el) { el.classList.remove('is-open'); });
      if (!isOpen) card.classList.add('is-open');
    });
  });

  // 5. HIDE BROKEN / PLACEHOLDER IMAGES
  document.querySelectorAll('img').forEach(function(img) {
    if (img.src.indexOf('placeholder') > -1 || img.src.indexOf('via.placeholder') > -1) {
      img.style.display = 'none';
    }
    img.addEventListener('error', function() { this.style.display = 'none'; });
  });

  // 6. BREADCRUMBS
  var path = window.location.pathname.replace(/\/$/, '');
  if (path && path !== '/') {
    var slug = path.replace('/', '');
    var label = slug.replace(/-/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); });
    var crumb = document.createElement('div');
    crumb.className = 'tcs-breadcrumb';
    crumb.innerHTML = '<a href="/">Home</a><span class="tcs-breadcrumb-sep">/</span><span>' + label + '</span>';
    var content = document.querySelector('.tcs-page-content');
    if (content) content.insertBefore(crumb, content.firstChild);
  }

  // 7. SMOOTH SCROLL FOR ANCHORS
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // 8. FADE IN PAGE
  var main = document.querySelector('main');
  if (main) {
    main.style.opacity = '0';
    main.style.transition = 'opacity .3s ease';
    requestAnimationFrame(function() { main.style.opacity = '1'; });
  }

})();
