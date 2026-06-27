'use strict';

/* Detect touch/mobile once */
const isMobile = () => window.matchMedia('(max-width: 600px)').matches || ('ontouchstart' in window);

document.addEventListener('DOMContentLoaded', () => {
  initAmbientBg();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initVideoGrid();
  initFeatureList();
  if (!isMobile()) initServiceTilt();
});

/* ── Navbar scroll state ── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── Mobile menu ── */
function initMobileMenu() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  const close = () => {
    btn.classList.remove('active');
    menu.classList.remove('open');
  };

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('active');
    menu.classList.toggle('open', open);
  });

  menu.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', close));
  document.addEventListener('click', e => {
    if (menu.classList.contains('open') && !btn.contains(e.target) && !menu.contains(e.target)) close();
  });
}

/* ── Smooth scroll ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    });
  });
}

/* ── Scroll reveal ── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.07 });
  els.forEach(el => obs.observe(el));
}

/* ── Video grid: viewport-aware autoplay + play/pause click + mute/unmute ── */
function initVideoGrid() {

  /* SVG icons */
  const ICON_MUTED = `<svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
  const ICON_SOUND = `<svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;

  /* Registry of all video entries */
  const cards = [];

  /* ── Smooth volume fade ── */
  function fadeVol(video, targetVol, duration, onDone) {
    if (video._fadeRaf) { cancelAnimationFrame(video._fadeRaf); video._fadeRaf = null; }
    const startVol = video.muted ? 0 : video.volume;
    if (targetVol > 0 && video.muted) { video.muted = false; video.volume = 0; }
    const startTime = performance.now();
    function step(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      video.volume = startVol + (targetVol - startVol) * ease;
      if (t < 1) {
        video._fadeRaf = requestAnimationFrame(step);
      } else {
        video.volume = targetVol;
        video._fadeRaf = null;
        if (targetVol === 0) video.muted = true;
        if (onDone) onDone();
      }
    }
    video._fadeRaf = requestAnimationFrame(step);
  }

  /* ── Shared focus/restore logic ── */
  function applyFocus(focusedVideo) {
    cards.forEach(({ video: v }) => {
      if (v === focusedVideo) {
        if (v.paused) v.play().catch(() => { });
        fadeVol(v, 1, 300);
      } else {
        const audible = !v.muted && v.volume > 0.01;
        if (audible) {
          fadeVol(v, 0, 240, () => { if (!v.paused) v.pause(); });
        } else {
          v.muted = true;
          if (!v.paused) v.pause();
        }
      }
    });
  }

  function restoreAll() {
    cards.forEach(({ video: v, inViewport }) => {
      fadeVol(v, 0, 380);
      /* Only resume if actually visible in viewport */
      if (inViewport && v.paused) v.play().catch(() => { });
    });
  }

  /* ════════════════════════════════════════════════════════════
     VIEWPORT OBSERVER
     Each .vwrap is observed. When ≥30% of it enters the
     viewport the video plays; when it leaves it pauses.
     This is the core performance fix — works on all devices.
     ════════════════════════════════════════════════════════════ */
  const viewportObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const wrap = entry.target;
      const video = wrap.querySelector('video');
      if (!video) return;

      /* Find this card's entry in our registry and update flag */
      const cardEntry = cards.find(c => c.wrap === wrap);

      if (entry.isIntersecting) {
        /* Entering viewport */
        if (cardEntry) cardEntry.inViewport = true;
        /* Only autoplay if video hasn't been manually paused by user click */
        if (!video._userPaused) {
          video.play().catch(() => { });
        }
      } else {
        /* Leaving viewport */
        if (cardEntry) cardEntry.inViewport = false;
        /* Always pause when out of view, regardless of manual state */
        if (!video.paused) video.pause();
      }
    });
  }, {
    /* Video must be at least 30% visible to start playing.
       This prevents videos just peeking at the edge from firing. */
    threshold: 0.3
  });

  /* ── Per-vwrap setup ── */
  document.querySelectorAll('.vwrap').forEach(wrap => {
    const video = wrap.querySelector('video');
    const overlay = wrap.querySelector('.voverlay');
    if (!video) return;

    /* Initial state: muted, paused — viewport observer will start them */
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video._userPaused = false; /* tracks deliberate user pause */

    /* Register with viewport observer */
    viewportObs.observe(wrap);

    /* Track in cards array */
    cards.push({ wrap, video, inViewport: false });

    /* Mute button */
    const btn = document.createElement('button');
    btn.className = 'mute-btn';
    btn.setAttribute('aria-label', 'Toggle mute');
    btn.innerHTML = ICON_MUTED;
    wrap.appendChild(btn);

    btn.addEventListener('click', e => {
      e.stopPropagation();
      video.muted = !video.muted;
      btn.innerHTML = video.muted ? ICON_MUTED : ICON_SOUND;
      btn.classList.toggle('unmuted', !video.muted);
    });

    video.addEventListener('volumechange', () => {
      const muted = video.muted || video.volume === 0;
      btn.innerHTML = muted ? ICON_MUTED : ICON_SOUND;
      btn.classList.toggle('unmuted', !muted);
    });

    /* Play / pause on wrap click */
    if (!overlay) return;
    wrap.addEventListener('click', () => {
      if (video.paused) {
        video._userPaused = false;
        video.play().catch(() => { });
        overlay.style.opacity = '0';
      } else {
        video._userPaused = true; /* mark deliberate pause so viewport won't re-start it */
        video.pause();
        overlay.style.opacity = '1';
      }
    });

    video.addEventListener('pause', () => { overlay.style.opacity = '1'; });
    video.addEventListener('play', () => { overlay.style.opacity = '0'; });
  });

  /* ══════════════════════════════════════════════════════════
     DESKTOP — mouseenter / mouseleave (hover-to-unmute)
     ══════════════════════════════════════════════════════════ */
  let leaveTimer = null;

  document.querySelectorAll('.vcard').forEach(card => {
    const wrap = card.querySelector('.vwrap');
    const video = wrap && wrap.querySelector('video');
    if (!video) return;

    card.addEventListener('mouseenter', () => {
      if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
      /* Only unmute/focus if the video is actually in viewport */
      const entry = cards.find(c => c.video === video);
      if (entry && entry.inViewport) applyFocus(video);
    });

    card.addEventListener('mouseleave', () => {
      leaveTimer = setTimeout(() => { leaveTimer = null; restoreAll(); }, 80);
    });
  });

  /* ══════════════════════════════════════════════════════════
     MOBILE — touch tap focus
     ══════════════════════════════════════════════════════════ */
  let touchActiveVideo = null;

  document.querySelectorAll('.vcard').forEach(card => {
    const wrap = card.querySelector('.vwrap');
    const video = wrap && wrap.querySelector('video');
    if (!video) return;

    let startX = 0, startY = 0, didScroll = false;

    card.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      didScroll = false;
    }, { passive: true });

    card.addEventListener('touchmove', e => {
      if (Math.abs(e.touches[0].clientX - startX) > 8 ||
        Math.abs(e.touches[0].clientY - startY) > 8) {
        didScroll = true;
      }
    }, { passive: true });

    card.addEventListener('touchend', e => {
      if (didScroll) return;
      if (touchActiveVideo === video) return;

      e.preventDefault();
      touchActiveVideo = video;
      const entry = cards.find(c => c.video === video);
      if (entry && entry.inViewport) applyFocus(video);
    }, { passive: false });
  });

  /* Tap anywhere outside a card → restore all */
  document.addEventListener('touchstart', e => {
    if (!touchActiveVideo) return;
    if (!e.target.closest || !e.target.closest('.vcard')) {
      touchActiveVideo = null;
      restoreAll();
    }
  }, { passive: true });
}

