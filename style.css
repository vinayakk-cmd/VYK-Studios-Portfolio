
:root {
  --black:        #000000;
  --black-soft:   #0a0a0a;
  --black-card:   #111111;
  --black-lift:   #1a1a1a;
  --white:        #ffffff;
  --white-off:    #f0f0f0;
  --grey-1:       #888888;
  --grey-2:       #555555;
  --grey-3:       #2a2a2a;
  --green:        #2cff7a;
  --green-dim:    rgba(44,255,122,0.12);
  --green-glow:   rgba(44,255,122,0.25);
  --gold:         #c8a96e;
  --gold-dim:     rgba(200,169,110,0.12);

  --font-sans:    'Inter', sans-serif;
  --font-serif:   'Cormorant Garamond', Georgia, serif;

  --r-sm:   10px;
  --r-md:   16px;
  --r-lg:   24px;
  --r-xl:   32px;
  --r-full: 999px;

  --ease-out:   cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-spring:cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ——————————————————————————————————————————
   2. RESET
   —————————————————————————————————————————— */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  background: var(--black);
  color: var(--white);
  font-family: var(--font-sans);
  font-weight: 300;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
a { color: inherit; text-decoration: none; }
img, video { display: block; max-width: 100%; }
ul { list-style: none; }
button { background: none; border: none; font-family: inherit; cursor: pointer; }

/* ——————————————————————————————————————————
   3. LAYOUT
   —————————————————————————————————————————— */
.container {
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
}
section { padding: 80px 0; }

/* ——————————————————————————————————————————
   4. (scroll progress bar removed)
   —————————————————————————————————————————— */

/* ——————————————————————————————————————————
   5. NAVIGATION
   —————————————————————————————————————————— */
.navbar {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  z-index: 1000;
  padding: 20px 0;
  transition: background 0.3s, padding 0.3s, backdrop-filter 0.3s;
}
.navbar.scrolled {
  background: rgba(0,0,0,0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding: 12px 0;
}
.nav-inner {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo {
  font-family: var(--font-sans);
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--white);
}
.nav-logo span { color: var(--green); }

.nav-links {
  display: flex;
  gap: 40px;
  align-items: center;
}
.nav-links a {
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--grey-1);
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--white); }

.nav-cta {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--black);
  background: var(--white);
  padding: 8px 20px;
  border-radius: var(--r-full);
  transition: background 0.2s, transform 0.2s;
}
.nav-cta:hover { background: var(--green); transform: translateY(-1px); }

.hamburger { display: none; flex-direction: column; gap: 5px; padding: 4px; }
.hamburger span {
  display: block; width: 22px; height: 1.5px;
  background: var(--white);
  transition: transform 0.3s, opacity 0.2s;
}
.hamburger.active span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

.mobile-menu {
  display: none;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s var(--ease-out);
  background: rgba(0,0,0,0.98);
  border-top: 1px solid rgba(255,255,255,0.06);
}
.mobile-menu.open { max-height: 280px; }
.mobile-menu ul { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
.mobile-menu a {
  font-size: 1rem; font-weight: 300;
  color: var(--grey-1);
  transition: color 0.2s;
}
.mobile-menu a:hover { color: var(--green); }

/* ——————————————————————————————————————————
   6. HERO
   —————————————————————————————————————————— */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 140px 24px 80px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(44,255,122,0.06) 0%, transparent 70%);
  pointer-events: none;
}

.hero-inner { position: relative; z-index: 2; max-width: 780px; margin: 0 auto; }

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(44,255,122,0.08);
  border: 1px solid rgba(44,255,122,0.2);
  color: var(--green);
  padding: 6px 16px;
  border-radius: var(--r-full);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 32px;
}
.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--green);
  animation: blink 2s ease-in-out infinite;
}
@keyframes blink {
  0%,100% { opacity:1; } 50% { opacity:0.3; }
}

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 300;
  line-height: 1.08;
  color: var(--white);
  margin-bottom: 24px;
}
.hero-title em { font-style: italic; color: var(--green); }
.hero-highlight {
  display: inline-block;
  position: relative;
}
.hero-highlight::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 100%; height: 1px;
  background: linear-gradient(90deg, var(--green), transparent);
}

