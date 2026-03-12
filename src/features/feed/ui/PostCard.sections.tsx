import type { KeyboardEvent, MouseEvent, SyntheticEvent, TouchEvent } from 'react';

import type { PostCardModel } from '@/features/feed';
import { ChatIcon, HeartIcon, MoreIcon } from '@/shared/assets';
import { cn, getImageUrl, getRelativeTime } from '@/shared/lib';
import { LogoutModal } from '@/shared/ui';

import { AvatarActionPopover } from './AvatarActionPopover';

export type DropdownItem = {
  label: string;
  onClick: (e: MouseEvent) => void;
  variant?: 'danger';
};

function hideBrokenImage(e: SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.display = 'none';
}

interface PostCardDropdownProps {
  onClose: () => void;
  items: DropdownItem[];
  menuId: string;
}

function PostCardDropdown({ onClose, items, menuId }: PostCardDropdownProps) {
  return (
    <>
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
        id={menuId}
        role="menu"
        className={cn(
          'bg-background border-border absolute top-9 right-0 z-20 w-28 overflow-hidden rounded-md border py-1 shadow-sm',
        )}
      >
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            role="menuitem"
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

interface PostCardHeaderProps {
  post: PostCardModel;
  isMyPost: boolean;
  isMenuOpen: boolean;
  menuItems: DropdownItem[];
  onMenuToggle: (e: MouseEvent) => void;
  onCloseMenu: () => void;
  menuId: string;
}

export function PostCardHeader({
  post,
  isMyPost,
  isMenuOpen,
  menuItems,
  onMenuToggle,
  onCloseMenu,
  menuId,
}: PostCardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-3')}>
      <div className={cn('flex items-start gap-3')}>
        <AvatarActionPopover
          accountname={post.author.accountname}
          image={post.author.image}
          username={post.author.username}
          isMyPost={isMyPost}
          initialIsFollow={post.isfollow}
        />
        <div>
          <p className={cn('text-foreground text-sm font-semibold')}>{post.author.username}</p>
          <p className={cn('text-muted-foreground text-xs')}>
            @{post.author.accountname}
            <span className={cn('mx-1')}>·</span>
            <time dateTime={post.createdAt}>{getRelativeTime(post.createdAt)}</time>
          </p>
        </div>
      </div>

      <div className={cn('relative')}>
        <button
          type="button"
          aria-label="게시글 메뉴"
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          aria-haspopup="menu"
          className={cn(
            'text-foreground hover:bg-accent flex h-8 w-8 items-center justify-center rounded-md',
          )}
          onClick={onMenuToggle}
        >
          <MoreIcon className={cn('h-4 w-4')} aria-label="더보기" />
        </button>
        {isMenuOpen && <PostCardDropdown onClose={onCloseMenu} items={menuItems} menuId={menuId} />}
      </div>
    </div>
  );
}

interface PostCardImagesProps {
  postId: string;
  images: string[];
  currentIndex: number;
  hasMultipleImages: boolean;
  showDesktopNavButtons: boolean;
  slideTransform: string;
  onGoToImage: (index: number) => void;
  onNextImage: () => void;
  onPrevImage: () => void;
  onTouchStart: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: () => void;
  onMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

export function PostCardImages({
  postId,
  images,
  currentIndex,
  hasMultipleImages,
  showDesktopNavButtons,
  slideTransform,
  onGoToImage,
  onNextImage,
  onPrevImage,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
}: PostCardImagesProps) {
  if (images.length === 0) return null;
  const isFirstImage = currentIndex === 0;
  const isLastImage = currentIndex === images.length - 1;

  const handleImageKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!hasMultipleImages) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      onNextImage();
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onPrevImage();
    }
  };

  return (
    <div
      className={cn('relative mt-3 overflow-hidden')}
      role="region"
      aria-label="게시글 이미지"
      tabIndex={hasMultipleImages ? 0 : -1}
      onKeyDown={handleImageKeyDown}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={cn('flex gap-2 transition-transform duration-300')}
        style={{
          transform: slideTransform,
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {images.map((img, index) => (
          <img
            key={`${postId}-image-${index}`}
            src={getImageUrl(img) ?? undefined}
            alt={`게시글 이미지 ${index + 1}`}
            className={cn(
              'border-border max-h-[60vh] w-[86%] flex-shrink-0 rounded-lg border bg-gray-50 object-contain',
            )}
            onClick={onNextImage}
            onError={hideBrokenImage}
          />
        ))}
      </div>

      {hasMultipleImages && showDesktopNavButtons && (
        <>
          {!isFirstImage && (
            <button
              type="button"
              aria-label="이전 이미지"
              className={cn(
                'absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-black/60 px-2 py-1 text-xs text-white',
              )}
              onClick={(e) => {
                e.stopPropagation();
                onPrevImage();
              }}
            >
              이전
            </button>
          )}
          {!isLastImage && (
            <button
              type="button"
              aria-label="다음 이미지"
              className={cn(
                'absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-black/60 px-2 py-1 text-xs text-white',
              )}
              onClick={(e) => {
                e.stopPropagation();
                onNextImage();
              }}
            >
              다음
            </button>
          )}
        </>
      )}

      {hasMultipleImages && (
        <div
          className={cn(
            'absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-black/45 px-2 py-1',
          )}
          aria-label="이미지 인디케이터"
        >
          {images.map((_, index) => (
            <button
              key={`${postId}-dot-${index}`}
              type="button"
              aria-label={`이미지 ${index + 1}로 이동`}
              aria-current={index === currentIndex}
              onClick={(e) => {
                e.stopPropagation();
                onGoToImage(index);
              }}
              className={cn(
                'h-1.5 w-1.5 rounded-full',
                index === currentIndex ? 'bg-white' : 'bg-white/10',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

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

interface PostCardReportModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function PostCardReportModal({ isOpen, onConfirm, onCancel }: PostCardReportModalProps) {
  if (!isOpen) return null;

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <LogoutModal
        title="신고하시겠습니까?"
        confirmText="신고"
        cancelText="취소"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </div>
  );
}
