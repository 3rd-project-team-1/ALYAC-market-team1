import { BackIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';

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
      <Button variant="icon-nav" size="nav" onClick={onBack}>
        <BackIcon />
      </Button>
      <h1 className={cn('text-foreground flex-1 text-center text-base font-semibold')}>{title}</h1>
      <div className={cn('h-8 w-8')} />
    </header>
  );
}