.hero-sub {
  font-size: 1rem;
  font-weight: 300;
  color: var(--grey-1);
  max-width: 500px;
  margin: 0 auto 40px;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--white);
  color: var(--black);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 14px 28px;
  border-radius: var(--r-full);
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.btn-primary:hover {
  background: var(--green);
  transform: translateY(-2px);
  box-shadow: 0 0 30px var(--green-glow);
}
.btn-primary svg { transition: transform 0.2s var(--ease-spring); }
.btn-primary:hover svg { transform: translateX(4px); }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--grey-1);
  font-size: 0.82rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 14px 28px;
  border-radius: var(--r-full);
  border: 1px solid rgba(255,255,255,0.12);
  transition: border-color 0.2s, color 0.2s, transform 0.2s;
}
.btn-ghost:hover {
  border-color: rgba(44,255,122,0.4);
  color: var(--green);
  transform: translateY(-2px);
}

.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 32px;
}
.stat-item strong {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 600;
  color: var(--white);
  line-height: 1;
}
.stat-item span {
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--grey-2);
  margin-top: 4px;
}
.stat-divider {
  width: 1px;
  height: 36px;
  background: rgba(255,255,255,0.1);
}

/* ——————————————————————————————————————————
   7. SECTION HEADERS
   —————————————————————————————————————————— */
.section-header { text-align: center; margin-bottom: 56px; }
.section-eyebrow {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 12px;
}
.section-title {
  font-family: var(--font-serif);
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 300;
  color: var(--white);
  line-height: 1.1;
  margin-bottom: 14px;
}
.section-desc {
  font-size: 0.95rem;
  font-weight: 300;
  color: var(--grey-1);
  max-width: 500px;
  margin: 0 auto;
}

/* ——————————————————————————————————————————
   8. PORTFOLIO BLOCKS
   —————————————————————————————————————————— */
.portfolio { padding: 80px 0; }

.port-block {
  background: var(--black-card);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--r-xl);
  padding: 40px 36px;
  margin-bottom: 24px;
}
.port-block-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
}
.block-label { display: flex; align-items: center; gap: 12px; }
.block-icon { font-size: 1.4rem; line-height: 1; }
.block-label h3 {
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--white);
}
.block-desc {
  font-size: 0.85rem;
  font-weight: 300;
  color: var(--grey-1);
  max-width: 280px;
  text-align: right;
}

/* ——————————————————————————————————————————
   9. VIDEO GRIDS
   —————————————————————————————————————————— */

/* 2×2 grid — Motion Graphics */
.vgrid-2x2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

/* 2-col landscape — Popular Edits */
.vgrid-2col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(285px, 1fr));
  gap: 12px;
}

/* Vertical grid — Short Form */
.vgrid-vertical {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(185px, 340px));
  gap: 12px;
  justify-content: center;
}

/* ——————————————————————————————————————————
   10. VIDEO CARD
   —————————————————————————————————————————— */
.vcard {
  background: var(--black-lift);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--r-md);
  overflow: hidden;
  transition: transform 0.4s var(--ease-spring), box-shadow 0.4s, opacity 0.35s, filter 0.35s;
}

/* Hover-blur: when grid is hovered and this card is NOT hovered */
.vgrid-2x2:hover .vcard:not(:hover),
.vgrid-2col:hover .vcard:not(:hover),
.vgrid-vertical:hover .vcard:not(:hover) {
  opacity: 0.4;
  filter: blur(2px);
}

/* Hovered card lifts */
.vcard:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0,0,0,0.7);
  opacity: 1 !important;
  filter: none !important;
}

/* Video wrap — landscape */
.vwrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #050505;
  overflow: hidden;
  cursor: pointer;
}

/* Video wrap — vertical */
.vwrap-vertical {
  aspect-ratio: 9 / 16;
}

.vwrap video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s;
}

/* Overlay (play button + label) */
.voverlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.25);
  opacity: 1;
  transition: opacity 0.3s;
}
.vcard:hover .voverlay { opacity: 0; }

