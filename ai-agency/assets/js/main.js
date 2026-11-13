/* =========================================================
   FUTURE MAKERS — interactions
   ========================================================= */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const hasGsap = !!window.gsap;
  if (hasGsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------- year / clock / live counters ---------- */
  const y = new Date().getFullYear();
  $('#year').textContent = y; $('#yearF').textContent = y;
  const clock = $('#hudClock');
  const tickClock = () => {
    clock.textContent = new Date().toLocaleTimeString('fr-FR', { timeZone: 'Africa/Casablanca', hour12: false }) + ' CAS';
  };
  tickClock(); setInterval(tickClock, 1000);
  const live = $('#agentsLive');
  setInterval(() => { live.textContent = 10 + Math.floor(Math.random() * 6); }, 3200);
  const tps = $('#hudTps');
  let lastTps = 0;
  addEventListener('fm:tps', (e) => {
    const now = performance.now();
    if (now - lastTps > 120) { tps.textContent = e.detail.toLocaleString('fr-FR'); lastTps = now; }
  });

  /* ---------- text scramble ---------- */
  const GLYPHS = '!<>-_\\/[]{}—=+*^?#01ABCDEFXYZ';
  function scramble(el, finalText, dur = 600) {
    const from = el.textContent;
    const to = finalText ?? el.dataset.text ?? from;
    el.dataset.text = to;
    const start = performance.now();
    cancelAnimationFrame(el._scr);
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      let out = '';
      for (let i = 0; i < to.length; i++) {
        if (to[i] === ' ') { out += ' '; continue; }
        out += i / to.length < p ? to[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) el._scr = requestAnimationFrame(step);
    };
    el._scr = requestAnimationFrame(step);
  }
  $$('[data-scramble]').forEach((a) => {
    const node = [...a.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
    if (!node) return;
    const span = document.createElement('span');
    span.textContent = node.textContent.trim();
    a.replaceChild(span, node);
    a.addEventListener('mouseenter', () => scramble(span, span.dataset.text || span.textContent, 400));
  });
  $$('[data-scramble-hover]').forEach((el) => {
    el.closest('.member').addEventListener('mouseenter', () => scramble(el, el.dataset.text || el.textContent, 500));
  });

  /* ---------- preloader ---------- */
  const loader = $('#loader');
  const logEl = $('#loaderLog');
  const lines = [
    'init <span>neural.core</span> … ok',
    'loading <span>agents</span> [voice, crm, studio, academy]',
    'connecting <span>casablanca.node</span> … ok',
    'calibrating <span>creativity</span> → 100%',
    'compiling <span>future</span> …'
  ];
  let li = 0;
  const logTimer = setInterval(() => {
    if (li >= lines.length) return clearInterval(logTimer);
    const p = document.createElement('p'); p.innerHTML = '> ' + lines[li++]; logEl.appendChild(p);
  }, 260);

  function runLoader() {
    return new Promise((resolve) => {
      const num = $('#loaderNum'), bar = $('#loaderBar');
      const dur = reduce ? 300 : 1900;
      const t0 = performance.now();
      const f = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        num.textContent = String(Math.round(e * 100)).padStart(3, '0');
        bar.style.width = e * 100 + '%';
        if (p < 1) requestAnimationFrame(f); else resolve();
      };
      requestAnimationFrame(f);
    });
  }

  /* ---------- Lenis smooth scroll ---------- */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
    }
    lenis.stop();
  }
  // anchor links through lenis
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = id === '#top' ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
    document.body.classList.remove('menu-open');
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.6 });
    else if (target === 0) scrollTo({ top: 0, behavior: 'smooth' });
    else target.scrollIntoView({ behavior: 'smooth' });
  }));

  /* ---------- Intro sequence ---------- */
  runLoader().then(() => {
    window.FMHero && FMHero.start();
    document.body.classList.remove('is-loading');
    if (lenis) lenis.start();
    if (!hasGsap) { loader.remove(); $$('.reveal-up').forEach((e) => (e.style.opacity = 1, e.style.transform = 'none')); return; }
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' })
      .set(loader, { display: 'none' })
      .from('.hero__title .word', { yPercent: 110, rotate: 4, duration: 1.4, stagger: 0.09 }, '-=.55')
      .to('.reveal-up', { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 }, '-=1.1')
      .from('.nav > *', { y: -30, opacity: 0, duration: 1, stagger: 0.08 }, '-=1.2')
      .from('.hero__hud .hud__cell', { opacity: 0, y: 20, duration: 1, stagger: 0.08 }, '-=1');
    loader.style.clipPath = 'inset(0 0 0 0)';
  });

  /* ---------- Nav behaviour ---------- */
  const nav = $('#nav');
  let lastY = 0;
  const onScroll = () => {
    const sy = scrollY;
    nav.classList.toggle('is-scrolled', sy > 40);
    nav.classList.toggle('is-hidden', sy > lastY && sy > 400 && !document.body.classList.contains('menu-open'));
    lastY = sy;
  };
  addEventListener('scroll', onScroll, { passive: true });
  $('#burger').addEventListener('click', () => document.body.classList.toggle('menu-open'));

  // active link
  const sections = $$('main section[id]');
  const navLinks = $$('.nav__links a');
  const navIO = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => navIO.observe(s));

  /* ---------- Cursor ---------- */
  if (fine) {
    const cur = $('#cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring'), label = $('#cursorLabel');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; });
    (function loop() { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); })();
    document.addEventListener('pointerover', (e) => {
      const lab = e.target.closest('[data-cursor]');
      const hov = e.target.closest('a,button,input,.card,.proj');
      cur.classList.toggle('is-label', !!lab);
      cur.classList.toggle('is-hover', !!hov && !lab);
      if (lab) label.textContent = lab.dataset.cursor;
    });
    // magnetic
    $$('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y2 = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px,${y2 * 0.35}px)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform .7s cubic-bezier(.16,1,.3,1)';
        el.style.transform = '';
        setTimeout(() => (el.style.transition = ''), 700);
      });
    });
  }

  /* ---------- Spotlight cards ---------- */
  $$('.card').forEach((c) => c.addEventListener('pointermove', (e) => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', e.clientX - r.left + 'px');
    c.style.setProperty('--my', e.clientY - r.top + 'px');
  }));

  /* ---------- Manifesto word split ---------- */
  const man = $('#manifesto');
  const HL = ['construisons.', 'jamais', 'apprennent', 'maîtrisent', 'avantage', 'compétitif.'];
  man.innerHTML = man.textContent.trim().split(/\s+/).map((w) => `<span class="w${HL.includes(w) ? ' hl' : ''}">${w}</span>`).join(' ');
  const words = $$('.w', man);

  /* ---------- Counters ---------- */
  function countUp(el) {
    const end = +el.dataset.count, suf = el.dataset.suffix || '', pad = +el.dataset.pad || 0;
    const start = end > 1000 ? end - 40 : 0, t0 = performance.now(), dur = 1800;
    const f = (now) => {
      const p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 4);
      el.textContent = String(Math.round(start + (end - start) * e)).padStart(pad, '0') + suf;
      if (p < 1) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  }
  const cio = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); } }), { threshold: 0.6 });
  $$('[data-count]').forEach((el) => cio.observe(el));

  /* ---------- Scroll-driven (GSAP) ---------- */
  if (hasGsap && window.ScrollTrigger) {
    const mm = gsap.matchMedia();
    const modes = ['SPHÈRE NEURONALE', 'ANNEAU ORBITAL', 'CHAMP DE DONNÉES'];
    const hudMode = $('#hudMode');
    let modeIdx = 0;
    const setMorph = (p) => {
      const v = p * 2;
      window.FMHero && FMHero.setMorph(v);
      const idx = v < 0.6 ? 0 : v < 1.5 ? 1 : 2;
      if (idx !== modeIdx) { modeIdx = idx; scramble(hudMode, modes[idx], 500); }
    };

    mm.add('(min-width: 861px)', () => {
      // pinned hero: particles morph while title lifts away
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '#hero', start: 'top top', end: '+=130%', pin: true, scrub: 0.8, onUpdate: (s) => setMorph(s.progress) }
      });
      tl.to('.hero__title', { yPercent: -18, opacity: 0.0, filter: 'blur(10px)', ease: 'none' }, 0.35)
        .to('.hero__bottom', { y: -60, opacity: 0, ease: 'none' }, 0.3)
        .to('.hero .eyebrow', { opacity: 0, ease: 'none' }, 0.35)
        .to('.hero__vignette', { opacity: 0.4, ease: 'none' }, 0);

      // horizontal projects
      const track = $('#projTrack');
      const dist = () => track.scrollWidth - innerWidth;
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: '#projets', start: 'top top', end: () => '+=' + dist(), pin: '.projects__pin', scrub: 0.8, invalidateOnRefresh: true,
          onUpdate: (s) => ($('#projProgress').style.width = s.progress * 100 + '%')
        }
      });
      // subtle per-card parallax
      $$('.proj__mark').forEach((m) => gsap.fromTo(m, { xPercent: 12 }, {
        xPercent: -12, ease: 'none',
        scrollTrigger: { trigger: '#projets', start: 'top top', end: () => '+=' + dist(), scrub: true }
      }));
    });
    mm.add('(max-width: 860px)', () => {
      ScrollTrigger.create({ trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true, onUpdate: (s) => setMorph(s.progress) });
      const pin = $('.projects__pin');
      pin.style.height = 'auto';
      pin.style.overflowX = 'auto';
      pin.style.scrollSnapType = 'x mandatory';
      $$('.proj').forEach((p) => (p.style.scrollSnapAlign = 'center'));
      pin.addEventListener('scroll', () => {
        const max = pin.scrollWidth - pin.clientWidth;
        $('#projProgress').style.width = (pin.scrollLeft / max) * 100 + '%';
      }, { passive: true });
    });

    // manifesto lights up word by word
    ScrollTrigger.create({
      trigger: man, start: 'top 80%', end: 'bottom 45%', scrub: true,
      onUpdate: (s) => { const n = Math.round(s.progress * words.length); words.forEach((w, i) => w.classList.toggle('on', i < n)); }
    });

    // headings: masked line reveals
    $$('.h2 .split, .contact__title .split').forEach((s) => {
      const inner = document.createElement('span');
      inner.innerHTML = s.innerHTML; s.innerHTML = ''; s.appendChild(inner);
      s.classList.add('split-line');
    });
    $$('.h2, .contact__title').forEach((h) => {
      gsap.from($$('.split-line > span', h), {
        yPercent: 115, rotate: 3, duration: 1.3, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: h, start: 'top 85%' }
      });
    });

    // generic fade-ups
    gsap.utils.toArray('.section__sub, .section__tag, .card, .member, .step, .acc__item, .console, .studio__app, .stats .stat, .contact__mail, .contact__sub, .contact .btn').forEach((el) => {
      gsap.from(el, { y: 50, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });

    // marquee skews with scroll velocity
    const mq = $('.marquee__track');
    ScrollTrigger.create({
      onUpdate: (s) => gsap.to(mq, { skewX: gsap.utils.clamp(-12, 12, s.getVelocity() / -250), duration: 0.4, overwrite: true })
    });

    // academy giant words drift
    $$('.academy__big span').forEach((s, i) => gsap.fromTo(s, { xPercent: i % 2 ? 8 : -8 }, {
      xPercent: i % 2 ? -8 : 8, ease: 'none', scrollTrigger: { trigger: '.academy', start: 'top bottom', end: 'bottom top', scrub: true }
    }));

    // method steps line
    const steps = $$('.step');
    gsap.to('#stepsLine', {
      scaleX: 1, ease: 'none',
      scrollTrigger: {
        trigger: '.steps', start: 'top 75%', end: 'bottom 55%', scrub: true,
        onUpdate: (s) => steps.forEach((st, i) => st.classList.toggle('is-on', s.progress >= i / steps.length + 0.02))
      }
    });
    ScrollTrigger.create({ trigger: '.steps', start: 'top 80%', onEnter: () => { if (innerWidth <= 860) steps.forEach((st) => st.classList.add('is-on')); } });

    // studio tilt on scroll
    gsap.fromTo('.studio__app', { rotateX: 14, rotateY: -10, scale: 0.92 }, {
      rotateX: 0, rotateY: 0, scale: 1, ease: 'none',
      scrollTrigger: { trigger: '.studio', start: 'top bottom', end: 'center center', scrub: true }
    });
    gsap.set('.studio', { perspective: 1400 });

    addEventListener('load', () => ScrollTrigger.refresh());
  } else {
    words.forEach((w) => w.classList.add('on'));
  }

  /* ---------- Accordion ---------- */
  $$('.acc__h').forEach((h) => h.addEventListener('click', () => {
    const item = h.parentElement, open = item.classList.contains('is-open');
    $$('.acc__item').forEach((i) => i.classList.remove('is-open'));
    if (!open) item.classList.add('is-open');
    setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 650);
  }));

  /* ---------- AI Studio mock ---------- */
  const prompts = [
    ['Votre marque. Vos règles. Un packaging minimal, une personnalité singulière.', 'Deux flacons, deux humeurs. Jour lumineux, nuit profonde.', 'Lignes pures, typographie condensée, matière mate.'],
    ['Vos chiffres, racontés clairement. Une infographie prête pour LinkedIn.', 'Données → histoire. Hiérarchie nette, accent signature.', 'Une seule idée par visuel. Lisible en 3 secondes.'],
    ['Une landing page générée depuis votre brief, alignée sur votre charte.', 'Hero, preuve, appel à l’action. Rien de superflu.', 'Déclinée en 4 langues en un clic.']
  ];
  let curV = 0, pIdx = 0;
  const appCanvas = $('#appCanvas'), appGen = $('#appGen'), appPrompt = $('#appPrompt');
  function typeInto(el, text) {
    el.textContent = ''; let i = 0;
    clearInterval(el._t);
    el._t = setInterval(() => { el.textContent = text.slice(0, ++i); if (i >= text.length) clearInterval(el._t); }, 18);
  }
  function generate(v) {
    appCanvas.classList.remove('is-gen'); void appCanvas.offsetWidth; appCanvas.classList.add('is-gen');
    appGen.textContent = 'GÉNÉRATION…';
    $$('.variant').forEach((x) => x.classList.toggle('is-active', +x.dataset.v === v));
    pIdx = (pIdx + 1) % 3;
    typeInto(appPrompt, prompts[v][pIdx]);
    if (v === 0) $$('.pack__body').forEach((b) => b.style.filter = `hue-rotate(${pIdx * 40}deg)`);
    setTimeout(() => (appGen.textContent = 'PRÊT ✓'), 1100);
  }
  $$('.app__tabs button').forEach((b) => b.addEventListener('click', () => {
    $$('.app__tabs button').forEach((x) => x.classList.remove('is-active'));
    b.classList.add('is-active'); curV = +b.dataset.v; pIdx = -1; generate(curV);
  }));
  $('#regen').addEventListener('click', () => generate(curV));
  if (fine) {
    const app = $('#studioApp');
    app.addEventListener('pointermove', (e) => {
      const r = app.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, yy = (e.clientY - r.top) / r.height - 0.5;
      app.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-yy * 6}deg)`;
    });
    app.addEventListener('pointerleave', () => (app.style.transform = ''));
  }

  /* =========================================================
     LIVE AGENT DEMO
     ========================================================= */
  const SCN = {
    support: {
      ask: 'Je veux répondre à mes clients WhatsApp 24h/24.',
      nodes: ['WhatsApp', 'Base FAQ', 'CRM', 'Escalade', 'Analytics'],
      time: '3 sem.',
      steps: [
        ['think', 'Analyse du besoin : volume de messages, langues, horaires de pointe…'],
        ['think', 'Intention détectée → support client multicanal, FR / AR / darija.'],
        ['tool', 'knowledge.ingest("FAQ, catalogue, conditions de retour")', 1],
        ['ok', 'Documents découpés et indexés dans une base vectorielle.'],
        ['tool', 'whatsapp.business.connect()', 0],
        ['ok', 'Canal WhatsApp relié à l’agent.'],
        ['tool', 'crm.lookup(client_id)', 2],
        ['ok', 'Historique client disponible en contexte.'],
        ['think', 'Règle de sécurité : cas sensibles → transfert à un humain.'],
        ['tool', 'routing.escalate(rules)', 3],
        ['tool', 'dashboard.track(satisfaction, délais)', 4],
        ['out', 'Proposition : un agent WhatsApp multilingue branché à votre CRM, qui répond instantanément, qualifie chaque demande et passe la main à vos équipes quand il le faut.']
      ]
    },
    voice: {
      ask: 'Un agent vocal pour accueillir les patients de ma clinique.',
      nodes: ['Téléphonie', 'Agenda', 'Dossier', 'Rappel SMS', 'Secrétariat'],
      time: '4 sem.',
      steps: [
        ['think', 'Contexte santé détecté → confidentialité et ton rassurant prioritaires.'],
        ['tool', 'voice.provision(fr-MA, ar-MA)', 0],
        ['ok', 'Voix naturelle configurée, latence conversationnelle.'],
        ['tool', 'calendar.sync(praticiens)', 1],
        ['ok', 'Créneaux disponibles lus en temps réel.'],
        ['tool', 'records.verify(identité patient)', 2],
        ['think', 'L’agent ne donne jamais d’avis médical : il oriente et planifie.'],
        ['tool', 'sms.schedule(rappel J-1)', 3],
        ['tool', 'handoff.reception(urgence)', 4],
        ['out', 'Proposition : un standard vocal qui décroche à chaque appel, prend et confirme les rendez-vous, envoie les rappels et transfère immédiatement les urgences à votre secrétariat.']
      ]
    },
    studio: {
      ask: 'Produire 30 visuels produit par jour, fidèles à ma marque.',
      nodes: ['Brand kit', 'Génération', 'Contrôle', 'Drive / Shop', 'Planning'],
      time: '3 sem.',
      steps: [
        ['think', 'Objectif : volume + cohérence de marque. Il faut des garde-fous visuels.'],
        ['tool', 'brand.extract(logo, palette, typos, ton)', 0],
        ['ok', 'Charte encodée en règles de génération.'],
        ['tool', 'image.pipeline(packshots → mises en scène)', 1],
        ['ok', 'Déclinaisons formats : story, carré, bannière.'],
        ['tool', 'qa.check(couleurs, lisibilité, logo)', 2],
        ['think', 'Validation humaine en un clic avant publication.'],
        ['tool', 'export.sync(Drive, boutique)', 3],
        ['tool', 'calendar.plan(publications)', 4],
        ['out', 'Proposition : votre studio IA privé. Vous déposez vos produits, il génère des visuels conformes à votre charte, vous validez, et tout part au bon endroit.']
      ]
    },
    crm: {
      ask: 'Unifier mon CRM et mon ERP, et avoir enfin une vue claire.',
      nodes: ['ERP', 'CRM', 'Sync data', 'Tableau de bord', 'Agent ventes'],
      time: '5 sem.',
      steps: [
        ['think', 'Diagnostic : données dupliquées, saisies manuelles, pas de vue unique.'],
        ['tool', 'erp.connect(stocks, factures)', 0],
        ['tool', 'crm.connect(contacts, opportunités)', 1],
        ['ok', 'Deux sources reliées, schéma commun défini.'],
        ['tool', 'data.sync(dédoublonnage, temps réel)', 2],
        ['ok', 'Une seule source de vérité.'],
        ['tool', 'bi.build(KPIs direction)', 3],
        ['think', 'Bonus : un agent qui prépare les relances commerciales chaque matin.'],
        ['tool', 'agent.deploy(sales_assistant)', 4],
        ['out', 'Proposition : un écosystème unifié où ventes, stocks et finance parlent la même langue, avec un tableau de bord vivant et un assistant qui prépare le travail de vos équipes.']
      ]
    }
  };
  function pickScenario(text) {
    const t = text.toLowerCase();
    if (/voc|voix|appel|t[ée]l[ée]phon|standard|clinique|patient/.test(t)) return 'voice';
    if (/visuel|image|contenu|photo|vid[ée]o|pub|marque|packag/.test(t)) return 'studio';
    if (/crm|erp|odoo|donn[ée]|stock|factur|vente|tableau/.test(t)) return 'crm';
    return 'support';
  }

  const consoleEl = $('#console'), log = $('#agentLog'), state = $('#consoleState');
  const svg = $('#graphSvg'), empty = $('#graphEmpty');
  const input = $('#agentInput');
  let runId = 0;
  const sleep = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
  const NS = 'http://www.w3.org/2000/svg';

  function drawCore() {
    svg.innerHTML = '';
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'node core');
    g.innerHTML = `<rect x="160" y="142" width="80" height="36" rx="18"/><text x="200" y="160">AGENT ✳</text>`;
    svg.appendChild(g);
  }
  function addNode(i, label, total) {
    const ang = -Math.PI / 2 + (i / total) * Math.PI * 2;
    const x = 200 + Math.cos(ang) * 145, y = 160 + Math.sin(ang) * 118;
    const id = 'e' + i + '_' + runId;
    const path = document.createElementNS(NS, 'path');
    const cx = 200 + Math.cos(ang + 0.5) * 60, cy = 160 + Math.sin(ang + 0.5) * 60;
    path.setAttribute('d', `M200 160 Q${cx} ${cy} ${x} ${y}`);
    path.setAttribute('class', 'edge'); path.setAttribute('id', id);
    svg.insertBefore(path, svg.firstChild);
    const len = path.getTotalLength();
    path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
    path.style.transition = 'stroke-dashoffset .8s cubic-bezier(.16,1,.3,1)';
    requestAnimationFrame(() => { path.style.strokeDashoffset = 0; });
    setTimeout(() => { path.style.transition = ''; path.style.strokeDasharray = ''; path.style.strokeDashoffset = ''; }, 850);

    const w = Math.max(64, label.length * 6.2 + 26);
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'node');
    g.innerHTML = `<rect x="${x - w / 2}" y="${y - 14}" width="${w}" height="28" rx="8"/><circle class="pip" cx="${x - w / 2 + 10}" cy="${y}" r="2.5"/><text x="${x + 5}" y="${y + .5}">${label}</text>`;
    svg.appendChild(g);
    const pk = document.createElementNS(NS, 'circle');
    pk.setAttribute('r', '2.6'); pk.setAttribute('class', 'packet');
    pk.innerHTML = `<animateMotion dur="${1.6 + Math.random()}s" repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;.5;1" calcMode="linear"><mpath href="#${id}"/></animateMotion>`;
    svg.appendChild(pk);
  }
  function line(cls, text) {
    const p = document.createElement('p'); p.className = cls; p.textContent = text;
    log.appendChild(p); log.scrollTop = log.scrollHeight; return p;
  }
  async function typeLine(cls, text, id) {
    const p = line(cls + ' cursor-blink', '');
    for (let i = 0; i <= text.length; i += 2) {
      if (id !== runId) return;
      p.textContent = text.slice(0, i); log.scrollTop = log.scrollHeight;
      await sleep(14);
    }
    p.textContent = text; p.classList.remove('cursor-blink');
  }

  async function runAgent(key, customText) {
    const id = ++runId;
    const s = SCN[key];
    consoleEl.classList.add('is-running'); consoleEl.classList.remove('is-done');
    state.lastChild.textContent = 'RAISONNEMENT…';
    log.innerHTML = '';
    empty.style.opacity = 0;
    drawCore();
    $('#kSteps').textContent = '0'; $('#kTools').textContent = '0'; $('#kTime').textContent = '…';
    line('t-user', customText || s.ask);
    await sleep(500);
    let nSteps = 0, nTools = 0;
    for (const [type, text, nodeIdx] of s.steps) {
      if (id !== runId) return;
      if (type === 'out') {
        await sleep(400);
        state.lastChild.textContent = 'RÉDACTION…';
        await typeLine('t-out', text, id);
        continue;
      }
      if (type === 'tool') {
        const p = line('t-tool', text + ' …');
        await sleep(520);
        if (id !== runId) return;
        p.textContent = text + ' ✓';
        nTools++;
        if (nodeIdx !== undefined) addNode(nodeIdx, s.nodes[nodeIdx], s.nodes.length);
      } else {
        await typeLine('t-' + type, text, id);
        await sleep(type === 'think' ? 260 : 140);
      }
      if (id !== runId) return;
      nSteps++;
      $('#kSteps').textContent = nSteps; $('#kTools').textContent = nTools;
    }
    if (id !== runId) return;
    $('#kTime').textContent = s.time;
    consoleEl.classList.remove('is-running'); consoleEl.classList.add('is-done');
    state.lastChild.textContent = 'SOLUTION PRÊTE';
    const cta = document.createElement('p');
    cta.className = 't-ok';
    cta.innerHTML = 'Prêt à le construire pour de vrai ? <a href="#contact" style="text-decoration:underline">Parlons-en →</a>';
    log.appendChild(cta); log.scrollTop = log.scrollHeight;
    cta.querySelector('a').addEventListener('click', (e) => { e.preventDefault(); lenis ? lenis.scrollTo('#contact') : $('#contact').scrollIntoView({ behavior: 'smooth' }); });
  }

  $$('.chip').forEach((c) => c.addEventListener('click', () => {
    $$('.chip').forEach((x) => x.classList.remove('is-active')); c.classList.add('is-active');
    input.value = '';
    runAgent(c.dataset.scn);
  }));
  const submit = () => {
    const v = input.value.trim();
    if (!v) { input.focus(); input.placeholder = 'Décrivez votre besoin en une phrase…'; return; }
    $$('.chip').forEach((x) => x.classList.remove('is-active'));
    runAgent(pickScenario(v), v);
  };
  $('#agentRun').addEventListener('click', submit);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });

  // auto-run first scenario the first time the console scrolls into view
  const autoIO = new IntersectionObserver(([en]) => {
    if (en.isIntersecting && runId === 0) { $('.chip[data-scn="support"]').classList.add('is-active'); runAgent('support'); autoIO.disconnect(); }
  }, { threshold: 0.45 });
  autoIO.observe(consoleEl);
})();
