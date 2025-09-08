(() => {
  try {
    const saved = localStorage.getItem('kkodol_theme'); // 'light' | 'dark' | 'system'
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const resolved =
      saved === 'dark' ||
      (saved === 'system'
        ? prefersDark
        : saved === 'light'
          ? 'light'
          : prefersDark
            ? 'dark'
            : 'light');

    document.documentElement.dataset.theme = resolved ? 'dark' : 'light';
  } catch {}
})();
