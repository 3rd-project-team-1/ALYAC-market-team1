import { useNavigate } from 'react-router-dom';

import { BackIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { TopHeaderLayout } from '@/shared/ui/TopHeaderLayout';

interface TopSearchNavProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function TopSearchNav({ searchValue, onSearchChange }: TopSearchNavProps) {
  const navigate = useNavigate();

  return (
    <TopHeaderLayout>
      <Button
        aria-label="이전 페이지로 돌아가기"
        variant="icon-nav"
        size="nav"
        onClick={() => navigate(-1)}
      >
        <BackIcon aria-hidden="true" />
      </Button>

      <input
        id="user-search"
        type="search"
        role="searchbox"
        placeholder="계정 검색"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        autoFocus
        className={cn(
          'bg-background text-foreground h-[32px] flex-1 rounded-full border border-transparent px-3 text-xs outline-none placeholder:text-xs placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/60',
        )}
      />
    </TopHeaderLayout>
  );
}
