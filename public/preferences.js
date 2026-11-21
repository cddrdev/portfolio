(() => {
  let theme;
  let language;
  try {
    theme = localStorage.getItem('portfolio-theme');
    language = localStorage.getItem('portfolio-language');
  } catch {}
  const dark = theme === 'dark' || (
    theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.documentElement.lang = language === 'en' ? 'en' : 'es';
  document.querySelector('meta[name="theme-color"]').content = dark ? '#101b15' : '#f8f8f3';
})();
