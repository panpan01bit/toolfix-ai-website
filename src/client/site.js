/* ToolFix AI — progressive enhancement. No dependencies. */
(function () {
  'use strict';

  var d = document;
  d.documentElement.classList.remove('no-js');

  /* ---------------------------------------------------------- header state */
  var header = d.querySelector('[data-header]');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------ mobile menu */
  var burger = d.querySelector('[data-burger]');
  var menu = d.querySelector('[data-menu]');
  if (burger && menu) {
    var setMenu = function (open) {
      menu.hidden = false;
      menu.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      d.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', function () {
      setMenu(!menu.classList.contains('is-open'));
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && menu.classList.contains('is-open')) setMenu(false);
    });
  }

  /* ---------------------------------------------------------------- reveal */
  var reveals = d.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  /* ------------------------------------------------------- inline autoplay */
  var inline = d.querySelectorAll('[data-inline-tour]');
  inline.forEach(function (v) {
    v.muted = true;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              var x = v.play();
              if (x && x.catch) x.catch(function () {});
            } else {
              v.pause();
            }
          });
        },
        { threshold: 0.25 },
      ).observe(v);
    }
  });

  /* ------------------------------------------------------------- lightbox */
  var lb = d.querySelector('[data-lb]');
  var lbVideo = d.querySelector('[data-lb-video]');
  var lbTitle = d.querySelector('[data-lb-title]');
  var lastFocus = null;

  function openLb(slug, title, base) {
    if (!lb || !lbVideo) return;
    lastFocus = d.activeElement;
    lbTitle.textContent = title || '';
    lbVideo.src = base + 'media/video/' + slug + '.mp4';
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    d.body.style.overflow = 'hidden';
    lbVideo.play().catch(function () {});
    var close = lb.querySelector('[data-lb-close]');
    if (close) close.focus();
  }
  function closeLb() {
    if (!lb || !lb.classList.contains('is-open')) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    lbVideo.pause();
    lbVideo.removeAttribute('src');
    lbVideo.load();
    d.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  d.querySelectorAll('[data-play]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openLb(btn.getAttribute('data-play'), btn.getAttribute('data-title'), btn.getAttribute('data-base') || '/');
    });
  });
  if (lb) {
    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLb();
    });
    var c = lb.querySelector('[data-lb-close]');
    if (c) c.addEventListener('click', closeLb);
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLb();
    });
  }

  /* ---------------------------------------------------------------- filters */
  var filterRoot = d.querySelector('[data-filters]');
  if (filterRoot) {
    var cards = d.querySelectorAll('[data-cat]');
    filterRoot.addEventListener('click', function (e) {
      var chip = e.target.closest('[data-filter]');
      if (!chip) return;
      var val = chip.getAttribute('data-filter');
      filterRoot.querySelectorAll('[data-filter]').forEach(function (b) {
        b.classList.toggle('is-on', b === chip);
        b.setAttribute('aria-pressed', String(b === chip));
      });
      cards.forEach(function (card) {
        card.style.display = val === 'All' || card.getAttribute('data-cat') === val ? '' : 'none';
      });
    });
  }

  /* -------------------------------------------------------------- accordion */
  d.querySelectorAll('[data-acc]').forEach(function (acc) {
    acc.addEventListener('click', function (e) {
      var btn = e.target.closest('.acc__btn');
      if (!btn) return;
      var item = btn.closest('.acc__item');
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ------------------------------------------------------------ FAQ search */
  var faqInput = d.querySelector('[data-faqsearch]');
  if (faqInput) {
    var items = d.querySelectorAll('[data-faq-item]');
    var groups = d.querySelectorAll('[data-faq-group]');
    var empty = d.querySelector('[data-faq-empty]');
    faqInput.addEventListener('input', function () {
      var q = faqInput.value.trim().toLowerCase();
      var hits = 0;
      items.forEach(function (it) {
        var txt = it.textContent.toLowerCase();
        var show = !q || txt.indexOf(q) > -1;
        it.style.display = show ? '' : 'none';
        if (show) hits++;
      });
      groups.forEach(function (g) {
        var any = Array.prototype.some.call(g.querySelectorAll('[data-faq-item]'), function (i) {
          return i.style.display !== 'none';
        });
        g.style.display = any ? '' : 'none';
      });
      if (empty) empty.style.display = hits ? 'none' : 'block';
    });
  }

  /* ------------------------------------------------------------- calculator */
  var calc = d.querySelector('[data-calc]');
  if (calc) {
    var tickets = calc.querySelector('[name=tickets]');
    var share = calc.querySelector('[name=share]');
    var plan = calc.querySelector('[name=plan]');
    var out = {
      tickets: calc.querySelector('[data-out-tickets]'),
      share: calc.querySelector('[data-out-share]'),
      volume: calc.querySelector('[data-out-volume]'),
      recovered: calc.querySelector('[data-out-recovered]'),
      value: calc.querySelector('[data-out-value]'),
      cost: calc.querySelector('[data-out-cost]'),
      net: calc.querySelector('[data-out-net]'),
    };
    var PLAN_PRICE = { 399: 55, 899: 125, 1650: 229 };
    var fmt = function (n) {
      return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
    };
    function run() {
      var t = Number(tickets.value);
      var s = Number(share.value) / 100;
      var price = Number(plan.value);
      var fake = t * s;
      var recovered = fake * 0.7;
      var value = recovered * 60;
      var costUSD = PLAN_PRICE[price] || 125;
      var net = value - costUSD;
      out.tickets.textContent = fmt(t);
      out.share.textContent = Math.round(s * 100) + '%';
      out.volume.textContent = fmt(Math.round(fake));
      out.recovered.textContent = fmt(Math.round(recovered));
      out.value.textContent = '$' + fmt(Math.round(value));
      out.cost.textContent = '$' + fmt(costUSD);
      out.net.textContent = '$' + fmt(Math.round(net));
    }
    [tickets, share, plan].forEach(function (el) {
      el.addEventListener('input', run);
    });
    run();
  }

  /* --------------------------------------------------------- year anchor fix */
  if (window.location.hash) {
    var target = d.getElementById(window.location.hash.slice(1));
    if (target) setTimeout(function () { target.scrollIntoView(); }, 60);
  }
})();