/* In-frame label (bottom-left, ref-style) */
.vlabel {
  position: absolute;
  bottom: 12px;
  left: 14px;
  font-size: 0.78rem;
  font-weight: 300;
  color: rgba(255,255,255,0.7);
  letter-spacing: 0.04em;
  pointer-events: none;
  z-index: 2;
}

.play-btn {
  width: 48px; height: 48px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--white);
  transition: background 0.2s, transform 0.2s;
}
.vcard:hover .play-btn {
  background: rgba(44,255,122,0.15);
  border-color: var(--green);
  color: var(--green);
  transform: scale(1.1);
}

/* Mute / unmute button — bottom-right corner */
.mute-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* hidden by default, shown on vcard hover */
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.22s ease, transform 0.22s var(--ease-spring),
              background 0.2s, border-color 0.2s;
  pointer-events: none;
}

/* Reveal on card hover */
.vcard:hover .mute-btn {
  opacity: 1;
  transform: scale(1);
  pointer-events: all;
}

/* Green tint when unmuted */
.mute-btn.unmuted {
  background: rgba(44,255,122,0.15);
  border-color: rgba(44,255,122,0.45);
}

.mute-btn svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: var(--white);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex-shrink: 0;
  transition: stroke 0.2s;
}
.mute-btn.unmuted svg { stroke: var(--green); }

/* Video meta row */
.vmeta {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.vtitle {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--white-off);
}
.vtag {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--green);
  background: var(--green-dim);
  border: 1px solid rgba(44,255,122,0.2);
  padding: 4px 10px;
  border-radius: var(--r-full);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ——————————————————————————————————————————
   11. FEATURE BLOCK — separate card below video grid
   —————————————————————————————————————————— */

/* Section wrapper keeps it same width as everything else */
.why-section { padding: 0 0 80px; }

.feature-block {
  background: var(--black-card);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--r-xl);
  padding: 40px 36px;
}

.feature-block-header { margin-bottom: 32px; }

.feature-block-title {
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--white);
  margin-top: 8px;
}

/* List container */
.feature-list {
  display: flex;
  flex-direction: column;
}

/* Each accordion item */
.feature-item {
  border-bottom: 1px solid rgba(255,255,255,0.06);
  cursor: pointer;
  overflow: hidden;
}
.feature-item:first-child { border-top: 1px solid rgba(255,255,255,0.06); }

/* The clickable row */
.feature-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 22px 6px;
  transition: padding-left 0.35s var(--ease-spring);
  user-select: none;
}
.feature-item:hover .feature-row  { padding-left: 10px; }
.feature-item.active .feature-row { padding-left: 10px; }

/* Dot */
.feature-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--grey-2);
  flex-shrink: 0;
  transition: background 0.35s ease, box-shadow 0.35s ease, transform 0.35s var(--ease-spring);
}
.feature-item.active .feature-dot,
.feature-item:hover .feature-dot {
  background: var(--green);
  box-shadow: 0 0 14px var(--green-glow);
  transform: scale(1.4);
}

/* Label */
.feature-text {
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--grey-1);
  flex: 1;
  transition: color 0.35s ease;
}
.feature-item.active .feature-text,
.feature-item:hover .feature-text {
  color: var(--white);
  font-weight: 600;
}

/* +/× icon */
.feature-arrow {
  font-size: 1.5rem;
  font-weight: 200;
  color: var(--grey-2);
  line-height: 1;
  flex-shrink: 0;
  width: 24px;
  text-align: center;
  transition: color 0.35s ease, transform 0.4s var(--ease-spring);
}
.feature-item.active .feature-arrow {
  color: var(--green);
  transform: rotate(45deg);
}

/* Expand panel — smooth height animation */
.feature-expand {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.45s var(--ease-out);
}
.feature-item.active .feature-expand {
  grid-template-rows: 1fr;
}
.feature-expand-inner {
  overflow: hidden;
}
.feature-expand p {
  font-size: 0.9rem;
  font-weight: 300;
  color: var(--grey-1);
  line-height: 1.85;
  padding: 0 6px 22px 26px;
}

