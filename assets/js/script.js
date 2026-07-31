const menuButton = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const subjectField = document.querySelector('#onderwerp');
if (subjectField) {
  const params = new URLSearchParams(window.location.search);
  const requestedSubject = params.get('onderwerp');
  if (requestedSubject) {
    const option = [...subjectField.options].find((item) => item.text === requestedSubject);
    if (option) subjectField.value = option.value;
  }
}

const form = document.querySelector('[data-contact-form]');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get('naam') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subject = String(data.get('onderwerp') || '').trim();
    const message = String(data.get('bericht') || '').trim();
    const status = form.querySelector('[data-form-status]');

    if (!name || !email || !subject || !message) {
      status.textContent = 'Vul alle velden in.';
      return;
    }

    const body = [
      `Naam: ${name}`,
      `E-mailadres: ${email}`,
      '',
      'Bericht:',
      message
    ].join('\n');

    status.textContent = 'Je e-mailprogramma wordt geopend.';
    window.location.href = `mailto:info@survivalommen.nl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
