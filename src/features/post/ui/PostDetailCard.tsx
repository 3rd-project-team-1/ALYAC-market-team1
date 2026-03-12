import { ChatIcon, HeartIcon, UploadImageSmallIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';

interface PostDetailCardProps {
  post: {
    author: {
      image: string;
      username: string;
      accountname: string;
    };
    content: string;
    image?: string;
    hearted: boolean;
    heartCount: number;
    commentCount: number;
    createdAt: string;
  };
  onToggleHeart: () => void;
  isHeartPending: boolean;
}

export function PostDetailCard({ post, onToggleHeart, isHeartPending }: PostDetailCardProps) {
  const images = post.image ? post.image.split(',').map((img) => img.trim()) : [];

  return (
    <div className={cn('px-4 pt-5')}>
      {/* 작성자 정보 */}
      <div className={cn('flex items-center gap-3')}>
        <div className={cn('bg-muted h-10 w-10 overflow-hidden rounded-full')}>
          {post.author.image ? (
            <img
              src={getImageUrl(post.author.image) ?? post.author.image}
              alt="프로필"
              className={cn('h-full w-full object-cover')}
            />
          ) : (
            <div className={cn('flex h-full w-full items-center justify-center')}>
              <UploadImageSmallIcon />
            </div>
          )}
        </div>
        <div>
          <p className={cn('text-foreground text-sm font-semibold')}>{post.author.username}</p>
          <p className={cn('text-muted-foreground text-xs')}>@{post.author.accountname}</p>
        </div>
      </div>

      {/* 게시글 내용 */}
      <p className={cn('text-foreground mt-4 text-sm leading-relaxed')}>{post.content}</p>

      {/* 게시글 이미지 */}
      {images.length > 0 && (
        <div className={cn('mt-4 overflow-hidden rounded-xl')}>
          {images.length > 1 ? (
            <div className={cn('grid grid-cols-2 gap-2')}>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={getImageUrl(img) ?? img}
                  alt={`게시글 이미지 ${index + 1}`}
                  className={cn('h-48 w-full rounded-lg object-cover')}
                />
              ))}
            </div>
          ) : (
            <img
              src={getImageUrl(images[0]) ?? images[0]}
              alt="게시글 이미지"
              className={cn('w-full object-cover')}
            />
          )}
        </div>
      )}

      {/* 좋아요 / 댓글 수 및 작성 날짜 영역 */}
      <div className={cn('mt-3 flex items-center justify-between')}>
        {/* 왼쪽: 좋아요와 댓글 버튼 묶음 */}
        <div className={cn('flex items-center gap-4')}>
          <button
            type="button"
            onClick={onToggleHeart}
            disabled={isHeartPending}
            className={cn('flex items-center gap-1.5')}
          >
            <HeartIcon active={post.hearted} />
            <span className={cn('text-muted-foreground text-xs')}>{post.heartCount}</span>
          </button>

          <button type="button" className={cn('flex items-center gap-1.5')}>
            <ChatIcon />
            <span className={cn('text-muted-foreground text-xs')}>{post.commentCount}</span>
          </button>
        </div>

        {/* 오른쪽 끝: 게시글 작성 날짜 */}
        <span className={cn('text-muted-foreground text-xs tracking-wide')}>
          {(() => {
            const date = new Date(post.createdAt);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return `${year}.${month}.${day}`;
          })()}
        </span>
      </div>
    </div>
  );
}
