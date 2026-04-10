/* ============================================================
   THE COOP FINDER — SHARED JAVASCRIPT
   Tessa Hood | Knight Land Company
   ============================================================
   Sections:
   1. Mobile nav toggle
   2. YouTube video lightbox (<dialog>)
   3. FAQ accordion
   4. Category filter (Around the Coop)
   5. Form submission with GHL webhook & graceful fallback
   6. Smooth scroll & active nav highlight
   7. Property photo carousel
   ============================================================ */

/* ════════════════════════════════════════════════════════════
   GOHIGHLEVEL WEBHOOK — PASTE YOUR URL ON THE LINE BELOW
   All 4 site forms (Home, Buyers, Sellers, Contact) send to
   this single endpoint. Replace the placeholder string with
   your actual GHL webhook URL and save the file.
════════════════════════════════════════════════════════════ */
var GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/ubTknez7NyEtjGBooDEL/webhook-trigger/1c008a74-34f1-4527-a6d8-22434becde8f';

document.addEventListener('DOMContentLoaded', function () {

  /* ──────────────────────────────────────────────────────────
     1. MOBILE NAV TOGGLE
  ────────────────────────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    /* Close menu when a link inside it is clicked */
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    /* Close menu on outside click */
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ──────────────────────────────────────────────────────────
     2. YOUTUBE VIDEO LIGHTBOX
     Usage: give any element data-video-id="YOUTUBE_ID"
            and data-video-title="Video Title" (optional)
  ────────────────────────────────────────────────────────── */
  const dialog   = document.getElementById('video-dialog');
  const dialogIframe = dialog ? dialog.querySelector('.dialog-video iframe') : null;
  const dialogTitle  = dialog ? dialog.querySelector('.dialog-title') : null;
  const dialogClose  = dialog ? dialog.querySelector('.dialog-close') : null;

  function openVideo(videoId, title) {
    if (!dialog || !dialogIframe) return;
    dialogIframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
    if (dialogTitle && title) dialogTitle.textContent = title;
    dialog.showModal();
  }

  function closeVideo() {
    if (!dialog) return;
    dialog.close();
    if (dialogIframe) dialogIframe.src = '';
  }

  if (dialogClose) dialogClose.addEventListener('click', closeVideo);
  if (dialog) {
    /* Close on backdrop click */
    dialog.addEventListener('click', function (e) {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top  || e.clientY > rect.bottom
      ) closeVideo();
    });
    /* Close on ESC (dialog handles ESC natively but we also clear src) */
    dialog.addEventListener('close', function () {
      if (dialogIframe) dialogIframe.src = '';
    });
  }

  /* Wire up all video trigger elements */
  document.querySelectorAll('[data-video-id]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (e.target.closest('.video-business-link')) return;
      e.preventDefault();
      const id    = el.dataset.videoId;
      const title = el.dataset.videoTitle || '';
      if (id) openVideo(id, title);
    });
    /* Keyboard accessibility */
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id    = el.dataset.videoId;
        const title = el.dataset.videoTitle || '';
        if (id) openVideo(id, title);
      }
    });
  });

  /* ──────────────────────────────────────────────────────────
     3. FAQ ACCORDION
  ────────────────────────────────────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('open');
      /* Close all open items in this FAQ list */
      const list = item.closest('.faq-list');
      if (list) {
        list.querySelectorAll('.faq-item.open').forEach(function (open) {
          open.classList.remove('open');
          open.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
      }
      /* Toggle the clicked item (unless it was already open) */
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ──────────────────────────────────────────────────────────
     4. CATEGORY FILTER (Around the Coop page)
     Elements with data-category on .video-section are toggled
     based on the active filter button.
  ────────────────────────────────────────────────────────── */
  const filterBtns    = document.querySelectorAll('.filter-btn[data-filter]');
  const videoSections = document.querySelectorAll('.video-section[data-category]');

  if (filterBtns.length && videoSections.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.dataset.filter;

        /* Update active button */
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        /* Show / hide sections */
        videoSections.forEach(function (section) {
          if (filter === 'all' || section.dataset.category === filter) {
            section.style.display = '';
          } else {
            section.style.display = 'none';
          }
        });
      });
    });
  }

  /* ──────────────────────────────────────────────────────────
     5. FORM SUBMISSION WITH GHL WEBHOOK
     All forms with [data-webhook] use GHL_WEBHOOK_URL (defined
     at the top of this file). Each form also needs:
       data-form-id="unique-id"
     Fields are normalized to consistent keys before sending:
       inquiry_type, name, email, phone, message,
       source_page, site_name
  ────────────────────────────────────────────────────────── */

  /* Field-name aliases: any of these keys are renamed to inquiry_type */
  var INQUIRY_TYPE_ALIASES = ['intent', 'buyerType', 'helpType'];

  /* Detect unfilled placeholder — checked once at load time */
  var isPlaceholder = (
    !GHL_WEBHOOK_URL ||
    GHL_WEBHOOK_URL === 'PASTE_YOUR_GHL_WEBHOOK_URL_HERE' ||
    GHL_WEBHOOK_URL.includes('REPLACE') ||
    GHL_WEBHOOK_URL.includes('YOUR_')
  );

  document.querySelectorAll('form[data-webhook]').forEach(function (form) {
    var formId    = form.dataset.formId || 'form';
    var submitBtn = form.querySelector('[type="submit"]');
    var successEl = document.getElementById(formId + '-success');
    var errorEl   = document.getElementById(formId + '-error');
    var fallbackEl= document.getElementById(formId + '-fallback');

    /* Helper: show one message block, hide the others */
    function showMsg(el) {
      [successEl, errorEl, fallbackEl].forEach(function (m) {
        if (m) m.classList.remove('show');
      });
      if (el) el.classList.add('show');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* If webhook not yet configured, show friendly fallback */
      if (isPlaceholder) {
        showMsg(fallbackEl);
        return;
      }

      /* Collect all form fields */
      var raw = {};
      new FormData(form).forEach(function (value, key) {
        raw[key] = value;
      });

      /* Normalize field names → consistent GHL payload */
      var data = {
        name         : raw.name         || '',
        email        : raw.email        || '',
        phone        : raw.phone        || '',
        inquiry_type : '',
        message      : raw.message      || '',
        source_page  : (function () {
          var p = window.location.pathname || '/';
          p = p.replace(/\.html$/, '');
          if (p === '/index' || p === '') p = '/';
          return 'The Coop Finder — ' + p;
        }())
      };

      /* Map any alias key → inquiry_type */
      INQUIRY_TYPE_ALIASES.forEach(function (alias) {
        if (raw[alias]) data.inquiry_type = raw[alias];
      });
      /* If form already uses inquiry_type directly, honour it */
      if (raw.inquiry_type) data.inquiry_type = raw.inquiry_type;

      /* Pass through any extra form-specific fields (e.g. propertyAddress) */
      Object.keys(raw).forEach(function (key) {
        var isCore = ['name','email','phone','message','inquiry_type'].concat(INQUIRY_TYPE_ALIASES).indexOf(key) !== -1;
        if (!isCore) data[key] = raw[key];
      });

      /* Disable submit button while sending */
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending…';
      }

      fetch(GHL_WEBHOOK_URL, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(data),
      })
        .then(function (res) {
          if (res.ok) {
            showMsg(successEl);
            form.reset();
          } else {
            console.error('[Coop Finder] GHL webhook returned', res.status);
            showMsg(errorEl);
          }
        })
        .catch(function (err) {
          console.error('[Coop Finder] Form submission error:', err);
          showMsg(errorEl);
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
          }
        });
    });
  });

  /* ──────────────────────────────────────────────────────────
     6. SMOOTH SCROLL + ACTIVE NAV HIGHLIGHT
  ────────────────────────────────────────────────────────── */

  /* Smooth scroll for on-page anchor links (e.g. #contact-form) */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        /* Update URL hash without jumping */
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', '#' + id);
        }
      }
    });
  });

  /* Active nav link — set at runtime so all pages share identical HTML nav */
  (function () {
    const current = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
      if (link.classList.contains('btn')) return;
      const href = link.getAttribute('href') || '';
      let linkPath = '/' + href.replace(/\.html$/, '').replace(/^\//, '');
      if (linkPath === '/index') linkPath = '/';
      if (current === linkPath) link.classList.add('active');
    });
  }());

  /* ──────────────────────────────────────────────────────────
     7. PROPERTY PHOTO CAROUSEL
  ────────────────────────────────────────────────────────── */
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var slides   = carousel.querySelectorAll('.carousel-slide');
    var counter  = carousel.querySelector('.carousel-counter');
    var btnPrev  = carousel.querySelector('.carousel-btn.prev');
    var btnNext  = carousel.querySelector('.carousel-btn.next');
    var total    = slides.length;
    var current  = 0;

    function goTo(idx) {
      slides[current].classList.remove('active');
      current = (idx + total) % total;
      slides[current].classList.add('active');
      if (counter) counter.textContent = (current + 1) + ' / ' + total;
    }

    if (btnPrev) btnPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      goTo(current - 1);
    });
    if (btnNext) btnNext.addEventListener('click', function (e) {
      e.stopPropagation();
      goTo(current + 1);
    });

    /* swipe support */
    var touchStartX = 0;
    carousel.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    carousel.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });
  });

}); /* end DOMContentLoaded */
