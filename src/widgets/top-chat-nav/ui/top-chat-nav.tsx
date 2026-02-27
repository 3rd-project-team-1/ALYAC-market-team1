import { useNavigate } from 'react-router-dom';

import { BackIcon, MoreIcon } from '@/shared/assets';

interface TopChatNavProps {
  title: string;
  onMoreClick?: () => void;
}

export function TopChatNav({ title, onMoreClick }: TopChatNavProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-background border-border fixed top-0 right-0 left-0 flex h-[48px] items-center justify-between border-b px-4">
      <button
        onClick={() => navigate(-1)}
        className="text-foreground hover:bg-accent flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-md transition-colors"
      >
        <BackIcon />
      </button>

      <span className="text-foreground text-base font-semibold">{title}</span>

      <button
        onClick={onMoreClick}
        className="text-foreground hover:bg-accent flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-md transition-colors"
      >
        <MoreIcon />
      </button>
    </header>
  );
}
