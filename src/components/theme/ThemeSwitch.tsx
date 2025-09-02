import { use } from 'react';
import { ThemeContext, type Theme } from './ThemeProvider';
import { cn } from '@/utils/cn';

function ThemeSwitch() {
  return (
    <div className="relative flex gap-1 rounded-lg bg-stone-300 p-1 transition-colors dark:bg-stone-700">
      <Button themeType="light">
        <i className="fa-solid fa-sun" />
      </Button>
      <Button themeType="dark">
        <i className="fa-solid fa-moon" />
      </Button>
      <Button themeType="system">
        <i className="fa-solid fa-computer" />
      </Button>
      <HighLight />
    </div>
  );
}

export default ThemeSwitch;

const Button = ({
  themeType,
  children,
}: {
  themeType: Theme;
  children: React.ReactNode;
}) => {
  const { theme, setTheme } = use(ThemeContext);
  const isActive = theme === themeType;

  return (
    <button
      className={cn([
        'size-9 gap-1 rounded-md px-2 py-2 font-semibold max-md:size-8 dark:bg-stone-700',
        '[&>*]:z-20',
        '[&>span]:text-sm',
        {
          'text-white dark:text-black': isActive,
        },
        {
          'text-stone-600 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200':
            !isActive,
        },
      ])}
      onClick={() => setTheme(themeType)}
    >
      {children}
    </button>
  );
};

const HighLight = () => {
  const { theme } = use(ThemeContext);
  return (
    <div
      className={cn([
        'absolute z-10 size-9 rounded-md bg-stone-700 transition-transform duration-200 max-md:size-8 dark:bg-stone-400',
        { 'translate-x-0': theme === 'light' },
        { 'translate-x-[calc(100%+4px)]': theme === 'dark' },
        { 'translate-x-[calc(200%+8px)]': theme === 'system' },
      ])}
    />
  );
};