/* ——————————————————————————————————————————
   12. ABOUT
   —————————————————————————————————————————— */
.about { padding: 80px 0; }
.about-grid {
  background: var(--black-card);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--r-xl);
  padding: 56px 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}
.about-text { display: flex; flex-direction: column; gap: 20px; }
.about-name {
  font-family: var(--font-serif);
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  font-weight: 300;
  line-height: 1.1;
  color: var(--white);
}
.about-name em { font-style: italic; color: var(--green); }
.about-para {
  font-size: 0.92rem;
  font-weight: 300;
  color: var(--grey-1);
  line-height: 1.85;
}

.tools-row { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
.tool-badge {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--black-lift);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--r-sm);
  padding: 14px 18px;
  transition: border-color 0.2s, transform 0.2s;
}
.tool-badge:hover {
  border-color: rgba(44,255,122,0.3);
  transform: translateX(4px);
}
.tool-icon { font-size: 1rem; color: var(--green); flex-shrink: 0; }
.tool-badge div { display: flex; flex-direction: column; gap: 2px; }
.tool-badge strong { font-size: 0.88rem; font-weight: 500; color: var(--white); }
.tool-badge span { font-size: 0.68rem; font-weight: 300; letter-spacing: 0.1em; color: var(--grey-2); text-transform: uppercase; }

.about-visual { display: flex; justify-content: center; }
.about-img-card { position: relative; width: 300px; height: 360px; }
.about-img-placeholder {
  width: 100%; height: 100%;
  border-radius: var(--r-xl);
  background: var(--black-lift);
  border: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
}
.about-img-placeholder img { width: 100%; height: 100%; object-fit: cover; }

.exp-pill {
  position: absolute;
  top: -20px; right: -20px;
  background: var(--green);
  color: var(--black);
  border-radius: var(--r-md);
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  box-shadow: 0 8px 24px var(--green-glow);
}
.exp-pill strong { font-family: var(--font-serif); font-size: 1.8rem; font-weight: 700; line-height: 1; }
.exp-pill span { font-size: 0.62rem; font-weight: 500; text-align: center; line-height: 1.3; opacity: 0.8; }

.proj-pill {
  position: absolute;
  bottom: -14px; left: -20px;
  background: var(--black-lift);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--r-md);
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}
.proj-pill strong { font-family: var(--font-serif); font-size: 1.5rem; font-weight: 600; color: var(--green); line-height: 1; }
.proj-pill span { font-size: 0.6rem; font-weight: 300; letter-spacing: 0.1em; text-transform: uppercase; color: var(--grey-2); text-align: center; line-height: 1.3; }

/* ——————————————————————————————————————————
   13. SERVICES
   —————————————————————————————————————————— */
.services { padding: 80px 0; }
.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.service-card {
  background: var(--black-card);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--r-lg);
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.3s var(--ease-spring), box-shadow 0.3s, border-color 0.3s;
}
.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  border-color: rgba(44,255,122,0.2);
}
.service-icon-wrap {
  width: 44px; height: 44px;
  border-radius: var(--r-sm);
  background: var(--green-dim);
  border: 1px solid rgba(44,255,122,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; color: var(--green);
}
.service-card h3 { font-family: var(--font-serif); font-size: 1.4rem; font-weight: 400; color: var(--white); }
.service-card p { font-size: 0.85rem; font-weight: 300; color: var(--grey-1); line-height: 1.8; flex: 1; }
.service-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; }
.service-tags span {
  font-size: 0.65rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--grey-2);
  background: var(--black-lift);
  border: 1px solid rgba(255,255,255,0.06);
  padding: 4px 10px;
  border-radius: var(--r-full);
}

/* ——————————————————————————————————————————
   14. CTA / CONTACT
   —————————————————————————————————————————— */
