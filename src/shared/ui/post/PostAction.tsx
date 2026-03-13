import { ChatIcon, HeartIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';

interface PostActionProps {
  hearted: boolean;
  heartCount: number;
  commentCount: number;
  createdAt: string;
  onToggleHeart: () => void;
  isHeartPending?: boolean;
  onClickComment?: () => void;
}

export function PostAction({
  hearted,
  heartCount,
  commentCount,
  createdAt,
  onToggleHeart,
  isHeartPending = false,
  onClickComment,
}: PostActionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <div className={cn('mt-3 flex items-center justify-between')}>
      {/* 왼쪽: 좋아요와 댓글 버튼 묶음 */}
      <div className={cn('flex items-center gap-4')}>
        <button
          type="button"
          onClick={onToggleHeart}
          disabled={isHeartPending}
          className={cn('flex items-center gap-1.5')}
        >
          <HeartIcon active={hearted} />
          <span className={cn('text-muted-foreground text-xs')}>{heartCount}</span>
        </button>

        <button type="button" onClick={onClickComment} className={cn('flex items-center gap-1.5')}>
          <ChatIcon />
          <span className={cn('text-muted-foreground text-xs')}>{commentCount}</span>
        </button>
      </div>

      {/* 오른쪽 끝: 게시글 작성 날짜 */}
      <span className={cn('text-muted-foreground text-xs tracking-wide')}>
        {formatDate(createdAt)}
      </span>
    </div>
  );
}
