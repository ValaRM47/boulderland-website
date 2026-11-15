/* main.js — site-wide behaviour: header scroll state, mobile menu, reveal-on-scroll. Loaded on every page. */
(() => {
  // sticky nav background on scroll
  const nav = document.getElementById('nav');
  if (nav) addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), { passive: true });

  // mobile menu
  const mm = document.getElementById('mobileMenu');
  const toggle = document.getElementById('navToggle');
  const close = document.getElementById('mobileClose');
  if (mm && toggle) {
    toggle.onclick = () => mm.classList.add('open');
    if (close) close.onclick = () => mm.classList.remove('open');
    mm.querySelectorAll('a').forEach(a => a.onclick = () => mm.classList.remove('open'));
  }

  // reveal on scroll
  const io = new IntersectionObserver((es) => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4 * 0.06) + 's'; io.observe(el); });
})();
