// Retrofit Illumination — site behavior. No frameworks, no build step.

document.addEventListener('DOMContentLoaded', () => {

  // mark current nav link
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('is-active');
  });

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

      const subject = `Quote request — ${get('vehicle') || 'vehicle TBD'}`;
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
      if (note) note.textContent = 'Opening your email client — send it over and we’ll reply within a couple of days.';
    });
  }

});
