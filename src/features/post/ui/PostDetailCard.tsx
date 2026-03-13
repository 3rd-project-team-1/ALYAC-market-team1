import { cn } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';
import { PostAction, PostContent, UserProfile } from '@/shared/ui';

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
      <UserProfile
        image={post.author.image}
        username={post.author.username}
        accountname={post.author.accountname}
      />

      {/* 게시글 내용 */}
      <PostContent content={post.content} className="mt-3" />

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

      <PostAction
        hearted={post.hearted}
        heartCount={post.heartCount}
        commentCount={post.commentCount}
        createdAt={post.createdAt}
        onToggleHeart={onToggleHeart}
        isHeartPending={isHeartPending}
      />
    </div>
  );
}