.cta-section { padding: 80px 0; }
.cta-card {
  position: relative;
  overflow: hidden;
  background: var(--black-card);
  border: 1px solid rgba(44,255,122,0.1);
  border-radius: var(--r-xl);
  padding: 80px 48px;
  text-align: center;
}
.cta-glow {
  position: absolute;
  width: 500px; height: 500px;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  background: radial-gradient(circle, rgba(44,255,122,0.06) 0%, transparent 60%);
  pointer-events: none;
}
.cta-title {
  font-family: var(--font-serif);
  font-size: clamp(2.2rem, 5.5vw, 4rem);
  font-weight: 300;
  color: var(--white);
  line-height: 1.15;
  margin-bottom: 20px;
  position: relative; z-index: 1;
}
.cta-title em { font-style: italic; color: var(--green); }
.cta-sub {
  font-size: 0.95rem; font-weight: 300; color: var(--grey-1);
  max-width: 420px; margin: 0 auto 40px;
  line-height: 1.8; position: relative; z-index: 1;
}
.cta-actions {
  display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;
  position: relative; z-index: 1;
}
.cta-btn {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--font-sans); font-size: 0.85rem; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  padding: 14px 28px; border-radius: var(--r-full);
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}
.cta-btn-email { background: var(--white); color: var(--black); }
.cta-btn-email:hover {
  background: var(--green);
  box-shadow: 0 0 40px var(--green-glow);
  transform: translateY(-3px);
}
.cta-btn-whatsapp { background: transparent; color: var(--white); border: 1px solid rgba(255,255,255,0.12); }
.cta-btn-whatsapp:hover {
  background: rgba(37,211,102,0.08);
  border-color: rgba(37,211,102,0.35);
  color: #25d366;
  transform: translateY(-3px);
}
.cta-btn-instagram {
  background: transparent;
  color: var(--white);
  border: 1px solid rgba(255,255,255,0.12);
}
.cta-btn-instagram:hover {
  background: rgba(225,48,108,0.08);
  border-color: rgba(225,48,108,0.4);
  color: #e1306c;
  box-shadow: 0 0 30px rgba(225,48,108,0.12);
  transform: translateY(-3px);
}
.cta-btn-discord {
  background: transparent;
  color: var(--white);
  border: 1px solid rgba(255,255,255,0.12);
}
.cta-btn-discord:hover {
  background: rgba(88,101,242,0.1);
  border-color: rgba(88,101,242,0.4);
  color: #5865f2;
  box-shadow: 0 0 30px rgba(88,101,242,0.12);
  transform: translateY(-3px);
}
.cta-decoration {
  position: absolute; bottom: -20px; right: 24px;
  font-family: var(--font-serif); font-size: 8rem; font-weight: 700;
  color: var(--white); opacity: 0.02; pointer-events: none; user-select: none;
}

/* ——————————————————————————————————————————
   15. FOOTER
   —————————————————————————————————————————— */
.footer {
  padding: 32px 0;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.footer-inner {
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 20px;
}
.footer-logo { font-family: var(--font-sans); font-size: 1.1rem; font-weight: 800; color: var(--white); }
.footer-logo span { color: var(--green); }
.footer-links { display: flex; gap: 32px; }
.footer-links a {
  font-size: 0.75rem; font-weight: 300; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--grey-2); transition: color 0.2s;
}
.footer-links a:hover { color: var(--green); }
.footer-copy { font-size: 0.7rem; font-weight: 300; color: var(--grey-2); letter-spacing: 0.06em; }

/* ——————————————————————————————————————————
   16. SCROLL REVEAL
   —————————————————————————————————————————— */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
}
.reveal.visible { opacity: 1; transform: translateY(0); }

.reveal.visible .vcard:nth-child(1) { transition-delay: 0.05s; }
.reveal.visible .vcard:nth-child(2) { transition-delay: 0.12s; }
.reveal.visible .vcard:nth-child(3) { transition-delay: 0.19s; }
.reveal.visible .vcard:nth-child(4) { transition-delay: 0.26s; }

.reveal.visible .service-card:nth-child(1) { transition-delay: 0.05s; }
.reveal.visible .service-card:nth-child(2) { transition-delay: 0.12s; }
.reveal.visible .service-card:nth-child(3) { transition-delay: 0.19s; }
.reveal.visible .service-card:nth-child(4) { transition-delay: 0.26s; }

