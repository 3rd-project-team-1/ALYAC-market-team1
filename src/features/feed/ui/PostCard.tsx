import type { KeyboardEvent, MouseEvent } from 'react';
import { useId, useState } from 'react';

import type { PostCardModel } from '@/features/feed';
import { usePostDialog } from '@/features/post';
import { useHeartMutation } from '@/entities/post/hooks/useHeartMutation';
import { LogoutModal } from '@/shared/ui';

import { AvatarActionPopover } from './AvatarActionPopover';
import { PostCardActions } from './PostCardActions';
import type { DropdownItem } from './PostCardDropdown';
import { PostCardHeader } from './PostCardHeader';
import { PostCardImages } from './PostCardImages';
import { PostCardReportModal } from './PostCardReportModal';
import {
  useIsDesktopEnvironment,
  useOptimisticHeartState,
  usePostImageCarousel,
  useRelativeTimeTicker,
} from '../hooks/usePostCard';

interface PostCardProps {
  post: PostCardModel;
  /** 게시글 작성자가 현재 로그인 유저인지 여부 */
  isMyPost: boolean;
  /** 게시글 수정 페이지 이동 핸들러 */
  onRewrite: (postId: string) => void;
  /** 게시글 삭제 핸들러 */
  onDelete: (postId: string) => void;
  /** 게시글 클릭 핸들러 (상세 페이지 이동) */
  onClick: () => void;
}

export function PostCard({ post, isMyPost, onRewrite, onDelete, onClick }: PostCardProps) {
  useRelativeTimeTicker();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();

  const {
    images,
    currentIndex,
    hasMultipleImages,
    slideTransform,
    goToImage,
    handleNextImage,
    handlePrevImage,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  } = usePostImageCarousel(post.image, post.id);

  const isDesktopEnvironment = useIsDesktopEnvironment();

  const heartMutation = useHeartMutation(post.id);
  const { isLiked, localHeartCount, handleLikeToggle } = useOptimisticHeartState(
    post,
    (isHearted) => heartMutation.mutateAsync(isHearted),
  );

  const {
    postDialogType,
    openReportDialog,
    openDeleteDialog,
    closeDialog,
    handleReportConfirm,
    handleDeleteConfirm,
  } = usePostDialog(() => {
    onDelete(post.id);
  });

  const closeMenu = () => setIsMenuOpen(false);

  const handleMenuToggle = (e: MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleRewrite = (e: MouseEvent) => {
    e.stopPropagation();
    closeMenu();
    onRewrite(post.id);
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    closeMenu();
    openDeleteDialog();
  };

  const handleReport = (e: MouseEvent) => {
    e.stopPropagation();
    closeMenu();
    openReportDialog();
  };

  const handleArticleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key !== 'Escape') return;
    if (!isMenuOpen) return;
    e.stopPropagation();
    closeMenu();
  };

  const menuItems: DropdownItem[] = isMyPost
    ? [
        { label: '수정', onClick: handleRewrite },
        { label: '삭제', onClick: handleDelete, variant: 'danger' },
      ]
    : [{ label: '신고하기', onClick: handleReport }];

  return (
    <article
      className="bg-background relative cursor-pointer rounded-2xl border border-gray-200/70 px-4 py-4 shadow-sm transition-colors hover:bg-gray-50/60 active:bg-gray-100/60"
      onClick={onClick}
      onKeyDown={handleArticleKeyDown}
    >
      {/* 헤더: 아바타(좌측 고정) + 이름/시간/메뉴(우측 flex-1) */}
      <div className="flex items-start gap-3">
        <AvatarActionPopover
          accountname={post.author.accountname}
          image={post.author.image}
          username={post.author.username}
          isMyPost={isMyPost}
          initialIsFollow={post.isfollow}
        />
        <div className="min-w-0 flex-1">
          <PostCardHeader
            post={post}
            isMenuOpen={isMenuOpen}
            menuItems={menuItems}
            onMenuToggle={handleMenuToggle}
            onCloseMenu={closeMenu}
            menuId={menuId}
          />
        </div>
      </div>

      {/* 본문·이미지·액션: 카드 내부 전체 너비로 좌우 균형 정렬 */}
      <div>
        <p className="text-foreground mt-3 text-sm whitespace-pre-wrap">{post.content}</p>

        <PostCardImages
          postId={post.id}
          images={images}
          currentIndex={currentIndex}
          hasMultipleImages={hasMultipleImages}
          showDesktopNavButtons={isDesktopEnvironment}
          slideTransform={slideTransform}
          onGoToImage={goToImage}
          onNextImage={handleNextImage}
          onPrevImage={handlePrevImage}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        />

        <PostCardActions
          isLiked={isLiked}
          localHeartCount={localHeartCount}
          commentCount={post.commentCount}
          isPending={heartMutation.isPending}
          onLikeToggle={handleLikeToggle}
        />
      </div>

      <PostCardReportModal
        isOpen={postDialogType === 'report'}
        onConfirm={handleReportConfirm}
        onCancel={closeDialog}
      />

      {postDialogType === 'delete' && (
        <LogoutModal
          title="게시글을 삭제할까요?"
          confirmText="삭제"
          cancelText="취소"
          onConfirm={handleDeleteConfirm}
          onCancel={closeDialog}
        />
      )}
    </article>
  );
}
