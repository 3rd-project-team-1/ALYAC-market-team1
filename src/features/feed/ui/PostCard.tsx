import { useState } from 'react';

import type { PostCardModel } from '@/entities/feed';
import { useHeartMutation } from '@/entities/post';
import { ChatIcon, HeartIcon, MoreIcon, UploadImageSmallIcon } from '@/shared/assets/svg-props';
import { cn, getImageUrl } from '@/shared/lib';

// PostCard 컴포넌트의 Props
interface PostCardProps {
  post: PostCardModel;
  isMyPost?: boolean;
  isYourPost?: boolean;
  onRewrite?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  onReport?: (postId: string) => void;
  onClick?: () => void;
}

// 드롭다운 메뉴 아이템 정의
interface PostCardDropdownProps {
  onClose: () => void;
  items: { label: string; onClick: (e: React.MouseEvent) => void; variant?: 'danger' }[];
}

/** 게시글 카드의 더보기 드롭다운 메뉴 */
function PostCardDropdown({ onClose, items }: PostCardDropdownProps) {
  return (
    <>
      {/* 배경 클릭 시 드롭다운 닫기 오버레이 */}
      <button
        type="button"
        className={cn('fixed inset-0 z-10 cursor-default')}
        aria-label="메뉴 닫기"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
      <div
        className={cn(
          'bg-background border-border absolute top-9 right-0 z-20 w-28 overflow-hidden rounded-md border py-1 shadow-sm',
        )}
      >
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            className={cn(
              'hover:bg-accent w-full px-3 py-2 text-left text-sm',
              item.variant === 'danger' ? 'text-destructive' : 'text-foreground',
            )}
            onClick={item.onClick}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}

/**
 * 포스트 정보를 카드 형태로 렌더링하는 컴포넌트입니다.
 *
 * @param props - PostCardProps
 * @param props.post - 포스트 뷰 모델 데이터
 * @param props.isMyPost - 본인 게시글 여부 (수정/삭제 메뉴 표시여부 결정)
 * @param props.isYourPost - 다른 사용자의 게시글 여부 (신고 메뉴 표시여부 결정)
 * @param props.onRewrite - 수정 핸들러
 * @param props.onDelete - 삭제 핸들러
 * @param props.onClick - 카드 클릭 시 상세 이동 등의 핸들러
 * @returns 게시글 카드 엘리먼트
 * @file features/feed/ui/PostCard.tsx
 */
export function PostCard({
  post,
  isMyPost = false,
  isYourPost = false,
  onRewrite,
  onDelete,
  onReport,
  onClick,
}: PostCardProps) {
  // 수정/삭제 메뉴 드롭다운 열림 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 좋아요 상태 - post.hearted로 초기화하여 서버 상태 동기화 (낙관적 업데이트)
  const [isLiked, setIsLiked] = useState(post.hearted);
  const [localHeartCount, setLocalHeartCount] = useState(post.heartCount);

  const { mutateAsync: toggleHeart } = useHeartMutation(post.id);

  const handleRewrite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRewrite?.(post.id);
    setIsMenuOpen(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(post.id);
    setIsMenuOpen(false);
  };

  const handleReport = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReport?.(post.id);
    setIsMenuOpen(false);
  };

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevLiked = isLiked;
    const prevCount = localHeartCount;
    // 낙관적 업데이트
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLocalHeartCount((prev) => (nextLiked ? prev + 1 : prev - 1));
    try {
      const result = await toggleHeart();
      const updated = result.data.post;
      setIsLiked(updated.hearted);
      setLocalHeartCount(updated.heartCount);
    } catch {
      // 실패 시 롤백
      setIsLiked(prevLiked);
      setLocalHeartCount(prevCount);
    }
  };

  return (
    <article
      className={cn('border-border relative cursor-pointer border-b px-4 py-4 hover:bg-gray-50/50')}
      onClick={onClick}
    >
      <div className={cn('flex items-start justify-between gap-3')}>
        {/* 작성자 프로필 영역 */}
        <div className={cn('flex items-start gap-3')}>
          {getImageUrl(post.author.image) ? (
            <img
              src={getImageUrl(post.author.image) ?? undefined}
              alt={post.author.username}
              className={cn('h-10 w-10 rounded-full object-cover')}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div
              className={cn('flex h-10 w-10 items-center justify-center rounded-full bg-gray-100')}
            >
              <UploadImageSmallIcon />
            </div>
          )}
          <div>
            <p className={cn('text-foreground text-sm font-semibold')}>{post.author.username}</p>
            <p className={cn('text-muted-foreground text-xs')}>@{post.author.accountname}</p>
          </div>
        </div>

        {/* 더보기 버튼 및 드롭다운 (본인 게시글일 경우만 표시) */}
        {isMyPost && (
          <div className={cn('relative')}>
            <button
              type="button"
              aria-label="게시글 메뉴"
              className={cn(
                'text-foreground hover:bg-accent flex h-8 w-8 items-center justify-center rounded-md',
              )}
              onClick={handleMenuToggle}
            >
              <MoreIcon className={cn('h-4 w-4')} aria-label="더보기" />
            </button>
            {isMenuOpen && (
              <PostCardDropdown
                onClose={() => setIsMenuOpen(false)}
                items={[
                  { label: '수정', onClick: handleRewrite },
                  { label: '삭제', onClick: handleDelete, variant: 'danger' },
                ]}
              />
            )}
          </div>
        )}
        {/* 다른 사용자의 게시글일 경우 신고 메뉴 표시 */}
        {!isMyPost && isYourPost && (
          <div className={cn('relative')}>
            <button
              type="button"
              aria-label="게시글 메뉴"
              className={cn(
                'text-foreground hover:bg-accent flex h-8 w-8 items-center justify-center rounded-md',
              )}
              onClick={handleMenuToggle}
            >
              <MoreIcon className={cn('h-4 w-4')} aria-label="더보기" />
            </button>
            {isMenuOpen && (
              <PostCardDropdown
                onClose={() => setIsMenuOpen(false)}
                items={[{ label: '신고', onClick: handleReport }]}
              />
            )}
          </div>
        )}
      </div>

      {/* 게시글 본문 내용 */}
      <p className={cn('text-foreground mt-3 text-sm whitespace-pre-wrap')}>{post.content}</p>

      {/* 이미지 영역 (빈 문자열이 아닌 경우만 표시) */}
      {post.image && post.image.trim() !== '' && (
        <img
          src={getImageUrl(post.image) ?? undefined}
          alt="게시글 이미지"
          className={cn('border-border mt-3 w-full rounded-lg border object-cover')}
          onError={(e) => {
            if (!e.currentTarget.dataset.fallback) {
              e.currentTarget.src = '/default-image.png';
              e.currentTarget.dataset.fallback = 'true';
            }
          }}
        />
      )}

      {/* 좋아요 및 댓글 수 동기화 */}
      <div className={cn('text-muted-foreground mt-3 flex items-center text-xs')}>
        <button onClick={handleLikeToggle}>
          <HeartIcon active={isLiked} className={cn('mr-1 inline-block')} />
        </button>
        {localHeartCount} <ChatIcon className={cn('mr-1 ml-2')} /> {post.commentCount}{' '}
      </div>
    </article>
  );
}
