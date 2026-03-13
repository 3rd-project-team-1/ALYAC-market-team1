import type { MouseEvent } from 'react';

import { ChatIcon, HeartIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';

interface PostCardActionsProps {
  isLiked: boolean;
  localHeartCount: number;
  commentCount: number;
  isPending: boolean;
  onLikeToggle: (e: MouseEvent) => Promise<void>;
}

export function PostCardActions({
  isLiked,
  localHeartCount,
  commentCount,
  isPending,
  onLikeToggle,
}: PostCardActionsProps) {
  return (
    <div className={cn('text-muted-foreground mt-3 flex items-center gap-3 text-xs')}>
      <button
        type="button"
        aria-label={isLiked ? '좋아요 취소' : '좋아요'}
        className={cn('flex items-center gap-1')}
        onClick={onLikeToggle}
        disabled={isPending}
      >
        <HeartIcon active={isLiked} />
        <span>{localHeartCount}</span>
      </button>
      <div className={cn('flex items-center gap-1')}>
        <ChatIcon />
        <span>{commentCount}</span>
      </div>
    </div>
  );
}
