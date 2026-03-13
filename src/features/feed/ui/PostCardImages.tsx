import type { KeyboardEvent, SyntheticEvent } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn, getImageUrl } from '@/shared/lib';

import { usePostImageCarousel } from '../hooks/usePostCard';

function hideBrokenImage(e: SyntheticEvent<HTMLImageElement>) {
  const wrapper = e.currentTarget.closest('[data-img-wrapper]') as HTMLElement | null;
  if (wrapper) {
    wrapper.style.display = 'none';
  } else {
    e.currentTarget.style.display = 'none';
  }
}
interface PostCardImagesProps {
  postId: string;
  image: string | undefined; // 부모에서 post.image로 넘겨준 값
  showDesktopNavButtons: boolean;
}

export function PostCardImages({ postId, image, showDesktopNavButtons }: PostCardImagesProps) {
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
  } = usePostImageCarousel(image, postId);
  if (images.length === 0) return null;
  const isFirstImage = currentIndex === 0;
  const isLastImage = currentIndex === images.length - 1;

  const handleImageKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!hasMultipleImages) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNextImage(); // ✅ onNextImage -> handleNextImage
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrevImage(); // ✅ onPrevImage -> handlePrevImage
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
        // ✅ 전부 handle~ 로 시작하는 함수 이름으로 변경!
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {images.map((img, index) => (
          <div
            key={`${postId}-image-${index}`}
            data-img-wrapper=""
            className={cn(
              'border-border flex-shrink-0 overflow-hidden rounded-xl border',
              hasMultipleImages ? 'w-[86%]' : 'w-full',
            )}
            onClick={handleNextImage} // ✅ onNextImage -> handleNextImage
          >
            <img
              src={getImageUrl(img) ?? undefined}
              alt={`게시글 이미지 ${index + 1}`}
              className={cn('aspect-square w-full object-cover')}
              onError={hideBrokenImage}
            />
          </div>
        ))}
      </div>

      {hasMultipleImages && showDesktopNavButtons && (
        <>
          {!isFirstImage && (
            <button
              type="button"
              aria-label="이전 이미지"
              className={cn(
                'absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white',
              )}
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage(); // ✅ onPrevImage -> handlePrevImage
              }}
            >
              <ChevronLeft className={cn('h-4 w-4')} />
            </button>
          )}
          {!isLastImage && (
            <button
              type="button"
              aria-label="다음 이미지"
              className={cn(
                'absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white',
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage(); // ✅ onNextImage -> handleNextImage
              }}
            >
              <ChevronRight className={cn('h-4 w-4')} />
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
                goToImage(index); // ✅ onGoToImage -> goToImage
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
