import { useNavigate } from 'react-router-dom';

import { SearchIcon } from '@/shared/assets';

interface TopMainNavProps {
  title: string;
}

export function TopMainNav({ title }: TopMainNavProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-background border-border fixed top-0 right-0 left-0 z-[999] flex h-[48px] items-center justify-between border-b px-4">
      <span className="text-foreground text-base font-semibold">{title}</span>
      <button
        onClick={() => navigate('/search')}
        className="hover:bg-accent flex h-[32px] w-[32px] items-center justify-center rounded-md transition-colors"
      >
        <SearchIcon />
      </button>
    </header>
  );
}
