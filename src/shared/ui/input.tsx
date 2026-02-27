import * as React from 'react';

import { cn } from '@/shared/lib/utils/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'w-full min-w-0 bg-transparent py-2 text-base transition-[color,box-shadow] outline-none md:text-sm',
        'border-input h-9 border-b px-1',

        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',

        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',

        'focus-visible:border-ring focus-visible:ring-0',

        'aria-invalid:border-destructive aria-invalid:ring-0',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
