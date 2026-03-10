import { useNavigate } from 'react-router-dom';

import { BackIcon, MoreIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';

interface TopChatNavProps {
  title: string;
  onMoreClick?: () => void;
}

export function TopChatNav({ title, onMoreClick }: TopChatNavProps) {
  const navigate = useNavigate();

  return (
    <header
      className={cn(
        'bg-background border-border fixed top-0 right-0 left-0 flex h-[48px] items-center justify-between border-b px-4',
      )}
    >
      <Button variant="icon-nav" size="nav" onClick={() => navigate(-1)}>
        <BackIcon />
      </Button>

      <span className={cn('text-foreground text-base font-semibold')}>{title}</span>

      <Button variant="icon-nav" size="nav" onClick={onMoreClick}>
        <MoreIcon />
      </Button>
    </header>
  );
}
