import { useNavigate } from 'react-router-dom';

import { SearchIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { ROUTE_PATHS } from '@/shared/routes';
import { Button } from '@/shared/ui';

interface TopMainNavProps {
  title: string;
}

export function TopMainNav({ title }: TopMainNavProps) {
  const navigate = useNavigate();

  return (
    <header
      className={cn(
        'bg-background border-border fixed top-0 right-0 left-0 z-[999] flex h-[48px] items-center justify-between border-b px-4',
      )}
    >
      <span className={cn('text-foreground text-base font-semibold')}>{title}</span>
      <Button variant="icon-nav" size="nav" onClick={() => navigate(ROUTE_PATHS.SEARCH)}>
        <SearchIcon />
      </Button>
    </header>
  );
}
