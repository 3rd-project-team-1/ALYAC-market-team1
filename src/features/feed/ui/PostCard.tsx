import { useState } from 'react';

import { useHeartMutation } from '@/entities/post';
import type { PostCardModel } from '@/features/feed';
import { ChatIcon, HeartIcon, MoreIcon, UploadImageSmallIcon } from '@/shared/assets';
import { cn, getImageUrl } from '@/shared/lib';

/** PostCard 컴포넌트의 Props */
interface PostCardProps {
  /** 렌더링할 게시글 뷰 모델 */
  post: PostCardModel;
  /** 본인 게시글 여부 — true이면 수정/삭제 메뉴, false이면 신고 메뉴 표시 */
  isMyPost?: boolean;
  /** 수정 버튼 클릭 핸들러 */
  onRewrite?: (postId: string) => void;
  /** 삭제 버튼 클릭 핸들러 */
  onDelete?: (postId: string) => void;
  /** 신고 버튼 클릭 핸들러 */
  onReport?: (postId: string) => void;
  /** 카드 클릭 시 상세 페이지 이동 핸들러 */
  onClick?: () => void;
}

/** 게시글 카드 더보기(⋮) 드롭다운 메뉴의 Props */
interface PostCardDropdownProps {
  /** 드롭다운 닫기 콜백 */
  onClose: () => void;
  /** 메뉴 아이템 목록 (label, 클릭 핸들러, 스타일 변형) */
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
 * 게시글 한 건을 카드 형태로 렌더링하는 컴포넌트입니다.
 *
 * - `isMyPost === true` : 더보기 메뉴에 수정/삭제 표시
 * - `isMyPost === false`: 더보기 메뉴에 신고 표시
 * - 좋아요는 낙관적 업데이트로 즉시 반영하고, API 완료 후 서버 값으로 동기화합니다.
 */
export function PostCard({
  post,
  isMyPost = false,
  onRewrite,
  onDelete,
  onReport,
  onClick,
}: PostCardProps) {
  // 더보기(⋮) 드롭다운 열림 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 좋아요 낙관적 업데이트용 로컬 상태 — post.hearted/heartCount로 초기화
  const [isLiked, setIsLiked] = useState(post.hearted);
  const [localHeartCount, setLocalHeartCount] = useState(post.heartCount);

  const { mutateAsync: toggleHeart, isPending } = useHeartMutation(post.id);

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

  // isMyPost에 따라 드롭다운 메뉴 아이템 결정
  const menuItems = isMyPost
    ? [
        { label: '수정', onClick: handleRewrite },
        { label: '삭제', onClick: handleDelete, variant: 'danger' as const },
      ]
    : [{ label: '신고', onClick: handleReport }];

  /**
   * 좋아요 토글 핸들러 (낙관적 업데이트)
   * 1. 즉시 로컬 상태를 반전시켜 UI에 반영
   * 2. API 호출 후 서버 응답으로 실제 값 동기화
   * 3. 실패 시 이전 상태로 롤백
   */
  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevLiked = isLiked;
    const prevCount = localHeartCount;
    // Step 1: 낙관적 업데이트 — 서버 응답 전에 UI 먼저 반영
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLocalHeartCount((prev) => (nextLiked ? prev + 1 : prev - 1));
    try {
      // Step 2: 서버 응답값으로 실제 상태 동기화
      const result = await toggleHeart();
      const updated = result.post;
      setIsLiked(updated.hearted);
      setLocalHeartCount(updated.heartCount);
    } catch {
      // Step 3: API 실패 시 이전 상태로 롤백
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

        {/* 더보기 버튼 및 드롭다운 (본인: 수정/삭제, 타인: 신고) */}
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
            <PostCardDropdown onClose={() => setIsMenuOpen(false)} items={menuItems} />
          )}
        </div>
      </div>

      {/* 게시글 본문 내용 */}
      <p className={cn('text-foreground mt-3 text-sm whitespace-pre-wrap')}>{post.content}</p>

      {/* 이미지 영역 (빈 문자열이 아닌 경우만 표시) */}
      {post.image && (
        <img
          src={getImageUrl(post.image) ?? undefined}
          alt="게시글 이미지"
          className={cn('border-border mt-3 w-full rounded-lg border object-cover')}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      )}

      {/* 좋아요 및 댓글 수 동기화 */}
      <div className={cn('text-muted-foreground mt-3 flex items-center text-xs')}>
        <button
          type="button"
          aria-label={isLiked ? '좋아요 취소' : '좋아요'}
          onClick={handleLikeToggle}
          disabled={isPending}
        >
          <HeartIcon active={isLiked} className={cn('mr-1 inline-block')} />
        </button>
        {localHeartCount} <ChatIcon className={cn('mr-1 ml-2')} /> {post.commentCount}{' '}
      </div>
    </article>
  );
}
