/* ============================================================
   VYK EDITZ — Premium Cinematic Portfolio — script.js
   Handles: Navbar scroll · Mobile menu · Smooth scroll ·
            Scroll-reveal · Video placeholders ·
            Hover effects · Scroll progress
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initVideoPlaceholders();
    initHoverEffects();
    initScrollProgress();
    initMarqueePause();
    initTheme();
    updateFooterYear();

});


/* ——————————————————————————————————————————
   1. NAVBAR — SCROLL STATE
   Adds .scrolled after 60px for glassmorphism.
   —————————————————————————————————————————— */
function initNavbar() {

    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let ticking = false;

    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run on load in case page is already scrolled
}

/* ——————————————————————————————————————————
   1.5 THEME SWITCHER
   —————————————————————————————————————————— */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    // Initial apply
    setTheme(getPreferredTheme());

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
    });

    // Listen for system changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'light' : 'dark');
        }
    });
}



/* ——————————————————————————————————————————
   2. MOBILE MENU — HAMBURGER TOGGLE
   —————————————————————————————————————————— */
function initMobileMenu() {

    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;

    function closeMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click
    mobileMenu.querySelectorAll('.mobile-link').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (
            mobileMenu.classList.contains('open') &&
            !hamburger.contains(e.target) &&
            !mobileMenu.contains(e.target)
        ) {
            closeMenu();
        }
    });
}


/* ——————————————————————————————————————————
   3. SMOOTH SCROLL
   Offsets scroll by navbar height (80px).
   —————————————————————————————————————————— */
function initSmoothScroll() {

    const NAVBAR_HEIGHT = 80;

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href');
            if (id === '#') return;

            const target = document.querySelector(id);
            if (!target) return;

            e.preventDefault();

            const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        });
    });
}


/* ——————————————————————————————————————————
   4. SCROLL REVEAL
   IntersectionObserver adds .visible to
   trigger CSS fade-in transitions.
   —————————————————————————————————————————— */
function initScrollReveal() {

    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
    );

    els.forEach((el) => observer.observe(el));
}


/* ——————————————————————————————————————————
   5. VIDEO PLACEHOLDERS
   Hides placeholder when video loads;
   keeps it visible on error or missing src.
   —————————————————————————————————————————— */
function initVideoPlaceholders() {

    document.querySelectorAll('.video-wrap').forEach((wrap) => {
        const video = wrap.querySelector('video');
        const placeholder = wrap.querySelector('.video-placeholder');

        if (!video || !placeholder) return;

        const showPlaceholder = () => {
            placeholder.style.display = 'flex';
        };

        const hidePlaceholder = () => {
            placeholder.style.display = 'none';
        };

        // Click interaction for play/pause toggle
        wrap.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                hidePlaceholder();
            } else {
                video.pause();
                showPlaceholder();
            }
        });

        video.addEventListener('error', showPlaceholder);
    });
}


/* ——————————————————————————————————————————
   6. HOVER EFFECTS
   3D tilt on service cards, button glow,
   orb parallax, magnetic video cards.
   —————————————————————————————————————————— */
function initHoverEffects() {

    /* 3D Tilt — service cards */
    document.querySelectorAll('.service-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
            const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);

            card.style.transition = 'transform 0.1s linear, box-shadow 0.4s ease';
            card.style.transform  = `translateY(-8px) rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease';
            card.style.transform  = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });

    /* Button glow */
    document.querySelectorAll('.btn-primary, .nav-cta, .cta-btn-email').forEach((btn) => {
        btn.addEventListener('mouseenter', () => {
            btn.style.boxShadow = '0 0 36px rgba(200,169,110,0.45), 0 4px 16px rgba(0,0,0,0.4)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.boxShadow = '';
        });
    });

    /* Orb parallax inside hero */
    const orbs = document.querySelectorAll('.orb');
    const hero = document.querySelector('.hero');

    if (hero && orbs.length) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const mx = (e.clientX - rect.left)  / rect.width  - 0.5;
            const my = (e.clientY - rect.top)   / rect.height - 0.5;

            orbs.forEach((orb, i) => {
                const depth = (i + 1) * 18;
                orb.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
            });
        });

        hero.addEventListener('mouseleave', () => {
            orbs.forEach((orb) => {
                orb.style.transition = 'transform 0.8s ease';
                orb.style.transform  = '';
                setTimeout(() => { orb.style.transition = ''; }, 800);
            });
        });
    }

    /* Magnetic hover — video cards */
    document.querySelectorAll('.video-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);

            card.style.transition = 'transform 0.1s linear, box-shadow 0.4s ease';
            card.style.transform  = `translateY(-6px) translateX(${dx * 4}px) scale(1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease';
            card.style.transform  = '';
        });
    });
}


/* ——————————————————————————————————————————
   7. SCROLL PROGRESS BAR
   Thin gold bar at the top of the page.
   —————————————————————————————————————————— */
function initScrollProgress() {

    const bar = document.createElement('div');
    bar.id = 'scrollProgress';
    bar.setAttribute('aria-hidden', 'true');

    Object.assign(bar.style, {
        position:       'fixed',
        top:            '0',
        left:           '0',
        height:         '2px',
        width:          '0%',
        background:     'linear-gradient(to right, #c8a96e, #d4b87a)',
        zIndex:         '10001',
        transition:     'width 0.1s linear',
        pointerEvents:  'none',
    });

    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = docHeight > 0
            ? (window.scrollY / docHeight * 100) + '%'
            : '0%';
    }, { passive: true });
}


/* ——————————————————————————————————————————
   8. MARQUEE — TOUCH PAUSE
   Pauses brand strip on mobile tap.
   —————————————————————————————————————————— */
function initMarqueePause() {

    const track = document.querySelector('.brands-track');
    if (!track) return;

    let resumeTimer;

    track.addEventListener('touchstart', () => {
        track.style.animationPlayState = 'paused';
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => {
            track.style.animationPlayState = 'running';
        }, 2000);
    }, { passive: true });
}

/* ——————————————————————————————————————————
   9. FOOTER YEAR — auto-update
   Writes current year into #footerYear span.
   —————————————————————————————————————————— */
function updateFooterYear() {
    const el = document.getElementById('footerYear');
    if (el) el.textContent = new Date().getFullYear();
}