import type { KeyboardEvent, MouseEvent, SyntheticEvent, TouchEvent } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn, getImageUrl } from '@/shared/lib';

function hideBrokenImage(e: SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.display = 'none';
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
                'absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white',
              )}
              onClick={(e) => {
                e.stopPropagation();
                onPrevImage();
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
                onNextImage();
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
