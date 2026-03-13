import type { MouseEvent } from 'react';

import { ChatIcon, HeartIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';

interface PostActionProps {
  isLiked: boolean;
  heartCount: number;
  commentCount: number;
  onToggleLike: (e: MouseEvent<HTMLButtonElement>) => void;
  isPending?: boolean;
  onClickComment?: () => void;
  createdAt?: string;
  className?: string;
}
export function PostAction({
  isLiked,
  heartCount,
  commentCount,
  onToggleLike,
  isPending = false,
  onClickComment,
  createdAt,
  className,
}: PostActionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <div className={cn('mt-3 flex items-center justify-between', className)}>
      {/* 왼쪽: 좋아요와 댓글 버튼 묶음 */}
      <div className={cn('flex items-center gap-4')}>
        <button
          type="button"
          aria-label={isLiked ? '좋아요 취소' : '좋아요'}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(e);
          }}
          disabled={isPending}
          className={cn('flex items-center gap-1.5')}
        >
          <HeartIcon active={isLiked} />
          <span className={cn('text-muted-foreground text-xs')}>{heartCount}</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClickComment?.();
          }}
          className={cn('flex items-center gap-1.5')}
        >
          <ChatIcon />
          <span className={cn('text-muted-foreground text-xs')}>{commentCount}</span>
        </button>
      </div>

      {/* 오른쪽 끝: 게시글 작성 날짜 (createdAt이 넘겨졌을 때만 렌더링) */}
      {createdAt && (
        <span className={cn('text-muted-foreground text-xs tracking-wide')}>
          {formatDate(createdAt)}
        </span>
      )}
    </div>
  );
}
