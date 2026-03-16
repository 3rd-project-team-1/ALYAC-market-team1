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
      <Button
        aria-label="채팅 목록으로 돌아가기"
        variant="icon-nav"
        size="nav"
        onClick={() => navigate(-1)}
      >
        <BackIcon aria-hidden="true" />
      </Button>

      <span className={cn('text-foreground text-base font-semibold')}>{title}</span>

      <Button
        aria-haspopup="menu"
        aria-label="채팅방 설정 더보기"
        variant="icon-nav"
        size="nav"
        onClick={onMoreClick}
      >
        <MoreIcon aria-hidden="true" />
      </Button>
    </TopHeaderLayout>
  );
}
