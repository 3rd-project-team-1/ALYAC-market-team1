import { useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useHeartMutation } from '@/entities/post';
import type { PostCardModel } from '@/features/feed';
import { getImageUrl } from '@/shared/lib';
import { ROUTE_PATHS } from '@/shared/routes';

import {
  useIsDesktopEnvironment,
  useOptimisticHeartState,
  usePostImageCarousel,
  useRelativeTimeTicker,
} from '../hooks/usePostCard';
import {
  type DropdownItem,
  PostCardActions,
  PostCardHeader,
  PostCardImages,
  PostCardReportModal,
} from './PostCard.sections';

interface PostCardProps {
  post: PostCardModel;
  isMyPost?: boolean;
  onRewrite?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  onClick?: () => void;
}

export function PostCard({ post, isMyPost = false, onRewrite, onDelete, onClick }: PostCardProps) {
  const postMenuId = `post-menu-${post.id}`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const navigate = useNavigate();
  const { mutateAsync: toggleHeart, isPending } = useHeartMutation(post.id);
  const isDesktopEnvironment = useIsDesktopEnvironment();

  useRelativeTimeTicker();

  const { isLiked, localHeartCount, handleLikeToggle } = useOptimisticHeartState(
    {
      hearted: post.hearted,
      heartCount: post.heartCount,
    },
    toggleHeart,
  );

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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const createMenuActionHandler = (action?: (postId: string) => void) => (e: MouseEvent) => {
    e.stopPropagation();
    action?.(post.id);
    closeMenu();
  };

  const handleRewrite = createMenuActionHandler(onRewrite);
  const handleDelete = createMenuActionHandler(onDelete);

  const handleReport = (e: MouseEvent) => {
    e.stopPropagation();
    closeMenu();
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };

  const handleReportConfirm = () => {
    toast.success('게시글이 신고되었습니다.');
    closeReportModal();
  };

  const handleMenuToggle = (e: MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleArticleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key !== 'Escape') return;
    if (!isMenuOpen) return;
    e.stopPropagation();
    closeMenu();
  };

  const handleProfileClick = (e: MouseEvent) => {
    e.stopPropagation();
    navigate(ROUTE_PATHS.PROFILE_DETAIL(post.author.accountname));
  };

  const authorImageUrl = getImageUrl(post.author.image) ?? undefined;

  const menuItems: DropdownItem[] = isMyPost
    ? [
        { label: '수정', onClick: handleRewrite },
        { label: '삭제', onClick: handleDelete, variant: 'danger' },
      ]
    : [{ label: '신고하기', onClick: handleReport }];

  return (
    <article
      className="border-border relative cursor-pointer border-b px-4 py-4 hover:bg-gray-50/50"
      onClick={onClick}
      onKeyDown={handleArticleKeyDown}
    >
      <PostCardHeader
        post={post}
        authorImageUrl={authorImageUrl}
        isMenuOpen={isMenuOpen}
        menuItems={menuItems}
        onProfileClick={handleProfileClick}
        onMenuToggle={handleMenuToggle}
        onCloseMenu={closeMenu}
        menuId={postMenuId}
      />

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
        isPending={isPending}
        onLikeToggle={handleLikeToggle}
      />

      <PostCardReportModal
        isOpen={isReportModalOpen}
        onConfirm={handleReportConfirm}
        onCancel={closeReportModal}
      />
    </article>
  );
}
