/**
 * Pitch page motion — typewriter, count-up, phase tabs (no Three.js / no GSAP)
 */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Typewriter ── */
  function initTypewriter() {
    var el = document.getElementById('typewriter-heading');
    if (!el) return;

    var full = el.dataset.text || el.textContent;
    var splitAt = parseInt(el.dataset.split || '0', 10);
    var speed = parseInt(el.dataset.speed || '35', 10);
    el.textContent = '';
    el.setAttribute('aria-label', full);

    if (reduced) {
      el.innerHTML =
        '<span class="tw-dark">' +
        escapeHtml(full.slice(0, splitAt)) +
        '</span><span class="tw-accent">' +
        escapeHtml(full.slice(splitAt)) +
        '</span>';
      document.body.classList.add('typing-done');
      return;
    }

    var cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    el.appendChild(cursor);

    var i = 0;
    setTimeout(function tick() {
      if (i >= full.length) {
        cursor.remove();
        document.body.classList.add('typing-done');
        return;
      }
      var ch = full.charAt(i);
      var span = document.createElement('span');
      span.className = i < splitAt ? 'tw-dark' : 'tw-accent';
      span.textContent = ch;
      el.insertBefore(span, cursor);
      i += 1;
      setTimeout(tick, speed);
    }, 400);
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ── Count up ── */
  function initCountUp() {
    var el = document.getElementById('orbit-stat-num');
    if (!el) return;

    var target = parseInt(el.dataset.target || '40', 10);
    var suffix = el.dataset.suffix || '+';

    if (reduced) {
      el.textContent = target + suffix;
      return;
    }

    var duration = 2000;
    var delay = 1200;

    setTimeout(function () {
      var start = performance.now();
      function frame(now) {
        var t = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }, delay);
  }

  /* ── Roadmap tabs ── */
  function initRoadmap() {
    var chips = document.querySelectorAll('.phase-chip');
    var cards = document.querySelectorAll('.phase-card');
    if (!chips.length) return;

    function activate(id) {
      chips.forEach(function (c) {
        c.classList.toggle('is-active', c.dataset.phase === id);
        c.setAttribute('aria-selected', c.dataset.phase === id ? 'true' : 'false');
      });
      cards.forEach(function (card) {
        var on = card.dataset.phase === id;
        card.classList.toggle('is-active', on);
        card.hidden = !on;
      });
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        activate(chip.dataset.phase);
      });
    });

    if (!reduced) {
      var idx = 0;
      setInterval(function () {
        if (document.hidden) return;
        idx = (idx + 1) % chips.length;
        activate(chips[idx].dataset.phase);
      }, 5000);
    }

    activate(chips[0].dataset.phase);
  }

  /* ── Smooth anchor scroll + approach highlight ── */
  function highlightApproach(id) {
    if (!id || id.indexOf('approach-') !== 0) return;
    document.querySelectorAll('.approach-detail').forEach(function (card) {
      card.classList.remove('is-highlight');
    });
    var card = document.getElementById(id);
    if (!card) return;
    card.classList.add('is-highlight');
    window.setTimeout(function () {
      card.classList.remove('is-highlight');
    }, 2400);
  }

  function scrollToTarget(target, highlightId) {
    if (!target) return;
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    if (highlightId) {
      window.setTimeout(function () {
        highlightApproach(highlightId);
      }, reduced ? 0 : 350);
    }
  }

  function initApproachLinks() {
    function goToApproach(link) {
      var section = document.getElementById('approach');
      if (!section) return;
      scrollToTarget(section, link.dataset.highlight || '');
      history.replaceState(null, '', '#approach');
    }

    document.querySelectorAll('.approach-pill').forEach(function (pill) {
      pill.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        goToApproach(pill);
      });
    });
  }

  function initNav() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      if (a.classList.contains('approach-pill')) return;

      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var highlightId = id.indexOf('approach-') === 1 ? id.slice(1) : '';
        scrollToTarget(target, highlightId);
      });
    });

    if (location.hash) {
      var hashTarget = document.querySelector(location.hash);
      if (hashTarget) {
        window.setTimeout(function () {
          var highlightId = location.hash.indexOf('approach-') === 1 ? location.hash.slice(1) : '';
          scrollToTarget(hashTarget, highlightId);
        }, 120);
      }
    }
  }

  /* ── Hero curved lines ── */
  function initHeroLines() {
    if (reduced) return;

    var sides = [
      { id: 'hero-lines-left', count: 20 },
      { id: 'hero-lines-right', count: 20 },
      { id: 'hero-lines-top', count: 12 }
    ];

    sides.forEach(function (side) {
      var container = document.getElementById(side.id);
      if (!container) return;

      for (var i = 0; i < side.count; i += 1) {
        var line = document.createElement('div');
        line.className = 'hero-line';
        line.style.animationDelay = (i * 0.25 + Math.random() * 0.5) + 's';
        line.style.animationDuration = (4 + Math.random() * 3) + 's';
        container.appendChild(line);
      }
    });
  }

  /* ── Orbit radius (responsive pill placement) ── */
  /* ── Section curved lines (match hero Alwayzz decor) ── */
  function initSectionLines() {
    if (reduced) return;

    document.querySelectorAll('.section, .ticker-wrap, .cta-section').forEach(function (section, idx) {
      if (section.querySelector('.section-lines')) return;

      var wrap = document.createElement('div');
      wrap.className = 'section-lines';
      wrap.setAttribute('aria-hidden', 'true');

      for (var i = 0; i < 10; i += 1) {
        var line = document.createElement('div');
        line.className = 'section-line';
        line.style.animationDelay = (i * 0.28 + idx * 0.15 + Math.random() * 0.4) + 's';
        line.style.animationDuration = (5 + Math.random() * 2) + 's';
        wrap.appendChild(line);
      }

      section.insertBefore(wrap, section.firstChild);
    });
  }

  function initOrbitRadius() {
    var viz = document.querySelector('.circles-viz');
    var hub = document.querySelector('.orbit-hub');
    if (!viz) return;

    function syncRadius() {
      var w = viz.clientWidth;
      var desired = Math.round(w * 0.458);

      if (w >= 900) {
        viz.style.setProperty('--orbit-r', desired + 'px');
        return;
      }

      var cardHalf = w < 640 ? 46 : 74;
      var hubHalf = hub ? hub.getBoundingClientRect().width / 2 : w * 0.17;
      var gap = 6;
      var margin = 10;
      var minRadius = Math.round(hubHalf + gap + cardHalf);
      var maxRadius = Math.round((w / 2) - cardHalf - margin);
      var radius;
      if (minRadius <= maxRadius) {
        radius = Math.round((minRadius + maxRadius) / 2);
      } else {
        radius = Math.max(30, maxRadius);
      }
      viz.style.setProperty('--orbit-r', radius + 'px');
    }

    syncRadius();
    window.addEventListener('resize', syncRadius);
  }

  function initMobileMenu() {
    var btn = document.getElementById('navHamburger');
    var menu = document.getElementById('mobileMenu');
    var backdrop = document.getElementById('mobileMenuBackdrop');
    var header = document.querySelector('.site-header');
    if (!btn || !menu || !backdrop) return;

    function syncMenuOffset() {
      var h = header ? header.getBoundingClientRect().height : 72;
      menu.style.paddingTop = (h + 24) + 'px';
    }
    syncMenuOffset();
    window.addEventListener('resize', syncMenuOffset);

    function closeMenu() {
      btn.classList.remove('is-open');
      menu.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    }
    function openMenu() {
      syncMenuOffset();
      btn.classList.add('is-open');
      menu.classList.add('is-open');
      backdrop.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-hidden', 'false');
    }

    btn.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) { closeMenu(); } else { openMenu(); }
    });
    backdrop.addEventListener('click', closeMenu);
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  function initApproachTap() {
    document.querySelectorAll('.approach-detail').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('a, button')) return;
        var wasOpen = card.classList.contains('is-tapped');
        document.querySelectorAll('.approach-detail.is-tapped').forEach(function (c) {
          if (c !== card) c.classList.remove('is-tapped');
        });
        card.classList.toggle('is-tapped', !wasOpen);
      });
    });
  }

  function boot() {
    initTypewriter();
    initCountUp();
    initRoadmap();
    initNav();
    initApproachLinks();
    initHeroLines();
    initSectionLines();
    initOrbitRadius();
    initMobileMenu();
    initApproachTap();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
