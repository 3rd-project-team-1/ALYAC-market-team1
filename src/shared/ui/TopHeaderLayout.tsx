import { cn } from '@/shared/lib';

interface TopHeaderLayoutProps {
  className?: string;
  children: React.ReactNode;
}

export function TopHeaderLayout({ className, children }: TopHeaderLayoutProps) {
  return (
    <header
      className={cn(
        'bg-background border-border fixed top-0 right-0 left-0 z-50 flex h-[48px] items-center justify-between border-b px-4',
        className,
      )}
    >
      {children}
    </header>
  );
}
