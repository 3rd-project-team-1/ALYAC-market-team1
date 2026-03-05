import { cn } from '@/shared/lib';

interface FollowListHeaderProps {
  title: string;
  onBack: () => void;
}

export function FollowListHeader({ title, onBack }: FollowListHeaderProps) {
  return (
    <header
      className={cn(
        'bg-background border-border fixed top-0 right-0 left-0 z-10 flex h-[48px] items-center border-b px-4',
      )}
    >
      <button
        onClick={onBack}
        className={cn(
          'text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-gray-100',
        )}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h1 className={cn('text-foreground flex-1 text-center text-base font-semibold')}>{title}</h1>
      <div className={cn('h-8 w-8')} />
    </header>
  );
}
