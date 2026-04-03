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
   ============================================================ */

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
     Each form needs:
       data-form-id="unique-id"
       data-webhook="WEBHOOK_URL"
     The script checks if the URL is still a placeholder and
     shows a fallback message instead of firing a broken POST.
  ────────────────────────────────────────────────────────── */
  document.querySelectorAll('form[data-webhook]').forEach(function (form) {
    const webhookUrl = form.dataset.webhook || '';
    const formId     = form.dataset.formId  || 'form';
    const submitBtn  = form.querySelector('[type="submit"]');
    const successEl  = document.getElementById(formId + '-success');
    const errorEl    = document.getElementById(formId + '-error');
    const fallbackEl = document.getElementById(formId + '-fallback');

    /* Helper to show a message block */
    function showMsg(el) {
      [successEl, errorEl, fallbackEl].forEach(function (m) {
        if (m) m.classList.remove('show');
      });
      if (el) el.classList.add('show');
    }

    /* Detect unfilled placeholder */
    const isPlaceholder = (
      !webhookUrl ||
      webhookUrl === 'WEBHOOK_URL' ||
      webhookUrl.includes('REPLACE') ||
      webhookUrl.includes('YOUR_')
    );

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* If webhook not configured, show friendly fallback */
      if (isPlaceholder) {
        showMsg(fallbackEl);
        return;
      }

      /* Collect form data */
      const data = {};
      new FormData(form).forEach(function (value, key) {
        data[key] = value;
      });

      /* Disable submit while sending */
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending…';
      }

      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          /* GHL INTEGRATION NOTE: If GHL requires a different Content-Type or
             additional headers (e.g. Authorization), add them here. */
        },
        body: JSON.stringify(data),
      })
        .then(function (res) {
          /* GHL INTEGRATION NOTE: Adjust the success condition below if GHL returns
             a non-2xx status on success, or check for a specific JSON field. */
          if (res.ok) {
            showMsg(successEl);
            form.reset();
          } else {
            /* GHL INTEGRATION NOTE: Log res.status to debug unexpected responses. */
            showMsg(errorEl);
          }
        })
        .catch(function (err) {
          /* Network error or CORS issue — log for debugging */
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

}); /* end DOMContentLoaded */
