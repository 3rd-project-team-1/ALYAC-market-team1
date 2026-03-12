import { useEffect, useState } from 'react';
import type { MouseEvent, TouchEvent } from 'react';

import type { PostCardModel } from '@/features/feed';

const SWIPE_THRESHOLD = 40;
const SLIDE_WIDTH_PERCENT = 86;
const SLIDE_GAP_PX = 8;
const LAST_SLIDE_CENTER_OFFSET_PERCENT = (100 - SLIDE_WIDTH_PERCENT) / 2;

function normalizePostImages(image?: string) {
  if (!image) return [];
  return image
    .split(',')
    .map((path) => path.trim())
    .filter(Boolean);
}

function getSlideTransform(currentIndex: number, isLastImage: boolean) {
  if (isLastImage) {
    return `translateX(calc(-${currentIndex * SLIDE_WIDTH_PERCENT}% - ${currentIndex * SLIDE_GAP_PX}px + ${LAST_SLIDE_CENTER_OFFSET_PERCENT}%))`;
  }
  return `translateX(calc(-${currentIndex * SLIDE_WIDTH_PERCENT}% - ${currentIndex * SLIDE_GAP_PX}px))`;
}

export function useRelativeTimeTicker() {
  const [, setNowTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNowTick((prev) => prev + 1);
    }, 60_000);

    return () => window.clearInterval(timer);
  }, []);
}

export function useIsDesktopEnvironment() {
  const [isDesktopEnvironment, setIsDesktopEnvironment] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktopEnvironment(event.matches);
    };

    setIsDesktopEnvironment(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isDesktopEnvironment;
}

type ToggleHeartFn = (hearted: boolean) => Promise<{
  post: {
    hearted: boolean;
    heartCount: number;
  };
}>;

export function useOptimisticHeartState(
  post: Pick<PostCardModel, 'hearted' | 'heartCount'>,
  toggleHeart: ToggleHeartFn,
) {
  const [isLiked, setIsLiked] = useState(post.hearted);
  const [localHeartCount, setLocalHeartCount] = useState(post.heartCount);

  useEffect(() => {
    setIsLiked(post.hearted);
    setLocalHeartCount(post.heartCount);
  }, [post.hearted, post.heartCount]);

  const handleLikeToggle = async (e: MouseEvent) => {
    e.stopPropagation();
    const prevLiked = isLiked;
    const prevCount = localHeartCount;

    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLocalHeartCount((prev) => (nextLiked ? prev + 1 : prev - 1));

    try {
      const result = await toggleHeart(prevLiked);
      const updated = result.post;
      setIsLiked(updated.hearted);
      setLocalHeartCount(updated.heartCount);
    } catch {
      setIsLiked(prevLiked);
      setLocalHeartCount(prevCount);
    }
  };

  return {
    isLiked,
    localHeartCount,
    handleLikeToggle,
  };
}

export function usePostImageCarousel(image: string | undefined, postId: string) {
  const images = normalizePostImages(image);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);
  const [mouseEndX, setMouseEndX] = useState<number | null>(null);
  const [isMouseDragging, setIsMouseDragging] = useState(false);

  const hasMultipleImages = images.length > 1;
  const isLastImage = images.length > 0 && currentIndex === images.length - 1;

  const handleNextImage = () => {
    if (!hasMultipleImages || images.length === 0) return;
    setCurrentIndex((prev) => {
      if (prev >= images.length - 1) return prev;
      return prev + 1;
    });
  };

  const handlePrevImage = () => {
    if (!hasMultipleImages || images.length === 0) return;
    setCurrentIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  };

  const goToImage = (index: number) => {
    if (!hasMultipleImages) return;
    if (index < 0 || index >= images.length) return;
    setCurrentIndex(index);
  };

  const applySwipeByDistance = (startX: number | null, endX: number | null) => {
    if (!hasMultipleImages || startX === null || endX === null) return;

    const distance = startX - endX;
    if (Math.abs(distance) < SWIPE_THRESHOLD) return;

    if (distance > 0) {
      handleNextImage();
    } else {
      handlePrevImage();
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!hasMultipleImages) return;
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!hasMultipleImages) return;
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    applySwipeByDistance(touchStartX, touchEndX);

    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!hasMultipleImages) return;
    setIsMouseDragging(true);
    setMouseStartX(e.clientX);
    setMouseEndX(null);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!hasMultipleImages || !isMouseDragging) return;
    setMouseEndX(e.clientX);
  };

  const handleMouseUp = () => {
    applySwipeByDistance(mouseStartX, mouseEndX);
    setIsMouseDragging(false);
    setMouseStartX(null);
    setMouseEndX(null);
  };

  const handleMouseLeave = () => {
    if (!isMouseDragging) return;
    handleMouseUp();
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [postId]);

  return {
    images,
    currentIndex,
    hasMultipleImages,
    slideTransform: getSlideTransform(currentIndex, isLastImage),
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
  };
}
