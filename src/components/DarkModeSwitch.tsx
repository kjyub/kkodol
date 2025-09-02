import { useState, useEffect } from 'react';

const themes = ['light', 'dark', 'auto'] as const;
type Theme = (typeof themes)[number];

function DarkModeSwitch() {
  const [theme, setTheme] = useState<Theme>('auto');

  const handleThemeChange = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  // TODO: 실제 테마 변경 로직 추가
  useEffect(() => {
    console.log(`Theme changed to: ${theme}`);
    // 예: document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button
      onClick={handleThemeChange}
      className="rounded-md bg-gray-200 px-4 py-2 font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    >
      {theme.charAt(0).toUpperCase() + theme.slice(1)}
    </button>
  );
}

export default DarkModeSwitch;
