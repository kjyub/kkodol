import { cn } from '@/utils/cn';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  className?: string;
}
export default function ChipButton({
  isActive,
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      className={cn([
        'flex-center flex rounded-full border px-3 transition-colors',
        'font-medium',
        {
          'border-stone-700 bg-stone-700 text-white hover:bg-stone-800 dark:border-stone-400 dark:bg-stone-400 dark:text-black dark:hover:bg-stone-300':
            isActive,
        },
        {
          'border-stone-300 text-stone-600 hover:bg-stone-200 dark:border-stone-600 dark:text-stone-400 dark:hover:bg-stone-600':
            !isActive,
        },
        className ?? '',
      ])}
      {...props}
    >
      {children}
    </button>
  );
}
