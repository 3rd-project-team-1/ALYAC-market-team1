import { ChatIcon, UploadImageSmallIcon } from '@/shared/assets';
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
  };
  onMoreClick: () => void;
  onToggleHeart: () => void;
  isHeartPending: boolean;
}

export function PostDetailCard({
  post,
  onMoreClick,
  onToggleHeart,
  isHeartPending,
}: PostDetailCardProps) {
  const images = post.image ? post.image.split(',').map((img) => img.trim()) : [];

  return (
    <div className="px-4 pt-5">
      {/* 작성자 정보 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-muted h-10 w-10 overflow-hidden rounded-full">
            {post.author.image ? (
              <img
                src={getImageUrl(post.author.image) ?? post.author.image}
                alt="프로필"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <UploadImageSmallIcon />
              </div>
            )}
          </div>
          <div>
            <p className="text-foreground text-sm font-semibold">{post.author.username}</p>
            <p className="text-muted-foreground text-xs">@{post.author.accountname}</p>
          </div>
        </div>
        <button type="button" onClick={onMoreClick} aria-label="더보기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="5" cy="12" r="1.5" fill="currentColor" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <circle cx="19" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* 게시글 내용 */}
      <p className="text-foreground mt-4 text-sm leading-relaxed">{post.content}</p>

      {/* 게시글 이미지 */}
      {images.length > 0 && (
        <div className="mt-4 overflow-hidden rounded-xl">
          {images.length > 1 ? (
            <div className="grid grid-cols-2 gap-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={getImageUrl(img) ?? img}
                  alt={`게시글 이미지 ${index + 1}`}
                  className="h-48 w-full rounded-lg object-cover"
                />
              ))}
            </div>
          ) : (
            <img
              src={getImageUrl(images[0]) ?? images[0]}
              alt="게시글 이미지"
              className="w-full object-cover"
            />
          )}
        </div>
      )}

      {/* 좋아요 / 댓글 수 */}
      <div className="mt-3 flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleHeart}
          disabled={isHeartPending}
          className="flex items-center gap-1.5"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.9202 4.01322C16.5204 3.60554 16.0456 3.28215 15.5231 3.0615C15.0006 2.84086 14.4406 2.72729 13.875 2.72729C13.3094 2.72729 12.7494 2.84086 12.2268 3.0615C11.7043 3.28215 11.2296 3.60554 10.8298 4.01322L9.99997 4.85889L9.17017 4.01322C8.36252 3.19013 7.26713 2.72772 6.12495 2.72772C4.98277 2.72772 3.88737 3.19013 3.07973 4.01322C2.27209 4.83631 1.81836 5.95266 1.81836 7.11668C1.81836 8.28071 2.27209 9.39706 3.07973 10.2201L3.90953 11.0658L9.99997 17.2728L16.0904 11.0658L16.9202 10.2201C17.3202 9.81266 17.6376 9.32885 17.8541 8.79635C18.0706 8.26385 18.182 7.69309 18.182 7.11668C18.182 6.54028 18.0706 5.96952 17.8541 5.43702C17.6376 4.90452 17.3202 4.4207 16.9202 4.01322Z"
              fill={post.hearted ? '#FF0000' : 'none'}
              stroke={post.hearted ? '#FF0000' : '#767676'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-muted-foreground text-xs">{post.heartCount}</span>
        </button>
        <button type="button" className="flex items-center gap-1.5">
          <ChatIcon />
          <span className="text-muted-foreground text-xs">{post.commentCount}</span>
        </button>
      </div>
    </div>
  );
}
