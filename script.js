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

/* ── Video grid: autoplay loop + play/pause click + mute/unmute button ── */
function initVideoGrid() {

  /* SVG icons */
  const ICON_MUTED = `<svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
  const ICON_SOUND = `<svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;

  document.querySelectorAll('.vwrap').forEach(wrap => {
    const video = wrap.querySelector('video');
    const overlay = wrap.querySelector('.voverlay');
    if (!video) return;

    /* Ensure starts muted */
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.play().catch(() => { });

    /* --- Inject mute button --- */
    const btn = document.createElement('button');
    btn.className = 'mute-btn';
    btn.setAttribute('aria-label', 'Toggle mute');
    btn.innerHTML = ICON_MUTED;   /* starts muted */
    wrap.appendChild(btn);

    /* Toggle mute on button click (stop event reaching vwrap) */
    btn.addEventListener('click', e => {
      e.stopPropagation();
      video.muted = !video.muted;
      btn.innerHTML = video.muted ? ICON_MUTED : ICON_SOUND;
      btn.classList.toggle('unmuted', !video.muted);
    });

    /* Sync button if video.muted changes externally */
    video.addEventListener('volumechange', () => {
      const muted = video.muted || video.volume === 0;
      btn.innerHTML = muted ? ICON_MUTED : ICON_SOUND;
      btn.classList.toggle('unmuted', !muted);
    });

    /* --- Play / pause on wrap click (not on the mute button) --- */
    if (!overlay) return;
    wrap.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        overlay.style.opacity = '0';
      } else {
        video.pause();
        overlay.style.opacity = '1';
      }
    });

    video.addEventListener('pause', () => { overlay.style.opacity = '1'; });
    video.addEventListener('play', () => { overlay.style.opacity = '0'; });
  });
}

/* ── Feature list accordion ── */
function initFeatureList() {
  document.querySelectorAll('.feature-item').forEach(item => {
    const row = item.querySelector('.feature-row');
    const expand = item.querySelector('.feature-expand');
    if (!row || !expand) return;

    /* Wrap expand content in inner div if not already — needed for grid trick */
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

  /* --- Particle canvas --- */
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Fixed canvas: use window dimensions, not offsetWidth (which is 0 at init)
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const PARTICLE_COUNT = 80;
  const particles = [];

  function randBetween(a, b) { return a + Math.random() * (b - a); }

  function createParticle(fromBottom) {
    return {
      x:        randBetween(0, canvas.width),
      y:        fromBottom ? canvas.height + randBetween(0, 40) : randBetween(0, canvas.height),
      r:        randBetween(1.0, 2.8),
      speed:    randBetween(0.18, 0.55),
      opacity:  0,
      maxOp:    randBetween(0.18, 0.42),
      phase:    randBetween(0, Math.PI * 2),
      driftAmp: randBetween(0.15, 0.5),
      life:     0,
      maxLife:  randBetween(200, 480),
    };
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = createParticle(false);
    p.life = Math.floor(Math.random() * p.maxLife); // stagger starts
    particles.push(p);
  }

  function tickParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = performance.now() * 0.001;

    particles.forEach((p, i) => {
      p.life++;

      // Smooth fade in / out
      const half = p.maxLife / 2;
      p.opacity = p.life < half
        ? (p.life / half) * p.maxOp
        : ((p.maxLife - p.life) / half) * p.maxOp;

      // Drift upward + sine sway
      p.y -= p.speed;
      p.x += Math.sin(now * 0.4 + p.phase) * p.driftAmp;

      // Respawn at bottom when done
      if (p.life >= p.maxLife || p.y < -10) {
        particles[i] = createParticle(true);
      }

      // Draw — 70% green, 30% soft white
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.maxOp > 0.28
        ? `rgba(44,255,122,${p.opacity})`
        : `rgba(180,255,210,${p.opacity})`;
      ctx.fill();
    });
  }

  /* --- Parallax orbs on mouse move --- */
  const orbs = [
    { el: document.querySelector('.bg-orb-1'), fx: 0.04,  fy: 0.025 },
    { el: document.querySelector('.bg-orb-2'), fx: -0.05, fy: 0.03  },
    { el: document.querySelector('.bg-orb-3'), fx: 0.03,  fy: -0.04 },
  ].filter(o => o.el);

  let targetX = [0,0,0], targetY = [0,0,0];
  let currentX = [0,0,0], currentY = [0,0,0];

  window.addEventListener('mousemove', e => {
    const mx = e.clientX - window.innerWidth  / 2;
    const my = e.clientY - window.innerHeight / 2;
    orbs.forEach((o, i) => {
      targetX[i] = mx * o.fx;
      targetY[i] = my * o.fy;
    });
  }, { passive: true });

  /* --- Unified rAF loop --- */
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
