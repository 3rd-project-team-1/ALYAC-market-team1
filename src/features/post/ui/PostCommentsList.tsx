import { getImageUrl } from '@/features/image/lib/getImageUrl';
import uploadImage from '@/shared/assets/icons/upload-image.svg';

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

export function PostCommentsList({ comments, myAccountname, onOpenCommentOption }: PostCommentsListProps) {
  return (
    <div className="flex flex-col gap-4 px-4 py-4 pb-20">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start gap-3">
          <div className="bg-muted h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
            <img
              src={getImageUrl(comment.author.image) ?? uploadImage}
              alt={comment.author.username}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-foreground text-sm font-semibold">{comment.author.username}</span>
              <span className="text-muted-foreground text-xs">
                {new Date(comment.createdAt).toLocaleDateString('ko-KR')}
              </span>
            </div>
            <p className="text-foreground text-sm">{comment.content}</p>
          </div>
          {comment.author.accountname === myAccountname && (
            <button type="button" onClick={() => onOpenCommentOption(comment.id)} aria-label="더보기">
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
