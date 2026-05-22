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
   6. Contact page direct-URL fallback (?property= pre-fill)
   7. Smooth scroll & active nav highlight
   8. Property photo carousel
   9. Contact slide-over drawer
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
     6. CONTACT PAGE DIRECT-URL FALLBACK
     When a user navigates directly to /contact?property=ADDRESS
     (e.g. from an external link), pre-fill the message field.
     Normal site flow uses the slide-over drawer (section 9).
  ────────────────────────────────────────────────────────── */
  (function () {
    var params   = new URLSearchParams(window.location.search);
    var property = params.get('property');
    if (!property) return;
    var msgField = document.getElementById('contact-message');
    if (msgField && !msgField.value) {
      msgField.value = "I\u2019m interested in scheduling a showing for " + property + ".";
    }
    /* Also pre-select helpType */
    var helpField = document.getElementById('contact-help');
    if (helpField && !helpField.value) helpField.value = 'buying';
    /* Scroll to the form after the page settles */
    setTimeout(function () {
      var formSection = document.getElementById('contact-form');
      if (formSection) formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }());

  /* ──────────────────────────────────────────────────────────
     7. SMOOTH SCROLL + ACTIVE NAV HIGHLIGHT
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

  /* ──────────────────────────────────────────────────────────
     9. CONTACT SLIDE-OVER DRAWER
     Opens on ANY link whose href starts with /contact EXCEPT
     plain footer nav links (inside .footer-links).
     Pre-fills message + helpType for:
       • "Schedule a Showing" buttons → extracts address from card <h3>
       • "Ask About [City]" buttons   → extracts city from link text
  ────────────────────────────────────────────────────────── */
  var drawerOverlay = document.getElementById('contact-drawer-overlay');
  var drawer        = document.getElementById('contact-drawer');
  var drawerClose   = document.getElementById('drawer-close-btn');
  var drawerMessage = document.getElementById('drawer-message');
  var drawerHelp    = document.getElementById('drawer-help');

  function openDrawer(prefillText, prefillHelpValue) {
    if (!drawer) return;
    /* Reset fields before pre-filling so stale values don't persist */
    var drawerForm = drawer.querySelector('form');
    if (drawerForm) drawerForm.reset();
    /* Hide any previous messages */
    drawer.querySelectorAll('.drawer-msg').forEach(function (m) {
      m.classList.remove('show');
    });
    if (prefillText && drawerMessage) {
      drawerMessage.value = prefillText;
    }
    if (prefillHelpValue && drawerHelp) {
      drawerHelp.value = prefillHelpValue;
    }
    if (drawerOverlay) drawerOverlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    /* Focus first input after slide animation */
    setTimeout(function () {
      var firstInput = drawer.querySelector('input:not([type="hidden"]), select, textarea');
      if (firstInput) firstInput.focus();
    }, 360);
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  /* Close on overlay click or any click outside the drawer panel */
  document.addEventListener('click', function (e) {
    if (!drawer || !drawer.classList.contains('open')) return;
    /* If the click target is inside the drawer panel, do nothing */
    if (drawer.contains(e.target)) return;
    closeDrawer();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  /* Auto-close drawer 2.2 s after successful submission */
  var drawerSuccessEl = document.getElementById('drawer-contact-success');
  if (drawerSuccessEl) {
    new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'class' && drawerSuccessEl.classList.contains('show')) {
          setTimeout(function () {
            closeDrawer();
            setTimeout(function () {
              drawerSuccessEl.classList.remove('show');
              var drawerForm = drawer ? drawer.querySelector('form') : null;
              if (drawerForm) drawerForm.reset();
            }, 400);
          }, 2200);
        }
      });
    }).observe(drawerSuccessEl, { attributes: true });
  }

  /* Intercept all contact links — skip plain footer nav links */
  document.querySelectorAll('a[href^="/contact"]').forEach(function (link) {
    if (link.closest('.footer-links')) return; /* plain footer nav — let navigate */

    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation(); /* prevent click from reaching the document outside-click handler */

      /* Explicit data attributes take priority over text-parsing fallbacks */
      var prefillText = link.dataset.drawerPrefill || '';
      var helpValue   = link.dataset.drawerHelp   || '';

      if (!prefillText) {
        var text = link.textContent.trim();

        /* "Schedule a Showing" → extract property address from the card's <h3> */
        if (text.toLowerCase().indexOf('schedule a showing') !== -1) {
          var card = link.closest('article, .property-card');
          if (card) {
            var h3 = card.querySelector('h3');
            if (h3) {
              prefillText = "I\u2019m interested in scheduling a showing for " + h3.textContent.trim() + ".";
              if (!helpValue) helpValue = 'buying';
            }
          }
        }

        /* "Ask About [City]" → extract city name from the link text */
        var askMatch = text.match(/Ask About\s+(.+?)(?:\s*[\u2192\u00bb])?$/i);
        if (askMatch) {
          var city = askMatch[1].trim();
          prefillText = "I\u2019d like to learn more about " + city + ".";
          if (!helpValue) helpValue = 'buying';
        }
      }

      openDrawer(prefillText, helpValue);
    });
  });

  /* ──────────────────────────────────────────────────────────
     10. FULL-CARD CLICK — hub page video cards
     Clicking anywhere on the card navigates to the video page.
     Clicks on <a> tags (ext link, business link) are left alone.
  ────────────────────────────────────────────────────────── */
  document.querySelectorAll('.video-card-wrap .video-card').forEach(function (card) {
    var thumbLink = card.querySelector('.video-thumb');
    if (!thumbLink) return;
    var href = thumbLink.getAttribute('href');
    if (!href) return;

    card.addEventListener('click', function (e) {
      if (!e.target.closest('a')) {
        window.location.href = href;
      }
    });
  });


}); /* end DOMContentLoaded */
