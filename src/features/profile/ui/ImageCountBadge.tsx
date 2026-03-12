import { Images } from 'lucide-react';

import { cn } from '@/shared/lib';

interface ImageCountBadgeProps {
  count: number;
  onClick: () => void;
}

export function ImageCountBadge({ count, onClick }: ImageCountBadgeProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'absolute top-2 right-2 flex cursor-pointer items-center gap-1 rounded-full bg-black/50 px-2 py-1',
      )}
    >
      <Images className={cn('h-3 w-3 text-white')} />
      <span className={cn('text-xs text-white')}>{count}</span>
    </div>
  );
}