/* ——————————————————————————————————————————
   17. GRAIN OVERLAY
   —————————————————————————————————————————— */
body::after {
  content: '';
  position: fixed; inset: 0;
  pointer-events: none; z-index: 9997; opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-size: 256px 256px;
}

/* ——————————————————————————————————————————
   18. RESPONSIVE — TABLET ≤900px
   —————————————————————————————————————————— */
@media (max-width: 900px) {

  /* Grids */
  .vgrid-2x2      { grid-template-columns: 1fr 1fr; gap: 10px; }
  .vgrid-2col     { grid-template-columns: 1fr; }
  .vgrid-vertical { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }

  /* About */
  .about-grid {
    grid-template-columns: 1fr;
    gap: 48px;
    text-align: center;
  }
  .tools-row  { align-items: stretch; }
  .tool-badge { text-align: left; }
  .about-visual { justify-content: center; }

  /* Block header desc */
  .block-desc { text-align: left; max-width: none; }

  /* Services */
  .services-grid { grid-template-columns: 1fr 1fr; }

  /* Footer */
  .footer-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 24px;
  }
  .footer-links { gap: 24px; }
}

/* ——————————————————————————————————————————
   19. RESPONSIVE — MOBILE ≤600px
   —————————————————————————————————————————— */
@media (max-width: 600px) {

  /* ── Base ── */
  html { font-size: 15px; }

  .container { padding: 0 18px; }

  section { padding: 56px 0; }

  /* ── Nav ── */
  .nav-links, .nav-cta { display: none; }
  .hamburger { display: flex; }
  .mobile-menu { display: block; }
  .mobile-menu ul { padding: 28px 20px; gap: 24px; }
  .mobile-menu a { font-size: 1.1rem; }

  /* ── Hero ── */
  .hero {
    padding: 130px 20px 72px;
    min-height: 100svh;
  }
  .hero-title {
    font-size: clamp(2.6rem, 11vw, 3.8rem);
    margin-bottom: 20px;
  }
  .hero-sub {
    font-size: 0.95rem;
    margin-bottom: 32px;
  }
  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-bottom: 40px;
  }
  .btn-primary,
  .btn-ghost {
    width: 100%;
    max-width: 280px;
    justify-content: center;
    padding: 16px 28px;
    font-size: 0.85rem;
  }
  .hero-stats {
    flex-direction: row;
    justify-content: center;
    gap: 0;
    flex-wrap: nowrap;
  }
  .stat-divider { display: block; height: 28px; }
  .stat-item { padding: 0 20px; }
  .stat-item strong { font-size: 1.6rem; }
  .stat-item span { font-size: 0.6rem; }

  /* ── Section headers ── */
  .section-eyebrow { font-size: 0.65rem; margin-bottom: 10px; }
  .section-title { font-size: clamp(2rem, 9vw, 2.8rem); }
  .section-desc { font-size: 0.88rem; }
  .section-header { margin-bottom: 40px; }

  /* ── Portfolio blocks ── */
  .port-block {
    padding: 28px 20px;
    border-radius: var(--r-lg);
    margin-bottom: 16px;
  }
  .port-block-header {
    flex-direction: column;
    gap: 6px;
    margin-bottom: 20px;
  }
  .block-label h3 { font-size: 1.5rem; }
  .block-desc {
    font-size: 0.82rem;
    text-align: left;
    color: var(--grey-2);
  }

  /* ── Motion Graphics: 2×2 grid stays, videos slightly taller ── */
  .vgrid-2x2 {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .vgrid-2x2 .vwrap { aspect-ratio: 4 / 3; }

  /* ── Popular edits & short form: full width ── */
  .vgrid-2col   { grid-template-columns: 1fr; gap: 10px; }
  .vgrid-vertical {
    grid-template-columns: 1fr;
    gap: 10px;
    justify-content: unset;
  }
  .vwrap-vertical { aspect-ratio: 9 / 16; max-height: 72vw; }

  /* ── Video card ── */
  .vcard { border-radius: var(--r-md); }
  .vmeta { padding: 10px 14px; }
  .vtitle { font-size: 0.82rem; }
  .vtag   { font-size: 0.62rem; padding: 3px 8px; }
  .vlabel { font-size: 0.72rem; bottom: 10px; left: 12px; }

  /* Mute button always visible on mobile (no hover state) */
  .mute-btn {
    opacity: 1;
    transform: scale(1);
    pointer-events: all;
    width: 28px;
    height: 28px;
    bottom: 8px;
    right: 8px;
  }

  /* ── Why section ── */
  .why-section { padding: 0 0 56px; }
  .feature-block {
    padding: 28px 20px;
    border-radius: var(--r-lg);
  }
  .feature-block-header { margin-bottom: 24px; }
  .feature-block-title  { font-size: 1.5rem; }
  .feature-row  { padding: 18px 0; gap: 14px; }
  .feature-text { font-size: 1.05rem; }
  .feature-expand p { font-size: 0.86rem; padding: 0 0 18px 24px; }

  /* ── About ── */
  .about { padding: 56px 0; }
  .about-grid {
    grid-template-columns: 1fr;
    padding: 32px 20px 40px;
    gap: 40px;
    border-radius: var(--r-lg);
    text-align: center;
  }
  .about-name { font-size: clamp(2.2rem, 9vw, 3rem); }
  .about-para { font-size: 0.88rem; }
  .tools-row  { align-items: stretch; gap: 8px; }
  .tool-badge { padding: 12px 16px; }
  .tool-badge strong { font-size: 0.85rem; }

  /* Photo card — centered with breathing room for pills */
  .about-visual { padding: 20px 32px 20px; }
  .about-img-card {
    width: 100%;
    max-width: 260px;
    height: 300px;
    margin: 0 auto;
  }
  .exp-pill {
    top: -14px; right: -10px;
    padding: 10px 14px;
  }
  .exp-pill strong { font-size: 1.5rem; }
  .exp-pill span   { font-size: 0.58rem; }
  .proj-pill {
    bottom: -10px; left: -10px;
    padding: 10px 14px;
  }
  .proj-pill strong { font-size: 1.3rem; }
  .proj-pill span   { font-size: 0.58rem; }

  /* ── Services ── */
  .services { padding: 56px 0; }
  .services-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .service-card {
    padding: 24px 20px;
    border-radius: var(--r-lg);
    gap: 10px;
  }
  .service-card h3 { font-size: 1.25rem; }
  .service-card p  { font-size: 0.84rem; }

  /* ── CTA ── */
  .cta-section { padding: 56px 0; }
  .cta-card {
    padding: 48px 24px 52px;
    border-radius: var(--r-lg);
  }
  .cta-title { font-size: clamp(2rem, 9vw, 2.8rem); margin-bottom: 16px; }
  .cta-sub   { font-size: 0.88rem; margin-bottom: 28px; }
  .cta-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    max-width: 340px;
    margin: 0 auto;
  }
  .cta-btn {
    width: 100%;
    justify-content: center;
    padding: 14px 16px;
    font-size: 0.78rem;
  }

  /* ── Footer ── */
  .footer { padding: 32px 0; }
  .footer-inner { gap: 20px; }
  .footer-links {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px 24px;
  }
  .footer-links a { font-size: 0.72rem; }
  .footer-copy    { font-size: 0.68rem; }
}

/* ——————————————————————————————————————————
   20. RESPONSIVE — SMALL MOBILE ≤380px
   —————————————————————————————————————————— */
@media (max-width: 380px) {
  .container { padding: 0 14px; }

  .hero-title { font-size: 2.4rem; }
  .vgrid-2x2 { gap: 6px; }
  .vgrid-2x2 .vwrap { aspect-ratio: 1 / 1; }

  .stat-item { padding: 0 14px; }
  .stat-item strong { font-size: 1.4rem; }
  .btn-primary,
  .btn-ghost { max-width: 100%; }

  .about-img-card { max-width: 220px; height: 260px; }
}
