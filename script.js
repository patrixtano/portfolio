/* ============================================================
   script.js — Patrik Stano Portfolio
   Minimal vanilla JS. No libraries, no frameworks.
   ============================================================ */


/* ============================================================
   1. FADE IN ON LOAD
   Body starts at opacity: 0 (in CSS), we add .loaded to
   trigger the transition to opacity: 1.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});


/* ============================================================
   2. NAV SCROLL STATE
   Adds .scrolled to <nav> when user scrolls past 40px,
   triggering the terracotta bar to appear.
   ============================================================ */
const nav = document.querySelector('.nav');

if (nav) {
  const handleScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load in case page is already scrolled
}


/* ============================================================
   3. ACTIVE NAV LINK HIGHLIGHTING
   Compares the current page pathname with each nav link's href
   and adds .active class to the matching link.
   ============================================================ */
const links = document.querySelectorAll('.nav-link');

links.forEach(link => {
  const href = link.getAttribute('href');
  if (!href) return;

  // Normalise: strip leading slash and trailing slash for comparison
  const normHref = href.replace(/^\//, '').replace(/\/$/, '');
  const normPath = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');

  // Match if pathname ends with the normalised href
  // e.g. href="projects/" matches pathname "/projects/" or "/portfolio/projects/"
  if (normHref && normPath && normPath.endsWith(normHref)) {
    link.classList.add('active');
  }

  // Home page special case: do NOT auto-highlight home in nav
  // (The "PS" logo already represents home)
  if (href === '/' || href === '/index.html') {
    link.classList.remove('active');
  }
});


/* ============================================================
   4. INFO PANEL TOGGLE
   For project detail pages. The floating "i" button slides
   in the right-side info panel.
   ============================================================ */
const infoBtn   = document.getElementById('info-btn');
const infoPanel = document.getElementById('info-panel');
const closeBtn  = document.getElementById('close-panel');

if (infoBtn && infoPanel) {
  // Open / close on button click
  infoBtn.addEventListener('click', () => {
    infoPanel.classList.toggle('open');
  });

  // Close on × button
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      infoPanel.classList.remove('open');
    });
  }

  // Close panel when clicking outside of it (on mobile)
  document.addEventListener('click', (e) => {
    if (
      infoPanel.classList.contains('open') &&
      !infoPanel.contains(e.target) &&
      e.target !== infoBtn
    ) {
      infoPanel.classList.remove('open');
    }
  });

  // Close panel on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && infoPanel.classList.contains('open')) {
      infoPanel.classList.remove('open');
    }
  });
}
