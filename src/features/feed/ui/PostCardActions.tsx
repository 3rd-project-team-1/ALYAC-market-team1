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
    <div className={cn('text-muted-foreground mt-3 flex items-center text-xs')}>
      <button
        type="button"
        aria-label={isLiked ? '좋아요 취소' : '좋아요'}
        onClick={onLikeToggle}
        disabled={isPending}
      >
        <HeartIcon active={isLiked} className={cn('mr-1 inline-block')} />
      </button>
      {localHeartCount} <ChatIcon className={cn('mr-1 ml-2')} /> {commentCount}{' '}
    </div>
  );
}
