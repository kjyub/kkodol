import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';

export type Theme = 'light' | 'dark' | 'system';

const DEFAULT_THEME: Theme = 'system';
const LOCAL_STORAGE_THEME_KEY = 'kkodol_theme';

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

const applyResolvedTheme = (selectedTheme: Theme, prefersDark: boolean) => {
  const isDark =
    selectedTheme === 'system' ? prefersDark : selectedTheme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [theme, setTheme] = useState<Theme>(() => {
    return (
      (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || DEFAULT_THEME
    );
  });

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (theme === 'system') applyResolvedTheme(theme, e.matches);
    };

    applyResolvedTheme(theme, prefersDark);

    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [theme, prefersDark]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