/* ── Feature list accordion ── */
function initFeatureList() {
  document.querySelectorAll('.feature-item').forEach(item => {
    const row = item.querySelector('.feature-row');
    const expand = item.querySelector('.feature-expand');
    if (!row || !expand) return;

    if (!expand.querySelector('.feature-expand-inner')) {
      const inner = document.createElement('div');
      inner.className = 'feature-expand-inner';
      while (expand.firstChild) inner.appendChild(expand.firstChild);
      expand.appendChild(inner);
    }

    row.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.feature-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

/* ── Service cards 3D tilt ── */
function initServiceTilt() {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      card.style.transition = 'transform 0.1s linear, box-shadow 0.3s';
      card.style.transform = `translateY(-8px) rotateX(${-dy * 7}deg) rotateY(${dx * 7}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s, border-color 0.3s';
      card.style.transform = '';
    });
  });
}

/* ── Ambient Background — particles + parallax orbs ── */
function initAmbientBg() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const PARTICLE_COUNT = 80;
  const particles = [];

  function randBetween(a, b) { return a + Math.random() * (b - a); }

  function createParticle(fromBottom) {
    return {
      x: randBetween(0, canvas.width),
      y: fromBottom ? canvas.height + randBetween(0, 40) : randBetween(0, canvas.height),
      r: randBetween(1.0, 2.8),
      speed: randBetween(0.18, 0.55),
      opacity: 0,
      maxOp: randBetween(0.18, 0.42),
      phase: randBetween(0, Math.PI * 2),
      driftAmp: randBetween(0.15, 0.5),
      life: 0,
      maxLife: randBetween(200, 480),
    };
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = createParticle(false);
    p.life = Math.floor(Math.random() * p.maxLife);
    particles.push(p);
  }

  function tickParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = performance.now() * 0.001;

    particles.forEach((p, i) => {
      p.life++;
      const half = p.maxLife / 2;
      p.opacity = p.life < half
        ? (p.life / half) * p.maxOp
        : ((p.maxLife - p.life) / half) * p.maxOp;
      p.y -= p.speed;
      p.x += Math.sin(now * 0.4 + p.phase) * p.driftAmp;
      if (p.life >= p.maxLife || p.y < -10) particles[i] = createParticle(true);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.maxOp > 0.28
        ? `rgba(44,255,122,${p.opacity})`
        : `rgba(180,255,210,${p.opacity})`;
      ctx.fill();
    });
  }

  const orbs = [
    { el: document.querySelector('.bg-orb-1'), fx: 0.04, fy: 0.025 },
    { el: document.querySelector('.bg-orb-2'), fx: -0.05, fy: 0.03 },
    { el: document.querySelector('.bg-orb-3'), fx: 0.03, fy: -0.04 },
  ].filter(o => o.el);

  let targetX = [0, 0, 0], targetY = [0, 0, 0];
  let currentX = [0, 0, 0], currentY = [0, 0, 0];

  window.addEventListener('mousemove', e => {
    const mx = e.clientX - window.innerWidth / 2;
    const my = e.clientY - window.innerHeight / 2;
    orbs.forEach((o, i) => { targetX[i] = mx * o.fx; targetY[i] = my * o.fy; });
  }, { passive: true });

  function loop() {
    tickParticles();
    orbs.forEach((o, i) => {
      currentX[i] += (targetX[i] - currentX[i]) * 0.05;
      currentY[i] += (targetY[i] - currentY[i]) * 0.05;
      o.el.style.transform = `translate(${currentX[i].toFixed(2)}px, ${currentY[i].toFixed(2)}px)`;
    });
    requestAnimationFrame(loop);
  }
  loop();
}
