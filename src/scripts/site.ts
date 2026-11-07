/**
 * Site-wide progressive enhancement.
 * Everything here is optional: with JavaScript off the site stays fully usable
 * (menu is a plain link list at desktop width, numbers show their final value,
 * nothing is hidden waiting to be revealed).
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasIO = 'IntersectionObserver' in window;

/* 1. Header: add a border + shadow once the page has scrolled */
const header = document.querySelector<HTMLElement>('[data-site-header]');
if (header) {
  const update = () => header.setAttribute('data-scrolled', String(window.scrollY > 8));
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* 2. Mobile menu */
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
if (toggle && menu) {
  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

/* 3. Fade-up on scroll (once). Only elements that start below the fold are hidden,
      so nothing above the fold ever flashes. */
if (!reduceMotion && hasIO) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.remove('is-hidden');
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
      el.classList.add('is-hidden');
      io.observe(el);
    }
  });
}

/* 4. Count-up for key numbers. Markup already contains the final value. */
if (!reduceMotion && hasIO) {
  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target) || target <= 0) return;
    const duration = 900;
    const start = performance.now();
    el.textContent = '0';
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = String(target);
    };
    requestAnimationFrame(step);
  };
  const counter = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target as HTMLElement);
        counter.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0 },
  );
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => counter.observe(el));
}

/* 5. Print buttons (inline onclick handlers would be blocked by the site's CSP) */
document.querySelectorAll('[data-print]').forEach((btn) => {
  btn.addEventListener('click', () => window.print());
});
