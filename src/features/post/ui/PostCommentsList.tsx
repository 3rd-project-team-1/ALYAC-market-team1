import { UploadImageSmallIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';

interface PostComment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    image: string;
    username: string;
    accountname: string;
  };
}

interface PostCommentsListProps {
  comments: PostComment[];
  myAccountname: string | null;
  onOpenCommentOption: (commentId: string) => void;
}

export function PostCommentsList({
  comments,
  myAccountname,
  onOpenCommentOption,
}: PostCommentsListProps) {
  if (comments.length === 0) {
    return (
      <div className={cn('flex items-center justify-center py-10 pb-20')}>
        <p className={cn('text-muted-foreground text-sm')}>아직 댓글이 없습니다</p>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-4 px-4 py-4 pb-20')}>
      {comments.map((comment) => (
        <div key={comment.id} className={cn('flex items-start gap-3')}>
          <div className={cn('bg-muted h-8 w-8 flex-shrink-0 overflow-hidden rounded-full')}>
            {comment.author.image ? (
              <img
                src={getImageUrl(comment.author.image) ?? comment.author.image}
                alt={comment.author.username}
                className={cn('h-full w-full object-cover')}
              />
            ) : (
              <div className={cn('flex h-full w-full items-center justify-center')}>
                <UploadImageSmallIcon />
              </div>
            )}
          </div>
          <div className={cn('flex flex-1 flex-col gap-0.5')}>
            <div className={cn('flex items-center gap-2')}>
              <span className={cn('text-foreground text-sm font-semibold')}>
                {comment.author.username}
              </span>
              <span className={cn('text-muted-foreground text-xs')}>
                {new Date(comment.createdAt).toLocaleDateString('ko-KR')}
              </span>
            </div>
            <p className={cn('text-foreground text-sm')}>{comment.content}</p>
          </div>
          {comment.author.accountname === myAccountname && (
            <button
              type="button"
              onClick={() => onOpenCommentOption(comment.id)}
              aria-label="더보기"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="5" cy="12" r="1.5" fill="currentColor" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <circle cx="19" cy="12" r="1.5" fill="currentColor" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
