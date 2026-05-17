/* ============================================================
   global.js — Krishi Portal Shared JavaScript
   Loaded at bottom of every page via <script src="global.js">
   ============================================================ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────
     1. DARK / LIGHT MODE TOGGLE
  ────────────────────────────────────────── */
  function initDarkMode() {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('kp-theme') || 'light';
    html.classList.toggle('dark', savedTheme === 'dark');

    // Wire ALL dark-mode toggle buttons on the page
    document.querySelectorAll('[data-dark-toggle], .dark-toggle-btn').forEach(btn => {
      updateDarkIcon(btn);
      btn.addEventListener('click', () => {
        const isDark = html.classList.toggle('dark');
        localStorage.setItem('kp-theme', isDark ? 'dark' : 'light');
        document.querySelectorAll('[data-dark-toggle], .dark-toggle-btn').forEach(updateDarkIcon);
      });
    });
  }

  function updateDarkIcon(btn) {
    const isDark = document.documentElement.classList.contains('dark');
    const icon = btn.querySelector('.material-symbols-outlined');
    if (icon) icon.textContent = isDark ? 'light_mode' : 'dark_mode';
    btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }

  /* ──────────────────────────────────────────
     2. LANGUAGE SWITCHER
  ────────────────────────────────────────── */
  // Supported languages shown in the dropdown
  const LANGUAGES = [
    { code: 'en', label: '🇮🇳 English' },
    { code: 'hi', label: '🇮🇳 हिन्दी' },
    { code: 'mr', label: '🇮🇳 मराठी' },
  ];

  function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('[data-lang-toggle], .lang-toggle-btn');
    if (!langBtns.length) return;

    // Create dropdown once
    let dropdown = document.getElementById('kp-lang-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.id = 'kp-lang-dropdown';
      const saved = localStorage.getItem('kp-lang') || 'en';

      LANGUAGES.forEach(lang => {
        const btn = document.createElement('button');
        btn.textContent = lang.label;
        btn.dataset.lang = lang.code;
        if (lang.code === saved) btn.classList.add('active');

        btn.addEventListener('click', () => {
          // Persist choice
          localStorage.setItem('kp-lang', lang.code);
          // Update active state in dropdown
          dropdown.querySelectorAll('button').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          dropdown.classList.remove('open');
          // ── Apply translations to the current page ──
          if (window.KP_I18N) window.KP_I18N.apply();
          showToast('🌐 ' + lang.label);
        });

        dropdown.appendChild(btn);
      });

      document.body.appendChild(dropdown);
    }

    langBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = btn.getBoundingClientRect();
        dropdown.style.top  = (rect.bottom + window.scrollY + 8) + 'px';
        dropdown.style.right = (window.innerWidth - rect.right) + 'px';
        dropdown.style.position = 'absolute';
        dropdown.classList.toggle('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
    });

    // ── Apply saved language immediately on page load ──
    if (window.KP_I18N) window.KP_I18N.apply();
  }

  /* ──────────────────────────────────────────
     3. MOBILE HAMBURGER MENU
  ────────────────────────────────────────── */
  function initHamburger() {
    const header = document.querySelector('header');
    if (!header) return;

    // Inject hamburger button if not present
    let hamburger = document.getElementById('kp-hamburger-btn');
    if (!hamburger) {
      hamburger = document.createElement('button');
      hamburger.id = 'kp-hamburger-btn';
      hamburger.className = 'kp-hamburger md:hidden';
      hamburger.setAttribute('aria-label', 'Toggle menu');
      hamburger.innerHTML = '<span></span><span></span><span></span>';

      // Find the header's flex container and append
      const navBar = header.querySelector('nav, div');
      if (navBar) navBar.appendChild(hamburger);
    }

    // Build mobile nav from existing desktop nav links
    let mobileNav = document.getElementById('kp-mobile-nav');
    if (!mobileNav) {
      mobileNav = document.createElement('nav');
      mobileNav.id = 'kp-mobile-nav';

      const navLinks = header.querySelectorAll('a[href]');
      const seenHrefs = new Set();
      navLinks.forEach(link => {
        if (seenHrefs.has(link.href)) return;
        seenHrefs.add(link.href);
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent.trim();
        mobileNav.appendChild(a);
      });

      // Add Weather and Contact if missing
      const allLinks = Array.from(mobileNav.querySelectorAll('a')).map(a => a.textContent.trim());
      const extras = [
        { text: 'Weather', href: 'weather.html' },
        { text: 'Contact Us', href: 'contact_us.html' },
      ];
      extras.forEach(ex => {
        if (!allLinks.includes(ex.text)) {
          const a = document.createElement('a');
          a.href = ex.href;
          a.textContent = ex.text;
          mobileNav.appendChild(a);
        }
      });

      document.body.insertBefore(mobileNav, document.body.firstChild.nextSibling);
    }

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ──────────────────────────────────────────
     4. ACTIVE NAV LINK HIGHLIGHTING
  ────────────────────────────────────────── */
  function initActiveNav() {
    const currentFile = window.location.pathname.split('/').pop() || 'home.html';
    document.querySelectorAll('header a[href], #kp-mobile-nav a[href]').forEach(link => {
      const linkFile = link.getAttribute('href').split('/').pop();
      if (linkFile === currentFile) {
        link.classList.add('active-nav');
        // Remove existing active styling from other links
        link.style.borderBottom = '2px solid #0d631b';
      }
    });
  }

  /* ──────────────────────────────────────────
     5. SCROLL REVEAL ANIMATIONS
  ────────────────────────────────────────── */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll(
      'section, .card-item, [data-reveal]'
    );
    revealEls.forEach(el => {
      if (!el.classList.contains('scroll-reveal')) {
        el.classList.add('scroll-reveal');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  }

  /* ──────────────────────────────────────────
     6. ANIMATED COUNTERS
  ────────────────────────────────────────── */
  function initCounters() {
    const counterEls = document.querySelectorAll('[data-counter]');
    if (!counterEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = '1';
            animateCounter(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterEls.forEach(el => observer.observe(el));
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.counterSuffix || '';
    const prefix = el.dataset.counterPrefix || '';
    const duration = 1800;
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  /* ──────────────────────────────────────────
     7. SCROLL TO TOP BUTTON
  ────────────────────────────────────────── */
  function initScrollToTop() {
    let btn = document.getElementById('kp-scroll-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'kp-scroll-top';
      btn.setAttribute('aria-label', 'Scroll to top');
      btn.innerHTML = '<span class="material-symbols-outlined">keyboard_arrow_up</span>';
      document.body.appendChild(btn);
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) btn.classList.add('visible');
      else btn.classList.remove('visible');
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ──────────────────────────────────────────
     8. TOAST NOTIFICATION
  ────────────────────────────────────────── */
  window.showToast = function (message, duration = 3000) {
    let toast = document.getElementById('kp-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'kp-toast';
      toast.innerHTML = '<span class="material-symbols-outlined toast-icon">check_circle</span><span class="toast-msg"></span>';
      document.body.appendChild(toast);
    }
    toast.querySelector('.toast-msg').textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), duration);
  };

  /* ──────────────────────────────────────────
     9. SUCCESS MODAL
  ────────────────────────────────────────── */
  window.showSuccessModal = function (title, text) {
    let modal = document.getElementById('kp-success-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'kp-success-modal';
      modal.innerHTML = `
        <div class="modal-box">
          <div class="modal-icon material-symbols-outlined">check_circle</div>
          <div class="modal-title"></div>
          <div class="modal-text"></div>
          <button class="modal-close">Close</button>
        </div>`;
      document.body.appendChild(modal);
      modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('show');
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
      });
    }
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-text').textContent = text;
    modal.classList.add('show');
  };

  /* ──────────────────────────────────────────
     10. LIVE TABLE / CARD SEARCH FILTER
  ────────────────────────────────────────── */
  window.initLiveSearch = function (inputSelector, targetSelector, emptyMsg) {
    const input = document.querySelector(inputSelector);
    if (!input) return;

    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      const targets = document.querySelectorAll(targetSelector);
      let visible = 0;

      targets.forEach(el => {
        const text = el.textContent.toLowerCase();
        const match = !query || text.includes(query);
        el.style.display = match ? '' : 'none';
        if (match) visible++;
      });

      // Show empty state
      let emptyEl = document.getElementById('kp-empty-state');
      if (!query || visible > 0) {
        if (emptyEl) emptyEl.remove();
        return;
      }
      if (!emptyEl) {
        emptyEl = document.createElement('div');
        emptyEl.id = 'kp-empty-state';
        emptyEl.style.cssText = 'text-align:center;padding:40px;color:#707a6c;font-family:Open Sans,sans-serif;';
        emptyEl.innerHTML = `<span class="material-symbols-outlined" style="font-size:48px;display:block;margin-bottom:12px;color:#bfcaba;">search_off</span>${emptyMsg || 'No results found'}`;
        const parent = document.querySelector(targetSelector)?.parentElement;
        if (parent) parent.appendChild(emptyEl);
      }
    });
  };

  /* ──────────────────────────────────────────
     11. FILTER TABS (Pills)
  ────────────────────────────────────────── */
  window.initFilterTabs = function (tabsSelector, itemsSelector, dataAttr) {
    const tabs = document.querySelectorAll(tabsSelector);
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter || 'all';
        document.querySelectorAll(itemsSelector).forEach(item => {
          const val = item.dataset[dataAttr] || '';
          item.style.display = (filter === 'all' || val === filter) ? '' : 'none';
        });
      });
    });
  };

  /* ──────────────────────────────────────────
     12. FORM VALIDATION HELPER
  ────────────────────────────────────────── */
  window.validateField = function (fieldId, rule, errorMsg) {
    const field = document.getElementById(fieldId);
    if (!field) return true;

    const errId = fieldId + '-err';
    let errEl = document.getElementById(errId);
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.id = errId;
      errEl.className = 'error-msg';
      field.parentNode.appendChild(errEl);
    }

    const valid = rule(field.value);
    if (!valid) {
      field.classList.add('field-error');
      errEl.textContent = errorMsg;
    } else {
      field.classList.remove('field-error');
      errEl.textContent = '';
    }
    return valid;
  };

  /* ──────────────────────────────────────────
     13. WIRE DESKTOP NAV — ADD WEATHER & CONTACT
  ────────────────────────────────────────── */
  function injectMissingNavLinks() {
    // Weather is now hardcoded in all page navbars.
    // Only inject Contact Us if genuinely absent (e.g. older page templates).
    const desktopNavs = document.querySelectorAll('header nav, header > div > div.hidden');
    desktopNavs.forEach(nav => {
      const links = nav.querySelectorAll('a');
      if (!links.length) return;

      const hrefs = Array.from(links).map(a => a.getAttribute('href'));
      if (!hrefs.includes('contact_us.html')) {
        const a = document.createElement('a');
        a.href = 'contact_us.html';
        a.textContent = 'Contact Us';
        const lastLink = links[links.length - 1];
        const baseClass = (lastLink.className || '')
          .replace('text-primary', 'text-on-surface-variant')
          .replace('font-bold', '')
          .replace('border-b-2', '')
          .replace('border-primary', '')
          .replace('pb-1', '')
          .replace('pb-0.5', '')
          .trim();
        a.className = baseClass;
        nav.appendChild(a);
      }
    });
  }

  /* ──────────────────────────────────────────
     INIT ALL
  ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initLanguageSwitcher();
    initHamburger();
    initActiveNav();
    initScrollReveal();
    initCounters();
    initScrollToTop();
    injectMissingNavLinks();
  });

})();
