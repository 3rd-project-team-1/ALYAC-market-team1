import { useNavigate } from 'react-router-dom';

import { SearchIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { ROUTE_PATHS } from '@/shared/routes';
import { Button } from '@/shared/ui';
import { TopHeaderLayout } from '@/shared/ui/TopHeaderLayout';

interface TopMainNavProps {
  title: string;
}

export function TopMainNav({ title }: TopMainNavProps) {
  const navigate = useNavigate();

  return (
    <TopHeaderLayout>
      <span className={cn('text-foreground text-base font-semibold')}>{title}</span>
      <Button variant="icon-nav" size="nav" onClick={() => navigate(ROUTE_PATHS.SEARCH)}>
        <SearchIcon />
      </Button>
    </TopHeaderLayout>
  );
}
