import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { useFeedPostsQuery } from '@/entities/feed';
import { getTokenUserInfo } from '@/shared/lib';

export function useFeedPage() {
  const navigate = useNavigate();
  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? '';

  const { isLoading, isFetchingMore, posts, deletePost, loadMore, hasMore } = useFeedPostsQuery();
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
  }, [hasMore, loadMore]);

  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  const handleRewritePost = (postId: string) => {
    navigate(`/post/${postId}/edit`);
  };

  // 신고 기능 (추후 신고 API 구현시 업데이트 예정)
  const handleReportPost = (_postId: string) => {
    alert('신고 기능은 추후 업데이트 예정입니다.');
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
    handleReportPost,
    onSearch: () => navigate('/search'),
  };
}
