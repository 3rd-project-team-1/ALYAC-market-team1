import { useNavigate } from 'react-router-dom';

import { useFeedPostsQuery } from '@/entities/feed';
import { getTokenUserInfo } from '@/shared/lib';

export function useFeedPage() {
  const navigate = useNavigate();
  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? '';

  const { isLoading, isFetchingMore, posts, deletePost, loadMore, hasMore } = useFeedPostsQuery();

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
    isLoading,
    isFetchingMore,
    hasMore,
    posts,
    deletePost,
    handlePostClick,
    handleRewritePost,
    handleReportPost,
    loadMore,
    onSearch: () => navigate('/search'),
  };
}
