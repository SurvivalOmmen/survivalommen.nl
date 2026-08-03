const menuButton = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('[data-contact-form]').forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const status = form.querySelector('[data-form-status]');
    const button = form.querySelector('button[type="submit"]');

    if (!status || !button) return;

    status.textContent = 'Je gegevens worden verstuurd…';
    button.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Verzenden mislukt');

      form.reset();
      status.textContent = 'Bedankt! Je gegevens zijn succesvol verzonden.';
    } catch (error) {
      console.error(error);
      status.textContent = 'Het versturen is niet gelukt. Probeer het opnieuw of mail naar info@survivalommen.nl.';
    } finally {
      button.disabled = false;
    }
  });
});

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
