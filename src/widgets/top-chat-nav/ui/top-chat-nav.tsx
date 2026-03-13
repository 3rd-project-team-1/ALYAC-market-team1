import { useNavigate } from 'react-router-dom';

import { BackIcon, MoreIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { TopHeaderLayout } from '@/shared/ui/TopHeaderLayout';

interface TopChatNavProps {
  title: string;
  onMoreClick?: () => void;
}

export function TopChatNav({ title, onMoreClick }: TopChatNavProps) {
  const navigate = useNavigate();

  return (
    <TopHeaderLayout>
      <Button variant="icon-nav" size="nav" onClick={() => navigate(-1)}>
        <BackIcon />
      </Button>

      <span className={cn('text-foreground text-base font-semibold')}>{title}</span>

      <Button variant="icon-nav" size="nav" onClick={onMoreClick}>
        <MoreIcon />
      </Button>
    </TopHeaderLayout>
  );
}
