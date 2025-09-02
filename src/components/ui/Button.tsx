import { cn } from '@/utils/cn';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn([
        'px-4 py-2',
        'rounded-lg bg-stone-800 hover:bg-stone-900 dark:bg-stone-300 dark:hover:bg-stone-400',
        'text-white dark:text-black',
        'font-semibold',
        'transition-colors duration-200',
        className,
      ])}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
