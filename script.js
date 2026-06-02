'use strict';

/* Detect touch/mobile once */
const isMobile = () => window.matchMedia('(max-width: 600px)').matches || ('ontouchstart' in window);

document.addEventListener('DOMContentLoaded', () => {
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
  const btn  = document.getElementById('hamburger');
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
    const video   = wrap.querySelector('video');
    const overlay = wrap.querySelector('.voverlay');
    if (!video) return;

    /* Ensure starts muted */
    video.muted = true;
    video.loop  = true;
    video.playsInline = true;
    video.play().catch(() => {});

    /* --- Inject mute button --- */
    const btn = document.createElement('button');
    btn.className   = 'mute-btn';
    btn.setAttribute('aria-label', 'Toggle mute');
    btn.innerHTML   = ICON_MUTED;   /* starts muted */
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
    video.addEventListener('play',  () => { overlay.style.opacity = '0'; });
  });
}

/* ── Feature list accordion ── */
function initFeatureList() {
  document.querySelectorAll('.feature-item').forEach(item => {
    const row    = item.querySelector('.feature-row');
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
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
      const dy = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
      card.style.transition = 'transform 0.1s linear, box-shadow 0.3s';
      card.style.transform  = `translateY(-8px) rotateX(${-dy * 7}deg) rotateY(${dx * 7}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s, border-color 0.3s';
      card.style.transform  = '';
    });
  });
}
