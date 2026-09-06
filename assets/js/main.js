/* ── UI motion: loader, smooth scroll, reveals, cursor, tilt ── */
(function () {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  gsap.registerPlugin(ScrollTrigger);

  /* ── smooth scroll ── */
  let lenis = null;
  if (!reduced && window.Lenis) {
    lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.6 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const goTo = (target) => {
    const el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -70 });
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    e.preventDefault();
    closeMenu();
    goTo(id);
  }));

  /* ── split text into animatable pieces ── */
  const splitChars = (el) => {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((ch) => {
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = ch === ' ' ? ' ' : ch;
      el.appendChild(s);
    });
    return $$('.char', el);
  };
  const splitWords = (el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((w, i) => {
      const s = document.createElement('span');
      s.className = 'word';
      s.textContent = w;
      el.appendChild(s);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    return $$('.word', el);
  };
  $$('[data-split]').forEach(splitChars);
  $$('[data-split-words]').forEach(splitWords);

  /* ── loader → hero ── */
  const loader = $('#loader');
  const bar = $('#loaderBar');
  const pct = $('#loaderPct');
  const state = { v: 0 };
  let revealed = false;

  // Everything below runs on gsap's ticker, which is rAF-driven and therefore
  // frozen while the tab is in the background. A page opened in a background
  // tab would sit on the loader forever, so the escape hatch has to be a plain
  // timer that owes nothing to rAF.
  function reveal(animated) {
    if (revealed) return;
    revealed = true;
    clearTimeout(escapeHatch);

    if (!animated) {
      if (loader) loader.remove();
      document.body.classList.remove('is-loading');
      gsap.set('.hero__title .char', { opacity: 1, y: 0, rotateX: 0 });
      gsap.set('.hero [data-reveal]', { opacity: 1, y: 0 });
      return;
    }
    gsap.timeline()
      .to(loader, { opacity: 0, duration: .6, ease: 'power2.out', onComplete: () => loader.remove() })
      .add(() => document.body.classList.remove('is-loading'), '<')
      .from('.nav', { y: -40, opacity: 0, duration: .8, ease: 'power3.out' }, '-=.3')
      .to('.hero__title .char', {
        opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power4.out', stagger: .04,
      }, '-=.6')
      .to('.hero [data-reveal]', { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .09 }, '-=.7');
  }
  const escapeHatch = setTimeout(() => reveal(false), 5000);

  gsap.set('.hero__title .char', { opacity: 0, y: '0.9em', rotateX: -70 });
  gsap.set('[data-split], [data-split-words]', { opacity: 1 });
  gsap.set('[data-reveal]', { opacity: 0, y: 26 });
  gsap.set('[data-split-words] .word', { opacity: 0, y: '0.7em' });

  if (reduced) {
    gsap.set('[data-split-words] .word', { opacity: 1, y: 0 });
    gsap.set('[data-reveal]', { opacity: 1, y: 0 });
    reveal(false);
  } else {
    // fake-but-honest progress: finishes when fonts + window load are done
    const paint = () => { bar.style.width = state.v + '%'; pct.textContent = Math.round(state.v); };
    gsap.to(state, { v: 92, duration: 1.4, ease: 'power1.out', onUpdate: paint });
    const done = () => {
      // no point animating a progress bar nobody can see
      if (document.hidden) return reveal(false);
      gsap.to(state, { v: 100, duration: .35, onUpdate: paint, onComplete: () => reveal(true) });
    };
    let fired = false;
    const once = () => { if (!fired) { fired = true; done(); } };
    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise((r) => (document.readyState === 'complete' ? r() : addEventListener('load', r))),
    ]).then(once);
    setTimeout(once, 3000); // never trap someone behind a slow CDN
  }

  /* ── scroll reveals ── */
  if (!reduced) {
    $$('[data-reveal]').forEach((el) => {
      if (el.closest('.hero')) return;
      gsap.to(el, {
        opacity: 1, y: 0, duration: .95, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });
    $$('[data-split-words]').forEach((el) => {
      gsap.to($$('.word', el), {
        opacity: 1, y: 0, duration: .8, ease: 'power3.out', stagger: .035,
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });
  }

  /* ── number counters ── */
  $$('[data-count]').forEach((el) => {
    const end = +el.dataset.count;
    const suf = el.dataset.suffix || '';
    const o = { v: 0 };
    const set = () => { el.textContent = Math.round(o.v) + suf; };
    if (reduced) { o.v = end; set(); return; }
    gsap.to(o, {
      v: end, duration: 1.6, ease: 'power2.out', onUpdate: set,
      scrollTrigger: { trigger: el, start: 'top 92%' },
    });
  });

  /* ── skill bars ── */
  $$('.bar i').forEach((el) => {
    const w = el.dataset.fill + '%';
    if (reduced) { el.style.width = w; return; }
    gsap.to(el, {
      width: w, duration: 1.3, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 92%' },
    });
  });

  /* ── scroll progress + sticky nav + active link ── */
  const progress = $('#progress');
  const nav = $('#nav');
  const links = $$('.nav__links a');
  const sections = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);
  const onScroll = () => {
    const max = Math.max(1, document.body.scrollHeight - innerHeight);
    progress.style.width = (scrollY / max) * 100 + '%';
    nav.classList.toggle('stuck', scrollY > 40);
    let cur = -1;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= innerHeight * 0.35) cur = i; });
    links.forEach((a, i) => a.classList.toggle('active', i === cur));
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── mobile menu ── */
  const burger = $('#burger'), menu = $('#menu');
  function closeMenu() {
    burger.classList.remove('open');
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    lenis && lenis.start();
  }
  burger.addEventListener('click', () => {
    const open = !menu.classList.contains('open');
    burger.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    lenis && (open ? lenis.stop() : lenis.start());
  });
  addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());

  /* ── rotating role ── */
  const roles = [
    'Backend & platform engineer', 'Go · Kafka · Kubernetes',
    '28M requests a week', 'Available for contract work',
    'YouTuber & photographer',
  ];
  const rot = $('#rot');
  if (rot && !reduced) {
    let i = 0;
    const type = () => {
      const next = roles[++i % roles.length];
      const tl = gsap.timeline();
      const wipe = { n: rot.textContent.length };
      tl.to(wipe, {
        n: 0, duration: .35, ease: 'none',
        onUpdate: () => { rot.textContent = rot.textContent.slice(0, Math.round(wipe.n)); },
      })
      .add(() => { wipe.n = 0; })
      .to(wipe, {
        n: next.length, duration: .55, ease: 'none',
        onUpdate: () => { rot.textContent = next.slice(0, Math.round(wipe.n)); },
      })
      .call(() => setTimeout(type, 2200));
    };
    setTimeout(type, 2600);
  }

  /* ── custom cursor ── */
  const cur = $('#cursor');
  if (cur && matchMedia('(hover:hover)').matches) {
    const dot = $('.cursor__dot'), ring = $('.cursor__ring');
    const xTo = gsap.quickTo(dot, 'x', { duration: .12 }), yTo = gsap.quickTo(dot, 'y', { duration: .12 });
    const rx = gsap.quickTo(ring, 'x', { duration: .45, ease: 'power3' });
    const ry = gsap.quickTo(ring, 'y', { duration: .45, ease: 'power3' });
    addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); rx(e.clientX); ry(e.clientY); });
    $$('a, button, .card, .hobby').forEach((el) => {
      el.addEventListener('pointerenter', () => cur.classList.add('hot'));
      el.addEventListener('pointerleave', () => cur.classList.remove('hot'));
    });
  }

  /* ── magnetic buttons ── */
  if (!reduced && matchMedia('(hover:hover)').matches) {
    $$('[data-magnetic]').forEach((el) => {
      const x = gsap.quickTo(el, 'x', { duration: .4, ease: 'power3' });
      const y = gsap.quickTo(el, 'y', { duration: .4, ease: 'power3' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * .35);
        y((e.clientY - r.top - r.height / 2) * .35);
      });
      el.addEventListener('pointerleave', () => { x(0); y(0); });
    });
  }

  /* ── 3D tilt + cursor spotlight on cards ── */
  if (!reduced && matchMedia('(hover:hover)').matches) {
    $$('[data-tilt]').forEach((el) => {
      const rx = gsap.quickTo(el, 'rotationX', { duration: .5, ease: 'power3' });
      const ry = gsap.quickTo(el, 'rotationY', { duration: .5, ease: 'power3' });
      gsap.set(el, { transformPerspective: 900 });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        rx((py - .5) * -9);
        ry((px - .5) * 12);
        el.style.setProperty('--mx', px * 100 + '%');
        el.style.setProperty('--my', py * 100 + '%');
      });
      el.addEventListener('pointerleave', () => { rx(0); ry(0); });
    });
  }

  $('#yr').textContent = new Date().getFullYear();
  addEventListener('scene:ready', () => ScrollTrigger.refresh());
})();
