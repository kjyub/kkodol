import { cn } from '@/utils/cn';

export default function FilterBox({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn([
        'relative rounded-lg border border-stone-400 p-3 pt-4 transition-colors dark:border-stone-500',
        className ?? '',
      ])}
    >
      <div className="absolute -top-3 left-3 bg-stone-50 px-2 py-0 text-stone-700 transition-colors dark:bg-stone-900 dark:text-stone-200">
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
