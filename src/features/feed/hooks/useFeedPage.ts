import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { getTokenUserInfo } from '@/shared/lib/utils/token';

import { useFeedPosts } from './useFeedPosts';

export function useFeedPage() {
  const navigate = useNavigate();
  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? '';

  const { isLoading, isFetchingMore, posts, deletePost, loadMore, hasMore } = useFeedPosts();
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 무한 스크롤: 마지막 PostCard가 화면에 보이면 loadMore 호출
  useEffect(() => {
    if (!hasMore || !observerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.8 },
    );
    observer.observe(observerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadMore, posts]);

  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  const handleRewritePost = (postId: string) => {
    navigate(`/post/${postId}/edit`);
  };

  return {
    myAccountname,
    observerRef,
    isLoading,
    isFetchingMore,
    posts,
    deletePost,
    handlePostClick,
    handleRewritePost,
    onSearch: () => navigate('/search'),
  };
}
