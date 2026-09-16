document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (!link.hasAttribute('aria-label')) {
      link.setAttribute('aria-label', `${link.textContent.trim()} — abre em nova aba`);
    }
  });
});
