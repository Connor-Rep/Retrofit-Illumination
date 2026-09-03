// Retrofit Illumination: site behavior. No frameworks, no build step.

document.addEventListener('DOMContentLoaded', () => {

  // nav goes from transparent to a blurred panel once the page scrolls
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const setScrolled = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
  }

  // mark current nav link
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('is-active');
  });

  // mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const open = !menuToggle.classList.contains('is-open');
      menuToggle.classList.toggle('is-open', open);
      mobileMenu.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menuToggle.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
      });
    });
  }

  // shop search: filters product cards, hides empty category groups
  const shopSearch = document.getElementById('shop-search');
  if (shopSearch) {
    const cards = Array.from(document.querySelectorAll('.prod-card'));
    const groups = Array.from(document.querySelectorAll('.shop-grid')).map(grid => ({
      grid,
      cat: grid.previousElementSibling && grid.previousElementSibling.classList.contains('shop-cat') ? grid.previousElementSibling : null
    }));
    shopSearch.addEventListener('input', () => {
      const q = shopSearch.value.trim().toLowerCase();
      cards.forEach(card => {
        const match = !q || card.textContent.toLowerCase().includes(q);
        card.hidden = !match;
      });
      groups.forEach(({ grid, cat }) => {
        const anyVisible = Array.from(grid.querySelectorAll('.prod-card')).some(c => !c.hidden);
        grid.hidden = !anyVisible;
        if (cat) cat.hidden = !anyVisible;
      });
    });
  }

  // faq accordions
  document.querySelectorAll('.faq-item h4').forEach(h => {
    h.addEventListener('click', () => {
      h.parentElement.classList.toggle('open');
    });
  });

  // quote form -> mailto handoff (static site, no backend yet)
  const form = document.getElementById('quote-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const get = (k) => (data.get(k) || '').toString().trim();

      const subject = `Quote request: ${get('vehicle') || 'vehicle TBD'}`;
      const body =
        `Name: ${get('name')}\n` +
        `Email: ${get('email')}\n` +
        `Phone: ${get('phone')}\n` +
        `Vehicle: ${get('vehicle')}\n` +
        `Project: ${get('project')}\n\n` +
        `${get('message')}`;

      const mailto = `mailto:info@retrofitillumination.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;

      const note = document.getElementById('form-status');
      if (note) note.textContent = 'Opening your email client. Send it over and we’ll reply within a couple of days.';
    });
  }

});
