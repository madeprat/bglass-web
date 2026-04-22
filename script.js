const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const yearNode = document.getElementById('year');
const emailDisplays = document.querySelectorAll('.email-display');
const copyEmailButtons = document.querySelectorAll('.copy-email-btn');

const buildEmail = (node) => {
  const user = node?.dataset?.user || '';
  const domain = node?.dataset?.domain || '';
  return `${user}@${domain}`;
};

if (yearNode) {
  yearNode.textContent = `© ${new Date().getFullYear()} B-Glass`;
}

emailDisplays.forEach((node) => {
  node.textContent = buildEmail(node);
});

copyEmailButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const email = buildEmail(button);
    const originalText = button.textContent;

    try {
      await navigator.clipboard.writeText(email);
      button.textContent = 'Email copiado';
    } catch (error) {
      button.textContent = email;
    }

    setTimeout(() => {
      button.textContent = originalText;
    }, 2200);
  });
});

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
