import { useNavigate } from 'react-router-dom';

import { BackIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';

interface TopSearchNavProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function TopSearchNav({ searchValue, onSearchChange }: TopSearchNavProps) {
  const navigate = useNavigate();

  return (
    <header
      className={cn(
        'bg-background fixed top-0 right-0 left-0 flex h-[48px] items-center gap-2 px-4',
      )}
    >
      <button
        onClick={() => navigate(-1)}
        className={cn(
          'text-foreground hover:bg-accent flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-md transition-colors',
        )}
      >
        <BackIcon />
      </button>

      <input
        type="text"
        placeholder="계정 검색"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        autoFocus
        className={cn(
          'bg-background text-foreground h-[32px] flex-1 rounded-full border border-transparent px-3 text-xs outline-none placeholder:text-xs placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/60',
        )}
      />
    </header>
  );
}
